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
            <div className="px-4">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 1000px"
                  className="object-cover object-center"
                  priority={false}
                />
              </div>
            </div>
            <div className="p-4">
              <div className="mt-6 space-y-3">
                <ul className="list-disc pl-5 space-y-2 text-slate-700 leading-relaxed">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
                </ul>
              </div>
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
