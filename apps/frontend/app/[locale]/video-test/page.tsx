import type { Metadata } from "next";
import { VideoDiagnostics } from "@/components/VideoDiagnostics";

export const metadata: Metadata = {
  title: "Video test",
  robots: { index: false, follow: false },
};

export default async function VideoTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "es" ? "es" : "en";

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-black text-navy">Video playback test</h1>
      <p className="mt-2 text-sm text-slate-600">
        Tap play on each video, one at a time, and let it run a few seconds. Then take a screenshot of each grey log box.
      </p>
      <div className="mt-6">
        <VideoDiagnostics locale={locale} />
      </div>
    </main>
  );
}
