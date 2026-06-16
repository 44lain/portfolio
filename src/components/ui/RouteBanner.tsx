"use client";

import { usePathname } from "next/navigation";
import { AnimatedMarqueeBanner } from "./AnimatedMarqueeBanner";
import { resolveRouteBannerConfig } from "@/lib/route-banner";

type RouteBannerProps = {
  siteName: string;
};

// Escolhe o texto gigante do topo conforme a rota atual.
export function RouteBanner({ siteName }: RouteBannerProps) {
  const pathname = usePathname();
  const config = resolveRouteBannerConfig(pathname, siteName);

  return (
    <AnimatedMarqueeBanner
      text={config.text}
      asHeading={config.asHeading}
      headingLabel={config.headingLabel}
    />
  );
}
