"use client";

import { motion, useReducedMotion } from "framer-motion";
import { clients } from "@/data/clients";
import { t } from "@/data/dictionary";
import { useLang } from "@/lib/useLang";
import { EASE } from "@/components/animations/motion";

/** Every logo gets roughly the same visual weight, whatever its proportions. */
const AREA = 7000;
const MAX_W = 134;

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="cl-set" aria-hidden={hidden || undefined}>
      {clients.map((cl) => {
        const w = Math.min(MAX_W, Math.round(Math.sqrt(AREA * cl.ratio)));
        return (
          <li key={cl.file} className="cl-item">
            <div className="cl-tile hover-target">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cl.file}
                alt={hidden ? "" : cl.name}
                loading="lazy"
                draggable={false}
                className="cl-logo"
                style={{ width: `${w}px` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Clients: a short heading, then a transparent ticker. Logos are shown
 * exactly as supplied, in their own colours. The ticker pauses under the cursor.
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

      <motion.div
        className="cl-strip"
        dir="ltr"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      >
        <div className={`cl-track ${reduce ? "is-static" : ""}`}>
          <LogoSet />
          {!reduce && <LogoSet hidden />}
        </div>
      </motion.div>
    </section>
  );
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.cl-section{position:relative;z-index:10;background:var(--color-body);padding:clamp(56px,8vw,112px) 0}
.cl-inner{max-width:1140px;margin:0 auto;padding:0 42px}
.cl-head{display:flex;flex-direction:column;gap:1rem;margin-bottom:clamp(32px,5vw,60px)}
.cl-label{display:flex;align-items:baseline;gap:.75rem;margin:0;font-size:.75rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--color-accent)}
.cl-count{font-size:2.25rem;line-height:1;letter-spacing:0;color:#fff}
.cl-title{margin:0;max-width:20ch;font-size:clamp(1.9rem,1.1rem + 3vw,3.25rem);font-weight:600;line-height:1.15;color:#fff}
.cl-strip{position:relative;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent);mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
.cl-track{display:flex;width:max-content;animation:cl-scroll 75s linear infinite}
.cl-strip:hover .cl-track{animation-play-state:paused}
.cl-track.is-static{animation:none;width:auto;overflow-x:auto}
.cl-set{display:flex;align-items:center;flex-shrink:0;margin:0;padding:0;list-style:none}
.cl-item{flex-shrink:0;padding-right:14px}
.cl-tile{display:flex;align-items:center;justify-content:center;width:clamp(150px,15vw,190px);height:clamp(84px,8.5vw,108px)}
.cl-logo{display:block;max-width:80%;height:auto;user-select:none}
@keyframes cl-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (min-width:768px){ .cl-inner{padding:0 40px} }
@media (prefers-reduced-motion:reduce){ .cl-track{animation:none} }
`;
