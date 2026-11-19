import type { Metadata } from "next";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider";
import HomeSections from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: "Nothing Advertising Agency | Everything Starts as Nothing",
  description:
    "A creative advertising agency that doesn't wait for inspiration — we create it from nothing. Brand identity, ad campaigns, motion design, and digital experiences.",
  openGraph: {
    title: "Nothing Advertising Agency",
    description:
      "A creative advertising agency that doesn't wait for inspiration — we create it from nothing.",
    images: [
      {
        url: "/images/nothing-logo.png",
        width: 931,
        height: 268,
        alt: "Nothing Advertising Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nothing Advertising Agency",
    description:
      "A creative advertising agency that doesn't wait for inspiration — we create it from nothing.",
    images: ["/images/nothing-logo.png"],
  },
};

export default function HomePageEn() {
  return (
    <>
      <PortfolioSlider />
      <HomeSections />
    </>
  );
}
