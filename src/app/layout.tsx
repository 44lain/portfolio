import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import { Loader } from "@/components/ui/Loader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { getSiteSettings } from "@/lib/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/url";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const site = getSiteSettings();
const seo = buildPageMetadata({
  title: site.siteName,
  description: site.tagline,
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: site.siteName,
    template: `%s | ${site.siteName}`,
  },
  description: site.tagline,
  alternates: seo.alternates,
  openGraph: seo.openGraph,
  twitter: seo.twitter,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased">
        <Loader siteName={site.siteName} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
