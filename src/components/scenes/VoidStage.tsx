"use client";

import { useRef } from "react";
import Image from "next/image";
import IconBadge from "@/components/ui/IconBadge";
import type { SceneImage } from "@/data/scenes";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/** Where each photo opens, as a share of the scroll through the stage. */
const OPEN: [number, number][] = [
  [0.12, 0.3],
  [0.4, 0.6],
  [0.68, 0.88],
];
const READ_FROM = 0.16;
const READ_TO = 0.92;

function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const brand = /^["'(]*Nothing/.test(word);
  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity }}
      className={brand ? "vs-word vs-brand" : "vs-word"}
    >
      {word}
    </motion.span>
  );
}

/** The badge for each photo fades in as that photo opens and out as the next one arrives. */
function StageBadge({
  src,
  index,
  progress,
  total,
}: {
  src: string;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const from = OPEN[index][0];
  const to = OPEN[index][1];
  const isLast = index >= total - 1;
  const nextFrom = isLast ? to : OPEN[index + 1][0];
  const opacity = useTransform(
    progress,
    isLast ? [from, to] : [from, to, nextFrom, nextFrom + 0.06],
    isLast ? [0, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(progress, [from, to], [14, 0]);
  return (
    <motion.div className="vs-badge" style={{ opacity, y }}>
      <IconBadge src={src} size={72} shape="diamond" />
    </motion.div>
  );
}

function Layer({
  src,
  index,
  progress,
  position,
}: {
  src: string;
  index: number;
  progress: MotionValue<number>;
  position: string;
}) {
  const [from, to] = OPEN[index];
  // The first photo fades up inside the ring; the others open as an expanding circle.
  const clip = useTransform(
    progress,
    [from, to],
    ["circle(0% at 50% 56%)", "circle(78% at 50% 56%)"]
  );
  const fade = useTransform(progress, [from, to], [0, 1]);
  const scale = useTransform(progress, [from, to + 0.2], [1.28, 1]);
  return (
    <motion.div
      className="vs-layer"
      style={index === 0 ? { opacity: fade, scale } : { clipPath: clip, scale }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 80vw, 44vw"
        className="vs-img"
        style={{ objectPosition: position }}
      />
    </motion.div>
  );
}

/**
 * From Nothing: the brand symbol assembles as you read. A ring and its
 * diagonal draw themselves in the void, then three photographs open inside the
 * circle one after another while the story brightens word by word.
 */
export default function VoidStage({
  paragraphs,
  images,
}: {
  paragraphs: string[];
  images: SceneImage[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const ring = useTransform(p, [0, 0.14], [0, 1]);
  const diagonal = useTransform(p, [0.04, 0.2], [0, 1]);
  const glow = useTransform(p, [0.7, 1], [0, 1]);

  const flat = paragraphs.flatMap((para, pi) =>
    para.split(" ").map((w) => ({ w, pi }))
  );

  if (reduce) {
    return (
      <div className="vs-static">
        <style>{CSS}</style>
        <div className="vs-circle vs-circle-static">
          <Image src={images[images.length - 1].src} alt="" fill sizes="80vw" className="vs-img" />
        </div>
        <div className="vs-copy">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    );
  }

  let idx = -1;
  return (
    <div ref={ref} className="vs-wrap">
      <style>{CSS}</style>
      <div className="vs-sticky">
        <div className="vs-grid">
          {/* The symbol */}
          <div className="vs-stage">
            <motion.div className="vs-halo" aria-hidden="true" style={{ opacity: glow }} />
            <div className="vs-circle">
              {images.map((im, i) => (
                <Layer key={im.src} src={im.src} index={i} progress={p} position="50% 50%" />
              ))}
            </div>
            <div className="vs-badges" aria-hidden="true">
              {images.map((im, i) =>
                im.icon ? <StageBadge key={im.icon} src={im.icon} index={i} progress={p} total={images.length} /> : null
              )}
            </div>
            <svg className="vs-mark" viewBox="0 0 100 100" aria-hidden="true">
              <motion.circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="0.7"
                strokeLinecap="round"
                style={{ pathLength: ring, rotate: -90, transformOrigin: "50% 50%" }}
              />
              <motion.line
                x1="14"
                y1="86"
                x2="86"
                y2="14"
                stroke="var(--color-accent)"
                strokeWidth="0.9"
                strokeLinecap="round"
                style={{ pathLength: diagonal }}
              />
            </svg>
          </div>

          {/* The story, read in by scroll */}
          <div className="vs-copy" aria-label={paragraphs.join(" ")}>
            {paragraphs.map((para, pi) => (
              <p key={pi}>
                {flat
                  .filter((x) => x.pi === pi)
                  .map((x) => {
                    idx += 1;
                    const s = READ_FROM + (idx / flat.length) * (READ_TO - READ_FROM);
                    const e = READ_FROM + ((idx + 1) / flat.length) * (READ_TO - READ_FROM);
                    return <Word key={idx} word={x.w} progress={p} start={s} end={e} />;
                  })}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.vs-wrap{position:relative;height:440vh}
.vs-sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;padding:5.5rem 0 2rem}
.vs-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:1.75rem;width:100%;align-items:center;justify-items:center}
.vs-stage{position:relative;width:min(44vh,74vw);aspect-ratio:1}
.vs-halo{position:absolute;inset:-14%;border-radius:50%;background:radial-gradient(circle,rgba(240,179,28,.22) 0%,rgba(240,179,28,0) 62%);pointer-events:none}
.vs-circle{position:absolute;inset:2%;border-radius:50%;overflow:hidden;background:rgba(255,255,255,.03)}
.vs-layer{position:absolute;inset:0}
.vs-img{object-fit:cover}
.vs-badges{position:absolute;right:2%;bottom:2%;width:110px;height:110px;z-index:3;pointer-events:none}
.vs-badge{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.vs-mark{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.vs-copy{width:100%;max-width:34rem}
.vs-copy p{margin:0 0 1rem;font-size:.98rem;font-weight:300;line-height:1.65}
.vs-word{display:inline-block;margin-inline-end:.26em}
.vs-brand{color:var(--color-accent)}
.vs-static{display:grid;gap:2rem;justify-items:center;padding:2rem 0}
.vs-circle-static{position:relative;inset:auto;width:min(60vw,360px);aspect-ratio:1}
@media (min-width:768px){
  .vs-sticky{padding:6rem 0 2rem}
  .vs-grid{grid-template-columns:repeat(12,minmax(0,1fr));gap:3rem;justify-items:stretch}
  .vs-stage{grid-column:span 6;width:min(62vh,100%);justify-self:center}
  .vs-copy{grid-column:span 6;max-width:none;justify-self:stretch}
  .vs-copy p{font-size:1.28rem;line-height:1.6;margin-bottom:1.5rem}
  .vs-static{grid-template-columns:1fr 1fr;align-items:center}
}
@media (min-width:1024px){ .vs-grid{gap:5rem} }
`;
