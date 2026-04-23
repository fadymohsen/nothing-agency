export interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  image: string;
  description: string;
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
