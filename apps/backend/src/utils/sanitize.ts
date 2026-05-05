const HTML_RE = /<[^>]*>/g;
const INJECTION_RE = /javascript:|data:|vbscript:/gi;

function stripHtml(value: string): string {
  return value.replace(HTML_RE, "").replace(INJECTION_RE, "");
}

export function sanitizeName(raw: string): { ok: boolean; value: string } {
  const value = stripHtml(raw.trim());
  if (value.length < 2 || value.length > 100) return { ok: false, value };
  return { ok: true, value };
}

// Simplified RFC 5322 — covers all practical addresses without catastrophic backtracking
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function sanitizeEmail(raw: string): { ok: boolean; value: string } {
  const value = raw.trim().toLowerCase();
  if (!EMAIL_RE.test(value)) return { ok: false, value };
  return { ok: true, value };
}

export function sanitizePhone(raw: string | undefined): { ok: boolean; value: string | undefined } {
  if (!raw || !raw.trim()) return { ok: true, value: undefined };
  const digits = raw.replace(/\D/g, "");
  // US: 10 digits (no country code) or 11 digits starting with 1
  if (digits.length === 10) return { ok: true, value: `+1${digits}` };
  if (digits.length === 11 && digits.startsWith("1")) return { ok: true, value: `+${digits}` };
  // International: 7–15 digits (E.164 range)
  if (digits.length >= 7 && digits.length <= 15) return { ok: true, value: `+${digits}` };
  return { ok: false, value: undefined };
}

export function sanitizeZip(raw: string): { ok: boolean; value: string } {
  const value = raw.trim().replace(/[^\d-]/g, "");
  if (value.length < 5) return { ok: false, value };
  return { ok: true, value };
}
