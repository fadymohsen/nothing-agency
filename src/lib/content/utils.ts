import type { PortfolioItem, PageContent } from "@/types";
import type { Lang } from "@/lib/lang";
import type { Content } from "./types";

export const dictOf = (content: Content, lang: Lang) => content.dict[lang];

export interface ResolvedPage {
  slug: string;
  title: string;
  description: string;
  image: string;
  focusMobile?: string;
  page: PageContent;
}

export const sitePagesOf = (content: Content): PortfolioItem[] =>
  content.portfolio.filter((p) => p.page && !p.hidden);

export function getPage(content: Content, slug: string, lang: Lang): ResolvedPage | undefined {
  const item = sitePagesOf(content).find((p) => p.slug === slug);
  if (!item || !item.page) return undefined;
  const ar = content.pagesAr[slug];
  if (lang === "ar" && ar) {
    return {
      slug,
      title: ar.title,
      description: ar.description,
      image: item.heroImage || item.image,
      focusMobile: item.heroFocusMobile,
      page: ar.page,
    };
  }
  return {
    slug,
    title: item.title,
    description: item.description,
    image: item.heroImage || item.image,
    focusMobile: item.heroFocusMobile,
    page: item.page,
  };
}

type Plain = Record<string, unknown>;
const isPlain = (v: unknown): v is Plain =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Fills anything missing in `stored` from `defaults` (objects merge, arrays and values are kept as stored). */
export function mergeDefaults<T>(defaults: T, stored: unknown): T {
  if (isPlain(defaults) && isPlain(stored)) {
    const out: Plain = { ...stored };
    for (const key of Object.keys(defaults)) {
      out[key] = key in stored ? mergeDefaults(defaults[key], stored[key]) : defaults[key];
    }
    return out as T;
  }
  return (stored === undefined || stored === null ? defaults : stored) as T;
}

/**
 * Arrays are kept as stored, so a page added to the defaults after content was saved
 * would never appear. Slot such pages in next to their neighbour from the defaults.
 */
export function withNewPages(defaults: Content, merged: Content): Content {
  const have = new Set(merged.portfolio.map((p) => p.slug));
  const portfolio = [...merged.portfolio];
  defaults.portfolio.forEach((item, i) => {
    if (have.has(item.slug)) return;
    const before = defaults.portfolio[i - 1];
    const at = before ? portfolio.findIndex((p) => p.slug === before.slug) : -1;
    portfolio.splice(at >= 0 ? at + 1 : portfolio.length, 0, item);
    have.add(item.slug);
  });
  return { ...merged, portfolio };
}
