"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "../Section";
import { Icon } from "../Icon";

export function CtaBand() {
  return (
    <Section className="mt-24 sm:mt-36">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] bg-ink text-bg px-6 sm:px-12 lg:px-16 py-14 sm:py-20"
      >
        {/* glow */}
        <div
          aria-hidden
          className="absolute -top-1/2 -right-1/4 h-[140%] w-[60%] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(242,107,43,0.55), transparent 70%)",
          }}
        />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-bg/60">
              Sign in once · use forever
            </div>
            <h2 className="font-display mt-4 text-[clamp(36px,5.5vw,72px)] font-medium leading-[0.98] tracking-tightest">
              Your city,
              <br />
              <span className="italic font-light text-bg/70">a tap away.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/sign-in"
              className="group inline-flex items-center gap-3 rounded-full bg-bg text-ink px-7 py-4 text-[15px] font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring"
            >
              Sign in to NMC
              <span className="grid place-items-center h-7 w-7 rounded-full bg-accent text-white">
                <Icon name="arrow" size={13} />
              </span>
            </Link>
            <p className="text-[12px] text-bg/60 max-w-xs">
              Mobile + OTP, DigiLocker, or continue as a demo citizen. Takes
              under 30 seconds.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
