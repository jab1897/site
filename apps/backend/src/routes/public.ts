import { createHash, randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { donationClickSchema, leadSchema, volunteerSignupSchema } from "@jorge/shared";
import { pool } from "../db/client.js";
import { sendLeadNotification, sendVolunteerConfirmationEmail, sendVolunteerNotification } from "../services/email.js";
import { env } from "../config/env.js";
import { checkRateLimit } from "../utils/rateLimit.js";
import { sanitizeName, sanitizeEmail, sanitizePhone, sanitizeZip } from "../utils/sanitize.js";

const WINRED_URL = "https://secure.winred.com/jorge-borrego-campaign/donate-today";

// TCPA consent text logged verbatim when smsOptIn is true
const TCPA_CONSENT_EN =
  "By providing my mobile number, I consent to receive informational text messages from the campaign. Message frequency may vary. Msg and data rates may apply. Text STOP to opt-out. Text HELP for help.";
const TCPA_CONSENT_ES =
  "Al proporcionar mi número de teléfono móvil, doy mi consentimiento para recibir mensajes de texto informativos de la campaña. La frecuencia de los mensajes puede variar. Se pueden aplicar tarifas de mensajes y datos. Envíe STOP para darse de baja. Envíe HELP para obtener ayuda.";

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!env.turnstileSecretKey) {
    // Fail closed in production; allow in dev/test
    return process.env.NODE_ENV !== "production";
  }
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret: env.turnstileSecretKey, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}


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
    const clientIp = resolveClientIp(req.headers as Record<string, unknown>, req.ip);
    const allowed = await checkRateLimit(clientIp, "leads");
    if (!allowed) return reply.status(429).send({ error: "Too many requests" });

    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send({ error: parsed.error.flatten() });

    const { smsOptIn, locale, source } = parsed.data;

    const nameResult = sanitizeName(parsed.data.name);
    const emailResult = sanitizeEmail(parsed.data.email);
    const phoneResult = sanitizePhone(parsed.data.phone);
    if (!nameResult.ok || !emailResult.ok || !phoneResult.ok) {
      return reply.status(400).send({ error: "Invalid field values" });
    }

    const name = nameResult.value;
    const email = emailResult.value;
    const phone = phoneResult.value;

    const userAgent = String((req.headers["user-agent"] || "") as string);
    const tcpaTimestamp = smsOptIn ? new Date().toISOString() : null;
    const tcpaConsentText = smsOptIn ? (locale === "es" ? TCPA_CONSENT_ES : TCPA_CONSENT_EN) : null;
    const tcpaIp = smsOptIn ? clientIp || null : null;
    const tcpaUserAgent = smsOptIn ? userAgent || null : null;

    await pool.query(
      `INSERT INTO leads(name,email,phone,sms_opt_in,locale,source,tcpa_ip,tcpa_user_agent,tcpa_consent_text,tcpa_timestamp)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [name, email, phone || null, smsOptIn, locale, source, tcpaIp, tcpaUserAgent, tcpaConsentText, tcpaTimestamp],
    );
    await sendLeadNotification({ name, email, phone, smsOptIn, locale });
    return { ok: true };
  });

  app.post("/api/public/volunteer", async (req, reply) => {
    const clientIp = resolveClientIp(req.headers as Record<string, unknown>, req.ip);
    const allowed = await checkRateLimit(clientIp, "volunteer");
    if (!allowed) return reply.status(429).send({ error: "Too many requests" });

    const body = (req.body || {}) as Record<string, unknown>;

    // Turnstile verification
    const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
    const turnstileOk = await verifyTurnstile(turnstileToken, clientIp);
    if (!turnstileOk) {
      return reply.status(400).send({ error: "Bot check failed" });
    }

    const parsed = volunteerSignupSchema.safeParse(body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }

    const { interest, updatesOptIn, smsOptIn, sourcePath, locale, company } = parsed.data;

    // Honeypot
    if (company && company.trim()) {
      return reply.status(400).send({ error: "Invalid submission" });
    }

    const firstNameResult = sanitizeName(parsed.data.firstName);
    const lastNameResult = sanitizeName(parsed.data.lastName);
    const emailResult = sanitizeEmail(parsed.data.email);
    const phoneResult = sanitizePhone(parsed.data.phone);
    const zipResult = sanitizeZip(parsed.data.zip);
    if (!firstNameResult.ok || !lastNameResult.ok || !emailResult.ok || !phoneResult.ok || !zipResult.ok) {
      return reply.status(400).send({ error: "Invalid field values" });
    }

    const firstName = firstNameResult.value;
    const lastName = lastNameResult.value;
    const email = emailResult.value;
    const phone = phoneResult.value;
    const zip = zipResult.value;

    const timestamp = new Date().toISOString();
    const userAgent = String((req.headers["user-agent"] || "") as string);
    const tcpaConsentText = smsOptIn ? (locale === "es" ? TCPA_CONSENT_ES : TCPA_CONSENT_EN) : null;
    const tcpaIp = smsOptIn ? clientIp || null : null;
    const tcpaUserAgent = smsOptIn ? userAgent || null : null;
    const tcpaTimestamp = smsOptIn ? timestamp : null;

    await pool.query(
      `INSERT INTO volunteer_signups(first_name,last_name,email,phone,zip,interest,updates_opt_in,sms_opt_in,source_path,locale,tcpa_ip,tcpa_user_agent,tcpa_consent_text,tcpa_timestamp)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [firstName, lastName, email, phone || null, zip, interest, updatesOptIn, smsOptIn, sourcePath, locale, tcpaIp, tcpaUserAgent, tcpaConsentText, tcpaTimestamp],
    );

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
      timestamp,
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
