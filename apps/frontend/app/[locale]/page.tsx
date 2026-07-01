import Image from "next/image";
import Link from "next/link";
import { priorities } from "@/lib/content";
import { Locale, labels } from "@/lib/i18n";
import { LeadForm } from "@/components/LeadForm";
import { DonateButtons } from "@/components/DonateButtons";
import { EndorsementsTeaser } from "@/components/EndorsementsTeaser";
import { Hero } from "@/components/Hero";
import { VideoWithSoundToggle } from "@/components/VideoWithSoundToggle";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "es" ? "es" : "en") as Locale;
  const t = labels[locale].home;

  return (
    <div>
      {/* 1. Hero */}
      <Hero locale={locale} />

      {/* 2. Meet Jorge */}
      <section className="texas-panel py-10">
        <div className="container grid items-start gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-red">{t.meetHeading}</h2>
            <p className="mt-3 text-2xl font-semibold uppercase text-navy">{t.meetSubhead}</p>
          </div>

          <VideoWithSoundToggle
            poster="/images/candidate/speaking-flag.jpg"
            mp4="/video/hero.mp4"
            webm="/video/hero.webm"
            className="w-full rounded-2xl border border-navy/10 shadow"
          />

          <div>
            {t.meetBody.map((paragraph, idx) => (
              <p key={idx} className={`${idx === 0 ? "mt-6" : "mt-4"} max-w-3xl text-lg leading-relaxed text-slate-700`}>
                {paragraph}
              </p>
            ))}
            <Link href={`/${locale}/about`} className="mt-8 inline-block text-3xl font-semibold uppercase text-red underline underline-offset-4 transition hover:text-red/80">
              {t.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Priorities */}
      <section className="container py-10">
        <h2 className="text-4xl font-black uppercase tracking-tight text-navy">{t.prioritiesHeading}</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {priorities[locale].map((priority, idx) => (
            <a
              key={priority.title}
              href={`/${locale}/issues#issue-${idx + 1}`}
              className="overflow-hidden rounded-3xl border border-navy/10 bg-white transition hover:-translate-y-1 hover:border-red/30 hover:shadow-lg"
            >
              <Image src={priority.image} alt={priority.imageAlt} width={1200} height={675} unoptimized={priority.image.endsWith(".svg")} className="h-52 w-full object-cover" />
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

      {/* 4. The Choice in This Race */}
      <section className="texas-panel py-10">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-black uppercase tracking-tight text-navy">{t.choiceHeading}</h2>
          {t.choiceBody.map((paragraph, idx) => (
            <p key={idx} className="mt-4 text-lg leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* 5. Donation block */}
      <DonateButtons locale={locale} path="home" />

      {/* 5. Endorsements teaser */}
      <EndorsementsTeaser locale={locale} />

      {/* 6. Sign up for updates */}
      <section className="container flex justify-center py-10">
        <LeadForm locale={locale} />
      </section>
    </div>
  );
}
