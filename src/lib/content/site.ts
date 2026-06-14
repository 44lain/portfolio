import fs from "fs";
import path from "path";

export type SocialLinks = {
  github?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  codepen?: string | null;
  bluesky?: string | null;
  mastodon?: string | null;
  rss?: string | null;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  email: string;
  defaultAccent: string;
  socialLinks: SocialLinks;
};

export function getSiteSettings(): SiteSettings {
  const filePath = path.join(process.cwd(), "content/site.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteSettings;
}
