"use client";

import { motion } from "framer-motion";
import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";

const FACTS = [
  {
    big: "12,400",
    line: "trees planted across the city under Hariyali Mission this year.",
  },
  {
    big: "47 km",
    line: "of road maintained from your taxes last year.",
  },
  {
    big: "1.2 lakh",
    line: "citizens served via this platform in April alone.",
  },
];

export function TrustTheatre() {
  return (
    <Section className="mt-20 sm:mt-28">
      <SectionLabel>Where your tax goes</SectionLabel>
      <h2 className="font-display mt-4 text-[clamp(36px,6vw,72px)] font-medium tracking-tightest text-ink leading-[0.98] max-w-3xl">
        You can see <span className="italic font-light text-ink-2">every rupee.</span>
      </h2>
      <p className="mt-5 text-base sm:text-lg text-ink-3 max-w-xl leading-relaxed">
        The city you live in is built by your contributions. Track it in real
        time — ward by ward, project by project.
      </p>

      <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
        {FACTS.map((f, i) => (
          <motion.div
            key={f.big}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.1,
            }}
          >
            <div className="font-display tabular text-[clamp(48px,7vw,80px)] font-medium leading-none tracking-tightest text-ink">
              {f.big}
            </div>
            <p className="mt-4 text-base text-ink-2 leading-relaxed max-w-[28ch]">
              {f.line}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
