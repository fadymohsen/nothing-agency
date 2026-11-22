"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

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
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const brand = /^["'(]*Nothing/.test(word);
  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity }}
      className={`inline-block me-[0.28em] ${brand ? "text-[var(--color-accent)]" : ""}`}
    >
      {word}
    </motion.span>
  );
}

/**
 * Paragraph that "reads in" as it crosses the viewport: each word brightens
 * in order, so the scroll position is the reading position.
 */
export default function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.55"],
  });

  if (reduce) return <p className={className}>{text}</p>;

  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Word
          key={i}
          word={w}
          progress={scrollYProgress}
          start={i / words.length}
          end={(i + 1) / words.length}
        />
      ))}
    </p>
  );
}
