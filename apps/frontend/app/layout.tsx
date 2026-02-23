import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jorge Borrego for Texas",
  description: "Conservative Republican for State Representative",
  openGraph: {
    title: "Jorge Borrego for Texas",
    description: "Conservative Republican for State Representative",
    url: "https://jorgefortexas.com",
    siteName: "Jorge Borrego for Texas",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
