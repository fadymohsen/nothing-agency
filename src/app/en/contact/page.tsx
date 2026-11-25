import type { Metadata } from "next";
import ContactView from "@/components/pages/ContactView";
import { contactPageSchema } from "@/lib/seo";
import { getContent } from "@/lib/content/server";
import { pageMetadata } from "@/lib/content/meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getContent(), "en", "contact", "/contact");
}

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
