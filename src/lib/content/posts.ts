import type { PostMeta } from "@/types/content";
import {
  assertSlugMatch,
  listMdxFiles,
  parseFrontmatter,
  readMdxFile,
} from "@/lib/content/mdx";
import { postFrontmatterSchema } from "@/lib/content/schemas";

export type Post = PostMeta & { content: string };

const POSTS_DIR = "posts";

function loadPost(filename: string): Post {
  const { fileSlug, data, content } = readMdxFile(POSTS_DIR, filename);
  const meta = parseFrontmatter(postFrontmatterSchema, data, filename);
  assertSlugMatch(fileSlug, meta.slug, filename);
  return { ...meta, content };
}

/** Posts publicados, ordenados por data (desc). */
export function getPosts(): PostMeta[] {
  return listMdxFiles(POSTS_DIR)
    .map((file) => loadPost(file))
    .filter((p) => p.published)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

/** Post por slug ou `null` se inexistente / não publicado. */
export function getPostBySlug(slug: string): Post | null {
  const filename = `${slug}.mdx`;
  const files = listMdxFiles(POSTS_DIR);
  if (!files.includes(filename)) return null;

  const post = loadPost(filename);
  if (!post.published) return null;
  return post;
}
