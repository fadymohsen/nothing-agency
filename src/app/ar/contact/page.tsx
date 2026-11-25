import type { Metadata } from "next";
import ContactView from "@/components/pages/ContactView";
import { contactPageSchema } from "@/lib/seo";
import { getContent } from "@/lib/content/server";
import { pageMetadata } from "@/lib/content/meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getContent(), "ar", "contact", "/contact");
}

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
