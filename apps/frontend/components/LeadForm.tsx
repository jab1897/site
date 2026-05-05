"use client";
import Link from "next/link";
import { useState } from "react";
import { Locale, labels } from "@/lib/i18n";

const inputClass =
  "w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-2xl text-slate-900 placeholder:text-slate-400 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";

export function LeadForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const t = labels[locale];
  const lf = t.leadsForm;

  async function submit(formData: FormData) {
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();

    // Honeypot: drop silently if the hidden field is filled
    if (String(formData.get("website") || "").trim()) {
      setStatus("ok");
      return;
    }

    const payload = {
      name: `${firstName} ${lastName}`.trim(),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      zip: formData.get("zip") || undefined,
      smsOptIn: formData.get("smsOptIn") === "on",
      locale,
      source: "website"
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("server error");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form action={submit} className="w-full max-w-3xl space-y-4 rounded-[2rem] bg-[#d4e2f2] p-6 md:p-8" noValidate>
      <h3 className="text-center text-3xl font-black uppercase tracking-wide text-red md:text-4xl">{lf.heading}</h3>

      {/* Honeypot field: hidden from humans, ignored by bots that fill every field */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="space-y-1">
        <label htmlFor="lf-firstName" className="block text-sm font-semibold text-slate-700">
          {lf.labels.firstName} <span aria-hidden="true" className="text-red">*</span>
        </label>
        <input
          id="lf-firstName"
          required
          name="firstName"
          aria-required="true"
          placeholder={lf.labels.firstName}
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="lf-lastName" className="block text-sm font-semibold text-slate-700">
          {lf.labels.lastName} <span aria-hidden="true" className="text-red">*</span>
        </label>
        <input
          id="lf-lastName"
          required
          name="lastName"
          aria-required="true"
          placeholder={lf.labels.lastName}
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="lf-email" className="block text-sm font-semibold text-slate-700">
          {lf.labels.email} <span aria-hidden="true" className="text-red">*</span>
        </label>
        <input
          id="lf-email"
          required
          type="email"
          name="email"
          aria-required="true"
          placeholder={lf.labels.email}
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="lf-phone" className="block text-sm font-semibold text-slate-700">
          {lf.labels.phone}
        </label>
        <input
          id="lf-phone"
          name="phone"
          type="tel"
          placeholder={lf.labels.phone}
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="lf-zip" className="block text-sm font-semibold text-slate-700">
          {lf.labels.zip} <span aria-hidden="true" className="text-red">*</span>
        </label>
        <input
          id="lf-zip"
          required
          name="zip"
          aria-required="true"
          inputMode="numeric"
          placeholder={lf.labels.zip}
          className={inputClass}
        />
      </div>

      <label className="mt-2 flex items-start gap-3 text-base leading-snug text-slate-700 md:text-lg">
        <input type="checkbox" name="smsOptIn" className="mt-1 h-7 w-7 rounded border-slate-400" />
        <span>
          {labels[locale].getInvolved.labels.smsConsent}{" "}
          <Link href={`/${locale}/terms`} className="underline">
            {labels[locale].getInvolved.labels.smsConsentTerms}
          </Link>{" "}
          {locale === "es" ? "y" : "and"}{" "}
          <Link href={`/${locale}/privacy`} className="underline">
            {labels[locale].getInvolved.labels.smsConsentPrivacy}
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        className="w-full rounded-2xl bg-navy px-5 py-4 text-4xl font-black uppercase tracking-wide text-white md:text-5xl"
      >
        {t.join}
      </button>

      {status === "ok" && (
        <p role="status" aria-live="polite" className="text-lg font-medium text-green-800">
          {lf.thankYou}
        </p>
      )}
      {status === "error" && (
        <p role="alert" aria-live="assertive" className="text-lg font-medium text-red">
          {lf.error}
        </p>
      )}
    </form>
  );
}
