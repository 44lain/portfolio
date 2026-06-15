type PageContentProps = {
  children: React.ReactNode;
  className?: string;
};

// Wrapper de conteúdo de página interna: garante altura mínima de 1 viewport
// entre header e footer (header / conteúdo / footer).
export function PageContent({ children, className = "" }: PageContentProps) {
  return <div className={`min-h-screen ${className}`.trim()}>{children}</div>;
}
