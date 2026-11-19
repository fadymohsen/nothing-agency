import type { Metadata } from "next";
import ContactView from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: "Contact Us | Nothing Advertising Agency",
  description:
    "Start the conversation. Whether you need a full brand identity, an ad campaign, or a digital experience — Nothing Agency is ready to listen and build from scratch.",
  openGraph: {
    title: "Contact Us | Nothing Advertising Agency",
    description:
      "Start the conversation. Whether you need a full brand identity, an ad campaign, or a digital experience — Nothing Agency is ready.",
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
    title: "Contact Us | Nothing Advertising Agency",
    description:
      "Start the conversation. Whether you need a full brand identity, an ad campaign, or a digital experience — Nothing Agency is ready.",
    images: ["/images/nothing-logo.png"],
  },
};

export default function ContactPageEn() {
  return <ContactView lang="en" />;
}
