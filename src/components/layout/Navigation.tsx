"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/data/dictionary";
import { langFromPath, withLang } from "@/lib/lang";

interface NavigationProps {
  onClose: () => void;
  currentPageTitle: string;
}

export default function Navigation({ onClose, currentPageTitle }: NavigationProps) {
  const pathname = usePathname();
  const lang = langFromPath(pathname);
  const items = t(lang).nav;

  return (
    <div className="nav-overlay">
      <div className="nav-content">
        <div className="current-page-shadow">{currentPageTitle}</div>
        <ul className="relative p-0 m-0 z-[2] list-none">
          {items.map((item) => {
            const href = withLang(item.href, lang);
            const isActive = pathname.startsWith(href);
            return (
              <li
                key={item.href}
                className={`nav-list-item ${isActive ? "active" : ""}`}
                style={{ fontSize: "clamp(18px, 4.6vh, 44px)", lineHeight: 1.3 }}
              >
                <Link href={href} className="hover-target" onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
