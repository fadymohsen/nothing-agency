"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";

interface NavigationProps {
  onClose: () => void;
  currentPageTitle: string;
}

export default function Navigation({ onClose, currentPageTitle }: NavigationProps) {
  const pathname = usePathname();

  return (
    <div className="nav-overlay">
      <div className="nav-content">
        <div className="current-page-shadow">{currentPageTitle}</div>
        <ul className="relative p-0 m-0 z-[2] list-none">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li
                key={item.href}
                className={`nav-list-item ${isActive ? "active" : ""}`}
              >
                <Link
                  href={item.href}
                  className="hover-target"
                  onClick={onClose}
                >
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
