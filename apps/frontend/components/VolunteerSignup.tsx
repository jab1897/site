"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Locale } from "@/lib/i18n";

const volunteerInterests = ["Block walking", "Phone banking", "Volunteer at a poll", "Host an event"] as const;
const allInterests = ["Updates", ...volunteerInterests];

type FieldErrors = Partial<Record<"firstName" | "lastName" | "email" | "zip", string>>;

const inputClass =
  "w-full rounded-xl border px-4 py-3 text-slate-900 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} aria-live="polite" className="mt-1 min-h-[1.25rem] text-sm font-medium text-red">
      {message ?? ""}
    </p>
  );
}

export function VolunteerSignup({ locale }: { locale: Locale }) {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [interest, setInterest] = useState<string>("Updates");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL || "", []);

  const scrollToForm = (nextInterest: string) => {
    setInterest(nextInterest);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  function validate(data: FormData): FieldErrors {
    const errors: FieldErrors = {};
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const zip = String(data.get("zip") || "").trim();

    if (firstName.length < 2) errors.firstName = "First name must be at least 2 characters.";
    if (lastName.length < 2) errors.lastName = "Last name must be at least 2 characters.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "A valid email address is required.";
    if (!zip) errors.zip = "Zip code is required.";

    return errors;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);

    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setIsSubmitting(true);
    setServerError(null);

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
        setServerError("Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h3 className="text-2xl font-bold text-navy">Thank you. We will be in touch soon.</h3>
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

        <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          {/* Honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div>
            <label htmlFor="vs-firstName" className="mb-1 block text-sm font-semibold text-slate-700">
              First name <span aria-hidden="true" className="text-red">*</span>
            </label>
            <input
              id="vs-firstName"
              required
              name="firstName"
              aria-required="true"
              aria-describedby="vs-firstName-error"
              aria-invalid={!!fieldErrors.firstName}
              className={`${inputClass} ${fieldErrors.firstName ? "border-red" : "border-slate-300"}`}
            />
            <FieldError id="vs-firstName-error" message={fieldErrors.firstName} />
          </div>

          <div>
            <label htmlFor="vs-lastName" className="mb-1 block text-sm font-semibold text-slate-700">
              Last name <span aria-hidden="true" className="text-red">*</span>
            </label>
            <input
              id="vs-lastName"
              required
              name="lastName"
              aria-required="true"
              aria-describedby="vs-lastName-error"
              aria-invalid={!!fieldErrors.lastName}
              className={`${inputClass} ${fieldErrors.lastName ? "border-red" : "border-slate-300"}`}
            />
            <FieldError id="vs-lastName-error" message={fieldErrors.lastName} />
          </div>

          <div>
            <label htmlFor="vs-email" className="mb-1 block text-sm font-semibold text-slate-700">
              Email address <span aria-hidden="true" className="text-red">*</span>
            </label>
            <input
              id="vs-email"
              required
              type="email"
              name="email"
              aria-required="true"
              aria-describedby="vs-email-error"
              aria-invalid={!!fieldErrors.email}
              className={`${inputClass} ${fieldErrors.email ? "border-red" : "border-slate-300"}`}
            />
            <FieldError id="vs-email-error" message={fieldErrors.email} />
          </div>

          <div>
            <label htmlFor="vs-phone" className="mb-1 block text-sm font-semibold text-slate-700">
              Phone number (recommended)
            </label>
            <input
              id="vs-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${inputClass} border-slate-300`}
            />
          </div>

          <div>
            <label htmlFor="vs-zip" className="mb-1 block text-sm font-semibold text-slate-700">
              ZIP code <span aria-hidden="true" className="text-red">*</span>
            </label>
            <input
              id="vs-zip"
              required
              name="zip"
              aria-required="true"
              aria-describedby="vs-zip-error"
              aria-invalid={!!fieldErrors.zip}
              inputMode="numeric"
              className={`${inputClass} ${fieldErrors.zip ? "border-red" : "border-slate-300"}`}
            />
            <FieldError id="vs-zip-error" message={fieldErrors.zip} />
          </div>

          <div>
            <label htmlFor="vs-interest" className="mb-1 block text-sm font-semibold text-slate-700">
              How would you like to help?
            </label>
            <select
              id="vs-interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className={`${inputClass} border-slate-300`}
            >
              {allInterests.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" name="updatesOptIn" defaultChecked className="mt-1 h-4 w-4 rounded border-slate-400" />
            <span>Sign me up for campaign updates</span>
          </label>

          {phone.trim() ? (
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input type="checkbox" name="smsOptIn" className="mt-1 h-4 w-4 rounded border-slate-400" />
              <span>
                By providing my mobile number, I consent to receive informational text messages from
                the campaign. Message frequency may vary. Msg and data rates may apply. Text STOP to
                opt-out. Text HELP for help. See our{" "}
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
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-red px-5 py-3 font-semibold text-white transition disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <p className="text-xs text-slate-500">We respect your privacy and will never sell your information.</p>

          {serverError && (
            <p role="alert" aria-live="assertive" className="text-sm font-medium text-red">
              {serverError}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
