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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <ContactForm />
                </ScrollReveal>
              </div>

              <div>
                <ScrollReveal delay={0.2}>
                  <div className="bg-dark-3 rounded-[0.35rem] p-10">
                    <h6 className="mb-3">{c.call}</h6>
                    <p className="mb-6" dir="ltr">+1 234 567 890</p>

                    <div className="separator-wrap py-4">
                      <span className="separator">
                        <span className="separator-line dashed" />
                      </span>
                    </div>

                    <h6 className="mb-3">{c.visit}</h6>
                    <p className="mb-6" dir="ltr">
                      123 Creative Street
                      <br />
                      Design District
                      <br />
                      New York, NY 10001
                    </p>

                    <div className="separator-wrap py-4">
                      <span className="separator">
                        <span className="separator-line dashed" />
                      </span>
                    </div>

                    <h6 className="mb-3">{c.email}</h6>
                    <p>
                      <a
                        href="mailto:hello@nothingagency.com"
                        className="hover-target text-body-text hover:text-white transition-colors"
                      >
                        hello@nothingagency.com
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
        links={[{ label: "hello@nothingagency.com", href: "mailto:hello@nothingagency.com" }]}
      />
    </>
  );
}
