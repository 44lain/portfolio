import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { getSiteSettings } from "@/lib/content/site";
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

export const metadata: Metadata = {
  title: {
    default: site.siteName,
    template: `%s | ${site.siteName}`,
  },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
