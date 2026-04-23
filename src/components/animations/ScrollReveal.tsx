"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "bottom" | "top" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "bottom",
  distance = 30,
  duration = 0.5,
  delay = 0.1,
  className = "",
}: ScrollRevealProps) {
  const directionMap = {
    bottom: { y: distance, x: 0 },
    top: { y: -distance, x: 0 },
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
