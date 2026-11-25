"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import Splash from "./Splash";
import { ContentProvider } from "@/lib/content/client";
import { dictOf, isProjectsPageHidden } from "@/lib/content/utils";
import type { Content } from "@/lib/content/types";
import { langFromPath, withLang } from "@/lib/lang";

export default function LayoutShell({
  children,
  content,
}: {
  children: React.ReactNode;
  content: Content;
}) {
  const [navActive, setNavActive] = useState(false);
  const pathname = usePathname();
  const lang = langFromPath(pathname);
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  const d = dictOf(content, lang);
  const hideProjects = isProjectsPageHidden(content);
  const navItems = hideProjects
    ? d.nav.filter((item) => item.href !== "/projects" && !item.href.endsWith("/projects"))
    : d.nav;
  const currentNav = navItems.find((item) => {
    const href = withLang(item.href, lang);
    return pathname.startsWith(href);
  });
  const currentPageTitle = currentNav?.titleAttr ?? d.homeTitle;

  useEffect(() => {
    if (!isAdmin) document.documentElement.lang = lang;
  }, [lang, isAdmin]);

  // The admin panel has its own plain layout: no splash, header, cursor or footer
  if (isAdmin) return <ContentProvider content={content}>{children}</ContentProvider>;

  return (
    <ContentProvider content={content}>
      <div className={`${navActive ? "nav-active" : ""} ${lang === "ar" ? "lang-ar" : ""}`}>
        <Splash />
        <Header
          onToggleNav={() => setNavActive(!navActive)}
          navActive={navActive}
        />
        <Navigation
          onClose={() => setNavActive(false)}
          currentPageTitle={currentPageTitle}
        />
        {children}
        <Footer />
        <CustomCursor />
      </div>
    </ContentProvider>
  );
}
