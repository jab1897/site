"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";

function swapLocale(pathname: string, from: Locale, to: Locale): string {
  const prefix = `/${from}`;
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    return `/${to}${pathname.slice(prefix.length)}`;
  }
  return `/${to}`;
}

export function LanguageToggle({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "es" : "en";
  const otherPath = swapLocale(pathname, locale, other);

  function persist() {
    document.cookie = `locale=${other};path=/;max-age=31536000;samesite=lax`;
  }

  return (
    <Link
      href={otherPath}
      onClick={persist}
      lang={other}
      aria-label={other === "es" ? "Cambiar a Español" : "Switch to English"}
      className={className}
    >
      {other === "es" ? "Español" : "English"}
    </Link>
  );
}
