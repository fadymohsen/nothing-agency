export type Lang = "en" | "ar";

/** Slugs that have a full content page (English at /slug, Arabic at /ar/slug). */
export const PAGE_SLUGS = [
  "home",
  "about-us",
  "what-we-do",
  "manifesto",
  "from-nothing",
  "nothing-lab",
  "unseen",
  "nothing-just-feel",
  "lets-create",
] as const;

/** Routes that exist in the Arabic tree (used by the language switcher). */
const AR_ROUTES = new Set<string>(["", "contact", ...PAGE_SLUGS]);

export function langFromPath(pathname: string | null): Lang {
  return pathname === "/ar" || pathname?.startsWith("/ar/") ? "ar" : "en";
}

export function withLang(path: string, lang: Lang): string {
  const clean = path === "/" ? "" : path;
  return lang === "ar" ? `/ar${clean}` || "/ar" : clean || "/";
}

export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/ar(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

export function switchLangPath(pathname: string, target: Lang): string {
  const base = stripLang(pathname).replace(/\/$/, "") || "/";
  if (target === "en") return base;
  const key = base === "/" ? "" : base.slice(1);
  return AR_ROUTES.has(key) ? withLang(base, "ar") : "/ar";
}

/** Localize an internal href; routes without an Arabic version are left as-is. */
export function localizeHref(href: string, lang: Lang): string {
  if (lang === "en" || !href.startsWith("/")) return href;
  const key = href === "/" ? "" : href.slice(1);
  return AR_ROUTES.has(key) ? withLang(href, "ar") : href;
}

export function pageHref(slug: string, lang: Lang): string {
  return localizeHref(`/${slug}`, lang);
}
