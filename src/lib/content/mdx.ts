import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { z } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/** Lista arquivos `.mdx` de um subdiretório em `content/`. */
export function listMdxFiles(subdir: string): string[] {
  const dir = path.join(CONTENT_ROOT, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

/** Lê um MDX e separa frontmatter + corpo markdown. */
export function readMdxFile(subdir: string, filename: string) {
  const filePath = path.join(CONTENT_ROOT, subdir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fileSlug = filename.replace(/\.mdx$/, "");
  return { fileSlug, data, content: content.trim() };
}

/** Valida frontmatter com Zod; lança em dev se inválido. */
export function parseFrontmatter<T extends z.ZodType>(
  schema: T,
  data: unknown,
  context: string,
): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Frontmatter inválido em ${context}: ${result.error.message}`);
  }
  return result.data;
}

/** Garante que slug do frontmatter coincide com o nome do arquivo. */
export function assertSlugMatch(fileSlug: string, dataSlug: string, filename: string) {
  if (fileSlug !== dataSlug) {
    throw new Error(
      `Slug divergente em ${filename}: arquivo="${fileSlug}", frontmatter="${dataSlug}"`,
    );
  }
}
