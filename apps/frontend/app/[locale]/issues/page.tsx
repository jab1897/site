import Image from "next/image";
import { priorities } from "@/lib/content";
import { Locale } from "@/lib/i18n";

export default function Page({ params }: { params: { locale: Locale } }) {
  const items = priorities[params.locale];

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Issues</h1>
      <div className="mt-6 space-y-5">
        {items.map((item, i) => (
          <details key={item.title} id={`issue-${i + 1}`} className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
            <summary className="cursor-pointer p-4 text-xl font-semibold text-navy">{item.title}</summary>
            <Image src={item.image} alt={item.imageAlt} width={1200} height={675} className="h-60 w-full object-cover" />
            <div className="p-4">
              <ul className="list-disc space-y-2 pl-6 text-slate-700">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <a href={`/${params.locale}/donate`} className="bg-red px-4 py-2 text-white">
          Donate
        </a>
        <a href={`/${params.locale}/get-involved`} className="border px-4 py-2">
          Volunteer
        </a>
      </div>
    </div>
  );
}
