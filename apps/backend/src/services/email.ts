import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = env.resendApiKey ? new Resend(env.resendApiKey) : null;

export async function sendLeadNotification(body: { name: string; email: string; phone?: string; smsOptIn: boolean; locale: string }) {
  if (!resend) return;
  await resend.emails.send({
    from: "Campaign Site <onboarding@resend.dev>",
    to: env.leadsNotifyEmail,
    subject: "New volunteer signup",
    html: `<p><strong>${body.name}</strong> signed up (${body.locale}). Email: ${body.email}. Phone: ${body.phone || "N/A"}. SMS: ${body.smsOptIn}</p>`
  });
}
