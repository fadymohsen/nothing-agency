import type { Metadata } from "next";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider";
import HomeSections from "@/components/home/HomeSections";
import { websiteSchema } from "@/lib/seo";
import { getContent } from "@/lib/content/server";
import { pageMetadata } from "@/lib/content/meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getContent(), "en", "home", "");
}

export default function HomePageEn() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />
      <PortfolioSlider />
      <HomeSections />
    </>
  );
}
