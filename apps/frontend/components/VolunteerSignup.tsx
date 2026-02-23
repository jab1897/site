"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Locale } from "@/lib/i18n";

const volunteerInterests = ["Block walking", "Phone banking", "Volunteer at a poll", "Host an event"] as const;
const allInterests = ["Updates", ...volunteerInterests];

export function VolunteerSignup({ locale }: { locale: Locale }) {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [interest, setInterest] = useState<string>("Updates");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL || "", []);

  const scrollToForm = (nextInterest: string) => {
    setInterest(nextInterest);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      zip: String(formData.get("zip") || "").trim(),
      interest,
      updatesOptIn: formData.get("updatesOptIn") === "on",
      smsOptIn: formData.get("smsOptIn") === "on",
      sourcePath: window.location.pathname,
      locale,
      company: String(formData.get("company") || "")
    };

    try {
      const response = await fetch(`${apiBase}/api/public/volunteer`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h3 className="text-2xl font-bold text-navy">Thank you, we will be in touch soon.</h3>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={`/${locale}/donate`} className="inline-flex items-center justify-center rounded-xl bg-red px-5 py-3 font-semibold text-white">
            Donate
          </Link>
          <Link href={`/${locale}`} className="inline-flex items-center justify-center rounded-xl border border-navy px-5 py-3 font-semibold text-navy">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-navy p-5 md:p-8">
        <div className="grid gap-3 md:grid-cols-2">
          {volunteerInterests.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => scrollToForm(item)}
              className="w-full rounded-2xl bg-white px-5 py-6 text-left text-xl font-semibold text-navy transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-red"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section ref={formRef} className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold text-navy">Join the team</h2>
          <p className="mt-2 text-slate-700">Sign up for updates and tell us how you want to help.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <input required name="firstName" placeholder="First name" className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          <input required name="lastName" placeholder="Last name" className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          <input
            name="phone"
            placeholder="Phone (recommended)"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
          <input required name="zip" placeholder="ZIP code" className="w-full rounded-xl border border-slate-300 px-4 py-3" />

          <div>
            <label htmlFor="interest" className="mb-1 block text-sm font-medium text-slate-700">
              Interest
            </label>
            <select id="interest" value={interest} onChange={(event) => setInterest(event.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3">
              {allInterests.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" name="updatesOptIn" defaultChecked className="mt-1 h-4 w-4" />
            <span>Sign me up for campaign updates</span>
          </label>

          {phone.trim() ? (
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input type="checkbox" name="smsOptIn" className="mt-1 h-4 w-4" />
              <span>I agree to receive text messages</span>
            </label>
          ) : null}

          <button disabled={isSubmitting} className="w-full rounded-xl bg-red px-5 py-3 font-semibold text-white disabled:opacity-60">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p className="text-xs text-slate-500">We respect your privacy and will never sell your information.</p>

          {error ? <p className="text-sm text-red">{error}</p> : null}
        </form>
      </section>
    </div>
  );
}
