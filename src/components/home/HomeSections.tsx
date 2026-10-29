"use client";

import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { blogPosts } from "@/data/blog";

export default function HomeSections() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="relative z-10 bg-[var(--color-body)]">
      {/* News Section */}
      <section className="py-[120px] md:py-[160px]">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-sm mb-4">
              Latest News
            </p>
            <h2 className="text-white text-[36px] md:text-[56px] font-bold leading-tight mb-12">
              Stories & Insights
            </h2>
          </ScrollReveal>

          <div className="space-y-10">
            {latestPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={0.1 * (i + 1)}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover-target group block border-b border-white/10 pb-8"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[var(--color-body-text)] text-sm md:text-base">
                        {post.excerpt}
                      </p>
                    </div>
                    <p className="text-white/40 text-sm whitespace-nowrap">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="hover-target inline-block border border-[var(--color-accent)] text-[var(--color-accent)] px-10 py-3 uppercase tracking-[2px] text-sm transition-all hover:bg-[var(--color-accent)] hover:text-[var(--color-body)]"
              >
                Read All News
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-4">
        <div className="h-px bg-[var(--color-accent)]/20" />
      </div>

      {/* Contact Section */}
      <section className="py-[120px] md:py-[160px]">
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
              className="hover-target inline-block bg-[var(--color-accent)] text-[#0a0a0a] px-12 py-4 uppercase tracking-[2px] text-sm font-bold transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(240,179,28,0.35)]"
            >
              Say Hello
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
