"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SectionIntro from "@/components/ui/SectionIntro";
import FooterSection from "@/components/ui/FooterSection";
import { EASE } from "@/components/animations/motion";
import { projectImage, projects, type Project, type ProjectCategory } from "@/data/projects";
import { t } from "@/data/dictionary";
import { pageHref, type Lang } from "@/lib/lang";

type Filter = "all" | ProjectCategory;

export default function ProjectsView({ lang }: { lang: Lang }) {
  const d = t(lang).projects;
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Project | null>(null);

  const filters = useMemo(
    () => ["all", ...(Object.keys(d.categories) as ProjectCategory[])] as Filter[],
    [d.categories]
  );
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  // Lock page scroll and listen for Esc while a project is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="px-5 xl:px-2">
            <div className="pj-filters" role="tablist">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === f}
                  className={`pj-chip hover-target ${filter === f ? "on" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? d.all : d.categories[f]}
                </button>
              ))}
            </div>

            <motion.div layout className="pj-grid">
              <AnimatePresence mode="popLayout">
                {shown.map((p, i) => (
                  <motion.button
                    layout
                    key={p.slug}
                    type="button"
                    className="pj-card hover-target"
                    onClick={() => setOpen(p)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 8) * 0.04 }}
                  >
                    <span className="pj-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={projectImage(p.pages[0])} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="pj-meta">
                      <span className="pj-cat">{d.categories[p.category]}</span>
                      <span className="pj-title">{p.title[lang]}</span>
                      {p.pages.length > 1 && (
                        <span className="pj-count">
                          {p.pages.length} {d.pages}
                        </span>
                      )}
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection
        shadowText={d.footerShadow}
        links={[{ label: t(lang).nav[t(lang).nav.length - 1].label, href: pageHref("contact", lang) }]}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            className="pj-modal"
            role="dialog"
            aria-modal="true"
            aria-label={open.title[lang]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(null)}
          >
            <div className="pj-bar" onClick={(e) => e.stopPropagation()}>
              <div>
                <span className="pj-cat">{d.categories[open.category]}</span>
                <h2 className="pj-modal-title">{open.title[lang]}</h2>
              </div>
              <button type="button" className="pj-close hover-target" onClick={() => setOpen(null)}>
                {d.close} <span aria-hidden="true">✕</span>
              </button>
            </div>
            <div className="pj-scroll" onClick={(e) => e.stopPropagation()}>
              {open.pages.map((n) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={n} src={projectImage(n)} alt={open.title[lang]} loading="lazy" decoding="async" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.pj-filters{display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:2.5rem}
.pj-chip{padding:.6rem 1.1rem;background:none;border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.7);font:inherit;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;transition:all .3s}
.pj-chip:hover{color:#fff;border-color:rgba(255,255,255,.5)}
.pj-chip.on{background:var(--color-accent);border-color:var(--color-accent);color:#14171a;font-weight:700}
.pj-grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
.pj-card{display:block;padding:0;background:none;border:0;text-align:start;color:inherit;font:inherit}
.pj-thumb{display:block;position:relative;aspect-ratio:4/3;overflow:hidden;background:#1b1f22}
.pj-thumb img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center;transition:transform .9s cubic-bezier(.16,1,.3,1)}
.pj-card:hover .pj-thumb img{transform:scale(1.07)}
.pj-thumb::after{content:"";position:absolute;inset:0;border:1px solid rgba(240,179,28,0);transition:border-color .4s}
.pj-card:hover .pj-thumb::after{border-color:rgba(240,179,28,.8)}
.pj-meta{display:flex;flex-direction:column;gap:.3rem;padding:1rem 0 0}
.pj-cat{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent)}
.pj-title{font-size:1.15rem;font-weight:700;line-height:1.25;color:#fff}
.pj-count{font-size:.8rem;color:rgba(255,255,255,.5)}
.pj-modal{position:fixed;inset:0;z-index:99990;background:rgba(20,23,26,.97);display:flex;flex-direction:column}
.pj-bar{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;padding:5rem 1.5rem 1rem;max-width:1200px;width:100%;margin:0 auto}
.pj-modal-title{margin:.3rem 0 0;font-size:clamp(1.4rem,3.4vw,2.4rem);font-weight:700;color:#fff}
.pj-close{flex-shrink:0;padding:.7rem 1.2rem;background:none;border:1px solid var(--color-accent);color:var(--color-accent);font:inherit;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;transition:all .3s}
.pj-close:hover{background:var(--color-accent);color:#14171a}
.pj-scroll{flex:1;overflow-y:auto;padding:0 1.5rem 3rem;max-width:1200px;width:100%;margin:0 auto;display:flex;flex-direction:column;gap:1.25rem}
.pj-scroll img{display:block;width:100%;height:auto;background:#1b1f22}
@media (min-width:640px){.pj-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:2rem 1.75rem}}
@media (min-width:1024px){.pj-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
`;
