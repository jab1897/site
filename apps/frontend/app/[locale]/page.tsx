import Image from "next/image";
import { priorities, endorsements } from "@/lib/content";
import { Locale, labels } from "@/lib/i18n";
import { LeadForm } from "@/components/LeadForm";
import { DonateButtons } from "@/components/DonateButtons";

export default function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = labels[locale];
  return <div>
    <section className="container py-12 grid md:grid-cols-2 gap-8 items-center">
      <div><h1 className="text-4xl font-bold text-navy">South San Antonio Deserves a Fighter</h1><p className="mt-3 text-xl">A conservative fighter for San Antonio</p><div className="mt-6 flex gap-3"><a href={`/${locale}/donate`} className="bg-red text-white px-4 py-2">{t.donate}</a><a href={`/${locale}/get-involved`} className="border px-4 py-2">{t.join}</a></div></div>
      <Image src="/images/hero-placeholder.jpg" alt="Jorge Borrego hero" width={900} height={700} className="w-full h-auto rounded" />
    </section>
    <section className="container py-8"><h2 className="text-2xl font-semibold">Why I am running</h2><p className="mt-3">Raised without stability. Father incarcerated. First in family to graduate college. Built a career in Texas policy. Now running to fight for families like mine in South San Antonio.</p></section>
    <section className="container py-8"><h2 className="text-2xl font-semibold">Campaign Video</h2><video controls preload="metadata" poster="/images/video-poster-placeholder.jpg" className="w-full mt-4"><source src="/video/primary-commercial.mov" /></video></section>
    <section className="container py-8"><h2 className="text-2xl font-semibold">Priorities</h2><div className="grid md:grid-cols-2 gap-3 mt-4">{priorities[locale].map((p, idx)=><a key={p} href={`/${locale}/issues#issue-${idx+1}`} className="border p-4">{p}</a>)}</div></section>
    <section className="py-10"><Image src="/images/family-placeholder.jpg" alt="Jorge Borrego family" width={1500} height={700} className="w-full h-auto" /><div className="container py-4">Faith, family, and work define our mission.</div></section>
    <section className="container py-8"><h2 className="text-2xl font-semibold">Endorsements</h2><div className="grid md:grid-cols-3 gap-4 mt-4">{endorsements.map(e=><div key={e.name} className="border p-4"><Image src={e.logo} alt={e.name} width={220} height={100} className="h-16 w-auto object-contain" /><p>{e.name}</p></div>)}</div></section>
    <section className="container py-8"><LeadForm locale={locale} /></section>
    <section className="container py-8"><h2 className="text-2xl font-semibold">Support the Campaign</h2><DonateButtons locale={locale} path="home" /></section>
  </div>;
}
