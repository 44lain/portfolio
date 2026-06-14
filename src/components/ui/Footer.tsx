import Link from "next/link";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

type SocialLinks = {
  github?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  codepen?: string | null;
  bluesky?: string | null;
  mastodon?: string | null;
  rss?: string | null;
};

type FooterProps = {
  socialLinks: SocialLinks;
};

const SOCIAL_LABELS: Record<keyof SocialLinks, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  codepen: "Codepen",
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  rss: "RSS",
};

export function Footer({ socialLinks }: FooterProps) {
  const activeSocials = (
    Object.entries(socialLinks) as [keyof SocialLinks, string | null | undefined][]
  ).filter(([, url]) => Boolean(url));

  return (
    <footer className="mt-auto border-t border-secondary/40">
      <div className="content-container grid grid-cols-1 gap-10 py-16 md:grid-cols-2">
        <nav className="flex flex-col gap-3" aria-label="Rodapé">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="caps w-fit text-muted transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <ul className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
          {activeSocials.map(([key, url]) => (
            <li key={key}>
              <a
                href={url!}
                target={url!.startsWith("http") ? "_blank" : undefined}
                rel={url!.startsWith("http") ? "noopener noreferrer" : undefined}
                className="caps text-muted transition-colors hover:text-accent"
              >
                {SOCIAL_LABELS[key]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
