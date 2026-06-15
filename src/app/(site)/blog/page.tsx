import type { Metadata } from "next";
import { BlogCard } from "@/components/ui/BlogCard";
import { getPosts } from "@/lib/content/mock";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos sobre Next.js, animação, CSS e segurança.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <section className="content-container py-12 lg:py-16">
      <span className="caps mb-8 block text-muted">Todos os posts</span>
      <div className="grid grid-cols-1 gap-[var(--grid-gap)] md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
