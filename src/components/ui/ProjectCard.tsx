import type { ComponentPropsWithoutRef } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import type { ProjectMeta } from "@/types/content";

type ProjectCardProps = {
  project: ProjectMeta;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof TransitionLink>, "href" | "className" | "children">;

export function ProjectCard({ project, className = "", ...linkProps }: ProjectCardProps) {
  return (
    <TransitionLink
      href={`/work/${project.slug}`}
      transitionDirection="forward"
      {...linkProps}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-card transition-[border-radius] duration-500 hover:rounded-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
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
    </TransitionLink>
  );
}
