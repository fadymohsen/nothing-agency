import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SectionIntro from "@/components/ui/SectionIntro";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FooterSection from "@/components/ui/FooterSection";
import ContactForm from "@/components/ui/ContactForm";
import IconBadge from "@/components/ui/IconBadge";
import { icon } from "@/data/scenes";
import { t } from "@/data/dictionary";
import type { Lang } from "@/lib/lang";

const LINK = "hover-target text-body-text hover:text-white transition-colors";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=2+Almaza+Al-Thawra+Main+Street+Cairo+Egypt";

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
                    <div className="mb-3 flex items-center gap-3">
                      <IconBadge src={icon("chat")} size={30} />
                      <h6 className="!mb-0">{c.call}</h6>
                    </div>
                    <p className="mb-6" dir="ltr">
                      <a href="tel:+201273890104" className={LINK}>
                        +20 12 73890104
                      </a>
                    </p>

                    <div className="separator-wrap py-4">
                      <span className="separator">
                        <span className="separator-line dashed" />
                      </span>
                    </div>

                    <div className="mb-3 flex items-center gap-3">
                      <IconBadge src={icon("network")} size={30} />
                      <h6 className="!mb-0">{c.whatsapp}</h6>
                    </div>
                    <p className="mb-6" dir="ltr">
                      <a
                        href="https://wa.me/201000108068"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK}
                      >
                        +20 100 010 8068
                      </a>
                    </p>

                    <div className="separator-wrap py-4">
                      <span className="separator">
                        <span className="separator-line dashed" />
                      </span>
                    </div>

                    <div className="mb-3 flex items-center gap-3">
                      <IconBadge src={icon("handshake")} size={30} />
                      <h6 className="!mb-0">{c.visit}</h6>
                    </div>
                    <p className="mb-6 whitespace-nowrap text-[12.5px] sm:text-[15px]" dir="ltr">
                      <a
                        href={MAPS}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK}
                      >
                        2 Almaza / Al-Thawra Main Street, Office 1
                        <br />
                        Cairo, Egypt
                      </a>
                    </p>

                    <div className="separator-wrap py-4">
                      <span className="separator">
                        <span className="separator-line dashed" />
                      </span>
                    </div>

                    <div className="mb-3 flex items-center gap-3">
                      <IconBadge src={icon("mail")} size={30} />
                      <h6 className="!mb-0">{c.email}</h6>
                    </div>
                    <p>
                      <a
                        href="mailto:info@nothing-ads.com"
                        className={LINK}
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
