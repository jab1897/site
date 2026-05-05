import Image from "next/image";
import { Locale, labels } from "@/lib/i18n";
import { getAboutContent } from "@/lib/about";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "es" ? "es" : "en") as Locale;
  const t = labels[locale];
  const c = getAboutContent(locale);

  return (
    <div className="container py-12 space-y-6">
      <h1 className="text-3xl font-bold">
        {locale === "es" ? "Acerca de Jorge Borrego" : "About Jorge Borrego"}
      </h1>

      <section className="space-y-6 text-lg leading-8">
        <p>{c.intro}</p>

        <figure className="space-y-3">
          <Image
            src="/images/about/childhood.jpg"
            alt={locale === "es" ? "Jorge Borrego de niño" : "Jorge Borrego as a child"}
            width={1500}
            height={1000}
            className="w-full rounded-3xl border border-navy/10 object-cover shadow"
          />
          <figcaption className="text-sm text-slate-600">{c.caption1}</figcaption>
        </figure>

        <p>{c.para1}</p>

        <p>{c.para2}</p>

        <figure className="space-y-3">
          <Image
            src="/images/about/utsa.jpg"
            alt={locale === "es" ? "Jorge Borrego en la UTSA" : "Jorge Borrego at UTSA"}
            width={1500}
            height={1000}
            className="w-full rounded-3xl border border-navy/10 object-cover shadow"
          />
          <figcaption className="text-sm text-slate-600">{c.caption2}</figcaption>
        </figure>

        <p>{c.para3}</p>

        <figure className="space-y-3">
          <Image
            src="/images/about/wedding.jpg"
            alt={locale === "es" ? "Jorge y Lexie el día de su boda" : "Jorge and Lexie on their wedding day"}
            width={1500}
            height={1000}
            className="w-full rounded-3xl border border-navy/10 object-cover shadow"
          />
          <figcaption className="text-sm text-slate-600">{c.caption3}</figcaption>
        </figure>

        <p>{c.para4}</p>

        <p>{c.faith}</p>

        <p>{c.tppf}</p>

        <figure className="space-y-3">
          <Image
            src="/images/about/school-choice.jpg"
            alt={
              locale === "es"
                ? "Jorge Borrego defendiendo la elección de escuelas en Texas"
                : "Jorge Borrego advocating for school choice in Texas"
            }
            width={1500}
            height={1000}
            className="w-full rounded-3xl border border-navy/10 object-cover shadow"
          />
          <figcaption className="text-sm text-slate-600">{c.caption4}</figcaption>
        </figure>

        <p>{c.schoolsPara}</p>

        <p>{c.accountabilityPara}</p>

        <p>{c.policyPara}</p>

        <p>{c.valuesPara}</p>

        <p>{c.motivationPara}</p>

        <p>{c.leadershippara}</p>

        <div className="relative overflow-hidden rounded-3xl border border-navy/10">
          <Image
            src="/images/family/walking-away.jpg"
            alt={locale === "es" ? "La familia Borrego caminando juntos" : "Borrego family walking together"}
            width={1500}
            height={700}
            className="w-full rounded-3xl border border-navy/10 object-cover shadow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />
          <div className="absolute bottom-0 p-6 text-lg font-medium text-white">{c.overlayText}</div>
        </div>

        <p>{c.callPara}</p>

        <p>{c.closingLine}</p>
      </section>

      <div className="flex flex-wrap gap-3">
        <a
          href={`/${locale}/donate`}
          className="inline-flex items-center justify-center rounded-md bg-red px-5 py-3 font-semibold text-white transition hover:brightness-95"
        >
          {t.donate}
        </a>
        <a
          href={`/${locale}/get-involved`}
          className="inline-flex items-center justify-center rounded-md border-2 border-navy px-5 py-3 font-semibold text-navy transition hover:bg-navy hover:text-white"
        >
          {t.volunteer}
        </a>
      </div>
    </div>
  );
}
