import Image from "next/image";
import { priorities } from "@/lib/content";
import { Locale } from "@/lib/i18n";
import { LeadForm } from "@/components/LeadForm";
import { DonateButtons } from "@/components/DonateButtons";
import { Hero } from "@/components/Hero";

export default function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  return (
    <div>
      <Hero locale={locale} />

      <section className="container py-10">
        <div className="mb-6 h-1 w-20 bg-gradient-to-r from-red via-red to-navy" />
        <h2 className="text-2xl font-semibold text-navy">Why I am running</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Raised without stability. Father incarcerated. First in family to graduate college. Built a career in Texas policy. Now running to fight for families like mine in South San Antonio.
        </p>
      </section>

      <section className="texas-panel py-10">
        <div className="container">
          <h2 className="text-2xl font-semibold text-navy">Campaign Video</h2>
          <video controls preload="metadata" poster="/images/candidate/speaking-flag.jpg" className="w-full mt-4 rounded-2xl border border-navy/10 shadow">
            <source src="/video/primary-commercial.mov" />
          </video>
        </div>
      </section>

      <section className="container py-10">
        <h2 className="text-2xl font-semibold text-navy">Priorities</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {priorities[locale].map((p, idx) => (
            <a key={p} href={`/${locale}/issues#issue-${idx + 1}`} className="rounded-xl border border-navy/10 bg-white p-4 hover:border-red/40 hover:shadow-sm">
              {p}
            </a>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-navy/10">
            <Image src="/images/family/walking-away.jpg" alt="Borrego family walking together" width={1500} height={700} className="h-auto w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white text-lg font-medium">Faith, family, and work define our mission.</div>
          </div>
        </div>
      </section>

      <section className="container py-8">
        <LeadForm locale={locale} />
      </section>
      <section className="container py-8">
        <h2 className="text-2xl font-semibold text-navy">Support the Campaign</h2>
        <DonateButtons locale={locale} path="home" />
      </section>
    </div>
  );
}
