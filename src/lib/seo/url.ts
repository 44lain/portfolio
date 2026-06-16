/** URL canônica do site — usada em sitemap, robots e Open Graph. */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  return "http://localhost:3000";
}

/** Resolve caminho público para URL absoluta. */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}
