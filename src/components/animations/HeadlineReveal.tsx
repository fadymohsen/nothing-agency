"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

/**
 * Words rise out of a mask one after another. Waits for the splash screen
 * (if one is playing) so the entrance is actually seen.
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
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.12em] me-[0.25em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={ready ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 * i }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
