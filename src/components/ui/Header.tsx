"use client";

import Link from "next/link";

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

// Navbar fixa no topo — o conteúdo (incl. marquee de página) rola por baixo dela.
// Marquee de título fica em <PageMarquee /> dentro de cada rota.
export function Header({
  siteName = "Lain",
  availability = "Disponível Jul 2026",
}: HeaderProps) {
  const displayName = siteName.toUpperCase();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-secondary/40 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[var(--content-max-width)] items-center justify-between gap-6 px-[var(--edge-padding)] py-4">
        {/* Grupo esquerdo: logo + status (email + disponibilidade) */}
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-nav-logo text-accent transition-colors hover:text-hover"
          >
            {displayName}
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
              className="link-underline text-nav-link text-muted hover:text-foreground"
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
  );
}
