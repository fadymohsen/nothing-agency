"use client";

import { motion } from "framer-motion";
import ClipImage from "@/components/animations/ClipImage";
import { EASE } from "@/components/animations/motion";
import type { SceneImage } from "@/data/scenes";

interface Point {
  title: string;
  text: string;
}

/**
 * What We Do: each service is a full-width row, alternating sides, paired with
 * a real piece of work. The rule above each row draws in as it arrives.
 */
export default function ServiceRows({
  points,
  images,
}: {
  points: Point[];
  images: SceneImage[];
}) {
  return (
    <div className="flex flex-col gap-[var(--space-section)]">
      {points.map((pt, i) => (
        <div key={i} className="relative">
          <motion.div
            aria-hidden="true"
            className="mb-10 h-px w-full origin-left bg-[var(--color-accent)]/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.2, ease: EASE }}
          />
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14">
            <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <ClipImage
                src={images[i % images.length].src}
                aspect={images[i % images.length].ratio}
                drift={6}
              />
            </div>
            <motion.div
              className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            >
              <span
                aria-hidden="true"
                className="block text-[clamp(4rem,9vw,7.5rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1px_var(--color-accent)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 mb-4 text-2xl font-bold !text-white md:text-3xl">
                {pt.title}
              </h3>
              <p className="max-w-[46ch] font-light leading-relaxed">{pt.text}</p>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}
