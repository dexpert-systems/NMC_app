"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "1.4 lakh", label: "citizens served / month" },
  { value: "₹284 Cr", label: "collected this year" },
  { value: "30 sec", label: "avg payment time" },
  { value: "42", label: "services online" },
];

export function MarketingStats() {
  return (
    <section className="relative z-10 max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="surface-card hairline rounded-[28px] px-6 sm:px-10 py-7 sm:py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
          >
            <div className="font-display tabular text-[clamp(28px,4.5vw,44px)] font-medium leading-none tracking-tight text-ink">
              {s.value}
            </div>
            <div className="mt-2 text-[12px] uppercase tracking-[0.16em] text-ink-3">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
