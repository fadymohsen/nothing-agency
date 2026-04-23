import Image from "next/image";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SectionIntro from "@/components/ui/SectionIntro";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FooterSection from "@/components/ui/FooterSection";

export const metadata = {
  title: "Studio - Nothing Agency",
};

export default function StudioPage() {
  return (
    <>
      <ParallaxTopShadow>Studio</ParallaxTopShadow>

      {/* Page Title */}
      <section className="relative w-full block pt-[250px] pb-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <SectionIntro title="Design Studio" subtitle="we build great brands" />
        </div>
      </section>

      {/* Masked Image */}
      <section className="relative w-full block pb-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <ScrollReveal>
            <div className="px-5 xl:px-2">
              <div className="img-mask">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                  alt="Studio"
                  width={1200}
                  height={600}
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What We Do */}
      <section className="relative w-full block py-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <ScrollReveal>
              <div className="page-title-small mb-12">
                <p>What we do</p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal delay={0.1}>
                <h5 className="mb-4 text-white">Branding</h5>
                <ul className="studio-list">
                  <li><p>Brand Identity</p></li>
                  <li><p>Visual Design</p></li>
                  <li><p>Logo Design</p></li>
                  <li><p>Brand Strategy</p></li>
                  <li><p>Guidelines</p></li>
                </ul>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <h5 className="mb-4 text-white">Digital</h5>
                <ul className="studio-list">
                  <li><p>Web Design</p></li>
                  <li><p>UI/UX Design</p></li>
                  <li><p>Mobile Apps</p></li>
                  <li><p>E-Commerce</p></li>
                  <li><p>Development</p></li>
                </ul>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <h5 className="mb-4 text-white">Motion</h5>
                <ul className="studio-list">
                  <li><p>Animation</p></li>
                  <li><p>Video Production</p></li>
                  <li><p>Motion Graphics</p></li>
                  <li><p>3D Visualization</p></li>
                  <li><p>Film Direction</p></li>
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="relative w-full block py-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <ScrollReveal>
              <div className="page-title-small mb-12">
                <p>Our partners</p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <ScrollReveal key={i} delay={0.05 * i}>
                  <div className="logo-box">
                    <span className="text-white/30 text-sm font-medium tracking-wider uppercase">
                      Partner {i}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blockquote */}
      <section className="relative w-full block py-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto">
                <div className="blockquote-custom">
                  <h3>
                    Design is not just what it looks like and feels like. Design
                    is how it works.
                  </h3>
                  <p className="mt-6 text-white/60">— Steve Jobs</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FooterSection
        shadowText="Studio"
        links={[{ label: "Have a Project?", href: "/contact" }]}
      />
    </>
  );
}
