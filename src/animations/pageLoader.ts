import gsap from "gsap";

const FADE_DURATION = 0.8;

// Fade out do overlay de carregamento após o load da página.
export function createPageLoader(
  loader: HTMLElement,
  onComplete: () => void,
): () => void {
  const finish = () => {
    gsap.to(loader, {
      opacity: 0,
      duration: FADE_DURATION,
      ease: "power2.out",
      onComplete,
    });
  };

  if (document.readyState === "complete") {
    finish();
  } else {
    window.addEventListener("load", finish, { once: true });
  }

  return () => window.removeEventListener("load", finish);
}
