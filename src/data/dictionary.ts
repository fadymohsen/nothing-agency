import type { Lang } from "@/lib/lang";

export const dict = {
  en: {
    nav: [
      { label: "Home", href: "/", titleAttr: "home" },
      { label: "About Us", href: "/about-us", titleAttr: "about" },
      { label: "What We Do", href: "/what-we-do", titleAttr: "services" },
      { label: "Manifesto", href: "/manifesto", titleAttr: "manifesto" },
      { label: "From Nothing", href: "/from-nothing", titleAttr: "story" },
      { label: "Nothing Lab", href: "/nothing-lab", titleAttr: "lab" },
      { label: "Unseen", href: "/unseen", titleAttr: "unseen" },
      { label: "Nothing Just Feel", href: "/nothing-just-feel", titleAttr: "feel" },
      { label: "Let's Create", href: "/lets-create", titleAttr: "create" },
      { label: "Contact", href: "/contact", titleAttr: "contact" },
    ],
    switchLabel: "العربية",
    prev: "Prev Page",
    next: "Next Page",
    form: {
      name: "YOUR NAME",
      email: "YOUR EMAIL",
      subject: "SUBJECT",
      message: "YOUR MESSAGE",
      send: "SEND MESSAGE",
      thanksTitle: "Thank you!",
      thanksText: "Your message has been sent. We'll get back to you soon.",
    },
    contact: {
      shadow: "Contact",
      title: "Contact Us",
      subtitle: "let's start the conversation",
      intro:
        "Don't hesitate to start the conversation. Whether you're looking for marketing consultancy, campaign management, or building a visual identity from scratch, the Nothing Agency team is ready to answer, listen, and begin the process.",
      call: "Call Us",
      visit: "Visit Us",
      email: "Email Us",
      footerShadow: "Hello",
    },
    notFound: {
      title: "Oops... You've Reached Absolute Nothingness!",
      text: "This page doesn't exist, as empty as the beginnings of every great project. But don't worry, even in this void, we know the way back.",
      cta: "Click here to return to the homepage",
      after: "and start your creative journey with us all over again, step by step.",
    },
    home: {
      eyebrow: "Get in Touch",
      titleA: "Let's create",
      titleB: "something together",
      text: "Have a project in mind? We'd love to hear about it. Drop us a line and let's start a conversation.",
      cta: "Say Hello",
    },
  },
  ar: {
    nav: [
      { label: "الرئيسية", href: "/", titleAttr: "الرئيسية" },
      { label: "من نحن", href: "/about-us", titleAttr: "من نحن" },
      { label: "ماذا نفعل", href: "/what-we-do", titleAttr: "خدماتنا" },
      { label: "المانيفستو", href: "/manifesto", titleAttr: "المانيفستو" },
      { label: "من اللاشيء", href: "/from-nothing", titleAttr: "قصتنا" },
      { label: "مختبر اللاشيء", href: "/nothing-lab", titleAttr: "المختبر" },
      { label: "ما وراء الكواليس", href: "/unseen", titleAttr: "الكواليس" },
      { label: "مساحة الشعور", href: "/nothing-just-feel", titleAttr: "الشعور" },
      { label: "لنبدع معاً", href: "/lets-create", titleAttr: "لنبدع" },
      { label: "تواصل معنا", href: "/contact", titleAttr: "تواصل" },
    ],
    switchLabel: "English",
    prev: "الصفحة السابقة",
    next: "الصفحة التالية",
    form: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "رسالتك",
      send: "إرسال الرسالة",
      thanksTitle: "شكراً لك!",
      thanksText: "تم إرسال رسالتك. سنعود إليك قريباً.",
    },
    contact: {
      shadow: "تواصل",
      title: "تواصل معنا",
      subtitle: "لنبدأ المحادثة",
      intro:
        "لا تتردد في بدء المحادثة. سواء كنت تبحث عن استشارة تسويقية، إدارة لحملاتك، أو بناء هوية بصرية من الصفر. فريق Nothing Agency جاهز للرد، للاستماع، ولبدء البروسيس.",
      call: "اتصل بنا",
      visit: "زرنا",
      email: "راسلنا",
      footerShadow: "أهلاً",
    },
    notFound: {
      title: "عفواً.. لقد وصلت إلى اللاشيء المطلق!",
      text: "هذه الصفحة غير موجودة، فارغة تماماً كبدايات كل مشروع عظيم. لكن لا تقلق، حتى في هذا الفراغ نحن نعرف طريق العودة.",
      cta: "اضغط هنا للعودة إلى الصفحة الرئيسية",
      after: "وابدأ رحلتك الإبداعية معنا من جديد، خطوة بخطوة.",
    },
    home: {
      eyebrow: "تواصل معنا",
      titleA: "لنبدع",
      titleB: "شيئاً معاً",
      text: "هل لديك مشروع في بالك؟ يسعدنا أن نسمع عنه. راسلنا ولنبدأ المحادثة.",
      cta: "قل مرحباً",
    },
  },
} satisfies Record<Lang, unknown>;

export function t(lang: Lang) {
  return dict[lang];
}
