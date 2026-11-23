"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import SlideLayer, { type SlideCta, type SlideData } from "./SlideLayer";
import SliderHud from "./SliderHud";
import type { Lang } from "@/lib/lang";

const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const DURATION = 1.15;
const LOCK_MS = 1200;

const T = (y: number, scale: number) => `translate3d(0,${y}%,0) scale(${scale})`;
const layer = (slot: HTMLElement, name: string) =>
  slot.querySelector<HTMLElement>(`[data-l="${name}"]`)!;

interface Labels {
  explore: string;
  prev: string;
  next: string;
}

/**
 * What We Do: a full-viewport vertical parallax slider. Two slots swap places;
 * during a move the outgoing and incoming slides run together and each depth
 * plane travels at its own speed, so the subject detaches from its backdrop.
 * Wheel, swipe, keys and buttons all drive it, and it lets go of the page at
 * either end so scrolling on is never trapped.
 */
export default function ParallaxServiceSlider({
  slides,
  eyebrow,
  cta,
  labels,
  lang,
}: {
  slides: SlideData[];
  eyebrow: string;
  cta?: SlideCta;
  labels: Labels;
  lang: Lang;
}) {
  const total = slides.length;
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const slotEls = useRef<(HTMLDivElement | null)[]>([null, null]);
  const lockRef = useRef(false);
  const idxRef = useRef(0);
  const frontRef = useRef(0);
  const pending = useRef<{ dir: number; out: number; inc: number } | null>(null);
  const revealed = useRef(false);

  const [slotIdx, setSlotIdx] = useState<[number, number]>([0, 0]);
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [tick, setTick] = useState(0);
  // Bumped for the incoming slot so its copy always remounts hidden, even when the
  // same service comes back round.
  const [gens, setGens] = useState<[number, number]>([0, 0]);

  // Pointer parallax: damped springs over a normalised -1..1 pointer position.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 75, damping: 20 });
  const sy = useSpring(py, { stiffness: 75, damping: 20 });

  const go = useCallback(
    (n: number) => {
      if (lockRef.current || n === idxRef.current || n < 0 || n >= total) return;
      lockRef.current = true;
      window.setTimeout(() => {
        lockRef.current = false;
      }, LOCK_MS);
      const d = n > idxRef.current ? 1 : -1;
      const out = frontRef.current;
      const inc = out === 0 ? 1 : 0;
      pending.current = { dir: d, out, inc };
      idxRef.current = n;
      setDir(d);
      setCurrent(n);
      setSlotIdx((s) => {
        const next: [number, number] = [s[0], s[1]];
        next[inc] = n;
        return next;
      });
      setGens((g) => (inc === 0 ? [g[0] + 1, g[1]] : [g[0], g[1] + 1]));
      setTick((t) => t + 1);
    },
    [total]
  );

  // Runs after the incoming slot has rendered its new content, before paint.
  useLayoutEffect(() => {
    const p = pending.current;
    if (!p) return;
    pending.current = null;
    const outEl = slotEls.current[p.out];
    const inEl = slotEls.current[p.inc];
    if (!outEl || !inEl) return;
    const d = p.dir;
    const dur = reduce ? 0.01 : DURATION;

    const inBg = layer(inEl, "bg");
    const inMid = layer(inEl, "mid");
    const inSub = layer(inEl, "subject");
    inEl.style.visibility = "visible";
    inEl.style.zIndex = "2";
    outEl.style.zIndex = "1";
    inBg.style.transform = T(d * 100, 1.08);
    inMid.style.transform = T(d * 120, 1);
    inMid.style.opacity = "0";
    inSub.style.transform = T(d * 135, 1.08);

    const run = [
      // outgoing planes
      animate(layer(outEl, "bg"), { transform: [T(0, 1.08), T(-d * 100, 1.08)] }, { duration: dur, ease: EASE_IN_OUT }),
      animate(
        layer(outEl, "mid"),
        { transform: [T(0, 1), T(-d * 120, 1)], opacity: [1, 0] },
        { duration: dur, ease: EASE_IN_OUT }
      ),
      animate(
        layer(outEl, "subject"),
        { transform: [T(0, 1), T(-d * 145, 0.94)], filter: ["blur(0px)", "blur(3px)", "blur(0px)"] },
        { duration: dur, ease: EASE_IN_OUT }
      ),
      animate(
        layer(outEl, "text"),
        { opacity: [1, 0], transform: ["translateY(0px)", "translateY(-36px)"] },
        { duration: reduce ? 0.01 : 0.35, ease: "easeIn" }
      ),
      // incoming planes
      animate(inBg, { transform: [T(d * 100, 1.08), T(0, 1.08)] }, { duration: dur, ease: EASE_IN_OUT }),
      animate(
        inMid,
        { transform: [T(d * 120, 1), T(0, 1)], opacity: [0, 1] },
        { duration: dur, ease: EASE_IN_OUT }
      ),
      animate(
        inSub,
        { transform: [T(d * 135, 1.08), T(0, 1)], filter: ["blur(0px)", "blur(3px)", "blur(0px)"] },
        { duration: dur, ease: EASE_IN_OUT }
      ),
    ];
    revealCopy(inEl, reduce ? 0 : 0.2);

    let alive = true;
    Promise.all(run).then(() => {
      if (!alive) return;
      outEl.style.visibility = "hidden";
      outEl.querySelectorAll<HTMLElement>("[data-l]").forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
        el.style.filter = "";
      });
      frontRef.current = p.inc;
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  // First slide: reveal its copy once the stage is on screen.
  useEffect(() => {
    const root = rootRef.current;
    const first = slotEls.current[0];
    if (!root || !first) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !revealed.current) {
          revealed.current = true;
          revealCopy(first, reduce ? 0 : 0.15);
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [reduce]);

  // Warm the neighbouring photos so a move never waits on the network.
  useEffect(() => {
    [current - 1, current + 1].forEach((i) => {
      if (i >= 0 && i < total) new Image().src = slides[i].src;
    });
  }, [current, slides, total]);

  // Wheel, touch and keyboard.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let acc = 0;
    let accTimer = 0;
    let approachBusy = false;
    let touchY = 0;
    const vh = () => window.innerHeight;
    const top = () => root.getBoundingClientRect().top;
    const canGo = (d: number) => {
      const i = idxRef.current;
      return (d > 0 && i < total - 1) || (d < 0 && i > 0);
    };
    const alignToStage = () => {
      const y = root.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
      lockRef.current = true;
      window.setTimeout(() => {
        lockRef.current = false;
      }, 800);
    };
    const approaching = (d: number, r: DOMRect, near: number) =>
      r.top < vh() * near &&
      r.bottom > vh() * (1 - near) &&
      ((d > 0 && r.top > 0) || (d < 0 && r.top < 0));

    const onWheel = (e: WheelEvent) => {
      const d = Math.sign(e.deltaY);
      if (!d || e.ctrlKey) return;
      const r = root.getBoundingClientRect();
      if (Math.abs(r.top) < 6) {
        if (!canGo(d) && !lockRef.current) return; // let go at either end
        e.preventDefault();
        if (lockRef.current) return;
        acc += e.deltaY;
        window.clearTimeout(accTimer);
        accTimer = window.setTimeout(() => (acc = 0), 160);
        if (Math.abs(acc) >= 50) {
          acc = 0;
          go(idxRef.current + d);
        }
        return;
      }
      if (approaching(d, r, 0.7)) {
        e.preventDefault();
        if (!approachBusy) {
          approachBusy = true;
          alignToStage();
          window.setTimeout(() => (approachBusy = false), 900);
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (Math.abs(top()) >= 6) return;
      const d = touchY - e.touches[0].clientY > 0 ? 1 : -1;
      if (canGo(d) || lockRef.current) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 45) return;
      const d = dy > 0 ? 1 : -1;
      const r = root.getBoundingClientRect();
      if (Math.abs(r.top) < 6) {
        if (canGo(d)) go(idxRef.current + d);
      } else if (approaching(d, r, 0.6)) {
        alignToStage();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      const r = root.getBoundingClientRect();
      if (!(r.top < vh() * 0.4 && r.bottom > vh() * 0.6)) return;
      const d =
        e.key === "ArrowDown" || e.key === "PageDown" ? 1 : e.key === "ArrowUp" || e.key === "PageUp" ? -1 : 0;
      if (d && canGo(d)) {
        e.preventDefault();
        go(idxRef.current + d);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(accTimer);
    };
  }, [go, total]);

  // Pointer parallax, only for a real mouse and only when motion is welcome.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      px.set(((e.clientX - r.left) / r.width) * 2 - 1);
      py.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, px, py]);

  const next = useCallback(() => go(idxRef.current + 1), [go]);

  return (
    <section
      ref={rootRef}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="pss-root"
      aria-roledescription="carousel"
      aria-label={eyebrow}
    >
      <style>{CSS}</style>
      {[0, 1].map((slot) => (
        <div
          key={slot}
          ref={(el) => {
            slotEls.current[slot] = el;
          }}
          className="pss-slot"
          style={slot === 0 ? { zIndex: 2 } : { visibility: "hidden", zIndex: 1 }}
        >
          <SlideLayer
            key={gens[slot]}
            slide={slides[slotIdx[slot]]}
            total={total}
            eyebrow={eyebrow}
            cta={cta}
            exploreLabel={labels.explore}
            onNext={next}
            lang={lang}
            sx={sx}
            sy={sy}
            priority={slot === 0}
          />
        </div>
      ))}
      <SliderHud
        index={current}
        total={total}
        dir={dir}
      />
      <p className="sr-only" aria-live="polite">
        {current + 1} / {total}: {slides[current].title}
      </p>
    </section>
  );
}

/** Headline lines rise out of their masks one after another, then the rest fades up. */
function revealCopy(slot: HTMLElement, delay: number) {
  const reduce = delay === 0;
  slot.querySelectorAll<HTMLElement>("[data-line]").forEach((el, i) => {
    if (reduce) {
      el.style.transform = "none";
      return;
    }
    animate(
      el,
      { transform: ["translateY(110%)", "translateY(0%)"] },
      { duration: 0.95, ease: EASE_OUT, delay: delay + i * 0.08 }
    );
  });
  slot.querySelectorAll<HTMLElement>("[data-fade]").forEach((el, i) => {
    if (reduce) {
      el.style.opacity = "1";
      return;
    }
    animate(
      el,
      { opacity: [0, 1], transform: ["translateY(22px)", "translateY(0px)"] },
      { duration: 0.8, ease: EASE_OUT, delay: delay + 0.3 + i * 0.1 }
    );
  });
}

/* Layout lives here (not in utility classes) so it can never come out half-styled. */
const CSS = `
.pss-root{position:relative;width:100%;height:100vh;height:100dvh;overflow:hidden;background:var(--color-body);z-index:10}
.pss-slot{position:absolute;inset:0;overflow:hidden}
.pss-layer{position:absolute;inset:0;pointer-events:none;will-change:transform}
.pss-bg{transform:scale(1.08)}
.pss-fill{position:absolute;inset:0}
.pss-persp{perspective:1200px}
.pss-bgimg{display:block;width:100%;height:100%;object-fit:cover;filter:blur(22px) brightness(.34) saturate(1.1);transform:scale(1.12)}
.pss-veil{position:absolute;inset:0;background:linear-gradient(90deg,rgba(37,42,46,.88),rgba(37,42,46,.4) 55%,rgba(37,42,46,.55))}
.pss-mark{position:absolute;inset-inline-start:-1vw;top:6vh;font-size:clamp(4rem,12vw,12rem);font-weight:700;line-height:1;letter-spacing:-.03em;text-transform:uppercase;white-space:nowrap;color:rgba(255,255,255,.03)}
.pss-num{position:absolute;inset-inline-end:1vw;bottom:-5vh;font-size:clamp(7rem,26vw,26rem);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(240,179,28,.2)}
.pss-glow{position:absolute;inset-inline-end:0;top:0;width:60vw;height:100%;background:radial-gradient(ellipse 60% 55% at 62% 50%,rgba(240,179,28,.16),transparent 70%)}
.pss-ring{position:absolute;inset-inline-end:calc(28vw - 40vh);top:50%;width:80vh;height:80vh;margin-top:-40vh;border:1.5px solid var(--color-accent);border-radius:50%;opacity:.45}
.pss-ring-2{inset-inline-end:calc(28vw - 48vh);width:96vh;height:96vh;margin-top:-48vh;border-width:1px;opacity:.2}
.pss-echo{position:absolute;border:1px solid rgba(240,179,28,.55);top:calc(5.4rem + 18px);inset-inline:calc(1.25rem + 18px) calc(1.25rem - 18px);height:27dvh}
.pss-subject{position:absolute;overflow:hidden;background:#14171a;box-shadow:0 30px 80px rgba(0,0,0,.55);top:5.4rem;inset-inline:1.25rem;height:27dvh}
.pss-subjectimg{display:block;width:100%;height:100%;object-fit:cover}
.pss-badge{position:absolute;top:0;inset-inline-start:0}
.pss-copy{position:absolute;inset:0}
.pss-titlewrap{position:absolute;inset-inline:1.25rem;top:calc(5.4rem + 27dvh + 1.6rem)}
.pss-eyebrow{margin:0 0 .6rem;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent);opacity:0}
.pss-title{margin:0;font-size:clamp(2rem,9vw,2.6rem);font-weight:700;line-height:.98;letter-spacing:-.01em;color:#fff !important}
.pss-line{display:block;overflow:hidden;padding-bottom:.14em;margin-bottom:-.14em}
.pss-linein{display:block;transform:translateY(110%);will-change:transform}
.pss-desc{margin-top:1rem;opacity:0;pointer-events:auto}
.pss-desc p{margin:0 0 .8rem;font-size:.86rem;font-weight:300;line-height:1.5;color:#b4b4b4}
.pss-progress{height:1px;background:rgba(255,255,255,.18);margin-bottom:.9rem}
.pss-progress i{display:block;height:100%;background:var(--color-accent)}
.pss-explore{display:none}
.pss-cta{display:inline-block;padding:.85rem 1.8rem;background:var(--color-accent);color:#14171a !important;text-transform:uppercase;letter-spacing:.16em;font-size:.72rem;font-weight:700;transition:background .3s}
.pss-cta:hover{background:#fff}
.pss-counter{position:absolute;z-index:5;inset-inline-start:4.6rem;bottom:1.4rem;display:flex;align-items:baseline;gap:.5rem;color:#fff}
.pss-roll{position:relative;display:inline-block;overflow:hidden;height:1.7rem;line-height:1.7rem;min-width:2ch}
.pss-roll b{display:block;font-size:1.5rem;font-weight:700}
.pss-of{font-size:.75rem;letter-spacing:.2em;color:var(--color-accent)}
@media (min-width:900px){
  .pss-subject{top:13vh;height:70vh;width:38vw;inset-inline:auto;inset-inline-end:9vw}
  .pss-echo{top:calc(13vh + 22px);height:70vh;width:38vw;inset-inline:auto;inset-inline-end:calc(9vw - 22px)}
  .pss-titlewrap{inset-inline:auto;inset-inline-start:6vw;width:46vw;top:50%;transform:translateY(-50%)}
  .pss-eyebrow{font-size:.8rem;margin-bottom:1.2rem}
  .pss-title{font-size:clamp(2.8rem,5vw,5.6rem)}
  .pss-desc{margin-top:2rem;max-width:42ch}
  .pss-desc p{font-size:1.05rem;line-height:1.65;margin-bottom:1.3rem}
  .pss-progress{margin-bottom:1.5rem}
  .pss-explore{display:inline-flex;align-items:center;gap:.7rem;padding:0 0 .35rem;background:none;border:0;border-bottom:1px solid var(--color-accent);color:var(--color-accent);text-transform:uppercase;letter-spacing:.2em;font-size:.74rem;font-weight:700}
  .pss-explore:hover{color:#fff;border-color:#fff}
  .pss-counter{inset-inline-start:6vw;bottom:2rem}
}
@media (prefers-reduced-motion:reduce){.pss-linein{transform:none}.pss-eyebrow,.pss-desc{opacity:1}}
`;
