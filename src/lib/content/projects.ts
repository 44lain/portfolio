import type { ProjectMeta } from "@/types/content";
import {
  assertSlugMatch,
  listMdxFiles,
  parseFrontmatter,
  readMdxFile,
} from "@/lib/content/mdx";
import { projectFrontmatterSchema } from "@/lib/content/schemas";

export type Project = ProjectMeta & { content: string };

const PROJECTS_DIR = "projects";

function loadProject(filename: string): Project {
  const { fileSlug, data, content } = readMdxFile(PROJECTS_DIR, filename);
  const meta = parseFrontmatter(projectFrontmatterSchema, data, filename);
  assertSlugMatch(fileSlug, meta.slug, filename);
  return { ...meta, content };
}

/** Projetos publicados, ordenados por ano (desc). */
export function getProjects(): ProjectMeta[] {
  return listMdxFiles(PROJECTS_DIR)
    .map((file) => loadProject(file))
    .filter((p) => p.published)
    .sort((a, b) => b.year - a.year);
}

/** Projeto por slug ou `null` se inexistente / não publicado. */
export function getProjectBySlug(slug: string): Project | null {
  const filename = `${slug}.mdx`;
  const files = listMdxFiles(PROJECTS_DIR);
  if (!files.includes(filename)) return null;

  const project = loadProject(filename);
  if (!project.published) return null;
  return project;
}
