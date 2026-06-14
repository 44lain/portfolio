"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/about", label: "Sobre" },
  { href: "/work", label: "Projetos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contato" },
] as const;

const HEADER_EMAIL = "lain.fork@gmail.com";

type HeaderProps = {
  siteName?: string;
  availability?: string;
};

// Header fiel ao modelo (cydstumpel.nl):
// - Na home, o nome gigante (marquee) aparece ACIMA da navbar e rola junto com a página.
// - A navbar é sticky (top-0): ao rolar, o marquee some e resta apenas a navbar fixa.
// - Nas demais rotas, exibe só a navbar fixa no topo.
// A duplicação/marquee animado de verdade entra na Sprint 3.
export function Header({
  siteName = "Lain",
  availability = "Disponível Jul 2026",
}: HeaderProps) {
  const pathname = usePathname();
  const showMarquee = pathname === "/";
  // Repete o nome o suficiente para atravessar a largura da tela (nome curto = mais repetições).
  const repeated = `${siteName} `.repeat(6).trim();

  return (
    <>
      {showMarquee && (
        <div className="overflow-hidden pt-6 pb-3 lg:pt-10 lg:pb-5">
          <h1 className="sr-only">{siteName}</h1>
          <div
            aria-hidden="true"
            className="text-marquee whitespace-nowrap text-accent"
          >
            {repeated}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 mb-10 md:mb-28 border-b border-secondary/40 bg-background/90 backdrop-blur-sm">
        <div className="content-container flex items-center justify-between gap-6 py-8">
          {/* Grupo esquerdo: logo + status (email + disponibilidade) */}
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-xl font-black tracking-tight text-accent transition-colors hover:text-hover"
            >
              {siteName}
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              <a
                href={`mailto:${HEADER_EMAIL}`}
                className="link-underline text-small-body text-muted"
              >
                {HEADER_EMAIL}
              </a>
              <span aria-hidden="true" className="text-accent">
                ✦
              </span>
              <span className="text-small-body italic text-muted">{availability}</span>
            </div>
          </div>

          {/* Nav à direita */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="link-underline text-small-body text-muted hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile: link curto de contato */}
          <a
            href={`mailto:${HEADER_EMAIL}`}
            className="caps text-muted transition-colors hover:text-accent md:hidden"
          >
            Contato
          </a>
        </div>
      </header>
    </>
  );
}
