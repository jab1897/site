import { createHash, randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { donationClickSchema, leadSchema, volunteerSignupSchema } from "@jorge/shared";
import { pool } from "../db/client.js";
import { sendLeadNotification, sendVolunteerConfirmationEmail, sendVolunteerNotification } from "../services/email.js";
import { env } from "../config/env.js";

const WINRED_URL = "https://secure.winred.com/jorge-borrego-campaign/donate-today";


function parseCookies(cookieHeader: string | undefined) {
  if (!cookieHeader) return new Map<string, string>();
  return new Map(
    cookieHeader
      .split(";")
      .map((pair) => pair.trim())
      .filter(Boolean)
      .map((pair) => {
        const idx = pair.indexOf("=");
        if (idx === -1) return [pair, ""] as const;
        return [pair.slice(0, idx), decodeURIComponent(pair.slice(idx + 1))] as const;
      })
  );
}

function resolveClientIp(headers: Record<string, unknown>, fallbackIp?: string) {
  const forwardedFor = String(headers["x-forwarded-for"] || "");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || fallbackIp || "";
  }
  const realIp = String(headers["x-real-ip"] || "").trim();
  if (realIp) return realIp;
  return fallbackIp || "";
}

function hashIp(ip: string) {
  if (!ip) return null;
  return createHash("sha256").update(`${env.analyticsSalt}:${ip}`).digest("hex");
}

function buildSessionCookie(value: string) {
  const parts = [
    `pv_sid=${encodeURIComponent(value)}`,
    "Path=/",
    "Max-Age=2592000",
    "SameSite=Lax"
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export async function publicRoutes(app: FastifyInstance) {

  app.post("/api/track/pageview", async (req, reply) => {
    const body = (req.body || {}) as { path?: unknown; referrer?: unknown };
    const path = typeof body.path === "string" ? body.path.trim() : "";
    if (!path) {
      return reply.status(400).send({ error: "Invalid path" });
    }

    const referrer = typeof body.referrer === "string" && body.referrer.trim() ? body.referrer.trim() : null;
    const userAgent = String((req.headers["user-agent"] || "") as string);

    const cookieMap = parseCookies(typeof req.headers.cookie === "string" ? req.headers.cookie : undefined);
    let sessionId = cookieMap.get("pv_sid") || "";
    if (!sessionId) {
      sessionId = randomUUID();
      reply.header("Set-Cookie", buildSessionCookie(sessionId));
    }

    const clientIp = resolveClientIp(req.headers as Record<string, unknown>, req.ip);
    const ipHash = hashIp(clientIp);

    const dedupe = await pool.query(
      `SELECT id FROM page_views WHERE session_id = $1 AND path = $2 AND created_at > NOW() - INTERVAL '10 minutes' LIMIT 1`,
      [sessionId, path]
    );

    if (dedupe.rowCount && dedupe.rowCount > 0) {
      return reply.status(204).send();
    }

    await pool.query(
      `INSERT INTO page_views(path, referrer, user_agent, ip_hash, session_id) VALUES($1, $2, $3, $4, $5)`,
      [path, referrer, userAgent || null, ipHash, sessionId]
    );

    return reply.status(204).send();
  });
  app.post("/api/leads", async (req, reply) => {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send({ error: parsed.error.flatten() });

    const { name, email, phone, smsOptIn, locale, source } = parsed.data;
    await pool.query("INSERT INTO leads(name,email,phone,sms_opt_in,locale,source) VALUES($1,$2,$3,$4,$5,$6)", [name, email, phone || null, smsOptIn, locale, source]);
    await sendLeadNotification({ name, email, phone, smsOptIn, locale });
    return { ok: true };
  });

  app.post("/api/public/volunteer", async (req, reply) => {
    const parsed = volunteerSignupSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }

    const { firstName, lastName, email, phone, zip, interest, updatesOptIn, smsOptIn, sourcePath, locale, company } = parsed.data;

    if (company && company.trim()) {
      return reply.status(400).send({ error: "Invalid submission" });
    }

    await pool.query(
      `INSERT INTO volunteer_signups(first_name,last_name,email,phone,zip,interest,updates_opt_in,sms_opt_in,source_path,locale)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [firstName, lastName, email, phone || null, zip, interest, updatesOptIn, smsOptIn, sourcePath, locale]
    );

    const timestamp = new Date().toISOString();
    const userAgent = String((req.headers["user-agent"] || "") as string);

    await sendVolunteerNotification({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      zip,
      interest,
      updatesOptIn,
      smsOptIn,
      sourcePath,
      locale,
      userAgent,
      timestamp
    });

    await sendVolunteerConfirmationEmail({ email, firstName, interest });

    return reply.status(200).send({ ok: true });
  });

  app.get("/api/donate", async (req, reply) => {
    const parsed = donationClickSchema.safeParse(req.query);
    if (!parsed.success) return reply.redirect(WINRED_URL);
    const { amount, locale, path, referrer, userAgent } = parsed.data;
    await pool.query("INSERT INTO donation_clicks(amount,locale,path,referrer,user_agent) VALUES($1,$2,$3,$4,$5)", [amount, locale, path, referrer || null, userAgent || req.headers["user-agent"] || null]);
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
    await pool
      .query("INSERT INTO donation_clicks (amount, locale, path, referrer, user_agent) VALUES ($1, $2, $3, $4, $5)", [Number.isFinite(amount) ? amount : null, locale, path, referrer, userAgent])
      .catch(async () => {
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
