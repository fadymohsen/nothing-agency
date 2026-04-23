"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="social-fixed">
        {siteConfig.socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            className="hover-target"
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.name}
          </a>
        ))}
      </div>

      <div className="copyr">{siteConfig.copyright}</div>

      <div
        className={`scroll-to-top hover-target ${showArrow ? "active-arrow" : ""}`}
        onClick={scrollToTop}
      />
    </>
  );
}
