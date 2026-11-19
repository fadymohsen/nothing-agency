import type { Lang } from "./lang";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://nothing-agency.com");

// ─── Alternates (hreflang + canonical) ───────────────────────────────────────

export function buildAlternates(path: string, canonical: "en" | "ar" = "en") {
  const enUrl = `${SITE_URL}/en${path}`;
  const arUrl = `${SITE_URL}/ar${path}`;
  return {
    canonical: canonical === "ar" ? arUrl : enUrl,
    languages: {
      en: enUrl,
      ar: arUrl,
      "x-default": enUrl,
    },
  };
}

// ─── Organization (global — appears on every page via layout) ─────────────────

export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Nothing Advertising Agency",
    alternateName: "Nothing Agency",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/nothing-logo.png`,
      width: 931,
      height: 268,
    },
    description:
      "A creative advertising agency that builds brands, campaigns, and digital experiences from zero — using a systematic, process-driven approach rather than waiting for inspiration.",
    knowsAbout: [
      "Brand Identity Design",
      "Advertising Campaigns",
      "Social Media Marketing",
      "Content Production and Copywriting",
      "Graphic Design",
      "Digital Marketing",
      "Campaign Management",
    ],
    serviceType: [
      "Campaign Management",
      "Graphic Design & Branding",
      "Content Production & Copywriting",
      "Social Media Marketing",
    ],
    sameAs: [],
  };
}

// ─── WebSite (homepage) ────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Nothing Advertising Agency",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["en", "ar"],
  };
}

// ─── BreadcrumbList (all inner pages) ─────────────────────────────────────────

export function breadcrumbSchema(pageTitle: string, pageUrl: string, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "ar" ? "الرئيسية" : "Home",
        item: `${SITE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageTitle,
        item: pageUrl,
      },
    ],
  };
}

// ─── About Us — FAQPage (AEO: answers common agency questions) ─────────────────

export function aboutFaqSchemaEn() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Nothing Advertising Agency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nothing Advertising Agency (Nothing Agency) is a creative advertising agency that builds brands, campaigns, and digital experiences from zero. We use a systematic, process-driven methodology — replacing 'magical inspiration' with critical thinking, market analysis, and consistent execution.",
        },
      },
      {
        "@type": "Question",
        name: "What makes Nothing Agency different from other advertising agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nothing Agency was itself built from zero — without inherited templates or massive resources. This gives us a unique, honest perspective: we strip advertising of its 'magic and mystery' and return it to its core: rigorous thinking, precise market analysis, and a creative process that does not recognize the word impossible.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I choose Nothing Agency for my brand?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nothing Agency operates on three values: Methodology over Inspiration (we hunt ideas with research and data, not luck), Results not just Art (every design and copy serves a clear sales or marketing objective), and the Power of Consistency (success is a cumulative process that starts from nothing and grows every single day).",
        },
      },
    ],
  };
}

export function aboutFaqSchemaAr() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هي Nothing Advertising Agency؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nothing Advertising Agency (Nothing Agency) هي وكالة إعلانية إبداعية تبني العلامات التجارية والحملات والتجارب الرقمية من الصفر، معتمدةً على منهجية إبداعية منظمة بدلاً من انتظار الإلهام.",
        },
      },
      {
        "@type": "Question",
        name: "ما الذي يميز Nothing Agency عن غيرها من الوكالات الإعلانية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nothing Agency بُنيت هي نفسها من الصفر، دون موارد موروثة أو قوالب جاهزة. هذا يمنحنا منظوراً صادقاً وفريداً: نجرد الإعلانات من هالة السحر والغموض، ونعيدها إلى جوهرها — تفكير نقدي، تحليل دقيق للسوق، وعملية إبداعية لا تعترف بكلمة مستحيل.",
        },
      },
      {
        "@type": "Question",
        name: "لماذا أختار Nothing Agency لعلامتي التجارية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تعمل Nothing Agency على ثلاث قيم: المنهجية قبل الإلهام (نصطاد الأفكار بالبحث والبيانات)، النتائج وليس الفن للفن (كل تصميم ومحتوى يخدم هدفاً بيعياً أو تسويقياً واضحاً)، وقوة الاستمرارية (النجاح عملية تراكمية تبدأ من اللاشيء وتنمو كل يوم).",
        },
      },
    ],
  };
}

