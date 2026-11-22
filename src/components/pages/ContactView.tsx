import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SectionIntro from "@/components/ui/SectionIntro";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FooterSection from "@/components/ui/FooterSection";
import ContactForm from "@/components/ui/ContactForm";
import { t } from "@/data/dictionary";
import type { Lang } from "@/lib/lang";

export default function ContactView({ lang }: { lang: Lang }) {
  const c = t(lang).contact;

  return (
    <>
      <ParallaxTopShadow>{c.shadow}</ParallaxTopShadow>

      <section className="relative w-full block pt-[var(--space-hero)] pb-[var(--space-block)] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <SectionIntro title={c.title} subtitle={c.subtitle} />
        </div>
      </section>

      <section className="relative w-full block pb-[var(--space-block)] z-10 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <ScrollReveal>
              <p className="text-[1.15rem] font-light leading-relaxed max-w-[760px]">
                {c.intro}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative w-full block pb-[var(--space-section-lg)] z-10 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-8">
              <div>
                <ScrollReveal>
                  <ContactForm />
                </ScrollReveal>
              </div>

              <div>
                <ScrollReveal delay={0.2}>
                  <div className="bg-dark-3 rounded-[0.35rem] p-6 sm:p-8 md:p-10">
                    <h6 className="mb-3">{c.call}</h6>
                    <p className="mb-6" dir="ltr">+20 12 73890104</p>

                    <div className="separator-wrap py-4">
                      <span className="separator">
                        <span className="separator-line dashed" />
                      </span>
                    </div>

                    <h6 className="mb-3">{c.visit}</h6>
                    <p className="mb-6 whitespace-nowrap text-[12.5px] sm:text-[15px]" dir="ltr">
                      2 Almaza Main Street, at the intersection
                      <br />
                      with Al-Thawra Main Street, Office 1
                      <br />
                      Cairo, Egypt
                    </p>

                    <div className="separator-wrap py-4">
                      <span className="separator">
                        <span className="separator-line dashed" />
                      </span>
                    </div>

                    <h6 className="mb-3">{c.email}</h6>
                    <p>
                      <a
                        href="mailto:info@nothing-ads.com"
                        className="hover-target text-body-text hover:text-white transition-colors"
                      >
                        info@nothing-ads.com
                      </a>
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection
        shadowText={c.footerShadow}
        links={[{ label: "info@nothing-ads.com", href: "mailto:info@nothing-ads.com" }]}
      />
    </>
  );
}
