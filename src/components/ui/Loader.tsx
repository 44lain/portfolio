"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { createPageLoader } from "@/animations/pageLoader";
import { prefersReducedMotion } from "@/lib/motion";

type LoaderProps = {
  siteName: string;
};

// Overlay fullscreen no page load — fade out após window load.
export function Loader({ siteName }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useGSAP(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    if (prefersReducedMotion()) {
      setHidden(true);
      return;
    }

    return createPageLoader(loader, () => setHidden(true));
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={loaderRef}
      className="loader-overlay fixed inset-0 z-[10000] flex items-center justify-center bg-background"
      aria-hidden="true"
    >
      <span className="text-nav-logo text-accent">{siteName}</span>
    </div>
  );
}
