"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";

interface HeaderProps {
  onToggleNav: () => void;
  navActive: boolean;
}

export default function Header({ onToggleNav, navActive }: HeaderProps) {
  const [isFixed, setIsFixed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 100) {
        setIsFixed(true);
        if (currentScroll < lastScroll) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsFixed(false);
        setIsVisible(false);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const headerClasses = [
    "cd-header",
    isFixed ? "is-fixed" : "",
    isVisible || navActive ? "is-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClasses}>
      <div className="relative w-[calc(100%-100px)] ml-[50px]">
        <div className="absolute left-0 top-[44px] block cursor-pointer">
          <Link href="/" className="hover-target cursor-pointer">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.siteName}
              width={100}
              height={12}
              className="h-3 w-auto block"
              priority
            />
          </Link>
        </div>
        <div className="relative inline-block float-right pl-[15px] pt-[15px] mt-[26px] transition-all duration-300 ease-out">
          <div
            className="menu-icon hover-target"
            onClick={onToggleNav}
          >
            <span className="menu-icon__line menu-icon__line-left" />
            <span className="menu-icon__line" />
            <span className="menu-icon__line menu-icon__line-right" />
          </div>
        </div>
      </div>
    </header>
  );
}
