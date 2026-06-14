import Link from "next/link";

type LinkHoverProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

// Sprint 1: underline animado via CSS. O tooltip com preview chega na Sprint 4.
export function LinkHover({ href, children, external, className = "" }: LinkHoverProps) {
  const classes = `link-underline transition-colors hover:text-accent ${className}`.trim();

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
