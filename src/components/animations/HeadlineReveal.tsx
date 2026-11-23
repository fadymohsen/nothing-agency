"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

const SWEEP =
  "linear-gradient(100deg,#fff 0%,#fff 36%,#f0b31c 50%,#fff 64%,#fff 100%)";

/**
 * Page titles. Each word rises out of its own mask, leaning in from the side,
 * then a band of gold light sweeps across it, over and over, leaving it white
 * between passes.
 * Whole words (never letters) so Arabic keeps its joined script. Waits for the
 * splash screen (if one is playing) so the entrance is actually seen.
 */
export default function HeadlineReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.splash !== "on") {
      setReady(true);
      return;
    }
    const onDone = () => setReady(true);
    window.addEventListener("splash:done", onDone, { once: true });
    return () => window.removeEventListener("splash:done", onDone);
  }, []);

  if (reduce) return <h1 className={className}>{text}</h1>;

  return (
    <h1 className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.16em] me-[0.25em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            style={{
              transformOrigin: "0% 100%",
              backgroundImage: SWEEP,
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ y: "118%", skewY: 8, backgroundPosition: "0% 0%" }}
            animate={
              ready
                ? { y: "0%", skewY: 0, backgroundPosition: "100% 0%" }
                : { y: "118%", skewY: 8, backgroundPosition: "0% 0%" }
            }
            transition={{
              y: { duration: 1.05, ease: EASE, delay: 0.1 * i },
              skewY: { duration: 1.05, ease: EASE, delay: 0.1 * i },
              // Loops for as long as the page is open: gold light sweeps the title, rests, repeats.
              backgroundPosition: {
                duration: 1.6,
                ease: "easeInOut",
                delay: 0.1 * i + 0.45,
                repeat: Infinity,
                repeatDelay: 3,
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
