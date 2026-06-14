import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/types/content";

type ProjectCardProps = {
  project: ProjectMeta;
  className?: string;
  priority?: boolean;
};

// Capa via next/image (object-cover) + gradiente para legibilidade do título sobreposto.
// Hover anima o border-radius (--card-radius → --hover-radius).
export function ProjectCard({ project, className = "", priority = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-card transition-[border-radius] duration-500 hover:rounded-card-hover ${className}`}
      style={{ backgroundColor: project.accentColor ?? "var(--color-secondary)" }}
    >
      <Image
        src={project.coverImage}
        alt={`Capa do projeto ${project.title}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 60vw"
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
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
