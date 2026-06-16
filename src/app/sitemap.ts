import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content/posts";
import { getProjects } from "@/lib/content/projects";
import { absoluteUrl } from "@/lib/seo/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/work", "/blog", "/contact"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.createdAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...projectEntries, ...postEntries];
}
