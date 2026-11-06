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
            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[60px] h-[2px] bg-[var(--color-accent)] mb-8 md:mb-10 origin-center"
            />

            {/* YOUR BRAND DESERVES NOTHING. — with logo replacing "nothing" */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white text-center !text-[24px] md:!text-[36px] lg:!text-[48px] !font-[100] !leading-[1.2] tracking-[6px] md:tracking-[10px] uppercase mb-10 md:mb-14 flex flex-col items-center"
              style={{ fontFamily: "var(--font-muli)" }}
            >
              <span>Your brand deserves</span>
              <Image
                src="/images/nothing-logo.png"
                alt="Nothing"
                width={280}
                height={80}
                className="mt-4 md:mt-6 h-[36px] md:h-[50px] lg:h-[64px] w-auto opacity-90"
              />
            </motion.h1>

            {/* Three lines grouped together with spacing above and below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 md:mt-8 mb-12 md:mb-16 flex flex-col items-center gap-2"
            >
              <p className="text-white/70 text-center text-base md:text-lg tracking-[2px]">
                We should talk.
              </p>
              <p className="text-[var(--color-body-text)] text-center text-sm md:text-base tracking-[2px]">
                Website coming soon.
              </p>
              <p className="text-[var(--color-body-text)] text-center text-sm md:text-base tracking-[2px]">
                Ideas available now.
              </p>
            </motion.div>

            {/* Accent line below */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[120px] h-px bg-white/10 mb-10 md:mb-12 origin-center"
            />

            {/* CTA — LET'S MAKE SOMETHING TOGETHER button */}
            <motion.a
              href="https://nothing-ads.com/contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-10 py-4 border border-[var(--color-accent)] text-[var(--color-accent)] text-sm md:text-base tracking-[3px] uppercase transition-all duration-500 hover:bg-[#F5C518] hover:border-[#F5C518] hover:text-black cursor-pointer"
            >
              Let&apos;s make something together.
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
