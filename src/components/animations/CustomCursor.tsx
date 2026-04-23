"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursor2Ref = useRef<HTMLDivElement>(null);
  const cursor3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursor2 = cursor2Ref.current;
    const cursor3 = cursor3Ref.current;
    if (!cursor || !cursor2 || !cursor3) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursor2.style.left = e.clientX + "px";
      cursor2.style.top = e.clientY + "px";
      cursor3.style.left = e.clientX + "px";
      cursor3.style.top = e.clientY + "px";
    };

    const onMouseOver = () => {
      cursor2.classList.add("hover");
      cursor3.classList.add("hover");
    };
    const onMouseOut = () => {
      cursor2.classList.remove("hover");
      cursor3.classList.remove("hover");
    };

    document.body.addEventListener("mousemove", onMouseMove);

    const addHoverListeners = () => {
      document.querySelectorAll(".hover-target").forEach((el) => {
        el.addEventListener("mouseover", onMouseOver);
        el.addEventListener("mouseout", onMouseOut);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor2" ref={cursor2Ref} />
      <div className="cursor3" ref={cursor3Ref} />
    </>
  );
}
