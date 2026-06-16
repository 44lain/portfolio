import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LAYER_COUNT = 6;

// Offsets e rotações por camada — efeito de texto duplicado empilhado no hero.
const LAYER_TRANSFORMS = [
  { x: -4, y: 6, rotate: -4, opacity: 0.12 },
  { x: 8, y: -3, rotate: 3, opacity: 0.18 },
  { x: -12, y: 10, rotate: -2, opacity: 0.1 },
  { x: 16, y: 4, rotate: 5, opacity: 0.14 },
  { x: -6, y: -8, rotate: -5, opacity: 0.08 },
  { x: 10, y: 12, rotate: 2, opacity: 0.16 },
];

// Entrada do hero + parallax vertical das camadas e leve deslocamento horizontal do letreiro.
export function createHeroMarquee(
  banner: HTMLElement,
  layersRoot: HTMLElement,
  marqueeRoot: HTMLElement,
): () => void {
  const layers = gsap.utils.toArray<HTMLElement>("[data-hero-layer]", layersRoot);
  const track = marqueeRoot.querySelector<HTMLElement>(".marquee-track");

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    layers.forEach((layer, index) => {
      const config = LAYER_TRANSFORMS[index % LAYER_TRANSFORMS.length];
      gsap.set(layer, {
        left: "var(--edge-padding)",
        xPercent: config.x,
        yPercent: config.y - 50,
        rotation: config.rotate,
        opacity: config.opacity,
      });
    });

    const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
    entrance.fromTo(
      layers,
      { opacity: 0, y: 48 },
      { opacity: (i) => LAYER_TRANSFORMS[i % LAYER_TRANSFORMS.length].opacity, y: 0, stagger: 0.06, duration: 1 },
    );
    if (track) {
      entrance.from(track, { opacity: 0, x: -40, duration: 0.9 }, 0.15);
    }

    layers.forEach((layer, index) => {
      const depth = (index + 1) / LAYER_COUNT;
      const baseY = LAYER_TRANSFORMS[index % LAYER_TRANSFORMS.length].y;
      gsap.to(layer, {
        yPercent: baseY - 50 - depth * 18,
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    });

    if (track) {
      gsap.to(track, {
        x: 80,
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }
  });

  return () => mm.revert();
}

export { LAYER_COUNT };
