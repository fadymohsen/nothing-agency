"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { EASE } from "@/components/animations/motion";
import IconBadge from "@/components/ui/IconBadge";
import type { SceneImage } from "@/data/scenes";

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
  images: SceneImage[];
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

  // Ambient light: a gold shaft slides across the wall as the phases advance.
  const beamX = useTransform(scrollYProgress, [0, 1], ["-18vw", "18vw"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["20%", "80%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStepIdx(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
    setImgIdx(Math.min(images.length - 1, Math.max(0, Math.floor(v * images.length))));
  });

  if (reduce) {
    return (
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={images[0].src} alt="" fill sizes="50vw" className="object-cover" style={{ objectPosition: images[0].focus }} />
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
      <div className="ss-ambient" aria-hidden="true">
        <div className="ss-ambient-pin">
          <motion.div className="ss-beam" style={{ x: beamX }} />
          <motion.div className="ss-glow" style={{ top: glowY }} />
          <span className="ss-dust ss-dust-a" />
          <span className="ss-dust ss-dust-b" />
          <span className="ss-grain" />
        </div>
      </div>
      <div className="ss-sticky">
        <div className="ss-grid">
          {/* Pinned photo stack */}
          <div className="ss-photo">
            {images.map(({ src, focus }, i) => (
              <motion.div
                key={src}
                style={{ position: "absolute", inset: 0 }}
                initial={false}
                animate={{ opacity: imgIdx === i ? 1 : 0, scale: imgIdx === i ? 1 : 1.12 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" style={{ objectPosition: focus }} />
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
                    {numbered && (
                      <div className="ss-badge">
                        {images[i]?.icon && <IconBadge src={images[i].icon!} size={46} shape="ring" />}
                        <span className="ss-num">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                    )}
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
.ss-wrap{position:relative}
.ss-ambient{position:absolute;top:0;bottom:0;left:50%;width:100vw;margin-left:-50vw;pointer-events:none;overflow:clip;-webkit-mask-image:linear-gradient(to bottom,transparent,#000 14%,#000 86%,transparent);mask-image:linear-gradient(to bottom,transparent,#000 14%,#000 86%,transparent)}
.ss-ambient-pin{position:sticky;top:0;height:100vh;overflow:hidden}
.ss-beam{position:absolute;top:-20%;left:20%;width:46%;height:140%;background:linear-gradient(105deg,transparent 22%,rgba(240,179,28,.09) 44%,rgba(240,179,28,.03) 60%,transparent 78%);transform:rotate(8deg);filter:blur(6px)}
.ss-glow{position:absolute;left:12%;width:44vw;height:44vw;margin-top:-22vw;border-radius:50%;background:radial-gradient(circle,rgba(240,179,28,.10),transparent 68%)}
.ss-dust{position:absolute;width:3px;height:3px;border-radius:50%;background:rgba(255,236,170,.55);box-shadow:12vw 8vh 0 rgba(255,236,170,.4),26vw 30vh 0 rgba(255,236,170,.35),38vw 14vh 0 rgba(255,236,170,.5),52vw 42vh 0 rgba(255,236,170,.3),64vw 22vh 0 rgba(255,236,170,.45),78vw 55vh 0 rgba(255,236,170,.35),9vw 62vh 0 rgba(255,236,170,.4),44vw 70vh 0 rgba(255,236,170,.3),86vw 12vh 0 rgba(255,236,170,.4);animation:ss-drift 26s ease-in-out infinite alternate}
.ss-dust-a{top:10vh;left:4vw}
.ss-dust-b{top:30vh;left:30vw;animation-duration:34s;animation-direction:alternate-reverse;opacity:.7}
@keyframes ss-drift{from{transform:translate3d(0,0,0)}to{transform:translate3d(3vw,-6vh,0)}}
.ss-grain{position:absolute;inset:0;opacity:.07;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
@media (prefers-reduced-motion:reduce){.ss-dust{animation:none}}
.ss-sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;padding:6rem 0}
.ss-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:2rem;width:100%;align-items:center}
.ss-photo{position:relative;height:32vh;overflow:hidden;background:rgba(255,255,255,.03)}
.ss-steps{display:flex;gap:1.5rem;position:relative;min-width:0}
.ss-track{position:relative;width:1px;flex-shrink:0;align-self:stretch;background:rgba(255,255,255,.1)}
.ss-fill{position:absolute;left:0;right:0;top:0;height:100%;transform-origin:top;background:var(--color-accent)}
.ss-list{display:flex;flex-direction:column;gap:1rem;margin:0;padding:0;list-style:none;min-width:0}
.ss-badge{display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem}
.ss-num{display:block;font-size:.75rem;letter-spacing:3px;text-transform:uppercase;color:var(--color-accent)}
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
