"use client";

import { motion } from "framer-motion";
import type { Bill } from "@/types";
import { formatINR } from "@/lib/format";

type Props = {
  bill: Bill;
  onAskAnything: () => void;
};

export function ConfirmCheck({ bill, onAskAnything }: Props) {
  const txnId = `NMC${Math.random().toString(36).slice(2, 8).toUpperCase()}${Date.now().toString().slice(-4)}`;

  return (
    <div className="relative w-full max-w-[1100px] mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-24 text-center">
      {/* Cinematic check */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid place-items-center h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-sage/10 relative"
      >
        <span className="absolute inset-0 rounded-full bg-sage/20 animate-ping" style={{ animationDuration: "2s" }} />
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <motion.circle
            cx="28" cy="28" r="26"
            stroke="#4F8B5C"
            strokeWidth="1.8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
          <motion.path
            d="M17 28 l8 8 l14 -16"
            stroke="#4F8B5C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10"
      >
        <div className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
          Payment received
        </div>
        <h1 className="font-display mt-3 text-[clamp(56px,11vw,128px)] font-medium leading-[0.95] tracking-tightest text-ink">
          Done.
        </h1>
        <p className="mt-5 text-[15px] sm:text-base text-ink-2 max-w-md mx-auto">
          You&rsquo;ve paid{" "}
          <span className="text-ink font-medium tabular">{formatINR(bill.total)}</span>{" "}
          for {bill.property.address}.
        </p>
      </motion.div>

      {/* Receipt mini-card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 max-w-[440px] mx-auto"
      >
        <div className="rounded-[20px] surface-card hairline px-6 py-5 text-left">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink-3 mb-3">
            <span>Receipt</span>
            <span className="tabular text-ink-4">{txnId}</span>
          </div>
          <div className="space-y-2.5 text-sm">
            <Row label="Property" value={bill.property.id} />
            <Row label="Period" value={bill.period} />
            <Row label="Method" value="UPI · Instant" />
            <div className="border-t border-line-soft my-3" />
            <Row
              label="Total paid"
              value={<span className="font-medium tabular text-ink">{formatINR(bill.total)}</span>}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <ActionPill label="Download PDF" />
          <ActionPill label="WhatsApp" />
          <ActionPill label="Email" />
        </div>
      </motion.div>

      {/* Where it goes — tease */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="mt-14 max-w-[480px] mx-auto"
      >
        <div className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
          Where this goes
        </div>
        <p className="font-display mt-3 text-2xl sm:text-3xl text-ink-2 italic leading-snug">
          Your{" "}
          <span className="not-italic font-medium text-ink tabular">
            {formatINR(Math.round(bill.total * 0.42))}
          </span>{" "}
          will fund road repairs in {bill.property.ward} next quarter.
        </p>
        <button className="mt-5 text-sm text-ink-3 hover:text-ink underline underline-offset-4 transition-colors focus-ring rounded">
          See the full impact →
        </button>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.4 }}
        onClick={onAskAnything}
        className="mt-16 text-[12px] uppercase tracking-[0.20em] text-ink-3 hover:text-ink transition-colors focus-ring rounded"
      >
        ← Back to home
      </motion.button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-3">{label}</span>
      <span className="text-ink-2">{value}</span>
    </div>
  );
}

function ActionPill({ label }: { label: string }) {
  return (
    <button className="rounded-full bg-surface/60 hover:bg-surface text-ink-3 hover:text-ink border border-line text-[12px] px-3.5 py-1.5 transition-all focus-ring">
      {label}
    </button>
  );
}
