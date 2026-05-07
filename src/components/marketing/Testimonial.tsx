"use client";

import { motion } from "framer-motion";
import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";

const QUOTES = [
  {
    quote:
      "I paid my property tax during a chai break. Got the receipt before my chai was finished. This is the first time a government website has felt like 2026.",
    name: "Aarti Joshi",
    role: "Resident · Dharampeth",
  },
  {
    quote:
      "I run three shops. Renewing my trade license used to take a week of running around. The AI walked me through it in 9 minutes.",
    name: "Vikas Pawar",
    role: "Shop owner · Sitabuldi",
  },
  {
    quote:
      "I reported a streetlight out and watched the crew on the map an hour later. I&rsquo;ve never felt the city work for me like that.",
    name: "Sneha Khaire",
    role: "Resident · Civil Lines",
  },
];

export function Testimonials() {
  return (
    <Section className="mt-24 sm:mt-36">
      <SectionLabel>Voices from the city</SectionLabel>
      <h2 className="font-display mt-5 text-[clamp(32px,5vw,60px)] font-medium leading-[1.0] tracking-tightest text-ink max-w-3xl">
        Built for citizens. <span className="italic font-light text-ink-2">By citizens.</span>
      </h2>

      <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {QUOTES.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            className="surface-card hairline rounded-[24px] p-7 sm:p-8 flex flex-col"
          >
            <span className="font-display text-5xl text-accent leading-none -mb-2">&ldquo;</span>
            <blockquote
              className="font-display text-xl sm:text-[22px] tracking-tight text-ink-2 leading-[1.4]"
              dangerouslySetInnerHTML={{ __html: q.quote }}
            />
            <figcaption className="mt-auto pt-7 flex items-center gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-ink/[0.04] text-ink-2 text-[11px] font-semibold">
                {q.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span>
                <span className="block text-sm font-medium text-ink">{q.name}</span>
                <span className="block text-[12px] text-ink-3">{q.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
