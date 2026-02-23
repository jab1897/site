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

        <div className="mx-auto mt-8 grid w-full max-w-3xl grid-cols-3 gap-2 md:flex md:max-w-6xl md:flex-nowrap md:items-center md:justify-center md:gap-3 md:overflow-x-auto md:pb-2">
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
                className="rounded-md bg-red px-3 py-2 text-2xl font-bold uppercase tracking-tight text-white transition hover:brightness-95 md:min-w-[140px] md:px-5 md:py-3 md:text-3xl"
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
