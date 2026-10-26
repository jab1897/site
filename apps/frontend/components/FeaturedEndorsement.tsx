import { Locale } from "@/lib/i18n";
import { videoEndorsements } from "@/lib/endorsements";
import { VideoEndorsement, VoteCta } from "@/components/VideoEndorsement";

const KICKER = {
  en: "Endorsed by State Rep. John Lujan, HD-118",
  es: "Respaldado por el Representante Estatal John Lujan, Distrito 118",
} as const;
const HEADLINE = {
  en: ["He’s won this district twice.", "He trusts Jorge with it."],
  es: ["Ganó este distrito dos veces.", "Confía en Jorge."],
} as const;
const SUBHEAD = {
  en: "Hear why the man who represents House District 118 today is voting for Jorge Borrego.",
  es: "Escuche por qué el hombre que hoy representa al Distrito 118 vota por Jorge Borrego.",
} as const;
const NEXT_LABEL = { en: "Mayor Maxwell", es: "Alcalde Maxwell" } as const;

export function FeaturedEndorsement({ locale }: { locale: Locale }) {
  const lujan = videoEndorsements.lujan;

  return (
    <section id="lujan" className="scroll-mt-24 bg-navy py-12 text-white">
      <div className="container grid items-center gap-8 md:grid-cols-[minmax(0,340px)_1fr] md:gap-12">
        <VideoEndorsement
          endorsement={lujan}
          locale={locale}
          next={{ label: NEXT_LABEL[locale], href: "#maxwell" }}
          className="mx-auto max-w-[340px]"
        />
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f3b5bd]">{KICKER[locale]}</p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-5xl">
            {HEADLINE[locale][0]} <span className="text-[#ff6b7d]">{HEADLINE[locale][1]}</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg text-slate-300">{SUBHEAD[locale]}</p>
          <blockquote className="mt-6 border-l-4 border-red pl-4">
            <p className="text-xl font-semibold leading-snug">{lujan.quote[locale]}</p>
            <footer className="mt-1 text-sm text-slate-300">— Rep. John Lujan</footer>
          </blockquote>
          <div className="mt-7">
            <VoteCta locale={locale} onDark />
          </div>
        </div>
      </div>
    </section>
  );
}
