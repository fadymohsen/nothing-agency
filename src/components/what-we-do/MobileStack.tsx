"use client";

import Link from "next/link";
import IconBadge from "@/components/ui/IconBadge";
import { localizeHref, type Lang } from "@/lib/lang";
import type { SlideCta, SlideData } from "./SlideLayer";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Phone version of What We Do: a stack of full-screen cards. Each card pins to
 * the top and the next one slides up over it, using only CSS (position: sticky)
 * and native scrolling. No scroll listeners, no timers, no transforms driven
 * from JavaScript, and svh units so the browser's collapsing address bar can
 * never move anything. Smooth because the browser does all of it.
 */
export default function MobileStack({
  slides,
  eyebrow,
  cta,
  lang,
}: {
  slides: SlideData[];
  eyebrow: string;
  cta?: SlideCta;
  lang: Lang;
}) {
  const total = slides.length;
  return (
    <div className="ms-stack" dir={lang === "ar" ? "rtl" : "ltr"} aria-label={eyebrow}>
      <style>{CSS}</style>
      {slides.map((s, i) => {
        const last = i === total - 1;
        return (
          <article key={s.index} className="ms-card" style={{ zIndex: i + 1 }}>
            <span className="ms-num" aria-hidden="true">
              {pad(i + 1)}
            </span>

            <div className="ms-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.title}
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                style={{ objectPosition: s.focus }}
              />
              {s.icon && (
                <div className="ms-badge">
                  <IconBadge src={s.icon} size={56} shape="square" />
                </div>
              )}
            </div>

            <div className="ms-body">
              <p className="ms-eyebrow">
                {pad(i + 1)} / {pad(total)} · {eyebrow}
              </p>
              <h2 className="ms-title">{s.title}</h2>
              <p className="ms-text">{s.text}</p>
              <div className="ms-rule" aria-hidden="true">
                <i style={{ width: `${((i + 1) / total) * 100}%` }} />
              </div>
              {last && cta ? (
                <Link href={localizeHref(cta.href, lang)} className="ms-cta hover-target">
                  {cta.label}
                </Link>
              ) : (
                <span className="ms-hint" aria-hidden="true">
                  ↓
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.ms-stack{position:relative;background:#252A2E}
.ms-card{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;display:flex;flex-direction:column;gap:1.1rem;padding:5.2rem 2.9rem 1.6rem;background:radial-gradient(ellipse 90% 45% at 75% 12%,rgba(240,179,28,.16),transparent 70%),#252A2E;border-top:1px solid rgba(240,179,28,.28);box-shadow:0 -18px 40px rgba(0,0,0,.35)}
.ms-num{position:absolute;inset-inline-end:2.9rem;bottom:-1.6rem;font-size:clamp(7rem,38vw,11rem);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(240,179,28,.16);pointer-events:none}
.ms-frame{position:relative;flex:0 0 auto;height:30vh;height:30svh;overflow:hidden;background:#14171a;outline:1px solid rgba(240,179,28,.5);outline-offset:8px}
.ms-frame img{display:block;width:100%;height:100%;object-fit:cover}
.ms-badge{position:absolute;top:0;inset-inline-start:0}
.ms-body{position:relative;flex:1 1 auto;min-height:0;display:flex;flex-direction:column;padding-top:.9rem}
.ms-eyebrow{margin:0 0 .55rem;font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--color-accent)}
.ms-title{margin:0;font-size:clamp(1.85rem,8.6vw,2.6rem);font-weight:700;line-height:1;letter-spacing:-.01em;color:#fff !important}
.ms-text{margin:.9rem 0 0;font-size:.92rem;font-weight:300;line-height:1.55;color:#b4b4b4}
.ms-rule{height:1px;background:rgba(255,255,255,.18);margin:1rem 0}
.ms-rule i{display:block;height:100%;background:var(--color-accent)}
.ms-hint{align-self:flex-start;font-size:1.3rem;color:var(--color-accent);animation:ms-bob 1.8s ease-in-out infinite}
.ms-cta{align-self:flex-start;display:inline-block;padding:.85rem 1.6rem;background:var(--color-accent);color:#14171a !important;text-transform:uppercase;letter-spacing:.14em;font-size:.72rem;font-weight:700}
@keyframes ms-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@media (min-height:800px){
  .ms-frame{height:38svh}
  .ms-text{font-size:.98rem}
}
@media (max-height:700px){
  .ms-card{padding-top:4.6rem;gap:.8rem}
  .ms-frame{height:26vh;height:26svh}
  .ms-title{font-size:clamp(1.65rem,7.8vw,2.1rem)}
  .ms-text{font-size:.84rem;line-height:1.45;margin-top:.6rem}
  .ms-rule{margin:.7rem 0}
}
@supports (animation-timeline: view()){
  .ms-frame img{animation:ms-par linear both;animation-timeline:view();animation-range:entry 0% exit 100%}
  @keyframes ms-par{from{transform:translateY(-7%) scale(1.14)}to{transform:translateY(7%) scale(1.14)}}
}
@media (prefers-reduced-motion:reduce){.ms-hint{animation:none}.ms-frame img{animation:none}}
`;
