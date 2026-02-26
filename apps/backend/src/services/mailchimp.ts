import { createHash } from "node:crypto";
import { env } from "../config/env.js";
import { calculateLeadScore, type ScorableLead } from "./leadScoring.js";

type MailchimpLead = ScorableLead & {
  email?: string | null;
  name?: string | null;
  first_name?: string | null;
  firstName?: string | null;
  last_name?: string | null;
  lastName?: string | null;
  updates_opt_in?: boolean | null;
  email_opt_in?: boolean | null;
  emailMarketingOptIn?: boolean | null;
};

function splitName(lead: MailchimpLead) {
  const first = String(lead.first_name ?? lead.firstName ?? "").trim();
  const last = String(lead.last_name ?? lead.lastName ?? "").trim();
  if (first || last) return { firstName: first, lastName: last };

  const fullName = String(lead.name ?? "").trim();
  if (!fullName) return { firstName: "", lastName: "" };

  const [firstName, ...rest] = fullName.split(/\s+/);
  return { firstName: firstName || "", lastName: rest.join(" ") };
}

function resolveStatus(lead: MailchimpLead): "subscribed" | "unsubscribed" | "pending" {
  const optInFields = [lead.email_opt_in, lead.emailMarketingOptIn, lead.updates_opt_in];
  const explicit = optInFields.find((value) => typeof value === "boolean");
  if (typeof explicit !== "boolean") return "pending";
  return explicit ? "subscribed" : "unsubscribed";
}

function getMemberId(email: string): string {
  return createHash("md5").update(email.trim().toLowerCase()).digest("hex");
}

export function isMailchimpConfigured() {
  return Boolean(env.mailchimpApiKey && env.mailchimpServerPrefix && env.mailchimpAudienceId);
}

export async function syncLeadsBatchToMailchimp(leads: MailchimpLead[], logger?: { info: (payload: unknown, msg?: string) => void; error: (payload: unknown, msg?: string) => void; }) {
  if (!isMailchimpConfigured()) {
    throw new Error("Mailchimp environment variables are not configured");
  }

  const endpointBase = `https://${env.mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${env.mailchimpAudienceId}/members`;
  let processed = 0;
  let failed = 0;

  for (const lead of leads) {
    const email = String(lead.email ?? "").trim().toLowerCase();
    if (!email) continue;

    const { firstName, lastName } = splitName(lead);
    const body = {
      email_address: email,
      status_if_new: resolveStatus(lead),
      status: resolveStatus(lead),
      merge_fields: {
        FNAME: firstName || undefined,
        LNAME: lastName || undefined,
        PHONE: String(lead.phone ?? "").trim() || undefined,
        SOURCE: String(lead.source ?? "").trim() || undefined,
        LEAD_SCORE: calculateLeadScore(lead)
      }
    };

    try {
      const response = await fetch(`${endpointBase}/${getMemberId(email)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${env.mailchimpApiKey}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        failed += 1;
        logger?.error({ status: response.status, email, errorText }, "Mailchimp upsert failed");
      } else {
        processed += 1;
      }
    } catch (error) {
      failed += 1;
      logger?.error({ err: error, email }, "Mailchimp request error");
    }
  }

  logger?.info({ processed, failed }, "Mailchimp sync completed");
  return { processed, failed };
}
