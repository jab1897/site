export const CANONICAL_HOSTNAME = "www.jorgefortexas.com";
export const CANONICAL_ORIGIN = `https://${CANONICAL_HOSTNAME}`;

const LEGACY_HOSTNAMES = new Set([
  "borregofortexas.com",
  "www.borregofortexas.com",
]);

const PRODUCTION_VERCEL_ALIASES = new Set([
  "site-frontend-psi.vercel.app",
  "site-frontend-jorge-borregos-projects.vercel.app",
  "site-frontend-git-main-jorge-borregos-projects.vercel.app",
]);

export function normalizeHostname(hostname: string): string {
  return hostname.trim().toLowerCase().replace(/\.$/, "");
}

export function isVercelHostname(hostname: string): boolean {
  const normalized = normalizeHostname(hostname);
  return normalized.endsWith(".vercel.app");
}

export function shouldRedirectToCanonical(
  hostname: string,
  vercelEnvironment = process.env.VERCEL_ENV,
): boolean {
  const normalized = normalizeHostname(hostname);

  if (LEGACY_HOSTNAMES.has(normalized)) {
    return true;
  }

  if (PRODUCTION_VERCEL_ALIASES.has(normalized)) {
    return true;
  }

  return isVercelHostname(normalized) && vercelEnvironment === "production";
}
