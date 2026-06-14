import Link from "next/link";
import type { ProjectMeta } from "@/types/content";

type ProjectCardProps = {
  project: ProjectMeta;
  className?: string;
};

// Capa renderizada como bloco de cor (accentColor) + gradiente, com título sobreposto.
// As fotos dos projetos não são usadas por enquanto — apenas as cores.
// Hover anima o border-radius (--card-radius → --hover-radius).
export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-card transition-[border-radius] duration-500 hover:rounded-card-hover ${className}`}
      style={{ backgroundColor: project.accentColor ?? "var(--color-secondary)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
      <div className="relative z-10 flex flex-col gap-3 p-6">
        <h3 className="text-card-title text-foreground">{project.title}</h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="caps text-foreground/70">{project.year}</span>
          {project.tags.map((tag) => (
            <span key={tag} className="caps text-foreground/70">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
