"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createMobileMenuTimeline } from "@/animations/mobileMenu";
import type { SocialLinks } from "@/types/content";

const SOCIAL_LABELS: Record<keyof SocialLinks, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  codepen: "Codepen",
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  rss: "RSS",
};

type NavLink = { href: string; label: string };

type MobileMenuProps = {
  siteName: string;
  email: string;
  availability: string;
  navLinks: readonly NavLink[];
  socialLinks: SocialLinks;
};

// Ícone "grid de apps" (3×3) usado no botão de abrir o menu — padrão do modelo.
function GridIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {[3, 10.5, 18].map((y) =>
        [3, 10.5, 18].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" rx="0.5" />),
      )}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}

// Menu mobile (apenas < md). Botão de grid no header; ao abrir, um painel desliza
// de cima para baixo cobrindo a tela, com nav serif grande + socials + contato.
// A timeline (slide + cascata) vive em /animations; aqui controlamos play/reverse.
export function MobileMenu({ siteName, email, availability, navLinks, socialLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();
  const lenis = useLenis();

  const activeSocials = (
    Object.entries(socialLinks) as [keyof SocialLinks, string | null | undefined][]
  ).filter(([, url]) => Boolean(url));

  // Monta a timeline uma vez; o painel começa escondido acima da viewport.
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-menu-item]", panel);
      gsap.set(panel, { yPercent: -100, visibility: "hidden" });
      const tl = createMobileMenuTimeline({ panel, items });
      // Ao terminar de fechar (reverse), esconde para não capturar foco/cliques.
      tl.eventCallback("onReverseComplete", () => gsap.set(panel, { visibility: "hidden" }));
      timelineRef.current = tl;
    },
    { scope: containerRef },
  );

  // Abre/fecha tocando a timeline e travando/destravando o scroll do Lenis.
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isOpen) {
      tl.play();
      lenis?.stop();
    } else {
      tl.reverse();
      lenis?.start();
    }
  }, [isOpen, lenis]);

  // Fecha ao trocar de rota (após clicar em um link).
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Fecha com a tecla Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="text-accent transition-colors hover:text-hover"
      >
        <GridIcon />
      </button>

      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-0 z-50 flex flex-col bg-accent text-foreground"
      >
        {/* Barra superior do painel: logo + botão de fechar */}
        <div className="content-container flex items-center justify-between py-3">
          <span className="text-nav-logo">{siteName}</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
            className="transition-opacity hover:opacity-70"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navegação principal em serif grande */}
        <nav className="content-container flex flex-1 flex-col justify-center gap-2" aria-label="Menu principal">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              data-menu-item
              className="text-large-heading w-fit text-foreground transition-colors hover:text-background"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Rodapé do menu: socials + disponibilidade/contato */}
        <div className="content-container flex flex-col gap-6 border-t border-foreground/30 py-8">
          {activeSocials.length > 0 && (
            <div data-menu-item className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="caps text-foreground/70">Sociais:</span>
              {activeSocials.map(([key, url]) => (
                <a
                  key={key}
                  href={url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline caps"
                >
                  {SOCIAL_LABELS[key]}
                </a>
              ))}
            </div>
          )}

          <div data-menu-item className="flex flex-col gap-1">
            <span className="text-small-heading italic text-foreground/80">{availability}</span>
            <a href={`mailto:${email}`} className="link-underline caps w-fit">
              {email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
