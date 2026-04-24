"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { portfolioItems } from "@/data/portfolio";

export default function PortfolioSlider() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startDragX: number } | null>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = portfolioItems.length;
  const [titleWidth, setTitleWidth] = useState(420);
  const [titleOffset, setTitleOffset] = useState(100);
  const [gap, setGap] = useState(200);

  // Continuous scroll position (in pixels)
  const scrollPosRef = useRef(0);
  const [scrollPos, setScrollPos] = useState(0);
  const rafRef = useRef<number | null>(null);
  const targetScrollRef = useRef(0);

  // Compute step size (distance per slide)
  const stepSize = titleWidth + gap;
  const maxScroll = (total - 1) * stepSize;

  // Derive active index from scroll position
  const activeIndex = Math.round(scrollPos / stepSize);
  const clampedActive = Math.max(0, Math.min(total - 1, activeIndex));

  // Responsive title width matching CSS
  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w <= 575) {
        setTitleWidth(180);
        setTitleOffset(Math.round(w / 2 - 90));
        setGap(200);
      } else if (w <= 767) {
        setTitleWidth(220);
        setTitleOffset(Math.round(w / 2 - 110));
        setGap(200);
      } else if (w <= 991) {
        setTitleWidth(260);
        setTitleOffset(80);
        setGap(200);
      } else if (w <= 1199) {
        setTitleWidth(320);
        setTitleOffset(80);
        setGap(200);
      } else {
        setTitleWidth(420);
        setTitleOffset(100);
        setGap(200);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Smooth animation loop — lerp toward target
  const animate = useCallback(() => {
    const current = scrollPosRef.current;
    const target = targetScrollRef.current;
    const diff = target - current;

    if (Math.abs(diff) < 0.5) {
      scrollPosRef.current = target;
      setScrollPos(target);
      rafRef.current = null;
      return;
    }

    scrollPosRef.current = current + diff * 0.12;
    setScrollPos(scrollPosRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const startAnimation = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollTo = useCallback(
    (pos: number) => {
      targetScrollRef.current = Math.max(0, Math.min(maxScroll, pos));
      startAnimation();
    },
    [maxScroll, startAnimation]
  );

  const goToSlide = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      scrollTo(clamped * stepSize);
    },
    [total, stepSize, scrollTo]
  );

  const goNext = useCallback(() => {
    const nextIndex = Math.min(total - 1, clampedActive + 1);
    goToSlide(nextIndex);
  }, [clampedActive, total, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex = Math.max(0, clampedActive - 1);
    goToSlide(prevIndex);
  }, [clampedActive, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Mouse wheel — smooth continuous scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      const newTarget = Math.max(
        0,
        Math.min(maxScroll, targetScrollRef.current + delta * 0.8)
      );
      targetScrollRef.current = newTarget;
      startAnimation();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [maxScroll, startAnimation]);

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

      // Also update scroll position from scrubber
      const ratio = newX / trackWidth;
      const newScrollPos = ratio * maxScroll;
      scrollPosRef.current = newScrollPos;
      targetScrollRef.current = newScrollPos;
      setScrollPos(newScrollPos);
    };

    const handleUp = () => {
      if (!trackRef.current) {
        setIsDragging(false);
        return;
      }
      // Snap to nearest slide
      const nearestIndex = Math.round(scrollPosRef.current / stepSize);
      goToSlide(nearestIndex);
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
  }, [isDragging, dragX, maxScroll, stepSize, goToSlide]);

  // Sync scrubber position to scroll
  useEffect(() => {
    if (!isDragging && trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      const ratio = maxScroll > 0 ? scrollPos / maxScroll : 0;
      setDragX(ratio * trackWidth);
    }
  }, [scrollPos, maxScroll, isDragging]);

  // Prevent page scroll on touch within slider
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const preventScroll = (e: TouchEvent) => e.preventDefault();
    container.addEventListener("touchmove", preventScroll, { passive: false });
    return () => container.removeEventListener("touchmove", preventScroll);
  }, []);

  // Touch drag on main container — continuous smooth scroll
  const touchRef = useRef<{ startY: number; startScroll: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Stop any ongoing animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    touchRef.current = {
      startY: e.touches[0].clientY,
      startScroll: scrollPosRef.current,
    };
  };

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchRef.current) return;
      const diffY = touchRef.current.startY - e.touches[0].clientY;
      const newPos = Math.max(
        0,
        Math.min(maxScroll, touchRef.current.startScroll + diffY * 1.5)
      );
      scrollPosRef.current = newPos;
      targetScrollRef.current = newPos;
      setScrollPos(newPos);
    },
    [maxScroll]
  );

  const handleTouchEnd = () => {
    if (!touchRef.current) return;
    // Snap to nearest slide after releasing
    const nearestIndex = Math.round(scrollPosRef.current / stepSize);
    goToSlide(nearestIndex);
    touchRef.current = null;
  };

  // Compute the track translateX from continuous scroll position
  const trackTranslateX = titleOffset - scrollPos;

  return (
    <div
      ref={containerRef}
      className="euthenia-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images */}
      <div className="euthenia-bg-images">
        {portfolioItems.map((item, i) => {
          const visible =
            hoveredIndex !== null ? i === hoveredIndex : i === clampedActive;
          return (
            <div
              key={item.slug}
              className={`euthenia-bg-image ${visible ? "active" : ""}`}
              style={{ backgroundImage: `url('${item.image}')` }}
            />
          );
        })}
      </div>

      {/* Large watermark title at bottom */}
      <div className="euthenia-watermark">
        {portfolioItems.map((item, i) => {
          const visible =
            hoveredIndex !== null ? i === hoveredIndex : i === clampedActive;
          return (
            <span
              key={item.slug}
              className={`euthenia-watermark-text ${visible ? "active" : ""}`}
            >
              {item.title}
            </span>
          );
        })}
      </div>

      {/* Title carousel row */}
      <div className="euthenia-titles">
        <div
          className="euthenia-titles-track"
          style={{
            transform: `translateX(${trackTranslateX}px)`,
            transition: "none",
          }}
        >
          {portfolioItems.map((item, i) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className={`euthenia-title hover-target ${i === clampedActive ? "active" : ""}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Slide counter */}
      <div className="euthenia-counter">
        <span className="euthenia-counter-current">
          {String(clampedActive + 1).padStart(2, "0")}
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
              transform: `translateX(${dragX}px) translateY(-50%)`,
              transition: isDragging
                ? "none"
                : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            onMouseDown={handleScrubberDown}
            onTouchStart={handleScrubberDown}
          />
        </div>
      </div>
    </div>
  );
}
