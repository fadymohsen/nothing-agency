"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/animations/motion";

const pad = (n: number) => String(n).padStart(2, "0");

/** Slide counter with a rolling digit. */
export default function SliderHud({
  index,
  total,
  dir,
}: {
  index: number;
  total: number;
  dir: number;
}) {
  return (
    <>
      <div className="pss-counter" dir="ltr" aria-hidden="true">
        <span className="pss-roll">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.b
              key={index}
              custom={dir}
              initial={{ y: `${dir * 100}%`, opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: `${-dir * 100}%`, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {pad(index + 1)}
            </motion.b>
          </AnimatePresence>
        </span>
        <span className="pss-of">/ {pad(total)}</span>
      </div>

    </>
  );
}
