import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { CANONICAL_ORIGIN } from "@/lib/canonical-host";

const SITE_URL = CANONICAL_ORIGIN;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jorge Borrego for Texas House District 118 | Republican Candidate",
    template: "%s | Jorge Borrego for Texas HD118",
  },
  description:
    "Jorge Borrego is the Republican candidate for Texas House District 118, fighting to lower costs, cut property taxes, keep violent criminals off the streets, protect kids from fentanyl, protect girls' sports, and raise teacher pay.",
  keywords: [
    "Jorge Borrego",
    "Texas House District 118",
    "HD118",
    "Republican",
    "Republican candidate",
    "cost of living",
    "property taxes",
    "public safety",
    "fentanyl",
    "girls sports",
    "teacher pay",
    "Texas 2026",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Jorge Borrego for Texas House District 118",
    title: "Jorge Borrego for Texas House District 118 | Republican Candidate",
    description:
      "Republican for Texas House District 118. Fighting to lower costs, cut property taxes, keep violent criminals off the streets, and protect kids from fentanyl.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Jorge Borrego for Texas House District 118" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Borrego for Texas House District 118 | Republican Candidate",
    description: "Lower costs. Cut property taxes. Safer streets. Protect kids from fentanyl. Protect girls' sports. Raise teacher pay.",
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
    "Republican candidate for Texas House of Representatives, District 118, fighting to lower costs, cut property taxes, keep violent criminals off the streets, protect kids from fentanyl, protect girls' sports, and raise teacher pay.",
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
