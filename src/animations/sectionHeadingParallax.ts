import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DUPLICATE_COUNT = 5;

const DUPLICATE_OFFSETS = [
  { x: -3, y: 4, rotate: -2, opacity: 0.15 },
  { x: 5, y: -2, rotate: 3, opacity: 0.12 },
  { x: -6, y: 6, rotate: -1, opacity: 0.1 },
  { x: 4, y: 3, rotate: 2, opacity: 0.14 },
  { x: -2, y: -4, rotate: -3, opacity: 0.08 },
];

// Parallax leve nas camadas duplicadas de títulos de seção.
export function createSectionHeadingParallax(
  heading: HTMLElement,
  layers: HTMLElement[],
): () => void {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    layers.forEach((layer, index) => {
      const config = DUPLICATE_OFFSETS[index % DUPLICATE_OFFSETS.length];
      gsap.set(layer, {
        xPercent: config.x,
        yPercent: config.y,
        rotation: config.rotate,
        opacity: config.opacity,
      });

      gsap.to(layer, {
        y: -20 - index * 6,
        ease: "none",
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
          end: "bottom 40%",
          scrub: 0.6,
        },
      });
    });
  });

  return () => mm.revert();
}

export { DUPLICATE_COUNT, DUPLICATE_OFFSETS };
