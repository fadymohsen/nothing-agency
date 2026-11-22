"use client";

import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClientsSection from "./ClientsSection";
import { t } from "@/data/dictionary";
import { useLang } from "@/lib/useLang";
import { localizeHref } from "@/lib/lang";

export default function HomeSections() {
  const lang = useLang();
  const h = t(lang).home;
  const isAr = lang === "ar";

  return (
    <>
    <ClientsSection />
    <div className="relative z-10 bg-[var(--color-body)]" dir={isAr ? "rtl" : "ltr"}>
      <section className="py-[var(--space-section-lg)]">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4 text-center">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-sm mb-4">
              {h.eyebrow}
            </p>
            <h2 className="text-white text-[36px] md:text-[56px] font-bold leading-tight mb-6">
              {h.titleA}
              <br />
              {h.titleB}
            </h2>
            <p className="text-[var(--color-body-text)] text-lg max-w-[500px] mx-auto mb-12">
              {h.text}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link
              href={localizeHref("/contact", lang)}
              className="hover-target inline-block bg-[var(--color-accent)] text-[#14171a] px-12 py-4 uppercase tracking-[2px] text-sm font-bold transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(240,179,28,0.35)]"
            >
              {h.cta}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
    </>
  );
}
