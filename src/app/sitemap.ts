import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { PAGE_SLUGS } from "@/lib/lang";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = PAGE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/en/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/${slug}`,
        ar: `${SITE_URL}/ar/${slug}`,
      },
    },
  }));

  return [
    {
      url: `${SITE_URL}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${SITE_URL}/en`,
          ar: `${SITE_URL}/ar`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/contact`,
          ar: `${SITE_URL}/ar/contact`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/projects`,
          ar: `${SITE_URL}/ar/projects`,
        },
      },
    },
    ...projects.map((p) => ({
      url: `${SITE_URL}/en/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/projects/${p.slug}`,
          ar: `${SITE_URL}/ar/projects/${p.slug}`,
        },
      },
    })),
    ...pages,
  ];
}
