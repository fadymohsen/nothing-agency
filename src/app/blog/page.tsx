import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SectionIntro from "@/components/ui/SectionIntro";
import BlogList from "@/components/blog/BlogList";

export const metadata = {
  title: "Blog - Nothing Agency",
};

export default function BlogPage() {
  return (
    <>
      <ParallaxTopShadow>News</ParallaxTopShadow>

      <section className="relative w-full block pt-[250px] pb-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <SectionIntro title="Blog" subtitle="full of stuff" />
        </div>
      </section>

      <section className="relative w-full block pb-[140px] z-10 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <BlogList />
          </div>
        </div>
      </section>
    </>
  );
}
