import { SiteShell } from "@/components/SiteShell";
import { Locale, locales } from "@/lib/i18n";

export async function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) {
  return <SiteShell locale={params.locale}>{children}</SiteShell>;
}
