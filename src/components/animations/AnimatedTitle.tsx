"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "./motion";

const ACCENT = /(Nothing Agency|Nothing|Creators of Impact|The Anatomy of Creativity)/g;

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const word: Variants = {
  hidden: { y: "118%", skewY: 6 },
  show: { y: "0%", skewY: 0, transition: { duration: 1, ease: EASE } },
};

/**
 * Section heading. Words rise out of masks one after another when the heading
 * scrolls into view; brand words stay gold. A gold rule then draws underneath.
 */
export default function AnimatedTitle({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const words: { w: string; accent: boolean }[] = [];
  text.split(ACCENT).forEach((part) => {
    const accent = part !== "" && new RegExp(`^${ACCENT.source}$`).test(part);
    part
      .split(" ")
      .filter(Boolean)
      .forEach((w) => words.push({ w, accent }));
  });

  const content = (animated: boolean) =>
    words.map(({ w, accent }, i) => {
      const cls = accent ? "text-[var(--color-accent)]" : undefined;
      if (!animated)
        return (
          <span key={i} className={`${cls ?? ""} me-[0.25em] inline-block`}>
            {w}
          </span>
        );
      return (
        <span
          key={i}
          aria-hidden="true"
          className="me-[0.25em] inline-block overflow-hidden align-bottom pb-[0.16em]"
        >
          <motion.span variants={word} className={`inline-block ${cls ?? ""}`} style={{ transformOrigin: "0% 100%" }}>
            {w}
          </motion.span>
        </span>
      );
    });

  if (reduce) return <h2 className={className}>{content(false)}</h2>;

  return (
    <motion.div
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      <h2 className={className} aria-label={text}>
        {content(true)}
      </h2>
      <motion.div
        aria-hidden="true"
        className="mt-5 h-[2px] w-16 bg-[var(--color-accent)] origin-left rtl:origin-right"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 1, ease: EASE, delay: 0.5 } },
        }}
      />
    </motion.div>
  );
}
