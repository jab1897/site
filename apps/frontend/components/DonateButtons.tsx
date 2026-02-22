import { WINRED_DONATE_URL } from "@/lib/config";
import { Locale, labels } from "@/lib/i18n";

const featuredDonationAmounts = ["1000", "500", "250", "50", "10", "Other"] as const;

export function DonateButtons({ locale, path }: { locale: Locale; path: string }) {
  const t = labels[locale].home;

  return (
    <section className="bg-navy py-12 text-white md:py-16">
      <div className="container text-center">
        <h2 className="mx-auto max-w-4xl text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-slate-100 md:text-6xl">
          {t.donateHeadline}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-xl font-semibold text-red md:text-[2rem]">{t.donateSubhead}</p>

        <div className="mx-auto mt-8 flex max-w-6xl flex-nowrap items-center justify-center gap-3 overflow-x-auto pb-2">
          {featuredDonationAmounts.map((amt) => {
            const label = amt === "Other" ? amt.toUpperCase() : `$${amt}`;
            const amountQuery = amt === "Other" ? "" : `?amount=${encodeURIComponent(amt)}`;
            return (
              <a
                key={amt}
                href={`${WINRED_DONATE_URL}${amountQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.donateButton} ${label}`}
                data-path={path}
                className="min-w-[140px] rounded-md bg-red px-5 py-3 text-3xl font-bold uppercase tracking-tight text-white transition hover:brightness-95"
              >
                {label}
              </a>
            );
          })}
        </div>

        <a
          href={WINRED_DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-md bg-red px-8 py-3 text-2xl font-extrabold uppercase tracking-tight text-white transition hover:brightness-95"
        >
          {t.donateButton}
        </a>
      </div>
    </section>
  );
}
