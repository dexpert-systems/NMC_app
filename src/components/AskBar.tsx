"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING = [
  "Why is my bill high?",
  "When is my next due date?",
  "Apply for water connection",
  "File a complaint about garbage",
  "Get a birth certificate",
  "Register a property update",
];

type Props = {
  onSubmit: (q: string) => void;
};

/** Compact, secondary command bar — sits under the hero card. */
export function AskBar({ onSubmit }: Props) {
  const [value, setValue] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setInterval(
      () => setPlaceholderIdx((i) => (i + 1) % ROTATING.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submit = (q: string) => {
    if (!q.trim()) return;
    onSubmit(q.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
      className="mt-12 max-w-[640px] mx-auto"
    >
      <div className="text-center text-[11px] uppercase tracking-[0.20em] text-ink-3 mb-4">
        Or ask anything else
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="glass relative flex items-center gap-3 rounded-full pl-5 pr-2 py-2 hover:shadow-card transition-shadow"
      >
        <SparkIcon />
        <div className="relative flex-1 min-h-[28px]">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            className="absolute inset-0 w-full bg-transparent outline-none text-[15px] text-ink placeholder:text-transparent focus-ring rounded"
            aria-label="Ask NMC"
          />
          {!value && (
            <div className="absolute inset-0 flex items-center text-[15px] text-ink-3 pointer-events-none">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={placeholderIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {ROTATING[placeholderIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>
        <kbd className="hidden sm:inline-block rounded bg-ink/[0.06] dark:bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-medium tabular text-ink-2">
          ⌘K
        </kbd>
        <button
          type="submit"
          aria-label="Submit"
          disabled={!value.trim()}
          className="grid place-items-center h-10 w-10 rounded-full bg-ink text-bg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.04] active:scale-[0.96] transition-transform focus-ring"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {["Water bill", "Trade license", "File complaint", "Birth certificate"].map(
          (q) => (
            <button
              key={q}
              onClick={() => submit(q)}
              className="rounded-full bg-surface/40 hover:bg-surface text-ink-3 hover:text-ink border border-line text-[12px] px-3.5 py-1.5 transition-all focus-ring"
            >
              {q}
            </button>
          ),
        )}
      </div>
    </motion.div>
  );
}

function SparkIcon() {
  return (
    <span className="grid place-items-center h-9 w-9 rounded-full bg-accent-soft text-accent shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2 L13.8 9 L21 12 L13.8 15 L12 22 L10.2 15 L3 12 L10.2 9 Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
