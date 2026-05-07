"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Bill } from "@/types";
import { formatINR } from "@/lib/format";

type Props = {
  open: boolean;
  bill: Bill;
  onClose: () => void;
  onPaid: () => void;
};

const APPS = [
  { id: "gpay", name: "Google Pay", color: "#4285F4" },
  { id: "phonepe", name: "PhonePe", color: "#5F259F" },
  { id: "paytm", name: "Paytm", color: "#00BAF2" },
  { id: "bhim", name: "BHIM UPI", color: "#1F9D55" },
];

export function PaymentSheet({ open, bill, onClose, onPaid }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelected(null);
      setPaying(false);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && !paying) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, paying, onClose]);

  const choose = (id: string) => {
    setSelected(id);
    setPaying(true);
    setTimeout(() => onPaid(), 1100);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            onClick={() => !paying && onClose()}
            aria-label="Close"
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-[480px] sm:rounded-[28px] rounded-t-[28px] surface-card hairline overflow-hidden mx-0 sm:mx-4 mb-0 sm:mb-0"
          >
            {/* Drag indicator (mobile) */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <span className="h-1 w-10 rounded-full bg-ink/15" />
            </div>

            <div className="px-6 sm:px-8 pt-5 pb-7">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  Pay {bill.period}
                </div>
                <button
                  onClick={() => !paying && onClose()}
                  className="grid place-items-center h-8 w-8 rounded-full hover:bg-ink/[0.05] text-ink-3 hover:text-ink focus-ring transition-colors"
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-4">
                <div className="font-display tabular text-[clamp(40px,7vw,56px)] font-medium leading-none tracking-tightest text-ink">
                  {formatINR(bill.total)}
                </div>
                <p className="mt-1.5 text-sm text-ink-3">{bill.property.address}</p>
              </div>

              <div className="mt-7">
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3 mb-3">
                  Pay with UPI
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {APPS.map((app, i) => (
                    <motion.button
                      key={app.id}
                      onClick={() => choose(app.id)}
                      disabled={paying}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.15 + i * 0.05,
                      }}
                      className={
                        "group relative flex flex-col items-start gap-2.5 rounded-2xl border border-line bg-surface/60 hover:bg-surface px-3.5 py-3.5 text-left transition-all focus-ring " +
                        (selected === app.id
                          ? "ring-2 ring-accent ring-offset-2 ring-offset-bg"
                          : "hover:border-ink/15") +
                        (paying ? " disabled:opacity-50" : "")
                      }
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className="grid place-items-center h-8 w-8 rounded-lg text-white text-[10px] font-semibold tracking-wider shadow-soft"
                          style={{ background: app.color }}
                        >
                          {app.id === "gpay" ? "GP" : app.id === "phonepe" ? "Pe" : app.id === "paytm" ? "Pa" : "B"}
                        </span>
                        {selected === app.id && paying ? (
                          <Spinner />
                        ) : (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-ink-4 group-hover:text-ink-2 transition-colors"
                          >
                            <path
                              d="M9 6l6 6-6 6"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0 w-full">
                        <div className="text-[13px] font-medium text-ink leading-tight">
                          {app.name}
                        </div>
                        <div className="text-[11px] text-ink-3 mt-0.5">UPI · Instant</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-4 whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldIcon /> Govt secured
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <LockIcon /> 256-bit
                </span>
                <span>·</span>
                <span>NPCI · BBPS</span>
              </div>

              <div className="mt-3 text-center text-[11px] text-ink-4">
                Or use{" "}
                <button className="underline underline-offset-2 hover:text-ink-2">
                  Net banking
                </button>{" "}
                ·{" "}
                <button className="underline underline-offset-2 hover:text-ink-2">
                  Card
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-ink/20 border-t-accent" />
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

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
