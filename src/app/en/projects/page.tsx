import type { Metadata } from "next";
import PageView from "@/components/pages/PageView";
import { getContent } from "@/lib/content/server";
import { pageMetadata } from "@/lib/content/meta";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return pageMetadata(content, "en", "projects", "/projects", content.projects[0]?.images[0]);
}

export default function ProjectsPageEn() {
  return <PageView slug="projects" lang="en" />;
}
