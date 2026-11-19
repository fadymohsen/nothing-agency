import type { Metadata } from "next";
import ContactView from "@/components/pages/ContactView";
import { buildAlternates, contactPageSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us | Nothing Advertising Agency",
  description:
    "Start the conversation. Whether you need a full brand identity, an ad campaign, or a digital experience — Nothing Agency is ready to listen and build from scratch.",
  alternates: buildAlternates("/contact"),
  openGraph: {
    title: "Contact Us | Nothing Advertising Agency",
    description:
      "Start the conversation. Whether you need a full brand identity, an ad campaign, or a digital experience — Nothing Agency is ready.",
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
    title: "Contact Us | Nothing Advertising Agency",
    description:
      "Start the conversation. Whether you need a full brand identity, an ad campaign, or a digital experience — Nothing Agency is ready.",
    images: [`${SITE_URL}/images/nothing-logo.png`],
  },
};

export default function ContactPageEn() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema("en")) }}
      />
      <ContactView lang="en" />
    </>
  );
}
