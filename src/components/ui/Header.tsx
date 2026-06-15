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

// Navbar em fluxo normal (NÃO fixa): rola junto com o conteúdo e cobre o nome
// gigante fixo (RouteBanner) ao rolar. z-10 + fundo opaco para encobrir o banner.
// O logo fica em uppercase e maior; os nav links também aumentados (ver design-system).
export function Header({
  siteName = "Lain",
  availability = "Disponível Jul 2026",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-secondary/40 bg-background">
      <div className="content-container flex items-center justify-between gap-6 py-6">
        {/* Grupo esquerdo: logo + status (email + disponibilidade) */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-nav-logo text-accent transition-colors hover:text-hover"
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
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
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
