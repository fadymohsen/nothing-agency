import type { Metadata } from "next";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider";
import HomeSections from "@/components/home/HomeSections";
import { buildAlternates, websiteSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Nothing Advertising Agency | كل شيء يبدأ من اللاشيء",
  description:
    "وكالة إعلانية إبداعية لا تنتظر الإلهام — نصنعه نحن من اللاشيء. هوية بصرية، حملات إعلانية، تسويق رقمي، وتجارب إبداعية متكاملة مبنية من الصفر.",
  alternates: buildAlternates("", "ar"),
  openGraph: {
    title: "Nothing Advertising Agency",
    description: "وكالة إعلانية إبداعية لا تنتظر الإلهام — نصنعه نحن من اللاشيء.",
    locale: "ar_EG",
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
    description: "وكالة إعلانية إبداعية لا تنتظر الإلهام — نصنعه نحن من اللاشيء.",
    images: [`${SITE_URL}/images/nothing-logo.png`],
  },
};

export default function HomePageAr() {
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
