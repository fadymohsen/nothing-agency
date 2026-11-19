import type { Metadata } from "next";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider";
import HomeSections from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: "Nothing Advertising Agency | كل شيء يبدأ من اللاشيء",
  description:
    "وكالة إعلانية لا تنتظر الإلهام.. نحن نصنعه من اللاشيء. هوية بصرية، حملات إعلانية، تسويق رقمي، وتجارب إبداعية متكاملة.",
  openGraph: {
    title: "Nothing Advertising Agency",
    description: "وكالة إعلانية لا تنتظر الإلهام.. نحن نصنعه من اللاشيء.",
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
    description: "وكالة إعلانية لا تنتظر الإلهام.. نحن نصنعه من اللاشيء.",
    images: ["/images/nothing-logo.png"],
  },
};

export default function HomePageAr() {
  return (
    <>
      <PortfolioSlider />
      <HomeSections />
    </>
  );
}
