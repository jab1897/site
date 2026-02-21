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
}
