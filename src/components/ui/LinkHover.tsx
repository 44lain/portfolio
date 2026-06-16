import { TransitionLink } from "@/components/ui/TransitionLink";
import type { TransitionDirection } from "@/lib/navigation";

type LinkHoverProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  transitionDirection?: TransitionDirection;
};

// Link interno/externo com sublinhado animado via CSS (.link-underline).
export function LinkHover({
  href,
  children,
  external,
  className = "",
  transitionDirection = "forward",
}: LinkHoverProps) {
  const classes = `link-underline transition-colors hover:text-accent ${className}`.trim();

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <TransitionLink href={href} className={classes} transitionDirection={transitionDirection}>
      {children}
    </TransitionLink>
  );
}
