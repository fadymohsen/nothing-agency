"use client";

import Link from "next/link";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import IconBadge from "@/components/ui/IconBadge";
import ClipImage from "@/components/animations/ClipImage";
import { icon } from "@/data/scenes";
import { t } from "@/data/dictionary";
import { useLang } from "@/lib/useLang";

export default function NotFound() {
  const lang = useLang();
  const n = t(lang).notFound;

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <ParallaxTopShadow>404</ParallaxTopShadow>

      <section className="error-404 relative w-full block pt-[var(--space-hero)] pb-[var(--space-section)] overflow-hidden z-10 text-center">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <div className="mx-auto mb-8 flex flex-col items-center gap-6">
              <IconBadge src={icon("hourglass")} size={80} shape="ring" />
            </div>
            <h1>404</h1>
            <h2 className="text-3xl md:text-5xl">{n.title}</h2>
            <div className="mt-6 max-w-[640px] mx-auto">
              <p className="text-[1.15rem] font-light leading-relaxed">
                {n.text}
              </p>
              <p className="mt-6 text-[1.15rem] font-light leading-relaxed">
                <Link
                  href={lang === "ar" ? "/ar" : "/"}
                  className="hover-target font-bold text-[var(--color-accent)] underline underline-offset-4 hover:text-white"
                >
                  {n.cta}
                </Link>{" "}
                {n.after}
              </p>
            </div>
            <div className="mt-[var(--space-block)] mx-auto max-w-[760px]">
              <ClipImage src="/site/photos/hero-404.jpg" aspect="16 / 7" drift={6} sizes="(max-width: 800px) 100vw, 760px" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
