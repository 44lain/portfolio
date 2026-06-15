import Link from "next/link";
import { MarqueeText } from "@/components/ui/MarqueeText";
import type { SiteSettings, SocialLinks } from "@/types/content";

const NAV_LINKS = [
  { href: "/about", label: "Sobre" },
  { href: "/work", label: "Projetos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contato" },
] as const;

const SOCIAL_LABELS: Record<keyof SocialLinks, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  codepen: "Codepen",
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  rss: "RSS",
};

type FooterProps = {
  site: SiteSettings;
  availability?: string;
};

export function Footer({ site, availability = "Disponível a partir de Julho 2026" }: FooterProps) {
  const activeSocials = (
    Object.entries(site.socialLinks) as [keyof SocialLinks, string | null | undefined][]
  ).filter(([, url]) => Boolean(url));

  return (
    // Fluxo normal + z-10: aparece ao rolar até o fim. Evitar sticky bottom-0 z-0 —
    // ficava atrás do main (.page-surface) e sumia mesmo no scroll máximo.
    <footer className="relative z-10 w-full bg-background">
      {/* Bloco accent full-bleed */}
      <div className="bg-accent text-foreground">
        <div className="content-container grid grid-cols-1 gap-12 py-16 lg:grid-cols-2 lg:py-20">
          {/* Info — esquerda */}
          <div className="flex flex-col gap-6">
            <span className="text-large-heading">{site.siteName}</span>
            <div className="flex flex-col">
              <span className="text-small-heading italic text-foreground/80">
                Dias de trabalho
              </span>
              <span className="text-small-heading">Segunda – Sexta</span>
            </div>
          </div>

          {/* Disponibilidade — direita */}
          <div className="flex flex-col gap-3 lg:items-end lg:text-right">
            <span className="text-large-heading">{availability}</span>
            <span className="text-small-heading text-foreground/80">
              Tem um projeto em mente?
            </span>
            <a
              href={`mailto:${site.email}`}
              className="link-underline text-small-heading w-fit"
            >
              {site.email}
            </a>
          </div>
        </div>

        {/* Divisória + colunas */}
        <div className="content-container border-t border-foreground/30 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Rodapé">
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className="link-underline text-small-heading">
                  {label}
                </Link>
              ))}
            </nav>

            {activeSocials.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {activeSocials.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url!}
                      target={url!.startsWith("http") ? "_blank" : undefined}
                      rel={url!.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="link-underline caps"
                    >
                      {SOCIAL_LABELS[key]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Faixa do nome gigante — letreiro direita → esquerda */}
      <div className="overflow-hidden bg-background py-6">
        <MarqueeText
          text={site.siteName}
          direction="rtl"
          repeat={4}
          className="px-[var(--edge-padding)] text-accent"
        />
      </div>
    </footer>
  );
}
