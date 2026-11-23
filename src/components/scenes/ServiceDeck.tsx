"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import IconBadge from "@/components/ui/IconBadge";
import { EASE } from "@/components/animations/motion";
import type { SceneImage } from "@/data/scenes";

interface Point {
  title: string;
  text: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

function Photo({
  image,
  index,
  total,
  progress,
}: {
  image: SceneImage;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // `progress` is the stepped index (0..total-1): it holds on a whole number, then
  // glides to the next. Each photo is wiped in from the top over the previous one.
  void total;
  const clip = useTransform(
    progress,
    index === 0 ? [0, 1] : [index - 1, index],
    index === 0 ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const zoom = useTransform(
    progress,
    index === 0 ? [0, 0.01] : [index - 1, index],
    index === 0 ? [1, 1] : [1.22, 1]
  );
  return (
    <motion.div className="sd-photo" style={{ clipPath: clip, zIndex: index + 1 }}>
      <motion.div className="sd-zoom" style={{ scale: zoom }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt="" loading="lazy" className="sd-img" />
      </motion.div>
      {image.icon && (
        <div className="sd-badge">
          <IconBadge src={image.icon} size={68} shape="square" />
        </div>
      )}
    </motion.div>
  );
}

/**
 * What We Do: one pinned stage. Scrolling wipes each service photo in over the
 * last while an index on the side tracks where you are. Click an entry to jump.
 */
export default function ServiceDeck({
  points,
  images,
}: {
  points: Point[];
  images: SceneImage[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const total = points.length;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Every service gets a long hold where scrolling changes nothing, then a slow glide.
  const HOLD = 0.7;
  const inputs: number[] = [];
  const outputs: number[] = [];
  for (let i = 0; i < total; i++) {
    inputs.push(i / total, i === total - 1 ? 1 : i / total + HOLD / total);
    outputs.push(i, i);
  }
  const stepped = useTransform(scrollYProgress, inputs, outputs);
  const smooth = useSpring(stepped, { stiffness: 60, damping: 24, mass: 1 });

  useMotionValueEvent(smooth, "change", (v) =>
    setActive(Math.min(total - 1, Math.max(0, Math.round(v))))
  );
  const bar = useTransform(smooth, [0, total - 1], [1 / total, 1]);

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const run = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + run * (i / total + 0.25 / total), behavior: "smooth" });
  };

  if (reduce) {
    return (
      <div className="flex flex-col gap-16">
        {points.map((pt, i) => (
          <div key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[i % images.length].src}
              alt=""
              className="mb-6 w-full"
              style={{ aspectRatio: images[i % images.length].ratio }}
            />
            <h3 className="mb-3 text-2xl font-bold !text-white">{pt.title}</h3>
            <p className="max-w-[56ch] font-light leading-relaxed">{pt.text}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="sd-wrap" style={{ height: `${total * 140 + 30}vh` }}>
      <style>{CSS}</style>
      <div className="sd-sticky">
        <div className="sd-stage">
          <div className="sd-deck">
            {points.map((_, i) => (
              <Photo
                key={i}
                image={images[i % images.length]}
                index={i}
                total={total}
                progress={smooth}
              />
            ))}
          </div>

          <div className="sd-side">
            <div className="sd-meta">
              <span className="sd-count">
                <b>{pad(active + 1)}</b> / {pad(total)}
              </span>
              <div className="sd-bar">
                <motion.i style={{ scaleX: bar }} />
              </div>
            </div>

            <ul className="sd-nav">
              {points.map((pt, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    className={i === active ? "is-on" : ""}
                    aria-current={i === active}
                  >
                    <span>{pad(i + 1)}</span>
                    {pt.title}
                  </button>
                </li>
              ))}
            </ul>

            <div className="sd-copies">
              {points.map((pt, i) => (
                <motion.div
                  key={i}
                  className="sd-copy"
                  animate={
                    i === active
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: i < active ? -28 : 28, filter: "blur(6px)" }
                  }
                  transition={{ duration: 0.9, ease: EASE, delay: i === active ? 0.25 : 0 }}
                  style={{ pointerEvents: i === active ? "auto" : "none" }}
                  aria-hidden={i !== active}
                >
                  <h3 className="sd-title">{pt.title}</h3>
                  <p className="sd-text">{pt.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.sd-wrap{position:relative}
.sd-sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;overflow:hidden}
.sd-stage{width:100%;display:grid;grid-template-columns:1fr;grid-template-rows:minmax(0,40%) minmax(0,1fr);gap:1.25rem;height:80vh;padding-top:4.5rem}
.sd-deck{position:relative;min-height:0;background:#14171a;overflow:hidden}
.sd-photo{position:absolute;inset:0;overflow:hidden;will-change:clip-path}
.sd-zoom{position:absolute;inset:0;will-change:transform}
.sd-img{display:block;width:100%;height:100%;object-fit:cover}
.sd-badge{position:absolute;top:0;left:0}
.sd-side{display:flex;flex-direction:column;min-height:0;min-width:0}
.sd-meta{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}
.sd-count{font-size:.8rem;letter-spacing:3px;color:var(--color-accent);white-space:nowrap}
.sd-count b{font-size:1.6rem;letter-spacing:1px;color:#fff;font-weight:700}
.sd-bar{flex:1;height:1px;background:rgba(255,255,255,.16);overflow:hidden}
.sd-bar i{display:block;height:100%;background:var(--color-accent);transform-origin:left}
.sd-nav{display:none;list-style:none;margin:0 0 2rem;padding:0}
.sd-nav button{display:flex;gap:1rem;align-items:baseline;width:100%;padding:.55rem 0;background:none;border:0;border-bottom:1px solid rgba(255,255,255,.1);text-align:start;font:inherit;font-size:.95rem;color:rgba(255,255,255,.45);transition:color .3s,padding .4s cubic-bezier(.16,1,.3,1)}
.sd-nav button span{font-size:.7rem;letter-spacing:2px;color:inherit}
.sd-nav button:hover{color:#fff}
.sd-nav button.is-on{color:var(--color-accent);padding-inline-start:.75rem}
.sd-copies{position:relative;display:grid;min-width:0}
.sd-copy{grid-area:1/1;will-change:transform,opacity}
.sd-title{margin:0 0 .75rem;font-size:1.5rem;font-weight:700;line-height:1.2;color:#fff !important}
.sd-text{max-width:46ch;font-weight:300;line-height:1.65;font-size:1rem;margin:0}
@media (min-width:768px){
  .sd-stage{grid-template-columns:minmax(0,7fr) minmax(0,5fr);grid-template-rows:none;gap:3.5rem;height:72vh;padding-top:3rem}
  .sd-side{justify-content:center}
  .sd-nav{display:block}
  .sd-title{font-size:2rem}
  .sd-text{font-size:1.1rem}
}
`;
