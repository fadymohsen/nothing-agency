import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageView from "@/components/pages/PageView";
import { getContent } from "@/lib/content/server";
import { isProjectsPageHidden } from "@/lib/content/utils";
import { pageMetadata } from "@/lib/content/meta";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  if (isProjectsPageHidden(content)) return { title: "Not Found" };
  const visible = content.projects.filter((p) => !p.hidden);
  return pageMetadata(content, "ar", "projects", "/projects", visible[0]?.images[0]);
}

export default async function ProjectsPageAr() {
  const content = await getContent();
  if (isProjectsPageHidden(content)) notFound();
  return <PageView slug="projects" lang="ar" />;
}
