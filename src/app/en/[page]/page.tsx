import { notFound } from "next/navigation";
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
}) {
  const { page } = await params;
  const p = getPage(page, "en");
  return { title: p ? `${p.title} - Nothing Agency` : "Not Found" };
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
