"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { portfolioItems } from "@/data/portfolio";

export default function PortfolioSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startDragX: number } | null>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = portfolioItems.length;
  const [titleWidth, setTitleWidth] = useState(420);

  // Responsive title width matching CSS
  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w <= 575) setTitleWidth(180);
      else if (w <= 767) setTitleWidth(220);
      else if (w <= 991) setTitleWidth(260);
      else if (w <= 1199) setTitleWidth(320);
      else setTitleWidth(420);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeIndex) return;
      const clamped = Math.max(0, Math.min(total - 1, index));
      setIsTransitioning(true);
      setActiveIndex(clamped);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [activeIndex, isTransitioning, total]
  );

  const goNext = useCallback(() => {
    goToSlide((activeIndex + 1) % total);
  }, [activeIndex, total, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((activeIndex - 1 + total) % total);
  }, [activeIndex, total, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Mouse wheel navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let wheelTimeout: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0 || e.deltaX > 0) goNext();
        else goPrev();
      }, 50);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev]);

  // Scrubber drag
  const handleScrubberDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragRef.current = { startX: clientX, startDragX: dragX };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current || !trackRef.current) return;
      const clientX =
        "touches" in e
          ? (e as TouchEvent).touches[0].clientX
          : (e as MouseEvent).clientX;
      const diff = clientX - dragRef.current.startX;
      const trackWidth = trackRef.current.offsetWidth;
      const newX = Math.max(
        0,
        Math.min(trackWidth, dragRef.current.startDragX + diff)
      );
      setDragX(newX);
    };

    const handleUp = () => {
      if (!trackRef.current) {
        setIsDragging(false);
        return;
      }
      const trackWidth = trackRef.current.offsetWidth;
      const ratio = dragX / trackWidth;
      const newIndex = Math.round(ratio * (total - 1));
      goToSlide(newIndex);
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, dragX, total, goToSlide]);

  // Sync scrubber position to active slide
  useEffect(() => {
    if (!isDragging && trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      setDragX((activeIndex / (total - 1)) * trackWidth);
    }
  }, [activeIndex, total, isDragging]);

  // Touch swipe on main container
  const touchRef = useRef<{ startX: number; startY: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const diffX = e.changedTouches[0].clientX - touchRef.current.startX;
    const diffY = e.changedTouches[0].clientY - touchRef.current.startY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX < 0) goNext();
      else goPrev();
    }
    touchRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="euthenia-slider"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images */}
      <div className="euthenia-bg-images">
        {portfolioItems.map((item, i) => (
          <div
            key={item.slug}
            className={`euthenia-bg-image ${i === activeIndex ? "active" : ""}`}
            style={{ backgroundImage: `url('${item.image}')` }}
          />
        ))}
      </div>

      {/* Large watermark title at bottom */}
      <div className="euthenia-watermark">
        {portfolioItems.map((item, i) => (
          <span
            key={item.slug}
            className={`euthenia-watermark-text ${i === activeIndex ? "active" : ""}`}
          >
            {item.title}
          </span>
        ))}
      </div>

      {/* Title carousel row */}
      <div className="euthenia-titles">
        <div
          className="euthenia-titles-track"
          style={{
            transform: `translateX(calc(50vw - ${activeIndex * (titleWidth + 60) + titleWidth / 2}px))`,
          }}
        >
          {portfolioItems.map((item, i) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className={`euthenia-title hover-target ${i === activeIndex ? "active" : ""}`}
              onClick={(e) => {
                if (i !== activeIndex) {
                  e.preventDefault();
                  goToSlide(i);
                }
              }}
            >
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Slide counter */}
      <div className="euthenia-counter">
        <span className="euthenia-counter-current">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="euthenia-counter-line" />
        <span className="euthenia-counter-total">
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Scrubber dot */}
      <div className="euthenia-scrubber">
        <div className="euthenia-scrubber-track" ref={trackRef}>
          <div
            ref={scrubberRef}
            className="euthenia-scrubber-dot hover-target"
            style={{
              transform: `translateX(${dragX}px)`,
              transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            onMouseDown={handleScrubberDown}
            onTouchStart={handleScrubberDown}
          />
        </div>
      </div>
    </div>
  );
}
