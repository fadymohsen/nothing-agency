import { siteConfig } from "@/data/site";
import { dict } from "@/data/dictionary";
import { portfolioItems } from "@/data/portfolio";
import { pagesAr } from "@/data/pages-ar";
import { scenes } from "@/data/scenes";
import { projects, projectImage } from "@/data/projects";
import { clients } from "@/data/clients";
import type { Content } from "./types";

/** Everything the website shows. The admin panel stores edits of this exact shape in the database. */
export const defaultContent: Content = {
  site: {
    siteName: siteConfig.siteName,
    copyright: siteConfig.copyright,
    headerLogo: "/images/nothing-logo-tight.png",
    splashLogo: "/images/nothing-logo-yellow-tight.png",
    ogImage: "/images/nothing-logo.png",
    notFoundImage: "/site/photos/hero-404.jpg",
    socials: siteConfig.socials.map((s) => ({ ...s, icon: "" })),
    hideProjectsPage: false,
  },
  contact: {
    phoneDisplay: "+20 12 73890104",
    phoneHref: "tel:+201273890104",
    whatsappDisplay: "+20 100 010 8068",
    whatsappUrl: "https://wa.me/201000108068",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=2+Almaza+Al-Thawra+Main+Street+Cairo+Egypt",
    addressLines: ["2 Almaza / Al-Thawra Main Street, Office 1", "Cairo, Egypt"],
    email: "info@nothing-ads.com",
    icons: {
      call: "/site/glyphs/chat.png",
      whatsapp: "/site/glyphs/network.png",
      visit: "/site/glyphs/handshake.png",
      email: "/site/glyphs/mail.png",
    },
  },
  seo: {
    en: {
      home: {
        title: "Nothing Advertising Agency | Everything Starts as Nothing",
        description:
          "A creative advertising agency that doesn't wait for inspiration — we create it from nothing. Brand identity, ad campaigns, motion design, and digital experiences built from zero.",
        ogTitle: "Nothing Advertising Agency",
        ogDescription:
          "A creative advertising agency that doesn't wait for inspiration — we create it from nothing.",
      },
      contact: {
        title: "Contact Us | Nothing Advertising Agency",
        description:
          "Start the conversation. Whether you need a full brand identity, an ad campaign, or a digital experience — Nothing Agency is ready to listen and build from scratch.",
        ogTitle: "Contact Us | Nothing Advertising Agency",
        ogDescription:
          "Start the conversation. Whether you need a full brand identity, an ad campaign, or a digital experience — Nothing Agency is ready.",
      },
      projects: {
        title: "Projects | Nothing Advertising Agency",
        description:
          "Selected work by Nothing Advertising Agency: advertising campaigns, healthcare and pharmaceutical marketing, events, brand identities and digital products.",
        ogTitle: "Projects | Nothing Advertising Agency",
        ogDescription: "Selected work built from nothing.",
      },
    },
    ar: {
      home: {
        title: "Nothing Advertising Agency | كل شيء يبدأ من اللاشيء",
        description:
          "وكالة إعلانية إبداعية لا تنتظر الإلهام — نصنعه نحن من اللاشيء. هوية بصرية، حملات إعلانية، تسويق رقمي، وتجارب إبداعية متكاملة مبنية من الصفر.",
        ogTitle: "Nothing Advertising Agency",
        ogDescription: "وكالة إعلانية إبداعية لا تنتظر الإلهام — نصنعه نحن من اللاشيء.",
      },
      contact: {
        title: "تواصل معنا | Nothing Advertising Agency",
        description:
          "لا تتردد في بدء المحادثة. سواء كنت تبحث عن استشارة تسويقية، إدارة حملات، أو بناء هوية بصرية من الصفر — فريق Nothing Agency جاهز للاستماع والبدء.",
        ogTitle: "تواصل معنا | Nothing Advertising Agency",
        ogDescription: "فريق Nothing Agency جاهز للاستماع والبدء من اللاشيء.",
      },
      projects: {
        title: "أعمالنا | Nothing Advertising Agency",
        description:
          "أعمال مختارة من Nothing Advertising Agency: حملات إعلانية، تسويق للرعاية الصحية والأدوية، فعاليات، هويات بصرية ومنتجات رقمية.",
        ogTitle: "أعمالنا | Nothing Advertising Agency",
        ogDescription: "أعمال بنيناها من اللاشيء.",
      },
    },
  },
  dict: structuredClone(dict),
  portfolio: structuredClone(portfolioItems),
  pagesAr: structuredClone(pagesAr),
  scenes: structuredClone(scenes),
  projects: projects.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: { ...p.title },
    images: p.pages.map(projectImage),
    hidden: false,
  })),
  clients: structuredClone(clients),
};
