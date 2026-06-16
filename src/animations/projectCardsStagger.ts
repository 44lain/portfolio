import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Entrada staggered dos cards de projeto (rotate + opacity).
export function createProjectCardsStagger(
  section: HTMLElement,
  cards: HTMLElement[],
): () => void {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.from(cards, {
      opacity: 0,
      rotation: 3,
      y: 32,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  return () => mm.revert();
}
