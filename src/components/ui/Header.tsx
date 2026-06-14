import Link from "next/link";

const NAV_LINKS = [
  { href: "/about", label: "Sobre" },
  { href: "/work", label: "Projetos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contato" },
] as const;

const HEADER_EMAIL = "lain.fork@gmail.com";

type HeaderProps = {
  availability?: string;
};

// Header compacto fiel ao modelo: logo + status agrupados à esquerda, nav à direita.
export function Header({ availability = "Disponível Jul 2026" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-secondary/40 bg-background/90 backdrop-blur-sm">
      <div className="content-container flex items-center justify-between gap-6 py-3">
        {/* Grupo esquerdo: logo + status (email + disponibilidade) */}
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-accent transition-colors hover:text-hover"
          >
            Lain
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
  );
}
