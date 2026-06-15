import type { Metadata } from "next";
import { PageMarquee } from "@/components/ui/PageMarquee";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getProjects } from "@/lib/content/mock";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Seleção de projetos de desenvolvimento web, mobile e segurança.",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <>
      <PageMarquee text="Projetos" repeat={4} ariaLabel="Projetos" />
      <section className="content-container section-spacing">
        <h2 className="text-large-heading mb-10 text-foreground">Todos os projetos</h2>
        <div className="grid grid-cols-1 gap-[var(--grid-gap)] md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} className="min-h-[22rem]" />
          ))}
        </div>
      </section>
    </>
  );
}
