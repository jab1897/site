import Link from "next/link";
import Image from "next/image";
import { Locale, labels } from "@/lib/i18n";
import { WINRED_DONATE_URL } from "@/lib/config";

export function Hero({ locale }: { locale: Locale }) {
  const t = labels[locale].home;

  return (
    <section className="hero-surface relative overflow-hidden border-y border-navy/10 bg-slate-100">
      <div className="hero-flag-stripe" aria-hidden="true" />
      <div className="hero-star-pattern" aria-hidden="true" />
      <div className="container relative z-10 grid items-center gap-6 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-14">
        <div className="hero-image-wrap relative min-h-[280px] overflow-hidden rounded-3xl border border-white/40 shadow-2xl md:min-h-[460px]">
          <Image
            src="/images/family/family-main.jpg"
            alt={t.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 56vw"
            className="object-cover object-[58%_36%]"
          />
        </div>

        <div className="hero-copy-card relative rounded-3xl border border-white/60 bg-white/82 p-6 shadow-xl backdrop-blur-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red">{t.kicker}</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-navy md:text-5xl">{t.name}</h1>
          <p className="mt-3 text-xl font-semibold text-slate-800">{t.slogan}</p>
          <p className="mt-4 text-base leading-7 text-slate-700">{t.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={WINRED_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-red px-5 py-3 font-semibold text-white shadow hover:brightness-95"
            >
              {t.primaryCta}
            </a>
            <Link href={`/${locale}/get-involved`} className="rounded-md border border-navy/20 bg-white px-5 py-3 font-semibold text-navy hover:bg-slate-50">
              {t.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
