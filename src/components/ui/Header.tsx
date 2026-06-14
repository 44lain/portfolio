import Link from "next/link";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const HEADER_EMAIL = "lain.fork@gmail.com";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-secondary/40 bg-background/90 backdrop-blur-sm">
      <div className="content-container flex items-center justify-between gap-6 py-5">
        <Link href="/" className="text-small-heading text-foreground transition-colors hover:text-accent">
          Lain
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="caps text-muted transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <a
          href={`mailto:${HEADER_EMAIL}`}
          className="caps text-muted transition-colors hover:text-accent"
        >
          {HEADER_EMAIL}
        </a>
      </div>
    </header>
  );
}
