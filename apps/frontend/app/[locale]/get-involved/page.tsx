import { VolunteerSignup } from "@/components/VolunteerSignup";
import { Locale } from "@/lib/i18n";

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-navy">Get involved</h1>
      <p className="mt-3 max-w-2xl text-slate-700">Help us connect with neighbors across District 118 and build momentum for election day.</p>

      <div className="mt-8">
        <VolunteerSignup locale={params.locale} />
      </div>
    </div>
  );
}
