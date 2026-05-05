import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = new Set(["en", "es"]);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const match = pathname.match(/^\/(en|es)(\/|$)/);
  const locale = match && SUPPORTED_LOCALES.has(match[1]) ? match[1] : "en";

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|video|robots.txt|sitemap.xml).*)"
  ]
};
