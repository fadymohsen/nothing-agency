import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FooterSection from "@/components/ui/FooterSection";
import Link from "next/link";

export const metadata = {
  title: "Who We Are",
  description:
    "Nothing Creative Ad Studio — A team of passionate creatives crafting bold brand identities, advertising campaigns, and digital experiences.",
};

const stats = [
  { number: "50+", label: "Projects Delivered" },
  { number: "8+", label: "Years of Experience" },
  { number: "30+", label: "Happy Clients" },
  { number: "15+", label: "Creative Awards" },
];

const services = [
  {
    title: "Branding",
    description:
      "We build brands from the ground up — crafting identities that resonate, tell stories, and stand the test of time. From logo design to full brand systems, every element is intentional.",
    items: ["Brand Identity", "Visual Design", "Logo Design", "Brand Strategy", "Brand Guidelines"],
  },
  {
    title: "Digital",
    description:
      "We design and develop digital experiences that captivate audiences and drive results. Every pixel serves a purpose, every interaction feels effortless.",
    items: ["Web Design", "UI/UX Design", "Mobile Apps", "E-Commerce", "Development"],
  },
  {
    title: "Motion",
    description:
      "We bring ideas to life through movement. From cinematic storytelling to dynamic motion graphics, we create content that demands attention.",
    items: ["Animation", "Video Production", "Motion Graphics", "3D Visualization", "Film Direction"],
  },
];

const values = [
  {
    title: "Innovation",
    description: "We push boundaries and explore new creative territories, never settling for the expected.",
  },
  {
    title: "Collaboration",
    description: "Great work happens together. We partner closely with our clients at every step of the journey.",
  },
  {
    title: "Excellence",
    description: "Every detail matters. We pursue perfection in craft, from concept to final delivery.",
  },
  {
    title: "Passion",
    description: "We love what we do. That passion fuels our creativity and drives us to deliver our best work.",
  },
];

export default function StudioPage() {
  return (
    <>
      <ParallaxTopShadow>Studio</ParallaxTopShadow>

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[4px] text-sm mb-5 text-center">
              Who We Are
            </p>
            <h1 className="text-white text-[42px] md:text-[64px] lg:text-[80px] font-bold leading-[1.1] text-center mb-6">
              We are Nothing.
              <br />
              <span className="text-[var(--color-accent)]">And that&apos;s everything.</span>
            </h1>
            <p className="text-[var(--color-body-text)] text-lg md:text-xl max-w-[700px] mx-auto text-center leading-relaxed">
              A creative ad studio where bold ideas meet fearless execution.
              We don&apos;t follow trends — we set them.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission + Stats */}
      <section className="py-[100px] md:py-[140px] relative z-10">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-sm mb-4">
                Our Mission
              </p>
              <h2 className="text-white text-[32px] md:text-[44px] font-bold leading-tight mb-6">
                Turning nothing into
                <br />something remarkable
              </h2>
              <p className="text-[var(--color-body-text)] text-base md:text-lg leading-relaxed mb-6">
                Founded on the belief that the most powerful ideas start from nothing,
                we transform blank canvases into compelling brand stories. Our studio
                blends strategic thinking with creative audacity to deliver work that
                doesn&apos;t just look good — it moves people.
              </p>
              <p className="text-[var(--color-body-text)] text-base md:text-lg leading-relaxed">
                We work with ambitious brands who refuse to blend in. Whether you&apos;re
                a startup finding your voice or an established brand ready for evolution,
                we bring the creative firepower to make it happen.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={0.1 * (i + 1)}>
                  <div className="stat-card">
                    <span className="stat-card-number">{stat.number}</span>
                    <span className="stat-card-label">{stat.label}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-4">
        <div className="h-px bg-white/10" />
      </div>

      {/* Philosophy */}
      <section className="py-[100px] md:py-[140px] relative z-10">
        <div className="max-w-[900px] mx-auto px-6 md:px-4 text-center">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-sm mb-6">
              Our Philosophy
            </p>
            <h3 className="text-white text-[28px] md:text-[40px] font-light leading-relaxed">
              We believe that <span className="text-[var(--color-accent)] font-bold">great design</span> is
              invisible — it feels natural, effortless, and inevitable. But behind that simplicity lies{" "}
              <span className="text-[var(--color-accent)] font-bold">relentless craft</span>, deep
              understanding, and a refusal to compromise on{" "}
              <span className="text-[var(--color-accent)] font-bold">quality</span>.
            </h3>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-4">
        <div className="h-px bg-white/10" />
      </div>

      {/* What We Do */}
      <section className="py-[100px] md:py-[140px] relative z-10">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-sm mb-4 text-center">
              What We Do
            </p>
            <h2 className="text-white text-[32px] md:text-[48px] font-bold leading-tight mb-16 text-center">
              Services built for impact
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={0.15 * (i + 1)}>
                <div className="service-card">
                  <div className="service-card-number">0{i + 1}</div>
                  <h4 className="text-white text-2xl font-bold mb-4">{service.title}</h4>
                  <p className="text-[var(--color-body-text)] text-[15px] leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="studio-list">
                    {service.items.map((item) => (
                      <li key={item}>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
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

      {/* Values */}
      <section className="py-[100px] md:py-[140px] relative z-10">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-sm mb-4 text-center">
              Core Values
            </p>
            <h2 className="text-white text-[32px] md:text-[48px] font-bold leading-tight mb-16 text-center">
              What drives us
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={0.1 * (i + 1)}>
                <div className="value-card">
                  <div className="value-card-icon">{value.title.charAt(0)}</div>
                  <h5 className="text-white text-xl font-bold mb-3">{value.title}</h5>
                  <p className="text-[var(--color-body-text)] text-sm leading-relaxed">
                    {value.description}
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

      {/* Quote */}
      <section className="py-[100px] md:py-[140px] relative z-10">
        <div className="max-w-[900px] mx-auto px-6 md:px-4">
          <ScrollReveal>
            <div className="blockquote-custom">
              <h3>
                Design is not just what it looks like and feels like. Design
                is how it works.
              </h3>
              <p className="mt-6 text-white/60">— Steve Jobs</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] md:py-[140px] relative z-10">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4 text-center">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[3px] text-sm mb-4">
              Let&apos;s Talk
            </p>
            <h2 className="text-white text-[36px] md:text-[56px] font-bold leading-tight mb-6">
              Ready to create
              <br />something bold?
            </h2>
            <p className="text-[var(--color-body-text)] text-lg max-w-[500px] mx-auto mb-12">
              We&apos;re always looking for ambitious brands and exciting projects.
              Let&apos;s start a conversation.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link
              href="/contact"
              className="hover-target inline-block bg-[var(--color-accent)] text-[var(--color-body)] px-12 py-4 uppercase tracking-[2px] text-sm font-bold transition-all hover:opacity-90"
            >
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <FooterSection
        shadowText="Studio"
        links={[{ label: "Start a Project", href: "/contact" }]}
      />
    </>
  );
}
