import fs from "fs";
import path from "path";
import type { SiteSettings } from "@/types/content";

export type { SiteSettings, SocialLinks } from "@/types/content";

export function getSiteSettings(): SiteSettings {
  const filePath = path.join(process.cwd(), "content/site.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteSettings;
}
