"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import ClipImage from "@/components/animations/ClipImage";
import { EASE } from "@/components/animations/motion";
import IconBadge from "@/components/ui/IconBadge";
import type { SceneImage } from "@/data/scenes";

interface Point {
  title: string;
  text: string;
}

function Column({
  point,
  image,
  index,
  progress,
  shift,
}: {
  point: Point;
  image: SceneImage;
  index: number;
  progress: MotionValue<number>;
  shift: [number, number];
}) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], shift);
  return (
    <motion.div style={reduce ? undefined : { y }}>
      <ClipImage src={image.src} aspect={image.ratio} drift={6} delay={index * 0.12} sizes="(max-width: 768px) 100vw, 33vw" />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 + index * 0.1 }}
        className="pt-6"
      >
        <div className="mb-5 flex items-center gap-4">
          {image.icon && <IconBadge src={image.icon} size={48} />}
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-accent)]/40" />
          <span className="block text-xs uppercase tracking-[3px] text-[var(--color-accent)]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h4 className="mb-3 text-xl font-bold !text-white md:text-2xl">{point.title}</h4>
        <p className="font-light leading-relaxed">{point.text}</p>
      </motion.div>
    </motion.div>
  );
}

/**
 * About Us: three values, three columns that travel at different speeds, so
 * the row loosens and re-aligns as you scroll through it.
 */
export default function ValuesStrip({
  points,
  images,
}: {
  points: Point[];
  images: SceneImage[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shifts: [number, number][] = [
    [40, -40],
    [-20, 70],
    [60, -10],
  ];

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 md:pb-24"
    >
      {points.map((pt, i) => (
        <Column
          key={i}
          point={pt}
          image={images[i % images.length]}
          index={i}
          progress={scrollYProgress}
          shift={shifts[i % shifts.length]}
        />
      ))}
    </div>
  );
}
