"use client";

import { usePathname } from "next/navigation";
import { MarqueeBanner } from "./MarqueeBanner";

type RouteBannerProps = {
  siteName: string;
};

// Escolhe o texto gigante do topo conforme a rota atual.
// O banner é a ÚNICA camada fixa (sticky top-0, z-0): a navbar e o conteúdo
// rolam por cima e o cobrem. Por isso é renderizado ANTES da navbar no layout.
//
// Listagem/home expõem o banner como h1 (SEO/acessibilidade);
// páginas de detalhe (slug) mantêm o h1 real no conteúdo → banner decorativo.
export function RouteBanner({ siteName }: RouteBannerProps) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <MarqueeBanner text={siteName} asHeading headingLabel={siteName} />;
  }
  if (pathname === "/about") return <MarqueeBanner text="Sobre" asHeading />;
  if (pathname === "/contact") return <MarqueeBanner text="Contato" asHeading />;
  if (pathname === "/work") return <MarqueeBanner text="Projetos" asHeading />;
  if (pathname.startsWith("/work/")) return <MarqueeBanner text="Projetos" />;
  if (pathname === "/blog") return <MarqueeBanner text="Blog" asHeading />;
  if (pathname.startsWith("/blog/")) return <MarqueeBanner text="Blog" />;

  return <MarqueeBanner text={siteName} />;
}
