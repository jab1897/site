import { SiteShell } from "@/components/SiteShell";
import { Locale, locales } from "@/lib/i18n";

export async function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "es" ? "es" : "en") as Locale;
  return <SiteShell locale={locale}>{children}</SiteShell>;
}
