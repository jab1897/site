import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  CANONICAL_ORIGIN,
  isVercelHostname,
  shouldRedirectToCanonical,
} from "./lib/canonical-host";

const SUPPORTED_LOCALES = new Set(["en", "es"]);

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;

  if (shouldRedirectToCanonical(hostname)) {
    const destination = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      CANONICAL_ORIGIN,
    );
    return NextResponse.redirect(destination, 308);
  }

  const pathname = request.nextUrl.pathname;
  const match = pathname.match(/^\/(en|es)(\/|$)/);
  const locale = match && SUPPORTED_LOCALES.has(match[1]) ? match[1] : "en";

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  // Preview deployments remain usable for review, but search engines must not index them.
  if (isVercelHostname(hostname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|video).*)"
  ]
};
