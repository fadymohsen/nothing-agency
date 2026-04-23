import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SearchContent from "@/components/ui/SearchContent";

export const metadata = {
  title: "Search - Nothing Agency",
};

export default function SearchPage() {
  return (
    <>
      <ParallaxTopShadow>Search</ParallaxTopShadow>

      <section className="relative w-full block pt-[250px] pb-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="page-title px-5 xl:px-2">
            <div className="w-full">
              <h1>Search</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full block pb-[140px] z-10 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <SearchContent />
          </div>
        </div>
      </section>
    </>
  );
}
