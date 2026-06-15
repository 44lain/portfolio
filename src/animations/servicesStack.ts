import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Desktop: espalhamento horizontal (cartas jogadas lateralmente).
const DESKTOP_SCATTER = [
  { xPercent: 55, yPercent: 60, rotation: -16 },
  { xPercent: 0, yPercent: 90, rotation: 12 },
  { xPercent: -55, yPercent: 60, rotation: -8 },
];

// Mobile: espalhamento vertical — cada card começa mais abaixo, com leve desvio lateral.
const MOBILE_SCATTER = [
  { y: 80, x: 28, rotation: -14 },
  { y: 160, x: -22, rotation: 11 },
  { y: 240, x: 18, rotation: -9 },
];

// Calcula o marginTop negativo para cada card se empilhar sobre o anterior,
// colapsando o fluxo do grid de 1 coluna até as 3 cartas ficarem juntas.
function measureMobileStackMargins(cards: HTMLElement[]): number[] {
  const gap = parseFloat(getComputedStyle(cards[0].parentElement!).rowGap || "0") || 24;

  return cards.map((_, index) => {
    if (index === 0) return 0;
    let margin = 0;
    for (let i = 0; i < index; i++) {
      margin -= cards[i].offsetHeight + gap;
    }
    return margin;
  });
}

function stackCards(
  section: HTMLElement,
  cards: HTMLElement[],
  restingRotations: number[],
  mode: "desktop" | "mobile",
) {
  const scrollConfig = {
    trigger: section,
    start: mode === "mobile" ? "top 90%" : "top 85%",
    end: mode === "mobile" ? "bottom 35%" : "center 55%",
    scrub: 0.6,
  };

  const stackMargins = mode === "mobile" ? measureMobileStackMargins(cards) : null;

  cards.forEach((card, index) => {
    if (mode === "desktop") {
      const from = DESKTOP_SCATTER[index % DESKTOP_SCATTER.length];
      gsap.fromTo(
        card,
        {
          xPercent: from.xPercent,
          yPercent: from.yPercent,
          rotation: from.rotation,
          scale: 0.88,
          autoAlpha: 0.45,
        },
        {
          xPercent: 0,
          yPercent: 0,
          rotation: restingRotations[index] ?? 0,
          scale: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: scrollConfig,
        },
      );
      return;
    }

    const from = MOBILE_SCATTER[index % MOBILE_SCATTER.length];
    gsap.fromTo(
      card,
      {
        x: from.x,
        y: from.y,
        rotation: from.rotation,
        scale: 0.9,
        autoAlpha: 0.55,
        marginTop: 0,
        zIndex: index + 1,
      },
      {
        x: 0,
        y: 0,
        rotation: index === 0 ? 0 : (index - 1) * 2 - 1,
        scale: 1,
        autoAlpha: 1,
        marginTop: stackMargins![index],
        zIndex: index + 1,
        ease: "none",
        scrollTrigger: scrollConfig,
      },
    );
  });
}

// Anima os cards "se juntando como cartas" conforme o usuário rola.
// Desktop: espalhamento horizontal → grid alinhado.
// Mobile: espalhamento vertical → empilhamento (marginTop negativo colapsa o fluxo).
// Desativado em prefers-reduced-motion.
export function createServicesStack(
  section: HTMLElement,
  cards: HTMLElement[],
  restingRotations: number[],
): () => void {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
    stackCards(section, cards, restingRotations, "desktop");
  });

  mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
    stackCards(section, cards, restingRotations, "mobile");
  });

  return () => mm.revert();
}
