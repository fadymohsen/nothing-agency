"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ComingSoon() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#2D3239] overflow-hidden">
      {/* Subtle background grain / texture */}
      <div className="fixed inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }} />

      <AnimatePresence mode="wait">
        {!splashDone ? (
          /* =============================================
             SPLASH SCREEN — IdentityHero animation
             ============================================= */
          <motion.div
            key="splash"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center bg-[#2D3239]"
          >
            <div className="max-w-[1140px] mx-auto px-6 md:px-4 w-full">
              {/* "Everything starts as" — fades in + slides from left with letter spacing */}
              <motion.p
                initial={{ opacity: 0, x: -40, letterSpacing: "0px" }}
                animate={{ opacity: 1, x: 0, letterSpacing: "4px" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-white !text-[13px] md:!text-[14px] lg:!text-[15px] !font-light uppercase leading-tight mb-0"
              >
                Everything starts as
              </motion.p>

              {/* Gold line — scales from left */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-[2px] bg-[var(--color-accent)] my-10 md:my-14 origin-left"
              />

              {/* Logo — fades in + slides from right */}
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
        ) : (
          /* =============================================
             COMING SOON CONTENT
             ============================================= */
          <motion.div
            key="coming-soon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
          >
            {/* Logo at top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16 md:mb-20"
            >
              <Image
                src="/images/nothing-logo.png"
                alt="Nothing Advertising Agency"
                width={200}
                height={60}
                className="opacity-80"
              />
            </motion.div>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[60px] h-[2px] bg-[var(--color-accent)] mb-10 origin-center"
            />

            {/* COMING SOON headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white text-center !text-[36px] md:!text-[56px] lg:!text-[72px] !font-[100] !leading-[1.1] tracking-[8px] md:tracking-[14px] uppercase mb-6"
              style={{ fontFamily: "var(--font-muli)" }}
            >
              Coming Soon
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-[var(--color-body-text)] text-center text-sm md:text-base max-w-[480px] leading-relaxed tracking-[1px] mb-14"
            >
              We are crafting something extraordinary. Bold ideas, sharp execution,
              and a new standard in creative advertising.
            </motion.p>

            {/* Accent line below */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[120px] h-px bg-white/10 mb-14 origin-center"
            />

            {/* Contact link */}
            <motion.a
              href="mailto:info@nothing-ads.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="group relative text-[var(--color-accent)] text-sm tracking-[3px] uppercase transition-all duration-300 hover:text-white"
            >
              Get in Touch
              <span className="block h-[1px] w-0 bg-white mt-1 transition-all duration-300 group-hover:w-full" />
            </motion.a>

            {/* Bottom copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="absolute bottom-8 text-white/20 text-xs tracking-[2px] uppercase"
            >
              Nothing Advertising Agency
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
