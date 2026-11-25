"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import SlideLayer, { type SlideCta, type SlideData } from "./SlideLayer";
import SliderHud from "./SliderHud";
import MobileStack from "./MobileStack";
import { SLIDER_CSS } from "./sliderCss";
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
  // Phones and touch screens scroll the page natively: the stage is pinned and the
  // slides are plain pinned cards (MobileStack), so nothing hijacks or traps a swipe.
  const [scrollMode, setScrollMode] = useState(false);
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

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px), (pointer: coarse)");
    const update = () => setScrollMode(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Wheel, touch and keyboard.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || scrollMode) return;
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
  }, [go, total, scrollMode]);

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

  if (scrollMode) {
    return <MobileStack slides={slides} eyebrow={eyebrow} cta={cta} lang={lang} />;
  }

  return (
    <div className="pss-wrap">
    <section
      ref={rootRef}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="pss-root"
      aria-roledescription="carousel"
      aria-label={eyebrow}
    >
      <style>{SLIDER_CSS}</style>
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
    </div>
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
