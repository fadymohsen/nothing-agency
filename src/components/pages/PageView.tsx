import Image from "next/image";
import Link from "next/link";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import FooterSection from "@/components/ui/FooterSection";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ContactForm from "@/components/ui/ContactForm";
import { sitePages, getPage } from "@/lib/pages";
import { localizeHref, pageHref, type Lang } from "@/lib/lang";
import { t } from "@/data/dictionary";

export default function PageView({ slug, lang }: { slug: string; lang: Lang }) {
  const current = getPage(slug, lang);
  if (!current) return null;

  const { page } = current;
  const index = sitePages.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? getPage(sitePages[index - 1].slug, lang) : undefined;
  const next =
    index < sitePages.length - 1
      ? getPage(sitePages[index + 1].slug, lang)
      : undefined;
  const d = t(lang);

  return (
    <>
      <ParallaxTopShadow>{current.title}</ParallaxTopShadow>

      <section className="relative w-full block pt-[var(--space-hero)] pb-[var(--space-section)] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <ScrollReveal>
            <div className="w-full">
              <Image
                src={current.image}
                alt={current.title}
                width={1200}
                height={800}
                className="w-full h-auto block"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative w-full block pb-[var(--space-section)] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <ScrollReveal delay={0.2}>
            <div className="px-5 xl:px-2">
              <h1 className="text-3xl md:text-5xl font-bold mb-[var(--space-block)] text-white leading-tight max-w-[26ch]">
                {page.heading}
              </h1>
              {page.lead && (
                <p className="text-[1.3rem] font-light leading-relaxed mb-8 text-white/90 max-w-[62ch]">
                  {page.lead}
                </p>
              )}
              {page.paragraphs?.map((para, i) => (
                <p
                  key={i}
                  className="text-[1.15rem] font-light leading-relaxed mb-6 max-w-[68ch]"
                >
                  {para}
                </p>
              ))}

              {page.points && (
                <div className="mt-[var(--space-block)]">
                  {page.pointsTitle && (
                    <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider">
                      {page.pointsTitle}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {page.points.map((pt, i) => (
                      <div key={i} className="border-t border-white/10 pt-6">
                        <h4 className="text-xs uppercase tracking-[2px] text-[var(--color-accent)] mb-3">
                          {String(i + 1).padStart(2, "0")}
                        </h4>
                        <h5 className="text-white text-xl font-bold mb-3">
                          {pt.title}
                        </h5>
                        <p className="font-light leading-relaxed">{pt.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {page.closing && (
                <p className="text-[1.15rem] italic font-light leading-relaxed mt-12">
                  {page.closing}
                </p>
              )}

              {slug === "lets-create" && (
                <div className="mt-16 max-w-[760px]">
                  <ContactForm />
                </div>
              )}

              {page.ctas && (
                <div className="flex flex-wrap gap-4 mt-12">
                  {page.ctas.map((cta, i) => (
                    <Link
                      key={cta.label}
                      href={localizeHref(cta.href, lang)}
                      className={`hover-target inline-block px-10 py-3 uppercase tracking-[2px] text-sm font-bold transition-colors duration-300 ${
                        i === 0
                          ? "bg-[var(--color-accent)] text-[#14171a] hover:bg-white"
                          : "border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#14171a]"
                      }`}
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FooterSection
        shadowText={current.title}
        links={[
          ...(prev ? [{ label: d.prev, href: pageHref(prev.slug, lang) }] : []),
          ...(next ? [{ label: d.next, href: pageHref(next.slug, lang) }] : []),
        ]}
      />
    </>
  );
}
