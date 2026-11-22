"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { EASE } from "@/components/animations/motion";

interface Step {
  title?: string;
  text: string;
}

/**
 * Scroll-driven story: a tall section whose photo stays pinned while the
 * steps beside it advance. The photo changes with progress; a gold line
 * fills to show how far through the sequence you are.
 */
export default function StickySteps({
  steps,
  images,
  numbered = true,
}: {
  steps: Step[];
  images: string[];
  numbered?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stepIdx, setStepIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStepIdx(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
    setImgIdx(Math.min(images.length - 1, Math.max(0, Math.floor(v * images.length))));
  });

  if (reduce) {
    return (
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={images[0]} alt="" fill sizes="50vw" className="object-cover" />
        </div>
        <ol className="flex flex-col gap-8">
          {steps.map((s, i) => (
            <li key={i}>
              {s.title && <h4 className="mb-2 text-xl font-bold !text-white">{s.title}</h4>}
              <p className="font-light leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div ref={ref} className="ss-wrap" style={{ height: `${Math.max(steps.length, images.length) * 80 + 40}vh` }}>
      <style>{CSS}</style>
      <div className="ss-sticky">
        <div className="ss-grid">
          {/* Pinned photo stack */}
          <div className="ss-photo">
            {images.map((src, i) => (
              <motion.div
                key={src}
                style={{ position: "absolute", inset: 0 }}
                initial={false}
                animate={{ opacity: imgIdx === i ? 1 : 0, scale: imgIdx === i ? 1 : 1.12 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
              </motion.div>
            ))}
          </div>

          {/* Progress line + steps */}
          <div className="ss-steps">
            <div aria-hidden="true" className="ss-track">
              <motion.div
                className="ss-fill"
                style={{ scaleY: scrollYProgress }}
              />
            </div>
            <ol className="ss-list">
              {steps.map((s, i) => {
                const active = stepIdx === i;
                return (
                  <motion.li
                    key={i}
                    animate={{ opacity: active ? 1 : 0.32 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {numbered && <span className="ss-num">{String(i + 1).padStart(2, "0")}</span>}
                    {s.title && <h4 className="ss-title">{s.title}</h4>}
                    {/* Only the current step opens its text, so the list always fits the screen */}
                    <div className={`ss-collapse ${active || !s.title ? "open" : ""}`}>
                      <div>
                        <p className={`ss-text ${s.title ? "has-title" : ""}`}>{s.text}</p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.ss-sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;padding:6rem 0}
.ss-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:2rem;width:100%;align-items:center}
.ss-photo{position:relative;height:32vh;overflow:hidden;background:rgba(255,255,255,.03)}
.ss-steps{display:flex;gap:1.5rem;position:relative;min-width:0}
.ss-track{position:relative;width:1px;flex-shrink:0;align-self:stretch;background:rgba(255,255,255,.1)}
.ss-fill{position:absolute;left:0;right:0;top:0;height:100%;transform-origin:top;background:var(--color-accent)}
.ss-list{display:flex;flex-direction:column;gap:1rem;margin:0;padding:0;list-style:none;min-width:0}
.ss-num{display:block;margin-bottom:.25rem;font-size:.75rem;letter-spacing:3px;text-transform:uppercase;color:var(--color-accent)}
.ss-title{font-size:1.125rem;font-weight:700;line-height:1.35;color:#fff}
.ss-collapse{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s cubic-bezier(.22,1,.36,1)}
.ss-collapse.open{grid-template-rows:1fr}
.ss-collapse>div{overflow:hidden}
.ss-text{max-width:48ch;font-weight:300;line-height:1.7}
.ss-text.has-title{padding-top:.5rem}
@media (min-width:768px){
  .ss-sticky{padding:7rem 0}
  .ss-grid{grid-template-columns:repeat(12,minmax(0,1fr));gap:4rem}
  .ss-photo{grid-column:span 6;height:min(62vh,540px)}
  .ss-steps{grid-column:span 6;gap:2rem}
  .ss-list{gap:1.5rem}
  .ss-title{font-size:1.4rem}
}
@media (min-width:1024px){ .ss-grid{gap:6rem} }
`;
