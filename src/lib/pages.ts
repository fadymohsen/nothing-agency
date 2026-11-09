import { portfolioItems } from "@/data/portfolio";
import { pagesAr } from "@/data/pages-ar";
import type { PageContent } from "@/types";
import type { Lang } from "./lang";

export interface ResolvedPage {
  slug: string;
  title: string;
  description: string;
  image: string;
  page: PageContent;
}

export const sitePages = portfolioItems.filter((p) => p.page && !p.hidden);

export function getPage(slug: string, lang: Lang): ResolvedPage | undefined {
  const item = sitePages.find((p) => p.slug === slug);
  if (!item || !item.page) return undefined;
  if (lang === "ar" && pagesAr[slug]) {
    const ar = pagesAr[slug];
    return {
      slug,
      title: ar.title,
      description: ar.description,
      image: item.image,
      page: ar.page,
    };
  }
  return {
    slug,
    title: item.title,
    description: item.description,
    image: item.image,
    page: item.page,
  };
}
