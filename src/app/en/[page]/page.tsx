import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageView from "@/components/pages/PageView";
import { PAGE_SLUGS } from "@/lib/lang";
import { getPage } from "@/lib/pages";
import { buildAlternates, getPageSchemas, SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGE_SLUGS.map((page) => ({ page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const p = getPage(page, "en");
  if (!p) return { title: "Not Found" };

  const title = `${p.title} | Nothing Advertising Agency`;

  return {
    title,
    description: p.description,
    alternates: buildAlternates(`/${page}`),
    openGraph: {
      title,
      description: p.description,
      locale: "en_US",
      images: [{ url: `${SITE_URL}${p.image}`, width: 1200, height: 800, alt: p.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: p.description,
      images: [`${SITE_URL}${p.image}`],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const p = getPage(page, "en");
  if (!p) notFound();

  const schemas = getPageSchemas(page, "en", p.title);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PageView slug={page} lang="en" />
    </>
  );
}
