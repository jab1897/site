import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jorgefortexas.com";

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
      url: `${SITE_URL}/${locale}${r.path}`,
      lastModified: new Date(),
      changeFrequency: r.changeFreq,
      priority: r.priority,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${r.path}`,
          es: `${SITE_URL}/es${r.path}`,
        },
      },
    }))
  );
}
