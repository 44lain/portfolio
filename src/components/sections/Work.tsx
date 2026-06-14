import { Pill } from "@/components/ui/Pill";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getProjects } from "@/lib/content/mock";

// Grid assimétrico (fiel ao modelo): 2 cards na primeira linha + 1 card largo na segunda.
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-12"];

export function Work() {
  const projects = getProjects();

  return (
    <section
      id="work"
      className="content-container py-20 lg:py-28"
      aria-label="Projetos"
    >
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-large-heading max-w-2xl text-foreground">
          De marketplaces a sistemas de gestão, construo produtos digitais sob medida.
        </h2>
        <Pill href="/work">Todos os projetos</Pill>
      </div>

      <div className="grid grid-cols-1 gap-[var(--grid-gap)] md:grid-cols-2 lg:grid-cols-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={index === 0}
            className={`min-h-[20rem] ${SPANS[index] ?? "lg:col-span-6"}`}
          />
        ))}
      </div>
    </section>
  );
}
