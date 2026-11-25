"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import HeadlineReveal from "@/components/animations/HeadlineReveal";
import { EASE } from "@/components/animations/motion";
import FooterSection from "@/components/ui/FooterSection";
import { projectImageSize } from "@/data/projects";
import type { ContentProject } from "@/lib/content/types";
import { withLang, type Lang } from "@/lib/lang";

/**
 * One project on its own URL. Its pages stack full width and fade in as you
 * scroll. "All projects" returns to the wall (so does the browser back button).
 */
export default function ProjectDetailView({
  project,
  projects,
  d,
  contactLabel,
  lang,
}: {
  project: ContentProject;
  projects: ContentProject[];
  d: {
    shadow: string;
    back: string;
    prev: string;
    next: string;
    pages: string;
    footerShadow: string;
    categories: Record<string, string>;
  };
  contactLabel: string;
  lang: Lang;
}) {
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;
  const listHref = withLang("/projects", lang);
  const arrow = lang === "ar" ? "→" : "←";
  const arrowNext = lang === "ar" ? "←" : "→";

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <style>{CSS}</style>
      <ParallaxTopShadow>{d.shadow}</ParallaxTopShadow>

      <section className="relative w-full block pt-[var(--space-hero)] pb-[var(--space-block)] z-10">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="px-5 xl:px-2">
            <Link href={listHref} className="pd-back hover-target">
              <span aria-hidden="true">{arrow}</span> {d.back}
            </Link>
            <p className="pd-cat">{d.categories[project.category] ?? project.category}</p>
            <div className="pd-title">
              <HeadlineReveal text={project.title[lang]} />
            </div>
            <p className="pd-meta">
              <b>{String(index + 1).padStart(2, "0")}</b> / {String(projects.length).padStart(2, "0")}
              {project.images.length > 1 && (
                <>
                  <span className="pd-dot" aria-hidden="true" />
                  {project.images.length} {d.pages}
                </>
              )}
            </p>
            <motion.div
              aria-hidden="true"
              className="pd-rule"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            />
          </div>
        </div>
      </section>

      <section className="relative w-full block pb-[var(--space-section)] z-10">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="px-5 xl:px-2 pd-stack">
            {project.images.map((src, i) => {
              const { width, height } = projectImageSize(src);
              return (
                <motion.figure
                  key={src + i}
                  className="pd-fig"
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  {/* Opens the full-size page, so it can be zoomed on a phone */}
                  <a href={src} target="_blank" rel="noopener noreferrer" className="hover-target">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${project.title[lang]} ${i + 1}`}
                      width={width}
                      height={height}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </a>
                  {project.images.length > 1 && (
                    <figcaption>
                      {String(i + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                    </figcaption>
                  )}
                </motion.figure>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative w-full block pb-[var(--space-section)] z-10">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="px-5 xl:px-2 pd-nav">
            {prev ? (
              <Link href={withLang(`/projects/${prev.slug}`, lang)} className="pd-step hover-target">
                <span className="pd-step-label">
                  {arrow} {d.prev}
                </span>
                <span className="pd-step-title">{prev.title[lang]}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={withLang(`/projects/${next.slug}`, lang)} className="pd-step pd-step-end hover-target">
                <span className="pd-step-label">
                  {d.next} {arrowNext}
                </span>
                <span className="pd-step-title">{next.title[lang]}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className="px-5 xl:px-2 pd-center">
            <Link href={listHref} className="pd-all hover-target">
              {d.back}
            </Link>
          </div>
        </div>
      </section>

      <FooterSection
        shadowText={d.footerShadow}
        links={[{ label: contactLabel, href: withLang("/contact", lang) }]}
      />
    </div>
  );
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.pd-back{display:inline-flex;gap:.6rem;align-items:center;margin-bottom:2rem;padding:.55rem 1rem;border:1px solid rgba(240,179,28,.55);color:var(--color-accent) !important;font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;transition:background .3s,color .3s}
.pd-back:hover{background:var(--color-accent);color:#14171a !important}
.pd-cat{margin:0 0 .8rem;font-size:.78rem;letter-spacing:.22em;text-transform:uppercase;color:var(--color-accent)}
.pd-title h1{margin:0;color:#fff;font-weight:700;line-height:1.05;font-size:clamp(2.2rem,6vw,4.8rem);max-width:20ch}
.pd-meta{margin:1.4rem 0 0;display:flex;align-items:center;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55)}
.pd-meta b{font-size:1.3rem;color:#fff;letter-spacing:0;margin-inline-end:.4rem}
.pd-dot{display:inline-block;width:4px;height:4px;margin:0 .9rem;border-radius:50%;background:var(--color-accent)}
.pd-rule{margin-top:1.6rem;width:80px;height:2px;background:var(--color-accent);transform-origin:left}
[dir="rtl"] .pd-rule{transform-origin:right}
.pd-stack{display:flex;flex-direction:column;gap:2.5rem}
.pd-fig{margin:0}
.pd-fig img{display:block;width:100%;height:auto;background:#1b1f22;border:1px solid rgba(255,255,255,.08)}
.pd-fig figcaption{margin-top:.7rem;font-size:.72rem;letter-spacing:.2em;color:rgba(255,255,255,.45)}
.pd-nav{display:grid;grid-template-columns:1fr;gap:1.5rem;padding-top:2.5rem;border-top:1px solid rgba(255,255,255,.12)}
.pd-step{display:flex;flex-direction:column;gap:.5rem;padding:1.4rem 1.6rem;border:1px solid rgba(255,255,255,.14);color:inherit;transition:border-color .3s,background .3s}
.pd-step:hover{border-color:var(--color-accent);background:rgba(240,179,28,.05)}
.pd-step-label{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent)}
.pd-step-title{font-size:1.25rem;font-weight:700;color:#fff;line-height:1.25}
.pd-center{display:flex;justify-content:center;padding-top:2.5rem}
.pd-all{display:inline-block;padding:1rem 2.4rem;background:var(--color-accent);color:#14171a !important;font-size:.78rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;transition:background .3s}
.pd-all:hover{background:#fff}
@media (min-width:768px){
  .pd-nav{grid-template-columns:1fr 1fr}
  .pd-step-end{text-align:end}
  .pd-stack{gap:3.5rem}
}
`;
