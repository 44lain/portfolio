import Link from "next/link";
import { MobileMenu } from "@/components/ui/MobileMenu";
import type { SocialLinks } from "@/types/content";

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
  socialLinks?: SocialLinks;
};

// Navbar em fluxo normal (NÃO fixa): rola junto com o conteúdo e cobre o nome
// gigante fixo (RouteBanner) ao rolar. z-10 + fundo opaco para encobrir o banner.
// O logo fica em uppercase e maior; os nav links também aumentados (ver design-system).
export function Header({
  siteName = "Lain",
  availability = "Disponível Jul 2026",
  socialLinks = {},
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-secondary/40 bg-background">
      <div className="content-container flex items-center justify-between gap-6 py-4">
        {/* Grupo esquerdo: logo + status (email + disponibilidade) */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-3xl md:text-5xl text-accent font-bold uppercase transition-colors hover:text-hover"
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

        {/* Nav à direita (desktop) */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="link-underline text-small-heading text-muted hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile: menu em modal (botão de grid + painel animado) */}
        <MobileMenu
          siteName={siteName}
          email={HEADER_EMAIL}
          availability={availability}
          navLinks={NAV_LINKS}
          socialLinks={socialLinks}
        />
      </div>
    </header>
  );
}
