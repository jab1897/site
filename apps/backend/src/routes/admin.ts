import { FastifyInstance } from "fastify";
import { pool } from "../db/client.js";
import { stringify } from "csv-stringify/sync";
import { env } from "../config/env.js";

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

  app.get("/api/admin/metrics", async () => {
    const [leads, sms, clicks, daily] = await Promise.all([
      pool.query("SELECT COUNT(*)::int AS total FROM leads"),
      pool.query("SELECT COUNT(*)::int AS total FROM leads WHERE sms_opt_in=true"),
      pool.query("SELECT COUNT(*)::int AS total FROM donation_clicks"),
      pool.query(`SELECT DATE(created_at) AS day,
        (SELECT COUNT(*) FROM leads l WHERE DATE(l.created_at)=DATE(x.created_at))::int AS leads,
        (SELECT COUNT(*) FROM donation_clicks d WHERE DATE(d.created_at)=DATE(x.created_at))::int AS clicks
        FROM leads x GROUP BY DATE(created_at) ORDER BY day DESC LIMIT 30`)
    ]);

    return {
      totalLeads: leads.rows[0]?.total || 0,
      totalSmsOptIns: sms.rows[0]?.total || 0,
      totalWinRedClicks: clicks.rows[0]?.total || 0,
      daily: daily.rows
    };
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
