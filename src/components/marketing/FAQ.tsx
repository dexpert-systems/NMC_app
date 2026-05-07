"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";

const FAQS = [
  {
    q: "Is this an official NMC platform?",
    a: "Yes. The platform is built and operated by Nagpur Municipal Corporation, and integrates with all NMC departments and the Government of Maharashtra.",
  },
  {
    q: "Are payments safe?",
    a: "Every payment runs through NPCI / BBPS rails with 256-bit encryption. We never store card details. The AI never moves money — only you do, with a confirmed tap.",
  },
  {
    q: "Do I need to download an app?",
    a: "Not unless you want to. The site is a Progressive Web App — fast, offline-friendly, installable from any modern browser on Android, iOS or desktop.",
  },
  {
    q: "Is it available in Marathi and Hindi?",
    a: "Yes. Type or speak in English, हिन्दी, or मराठी — the assistant understands all three and responds in the language you used.",
  },
  {
    q: "What about citizens without smartphones?",
    a: "Every ward office has assisted kiosks running this same platform, so a clerk can complete the same flow for you in under 2 minutes.",
  },
  {
    q: "Where does my data go?",
    a: "All data stays inside India, on government-cloud infrastructure. We do not share personal data with third parties. You can request a full export or deletion at any time.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="mt-24 sm:mt-36">
      <SectionLabel>Common questions</SectionLabel>
      <h2 className="font-display mt-5 text-[clamp(32px,5vw,60px)] font-medium leading-[1.0] tracking-tightest text-ink max-w-3xl">
        Things <span className="italic font-light text-ink-2">people often ask.</span>
      </h2>

      <div className="mt-12 sm:mt-14 max-w-3xl">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-line">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left focus-ring rounded"
                aria-expanded={isOpen}
              >
                <span className="font-display text-lg sm:text-xl tracking-tight text-ink">
                  {f.q}
                </span>
                <span
                  className={
                    "shrink-0 grid place-items-center h-7 w-7 rounded-full border border-line text-ink-3 transition-transform " +
                    (isOpen ? "rotate-45" : "")
                  }
                  aria-hidden
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[15px] text-ink-2 leading-relaxed max-w-[60ch]">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
