import type { Metadata } from "next";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider";
import HomeSections from "@/components/home/HomeSections";
import { buildAlternates, websiteSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Nothing Advertising Agency | Everything Starts as Nothing",
  description:
    "A creative advertising agency that doesn't wait for inspiration — we create it from nothing. Brand identity, ad campaigns, motion design, and digital experiences built from zero.",
  alternates: buildAlternates(""),
  openGraph: {
    title: "Nothing Advertising Agency",
    description:
      "A creative advertising agency that doesn't wait for inspiration — we create it from nothing.",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/images/nothing-logo.png`,
        width: 1200,
        height: 630,
        alt: "Nothing Advertising Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nothing Advertising Agency",
    description:
      "A creative advertising agency that doesn't wait for inspiration — we create it from nothing.",
    images: [`${SITE_URL}/images/nothing-logo.png`],
  },
};

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
