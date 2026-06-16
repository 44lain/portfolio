import type { SocialLinks } from "@/types/content";

/** Rótulos legíveis para links sociais de site.json. */
export const SOCIAL_LABELS: Record<keyof SocialLinks, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  codepen: "Codepen",
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  rss: "RSS",
};
