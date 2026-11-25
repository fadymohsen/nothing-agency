import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { PAGE_SLUGS } from "@/lib/lang";
import { getContent } from "@/lib/content/server";
import { isProjectsPageHidden } from "@/lib/content/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const hideProjects = isProjectsPageHidden(content);
  const visibleProjects = content.projects.filter((p) => !p.hidden);
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

  const projectRoutes: MetadataRoute.Sitemap = hideProjects
    ? []
    : [
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
        ...visibleProjects.map((p) => ({
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
      ];

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
    ...projectRoutes,
    ...pages,
  ];
}
