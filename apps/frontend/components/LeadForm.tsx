"use client";
import Link from "next/link";
import { useState } from "react";
import { Locale, labels } from "@/lib/i18n";

export function LeadForm({ locale }: { locale: Locale }) {
  const [ok, setOk] = useState(false);
  const t = labels[locale];

  async function submit(formData: FormData) {
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const payload = {
      name: `${firstName} ${lastName}`.trim(),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      zip: formData.get("zip") || undefined,
      smsOptIn: formData.get("smsOptIn") === "on",
      locale,
      source: "website"
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
    setOk(true);
  }

  return (
    <form action={submit} className="w-full max-w-3xl space-y-4 rounded-[2rem] bg-[#d4e2f2] p-6 md:p-8">
      <h3 className="text-center text-3xl font-black uppercase tracking-wide text-red md:text-4xl">Sign Up For Updates</h3>

      <input required name="firstName" placeholder="First Name*" className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-2xl text-slate-900 placeholder:text-slate-800" />
      <input required name="lastName" placeholder="Last Name*" className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-2xl text-slate-900 placeholder:text-slate-800" />
      <input required type="email" name="email" placeholder="Email Address*" className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-2xl text-slate-900 placeholder:text-slate-800" />
      <input name="phone" placeholder="Cell Phone" className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-2xl text-slate-900 placeholder:text-slate-800" />
      <input required name="zip" inputMode="numeric" placeholder="Zip Code*" className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-2xl text-slate-900 placeholder:text-slate-800" />

      <label className="mt-2 flex items-start gap-3 text-base leading-snug text-slate-700 md:text-lg">
        <input type="checkbox" name="smsOptIn" className="mt-1 h-7 w-7 rounded border-slate-400" />
        <span>
          By providing my mobile number, I consent to receive informational text messages from the campaign. Message frequency may vary. Msg and data rates may apply. Text STOP to opt-out. Text HELP for help. For additional information, please see our{" "}
          <Link href={`/${locale}/terms`} className="underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href={`/${locale}/privacy`} className="underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <button className="w-full rounded-2xl bg-navy px-5 py-4 text-4xl font-black uppercase tracking-wide text-white md:text-5xl">{t.join}</button>
      {ok && <p className="text-lg font-medium text-green-800">Thanks for joining.</p>}
    </form>
  );
}
