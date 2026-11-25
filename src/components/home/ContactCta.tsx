"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { EASE } from "@/components/animations/motion";
import { useT } from "@/lib/content/client";
import { useLang } from "@/lib/useLang";
import { localizeHref } from "@/lib/lang";

/** One headline line, rising out of a mask. */
function MaskLine({
  children,
  delay,
  show,
}: {
  children: string;
  delay: number;
  show: boolean;
}) {
  return (
    <span className="cc-mask">
      <motion.span
        className="cc-line"
        initial={{ y: "115%" }}
        animate={{ y: show ? "0%" : "115%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Home closing call to action: outlined words drift behind a big headline, and
 * the button is a round, magnetic disc ringed by turning text.
 */
export default function ContactCta() {
  const lang = useLang();
  const h = useT(lang).home;
  const isAr = lang === "ar";
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const show = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // No easing: the button sits exactly on the cursor.
  const x = mx;
  const y = my;

  const stageRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  // The button chases the cursor anywhere in the section, kept inside its edges.
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce || !stageRef.current || !btnRef.current || !ref.current) return;
    const rest = stageRef.current.getBoundingClientRect();
    const box = ref.current.getBoundingClientRect();
    const bw = btnRef.current.offsetWidth / 2;
    const bh = btnRef.current.offsetHeight / 2;
    const cx = Math.min(Math.max(e.clientX, box.left + bw + 8), box.right - bw - 8);
    const cy = Math.min(Math.max(e.clientY, box.top + bh + 8), box.bottom - bh - 8);
    mx.set(cx - (rest.left + rest.width / 2));
    my.set(cy - (rest.top + rest.height / 2));
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const words = `${h.titleA} ${h.titleB}`;

  return (
    <section
      ref={ref}
      dir={isAr ? "rtl" : "ltr"}
      className="relative overflow-hidden py-[var(--space-section-lg)]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <style>{CSS}</style>

      {/* Outlined words drifting in opposite directions */}
      <div aria-hidden="true" className="cc-bg" dir="ltr">
        <div className={`cc-row ${reduce ? "" : "cc-row-a"}`}>
          <span>{words} · {words} · </span>
          <span>{words} · {words} · </span>
        </div>
        <div className={`cc-row ${reduce ? "" : "cc-row-b"}`}>
          <span>{words} · {words} · </span>
          <span>{words} · {words} · </span>
        </div>
      </div>

      <div className="relative max-w-[1140px] mx-auto px-6 md:px-4 text-center">
        <motion.div
          className="cc-eyebrow"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8 }}
        >
          <motion.i
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={show ? { scaleX: 1 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            style={{ transformOrigin: isAr ? "left" : "right" }}
          />
          <span>{h.eyebrow}</span>
          <motion.i
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={show ? { scaleX: 1 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            style={{ transformOrigin: isAr ? "right" : "left" }}
          />
        </motion.div>

        <h2 className="cc-title text-white font-bold">
          <MaskLine show={show} delay={0.15}>{h.titleA}</MaskLine>
          <MaskLine show={show} delay={0.3}>{h.titleB}</MaskLine>
        </h2>

        <motion.p
          className="text-[var(--color-body-text)] text-lg max-w-[500px] mx-auto mt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        >
          {h.text}
        </motion.p>

        <motion.div
          ref={stageRef}
          className="cc-stage"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={show ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
        >
          <motion.div ref={btnRef} className="cc-magnet" style={{ x, y }}>
            <Link href={localizeHref("/contact", lang)} className="cc-btn hover-target">
              <span className="cc-sweep" aria-hidden="true" />
              <span className="cc-label">{h.cta}</span>
              <span className="cc-arrow" aria-hidden="true">{isAr ? "←" : "→"}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const CSS = `
.cc-bg{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:1rem;pointer-events:none;overflow:hidden}
.cc-row{display:flex;width:max-content;white-space:nowrap;font-size:clamp(4rem,12vw,10rem);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.07)}
.cc-row span{padding-right:2rem}
.cc-row-a{animation:cc-left 60s linear infinite}
.cc-row-b{animation:cc-right 70s linear infinite}
@keyframes cc-left{to{transform:translateX(-50%)}}
@keyframes cc-right{from{transform:translateX(-50%)}to{transform:translateX(0)}}
.cc-eyebrow{display:flex;align-items:center;justify-content:center;gap:1rem;margin-bottom:1.5rem;color:var(--color-accent);text-transform:uppercase;letter-spacing:3px;font-size:.875rem}
.cc-eyebrow i{display:block;height:1px;width:clamp(28px,8vw,72px);background:var(--color-accent);opacity:.6}
.cc-title{margin:0;font-size:clamp(2.4rem,7vw,5.5rem);line-height:1.08}
.cc-mask{display:block;overflow:hidden;padding-bottom:.16em;margin-bottom:-.16em}
.cc-line{display:block;will-change:transform}
.cc-stage{display:flex;justify-content:center;margin-top:3rem;min-height:56px}
.cc-magnet{display:inline-block;will-change:transform}
.cc-btn{position:relative;display:inline-flex;align-items:center;gap:.9rem;overflow:hidden;padding:1.1rem 3.2rem;background:var(--color-accent);color:#14171a;text-transform:uppercase;letter-spacing:2px;font-size:.9rem;font-weight:700;transition:box-shadow .3s}
.cc-btn:hover{box-shadow:0 0 40px rgba(240,179,28,.4)}
.cc-sweep{position:absolute;inset:0;background:#fff;transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.16,1,.3,1)}
[dir="rtl"] .cc-sweep{transform-origin:right}
.cc-btn:hover .cc-sweep{transform:scaleX(1)}
.cc-label,.cc-arrow{position:relative}
.cc-arrow{display:inline-block;transition:transform .4s cubic-bezier(.16,1,.3,1)}
.cc-btn:hover .cc-arrow{transform:translateX(6px)}
[dir="rtl"] .cc-btn:hover .cc-arrow{transform:translateX(-6px)}
@media (prefers-reduced-motion:reduce){.cc-row-a,.cc-row-b{animation:none}}
`;
