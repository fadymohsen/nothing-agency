import type { PortfolioItem, SocialLink } from "@/types";
import type { dict } from "@/data/dictionary";
import type { Scene } from "@/data/scenes";
import type { ArabicPage } from "@/data/pages-ar";
import type { Client } from "@/data/clients";

export type Social = SocialLink & { icon?: string };

export interface SiteSettings {
  siteName: string;
  copyright: string;
  headerLogo: string;
  splashLogo: string;
  ogImage: string;
  notFoundImage: string;
  socials: Social[];
}

export interface ContactSettings {
  phoneDisplay: string;
  phoneHref: string;
  whatsappDisplay: string;
  whatsappUrl: string;
  mapsUrl: string;
  addressLines: string[];
  email: string;
  icons: { call: string; whatsapp: string; visit: string; email: string };
}

export interface SeoEntry {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface SeoSettings {
  home: SeoEntry;
  contact: SeoEntry;
  projects: SeoEntry;
}

export type ContentProject = {
  slug: string;
  category: string;
  title: { en: string; ar: string };
  /** Image URLs, the first one is the cover */
  images: string[];
};

export interface Content {
  site: SiteSettings;
  contact: ContactSettings;
  seo: { en: SeoSettings; ar: SeoSettings };
  dict: typeof dict;
  portfolio: PortfolioItem[];
  pagesAr: Record<string, ArabicPage>;
  scenes: Record<string, Scene>;
  projects: ContentProject[];
  clients: Client[];
}
