"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE } from "./motion";

/**
 * Photo that wipes open on entry, then drifts slightly against the scroll
 * (parallax) so it feels set back from the text beside it.
 */
export default function ClipImage({
  src,
  aspect = "4 / 3",
  drift = 8,
  sizes = "(max-width: 768px) 100vw, 55vw",
  className = "",
  delay = 0,
}: {
  src: string;
  aspect?: string;
  drift?: number;
  sizes?: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      className={`relative overflow-hidden bg-white/[0.03] ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-[10%]"
        style={reduce ? undefined : { y }}
      >
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
