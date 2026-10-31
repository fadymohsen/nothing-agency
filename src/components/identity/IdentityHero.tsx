"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function IdentityHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-[140px] md:pt-[180px] pb-[100px] bg-[#2D3239]">
      <div className="max-w-[1140px] mx-auto px-6 md:px-4 w-full">
        {/* Text — fades in + slides from left with letter spacing animation */}
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
          />
        </motion.div>
      </div>
    </section>
  );
}
