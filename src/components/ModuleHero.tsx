"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
  cta?: React.ReactNode;
  meta?: React.ReactNode;
};

/** Reusable big-type module hero. */
export function ModuleHero({
  eyebrow,
  title,
  italic,
  description,
  cta,
  meta,
}: Props) {
  return (
    <div className="relative pt-6 sm:pt-12 pb-10 sm:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3"
      >
        <span className="h-px w-8 bg-line" />
        <span>{eyebrow}</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="font-display mt-5 text-[clamp(40px,7.5vw,92px)] font-medium leading-[0.96] tracking-tightest text-ink max-w-4xl"
      >
        {title}
        {italic && (
          <>
            {" "}
            <span className="italic font-light text-ink-2">{italic}</span>
          </>
        )}
      </motion.h1>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="mt-6 text-base sm:text-[17px] text-ink-3 max-w-xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
        {cta}
        {meta && <div className="text-sm text-ink-3">{meta}</div>}
      </div>
    </div>
  );
}
