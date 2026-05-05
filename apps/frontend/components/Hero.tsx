import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { WINRED_DONATE_URL } from "@/lib/config";

const copy = {
  en: {
    kicker: "Texas House District 118",
    headline: "Conservative leadership for San Antonio families.",
    subhead:
      "Jorge Borrego is fighting to lower property taxes, support law enforcement, defend parents’ rights, and protect the values that make Bexar County strong.",
    primary: "Donate Today",
    secondary: "Join Team Jorge",
    proof: "Endorsed by Governor Greg Abbott • Fighting for San Antonio families • Conservative leadership for Bexar County",
    imageAlt: "Jorge Borrego with his family",
  },
  es: {
    kicker: "Distrito 118 de la Cámara de Texas",
    headline: "Liderazgo conservador para las familias de San Antonio.",
    subhead:
      "Jorge Borrego lucha para bajar los impuestos a la propiedad, respaldar a la policía, defender los derechos de los padres y proteger los valores que hacen fuerte al condado de Bexar.",
    primary: "Donar hoy",
    secondary: "Únete al Equipo Jorge",
    proof: "Respaldado por el Gobernador Greg Abbott • Luchando por familias de San Antonio • Liderazgo conservador para el condado de Bexar",
    imageAlt: "Jorge Borrego con su familia",
  }
} as const;

export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="hero-v2 relative overflow-hidden">
      <div className="container relative z-10 grid items-center gap-8 py-10 md:grid-cols-[1.05fr_.95fr] md:py-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{t.kicker}</p>
          <h1 className="mt-3 text-balance text-4xl font-black leading-tight text-white md:text-6xl">{t.headline}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">{t.subhead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={WINRED_DONATE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{t.primary}</a>
            <Link href={`/${locale}/get-involved`} className="btn-secondary">{t.secondary}</Link>
          </div>
          <p className="mt-5 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90">{t.proof}</p>
        </div>

        <div className="hero-visual">
          <Image src="/images/family/family-main.jpg" alt={t.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          <div className="floating-card one">Lower Property Taxes</div>
          <div className="floating-card two">Support Law Enforcement</div>
          <div className="floating-card three">Parents&apos; Rights</div>
        </div>
      </div>
    </section>
  );
}
