"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const TILTS = [-2.6, 1.8, -1.4, 2.4, -2, 1.2, -1.8];

function DraftCard({
  src,
  index,
  total,
  progress,
}: {
  src: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each draft is crossed out as it passes the middle of the screen.
  const start = (index + 0.6) / (total + 1.4);
  const end = start + 0.9 / (total + 1.4);
  const strike = useTransform(progress, [start, end], [0, 1]);
  const dim = useTransform(progress, [start, end], [1, 0.4]);
  return (
    <motion.div
      className="dg-card"
      style={{ rotate: TILTS[index % TILTS.length], opacity: dim }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" loading="lazy" className="dg-img" />
      <motion.div
        aria-hidden="true"
        className="dg-strike"
        style={{ scaleX: strike }}
      />
    </motion.div>
  );
}

/**
 * Unseen: a long horizontal run of rejected drafts. Vertical scroll drives the
 * sideways movement, each draft gets struck out, and the one that shipped
 * arrives last, uncrossed and larger.
 */
export default function DraftsGallery({
  images,
  finalImage,
  finalLabel,
}: {
  images: string[];
  finalImage: string;
  finalLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [count, setCount] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 800);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const finalScale = useTransform(scrollYProgress, [0.72, 0.95], [0.9, 1.04]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCount(Math.min(images.length, Math.round(v * (images.length + 1.4))));
  });

  if (reduce) {
    return (
      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex gap-4 pb-4">
          {[...images, finalImage].map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" className="h-[40vh] w-auto max-w-none" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="dg-wrap" style={{ height: `${(images.length + 1) * 55 + 40}vh` }}>
      <style>{CSS}</style>
      <div className="dg-sticky">
        <div className="dg-count" dir="ltr">
          <span>{String(count).padStart(2, "0")}</span>
        </div>
        <motion.div ref={trackRef} dir="ltr" className="dg-track" style={{ x }}>
          {images.map((src, i) => (
            <DraftCard key={src} src={src} index={i} total={images.length} progress={scrollYProgress} />
          ))}
          <motion.div className="dg-card dg-final" style={{ scale: finalScale }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={finalImage} alt="" loading="lazy" className="dg-img" />
            <span className="dg-final-label">{finalLabel}</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.dg-sticky{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;overflow:hidden}
.dg-count{width:100%;max-width:1140px;margin:0 auto 2rem;padding:0 1.5rem;display:flex;justify-content:flex-end}
.dg-count span{font-size:2.25rem;font-weight:700;line-height:1;color:#fff}
.dg-track{display:flex;align-items:center;gap:2rem;padding:0 3rem 0 1.5rem}
.dg-card{position:relative;flex-shrink:0;overflow:hidden;height:46vh}
.dg-final{height:52vh}
.dg-img{display:block;height:100%;width:auto;max-width:none;object-fit:cover}
.dg-strike{position:absolute;left:-10%;top:50%;width:120%;height:3px;transform-origin:left;rotate:-18deg;background:var(--color-accent)}
.dg-final-label{position:absolute;bottom:0;left:0;padding:.5rem 1rem;font-size:.75rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;background:var(--color-accent);color:#14171a}
@media (min-width:768px){
  .dg-count{padding:0 2.5rem}
  .dg-count span{font-size:3.75rem}
  .dg-track{gap:3.5rem;padding-left:max(2.5rem,calc((100vw - 1140px)/2 + 2.5rem))}
  .dg-card{height:58vh}
  .dg-final{height:66vh}
}
`;