// ─── What We Do — Service ItemList + FAQ ──────────────────────────────────────

export function servicesSchema() {
  const provider = { "@id": `${SITE_URL}/#organization` };
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services by Nothing Advertising Agency",
    description:
      "Every service Nothing Agency offers is a vital gear in its Creative Process — turning abstract thinking into tangible, measurable results.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Campaign Management",
          provider,
          description:
            "We analyze the market, competitors, and gaps to build an integrated advertising strategy that dominates platforms and achieves the highest ROI.",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Graphic Design & Branding",
          provider,
          description:
            "We design visual identities that reflect your true persona and build immediate visual trust with your audience — from first pixel to full brand system.",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Content Production & Copywriting",
          provider,
          description:
            "We write creative content, ad copies, and scripts that make noise and compel customers to stop, read, and act.",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Social Media Marketing",
          provider,
          description:
            "We build thriving digital communities from scratch through consistency, deep platform algorithm understanding, and genuine audience engagement.",
        },
      },
    ],
  };
}

export function servicesFaqSchemaEn() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Nothing Agency offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nothing Agency offers four core services: Campaign Management, Graphic Design & Branding, Content Production & Copywriting, and Social Media Marketing. Each is engineered as a gear in the agency's proven Creative Process.",
        },
      },
      {
        "@type": "Question",
        name: "Does Nothing Agency do brand identity design?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Nothing Agency designs visual identities from zero — logos, brand systems, and design language that reflect your unique persona and build immediate visual trust with your audience.",
        },
      },
      {
        "@type": "Question",
        name: "Does Nothing Agency manage social media marketing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Nothing Agency builds digital communities from scratch through content consistency, deep understanding of platform algorithms, and genuine audience engagement — not just posting.",
        },
      },
      {
        "@type": "Question",
        name: "How does Nothing Agency approach advertising campaigns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nothing Agency starts every campaign by deconstructing the market — studying the client, analyzing competitors, and identifying real gaps — then builds an integrated strategy that maximizes ROI across platforms.",
        },
      },
    ],
  };
}

export function servicesFaqSchemaAr() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هي خدمات Nothing Agency؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تقدم Nothing Agency أربع خدمات أساسية: إدارة الحملات الإعلانية، تصميم الجرافيك والهوية البصرية، صناعة وإنتاج المحتوى والكوبي رايتنج، والتسويق عبر السوشيال ميديا — كل خدمة ترس في العملية الإبداعية المُثبتة.",
        },
      },
      {
        "@type": "Question",
        name: "هل تصمم Nothing Agency الهويات البصرية للعلامات التجارية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم. تصمم Nothing Agency الهويات البصرية من الصفر — شعارات، أنظمة بصرية، ولغة تصميمية تعكس شخصيتك وتبني ثقة فورية مع جمهورك.",
        },
      },
      {
        "@type": "Question",
        name: "هل تدير Nothing Agency حسابات التواصل الاجتماعي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم. تبني Nothing Agency مجتمعات رقمية من الصفر من خلال الاستمرارية في المحتوى، والفهم العميق لخوارزميات المنصات، والتفاعل الحقيقي مع الجمهور — ليس مجرد نشر منشورات.",
        },
      },
    ],
  };
}

// ─── Manifesto — HowTo (the 4-phase creative process) ────────────────────────

