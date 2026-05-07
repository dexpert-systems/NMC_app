"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Bill } from "@/types";
import { formatINR } from "@/lib/format";

type Props = {
  bill: Bill;
  onPayClick: () => void;
  onDifferentProperty: () => void;
};

/**
 * Type-led hero with the bill preview baked in.
 * Default state is "returning user" — property + dues already known.
 * Clicking [Pay ₹X with UPI] is the entire critical path.
 */
export function HeroCard({ bill, onPayClick, onDifferentProperty }: Props) {
  return (
    <div className="relative w-full max-w-[1100px] mx-auto px-5 sm:px-8 pt-6 sm:pt-10 pb-24">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3"
      >
        <span className="h-px w-8 bg-line" />
        <span>Nagpur · Smart City</span>
        <span className="h-px w-8 bg-line" />
      </motion.div>

      {/* Display headline */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="font-display text-center mt-5 text-[clamp(44px,8vw,104px)] font-medium leading-[0.96] tracking-tightest text-ink"
      >
        Pay your tax,
        <br />
        <span className="italic font-light text-ink-2">in a moment.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        className="text-center mt-5 sm:mt-6 text-[15px] sm:text-base text-ink-3 max-w-md mx-auto leading-relaxed"
      >
        Welcome back, Rajesh. We&rsquo;ve found your property dues —
        ready when you are.
      </motion.p>

      {/* The big card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
        className="mt-12 sm:mt-16 max-w-[680px] mx-auto"
      >
        <div className="relative rounded-[28px] surface-card hairline overflow-hidden">
          {/* Top label strip */}
          <div className="flex items-center justify-between px-6 sm:px-8 pt-5 pb-3 border-b border-line-soft">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Property bill · {bill.period}
            </div>
            <span className="text-[11px] tabular text-ink-4">
              {bill.property.id}
            </span>
          </div>

          <div className="px-6 sm:px-10 pt-7 sm:pt-9 pb-8 sm:pb-10">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink leading-tight">
                  {bill.property.address}
                </h2>
                <p className="mt-1.5 text-sm text-ink-3">
                  {bill.property.ownerName} · {bill.property.category}
                </p>
              </div>
              <RebatePill text={bill.rebateText} />
            </div>

            {/* The amount — display element */}
            <div className="mt-8 sm:mt-10 flex items-end justify-between gap-6 flex-wrap">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  Amount due
                </div>
                <div className="font-display tabular mt-1 text-[clamp(56px,9vw,96px)] font-medium leading-[0.95] tracking-tightest text-ink">
                  <CountUp to={bill.total} />
                </div>
              </div>
              <DueChip days={bill.dueInDays} />
            </div>

            {/* Ward progress, restrained */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink-3 mb-2">
                <span>{bill.property.ward} ward</span>
                <span className="tabular">{bill.paidPercentInWard}% paid</span>
              </div>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bill.paidPercentInWard}%` }}
                  transition={{
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.6,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                />
              </div>
            </div>

            {/* CTA row */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={onPayClick}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-ink text-bg px-7 py-4 text-[15px] font-medium shadow-lifted hover:scale-[1.01] active:scale-[0.99] transition-transform focus-ring overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Pay {formatINR(bill.total)}
                  <span className="text-ink-3 group-hover:text-bg/70 transition-colors">·</span>
                  <span className="text-ink-3 group-hover:text-bg/70 transition-colors">UPI</span>
                </span>
                <span
                  className="relative z-10 grid place-items-center h-7 w-7 rounded-full bg-accent text-white"
                  aria-hidden
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <button
                onClick={onDifferentProperty}
                className="text-sm text-ink-3 hover:text-ink transition-colors focus-ring rounded px-3 py-2"
              >
                Different property?
              </button>
            </div>
          </div>

          {/* Trust footnote */}
          <div className="px-6 sm:px-10 py-4 border-t border-line-soft flex items-center justify-between text-[11px] text-ink-4">
            <span className="inline-flex items-center gap-1.5">
              <ShieldIcon />
              Govt secured · 256-bit
            </span>
            <span className="hidden sm:inline tabular">
              NPCI · BBPS · Maharashtra Gov
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CountUp({ to }: { to: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{formatINR(n)}</span>;
}

function RebatePill({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-sage/10 text-sage px-3 py-1.5 text-[11px] font-medium">
      <span className="h-1.5 w-1.5 rounded-full bg-sage" />
      {text}
    </div>
  );
}

function DueChip({ days }: { days: number }) {
  const tone =
    days <= 3 ? "bg-amber/10 text-amber" : "bg-ink/[0.04] text-ink-2";
  return (
    <div className={`inline-flex flex-col items-end ${tone} rounded-2xl px-4 py-2.5`}>
      <span className="text-[10px] uppercase tracking-[0.16em] opacity-70">
        Due in
      </span>
      <span className="font-display tabular text-2xl font-medium leading-none mt-0.5">
        {days}<span className="text-sm font-normal opacity-60 ml-1">days</span>
      </span>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2 4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
