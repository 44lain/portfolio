"use client";

import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";
import {
  createSectionHeadingParallax,
  DUPLICATE_COUNT,
} from "@/animations/sectionHeadingParallax";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
};

// Título de seção com camadas duplicadas e parallax no scroll (Sprint 3).
export function SectionHeading({
  children,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      const layersRoot = layersRef.current;
      if (!heading || !layersRoot) return;

      const layers = Array.from(
        layersRoot.querySelectorAll<HTMLElement>("[data-section-layer]"),
      );
      return createSectionHeadingParallax(heading, layers);
    },
    { scope: headingRef },
  );

  return (
    <div ref={headingRef} className={`section-heading relative ${className}`.trim()}>
      <div
        ref={layersRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: DUPLICATE_COUNT }).map((_, index) => (
          <span
            key={index}
            data-section-layer
            className="section-heading-layer absolute inset-0 text-accent"
          >
            {children}
          </span>
        ))}
      </div>
      <Tag className="section-heading-primary relative z-[1]">{children}</Tag>
    </div>
  );
}
