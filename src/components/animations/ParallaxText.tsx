"use client";

import { useEffect, useState } from "react";

interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ParallaxFadeTop({
  children,
  className = "",
}: ParallaxTextProps) {
  const [style, setStyle] = useState({ top: "0px", opacity: 1 });

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      setStyle({
        top: scrollPos / 2 + "px",
        opacity: 1 - scrollPos / 300,
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`relative ${className}`} style={style}>
      {children}
    </div>
  );
}

export function ParallaxTopShadow({
  children,
  className = "",
}: ParallaxTextProps) {
  const [topOffset, setTopOffset] = useState("0px");

  useEffect(() => {
    const onScroll = () => {
      setTopOffset(-window.scrollY / 2 + "px");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`shadow-title ${className}`}
      style={{ marginTop: `calc(80px + ${topOffset})` }}
    >
      {children}
    </div>
  );
}
