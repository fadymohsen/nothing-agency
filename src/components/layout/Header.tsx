"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { switchLangPath } from "@/lib/lang";
import { useLang } from "@/lib/useLang";

interface HeaderProps {
  onToggleNav: () => void;
  navActive: boolean;
}

export default function Header({ onToggleNav, navActive }: HeaderProps) {
  const lang = useLang();
  const pathname = usePathname();
  const target = lang === "ar" ? "en" : "ar";

  return (
    <header className="cd-header">
      <div className="flex items-start justify-between w-[calc(100%-20px)] ml-[10px] md:w-[calc(100%-60px)] md:ml-[10px] pt-2">
        <Link href={lang === "ar" ? "/ar" : "/en"} className="hover-target cursor-pointer">
          <Image
            src="/images/nothing-logo.png"
            alt="Nothing Creative Ad Studio"
            width={931}
            height={268}
            priority
            className="h-[120px] md:h-[220px] w-auto brightness-0 invert"
          />
        </Link>
        <div className="flex items-center gap-5 md:gap-7 transition-all duration-300 ease-out">
          <Link
            href={switchLangPath(pathname, target)}
            hrefLang={target}
            aria-label={target === "ar" ? "Switch to Arabic" : "Switch to English"}
            className="lang-switch hover-target"
          >
            <span className={lang === "en" ? "is-current" : ""}>EN</span>
            <span aria-hidden="true">/</span>
            <span className={lang === "ar" ? "is-current" : ""}>AR</span>
          </Link>
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
