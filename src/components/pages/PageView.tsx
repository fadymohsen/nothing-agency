import Image from "next/image";
import Link from "next/link";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import FooterSection from "@/components/ui/FooterSection";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ParallaxLayer from "@/components/animations/ParallaxLayer";
import HeadlineReveal from "@/components/animations/HeadlineReveal";
import WordReveal from "@/components/animations/WordReveal";
import ContactForm from "@/components/ui/ContactForm";
import ServiceDeck from "@/components/scenes/ServiceDeck";
import ValuesStrip from "@/components/scenes/ValuesStrip";
import StickySteps from "@/components/scenes/StickySteps";
import VoidStage from "@/components/scenes/VoidStage";
import DraftsGallery from "@/components/scenes/DraftsGallery";
import { sitePages, getPage } from "@/lib/pages";
import { localizeHref, pageHref, type Lang } from "@/lib/lang";
import { t } from "@/data/dictionary";
import { scenes } from "@/data/scenes";

/** Pages whose paragraphs read in word by word as they scroll past */
const READ_IN = new Set(["about-us", "from-nothing", "unseen"]);

/** Wraps occurrences of "Nothing" / "Nothing Agency" in gold accent color */
function brandText(text: string) {
  const parts = text.split(/(Nothing Agency|Nothing|Creators of Impact|The Anatomy of Creativity)/g);
  return parts.map((part, i) =>
    part === "Nothing Agency" || part === "Nothing" || part === "Creators of Impact" || part === "The Anatomy of Creativity" ? (
      <span key={i} className="text-[var(--color-accent)]">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function PageView({ slug, lang }: { slug: string; lang: Lang }) {
  const current = getPage(slug, lang);
  if (!current) return null;

  const { page } = current;
  const scene = scenes[slug];
  const index = sitePages.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? getPage(sitePages[index - 1].slug, lang) : undefined;
  const next =
    index < sitePages.length - 1
      ? getPage(sitePages[index + 1].slug, lang)
      : undefined;
  const d = t(lang);
  const readIn = READ_IN.has(slug);

  return (
    <>
      <ParallaxTopShadow>{current.title}</ParallaxTopShadow>

      {/* Hero: backdrop drifts slower than the page, headline rises out of a mask */}
      <section className="relative w-full overflow-hidden z-10 min-h-[560px] md:min-h-[620px] flex items-end">
        <ParallaxLayer>
          <style>{`@media (max-width:767px){.hero-photo{object-position:var(--hp,50% 50%) !important}}`}</style>
          <Image
            src={current.image}
            alt={current.title}
            fill
            sizes="100vw"
            className="hero-photo object-cover opacity-40"
            style={{ "--hp": current.focusMobile } as React.CSSProperties}
            priority
          />
        </ParallaxLayer>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-body)] via-[var(--color-body)]/50 to-transparent" />
        <div className="relative z-10 w-full max-w-[1140px] mx-auto px-6 md:px-10 pt-[var(--space-hero)] pb-14 md:pb-20">
          <HeadlineReveal
            text={current.title}
            className="text-white font-bold leading-[1.1] text-[clamp(2.8rem,7vw,6.5rem)]"
          />
          <ScrollReveal direction="left" delay={0.9}>
            <div className="mt-6 h-[2px] w-[80px] bg-[var(--color-accent)]" />
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="relative w-full block pb-[var(--space-section)] z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">

            {/* Page heading, hidden when it repeats the hero title */}
            {page.heading !== current.title && (
              <ScrollReveal direction="left" delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-bold mb-[var(--space-block)] text-white leading-tight max-w-[26ch]">
                  {brandText(page.heading)}
                </h2>
              </ScrollReveal>
            )}

            {/* Lead */}
            {page.lead && (
              <ScrollReveal delay={0.15}>
                <p className="text-[1.3rem] font-light leading-relaxed mb-8 text-white/90 max-w-[62ch]">
                  {brandText(page.lead)}
                </p>
              </ScrollReveal>
            )}

            {/* Paragraphs */}
            {scene?.type !== "story" && page.paragraphs?.map((para, i) =>
              readIn ? (
                <WordReveal
                  key={i}
                  text={para}
                  className="text-[1.15rem] md:text-[1.3rem] font-light leading-relaxed mb-8 max-w-[68ch]"
                />
              ) : (
                <ScrollReveal key={i} delay={0.12 * (i + 1)}>
                  <p className="text-[1.15rem] font-light leading-relaxed mb-6 max-w-[68ch]">
                    {brandText(para)}
                  </p>
                </ScrollReveal>
              )
            )}

            {/* Points without a dedicated scene keep the plain grid */}
            {page.points && !scene && (
              <div className="mt-[var(--space-block)]">
                {page.pointsTitle && (
                  <ScrollReveal delay={0.1}>
                    <div className="mb-12">
                      <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-xs mb-3">
                        {page.pointsTitle}
                      </p>
                      <div className="h-px w-12 bg-[var(--color-accent)]/30" />
                    </div>
                  </ScrollReveal>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {page.points.map((pt, i) => (
                    <ScrollReveal key={i} delay={0.12 * (i + 1)} direction="left">
                      <div className="border-l-2 border-[var(--color-accent)] pl-6 py-1 group">
                        <span className="text-[var(--color-accent)] text-[2.8rem] font-bold leading-none opacity-20 block mb-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h5 className="text-white text-xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                          {pt.title}
                        </h5>
                        <p className="font-light leading-relaxed">{pt.text}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}

            {/* Scene intro label */}
            {scene && page.points && scene.type !== "story" && scene.type !== "drafts" && page.pointsTitle && (
              <ScrollReveal delay={0.1}>
                <div className="mt-[var(--space-block)] mb-12">
                  <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-xs mb-3">
                    {page.pointsTitle}
                  </p>
                  <div className="h-px w-12 bg-[var(--color-accent)]/30" />
                </div>
              </ScrollReveal>
            )}

            {scene?.type === "values" && page.points && (
              <ValuesStrip points={page.points} images={scene.images} />
            )}
          </div>
        </div>
      </section>

      {scene?.type === "services" && page.points && (
        <section className="relative z-10 w-full">
          <div className="max-w-[1140px] mx-auto px-4">
            <div className="px-5 xl:px-2">
              <ServiceDeck points={page.points} images={scene.images} />
            </div>
          </div>
        </section>
      )}

      {/* Pinned scenes need full-width, non-clipping sections */}
      {scene?.type === "steps" && page.points && (
        <section className="relative z-10 w-full">
          <div className="max-w-[1140px] mx-auto px-4">
            <div className="px-5 xl:px-2">
              <StickySteps
                steps={page.points.map((p) => ({ title: p.title, text: p.text }))}
                images={scene.images}
              />
            </div>
          </div>
        </section>
      )}

      {scene?.type === "story" && page.paragraphs && (
        <section className="relative z-10 w-full">
          <div className="max-w-[1140px] mx-auto px-4">
            <div className="px-5 xl:px-2">
              <VoidStage paragraphs={page.paragraphs} images={scene.images} />
            </div>
          </div>
        </section>
      )}

      {scene?.type === "drafts" && (
        <section className="relative z-10 w-full">
          <DraftsGallery
            images={scene.images}
            finalImage={scene.final}
            finalLabel={d.scene.final}
          />
        </section>
      )}

      {/* Closing, form and calls to action */}
      {(page.closing || page.ctas || slug === "lets-create") && (
        <section className="relative w-full block pb-[var(--space-section)] overflow-hidden z-10">
          <div className="max-w-[1140px] mx-auto px-4">
            <div className="px-5 xl:px-2">
              {page.closing && (
                <ScrollReveal delay={0.2}>
                  <p className="text-[1.15rem] italic font-light leading-relaxed border-l-2 border-[var(--color-accent)]/40 pl-6 text-white/80 max-w-[68ch]">
                    {brandText(page.closing)}
                  </p>
                </ScrollReveal>
              )}

              {slug === "lets-create" && (
                <div className="mt-16 max-w-[760px]">
                  <ContactForm />
                </div>
              )}

              {page.ctas && (
                <ScrollReveal delay={0.2}>
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
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      <FooterSection
        shadowText={current.title}
        links={[
          ...(prev ? [{ label: prev.title, href: pageHref(prev.slug, lang) }] : []),
          ...(next ? [{ label: next.title, href: pageHref(next.slug, lang) }] : []),
        ]}
      />
    </>
  );
}
