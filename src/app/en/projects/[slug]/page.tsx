import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetailView from "@/components/pages/ProjectDetailView";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import { getProject, projectImage, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Not Found" };
  const title = `${p.title.en} | Projects | Nothing Advertising Agency`;
  return {
    title,
    description: `${p.title.en}: selected work by Nothing Advertising Agency.`,
    alternates: buildAlternates(`/projects/${slug}`),
    openGraph: {
      title,
      locale: "en_US",
      images: [{ url: `${SITE_URL}${projectImage(p.pages[0])}`, alt: p.title.en }],
    },
  };
}

export default async function ProjectPageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectDetailView project={project} lang="en" />;
}
