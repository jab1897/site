import { describe, expect, it } from "vitest";
import {
  CANONICAL_HOSTNAME,
  isVercelHostname,
  normalizeHostname,
  shouldRedirectToCanonical,
} from "./canonical-host";

describe("canonical host routing", () => {
  it("normalizes hostnames safely", () => {
    expect(normalizeHostname(" WWW.JorgeForTexas.com. ")).toBe(
      CANONICAL_HOSTNAME,
    );
  });

  it("recognizes only real Vercel hostnames", () => {
    expect(isVercelHostname("site-frontend-psi.vercel.app")).toBe(true);
    expect(isVercelHostname("vercel.app.example.com")).toBe(false);
  });

  it("redirects the indexed production Vercel alias", () => {
    expect(
      shouldRedirectToCanonical("site-frontend-psi.vercel.app", "preview"),
    ).toBe(true);
  });

  it("redirects production deployment URLs but leaves previews reviewable", () => {
    expect(
      shouldRedirectToCanonical(
        "site-frontend-random-jorge-borregos-projects.vercel.app",
        "production",
      ),
    ).toBe(true);
    expect(
      shouldRedirectToCanonical(
        "site-frontend-random-jorge-borregos-projects.vercel.app",
        "preview",
      ),
    ).toBe(false);
  });

  it("redirects legacy campaign domains", () => {
    expect(shouldRedirectToCanonical("borregofortexas.com", "production")).toBe(
      true,
    );
    expect(
      shouldRedirectToCanonical("www.borregofortexas.com", "production"),
    ).toBe(true);
  });

  it("does not redirect the official campaign domain", () => {
    expect(shouldRedirectToCanonical(CANONICAL_HOSTNAME, "production")).toBe(
      false,
    );
  });
});
