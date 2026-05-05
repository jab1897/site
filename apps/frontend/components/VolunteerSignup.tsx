"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Locale, labels } from "@/lib/i18n";
import { TurnstileWidget } from "./TurnstileWidget";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

// English values are sent to the backend regardless of display locale.
const INTEREST_VALUES = {
  updates: "Updates",
  blockWalking: "Block walking",
  phoneBanking: "Phone banking",
  volunteerPoll: "Volunteer at a poll",
  hostEvent: "Host an event"
} as const;
type InterestKey = keyof typeof INTEREST_VALUES;
const INTEREST_KEYS = Object.keys(INTEREST_VALUES) as InterestKey[];

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
  const t = labels[locale].getInvolved;
  const formRef = useRef<HTMLDivElement | null>(null);
  const [interestKey, setInterestKey] = useState<InterestKey>("updates");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL || "", []);

  const scrollToForm = (key: InterestKey) => {
    setInterestKey(key);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  function validate(data: FormData): FieldErrors {
    const errors: FieldErrors = {};
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const zip = String(data.get("zip") || "").trim();

    if (firstName.length < 2) errors.firstName = t.errors.firstName;
    if (lastName.length < 2) errors.lastName = t.errors.lastName;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t.errors.email;
    if (!zip) errors.zip = t.errors.zip;

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

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setServerError(t.errors.server);
      return;
    }

    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      zip: String(formData.get("zip") || "").trim(),
      interest: INTEREST_VALUES[interestKey],
      updatesOptIn: formData.get("updatesOptIn") === "on",
      smsOptIn: formData.get("smsOptIn") === "on",
      sourcePath: window.location.pathname,
      locale,
      company: String(formData.get("company") || ""),
      ...(turnstileToken ? { turnstileToken } : {}),
    };

    try {
      const response = await fetch(`${apiBase}/api/public/volunteer`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        setServerError(t.errors.server);
        return;
      }

      setIsSuccess(true);
    } catch {
      setServerError(t.errors.server);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h3 className="text-2xl font-bold text-navy">{t.success}</h3>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${locale}/donate`}
            className="inline-flex items-center justify-center rounded-xl bg-red px-5 py-3 font-semibold text-white"
          >
            {t.donate}
          </Link>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center rounded-xl border border-navy px-5 py-3 font-semibold text-navy"
          >
            {t.backHome}
          </Link>
        </div>
      </section>
    );
  }

  // Volunteer activity buttons (excluding "Updates")
  const activityKeys = INTEREST_KEYS.filter((k) => k !== "updates");

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-navy p-5 md:p-8">
        <div className="grid gap-3 md:grid-cols-2">
          {activityKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => scrollToForm(key)}
              className="w-full rounded-2xl bg-white px-5 py-6 text-left text-xl font-semibold text-navy transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-red"
            >
              {t.interests[key]}
            </button>
          ))}
        </div>
      </section>

      <section ref={formRef} className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold text-navy">{t.formHeading}</h2>
          <p className="mt-2 text-slate-700">{t.formSubhead}</p>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          {/* Honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div>
            <label htmlFor="vs-firstName" className="mb-1 block text-sm font-semibold text-slate-700">
              {t.labels.firstName} <span aria-hidden="true" className="text-red">*</span>
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
              {t.labels.lastName} <span aria-hidden="true" className="text-red">*</span>
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
              {t.labels.email} <span aria-hidden="true" className="text-red">*</span>
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
              {t.labels.phone}
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
              {t.labels.zip} <span aria-hidden="true" className="text-red">*</span>
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
              {t.labels.interest}
            </label>
            <select
              id="vs-interest"
              value={interestKey}
              onChange={(e) => setInterestKey(e.target.value as InterestKey)}
              className={`${inputClass} border-slate-300`}
            >
              {INTEREST_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t.interests[key]}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" name="updatesOptIn" defaultChecked className="mt-1 h-4 w-4 rounded border-slate-400" />
            <span>{t.labels.updatesOptIn}</span>
          </label>

          {phone.trim() ? (
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input type="checkbox" name="smsOptIn" className="mt-1 h-4 w-4 rounded border-slate-400" />
              <span>
                {t.labels.smsConsent}{" "}
                <Link href={`/${locale}/terms`} className="underline">
                  {t.labels.smsConsentTerms}
                </Link>{" "}
                {locale === "es" ? "y" : "and"}{" "}
                <Link href={`/${locale}/privacy`} className="underline">
                  {t.labels.smsConsentPrivacy}
                </Link>
                .
              </span>
            </label>
          ) : null}

          {TURNSTILE_SITE_KEY && (
            <TurnstileWidget
              siteKey={TURNSTILE_SITE_KEY}
              onToken={setTurnstileToken}
              onExpire={() => setTurnstileToken("")}
            />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-red px-5 py-3 font-semibold text-white transition disabled:opacity-60"
          >
            {isSubmitting ? t.submitting : t.submit}
          </button>

          <p className="text-xs text-slate-500">{t.labels.privacy}</p>

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
