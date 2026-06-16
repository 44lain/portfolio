"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  navigateWithTransition,
  type TransitionDirection,
} from "@/lib/navigation";

/** Hook para navegação programática com View Transitions ou fallback GSAP. */
export function useViewTransition() {
  const router = useRouter();

  const push = useCallback(
    (href: string, direction: TransitionDirection = "forward") => {
      navigateWithTransition(router, href, direction);
    },
    [router],
  );

  return { push };
}
