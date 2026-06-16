import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Interpola --bg-progress (0→1) conforme o scroll da página.
export function createBackgroundProgress(): () => void {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        document.documentElement.style.setProperty(
          "--bg-progress",
          self.progress.toFixed(4),
        );
      },
    });
  });

  return () => {
    document.documentElement.style.setProperty("--bg-progress", "0");
    mm.revert();
  };
}
