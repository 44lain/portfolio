import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { RouteBanner } from "@/components/ui/RouteBanner";
import { getSiteSettings } from "@/lib/content/site";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteSettings();

  return (
    <>
      {/* Camada fixa do topo (nome gigante). Navbar e conteúdo rolam por cima. */}
      <RouteBanner siteName={site.siteName} />
      <Header siteName={site.siteName} />
      <main className="page-surface flex-1">{children}</main>
      <Footer site={site} />
    </>
  );
}
