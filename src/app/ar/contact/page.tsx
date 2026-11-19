import type { Metadata } from "next";
import ContactView from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: "تواصل معنا | Nothing Advertising Agency",
  description:
    "لا تتردد في بدء المحادثة. سواء كنت تبحث عن استشارة تسويقية، إدارة حملات، أو بناء هوية بصرية من الصفر — فريق Nothing Agency جاهز للاستماع والبدء.",
  openGraph: {
    title: "تواصل معنا | Nothing Advertising Agency",
    description:
      "لا تتردد في بدء المحادثة. فريق Nothing Agency جاهز للاستماع والبدء.",
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
    title: "تواصل معنا | Nothing Advertising Agency",
    description: "فريق Nothing Agency جاهز للاستماع والبدء من اللاشيء.",
    images: ["/images/nothing-logo.png"],
  },
};

export default function ContactPageAr() {
  return <ContactView lang="ar" />;
}
