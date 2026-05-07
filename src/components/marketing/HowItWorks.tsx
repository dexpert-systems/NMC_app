"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";
import { Icon } from "../Icon";

const STEPS = [
  {
    n: "01",
    title: "Sign in once.",
    body: "Mobile + OTP, or DigiLocker for instant Aadhaar / property auto-load. No passwords. No queue.",
  },
  {
    n: "02",
    title: "Tell us what you need.",
    body: "Type, speak, or tap. The AI finds the right module, pre-fills what it can, and asks only what it must.",
  },
  {
    n: "03",
    title: "Done — and tracked.",
    body: "Every payment, application, and complaint gets a live timeline. Stay in the loop without lifting a finger.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how" className="mt-24 sm:mt-36">
      <SectionLabel>How it works</SectionLabel>
      <h2 className="font-display mt-5 text-[clamp(32px,5vw,60px)] font-medium leading-[1.0] tracking-tightest text-ink max-w-3xl">
        Three steps. <span className="italic font-light text-ink-2">No paperwork.</span>
      </h2>

      <div className="mt-12 sm:mt-16 relative">
        {/* Spine — desktop only */}
        <div
          aria-hidden
          className="hidden lg:block absolute top-1/2 left-[8%] right-[8%] h-px bg-line"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="relative"
            >
              <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                <span className="font-display tabular text-[clamp(32px,4vw,44px)] font-medium leading-none text-ink-4">
                  {s.n}
                </span>
                <span className="hidden lg:block h-px w-full bg-line lg:hidden" />
              </div>
              <h3 className="font-display mt-4 text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] text-ink-2 leading-relaxed max-w-md">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16"
      >
        <Link
          href="/sign-in"
          className="group inline-flex items-center gap-3 rounded-full bg-ink text-bg px-6 py-3.5 text-sm font-medium shadow-lifted hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring"
        >
          Get started
          <span className="grid place-items-center h-6 w-6 rounded-full bg-accent text-white">
            <Icon name="arrow" size={12} />
          </span>
        </Link>
      </motion.div>
    </Section>
  );
}
