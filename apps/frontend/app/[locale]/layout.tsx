import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Locale, locales } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jorgefortexas.com";

export async function generateStaticParams() { return locales.map((locale) => ({ locale })); }

const META = {
  en: {
    title: "Jorge Borrego for Texas House District 118 | Republican Candidate",
    description:
      "Jorge Borrego is the Republican candidate for Texas House District 118, fighting to lower costs, cut property taxes, keep families safe, strengthen schools, and put Texans first.",
  },
  es: {
    title: "Jorge Borrego para la Cámara de Texas, Distrito 118 | Candidato Republicano",
    description:
      "Jorge Borrego es el candidato Republicano para la Cámara de Representantes de Texas, Distrito 118. Está luchando para bajar los costos, reducir los impuestos a la propiedad, mantener seguras a las familias, fortalecer las escuelas y poner primero a los texanos.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "es" ? "es" : "en";
  const meta = META[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        es: `${SITE_URL}/es`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_MX",
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "es" ? "es" : "en") as Locale;
  return <SiteShell locale={locale}>{children}</SiteShell>;
}
