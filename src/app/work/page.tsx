import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SectionIntro from "@/components/ui/SectionIntro";
import PortfolioSlice from "@/components/portfolio/PortfolioSlice";
import FooterSection from "@/components/ui/FooterSection";

export const metadata = {
  title: "Work - Nothing Agency",
};

export default function WorkPage() {
  return (
    <>
      <ParallaxTopShadow>Work</ParallaxTopShadow>

      <section className="relative w-full block pt-[250px] pb-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <SectionIntro title="Our Work" subtitle="we do magic" />
        </div>
      </section>

      <section className="relative w-full block pb-[140px] z-10 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <PortfolioSlice />
        </div>
      </section>

      <FooterSection
        shadowText="Work"
        links={[{ label: "Get in Touch", href: "/contact" }]}
      />
    </>
  );
}
