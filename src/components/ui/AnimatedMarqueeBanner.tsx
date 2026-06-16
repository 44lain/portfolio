"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { createHeroMarquee, LAYER_COUNT } from "@/animations/heroMarquee";
import { MarqueeText } from "@/components/ui/MarqueeText";

type AnimatedMarqueeBannerProps = {
  text: string;
  repeat?: number;
  asHeading?: boolean;
  headingLabel?: string;
};

// Faixa do nome gigante com camadas duplicadas (GSAP) + letreiro CSS.
export function AnimatedMarqueeBanner({
  text,
  repeat = 4,
  asHeading = false,
  headingLabel,
}: AnimatedMarqueeBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const banner = bannerRef.current;
      const layersRoot = layersRef.current;
      const marqueeRoot = marqueeRef.current;
      if (!banner || !layersRoot || !marqueeRoot) return;

      return createHeroMarquee(banner, layersRoot, marqueeRoot);
    },
    { scope: bannerRef },
  );

  return (
    <div
      ref={bannerRef}
      className="route-banner hero-banner sticky top-0 z-0 overflow-hidden pt-2 pb-3 lg:pt-3 lg:pb-4"
    >
      {asHeading && <h1 className="sr-only">{headingLabel ?? text}</h1>}

      <div
        ref={layersRef}
        className="pointer-events-none absolute inset-0 flex items-center overflow-hidden px-[var(--edge-padding)]"
        aria-hidden="true"
      >
        {Array.from({ length: LAYER_COUNT }).map((_, index) => (
          <span
            key={index}
            data-hero-layer
            className="hero-layer text-marquee absolute whitespace-nowrap text-accent"
          >
            {text}
          </span>
        ))}
      </div>

      <div ref={marqueeRef} className="relative z-[1]">
        <MarqueeText
          text={text}
          direction="ltr"
          repeat={repeat}
          className="px-[var(--edge-padding)] text-accent"
        />
      </div>
    </div>
  );
}
