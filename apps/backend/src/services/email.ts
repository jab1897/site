import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = env.resendApiKey ? new Resend(env.resendApiKey) : null;

export async function sendLeadNotification(body: { name: string; email: string; phone?: string; smsOptIn: boolean; locale: string }) {
  if (!resend) return;
  await resend.emails.send({
    from: process.env.EMAIL_FROM || "info@jorgefortexas.com",
    to: env.leadsNotifyEmail,
    subject: "New volunteer signup",
    html: `<p><strong>${body.name}</strong> signed up (${body.locale}). Email: ${body.email}. Phone: ${body.phone || "N/A"}. SMS: ${body.smsOptIn}</p>`
  });
}

type VolunteerEmailBody = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  zip: string;
  interest: string;
  updatesOptIn: boolean;
  smsOptIn: boolean;
  sourcePath: string;
  locale: string;
  userAgent?: string;
  timestamp: string;
};

export async function sendVolunteerNotification(body: VolunteerEmailBody) {
  if (!resend) return;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "info@jorgefortexas.com",
    to: env.volunteerNotifyEmail || "info@jorgefortexas.com",
    subject: "New volunteer signup",
    html: `
      <h2>New volunteer signup</h2>
      <p><strong>Timestamp:</strong> ${body.timestamp}</p>
      <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone || "N/A"}</p>
      <p><strong>ZIP:</strong> ${body.zip}</p>
      <p><strong>Interest:</strong> ${body.interest}</p>
      <p><strong>Campaign updates opt-in:</strong> ${body.updatesOptIn}</p>
      <p><strong>SMS opt-in:</strong> ${body.smsOptIn}</p>
      <p><strong>Locale:</strong> ${body.locale}</p>
      <p><strong>Source path:</strong> ${body.sourcePath}</p>
      <p><strong>User agent:</strong> ${body.userAgent || "N/A"}</p>
    `
  });
}

export async function sendVolunteerConfirmationEmail(input: { email: string; firstName: string; interest: string }) {
  if (!resend) return;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "info@jorgefortexas.com",
    to: input.email,
    subject: "Thanks for joining Team Borrego",
    html: `<p>Hi ${input.firstName},</p><p>Thank you for joining Team Borrego. We will contact you soon about <strong>${input.interest}</strong>.</p><p>— Team Borrego</p>`
  });
}
