import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jorgefortexas.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jorge Borrego for Texas House District 118",
    template: "%s | Jorge Borrego for Texas HD118",
  },
  description:
    "Jorge Borrego is a conservative Republican fighting for safe neighborhoods, school choice, lower property taxes, and Texas values in San Antonio's House District 118.",
  keywords: [
    "Jorge Borrego",
    "Texas House District 118",
    "HD118",
    "conservative",
    "Republican",
    "San Antonio",
    "school choice",
    "property taxes",
    "law enforcement",
    "Texas 2026",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Jorge Borrego for Texas House District 118",
    title: "Jorge Borrego for Texas House District 118",
    description:
      "A conservative fighter for San Antonio. Fighting for safe neighborhoods, school choice, lower property taxes, and Texas values.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Jorge Borrego for Texas House District 118" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Borrego for Texas House District 118",
    description: "A conservative fighter for San Antonio — safe neighborhoods, school choice, lower property taxes.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      es: `${SITE_URL}/es`,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jorge Borrego",
  description:
    "Conservative Republican candidate for Texas House of Representatives, District 118, representing South San Antonio.",
  jobTitle: "Candidate for Texas House District 118",
  url: SITE_URL,
  homeLocation: {
    "@type": "Place",
    name: "San Antonio, Texas",
    containedInPlace: { "@type": "State", name: "Texas" },
  },
  memberOf: {
    "@type": "Organization",
    name: "Republican Party of Texas",
  },
  seeks: {
    "@type": "Role",
    roleName: "State Representative",
    startDate: "2027-01-01",
    memberOf: {
      "@type": "GovernmentOrganization",
      name: "Texas House of Representatives",
      url: "https://house.texas.gov",
    },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await headers()).get("x-locale") ?? "en";
  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Suspense fallback={null}><AnalyticsTracker /></Suspense>
        <Analytics />
      </body>
    </html>
  );
}
