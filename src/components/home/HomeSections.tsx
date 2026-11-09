"use client";

import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { t } from "@/data/dictionary";
import { useLang } from "@/lib/useLang";

export default function HomeSections() {
  const lang = useLang();

  if (lang === "ar") {
    const h = t("ar").home;
    return (
      <div className="relative z-10 bg-[var(--color-body)]" dir="rtl">
        <section className="py-[var(--space-section-lg)]">
          <div className="max-w-[1140px] mx-auto px-6 md:px-4 text-center">
            <ScrollReveal>
              <p className="text-[var(--color-accent)] text-sm mb-4">{h.eyebrow}</p>
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
                href="/ar/contact"
                className="hover-target inline-block bg-[var(--color-accent)] text-[#14171a] px-12 py-4 text-sm font-bold transition-colors duration-300 hover:bg-white"
              >
                {h.cta}
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative z-10 bg-[var(--color-body)]">
      {/* Contact Section */}
      <section className="py-[var(--space-section-lg)]">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4 text-center">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-sm mb-4">
              Get in Touch
            </p>
            <h2 className="text-white text-[36px] md:text-[56px] font-bold leading-tight mb-6">
              Let&apos;s create<br />something together
            </h2>
            <p className="text-[var(--color-body-text)] text-lg max-w-[500px] mx-auto mb-12">
              Have a project in mind? We&apos;d love to hear about it. Drop us a
              line and let&apos;s start a conversation.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link
              href="/contact"
              className="hover-target inline-block bg-[var(--color-accent)] text-[#14171a] px-12 py-4 uppercase tracking-[2px] text-sm font-bold transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(240,179,28,0.35)]"
            >
              Say Hello
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
