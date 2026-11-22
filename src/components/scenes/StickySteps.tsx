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
    <div ref={ref} style={{ height: `${Math.max(steps.length, images.length) * 85 + 30}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-16">
          {/* Pinned photo stack */}
          <div className="relative h-[34vh] overflow-hidden bg-white/[0.03] md:h-[68vh]">
            {images.map((src, i) => (
              <motion.div
                key={src}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: imgIdx === i ? 1 : 0, scale: imgIdx === i ? 1 : 1.12 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </motion.div>
            ))}
          </div>

          {/* Progress line + steps */}
          <div className="relative flex gap-6 md:gap-8">
            <div aria-hidden="true" className="relative w-px shrink-0 self-stretch bg-white/10">
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top bg-[var(--color-accent)]"
                style={{ scaleY: scrollYProgress }}
              />
            </div>
            <ol className="flex flex-col gap-5 md:gap-9">
              {steps.map((s, i) => {
                const active = stepIdx === i;
                return (
                  <motion.li
                    key={i}
                    animate={{ opacity: active ? 1 : 0.28, x: active ? 0 : 10 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {numbered && (
                      <span className="mb-1 block text-xs uppercase tracking-[3px] text-[var(--color-accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                    {s.title && (
                      <h4 className="mb-2 text-lg font-bold !text-white md:text-2xl">{s.title}</h4>
                    )}
                    <p
                      className={`max-w-[50ch] font-light leading-relaxed ${
                        active ? "" : "max-md:hidden"
                      }`}
                    >
                      {s.text}
                    </p>
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
