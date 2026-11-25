"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SectionIntro from "@/components/ui/SectionIntro";
import FooterSection from "@/components/ui/FooterSection";
import { EASE } from "@/components/animations/motion";
import { projectImage, projectSize, projects, type ProjectCategory } from "@/data/projects";
import { t } from "@/data/dictionary";
import { pageHref, withLang, type Lang } from "@/lib/lang";

type Filter = "all" | ProjectCategory;

/**
 * Projects: a wall of work shown at its natural proportions (nothing cropped).
 * The chosen filter lives in the URL hash, so coming back from a project with
 * the browser's back button lands on the same filtered wall.
 */
export default function ProjectsView({ lang }: { lang: Lang }) {
  const d = t(lang).projects;
  const [filter, setFilter] = useState<Filter>("all");

  const filters = useMemo(
    () => ["all", ...(Object.keys(d.categories) as ProjectCategory[])] as Filter[],
    [d.categories]
  );

  useEffect(() => {
    const read = () => {
      const h = window.location.hash.slice(1) as Filter;
      setFilter(filters.includes(h) ? h : "all");
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [filters]);

  const choose = (f: Filter) => {
    setFilter(f);
    window.history.replaceState(null, "", f === "all" ? window.location.pathname : `#${f}`);
  };

  const shown = projects
    .map((p, index) => ({ p, index }))
    .filter(({ p }) => filter === "all" || p.category === filter);

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <style>{CSS}</style>
      <ParallaxTopShadow>{d.shadow}</ParallaxTopShadow>

      <section className="relative w-full block pt-[var(--space-hero)] pb-[var(--space-block)] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <SectionIntro title={d.title} subtitle={d.subtitle} />
        </div>
      </section>

      <section className="relative w-full block pb-[var(--space-section-lg)] z-10">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="px-5 xl:px-2">
            <div className="pj-top">
              <div className="pj-tabs" role="tablist">
                {filters.map((f) => (
                  <button
                    key={f}
                    type="button"
                    role="tab"
                    aria-selected={filter === f}
                    className={`pj-tab hover-target ${filter === f ? "on" : ""}`}
                    onClick={() => choose(f)}
                  >
                    {f === "all" ? d.all : d.categories[f]}
                  </button>
                ))}
              </div>
              <p className="pj-count">
                <b>{String(shown.length).padStart(2, "0")}</b> {d.projectsCount}
              </p>
            </div>

            <div className="pj-wall" key={filter}>
              {shown.map(({ p, index }, i) => {
                const cover = p.pages[0];
                const { width, height } = projectSize(cover);
                return (
                  <motion.div
                    key={p.slug}
                    className="pj-item"
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: Math.min(i, 9) * 0.05 }}
                  >
                    <Link href={withLang(`/projects/${p.slug}`, lang)} className="pj-card hover-target">
                      <span className="pj-frame">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={projectImage(cover)}
                          alt={p.title[lang]}
                          width={width}
                          height={height}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="pj-index">{String(index + 1).padStart(2, "0")}</span>
                        {p.pages.length > 1 && (
                          <span className="pj-pages">
                            {p.pages.length} {d.pages}
                          </span>
                        )}
                      </span>
                      <span className="pj-meta">
                        <span className="pj-cat">{d.categories[p.category]}</span>
                        <span className="pj-title">{p.title[lang]}</span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <FooterSection
        shadowText={d.footerShadow}
        links={[{ label: t(lang).nav[t(lang).nav.length - 1].label, href: pageHref("contact", lang) }]}
      />
    </div>
  );
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.pj-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem 2rem;margin-bottom:2.5rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,.12)}
.pj-tabs{display:flex;flex-wrap:wrap;gap:.25rem 1.6rem}
.pj-tab{position:relative;padding:.5rem 0;background:none;border:0;font:inherit;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.5);transition:color .3s}
.pj-tab::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--color-accent);transform:scaleX(0);transition:transform .4s cubic-bezier(.16,1,.3,1)}
.pj-tab:hover{color:#fff}
.pj-tab.on{color:var(--color-accent)}
.pj-tab.on::after{transform:scaleX(1)}
.pj-count{margin:0;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.5)}
.pj-count b{font-size:1.4rem;color:#fff;margin-inline-end:.35rem;letter-spacing:0}
.pj-wall{column-count:1;column-gap:1.75rem}
.pj-item{break-inside:avoid;margin-bottom:2.25rem}
.pj-card{display:block;color:inherit}
.pj-frame{display:block;position:relative;overflow:hidden;background:#1b1f22;border:1px solid rgba(255,255,255,.08);transition:border-color .4s}
.pj-frame img{display:block;width:100%;height:auto;transition:transform 1s cubic-bezier(.16,1,.3,1)}
.pj-card:hover .pj-frame{border-color:var(--color-accent)}
.pj-card:hover .pj-frame img{transform:scale(1.045)}
.pj-index{position:absolute;top:0;inset-inline-start:0;padding:.35rem .7rem;background:rgba(20,23,26,.88);color:var(--color-accent);font-size:.72rem;letter-spacing:.18em}
.pj-pages{position:absolute;bottom:0;inset-inline-end:0;padding:.35rem .7rem;background:var(--color-accent);color:#14171a;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.pj-meta{display:flex;flex-direction:column;gap:.3rem;padding-top:.9rem}
.pj-cat{font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent)}
.pj-title{font-size:1.15rem;font-weight:700;line-height:1.25;color:#fff;transition:color .3s}
.pj-card:hover .pj-title{color:var(--color-accent)}
@media (min-width:640px){.pj-wall{column-count:2}}
@media (min-width:1024px){.pj-wall{column-count:3}}
`;
