import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";
import { Pill, Tag } from "@/components/ui/Pill";
import { getPostBySlug, getPosts } from "@/lib/content/mock";
import { formatDate } from "@/lib/format";

type Params = { slug: string };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post não encontrado" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      {/* Banner decorativo "Blog"; o título real é o h1 abaixo. */}
      <MarqueeBanner text="Blog" />
      <div className="page-surface">
        <article className="content-container py-12 lg:py-16">
          <div className="mb-8 flex flex-col gap-4">
            <span className="caps text-muted">{formatDate(post.createdAt)}</span>
            <h1 className="text-large-heading text-foreground">{post.title}</h1>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>

          <p className="text-large-body max-w-2xl text-foreground/90">{post.excerpt}</p>

          <p className="text-small-body mt-6 max-w-2xl text-muted">
            Conteúdo completo do artigo chega na Sprint 2 (MDX).
          </p>

          <div className="mt-12">
            <Pill href="/blog">← Todos os posts</Pill>
          </div>
        </article>
      </div>
    </>
  );
}
