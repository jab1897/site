import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Jorge Borrego for Texas House District 118",
  description: "A conservative fighter for San Antonio",
  openGraph: { title: "Jorge Borrego", description: "South San Antonio Deserves a Fighter" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}<Suspense fallback={null}><AnalyticsTracker /></Suspense><Analytics /></body></html>;
}
