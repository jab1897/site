import { Locale, labels } from "@/lib/i18n";

export default function Page({ params }: { params: { locale: Locale } }) {
  const t = labels[params.locale].pages.privacy;

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-navy">{t.heading}</h1>
      <p className="mt-6 text-lg leading-8 text-slate-700">{t.body}</p>
    </div>
  );
}
