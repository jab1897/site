import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { LeadForm } from "@/components/LeadForm";
import { DonateButtons } from "@/components/DonateButtons";
import { EndorsementsTeaser } from "@/components/EndorsementsTeaser";
import { Hero } from "@/components/Hero";

const topIssues = {
  en: [
    ["Lower Property Taxes", "Deliver lasting tax relief for homeowners and working families."],
    ["Safe Neighborhoods", "Back local law enforcement with resources, training, and public support."],
    ["Parents Back in Charge", "Put families in charge of their children’s education and future."],
    ["Stop Taxpayer Funded Lobbying", "End insider influence and protect taxpayer dollars."],
    ["Defend Texas Values", "Protect faith, family, freedom, and personal responsibility."]
  ],
  es: [
    ["Bajar impuestos a la propiedad", "Alivio fiscal duradero para propietarios y familias trabajadoras."],
    ["Vecindarios seguros", "Respaldar a la policía local con recursos, capacitación y apoyo público."],
    ["Padres al mando", "Poner a las familias al mando de la educación de sus hijos."],
    ["Detener cabildeo con dinero público", "Acabar con la influencia de insiders y proteger impuestos."],
    ["Defender valores de Texas", "Proteger fe, familia, libertad y responsabilidad personal."]
  ]
} as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "es" ? "es" : "en") as Locale;

  return <div>
    <Hero locale={locale} />
    <section className="proof-strip"><div className="container">Trusted conservative leadership for San Antonio, Bexar County, and communities across District 118.</div></section>

    <section className="container py-12">
      <h2 className="section-title">Top Priorities</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topIssues[locale].map(([title, desc], i) => <Link key={title} href={`/${locale}/issues#issue-${i + 1}`} className="issue-card"><h3>{title}</h3><p>{desc}</p></Link>)}
      </div>
    </section>

    <section className="texas-panel py-12"><div className="container grid gap-6 lg:grid-cols-2">
      <div>
        <h2 className="section-title">Meet Jorge</h2>
        <p className="story-grid">Faith • Family • Service • Results</p>
        <p className="mt-4 text-lg text-slate-700">Jorge Borrego’s story is rooted in hard work, conviction, and service to San Antonio families. As a husband, father, and conservative policy leader, he is focused on delivering real results for District 118.</p>
        <Link href={`/${locale}/about`} className="mt-6 inline-block font-bold text-red underline">Read Jorge&apos;s full story</Link>
      </div>
      <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-navy/10 shadow-xl"><Image src="/images/candidate/speaking-flag.jpg" alt="Jorge Borrego speaking with an American flag backdrop" fill className="object-cover" /></div>
    </div></section>

    <DonateButtons locale={locale} path="home" />
    <EndorsementsTeaser locale={locale} />
    <section className="container flex justify-center py-10"><LeadForm locale={locale} /></section>
  </div>;
}
