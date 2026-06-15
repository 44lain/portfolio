import gsap from "gsap";

type MobileMenuRefs = {
  panel: HTMLElement;
  items: HTMLElement[];
};

// Timeline (pausada) de abertura do menu mobile:
// 1. o painel desliza de cima para baixo (yPercent -100 → 0), cobrindo a tela;
// 2. os itens (nav, socials, contato) entram em cascata logo em seguida.
//
// O fechamento usa a MESMA timeline em reverse() — daí o tween dos itens vir
// sobreposto ao do painel, para a saída parecer fluida.
export function createMobileMenuTimeline({ panel, items }: MobileMenuRefs): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });

  tl.set(panel, { visibility: "visible" });
  tl.fromTo(
    panel,
    { yPercent: -100 },
    { yPercent: 0, duration: 0.5, ease: "power3.out" },
  );
  tl.fromTo(
    items,
    { y: 28, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" },
    "-=0.25",
  );

  return tl;
}
