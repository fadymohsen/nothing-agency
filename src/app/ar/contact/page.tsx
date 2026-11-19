import type { Metadata } from "next";
import ContactView from "@/components/pages/ContactView";
import { buildAlternates, contactPageSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "تواصل معنا | Nothing Advertising Agency",
  description:
    "لا تتردد في بدء المحادثة. سواء كنت تبحث عن استشارة تسويقية، إدارة حملات، أو بناء هوية بصرية من الصفر — فريق Nothing Agency جاهز للاستماع والبدء.",
  alternates: buildAlternates("/contact", "ar"),
  openGraph: {
    title: "تواصل معنا | Nothing Advertising Agency",
    description: "فريق Nothing Agency جاهز للاستماع والبدء من اللاشيء.",
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
    title: "تواصل معنا | Nothing Advertising Agency",
    description: "فريق Nothing Agency جاهز للاستماع والبدء من اللاشيء.",
    images: [`${SITE_URL}/images/nothing-logo.png`],
  },
};

export default function ContactPageAr() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema("ar")) }}
      />
      <ContactView lang="ar" />
    </>
  );
}
