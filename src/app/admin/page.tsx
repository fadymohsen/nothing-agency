import { getContentFresh } from "@/lib/content/server";
import Editor from "./Editor";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getContentFresh();
  return <Editor initial={content} />;
}
