"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type SmoothScrollProps = {
  children: React.ReactNode;
};

// Reseta o scroll para o topo a cada mudança de rota.
// Como o Lenis controla o scroll, a navegação do Next não volta ao topo sozinha —
// forçamos `scrollTo(0, immediate)` para a página sempre começar do início.
function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <ScrollToTopOnNavigate />
      {children}
    </ReactLenis>
  );
}
