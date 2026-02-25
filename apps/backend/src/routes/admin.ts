import { FastifyInstance } from "fastify";
import { pool } from "../db/client.js";
import { stringify } from "csv-stringify/sync";
import { env } from "../config/env.js";

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
      const hasLeads = await tableExists("leads");
      if (!hasLeads) {
        req.log.error("Admin metrics: leads table is missing");
        return { totalLeads: 0, smsOptIns: 0, winredClicks: 0 };
      }

      const totalLeads = await safeCount("SELECT COUNT(*)::int AS total FROM leads");

      const hasLeadsSmsOptIn = await columnExists("leads", "sms_opt_in");
      const smsOptIns = hasLeadsSmsOptIn
        ? await safeCount("SELECT COUNT(*)::int AS total FROM leads WHERE sms_opt_in = true")
        : 0;

      let winredClicks = 0;
      const hasEvents = await tableExists("events");
      if (hasEvents && (await columnExists("events", "event_type"))) {
        winredClicks = await safeCount("SELECT COUNT(*)::int AS total FROM events WHERE event_type = 'winred_click'");
      } else if (await tableExists("donation_clicks")) {
        winredClicks = await safeCount("SELECT COUNT(*)::int AS total FROM donation_clicks");
      } else {
        const fallbackPredicates: string[] = [];
        if (await columnExists("leads", "source_path")) fallbackPredicates.push("source_path ILIKE '%winred%'");
        if (await columnExists("leads", "utm_source")) fallbackPredicates.push("utm_source ILIKE '%winred%'");
        if (await columnExists("leads", "interest")) fallbackPredicates.push("interest ILIKE '%donate%'");
        if (await columnExists("leads", "source")) fallbackPredicates.push("source ILIKE '%winred%'");

        if (fallbackPredicates.length > 0) {
          winredClicks = await safeCount(`SELECT COUNT(*)::int AS total FROM leads WHERE ${fallbackPredicates.join(" OR ")}`);
        }
      }

      return { totalLeads, smsOptIns, winredClicks };
    } catch (error) {
      req.log.error({ err: error }, "Admin metrics query failed");
      return { totalLeads: 0, smsOptIns: 0, winredClicks: 0 };
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
