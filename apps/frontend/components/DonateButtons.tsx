import { donationAmounts } from "@/lib/config";
import { Locale } from "@/lib/i18n";

export function DonateButtons({ locale, path }: { locale: Locale; path: string }) {
  const api = process.env.NEXT_PUBLIC_API_URL;
  return <div className="flex flex-wrap gap-2">{donationAmounts.map((amt) => <a key={amt} href={`${api}/api/donate?amount=${encodeURIComponent(amt)}&locale=${locale}&path=${encodeURIComponent(path)}`} className="border px-4 py-2 hover:bg-red hover:text-white">${amt}</a>)}</div>;
}
