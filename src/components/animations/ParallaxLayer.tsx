"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Hero backdrop that moves slower than the page and eases out as it leaves. */
export default function ParallaxLayer({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);
  const scale = useTransform(scrollY, [0, 700], [1, 1.08]);
  return (
    <motion.div
      className="absolute inset-0"
      style={reduce ? undefined : { y, scale }}
    >
      {children}
    </motion.div>
  );
}
