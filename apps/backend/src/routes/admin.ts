import { FastifyInstance } from "fastify";
import { pool } from "../db/client.js";
import { stringify } from "csv-stringify/sync";
import { env } from "../config/env.js";

type DateRange = {
  from: string;
  to: string;
  fromDate: Date;
  toDate: Date;
};

const METRICS_DEFAULT = { totalLeads: 0, smsOptIns: 0, winredClicks: 0 };
const TIMESERIES_DEFAULT = { days: [] as Array<{ date: string; leads: number; smsOptIns: number; winredClicks: number }> };
const ATTRIBUTION_DEFAULT = {
  utmSource: [] as Array<{ key: string; count: number }>,
  utmMedium: [] as Array<{ key: string; count: number }>,
  utmCampaign: [] as Array<{ key: string; count: number }>,
  topPages: [] as Array<{ key: string; count: number }>
};

async function tableExists(tableName: string) {
  const result = await pool.query("SELECT to_regclass($1) IS NOT NULL AS exists", [tableName]);
  return Boolean(result.rows[0]?.exists);
}

async function columnExists(tableName: string, columnName: string) {
  const result = await pool.query(
    `SELECT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = current_schema() AND table_name = $1 AND column_name = $2
    ) AS exists`,
    [tableName, columnName]
  );
  return Boolean(result.rows[0]?.exists);
}

async function safeCount(sql: string, params: unknown[] = []) {
  try {
    const result = await pool.query(sql, params);
    return Number(result.rows[0]?.total || 0);
  } catch {
    return 0;
  }
}

