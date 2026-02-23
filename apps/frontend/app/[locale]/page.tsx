import Image from "next/image";
import Link from "next/link";
import { priorities } from "@/lib/content";
import { Locale } from "@/lib/i18n";
import { LeadForm } from "@/components/LeadForm";
import { DonateButtons } from "@/components/DonateButtons";
import { Hero } from "@/components/Hero";
import { VideoWithSoundToggle } from "@/components/VideoWithSoundToggle";

export default function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  return (
    <div>
      <Hero locale={locale} />

      <DonateButtons locale={locale} path="home" />

      <section className="texas-panel py-10">
        <div className="container grid items-start gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-red">Meet Jorge Borrego</h2>
            <p className="mt-3 text-2xl font-semibold uppercase text-navy">For Texas House District 118</p>
          </div>

          <VideoWithSoundToggle
            poster="/images/candidate/speaking-flag.jpg"
            source="/video/primary-commercial.mov"
            className="w-full rounded-2xl border border-navy/10 shadow"
          />

          <div>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
              Jorge Borrego is a conservative Republican running to represent Texas House District 118 in San Antonio.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
              Raised in difficult circumstances, Jorge understands firsthand what it means to fight for opportunity and earn everything through hard work. Through faith, discipline, and personal responsibility, he became the first in his family to graduate from college and built a career advancing strong conservative policy in Texas.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
              Jorge has worked at the Texas Public Policy Foundation, where he helped pass historic school choice legislation and strengthen accountability in public education. He has been a consistent voice for parental rights, educational freedom, fiscal responsibility, and government transparency. He believes families, not bureaucrats, should shape the future of their children.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
              A husband and father, Jorge believes faith, family, and service are the foundation of strong communities. He is committed to safe neighborhoods, fully funding and backing law enforcement, securing the border, defending Texas values, and building an economy that rewards hard work and protects taxpayers.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
              Jorge Borrego is running to serve the people of San Antonio — not special interests, not Austin insiders, and not career politicians.
            </p>
            <Link href={`/${locale}/about`} className="mt-8 inline-block text-3xl font-semibold uppercase text-red underline underline-offset-4 transition hover:text-red/80">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <h2 className="text-4xl font-black uppercase tracking-tight text-navy">Priorities</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {priorities[locale].map((priority, idx) => (
            <a
              key={priority.title}
              href={`/${locale}/issues#issue-${idx + 1}`}
              className="overflow-hidden rounded-3xl border border-navy/10 bg-white transition hover:-translate-y-1 hover:border-red/30 hover:shadow-lg"
            >
              <Image src={priority.image} alt={priority.imageAlt} width={1200} height={675} className="h-52 w-full object-cover" />
              <div className="space-y-4 p-6">
                <h3 className="text-2xl font-black uppercase leading-tight text-red">{priority.title}</h3>
                <ul className="list-disc space-y-2 pl-6 text-lg text-slate-700">
                  {priority.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-navy/10">
            <Image src="/images/family/walking-away.jpg" alt="Borrego family walking together" width={1500} height={700} className="h-auto w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />
            <div className="absolute bottom-0 p-6 text-lg font-medium text-white">Faith, family, and work define our mission.</div>
          </div>
        </div>
      </section>

      <section className="container py-8">
        <LeadForm locale={locale} />
      </section>
    </div>
  );
}
