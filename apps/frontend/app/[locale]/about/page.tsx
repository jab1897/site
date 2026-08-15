import Image from "next/image";
import { Locale, labels } from "@/lib/i18n";
import { getAboutContent } from "@/lib/about";
import { AboutCarousel } from "@/components/AboutCarousel";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "es" ? "es" : "en") as Locale;
  const t = labels[locale];
  const c = getAboutContent(locale);

  const slides = [
    {
      src: "/images/about/childhood.jpg",
      alt: locale === "es" ? "Jorge Borrego de niño" : "Jorge Borrego as a child",
      caption: c.caption1,
    },
    {
      src: "/images/about/utsa.jpg",
      alt: locale === "es" ? "Jorge Borrego en la UTSA" : "Jorge Borrego at UTSA",
      caption: c.caption2,
    },
    {
      src: "/images/about/wedding.jpg",
      alt: locale === "es" ? "Jorge y Lexie el día de su boda" : "Jorge and Lexie on their wedding day",
      caption: c.caption3,
    },
    {
      src: "/images/about/school-choice.jpg",
      alt:
        locale === "es"
          ? "Jorge Borrego en un evento sobre educación"
          : "Jorge Borrego at an education event",
      caption: c.caption4,
    },
  ];

  return (
    <div className="container py-10">
      {/* Page header */}
      <h1 className="text-4xl font-black uppercase tracking-tight text-red">
        {locale === "es" ? "Conoce a Jorge Borrego" : "Meet Jorge Borrego"}
      </h1>
      <p className="mt-1 text-lg font-semibold uppercase text-navy">
        {locale === "es" ? "Para la Cámara de Texas, Distrito 118" : "For Texas House District 118"}
      </p>

      {/* Carousel + body text share the same max-width column */}
      <div className="mt-6 max-w-3xl space-y-8">
        <AboutCarousel slides={slides} />

        <div className="space-y-5 text-lg leading-8 text-slate-700">
          <p>{c.para1}</p>
          <p>{c.para2}</p>
          <p>{c.para3}</p>
          <p>{c.para4}</p>
          <p>{c.para5}</p>
          <p>{c.para6}</p>
        </div>

        {/* Family photo banner */}
        <div className="relative overflow-hidden rounded-3xl border border-navy/10">
        <Image
          src="/images/family/walking-away.jpg"
          alt={locale === "es" ? "La familia Borrego caminando juntos" : "Borrego family walking together"}
          width={1500}
          height={700}
          className="w-full object-cover"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />
          <div className="absolute bottom-0 p-6 text-lg font-medium text-white">{c.overlayText}</div>
        </div>

        {/* CTAs */}
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
    </div>
  );
}
