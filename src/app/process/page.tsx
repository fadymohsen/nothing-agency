import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FooterSection from "@/components/ui/FooterSection";
import Link from "next/link";

export const metadata = {
  title: "Our Process",
  description:
    "Discover how Nothing Creative Ad Studio brings ideas to life — from discovery and strategy through design, development, and launch.",
};

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Every great project begins with understanding. We dive deep into your brand, market, and audience through research, audits, and open conversations. We listen more than we talk — because the best solutions come from truly understanding the problem.",
    details: ["Brand Audit", "Market Research", "Competitor Analysis", "Stakeholder Interviews", "Goal Definition"],
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "With insights in hand, we craft a strategic foundation for your project. This is where we define the creative direction, set measurable goals, and map the journey from concept to completion. Strategy without creativity is boring; creativity without strategy is chaos.",
    details: ["Creative Brief", "Target Audience Mapping", "Brand Positioning", "Content Strategy", "Project Roadmap"],
  },
  {
    number: "03",
    title: "Design",
    description:
      "This is where ideas become visual. We explore, iterate, and refine — creating designs that don't just look beautiful, but work beautifully. Every color, typeface, and layout decision is driven by strategy and crafted with obsessive attention to detail.",
    details: ["Concept Development", "Wireframing", "Visual Design", "Prototyping", "Design Iteration"],
  },
  {
    number: "04",
    title: "Development",
    description:
      "Design meets engineering. We build with precision, ensuring every interaction feels smooth, every animation is intentional, and every line of code serves a purpose. We don't cut corners — we craft corners.",
    details: ["Frontend Development", "Animation & Motion", "CMS Integration", "Quality Assurance", "Performance Optimization"],
  },
  {
    number: "05",
    title: "Launch & Support",
    description:
      "Going live is just the beginning. We ensure a smooth launch, then continue to monitor, measure, and optimize. Your success is our success, and we stick around to make sure everything performs at its best.",
    details: ["Deployment", "Analytics Setup", "Performance Monitoring", "Ongoing Optimization", "Growth Support"],
  },
];

const highlights = [
  {
    title: "Transparent Communication",
    description:
      "You're never left guessing. We keep you in the loop at every stage with regular updates, clear timelines, and open feedback channels.",
  },
  {
    title: "Iterative Refinement",
    description:
      "Good isn't good enough. We refine, test, and polish until every element meets our exacting standards — and exceeds your expectations.",
  },
  {
    title: "Results-Driven Approach",
    description:
      "Beautiful design is meaningless without impact. Every decision we make is rooted in strategy and aimed at delivering measurable results.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <ParallaxTopShadow>Process</ParallaxTopShadow>

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[4px] text-sm mb-5 text-center">
              Our Process
            </p>
            <h1 className="text-white text-[42px] md:text-[64px] lg:text-[80px] font-bold leading-[1.1] text-center mb-6">
              How we bring
              <br />
              <span className="text-[var(--color-accent)]">ideas to life</span>
            </h1>
            <p className="text-[var(--color-body-text)] text-lg md:text-xl max-w-[650px] mx-auto text-center leading-relaxed">
              A proven creative process that transforms raw concepts into
              polished, impactful work — every single time.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-[80px] md:py-[120px] relative z-10">
        <div className="max-w-[900px] mx-auto px-6 md:px-4">
          <div className="process-timeline">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.1 * (i + 1)}>
                <div className="process-step">
                  <div className="process-step-marker">
                    <span className="process-step-number">{step.number}</span>
                    {i < processSteps.length - 1 && <div className="process-step-line" />}
                  </div>
                  <div className="process-step-content">
                    <h3 className="text-white text-[28px] md:text-[36px] font-bold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-body-text)] text-base md:text-[17px] leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {step.details.map((detail) => (
                        <span key={detail} className="process-tag">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-4">
        <div className="h-px bg-white/10" />
      </div>

      {/* Why It Works */}
      <section className="py-[100px] md:py-[140px] relative z-10">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-sm mb-4 text-center">
              Why It Works
            </p>
            <h2 className="text-white text-[32px] md:text-[48px] font-bold leading-tight mb-16 text-center">
              Built for excellence
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {highlights.map((item, i) => (
              <ScrollReveal key={item.title} delay={0.15 * (i + 1)}>
                <div className="highlight-card">
                  <div className="highlight-card-accent" />
                  <h5 className="text-white text-xl font-bold mb-4">{item.title}</h5>
                  <p className="text-[var(--color-body-text)] text-[15px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-4">
        <div className="h-px bg-white/10" />
      </div>

      {/* CTA */}
      <section className="py-[100px] md:py-[140px] relative z-10">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4 text-center">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-sm mb-4">
              Start Your Project
            </p>
            <h2 className="text-white text-[36px] md:text-[56px] font-bold leading-tight mb-6">
              Let&apos;s build
              <br />something amazing
            </h2>
            <p className="text-[var(--color-body-text)] text-lg max-w-[550px] mx-auto mb-12">
              Ready to see our process in action? Tell us about your project
              and let&apos;s bring your vision to life.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link
              href="/contact"
              className="hover-target inline-block bg-[var(--color-accent)] text-[var(--color-body)] px-12 py-4 uppercase tracking-[2px] text-sm font-bold transition-all hover:opacity-90"
            >
              Start a Project
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <FooterSection
        shadowText="Process"
        links={[{ label: "See Our Work", href: "/portfolio" }]}
      />
    </>
  );
}
