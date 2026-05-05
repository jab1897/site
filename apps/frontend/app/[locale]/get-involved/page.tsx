import { VolunteerSignup } from "@/components/VolunteerSignup";
import { Locale, labels } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "es" ? "es" : "en") as Locale;
  const t = labels[locale].getInvolved;

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-navy">{t.pageHeading}</h1>
      <p className="mt-3 max-w-2xl text-slate-700">{t.pageSubhead}</p>

      <div className="mt-8">
        <VolunteerSignup locale={locale} />
      </div>
    </div>
  );
}
