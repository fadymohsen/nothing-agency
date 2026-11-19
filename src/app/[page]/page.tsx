import { redirect } from "next/navigation";

export const dynamicParams = true;

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  redirect(`/en/${page}`);
}
