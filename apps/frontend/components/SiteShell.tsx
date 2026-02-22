"use client";

import Link from "next/link";
import { useState } from "react";
import { labels, Locale } from "@/lib/i18n";
import { flags, WINRED_DONATE_URL } from "@/lib/config";
import { ElectionCountdown } from "@/components/ElectionCountdown";

export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = labels[locale];
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    ["", t.nav.home],
    ["about", t.nav.about],
    ["issues", t.nav.issues],
    ["endorsements", t.nav.endorsements],
    ["get-involved", t.nav.involved]
  ] as const;

  return (
    <>
      {flags.showEarlyVotingBanner && <ElectionCountdown />}
      <header className="sticky top-0 z-40 border-b border-navy/10 bg-navy text-white">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href={`/${locale}`} className="font-bold tracking-wide">Jorge Borrego</Link>
            <nav className="hidden items-center gap-5 text-sm md:flex">
              {links.map(([href, label]) => (
                <Link key={href} href={`/${locale}/${href}`} className="opacity-95 transition hover:text-red">
                  {label}
                </Link>
              ))}
              {flags.showGalleryInNav && <Link href={`/${locale}/gallery`}>Gallery</Link>}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a href={WINRED_DONATE_URL} target="_blank" rel="noopener noreferrer" className="hidden rounded-md bg-red px-4 py-2 text-sm font-semibold md:inline-block">
              {t.donate}
            </a>
            <button className="rounded border border-white/30 px-3 py-2 text-sm md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen} aria-controls="mobile-nav">
              ☰
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav id="mobile-nav" className="border-t border-white/15 bg-navy/95 px-4 py-3 md:hidden">
            <div className="container flex flex-col gap-3 text-sm">
              {links.map(([href, label]) => (
                <Link key={href} href={`/${locale}/${href}`} onClick={() => setMobileOpen(false)} className="opacity-95">
                  {label}
                </Link>
              ))}
              <a href={WINRED_DONATE_URL} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block rounded bg-red px-3 py-2 text-center font-semibold">
                {t.nav.donate}
              </a>
            </div>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-navy text-white flex z-50">
        <a href={WINRED_DONATE_URL} target="_blank" rel="noopener noreferrer" className="w-1/2 text-center py-3 bg-red">{t.donate}</a>
        <a href={`/${locale}/get-involved`} className="w-1/2 text-center py-3">{t.volunteer}</a>
      </div>
      <footer className="border-t mt-16 mb-14 md:mb-0">
        <div className="container py-8 text-sm flex flex-wrap gap-4 justify-between">
          <div>Pol. Ad. Paid for Jorge Borrego Campaign</div>
          <div className="flex gap-4"><a href={`/${locale}/privacy`}>{t.nav.privacy}</a><a href={`/${locale}/terms`}>{t.nav.terms}</a></div>
        </div>
      </footer>
    </>
  );
}
