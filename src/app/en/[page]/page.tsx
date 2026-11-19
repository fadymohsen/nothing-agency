import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageView from "@/components/pages/PageView";
import { PAGE_SLUGS } from "@/lib/lang";
import { getPage } from "@/lib/pages";

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
    openGraph: {
      title,
      description: p.description,
      images: [{ url: p.image, width: 1200, height: 800, alt: p.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: p.description,
      images: [p.image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!getPage(page, "en")) notFound();
  return <PageView slug={page} lang="en" />;
}
