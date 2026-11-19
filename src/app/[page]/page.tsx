import { redirect } from "next/navigation";
import { PAGE_SLUGS } from "@/lib/lang";

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGE_SLUGS.map((page) => ({ page }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  redirect(`/en/${page}`);
}
