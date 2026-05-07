"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "../Icon";
import { ServiceSlider } from "./ServiceSlider";

export function MarketingHero() {
  return (
    <section className="relative z-10 max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-14 pb-20 sm:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-50 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent live-dot" />
            </span>
            New · Civic AI for Nagpur
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="font-display mt-6 text-[clamp(44px,7.5vw,96px)] font-medium leading-[0.96] tracking-tightest text-ink"
          >
            A new front door
            <br />
            <span className="italic font-light text-ink-2">for the city you live in.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="mt-7 text-base sm:text-lg text-ink-3 max-w-xl leading-relaxed"
          >
            Pay your property tax in 30 seconds. Ask anything in plain language —
            English, हिन्दी or मराठी. Watch every rupee become a road, a
            streetlight, a park.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/sign-in"
              className="group inline-flex items-center gap-3 rounded-full bg-ink text-bg px-7 py-4 text-[15px] font-medium shadow-lifted hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring"
            >
              Sign in
              <span className="grid place-items-center h-7 w-7 rounded-full bg-accent text-white">
                <Icon name="arrow" size={13} />
              </span>
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm text-ink-2 hover:text-ink transition-colors focus-ring"
            >
              See how it works
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M6 13l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-ink-4"
          >
            <span className="inline-flex items-center gap-1.5">
              <Icon name="shield" size={11} />
              Govt of Maharashtra
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="lock" size={11} />
              256-bit secured
            </span>
            <span>NPCI · BBPS · Aadhaar</span>
          </motion.div>
        </div>

        <div className="relative">
          <ServiceSlider />
        </div>
      </div>
    </section>
  );
}
