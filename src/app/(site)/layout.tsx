import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { getSiteSettings } from "@/lib/content/site";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteSettings();

  return (
    <>
      <Header siteName={site.siteName} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
    </>
  );
}
