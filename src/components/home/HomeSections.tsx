"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { t } from "@/data/dictionary";
import { useLang } from "@/lib/useLang";
import { localizeHref, type Lang } from "@/lib/lang";
import { sitePages } from "@/lib/pages";
import { pagesAr } from "@/data/pages-ar";

type CardData = {
  description: string;
  image?: string;
  lead?: string;
  tags: string[];
};

function extractTags(points?: { title: string }[]): string[] {
  return (points ?? []).slice(0, 3).map((pt) => {
    const inParen = pt.title.match(/\(([^)]+)\)/)?.[1];
    if (inParen) return inParen;
    const words = pt.title.split(":")[0].trim();
    return words.length > 22 ? words.slice(0, 20).trim() + "…" : words;
  });
}

const enData: Record<string, CardData> = {
  ...Object.fromEntries(
    sitePages.map((p) => [
      p.slug,
      {
        description: p.description,
        image: p.image,
        lead: p.page?.lead ?? p.page?.paragraphs?.[0],
        tags: extractTags(p.page?.points),
      },
    ])
  ),
  contact: {
    description:
      "Whether you're a startup finding your voice or an established brand ready for evolution — we're ready.",
    lead: "Let's build something from nothing together.",
    tags: [],
  },
};

const arData: Record<string, CardData> = {
  ...Object.fromEntries(
    Object.entries(pagesAr)
      .filter(([slug]) => slug !== "home")
      .map(([slug, p]) => {
        const enItem = sitePages.find((sp) => sp.slug === slug);
        return [
          slug,
          {
            description: p.description,
            image: enItem?.image,
            lead: p.page?.lead ?? p.page?.paragraphs?.[0],
            tags: extractTags(p.page?.points),
          },
        ];
      })
  ),
  contact: {
    description: "سواء كنت تبحث عن استشارة تسويقية أو بناء هوية بصرية من الصفر — نحن هنا.",
    lead: "لنبني شيئاً من اللاشيء معاً.",
    tags: [],
  },
};

function PageCard({
  item,
  index,
  d,
  lang,
  featured,
}: {
  item: { label: string; href: string };
  index: number;
  d: CardData;
  lang: Lang;
  featured?: boolean;
}) {
  const isAr = lang === "ar";
  const href = localizeHref(item.href, lang);
  const slug = item.href.slice(1);
  const isContact = slug === "contact";
  const arrow = isAr ? "←" : "→";

  /* ── Contact card ───────────────────────────────────────────── */
  if (isContact) {
    return (
      <ScrollReveal delay={0.08} className="md:col-span-2">
        <Link
          href={href}
          className="hover-target group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-[var(--color-dark-3)] border border-white/5 hover:border-[var(--color-accent)]/40 transition-all duration-500 p-10 md:p-14 overflow-hidden"
        >
          {/* ghost number */}
          <span
            className={`absolute text-[10rem] font-bold leading-none text-white/[0.025] select-none pointer-events-none top-2 ${
              isAr ? "left-6" : "right-6"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className={isAr ? "text-right" : ""}>
            <p className="text-[var(--color-accent)] text-xs uppercase tracking-[3px] mb-3">
              {isAr ? "تواصل معنا" : "Get in Touch"}
            </p>
            <h3 className="text-white text-2xl md:text-4xl font-bold mb-3 max-w-[20ch] leading-tight group-hover:text-[var(--color-accent)] transition-colors duration-300">
              {item.label}
            </h3>
            <p className="text-[var(--color-body-text)] text-sm md:text-base max-w-[50ch] leading-relaxed">
              {d.description}
            </p>
          </div>

          <span
            className={`text-[var(--color-accent)] text-3xl shrink-0 opacity-40 group-hover:opacity-100 transition-all duration-300 ${
              isAr ? "group-hover:-translate-x-3" : "group-hover:translate-x-3"
            }`}
          >
            {arrow}
          </span>
        </Link>
      </ScrollReveal>
    );
  }

  /* ── Regular / featured card ────────────────────────────────── */
  return (
    <ScrollReveal delay={0.07 * index} className={featured ? "md:col-span-2" : ""}>
      <Link
        href={href}
        className={`hover-target group relative overflow-hidden flex flex-col justify-between ${
          featured ? "min-h-[500px]" : "min-h-[380px]"
        }`}
      >
        {/* Background image */}
        {d.image && (
          <Image
            src={d.image}
            alt={item.label}
            fill
            className="object-cover opacity-30 group-hover:opacity-45 group-hover:scale-[1.04] transition-all duration-700 ease-out"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-body)] via-[var(--color-body)]/55 to-transparent" />

        {/* Card content */}
        <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">

          {/* Top: number + arrow */}
          <div className={`flex items-center justify-between ${isAr ? "flex-row-reverse" : ""}`}>
            <span className="text-[var(--color-accent)] text-xs font-bold tracking-[4px] opacity-40 group-hover:opacity-100 transition-opacity duration-300">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-[var(--color-accent)] text-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
              }`}
            >
              {arrow}
            </span>
          </div>

          {/* Bottom: text */}
          <div className={isAr ? "text-right" : ""}>
            <h3
              className={`text-white font-bold leading-tight mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300 ${
                featured ? "text-3xl md:text-[2.8rem]" : "text-2xl md:text-[1.8rem]"
              }`}
            >
              {item.label}
            </h3>

            <p className="text-[var(--color-body-text)] text-sm md:text-[15px] leading-relaxed mb-4 max-w-[50ch]">
              {d.description}
            </p>

            {/* Lead excerpt — featured only */}
            {featured && d.lead && (
              <p className="text-white/45 text-sm leading-relaxed mb-5 max-w-[64ch] hidden md:block">
                {d.lead.length > 170 ? d.lead.slice(0, 168) + "…" : d.lead}
              </p>
            )}

            {/* Tags */}
            {d.tags.length > 0 && (
              <div className={`flex flex-wrap gap-2 ${isAr ? "justify-end" : ""}`}>
                {d.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[var(--color-accent)]/55 text-[11px] uppercase tracking-[1px] border border-[var(--color-accent)]/20 px-2.5 py-[5px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export default function HomeSections() {
  const lang = useLang();
  const nav = t(lang).nav;
  const isAr = lang === "ar";
  const data = isAr ? arData : enData;

  // Nav order: [About Us, What We Do, Manifesto, From Nothing, Unseen, Contact]
  const featured = nav[0];
  const middle = nav.slice(1, 5);
  const contact = nav[5];

  return (
    <div className="relative z-10 bg-[var(--color-body)]" dir={isAr ? "rtl" : "ltr"}>
      <section className="py-[var(--space-section-lg)]">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4">

          {/* Eyebrow */}
          <ScrollReveal>
            <div className={`flex items-center gap-4 mb-10 ${isAr ? "flex-row-reverse" : ""}`}>
              <div className="h-px w-8 bg-[var(--color-accent)]" />
              <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-xs">
                {isAr ? "استكشف" : "Explore"}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Featured — full width */}
            <PageCard
              item={featured}
              index={0}
              d={data[featured.href.slice(1)] ?? { description: "", tags: [] }}
              lang={lang}
              featured
            />

            {/* Middle 4 — 2-col grid */}
            {middle.map((item, i) => (
              <PageCard
                key={item.href}
                item={item}
                index={i + 1}
                d={data[item.href.slice(1)] ?? { description: "", tags: [] }}
                lang={lang}
              />
            ))}

            {/* Contact — full width */}
            {contact && (
              <PageCard
                item={contact}
                index={5}
                d={data["contact"]}
                lang={lang}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
