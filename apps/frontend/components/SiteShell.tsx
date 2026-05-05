"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { labels, Locale } from "@/lib/i18n";
import { flags, WINRED_DONATE_URL } from "@/lib/config";
import { ElectionCountdown } from "@/components/ElectionCountdown";
import { LanguageToggle } from "@/components/LanguageToggle";

export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = labels[locale];
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    ["", t.nav.home],
    ["about", t.nav.about],
    ["issues", t.nav.issues],
    ["endorsements", t.nav.endorsements],
    ["get-involved", t.nav.involved]
  ] as const;

  // Focus trap + ESC close for the mobile menu
  useEffect(() => {
    if (!mobileOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusable = Array.from(
      menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);

    // Prevent body scroll while menu is open
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  function closeMenu() {
    setMobileOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      {flags.showEarlyVotingBanner && <ElectionCountdown />}

      <header className="sticky top-0 z-40 border-b border-navy/10 bg-white/95 text-navy backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href={`/${locale}`} className="font-black tracking-wide text-navy">
              Jorge Borrego
            </Link>
            <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-semibold md:flex">
              {links.map(([href, label]) => (
                <Link key={href} href={`/${locale}/${href}`} className="transition hover:text-red focus-visible:text-red">
                  {label}
                </Link>
              ))}
              {flags.showGalleryInNav && <Link href={`/${locale}/gallery`}>Gallery</Link>}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle
              locale={locale}
              className="hidden text-sm font-semibold text-navy/70 underline underline-offset-2 transition hover:text-navy md:inline-block"
            />
            <a
              href={WINRED_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg bg-red px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-95 md:inline-block"
            >
              {t.donate}
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded border border-navy/20 md:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu overlay */}
      {mobileOpen && (
        <div
          ref={menuRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 flex flex-col bg-navy px-6 py-5 text-white md:hidden"
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <Link
              href={`/${locale}`}
              onClick={closeMenu}
              className="font-bold tracking-wide text-white"
            >
              Jorge Borrego
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded border border-white/30 text-white"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Nav links */}
          <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-1">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={`/${locale}/${href}`}
                onClick={closeMenu}
                className="flex min-h-[44px] items-center text-lg font-semibold text-white opacity-95 transition hover:text-red"
              >
                {label}
              </Link>
            ))}
            {flags.showGalleryInNav && (
              <Link
                href={`/${locale}/gallery`}
                onClick={closeMenu}
                className="flex min-h-[44px] items-center text-lg font-semibold text-white"
              >
                Gallery
              </Link>
            )}
          </nav>

          {/* Donate CTA and language toggle pinned at bottom */}
          <div className="mt-auto space-y-3 pt-6">
            <a
              href={WINRED_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-red text-lg font-bold text-white"
            >
              {t.donate}
            </a>
            <LanguageToggle
              locale={locale}
              className="flex min-h-[44px] w-full items-center justify-center text-base font-semibold text-navy/70 underline underline-offset-2"
            />
          </div>
        </div>
      )}

      <main>{children}</main>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex bg-navy text-white md:hidden">
        <a
          href={WINRED_DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] w-1/2 items-center justify-center bg-red font-semibold"
        >
          {t.donate}
        </a>
        <a
          href={`/${locale}/get-involved`}
          className="flex min-h-[44px] w-1/2 items-center justify-center font-semibold"
        >
          {t.volunteer}
        </a>
      </div>

      <footer className="mb-14 mt-16 border-t md:mb-0">
        <div className="container flex flex-wrap justify-between gap-4 py-8 text-sm">
          <div>Pol. Ad. Paid for Jorge Borrego Campaign</div>
          <div className="flex flex-wrap gap-4">
            <a href={`/${locale}/privacy`}>{t.nav.privacy}</a>
            <a href={`/${locale}/terms`}>{t.nav.terms}</a>
            <LanguageToggle locale={locale} className="font-medium underline underline-offset-2" />
          </div>
        </div>
      </footer>
    </>
  );
}
