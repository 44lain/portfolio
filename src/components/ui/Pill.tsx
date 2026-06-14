import Link from "next/link";

type PillProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "outline" | "solid";
  className?: string;
};

const base =
  "caps inline-flex items-center justify-center rounded-full px-4 py-2 transition-colors";

const variants = {
  outline: "border border-accent text-foreground hover:bg-accent",
  solid: "bg-accent text-foreground hover:bg-hover",
} as const;

export function Pill({ children, href, variant = "outline", className = "" }: PillProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}

type TagProps = {
  children: React.ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="caps inline-flex items-center rounded-full border border-secondary px-3 py-1 text-muted">
      {children}
    </span>
  );
}
