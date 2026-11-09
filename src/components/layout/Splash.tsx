"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/lib/useLang";

const SPLASH_MS = 4000;

export default function Splash() {
  const lang = useLang();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, SPLASH_MS);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100001] flex items-center bg-[#2D3239]"
          dir="ltr"
        >
          <div className="max-w-[1140px] mx-auto px-6 md:px-4 w-full">
            <motion.p
              initial={{ opacity: 0, x: -40, letterSpacing: "0px" }}
              animate={{ opacity: 1, x: 0, letterSpacing: lang === "ar" ? "0px" : "4px" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-white !text-[13px] md:!text-[14px] lg:!text-[15px] !font-light uppercase leading-tight mb-0"
            >
              {lang === "ar" ? "كل شيء يبدأ من" : "Everything starts as"}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full h-[2px] bg-[var(--color-accent)] my-10 md:my-14 origin-left"
            />

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex justify-end"
            >
              <Image
                src="/images/nothing-logo.png"
                alt="Nothing Advertising Agency"
                width={280}
                height={80}
                className="opacity-90"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
