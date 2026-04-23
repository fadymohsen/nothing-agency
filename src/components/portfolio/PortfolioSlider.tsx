"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel, FreeMode } from "swiper/modules";
import Link from "next/link";
import { portfolioItems } from "@/data/portfolio";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

export default function PortfolioSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden z-10 ${isPressed ? "scale-up" : ""}`}
    >
      {/* Background Images */}
      <ul className="case-study-images">
        {portfolioItems.map((item, i) => (
          <li key={item.slug} className={i === activeIndex ? "show" : ""}>
            <div
              className="img-hero-background"
              style={{ backgroundImage: `url('${item.image}')` }}
            />
            <h2>{item.title}</h2>
            <div className="hero-number">
              {String(i + 1).padStart(2, "0")}
            </div>
            {i === 0 && (
              <div className="hero-number-fixed">
                {String(portfolioItems.length).padStart(2, "0")}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Swiper */}
      <Swiper
        modules={[Scrollbar, Mousewheel, FreeMode]}
        scrollbar={{ draggable: true, dragSize: 19 }}
        slidesPerView="auto"
        resistance={true}
        resistanceRatio={0}
        speed={800}
        mousewheel={true}
        freeMode={true}
        grabCursor={true}
        touchStartPreventDefault={false}
        breakpoints={{
          1200: { freeMode: false },
        }}
        className="h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
      >
        {portfolioItems.map((item, i) => (
          <SwiperSlide
            key={item.slug}
            className="hero-slide"
            onMouseEnter={() => setActiveIndex(i)}
          >
            <Link href={`/portfolio/${item.slug}`} className="hover-target">
              <div className={`case-study-name ${i === activeIndex ? "active" : ""}`}>
                <h1>{item.title}</h1>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
