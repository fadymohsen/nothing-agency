import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SectionIntro from "@/components/ui/SectionIntro";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import FooterSection from "@/components/ui/FooterSection";

export const metadata = {
  title: "Portfolio - Nothing Agency",
};

export default function PortfolioPage() {
  return (
    <>
      <ParallaxTopShadow>Portfolio</ParallaxTopShadow>

      <section className="relative w-full block pt-[250px] pb-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <SectionIntro title="Portfolio" subtitle="our selected work" />
        </div>
      </section>

      <section className="relative w-full block pb-[140px] z-10 overflow-hidden">
        <PortfolioGrid />
      </section>

      <FooterSection
        shadowText="Portfolio"
        links={[{ label: "Get in Touch", href: "/contact" }]}
      />
    </>
  );
}
