"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems } from "@/data/portfolio";

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("*");

  const categories = Array.from(
    new Set(portfolioItems.map((item) => item.categorySlug))
  );

  const filtered =
    activeFilter === "*"
      ? portfolioItems
      : portfolioItems.filter((item) => item.categorySlug === activeFilter);

  return (
    <>
      {/* Filter */}
      <div className="max-w-[1140px] mx-auto px-4 mb-8">
        <div className="px-5 xl:px-2">
          <div className="portfolio-filter">
            <ul>
              <li>
                <a
                  href="#"
                  className={`hover-target ${activeFilter === "*" ? "current" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveFilter("*");
                  }}
                >
                  All
                </a>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className={`hover-target ${activeFilter === cat ? "current" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveFilter(cat);
                    }}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="relative text-center mx-auto max-w-[1145px] w-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/portfolio/${item.slug}`} className="hover-target block">
                  <div className="portfolio-box">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="w-full h-auto block transition-transform duration-300"
                    />
                    <div className="portfolio-mask" />
                    <p>{item.category}</p>
                    <h4>{item.title}</h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
