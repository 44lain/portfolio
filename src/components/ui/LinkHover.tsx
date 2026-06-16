"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import type { TransitionDirection } from "@/lib/navigation";

type LinkHoverProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  /** Texto opcional no tooltip (desktop ≥1024px). */
  tooltip?: string;
  transitionDirection?: TransitionDirection;
};

// Underline CSS + tooltip animado (GSAP fade/scale) — desktop only, Sprint 4.
export function LinkHover({
  href,
  children,
  external,
  className = "",
  tooltip,
  transitionDirection = "forward",
}: LinkHoverProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const tip = tooltipRef.current;
      if (!root || !tip || !tooltip) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(tip, { autoAlpha: 0, scale: 0.95, y: 6 });

        const show = () => {
          gsap.to(tip, { autoAlpha: 1, scale: 1, y: 0, duration: 0.25, ease: "power2.out" });
        };
        const hide = () => {
          gsap.to(tip, { autoAlpha: 0, scale: 0.95, y: 6, duration: 0.2, ease: "power2.in" });
        };

        root.addEventListener("mouseenter", show);
        root.addEventListener("mouseleave", hide);
        root.addEventListener("focusin", show);
        root.addEventListener("focusout", hide);

        return () => {
          root.removeEventListener("mouseenter", show);
          root.removeEventListener("mouseleave", hide);
          root.removeEventListener("focusin", show);
          root.removeEventListener("focusout", hide);
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [tooltip] },
  );

  const classes = `link-underline transition-colors hover:text-accent ${className}`.trim();

  const link = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  ) : (
    <TransitionLink href={href} className={classes} transitionDirection={transitionDirection}>
      {children}
    </TransitionLink>
  );

  if (!tooltip) {
    return link;
  }

  return (
    <span ref={rootRef} className="relative inline-flex">
      {link}
      <span
        ref={tooltipRef}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-accent bg-background px-3 py-1 caps text-foreground lg:block"
      >
        {tooltip}
      </span>
    </span>
  );
}
