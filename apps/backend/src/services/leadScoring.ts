export type ScorableLead = {
  phone?: string | null;
  smsOptIn?: boolean | null;
  sms_opt_in?: boolean | null;
  source?: string | null;
  tags?: string[] | string | null;
  utmCampaign?: string | null;
  utm_campaign?: string | null;
  createdAt?: string | Date | null;
  created_at?: string | Date | null;
};

function normalizeTags(tags: ScorableLead["tags"]): string[] {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim().toLowerCase()).filter(Boolean);
  }
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);
  }
  return [];
}

function parseCreatedAt(lead: ScorableLead): Date | null {
  const raw = lead.created_at ?? lead.createdAt;
  if (!raw) return null;
  const parsed = raw instanceof Date ? raw : new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function calculateLeadScore(lead: ScorableLead, now = new Date()): number {
  let score = 0;

  if (Boolean(lead.sms_opt_in ?? lead.smsOptIn)) {
    score += 3;
  }

  const phoneDigits = String(lead.phone ?? "").replace(/\D/g, "");
  if (phoneDigits.length >= 10) {
    score += 2;
  }

  const source = String(lead.source ?? "").toLowerCase();
  const tags = normalizeTags(lead.tags);
  if (source.includes("winred") || tags.includes("winred")) {
    score += 2;
  }

  if (String(lead.utm_campaign ?? lead.utmCampaign ?? "").trim()) {
    score += 1;
  }

  const createdAt = parseCreatedAt(lead);
  if (createdAt) {
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    if (createdAt >= sevenDaysAgo) {
      score += 1;
    }
  }

  return Math.min(10, score);
}
