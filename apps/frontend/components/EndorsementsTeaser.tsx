import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { videoEndorsements } from "@/lib/endorsements";
import { VideoEndorsement } from "@/components/VideoEndorsement";

const ORG_LOGOS = [
  { src: "/images/endorsements/sa-voter-guide.png", alt: "San Antonio Family Association PAC endorsement" },
  { src: "/images/endorsements/trepac.png", alt: "TREPAC endorsement" },
  { src: "/images/endorsements/thsc.png", alt: "Texas Home School Coalition endorsement" },
  { src: "/images/endorsements/tlr.jpg", alt: "Texans for Lawsuit Reform endorsement" },
  { src: "/images/endorsements/afc.jpg", alt: "AFC Victory Fund endorsement" },
] as const;

const HEADING = { en: "Endorsements", es: "Respaldos" } as const;
const QUOTE_ATTR = { en: "Governor Greg Abbott", es: "Gobernador Greg Abbott" } as const;
const SEE_ALL = { en: "See all endorsements", es: "Ver todos los respaldos" } as const;
const LUJAN_LABEL = { en: "Rep. Lujan", es: "Rep. Lujan" } as const;
// Campaign-authored endorsement text used in place of the prior live quote.
// TODO: Replace with revised direct quote only after approval from Governor Abbott's team.
const ABBOTT_ENDORSEMENT = {
  en: "Governor Greg Abbott has endorsed Jorge Borrego, the Republican candidate for Texas House District 118.",
  es: "El Gobernador Greg Abbott ha respaldado a Jorge Borrego, el candidato Republicano para la Cámara de Representantes de Texas, Distrito 118.",
} as const;

export function EndorsementsTeaser({ locale }: { locale: Locale }) {
  const maxwell = videoEndorsements.maxwell;

  return (
    <section className="border-t border-navy/10 bg-slate-50 py-12">
      <div className="container">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight text-navy md:text-5xl">
          {HEADING[locale]}
        </h2>

        <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
          <figure className="rounded-3xl border border-navy/10 bg-white p-8 text-center shadow-sm">
            <blockquote className="text-xl font-semibold leading-relaxed text-slate-700 md:text-2xl">
              {ABBOTT_ENDORSEMENT[locale]}
            </blockquote>
            <figcaption className="mt-4 text-base font-bold text-red">
              {QUOTE_ATTR[locale]}
            </figcaption>
            <div className="mt-5 flex justify-center">
              <Image
                src="/images/endorsements/abbott.jpg"
                alt="Governor Greg Abbott endorses Jorge Borrego"
                width={480}
                height={240}
                className="max-h-40 w-auto rounded-xl object-cover"
              />
            </div>
          </figure>

          <figure id="maxwell" className="scroll-mt-24 rounded-3xl border border-navy/10 bg-white p-8 text-center shadow-sm">
            <VideoEndorsement
              endorsement={maxwell}
              locale={locale}
              next={{ label: LUJAN_LABEL[locale], href: "#lujan" }}
              className="mx-auto max-w-[240px]"
            />
            <blockquote className="mt-5 text-lg font-semibold leading-relaxed text-slate-700">
              {maxwell.quote[locale]}
            </blockquote>
            <figcaption className="mt-3 text-base font-bold text-red">
              {`${maxwell.name}, ${maxwell.title[locale]}`}
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {ORG_LOGOS.map((logo) => (
            <div key={logo.src} className="relative h-20 w-36">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="144px" />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/endorsements`}
            className="inline-block rounded-md border-2 border-navy px-6 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
          >
            {SEE_ALL[locale]}
          </Link>
        </div>
      </div>
    </section>
  );
}
