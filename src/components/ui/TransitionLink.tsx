import Link from "next/link";
import type { ComponentProps } from "react";
import type { TransitionDirection } from "@/lib/navigation";

type TransitionLinkProps = ComponentProps<typeof Link> & {
  /** Direção semântica da transição (slide forward/back). */
  transitionDirection?: TransitionDirection;
};

/** Link interno com `transitionTypes` para animações de rota (Sprint 4). */
export function TransitionLink({
  transitionDirection = "forward",
  ...props
}: TransitionLinkProps) {
  const transitionTypes =
    transitionDirection === "back" ? ["nav-back"] : ["nav-forward"];

  return <Link {...props} transitionTypes={transitionTypes} />;
}
