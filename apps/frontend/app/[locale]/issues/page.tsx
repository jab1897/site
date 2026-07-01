import Image from "next/image";
import { priorities } from "@/lib/content";
import { Locale, labels } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "es" ? "es" : "en") as Locale;
  const items = priorities[locale];
  const t = labels[locale];

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">{t.nav.issues}</h1>
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
                  unoptimized={item.image.endsWith(".svg")}
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
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`/${locale}/donate`} className="inline-flex items-center justify-center rounded-md bg-red px-5 py-3 font-semibold text-white transition hover:brightness-95">
          {t.donate}
        </a>
        <a href={`/${locale}/get-involved`} className="inline-flex items-center justify-center rounded-md border-2 border-navy px-5 py-3 font-semibold text-navy transition hover:bg-navy hover:text-white">
          {t.volunteer}
        </a>
      </div>
    </div>
  );
}
