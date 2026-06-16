import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content/site";
import { absoluteUrl } from "@/lib/seo/url";

const DEFAULT_OG_IMAGE = "/foto-lain.jpeg";

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/** Monta metadata com Open Graph e Twitter Card para uma rota. */
export function buildPageMetadata({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
}: PageMetadataInput): Metadata {
  const site = getSiteSettings();
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(ogImage);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.siteName,
      locale: "pt_BR",
      type,
      ...(publishedTime && { publishedTime }),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export { DEFAULT_OG_IMAGE };
