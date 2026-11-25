import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SectionIntro from "@/components/ui/SectionIntro";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FooterSection from "@/components/ui/FooterSection";
import ContactForm from "@/components/ui/ContactForm";
import IconBadge from "@/components/ui/IconBadge";
import { getContent } from "@/lib/content/server";
import { dictOf } from "@/lib/content/utils";
import type { Lang } from "@/lib/lang";

const LINK = "hover-target text-body-text hover:text-white transition-colors";

function Separator() {
  return (
    <div className="separator-wrap py-4">
      <span className="separator">
        <span className="separator-line dashed" />
      </span>
    </div>
  );
}

export default async function ContactView({ lang }: { lang: Lang }) {
  const content = await getContent();
  const c = dictOf(content, lang).contact;
  const k = content.contact;

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
                      <IconBadge src={k.icons.call} size={30} />
                      <h6 className="!mb-0">{c.call}</h6>
                    </div>
                    <p className="mb-6" dir="ltr">
                      <a href={k.phoneHref} className={LINK}>
                        {k.phoneDisplay}
                      </a>
                    </p>

                    <Separator />

                    <div className="mb-3 flex items-center gap-3">
                      <IconBadge src={k.icons.whatsapp} size={30} />
                      <h6 className="!mb-0">{c.whatsapp}</h6>
                    </div>
                    <p className="mb-6" dir="ltr">
                      <a
                        href={k.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK}
                      >
                        {k.whatsappDisplay}
                      </a>
                    </p>

                    <Separator />

                    <div className="mb-3 flex items-center gap-3">
                      <IconBadge src={k.icons.visit} size={30} />
                      <h6 className="!mb-0">{c.visit}</h6>
                    </div>
                    <p className="mb-6 whitespace-nowrap text-[12.5px] sm:text-[15px]" dir="ltr">
                      <a
                        href={k.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK}
                      >
                        {k.addressLines.map((line, i) => (
                          <span key={i}>
                            {i > 0 && <br />}
                            {line}
                          </span>
                        ))}
                      </a>
                    </p>

                    <Separator />

                    <div className="mb-3 flex items-center gap-3">
                      <IconBadge src={k.icons.email} size={30} />
                      <h6 className="!mb-0">{c.email}</h6>
                    </div>
                    <p>
                      <a href={`mailto:${k.email}`} className={LINK}>
                        {k.email}
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
        links={[{ label: k.email, href: `mailto:${k.email}` }]}
      />
    </>
  );
}
