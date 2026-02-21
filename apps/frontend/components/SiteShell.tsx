"use client";

const getDonateHref = (apiUrl: string, locale: string) => {
  const base = apiUrl?.replace(/\/$/, "") || "";
  const loc = locale || "en";
  const path = loc === "es" ? "/es" : "/en";
  return `${base}/api/public/donate?locale=${encodeURIComponent(loc)}&path=${encodeURIComponent(path)}`;
};

import Link from "next/link";
import { usePathname } from "next/navigation";
import { labels, Locale } from "@/lib/i18n";
import { flags, getElectionBanner } from "@/lib/config";

export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = labels[locale];
  const pathname = usePathname();
  const banner = getElectionBanner();
  const links = [
    ["", t.nav.home],
    ["about", t.nav.about],
    ["issues", t.nav.issues],
    ["endorsements", t.nav.endorsements],
    ["get-involved", t.nav.involved],
    ["donate", t.nav.donate]
  ] as const;

  return (
    <>
      {flags.showEarlyVotingBanner && <div className="bg-red text-white text-center py-2 text-sm">{banner.label}: {banner.date}</div>}
      <header className="border-b sticky top-0 bg-white z-40">
        <div className="container flex items-center justify-between py-4">
          <Link href={`/${locale}`} className="font-bold text-navy">Jorge Borrego</Link>
          <nav className="hidden md:flex gap-4 text-sm">
            {links.map(([href, label]) => <Link key={href} href={`/${locale}/${href}`} className="hover:text-red">{label}</Link>)}
            {flags.showGalleryInNav && <Link href={`/${locale}/gallery`}>Gallery</Link>}
          </nav>
          <div className="flex gap-2">
            <Link href={pathname?.startsWith("/es") ? pathname.replace("/es", "/en") : pathname?.replace("/en", "/es") || "/es"} className="text-sm border px-2 py-1">{locale === "en" ? "ES" : "EN"}</Link>
            <Link href={getDonateHref(process.env.NEXT_PUBLIC_API_URL as string, locale)} className="bg-red text-white px-3 py-1 rounded">{t.donate}</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <a className="fixed right-4 bottom-20 hidden md:block bg-red text-white px-4 py-2 rounded-full" href={getDonateHref(process.env.NEXT_PUBLIC_API_URL as string, locale)}>{t.donate}</a>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-navy text-white flex">
        <a href={getDonateHref(process.env.NEXT_PUBLIC_API_URL as string, locale)} className="w-1/2 text-center py-3 bg-red">{t.donate}</a>
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
