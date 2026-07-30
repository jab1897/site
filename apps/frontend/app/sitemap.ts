import { MetadataRoute } from "next";
import { CANONICAL_ORIGIN } from "@/lib/canonical-host";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/about", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/issues", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/endorsements", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/get-involved", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/donate", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFreq: "yearly" as const },
  ];

  return ["en", "es"].flatMap((locale) =>
    routes.map((r) => ({
      url: `${CANONICAL_ORIGIN}/${locale}${r.path}`,
      lastModified: new Date(),
      changeFrequency: r.changeFreq,
      priority: r.priority,
      alternates: {
        languages: {
          en: `${CANONICAL_ORIGIN}/en${r.path}`,
          es: `${CANONICAL_ORIGIN}/es${r.path}`,
        },
      },
    }))
  );
}
