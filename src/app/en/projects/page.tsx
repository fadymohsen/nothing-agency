import type { Metadata } from "next";
import ProjectsView from "@/components/pages/ProjectsView";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import { projectImage, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Nothing Advertising Agency",
  description:
    "Selected work by Nothing Advertising Agency: advertising campaigns, healthcare and pharmaceutical marketing, events, brand identities and digital products.",
  alternates: buildAlternates("/projects"),
  openGraph: {
    title: "Projects | Nothing Advertising Agency",
    description: "Selected work built from nothing.",
    locale: "en_US",
    images: [{ url: `${SITE_URL}${projectImage(projects[0].pages[0])}`, width: 1200, height: 800, alt: "Projects" }],
  },
};

export default function ProjectsPageEn() {
  return <ProjectsView lang="en" />;
}
