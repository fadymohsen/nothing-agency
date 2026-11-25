import type { Metadata } from "next";
import ProjectsView from "@/components/pages/ProjectsView";
import { getContent } from "@/lib/content/server";
import { pageMetadata } from "@/lib/content/meta";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return pageMetadata(content, "en", "projects", "/projects", content.projects[0]?.images[0]);
}

export default function ProjectsPageEn() {
  return <ProjectsView lang="en" />;
}