export function manifestoSchemaEn() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "The Anatomy of Creativity: How Nothing Agency Turns the Void into a Successful Campaign",
    description:
      "Nothing Agency's transparent 4-phase Creative Process for building advertising campaigns from zero into measurable market impact.",
    step: [
      {
        "@type": "HowToStep",
        position: "1",
        name: "Phase 1: Deconstructing Nothingness (Discovery)",
        text: "Studying the client, the market, and identifying the real core problem. We analyze competitors, gaps, and opportunities before a single idea is formed.",
      },
      {
        "@type": "HowToStep",
        position: "2",
        name: "Phase 2: Engineering the Idea (Building)",
        text: "Directed brainstorming. We leave nothing to chance — every idea is subjected to the logic test before moving forward.",
      },
      {
        "@type": "HowToStep",
        position: "3",
        name: "Phase 3: Shaping (Execution)",
        text: "Turning the written concept into a design, a video, a copy, or a full-scale marketing campaign across the right channels.",
      },
      {
        "@type": "HowToStep",
        position: "4",
        name: "Phase 4: Launch & Measurement (Results)",
        text: "Numbers rule. We launch, measure performance, analyze results, and continuously optimize to maximize campaign impact.",
      },
    ],
  };
}

export function manifestoSchemaAr() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "تشريح الإبداع: كيف تحول Nothing Agency الفراغ إلى حملة ناجحة؟",
    description:
      "العملية الإبداعية الشفافة رباعية المراحل لـ Nothing Agency لبناء حملات إعلانية من الصفر إلى أثر سوقي قابل للقياس.",
    step: [
      {
        "@type": "HowToStep",
        position: "1",
        name: "المرحلة 1: تفكيك اللاشيء (الاستكشاف)",
        text: "دراسة العميل والسوق وتحديد المشكلة الحقيقية، تحليل المنافسين والفجوات والفرص قبل تشكيل أي فكرة.",
      },
      {
        "@type": "HowToStep",
        position: "2",
        name: "المرحلة 2: هندسة الفكرة (البناء)",
        text: "عصف ذهني موجه — لا نترك شيئاً للصدفة، كل فكرة تخضع لاختبار المنطق قبل المضي قدماً.",
      },
      {
        "@type": "HowToStep",
        position: "3",
        name: "المرحلة 3: التشكيل (التنفيذ)",
        text: "تحويل الفكرة المكتوبة إلى تصميم، فيديو، كوبي، أو حملة تسويقية متكاملة عبر القنوات المناسبة.",
      },
      {
        "@type": "HowToStep",
        position: "4",
        name: "المرحلة 4: الإطلاق والقياس (النتائج)",
        text: "الأرقام هي التي تحكم — نطلق ونقيس الأداء ونحلل النتائج ونحسن باستمرار لتعظيم أثر الحملة.",
      },
    ],
  };
}

// ─── Contact page ─────────────────────────────────────────────────────────────

export function contactPageSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name:
      lang === "ar"
        ? "تواصل مع Nothing Advertising Agency"
        : "Contact Nothing Advertising Agency",
    url: `${SITE_URL}/${lang}/contact`,
    description:
      lang === "ar"
        ? "تواصل مع فريق Nothing Agency لبدء مشروع هويتك البصرية، حملتك الإعلانية، أو استراتيجيتك التسويقية الرقمية من الصفر."
        : "Get in touch with Nothing Agency to start your brand identity, advertising campaign, or digital marketing strategy — built from zero.",
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  };
}

// ─── Helper: get all JSON-LD schemas for a given inner page ───────────────────

export function getPageSchemas(
  slug: string,
  lang: Lang,
  pageTitle: string,
): object[] {
  const pageUrl = `${SITE_URL}/${lang}/${slug}`;
  const schemas: object[] = [breadcrumbSchema(pageTitle, pageUrl, lang)];

  if (slug === "about-us") {
    schemas.push(lang === "ar" ? aboutFaqSchemaAr() : aboutFaqSchemaEn());
  }
  if (slug === "what-we-do") {
    schemas.push(servicesSchema());
    schemas.push(lang === "ar" ? servicesFaqSchemaAr() : servicesFaqSchemaEn());
  }
  if (slug === "manifesto") {
    schemas.push(lang === "ar" ? manifestoSchemaAr() : manifestoSchemaEn());
  }

  return schemas;
}
