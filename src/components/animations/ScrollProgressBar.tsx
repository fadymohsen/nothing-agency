"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin gold bar that fills as the reader moves down a long page. */
export default function ScrollProgressBar() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.3 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[2100] h-[2px] origin-left bg-[var(--color-accent)]"
      style={{ scaleX }}
    />
  );
}
