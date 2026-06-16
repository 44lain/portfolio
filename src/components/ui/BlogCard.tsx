import { TransitionLink } from "@/components/ui/TransitionLink";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/types/content";

type BlogCardProps = {
  post: PostMeta;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <TransitionLink
      href={`/blog/${post.slug}`}
      transitionDirection="forward"
      className="group flex flex-col gap-4 rounded-[var(--border-radius)] border border-secondary/60 bg-secondary/15 p-6 transition-colors hover:border-accent"
    >
      <span className="caps text-muted">{formatDate(post.createdAt)}</span>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="caps rounded-full border border-secondary px-3 py-1 text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-card-title text-foreground transition-colors group-hover:text-accent">
        {post.title}
      </h3>

      <p className="text-small-body mt-auto text-muted">{post.excerpt}</p>
    </TransitionLink>
  );
}
