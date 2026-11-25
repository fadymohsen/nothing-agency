import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetailView from "@/components/pages/ProjectDetailView";
import { buildAlternates } from "@/lib/seo";
import { getContent } from "@/lib/content/server";
import { absUrl } from "@/lib/content/meta";
import { isProjectsPageHidden } from "@/lib/content/utils";

export async function generateStaticParams() {
  const content = await getContent();
  if (isProjectsPageHidden(content)) return [];
  return content.projects.filter((p) => !p.hidden).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  if (isProjectsPageHidden(content)) return { title: "Not Found" };
  const p = content.projects.find((x) => x.slug === slug);
  if (!p || p.hidden) return { title: "Not Found" };
  const title = `${p.title.en} | Projects | Nothing Advertising Agency`;
  return {
    title,
    description: `${p.title.en}: selected work by Nothing Advertising Agency.`,
    alternates: buildAlternates(`/projects/${slug}`),
    openGraph: {
      title,
      locale: "en_US",
      images: p.images[0] ? [{ url: absUrl(p.images[0]), alt: p.title.en }] : undefined,
    },
  };
}

export default async function ProjectPageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getContent();
  if (isProjectsPageHidden(content)) notFound();
  const project = content.projects.find((p) => p.slug === slug);
  if (!project || project.hidden) notFound();
  const d = content.dict.en;
  const visibleProjects = content.projects.filter((p) => !p.hidden);
  return (
    <ProjectDetailView
      project={project}
      projects={visibleProjects}
      d={d.projects}
      contactLabel={d.contact.title}
      lang="en"
    />
  );
}
