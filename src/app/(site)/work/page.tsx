import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Seleção de projetos de desenvolvimento web, mobile e segurança.",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <section className="content-container py-12 lg:py-16">
      <span className="caps mb-8 block text-muted">Todos os projetos</span>
      <div className="grid grid-cols-1 gap-[var(--grid-gap)] md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} className="min-h-[22rem]" />
        ))}
      </div>
    </section>
  );
}
