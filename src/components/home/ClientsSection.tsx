"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clients } from "@/data/clients";
import { t } from "@/data/dictionary";
import { useLang } from "@/lib/useLang";
import { EASE } from "@/components/animations/motion";

/** Every logo gets roughly the same visual weight, whatever its proportions. */
const AREA = 8200;
const MAX_W = 150;

function useSlotCount() {
  const [n, setN] = useState(12);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setN(w < 560 ? 6 : w < 900 ? 8 : 12);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return n;
}

/**
 * A wall of slots. Each slot shows one white logo; every few seconds one slot
 * at random swaps to a logo that is not on screen, blurring out and in. All 22
 * clients rotate through without the wall ever scrolling.
 */
function LogoWall() {
  const reduce = useReducedMotion();
  const slots = useSlotCount();
  const [shown, setShown] = useState<number[]>(() =>
    Array.from({ length: 12 }, (_, i) => i)
  );
  const shownRef = useRef(shown);
  shownRef.current = shown;
  const wallRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (reduce) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (wallRef.current) io.observe(wallRef.current);

    const id = window.setInterval(() => {
      if (!visible || document.hidden) return;
      const cur = shownRef.current;
      const slot = Math.floor(Math.random() * slots);
      const free = clients.map((_, i) => i).filter((i) => !cur.includes(i));
      if (!free.length) return;
      const next = free[Math.floor(Math.random() * free.length)];
      setShown(cur.map((v, i) => (i === slot ? next : v)));
    }, 1100);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [slots, reduce]);

  return (
    <ul ref={wallRef} className="cl-wall" aria-label="Clients">
      {shown.slice(0, slots).map((idx, slot) => {
        const cl = clients[idx];
        const w = Math.min(MAX_W, Math.round(Math.sqrt(AREA * cl.ratio)));
        return (
          <motion.li
            key={slot}
            className="cl-cell"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: (slot % 6) * 0.07 + Math.floor(slot / 6) * 0.2 }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={cl.file}
                className="cl-swap"
                initial={reduce ? false : { opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 1.06 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cl.file}
                  alt={cl.name}
                  draggable={false}
                  className="cl-logo hover-target"
                  style={{ width: `${w}px` }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}

/**
 * Clients: a heading, then a still wall of white logo marks that swap one by
 * one, so all 22 clients rotate through a dozen slots.
 */
export default function ClientsSection() {
  const lang = useLang();
  const reduce = useReducedMotion();
  const d = t(lang).clients;

  return (
    <section className="cl-section" aria-label={d.label}>
      <style>{CSS}</style>

      <div className="cl-inner" dir={lang === "ar" ? "rtl" : "ltr"}>
        <motion.div
          className="cl-head"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="cl-label">
            <span className="cl-count">{clients.length}</span>
            {d.label}
          </p>
          <h2 className="cl-title">{d.title}</h2>
        </motion.div>
      </div>

      <div className="cl-inner">
        <LogoWall />
      </div>
    </section>
  );
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.cl-section{position:relative;z-index:10;background:var(--color-body);padding:clamp(56px,8vw,112px) 0;overflow:hidden}
.cl-inner{max-width:1140px;margin:0 auto;padding:0 42px}
.cl-head{display:flex;flex-direction:column;gap:1rem;margin-bottom:clamp(28px,4.5vw,56px)}
.cl-label{display:flex;align-items:baseline;gap:.75rem;margin:0;font-size:.75rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--color-accent)}
.cl-count{font-size:2.25rem;line-height:1;letter-spacing:0;color:#fff}
.cl-title{margin:0;max-width:20ch;font-size:clamp(1.9rem,1.1rem + 3vw,3.25rem);font-weight:600;line-height:1.15;color:#fff}
.cl-wall{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));margin:0;padding:0;list-style:none;border-top:1px solid rgba(255,255,255,.1);border-left:1px solid rgba(255,255,255,.1)}
.cl-cell{position:relative;display:flex;align-items:center;justify-content:center;height:clamp(92px,12vw,132px);border-right:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1)}
.cl-swap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.cl-logo{display:block;max-width:72%;max-height:60%;object-fit:contain;filter:brightness(0) invert(1);opacity:.92;user-select:none}
@media (min-width:560px){ .cl-wall{grid-template-columns:repeat(4,minmax(0,1fr))} }
@media (min-width:900px){ .cl-wall{grid-template-columns:repeat(6,minmax(0,1fr))} }
@media (min-width:768px){ .cl-inner{padding:0 40px} }
`;
