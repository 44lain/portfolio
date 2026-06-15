import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Estado inicial "espalhado/embaralhado" de cada card (como cartas jogadas na mesa):
// deslocamento horizontal/vertical + rotação exagerada. Durante o scroll, cada card
// converge para a posição alinhada do grid e assenta na rotação de repouso do design.
const SCATTER = [
  { xPercent: 55, yPercent: 60, rotation: -16 },
  { xPercent: 0, yPercent: 90, rotation: 12 },
  { xPercent: -55, yPercent: 60, rotation: -8 },
];

// Anima os cards "se juntando como cartas" conforme o usuário rola.
// Vinculado ao progresso do scroll (scrub) via ScrollTrigger.
// Só roda em telas ≥ 768px e quando o usuário não pediu redução de movimento;
// em mobile/reduced-motion os cards ficam estáticos (sem custo de animação).
export function createServicesStack(
  section: HTMLElement,
  cards: HTMLElement[],
  restingRotations: number[],
): () => void {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
    cards.forEach((card, index) => {
      const from = SCATTER[index % SCATTER.length];
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
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "center 55%",
            scrub: 0.6,
          },
        },
      );
    });
  });

  return () => mm.revert();
}
