import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.richinmrudul.com";
const siteTitle = "Richin Mrudul | Software Engineer";
const siteDescription =
  "Software engineering portfolio of Richin Mrudul — Purdue CS, backend systems, AI/ML, infrastructure, and production-focused projects.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Richin Mrudul",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Richin Mrudul — Software Engineer portfolio on a sunset adventure route",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full text-[var(--text-primary)]">{children}</body>
    </html>
  );
}
