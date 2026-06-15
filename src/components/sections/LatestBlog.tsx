import { BlogCard } from "@/components/ui/BlogCard";
import { Pill } from "@/components/ui/Pill";
import { getPosts } from "@/lib/content/posts";

export function LatestBlog() {
  const posts = getPosts().slice(0, 6);

  return (
    <section
      id="blog"
      className="content-container py-20 lg:py-28"
      aria-label="Blog"
    >
      <div className="mb-12 flex items-end justify-between gap-6">
        <h2 className="text-large-heading text-foreground">Últimos posts</h2>
        <Pill href="/blog">Ver tudo</Pill>
      </div>

      <div className="grid grid-cols-1 gap-[var(--grid-gap)] md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
