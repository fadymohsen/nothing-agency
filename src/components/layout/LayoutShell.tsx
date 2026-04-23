"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import { navItems } from "@/data/navigation";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [navActive, setNavActive] = useState(false);
  const pathname = usePathname();

  const currentNav = navItems.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );
  const currentPageTitle = currentNav?.titleAttr || "home";

  return (
    <div className={navActive ? "nav-active" : ""}>
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
