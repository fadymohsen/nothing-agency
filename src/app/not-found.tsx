"use client";

import Link from "next/link";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
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
          </div>
        </div>
      </section>
    </div>
  );
}
