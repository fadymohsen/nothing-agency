"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import SparkleBackground from "@/components/animations/SparkleBackground";
import Splash from "./Splash";
import { t } from "@/data/dictionary";
import { langFromPath, withLang } from "@/lib/lang";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [navActive, setNavActive] = useState(false);
  const pathname = usePathname();
  const lang = langFromPath(pathname);

  const currentNav = t(lang).nav.find((item) => {
    const href = withLang(item.href, lang);
    if (item.href === "/") {
      return pathname === href || pathname === withLang("/home", lang);
    }
    return pathname.startsWith(href);
  });
  const currentPageTitle = currentNav?.titleAttr ?? t(lang).nav[0].titleAttr;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`${navActive ? "nav-active" : ""} ${lang === "ar" ? "lang-ar" : ""}`}>
      <Splash />
      <SparkleBackground />
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
  );
}
