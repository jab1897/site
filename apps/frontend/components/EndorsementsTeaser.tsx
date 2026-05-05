import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/lib/i18n";

const ORG_LOGOS = [
  { src: "/assets/endorsements/sa-voter-guide.png", alt: "San Antonio Family Association PAC endorsement" },
  { src: "/assets/endorsements/trepac.png", alt: "TREPAC endorsement" },
  { src: "/assets/endorsements/thsc.png", alt: "Texas Home School Coalition endorsement" },
  { src: "/assets/endorsements/tlr.jpg", alt: "Texans for Lawsuit Reform endorsement" },
  { src: "/assets/endorsements/afc.jpg", alt: "AFC Victory Fund endorsement" },
] as const;

const HEADING = { en: "Endorsements", es: "Respaldos" } as const;
const QUOTE_ATTR = { en: "Governor Greg Abbott", es: "Gobernador Greg Abbott" } as const;
const SEE_ALL = { en: "See all endorsements", es: "Ver todos los respaldos" } as const;

export function EndorsementsTeaser({ locale }: { locale: Locale }) {
  return (
    <section className="border-t border-navy/10 bg-slate-50 py-12">
      <div className="container">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight text-navy md:text-5xl">
          {HEADING[locale]}
        </h2>

        <figure className="mx-auto mt-8 max-w-3xl rounded-3xl border border-navy/10 bg-white p-8 text-center shadow-sm">
          <blockquote className="text-xl font-semibold italic leading-relaxed text-slate-700 md:text-2xl">
            "Jorge Borrego is a determined conservative who will work to make South San Antonio safer
            and more affordable."
          </blockquote>
          <figcaption className="mt-4 text-base font-bold text-red">
            {QUOTE_ATTR[locale]}
          </figcaption>
          <div className="mt-5 flex justify-center">
            <Image
              src="/assets/endorsements/abbott.jpg"
              alt="Governor Greg Abbott endorses Jorge Borrego"
              width={480}
              height={240}
              className="max-h-40 w-auto rounded-xl object-cover"
            />
          </div>
        </figure>

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
