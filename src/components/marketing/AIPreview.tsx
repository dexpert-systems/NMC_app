"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";
import { Icon } from "../Icon";

const TURNS = [
  {
    role: "user" as const,
    text: "Why is my bill higher this quarter?",
  },
  {
    role: "assistant" as const,
    text: "Your Q3 bill is ₹4,820 — up ₹180 from last quarter. The increase is from a 4% revision to the water benefit cess. You qualify for a ₹240 rebate if you pay before May 31 — so paying today actually saves you ₹60 net.",
    cta: "Pay & save ₹60",
  },
];

export function AIPreview() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setShown(1), 600);
    const t2 = setTimeout(() => setShown(2), 1700);
    const t3 = setTimeout(() => setShown(3), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <Section className="mt-24 sm:mt-36">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
        <div>
          <SectionLabel>Watch it work</SectionLabel>
          <h2 className="font-display mt-5 text-[clamp(32px,5vw,60px)] font-medium leading-[1.0] tracking-tightest text-ink">
            The city, <span className="italic font-light text-ink-2">in your language.</span>
          </h2>
          <p className="mt-6 text-base sm:text-[17px] text-ink-2 leading-relaxed max-w-xl">
            Ask in plain English, हिन्दी or मराठी. The assistant routes you,
            pre-fills your data, and explains its reasoning. It never moves
            money on its own — that&rsquo;s always your tap.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-ink-2">
            {[
              "Grounded in real NMC records — no hallucinated answers",
              "Voice-first for low-literacy citizens",
              "Hands off the wallet — you stay in control",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-0.5 grid place-items-center h-5 w-5 rounded-full bg-sage/15 text-sage shrink-0">
                  <Icon name="check" size={11} />
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* Animated chat */}
        <div className="relative">
          <div className="surface-card hairline rounded-[24px] p-5 sm:p-7 min-h-[360px] sm:min-h-[420px] flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-4 border-b border-line-soft">
              <span className="grid place-items-center h-7 w-7 rounded-full bg-accent-soft text-accent">
                <Icon name="spark" size={13} />
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-ink-3">
                Ask NMC
              </span>
              <span className="ml-auto text-[10px] uppercase tracking-[0.16em] text-ink-4 inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot" />
                Live
              </span>
            </div>

            {shown >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-end"
              >
                <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-ink text-bg px-4 py-2.5 text-[14px]">
                  {TURNS[0].text}
                </div>
              </motion.div>
            )}

            {shown === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <span className="grid place-items-center h-7 w-7 rounded-full bg-accent-soft text-accent shrink-0">
                  <Icon name="spark" size={12} />
                </span>
                <div className="flex items-center gap-1.5">
                  {[0, 0.15, 0.3].map((d) => (
                    <motion.span
                      key={d}
                      initial={{ opacity: 0.3, y: 0 }}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{
                        duration: 1.1,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: d,
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-ink-3"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {shown >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-3"
              >
                <span className="grid place-items-center h-7 w-7 rounded-full bg-accent-soft text-accent shrink-0 mt-0.5">
                  <Icon name="spark" size={12} />
                </span>
                <div className="max-w-[88%]">
                  <p className="text-[14px] text-ink leading-relaxed">
                    {TURNS[1].text}
                  </p>
                  <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink text-bg px-3.5 py-1.5 text-[12px] font-medium">
                    {TURNS[1].cta}
                    <Icon name="arrow" size={11} />
                  </button>
                </div>
              </motion.div>
            )}

            <div className="mt-auto pt-4">
              <div className="rounded-full bg-ink/[0.04] px-4 py-2.5 flex items-center gap-3 text-[13px] text-ink-3">
                <Icon name="spark" size={13} />
                <span>Type or speak…</span>
                <kbd className="ml-auto rounded bg-ink/[0.06] dark:bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-medium tabular text-ink-2">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
