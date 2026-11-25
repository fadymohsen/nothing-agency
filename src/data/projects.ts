/**
 * Nothing's portfolio: 21 projects, each made of pages from the company profile
 * (optimised copies in public/projects/NN.jpg, NN = profile page number).
 * DRAFT grouping and titles; edit freely, nothing else depends on the names.
 */
export type ProjectCategory = "campaigns" | "healthcare" | "events" | "identity" | "digital";

export interface Project {
  slug: string;
  category: ProjectCategory;
  title: { en: string; ar: string };
  /** Profile page numbers, first one is the cover */
  pages: number[];
}

export const projects: Project[] = [
  { slug: "pepsi-made-to-win", category: "campaigns", title: { en: "Pepsi: Made to Win", ar: "بيبسي: Made to Win" }, pages: [4] },
  { slug: "sports-campaigns", category: "campaigns", title: { en: "Sports Campaigns", ar: "حملات رياضية" }, pages: [9, 76] },
  { slug: "arabic-health-awareness", category: "healthcare", title: { en: "Arabic Health Awareness", ar: "توعية صحية بالعربية" }, pages: [10, 11, 27] },
  { slug: "visit-dubai", category: "campaigns", title: { en: "Visit Dubai", ar: "زيارة دبي" }, pages: [14, 67] },
  { slug: "novartis-pain", category: "healthcare", title: { en: "Novartis: Pain Campaign", ar: "نوفارتس: حملة الألم" }, pages: [13, 15, 16] },
  { slug: "actel-bactive", category: "healthcare", title: { en: "Actel Bactive", ar: "أكتيل باكتيف" }, pages: [18] },
  { slug: "seasonal-consumer", category: "campaigns", title: { en: "Seasonal & Consumer Ideas", ar: "أفكار موسمية واستهلاكية" }, pages: [19, 20, 21] },
  { slug: "fertility-awareness", category: "healthcare", title: { en: "Fertility Awareness", ar: "توعية الخصوبة" }, pages: [22] },
  { slug: "pharco-ciprofar-depovit", category: "healthcare", title: { en: "Pharco: Ciprofar & Depovit B", ar: "فاركو: سيبروفار وديبوفيت بي" }, pages: [23, 28] },
  { slug: "novartis-therapeutic", category: "healthcare", title: { en: "Novartis: Therapeutic Campaigns", ar: "نوفارتس: حملات علاجية" }, pages: [24, 25, 29, 31, 33, 35, 37] },
  { slug: "amgen", category: "healthcare", title: { en: "Amgen", ar: "أمجين" }, pages: [30] },
  { slug: "nordiflex", category: "healthcare", title: { en: "Nordiflex", ar: "نورديفليكس" }, pages: [34] },
  { slug: "noma", category: "digital", title: { en: "NOMA: Novartis Medical Academy", ar: "NOMA: أكاديمية نوفارتس الطبية" }, pages: [36, 49, 50, 51, 52, 53, 54, 55] },
  { slug: "events-exhibitions", category: "events", title: { en: "Events & Exhibitions", ar: "الفعاليات والمعارض" }, pages: [32, 38, 39, 40, 41, 42, 43] },
  { slug: "nestogen-sekem", category: "identity", title: { en: "Nestogen & Sekem: Packaging and In-Store", ar: "نيستوجين وسيكم: العبوات ونقاط البيع" }, pages: [45, 46, 47, 48] },
  { slug: "sscn-logos", category: "identity", title: { en: "SSCN & Logo Systems", ar: "SSCN وأنظمة الشعارات" }, pages: [44, 59] },
  { slug: "cityserv", category: "digital", title: { en: "CityServ: App & Web", ar: "سيتي سيرف: تطبيق وموقع" }, pages: [56] },
  { slug: "metropolitan", category: "identity", title: { en: "Metropolitan Identity", ar: "هوية ميتروبوليتان" }, pages: [57, 58] },
  { slug: "bioderma-allure-hdc", category: "campaigns", title: { en: "Bioderma, Allure & HDC", ar: "بيوديرما وألور وHDC" }, pages: [60, 61, 62] },
  { slug: "creative-concepts", category: "campaigns", title: { en: "Creative Concepts", ar: "أفكار إبداعية" }, pages: [12, 17, 26, 63, 64, 65, 66, 68] },
  { slug: "healthcare-brand-stories", category: "healthcare", title: { en: "Healthcare Brand Stories", ar: "قصص علامات الرعاية الصحية" }, pages: [69, 70, 74, 75] },
];

export const projectImage = (page: number) => `/projects/${String(page).padStart(2, "0")}.jpg`;

import dims from "./project-dims.json";

/** Pixel size of an optimised page image, so the layout can reserve its space. */
export const projectSize = (page: number): { width: number; height: number } => {
  const [width, height] = (dims as Record<string, number[]>)[String(page)] ?? [1600, 900];
  return { width, height };
};

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Size for any image URL: known for the profile pages, undefined for images added later in the admin. */
export const projectImageSize = (url: string): { width?: number; height?: number } => {
  const m = /\/projects\/(\d+)\.jpg$/.exec(url);
  return m ? projectSize(Number(m[1])) : {};
};
