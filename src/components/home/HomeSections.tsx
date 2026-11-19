"use client";

import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { t } from "@/data/dictionary";
import { useLang } from "@/lib/useLang";
import { localizeHref } from "@/lib/lang";
import { sitePages } from "@/lib/pages";
import { pagesAr } from "@/data/pages-ar";

// Description lookups by slug
const enDescriptions: Record<string, string> = {
  ...Object.fromEntries(sitePages.map((p) => [p.slug, p.description])),
  contact: "Start the conversation. Tell us about your project and let's build something from nothing.",
};

const arDescriptions: Record<string, string> = {
  ...Object.fromEntries(Object.entries(pagesAr).map(([slug, p]) => [slug, p.description])),
  contact: "ابدأ المحادثة. أخبرنا عن مشروعك ولنبني شيئاً من اللاشيء.",
};

export default function HomeSections() {
  const lang = useLang();
  const nav = t(lang).nav;
  const h = t(lang).home;
  const descriptions = lang === "ar" ? arDescriptions : enDescriptions;
  const isAr = lang === "ar";

  return (
    <div className="relative z-10 bg-[var(--color-body)]" dir={isAr ? "rtl" : "ltr"}>

      {/* Pages List Section */}
      <section className="py-[var(--space-section-lg)]">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-xs mb-12">
              {isAr ? "استكشف" : "Explore"}
            </p>
          </ScrollReveal>

          {nav.map((item, i) => {
            const slug = item.href.slice(1);
            const desc = descriptions[slug] ?? "";
            const href = localizeHref(item.href, lang);

            return (
              <ScrollReveal key={item.href} delay={0.07 * i}>
                <Link
                  href={href}
                  className="hover-target group flex items-center justify-between gap-6 border-b border-white/10 py-7 md:py-9 hover:border-[var(--color-accent)]/30 transition-colors duration-300"
                >
                  <div className={`flex items-start gap-6 md:gap-10 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                    <span className="text-[var(--color-accent)] opacity-30 group-hover:opacity-100 transition-opacity duration-300 text-sm font-bold tracking-[2px] mt-1 w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                        {item.label}
                      </h3>
                      <p className="text-[var(--color-body-text)] text-sm md:text-base leading-relaxed max-w-[52ch]">
                        {desc}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[var(--color-accent)] text-2xl shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      isAr ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"
                    }`}
                  >
                    {isAr ? "←" : "→"}
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-4">
        <div className="h-px bg-[var(--color-accent)]/20" />
      </div>

      {/* Contact CTA Section */}
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
  );
}
