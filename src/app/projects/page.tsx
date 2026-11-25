import { notFound, redirect } from "next/navigation";
import { getContent } from "@/lib/content/server";
import { isProjectsPageHidden } from "@/lib/content/utils";

export default async function ProjectsPage() {
  const content = await getContent();
  if (isProjectsPageHidden(content)) notFound();
  redirect("/en/projects");
}
