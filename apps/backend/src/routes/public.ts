import { FastifyInstance } from "fastify";
import { donationClickSchema, leadSchema } from "@jorge/shared";
import { pool } from "../db/client.js";
import { sendLeadNotification } from "../services/email.js";

const WINRED_URL = "https://secure.winred.com/jorge-borrego-campaign/donate-today";

export async function publicRoutes(app: FastifyInstance) {
  app.post("/api/leads", async (req, reply) => {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send({ error: parsed.error.flatten() });

    const { name, email, phone, smsOptIn, locale, source } = parsed.data;
    await pool.query(
      "INSERT INTO leads(name,email,phone,sms_opt_in,locale,source) VALUES($1,$2,$3,$4,$5,$6)",
      [name, email, phone || null, smsOptIn, locale, source]
    );
    await sendLeadNotification({ name, email, phone, smsOptIn, locale });
    return { ok: true };
  });

  app.get("/api/donate", async (req, reply) => {
    const parsed = donationClickSchema.safeParse(req.query);
    if (!parsed.success) return reply.redirect(WINRED_URL);
    const { amount, locale, path, referrer, userAgent } = parsed.data;
    await pool.query(
      "INSERT INTO donation_clicks(amount,locale,path,referrer,user_agent) VALUES($1,$2,$3,$4,$5)",
      [amount, locale, path, referrer || null, userAgent || req.headers["user-agent"] || null]
    );
    return reply.redirect(WINRED_URL);
  });

  // Alias route for WinRed tracking + redirect (frontend expects this path)
  app.get("/api/public/donate", async (req, reply) => {
    const q = (req.query as Record<string, string | undefined>) || {};
    const amountRaw = q.amount || "";
    const amount = Number(amountRaw);
    const locale = String(q.locale || "en");
    const path = String(q.path || "/");

    const referrer = String((req.headers["referer"] || req.headers["referrer"] || "") as string);
    const userAgent = String((req.headers["user-agent"] || "") as string);

    // Log click. Amount may be NaN; store null in that case.
    await pool.query(
      "INSERT INTO donation_clicks (amount, locale, path, referrer, user_agent) VALUES ($1, $2, $3, $4, $5)",
      [Number.isFinite(amount) ? amount : null, locale, path, referrer, userAgent]
    ).catch(async () => {
      // If DB insert fails for any reason, still redirect (do not block donations)
    });

    // Redirect to WinRed (include amount if valid)
    const base = "https://secure.winred.com/jorge-borrego-campaign/donate-today";
    if (Number.isFinite(amount) && amount > 0) {
      // WinRed commonly accepts amount as a query param; if not, WinRed will ignore it.
      return reply.redirect(`${base}?amount=${encodeURIComponent(String(amount))}`);
    }
    return reply.redirect(base);
  });

}
