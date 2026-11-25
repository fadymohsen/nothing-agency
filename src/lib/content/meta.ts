import type { Metadata } from "next";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import type { Lang } from "@/lib/lang";
import type { Content } from "./types";

export const absUrl = (u: string) => (/^https?:\/\//.test(u) ? u : `${SITE_URL}${u}`);

export function pageMetadata(
  content: Content,
  lang: Lang,
  key: "home" | "contact" | "projects",
  path: string,
  image?: string
): Metadata {
  const s = content.seo[lang][key];
  const img = absUrl(image ?? content.site.ogImage);
  return {
    title: s.title,
    description: s.description,
    alternates: buildAlternates(path, lang),
    openGraph: {
      title: s.ogTitle,
      description: s.ogDescription,
      locale: lang === "ar" ? "ar_EG" : "en_US",
      images: [{ url: img, width: 1200, height: 630, alt: content.site.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: s.ogTitle,
      description: s.ogDescription,
      images: [img],
    },
  };
}
