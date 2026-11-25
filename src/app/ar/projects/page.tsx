import type { Metadata } from "next";
import ProjectsView from "@/components/pages/ProjectsView";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import { projectImage, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "أعمالنا | Nothing Advertising Agency",
  description:
    "أعمال مختارة من Nothing Advertising Agency: حملات إعلانية، تسويق للرعاية الصحية والأدوية، فعاليات، هويات بصرية ومنتجات رقمية.",
  alternates: buildAlternates("/projects", "ar"),
  openGraph: {
    title: "أعمالنا | Nothing Advertising Agency",
    description: "أعمال بنيناها من اللاشيء.",
    locale: "ar_EG",
    images: [{ url: `${SITE_URL}${projectImage(projects[0].pages[0])}`, width: 1200, height: 800, alt: "أعمالنا" }],
  },
};

export default function ProjectsPageAr() {
  return <ProjectsView lang="ar" />;
}
