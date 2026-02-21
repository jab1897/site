import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jorge Borrego for Texas House District 118",
  description: "A conservative fighter for San Antonio",
  openGraph: { title: "Jorge Borrego", description: "South San Antonio Deserves a Fighter" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
