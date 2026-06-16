import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { runPageTransitionFallback } from "@/animations/pageTransitionFallback";
import { pauseLenis, resumeLenis } from "@/lib/lenis-bridge";
import { prefersReducedMotion } from "@/lib/motion";

export type TransitionDirection = "forward" | "back";

export function supportsViewTransitions(): boolean {
  return typeof document !== "undefined" && "startViewTransition" in document;
}

/** Navega com View Transitions API ou fallback GSAP crossfade. */
export function navigateWithTransition(
  router: AppRouterInstance,
  href: string,
  direction: TransitionDirection = "forward",
) {
  const transitionTypes = direction === "back" ? ["nav-back"] : ["nav-forward"];

  pauseLenis();

  const resume = () => resumeLenis();

  if (supportsViewTransitions() && !prefersReducedMotion()) {
    router.push(href, { transitionTypes });
    // Lenis retoma no ScrollBridge após pathname mudar.
    return;
  }

  void runPageTransitionFallback(() => {
    router.push(href);
  }).finally(resume);
}
