"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

/**
 * Page titles. Each word rises out of its own mask, leaning in from the side,
 * then each word flashes gold in turn, over and over, resting white between
 * passes. Plain colour (no clipped gradient text) so it renders in every browser.
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
    // Never leave the title hidden if the splash signal is missed.
    const fallback = window.setTimeout(onDone, 5500);
    return () => {
      window.removeEventListener("splash:done", onDone);
      window.clearTimeout(fallback);
    };
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
            style={{ transformOrigin: "0% 100%", color: "#fff" }}
            initial={{ y: "118%", skewY: 8, color: "#ffffff" }}
            animate={
              ready
                ? { y: "0%", skewY: 0, color: ["#ffffff", "#f0b31c", "#ffffff"] }
                : { y: "118%", skewY: 8, color: "#ffffff" }
            }
            transition={{
              y: { duration: 1.05, ease: EASE, delay: 0.1 * i },
              skewY: { duration: 1.05, ease: EASE, delay: 0.1 * i },
              // Loops for as long as the page is open: each word flashes gold in turn.
              color: {
                duration: 1.4,
                ease: "easeInOut",
                delay: 0.1 * i + 0.9,
                repeat: Infinity,
                repeatDelay: 3.2,
                times: [0, 0.5, 1],
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
