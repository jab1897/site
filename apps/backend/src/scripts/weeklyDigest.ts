import { stringify } from "csv-stringify/sync";
import { Resend } from "resend";
import { env } from "../config/env.js";
import { pool } from "../db/client.js";
import { calculateLeadScore } from "../services/leadScoring.js";

async function runWeeklyDigest() {
  if (!env.databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  if (!env.resendApiKey) {
    throw new Error("RESEND_API_KEY is required");
  }

  const resend = new Resend(env.resendApiKey);
  const now = new Date();
  const from = new Date(now);
  from.setDate(from.getDate() - 7);

  const rows = (
    await pool.query("SELECT * FROM leads WHERE created_at >= $1 AND created_at <= $2 ORDER BY created_at DESC", [from.toISOString(), now.toISOString()])
  ).rows;

  const scored = rows.map((lead) => ({ ...lead, leadScore: calculateLeadScore(lead, now) }));
  const hotLeads = scored.filter((lead) => lead.leadScore >= 7);
  const smsOptIns = scored.filter((lead) => Boolean(lead.sms_opt_in)).length;

  const sourceCounts = new Map<string, number>();
  for (const lead of scored) {
    const source = String(lead.source || "unknown").trim() || "unknown";
    sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);
  }

  const topSources = [...sourceCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topLeads = [...scored].sort((a, b) => b.leadScore - a.leadScore || new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10);

  const csv = stringify(
    scored.map((lead) => ({
      id: lead.id,
      created_at: lead.created_at,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      sms_opt_in: lead.sms_opt_in,
      source: lead.source,
      utm_campaign: lead.utm_campaign,
      lead_score: lead.leadScore
    })),
    { header: true }
  );

  const smsPct = scored.length ? Math.round((smsOptIns / scored.length) * 100) : 0;
  const html = `
    <h2>Weekly Executive Digest</h2>
    <p><strong>Range:</strong> ${from.toISOString().slice(0, 10)} to ${now.toISOString().slice(0, 10)}</p>
    <ul>
      <li>New leads: ${scored.length}</li>
      <li>Hot leads (score ≥ 7): ${hotLeads.length}</li>
      <li>SMS opt-ins: ${smsOptIns} (${smsPct}%)</li>
    </ul>
    <h3>Top Sources</h3>
    <ol>${topSources.map(([source, count]) => `<li>${source}: ${count}</li>`).join("")}</ol>
    <h3>Top 10 Leads by Score</h3>
    <table border="1" cellpadding="6" cellspacing="0">
      <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Score</th><th>Source</th><th>Created At</th></tr></thead>
      <tbody>
        ${topLeads
          .map(
            (lead) =>
              `<tr><td>${lead.name ?? ""}</td><td>${lead.email ?? ""}</td><td>${lead.phone ?? ""}</td><td>${lead.leadScore}</td><td>${lead.source ?? ""}</td><td>${lead.created_at ?? ""}</td></tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;

  await resend.emails.send({
    from: env.emailFrom,
    to: "jorge@jorgefortexas.com",
    subject: `Weekly Executive Digest (${from.toISOString().slice(0, 10)} - ${now.toISOString().slice(0, 10)})`,
    html,
    attachments: [
      {
        filename: `leads-${from.toISOString().slice(0, 10)}-to-${now.toISOString().slice(0, 10)}.csv`,
        content: Buffer.from(csv).toString("base64")
      }
    ]
  });

  console.info("Weekly digest sent", {
    newLeads: scored.length,
    hotLeads: hotLeads.length,
    smsOptIns,
    topSources: topSources.length
  });
}

runWeeklyDigest()
  .catch((error) => {
    console.error("Weekly digest failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
