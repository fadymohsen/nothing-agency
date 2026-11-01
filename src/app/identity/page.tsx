import ScrollReveal from "@/components/animations/ScrollReveal";
import IdentityHero from "@/components/identity/IdentityHero";
import FooterSection from "@/components/ui/FooterSection";
import Image from "next/image";

export const metadata = {
  title: "Our Identity",
  description:
    "The Nothing brand identity — our symbol, our philosophy, and the system behind everything we create.",
};

export default function IdentityPage() {
  return (
    <div className="bg-[#2D3239]">
      {/* Section 1 — Hero: Everything Starts As */}
      <IdentityHero />

      {/* Section 2 — Philosophy */}
      <section className="relative z-10 py-[100px] md:py-[140px]">
        <div className="max-w-[900px] mx-auto px-6 md:px-4">
          <ScrollReveal>
            <p className="text-[var(--color-body-text)] text-lg md:text-xl leading-relaxed mb-10">
              Before an idea has a name, a shape or a campaign plan, there is
              nothing &mdash; a blank space with no inherited answers and no
              limits... That is where we begin.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-white text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">
              It is possibility before it takes form. We turn business problems
              into ideas, ideas into systems, and systems into experiences people
              remember.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-4">
        <div className="h-px bg-[var(--color-accent)]/20" />
      </div>

      {/* Section 3 — The Symbol */}
      <section className="relative z-10 py-[100px] md:py-[140px]">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Logo Display */}
            <ScrollReveal>
              <div className="flex justify-center">
                <Image
                  src="/images/nothing-logo.png"
                  alt="Nothing Symbol"
                  width={480}
                  height={160}
                  className="w-full max-w-[480px]"
                />
              </div>
            </ScrollReveal>

            {/* Symbol Description */}
            <div>
              <ScrollReveal>
                <p className="text-[var(--color-body-text)] text-base md:text-lg leading-relaxed mb-6">
                  The symbol begins with an open space &mdash; a possibility
                  without limits.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-[var(--color-body-text)] text-base md:text-lg leading-relaxed mb-6">
                  Inspired by Phi (<span className="text-[var(--color-accent)] font-bold">&Phi;</span>),
                  the mark brings a mathematical sense of logic, proportion, and
                  connection into the identity.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-[var(--color-body-text)] text-base md:text-lg leading-relaxed mb-6">
                  Its open circular form represents the limitless space where
                  ideas begin, while the diagonal stroke breaks through that
                  space creating movement, direction, and form.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-white text-base md:text-lg leading-relaxed">
                  It reflects the role of Nothing: starting with nothing, finding
                  the connection, and turning possibility into something people
                  remember.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-4">
        <div className="h-px bg-[var(--color-accent)]/20" />
      </div>

      {/* Section 4 — Logo Proportional System */}
      <section className="relative z-10 py-[100px] md:py-[140px]">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[4px] text-sm mb-5">
              Proportional System
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <ScrollReveal delay={0.1}>
              <div className="relative w-full h-full min-h-[300px] rounded-sm overflow-hidden">
                <Image
                  src="/images/identity-symbol-sculpture.png"
                  alt="The Nothing symbol as a golden sculpture with dramatic lighting"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal delay={0.2}>
                <p className="text-[var(--color-body-text)] text-base md:text-lg leading-relaxed mb-6">
                  The horizontal version of the Nothing logo follows a defined
                  proportional system to maintain consistency and visual balance.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-[var(--color-body-text)] text-base md:text-lg leading-relaxed mb-6">
                  The symbol height is equal to 4&times; the height of the
                  initial &ldquo;n&rdquo; in the wordmark. The horizontal
                  spacing between the symbol and the wordmark is defined by 1 of
                  the &ldquo;n&rdquo; height, establishing a consistent visual
                  unit across the logo.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p className="text-white text-base md:text-lg leading-relaxed">
                  This proportional system ensures that the symbol and wordmark
                  maintain their intended relationship regardless of size or
                  application.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-4">
        <div className="h-px bg-[var(--color-accent)]/20" />
      </div>

      {/* Section 5 — Symbol Integration */}
      <section className="relative z-10 py-[100px] md:py-[140px]">
        <div className="max-w-[1140px] mx-auto px-6 md:px-4">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] uppercase tracking-[4px] text-sm mb-5">
              Symbol Integration
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <ScrollReveal delay={0.1}>
              <div className="relative w-full h-full min-h-[300px] rounded-sm overflow-hidden">
                <Image
                  src="/images/identity-symbol-pedestal.png"
                  alt="The Nothing symbol sculpture on a pedestal with golden lighting"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal delay={0.2}>
                <p className="text-[var(--color-body-text)] text-base md:text-lg leading-relaxed mb-6">
                  The Nothing symbol can also be integrated directly into the
                  wordmark, replacing the letter &ldquo;O&rdquo; in Nothing.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-[var(--color-body-text)] text-base md:text-lg leading-relaxed mb-6">
                  This creates a more distinctive and memorable expression of the
                  brand, allowing the symbol to become an integral part of the
                  name rather than functioning as a separate graphic element.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p className="text-[var(--color-body-text)] text-base md:text-lg leading-relaxed mb-6">
                  The integration reinforces the connection between the brand name
                  and its visual identity, creating a compact and recognizable
                  mark while preserving the original character of the Nothing
                  symbol.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.5}>
                <p className="text-white text-xl md:text-2xl font-light leading-relaxed">
                  The symbol becomes the &ldquo;O&rdquo; &mdash; turning the name
                  itself into the identity.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <FooterSection
        shadowText="Identity"
        links={[{ label: "Start a Project", href: "/contact" }]}
      />
    </div>
  );
}
