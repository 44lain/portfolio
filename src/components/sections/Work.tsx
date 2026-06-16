import { WorkSection } from "@/components/sections/WorkSection";
import { getProjects } from "@/lib/content/projects";

export function Work() {
  const projects = getProjects();
  return <WorkSection projects={projects} />;
}
