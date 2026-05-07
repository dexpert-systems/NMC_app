"use client";

import { motion } from "framer-motion";
import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";
import { Icon } from "../Icon";

const ITEMS = [
  {
    icon: "pay" as const,
    eyebrow: "Property tax",
    title: "Pay in 30 seconds.",
    body: "Find your bill by mobile, ID or map. Understand every rupee. Pay with UPI in one tap. Receipt in your inbox before you put your phone down.",
    accent: "text-accent",
  },
  {
    icon: "spark" as const,
    eyebrow: "Civic AI",
    title: "Ask anything, in plain language.",
    body: "“Why is my bill high?” “Track my application.” “Apply for a water connection.” One sentence — in English, हिन्दी, or मराठी — and the city responds.",
    accent: "text-heritage",
  },
  {
    icon: "report" as const,
    eyebrow: "Live tracking",
    title: "Report once. Watch it move.",
    body: "Snap a photo, drop a pin, tap submit. AI auto-routes to the right department. You get live status — like a delivery — until it&rsquo;s resolved.",
    accent: "text-sage",
  },
];

export function WhatYouCanDo() {
  return (
    <Section className="mt-24 sm:mt-36">
      <SectionLabel>What you can do</SectionLabel>
      <h2 className="font-display mt-5 text-[clamp(32px,5vw,60px)] font-medium leading-[1.0] tracking-tightest text-ink max-w-3xl">
        Three taps. <span className="italic font-light text-ink-2">Most things, done.</span>
      </h2>

      <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            className="surface-card hairline rounded-[24px] p-7 sm:p-8 flex flex-col"
          >
            <span className={"grid place-items-center h-12 w-12 rounded-2xl bg-ink/[0.04] " + it.accent}>
              <Icon name={it.icon} size={20} />
            </span>
            <div className="mt-6 text-[10px] uppercase tracking-[0.18em] text-ink-3">
              {it.eyebrow}
            </div>
            <h3 className="font-display mt-2 text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
              {it.title}
            </h3>
            <p
              className="mt-4 text-[14px] text-ink-2 leading-[1.65]"
              dangerouslySetInnerHTML={{ __html: it.body }}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
