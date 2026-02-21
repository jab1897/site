"use client";
import { useState } from "react";
import { Locale, labels } from "@/lib/i18n";

export function LeadForm({ locale }: { locale: Locale }) {
  const [ok, setOk] = useState(false);
  const t = labels[locale];
  async function submit(formData: FormData) {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      smsOptIn: formData.get("smsOptIn") === "on",
      locale,
      source: "website"
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    setOk(true);
  }
  return (
    <form action={submit} className="grid gap-3 max-w-xl">
      <p className="font-medium">Get early voting alerts and priority event access</p>
      <input required name="name" placeholder="Name" className="border p-2" />
      <input required type="email" name="email" placeholder="Email" className="border p-2" />
      <input name="phone" placeholder="Phone (optional)" className="border p-2" />
      <label className="text-sm"><input type="checkbox" name="smsOptIn" className="mr-2" /> SMS opt-in</label>
      <p className="text-xs text-slate-600">By checking this box, you agree to receive recurring campaign SMS messages. Message & data rates may apply. Reply STOP to opt out.</p>
      <button className="bg-navy text-white px-4 py-2 w-fit">{t.join}</button>
      {ok && <p className="text-green-700 text-sm">Thanks for joining.</p>}
    </form>
  );
}
