import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { WINRED_DONATE_URL } from "@/lib/config";

const copy = {
  en: {
    headline: "Conservative leadership for San Antonio families.",
    subheadline:
      "Jorge Borrego is fighting to lower property taxes, support law enforcement, defend parents’ rights, and protect the values that make Bexar County strong.",
    primary: "Donate Today",
    secondary: "Join Team Jorge",
    proof: "Endorsed by Governor Greg Abbott • Fighting for San Antonio families • Conservative leadership for Bexar County",
  },
  es: {
    headline: "Liderazgo conservador para las familias de San Antonio.",
    subheadline:
      "Jorge Borrego lucha para bajar los impuestos a la propiedad, respaldar a la policía, defender los derechos de los padres y proteger los valores que hacen fuerte al condado de Bexar.",
    primary: "Donar hoy",
    secondary: "Únete al Equipo Jorge",
    proof: "Respaldado por el Gobernador Greg Abbott • Luchando por familias de San Antonio • Liderazgo conservador para el condado de Bexar",
  },
} as const;

export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="hero-premium relative overflow-hidden border-b border-navy/10">
      <div className="star-layer star-layer-a" aria-hidden="true" />
      <div className="star-layer star-layer-b" aria-hidden="true" />
      <div className="container relative z-10 grid gap-8 py-8 md:py-14 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
        <div className="hero-panel">
          <Image src="/images/logo.png" alt="Jorge Borrego for Texas" width={500} height={200} priority className="h-auto w-full max-w-[380px]" />
          <h1 className="mt-5 text-4xl font-black leading-tight text-navy md:text-6xl">{t.headline}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl">{t.subheadline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={WINRED_DONATE_URL} target="_blank" rel="noopener noreferrer" className="btn-campaign-primary">{t.primary}</a>
            <Link href={`/${locale}/get-involved`} className="btn-campaign-secondary">{t.secondary}</Link>
          </div>
          <p className="mt-5 rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm font-semibold text-slate-700">{t.proof}</p>
        </div>

        <div className="hero-photo-wrap">
          <Image src="/images/family/family-main.jpg" alt="Jorge Borrego with his family" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
