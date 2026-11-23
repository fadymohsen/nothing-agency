"use client";

import Link from "next/link";
import { motion, useTransform, type MotionValue } from "framer-motion";
import IconBadge from "@/components/ui/IconBadge";
import { localizeHref, type Lang } from "@/lib/lang";

export interface SlideData {
  index: number;
  title: string;
  text: string;
  src: string;
  icon?: string;
  focus?: string;
}

export interface SlideCta {
  label: string;
  href: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Two balanced lines for a title, so long names never wrap raggedly. */
function splitTitle(title: string): string[] {
  const words = title.split(" ");
  if (words.length < 2) return [title];
  let best = 1;
  let diff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const d = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (d < diff) {
      diff = d;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/**
 * The four depth planes of one slide. The slider moves each plane at its own
 * speed through the transition (data-l marks them); pointer parallax lives on
 * the inner wrappers so the two never fight over the same transform.
 */
export default function SlideLayer({
  slide,
  total,
  eyebrow,
  cta,
  exploreLabel,
  onNext,
  lang,
  sx,
  sy,
  priority,
}: {
  slide: SlideData;
  total: number;
  eyebrow: string;
  cta?: SlideCta;
  exploreLabel: string;
  onNext: () => void;
  lang: Lang;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  priority: boolean;
}) {
  const bgX = useTransform(sx, [-1, 1], [-10, 10]);
  const bgY = useTransform(sy, [-1, 1], [-10, 10]);
  const midX = useTransform(sx, [-1, 1], [-22, 22]);
  const midY = useTransform(sy, [-1, 1], [-22, 22]);
  const subX = useTransform(sx, [-1, 1], [-38, 38]);
  const subY = useTransform(sy, [-1, 1], [-38, 38]);
  const subRY = useTransform(sx, [-1, 1], [-1.5, 1.5]);
  const subRX = useTransform(sy, [-1, 1], [1.5, -1.5]);
  const txtX = useTransform(sx, [-1, 1], [-14, 14]);
  const txtY = useTransform(sy, [-1, 1], [-14, 14]);

  const last = slide.index === total - 1;
  const lines = splitTitle(slide.title);

  return (
    <>
      {/* 1. Background, slowest plane */}
      <div data-l="bg" className="pss-layer pss-bg">
        <motion.div className="pss-fill" style={{ x: bgX, y: bgY }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt=""
            className="pss-bgimg"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
          <div className="pss-veil" />
        </motion.div>
      </div>

      {/* 2. Midground: watermarks and the partial ring on the far edge */}
      <div data-l="mid" className="pss-layer">
        <motion.div className="pss-fill" style={{ x: midX, y: midY }}>
          <span className="pss-mark" aria-hidden="true">{eyebrow}</span>
          <span className="pss-num" aria-hidden="true">{pad(slide.index + 1)}</span>
          <span className="pss-glow" aria-hidden="true" />
          <span className="pss-ring" aria-hidden="true" />
          <span className="pss-ring pss-ring-2" aria-hidden="true" />
        </motion.div>
      </div>

      {/* 3. Subject, fastest plane */}
      <div data-l="subject" className="pss-layer">
        <motion.div
          className="pss-fill pss-persp"
          style={{ x: subX, y: subY, rotateX: subRX, rotateY: subRY }}
        >
          <span className="pss-echo" aria-hidden="true" />
          <div className="pss-subject">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.title}
              className="pss-subjectimg"
              style={{ objectPosition: slide.focus }}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
            {slide.icon && (
              <div className="pss-badge">
                <IconBadge src={slide.icon} size={68} shape="square" />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* 4. Typography */}
      <div data-l="text" className="pss-layer">
        <motion.div className="pss-fill" style={{ x: txtX, y: txtY }}>
          <div key={slide.index} className="pss-copy">
            <div className="pss-titlewrap">
              <p data-fade className="pss-eyebrow">
                {pad(slide.index + 1)} / {eyebrow}
              </p>
              <h2 className="pss-title">
                {lines.map((line, i) => (
                  <span key={i} className="pss-line">
                    <span data-line className="pss-linein">
                      {line}
                    </span>
                  </span>
                ))}
              </h2>
              <div data-fade className="pss-desc">
                <p>{slide.text}</p>
                <div className="pss-progress" aria-hidden="true">
                  <i style={{ width: `${((slide.index + 1) / total) * 100}%` }} />
                </div>
                {last && cta ? (
                  <Link href={localizeHref(cta.href, lang)} className="pss-cta hover-target">
                    {cta.label}
                  </Link>
                ) : (
                  <button type="button" onClick={onNext} className="pss-explore hover-target">
                    {exploreLabel}
                    <span aria-hidden="true">↓</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
}
