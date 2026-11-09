export interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  image: string;
  description: string;
  client?: string;
  agency?: string;
  creativeDirection?: string;
  artDirection?: string;
  concept?: string;
  images?: string[];
  hideFromSlider?: boolean;
  /** Content page kept in the codebase but not routed, listed or shown while true. */
  hidden?: boolean;
  page?: PageContent;
}

export interface PageContent {
  heading: string;
  lead?: string;
  paragraphs?: string[];
  pointsTitle?: string;
  points?: { title: string; text: string }[];
  closing?: string;
  ctas?: { label: string; href: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  categories: string[];
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
  titleAttr: string;
  children?: NavItem[];
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface SiteConfig {
  logo: string;
  siteName: string;
  copyright: string;
  socials: SocialLink[];
}
