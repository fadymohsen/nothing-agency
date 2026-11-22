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
      className="relative h-[46vh] shrink-0 overflow-hidden md:h-[58vh]"
      style={{ rotate: TILTS[index % TILTS.length], opacity: dim }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" loading="lazy" className="h-full w-auto max-w-none object-cover" />
      <motion.div
        aria-hidden="true"
        className="absolute left-[-10%] top-1/2 h-[3px] w-[120%] origin-left -rotate-[18deg] bg-[var(--color-accent)]"
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
  label,
  finalLabel,
}: {
  images: string[];
  finalImage: string;
  label: string;
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
    <div ref={ref} className="relative" style={{ height: `${(images.length + 1) * 55 + 40}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-8 flex w-full max-w-[1140px] items-baseline justify-between px-6 md:px-10" dir="ltr">
          <span className="text-xs uppercase tracking-[3px] text-[var(--color-accent)]">{label}</span>
          <span className="text-4xl font-bold leading-none text-white md:text-6xl">
            {String(count).padStart(2, "0")}
          </span>
        </div>
        <motion.div
          ref={trackRef}
          dir="ltr"
          className="flex items-center gap-8 pl-6 pr-12 md:gap-14 md:pl-[max(2.5rem,calc((100vw-1140px)/2+2.5rem))]"
          style={{ x }}
        >
          {images.map((src, i) => (
            <DraftCard key={src} src={src} index={i} total={images.length} progress={scrollYProgress} />
          ))}
          <motion.div
            className="relative h-[52vh] shrink-0 overflow-hidden md:h-[66vh]"
            style={{ scale: finalScale }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={finalImage} alt="" loading="lazy" className="h-full w-auto max-w-none object-cover" />
            <span className="absolute bottom-0 left-0 bg-[var(--color-accent)] px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#14171a]">
              {finalLabel}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
