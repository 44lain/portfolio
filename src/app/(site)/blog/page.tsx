import type { Metadata } from "next";
import { PageMarquee } from "@/components/ui/PageMarquee";
import { BlogCard } from "@/components/ui/BlogCard";
import { getPosts } from "@/lib/content/mock";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos sobre Next.js, animação, CSS e segurança.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <PageMarquee text="Blog Archive" repeat={3} ariaLabel="Blog" />
      <section className="content-container section-spacing">
        <h2 className="text-large-heading mb-10 text-foreground">Todos os posts</h2>
        <div className="grid grid-cols-1 gap-[var(--grid-gap)] md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