function isIsoDateString(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function parseDateRange(query: { from?: string; to?: string }): DateRange {
  const today = new Date();
  const defaultTo = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const defaultFrom = new Date(defaultTo);
  defaultFrom.setUTCDate(defaultFrom.getUTCDate() - 29);

  const fromInput = (query.from || "").trim();
  const toInput = (query.to || "").trim();

  const from = isIsoDateString(fromInput) ? fromInput : defaultFrom.toISOString().slice(0, 10);
  const to = isIsoDateString(toInput) ? toInput : defaultTo.toISOString().slice(0, 10);

  let fromDate = new Date(`${from}T00:00:00.000Z`);
  let toDate = new Date(`${to}T23:59:59.999Z`);

  if (fromDate.getTime() > toDate.getTime()) {
    const tmpFrom = fromDate;
    const tmpTo = toDate;
    fromDate = new Date(tmpTo.toISOString().slice(0, 10) + "T00:00:00.000Z");
    toDate = new Date(tmpFrom.toISOString().slice(0, 10) + "T23:59:59.999Z");
    return { from: tmpTo.toISOString().slice(0, 10), to: tmpFrom.toISOString().slice(0, 10), fromDate, toDate };
  }

  return { from, to, fromDate, toDate };
}

function listDays(from: string, to: string) {
  const days: string[] = [];
  const cursor = new Date(`${from}T00:00:00.000Z`);
  const end = new Date(`${to}T00:00:00.000Z`);
  while (cursor.getTime() <= end.getTime()) {
    days.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

const TIMESTAMP_COLUMN_CANDIDATES = [
  "created_at",
  "createdAt",
  "occurred_at",
  "event_time",
  "timestamp",
  "inserted_at",
  "date_created"
];

async function findTimestampColumn(tableName: string) {
  for (const columnName of TIMESTAMP_COLUMN_CANDIDATES) {
    if (await columnExists(tableName, columnName)) {
      return columnName;
    }
  }
  return null;
}

async function countByDay(tableName: string, timestampColumn: string, whereClause: string, params: unknown[]) {
  const result = await pool.query(
    `SELECT TO_CHAR(DATE_TRUNC('day', ${timestampColumn}), 'YYYY-MM-DD') AS day, COUNT(*)::int AS total
     FROM ${tableName}
     WHERE ${timestampColumn} >= $1 AND ${timestampColumn} <= $2${whereClause ? ` AND ${whereClause}` : ""}
     GROUP BY 1`,
    params
  );

  return new Map(result.rows.map((row) => [String(row.day), Number(row.total || 0)]));
}

async function aggregateTopCounts(
  req: { log: { error: (obj: unknown, msg?: string) => void } },
  range: DateRange,
  columns: string[]
) {
  const tableCandidates = ["leads", "volunteer_signups", "events", "donation_clicks"];
  const totals = new Map<string, number>();

  for (const tableName of tableCandidates) {
    const hasTable = await tableExists(tableName);
    if (!hasTable) continue;

    const timestampColumn = await findTimestampColumn(tableName);
    for (const columnName of columns) {
      if (!(await columnExists(tableName, columnName))) continue;
      try {
        const params: unknown[] = [];
        let where = `${columnName} IS NOT NULL AND NULLIF(TRIM(${columnName}), '') IS NOT NULL`;
        if (timestampColumn) {
          params.push(range.fromDate.toISOString(), range.toDate.toISOString());
          where += ` AND ${timestampColumn} >= $${params.length - 1} AND ${timestampColumn} <= $${params.length}`;
        }
        const result = await pool.query(
          `SELECT TRIM(${columnName}) AS key, COUNT(*)::int AS count
           FROM ${tableName}
           WHERE ${where}
           GROUP BY 1`,
          params
        );
        for (const row of result.rows) {
          const key = String(row.key || "").trim();
          if (!key) continue;
          totals.set(key, (totals.get(key) || 0) + Number(row.count || 0));
        }
      } catch (error) {
        req.log.error({ err: error, tableName, columnName }, "Admin attribution query failed for column");
      }
    }
  }

  return [...totals.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export async function adminRoutes(app: FastifyInstance) {
  app.post("/api/admin/login", async (req, reply) => {
    const { email, passwordHash } = req.body as { email: string; passwordHash: string };
    if (email !== env.adminEmail || passwordHash !== env.adminPasswordHash) return reply.status(401).send({ error: "Invalid" });
    const token = app.jwt.sign({ role: "admin" });
    return { token };
  });

  app.addHook("preHandler", async (req, reply) => {
    if (!req.url.startsWith("/api/admin") || req.url === "/api/admin/login") return;
    try {
      await req.jwtVerify();
    } catch {
      return reply.status(401).send({ error: "Unauthorized" });
    }
  });

  app.get("/api/admin/metrics", async (req) => {
    try {
      const range = parseDateRange(req.query as { from?: string; to?: string });
      const hasLeads = await tableExists("leads");
      if (!hasLeads) {
        req.log.error("Admin metrics: leads table is missing");
        return METRICS_DEFAULT;
      }

      const leadsTimestampColumn = await findTimestampColumn("leads");
      const leadsDateFilter = leadsTimestampColumn ? ` WHERE ${leadsTimestampColumn} >= $1 AND ${leadsTimestampColumn} <= $2` : "";
      const leadsDateParams = leadsTimestampColumn ? [range.fromDate.toISOString(), range.toDate.toISOString()] : [];

      const totalLeads = await safeCount(`SELECT COUNT(*)::int AS total FROM leads${leadsDateFilter}`, leadsDateParams);

      const hasLeadsSmsOptIn = await columnExists("leads", "sms_opt_in");
      const smsOptIns = hasLeadsSmsOptIn
        ? await safeCount(
            `SELECT COUNT(*)::int AS total FROM leads WHERE sms_opt_in = true${leadsTimestampColumn ? ` AND ${leadsTimestampColumn} >= $1 AND ${leadsTimestampColumn} <= $2` : ""}`,
            leadsDateParams
          )
        : 0;

      let winredClicks = 0;
      const hasEvents = await tableExists("events");
      if (hasEvents && (await columnExists("events", "event_type"))) {
        const eventsTimestampColumn = await findTimestampColumn("events");
        winredClicks = await safeCount(
          `SELECT COUNT(*)::int AS total FROM events WHERE event_type = 'winred_click'${eventsTimestampColumn ? ` AND ${eventsTimestampColumn} >= $1 AND ${eventsTimestampColumn} <= $2` : ""}`,
          eventsTimestampColumn ? [range.fromDate.toISOString(), range.toDate.toISOString()] : []
        );
      } else if (await tableExists("donation_clicks")) {
        const donationsTimestampColumn = await findTimestampColumn("donation_clicks");
        winredClicks = await safeCount(
          `SELECT COUNT(*)::int AS total FROM donation_clicks${donationsTimestampColumn ? ` WHERE ${donationsTimestampColumn} >= $1 AND ${donationsTimestampColumn} <= $2` : ""}`,
          donationsTimestampColumn ? [range.fromDate.toISOString(), range.toDate.toISOString()] : []
        );
      } else {
        const fallbackPredicates: string[] = [];
        if (await columnExists("leads", "source_path")) fallbackPredicates.push("source_path ILIKE '%winred%'");
        if (await columnExists("leads", "utm_source")) fallbackPredicates.push("utm_source ILIKE '%winred%'");
        if (await columnExists("leads", "interest")) fallbackPredicates.push("interest ILIKE '%donate%'");
        if (await columnExists("leads", "source")) fallbackPredicates.push("source ILIKE '%winred%'");

        if (fallbackPredicates.length > 0) {
          winredClicks = await safeCount(
            `SELECT COUNT(*)::int AS total FROM leads WHERE (${fallbackPredicates.join(" OR ")})${leadsTimestampColumn ? ` AND ${leadsTimestampColumn} >= $1 AND ${leadsTimestampColumn} <= $2` : ""}`,
            leadsDateParams
          );
        }
      }

      return { totalLeads, smsOptIns, winredClicks };
    } catch (error) {
      req.log.error({ err: error }, "Admin metrics query failed");
      return METRICS_DEFAULT;
    }
  });

  app.get("/api/admin/timeseries", async (req) => {
    try {
      const range = parseDateRange(req.query as { from?: string; to?: string });
      const dayKeys = listDays(range.from, range.to);

      if (!(await tableExists("leads"))) {
        return TIMESERIES_DEFAULT;
      }

      const leadsTimestampColumn = await findTimestampColumn("leads");
      if (!leadsTimestampColumn) {
        return { days: dayKeys.map((date) => ({ date, leads: 0, smsOptIns: 0, winredClicks: 0 })) };
      }

      const params = [range.fromDate.toISOString(), range.toDate.toISOString()];
      const leadsByDay = await countByDay("leads", leadsTimestampColumn, "", params);

      let smsOptInsByDay = new Map<string, number>();
      if (await columnExists("leads", "sms_opt_in")) {
        smsOptInsByDay = await countByDay("leads", leadsTimestampColumn, "sms_opt_in = true", params);
      }

      let winredByDay = new Map<string, number>();
      if ((await tableExists("events")) && (await columnExists("events", "event_type"))) {
        const eventsTimestampColumn = await findTimestampColumn("events");
        if (eventsTimestampColumn) {
          winredByDay = await countByDay(
            "events",
            eventsTimestampColumn,
            "event_type = 'winred_click'",
            [range.fromDate.toISOString(), range.toDate.toISOString()]
          );
        }
      } else if (await tableExists("donation_clicks")) {
        const donationsTimestampColumn = await findTimestampColumn("donation_clicks");
        if (donationsTimestampColumn) {
          winredByDay = await countByDay("donation_clicks", donationsTimestampColumn, "", [range.fromDate.toISOString(), range.toDate.toISOString()]);
        }
      } else {
        const fallbackPredicates: string[] = [];
        if (await columnExists("leads", "source_path")) fallbackPredicates.push("source_path ILIKE '%winred%'");
        if (await columnExists("leads", "utm_source")) fallbackPredicates.push("utm_source ILIKE '%winred%'");
        if (await columnExists("leads", "interest")) fallbackPredicates.push("interest ILIKE '%donate%'");
        if (await columnExists("leads", "source")) fallbackPredicates.push("source ILIKE '%winred%'");
        if (fallbackPredicates.length > 0) {
          winredByDay = await countByDay("leads", leadsTimestampColumn, `(${fallbackPredicates.join(" OR ")})`, params);
        }
      }

      return {
        days: dayKeys.map((date) => ({
          date,
          leads: leadsByDay.get(date) || 0,
          smsOptIns: smsOptInsByDay.get(date) || 0,
          winredClicks: winredByDay.get(date) || 0
        }))
      };
    } catch (error) {
      req.log.error({ err: error }, "Admin timeseries query failed");
      return TIMESERIES_DEFAULT;
    }
  });

  app.get("/api/admin/attribution", async (req) => {
    try {
      const range = parseDateRange(req.query as { from?: string; to?: string });
      const [utmSource, utmMedium, utmCampaign, topPages] = await Promise.all([
        aggregateTopCounts(req, range, ["utm_source"]),
        aggregateTopCounts(req, range, ["utm_medium"]),
        aggregateTopCounts(req, range, ["utm_campaign"]),
        aggregateTopCounts(req, range, ["source_path", "referrer", "page"])
      ]);

      return { utmSource, utmMedium, utmCampaign, topPages };
    } catch (error) {
      req.log.error({ err: error }, "Admin attribution query failed");
      return ATTRIBUTION_DEFAULT;
    }
  });

  app.get("/api/admin/leads", async (req) => {
    const q = ((req.query as { q?: string }).q || "").trim();
    const query = q
      ? pool.query("SELECT * FROM leads WHERE name ILIKE $1 OR email ILIKE $1 ORDER BY created_at DESC LIMIT 500", [`%${q}%`])
      : pool.query("SELECT * FROM leads ORDER BY created_at DESC LIMIT 500");
    const result = await query;
    return result.rows;
  });

  app.get("/api/admin/leads.csv", async (req, reply) => {
    const rows = (await pool.query("SELECT * FROM leads ORDER BY created_at DESC LIMIT 1000")).rows;
    const csv = stringify(rows, { header: true });
    reply.header("Content-Type", "text/csv");
    return reply.send(csv);
  });
}
