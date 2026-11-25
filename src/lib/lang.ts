export type Lang = "en" | "ar";

/** Slugs that have a full content page (English at /en/slug, Arabic at /ar/slug). */
// Hidden for now (content kept in data files): home, nothing-lab, nothing-just-feel, lets-create
export const PAGE_SLUGS = [
  "about-us",
  "what-we-do",
  "manifesto",
  "from-nothing",
  "unseen",
] as const;

/** Routes that exist in both language trees. */
const ROUTABLE_SLUGS = new Set<string>(["", "contact", "projects", ...PAGE_SLUGS]);

export function langFromPath(pathname: string | null): Lang {
  if (pathname === "/ar" || pathname?.startsWith("/ar/")) return "ar";
  return "en";
}

export function withLang(path: string, lang: Lang): string {
  const clean = path === "/" ? "" : path;
  return lang === "ar" ? `/ar${clean}` || "/ar" : `/en${clean}` || "/en";
}

export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

export function switchLangPath(pathname: string, target: Lang): string {
  const base = stripLang(pathname).replace(/\/$/, "") || "/";
  const key = base === "/" ? "" : base.slice(1);
  if (!ROUTABLE_SLUGS.has(key) && !key.startsWith("projects/"))
    return target === "ar" ? "/ar" : "/en";
  return withLang(base, target);
}

/** Localize an internal href to the correct language prefix (/en/... or /ar/...). */
export function localizeHref(href: string, lang: Lang): string {
  if (!href.startsWith("/")) return href;
  const key = href === "/" ? "" : href.slice(1);
  if (!ROUTABLE_SLUGS.has(key)) return href;
  return withLang(href, lang);
}

export function pageHref(slug: string, lang: Lang): string {
  return localizeHref(`/${slug}`, lang);
}
