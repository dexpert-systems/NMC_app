"use client";

import { motion } from "framer-motion";
import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";

export function Mission() {
  return (
    <Section className="mt-24 sm:mt-36">
      <SectionLabel>Why this exists</SectionLabel>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display mt-5 text-[clamp(36px,6vw,72px)] font-medium leading-[0.98] tracking-tightest text-ink max-w-4xl"
      >
        For too long, talking to your city
        <br />
        <span className="italic font-light text-ink-2">felt like talking to a wall.</span>
      </motion.h2>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-[17px] text-ink-2 leading-[1.7]"
        >
          We&rsquo;ve all stood in queues with photocopies. We&rsquo;ve all hunted
          ward offices for receipts. We&rsquo;ve all wondered where exactly our
          tax went, whether the pothole we filed last month is being looked at,
          or what the next steps on our birth certificate are.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-base sm:text-[17px] text-ink-2 leading-[1.7]"
        >
          The Nagpur Municipal Corporation is rebuilding all of that — into one
          place that fits in your pocket, answers in your language, and shows
          you the city as it&rsquo;s being built. This is the result.
        </motion.p>
      </div>
    </Section>
  );
}
