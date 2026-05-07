"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING = [
  "Pay my property tax",
  "Why is my bill high?",
  "Update my property details",
  "Apply for water connection",
];

type Props = {
  onSubmit: (q: string) => void;
};

/** First-time-user hero — type-led, single command bar at center. */
export function AskNMC({ onSubmit }: Props) {
  const [value, setValue] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 3000);
    return () => clearInterval(t);
  }, []);

  const submit = (q: string) => {
    if (!q.trim()) return;
    onSubmit(q.trim());
  };

  return (
    <div className="relative w-full max-w-[900px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3"
      >
        <span className="h-px w-8 bg-line" />
        <span>Welcome</span>
        <span className="h-px w-8 bg-line" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="font-display mt-5 text-[clamp(40px,7vw,92px)] font-medium leading-[0.96] tracking-tightest text-ink"
      >
        How can we help{" "}
        <span className="italic font-light text-ink-2">today?</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        className="mt-5 text-[15px] sm:text-base text-ink-3 max-w-md mx-auto leading-relaxed"
      >
        Type a question. Speak it. Or tap a suggestion below.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="mt-12 max-w-[640px] mx-auto"
      >
        <div className="glass relative flex items-center gap-3 rounded-full pl-5 pr-2 py-2.5 hover:shadow-card transition-shadow">
          <span className="grid place-items-center h-10 w-10 rounded-full bg-accent-soft text-accent shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 2 L13.8 9 L21 12 L13.8 15 L12 22 L10.2 15 L3 12 L10.2 9 Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <div className="relative flex-1 min-h-[28px]">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              className="absolute inset-0 w-full bg-transparent outline-none text-base sm:text-lg text-ink placeholder:text-transparent focus-ring rounded"
              aria-label="Ask NMC"
            />
            {!value && (
              <div className="absolute inset-0 flex items-center text-base sm:text-lg text-ink-3 pointer-events-none text-left">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {ROTATING[idx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label="Voice"
            className="grid place-items-center h-10 w-10 rounded-full text-ink-3 hover:text-ink hover:bg-ink/[0.04] transition-colors focus-ring"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="submit"
            disabled={!value.trim()}
            aria-label="Submit"
            className="grid place-items-center h-11 w-11 rounded-full bg-ink text-bg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.04] active:scale-[0.96] transition-transform focus-ring"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["Pay tax", "File complaint", "Birth certificate", "Trade license"].map(
            (q) => (
              <button
                key={q}
                type="button"
                onClick={() => submit(q)}
                className="rounded-full bg-surface/40 hover:bg-surface text-ink-3 hover:text-ink border border-line text-[12px] px-3.5 py-1.5 transition-all focus-ring"
              >
                {q}
              </button>
            ),
          )}
        </div>
      </motion.form>
    </div>
  );
}
