"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SmoothScrollProps = {
  children: React.ReactNode;
};

// Ponte entre o Lenis (scroll suave) e o GSAP ScrollTrigger:
// - a cada scroll do Lenis, atualiza o ScrollTrigger (senão as animações de scrub "atrasam");
// - a cada troca de rota, volta ao topo e dá refresh nos triggers (recalcula posições).
function ScrollBridge() {
  const pathname = usePathname();
  const lenis = useLenis(() => ScrollTrigger.update());

  useGSAP(() => {
    lenis?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <ScrollBridge />
      {children}
    </ReactLenis>
  );
}
