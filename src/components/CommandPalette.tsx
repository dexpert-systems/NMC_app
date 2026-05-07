"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "@/lib/nav";
import { Icon } from "./Icon";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SUGGESTIONS = [
  { q: "Pay my property tax", href: "/property" },
  { q: "Why is my bill high?", href: "/ask?q=Why+is+my+bill+high" },
  { q: "Report a pothole", href: "/report" },
  { q: "Apply for birth certificate", href: "/services/birth-certificate" },
  { q: "Show ward projects", href: "/projects" },
  { q: "Today's water shutdown", href: "/alerts" },
];

export function CommandPalette({ open, onClose }: Props) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    } else {
      setQ("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const matches = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return [
      ...NAV.filter(
        (n) =>
          n.label.toLowerCase().includes(needle) ||
          n.blurb.toLowerCase().includes(needle),
      ).map((n) => ({ kind: "page" as const, ...n })),
      ...SUGGESTIONS.filter((s) => s.q.toLowerCase().includes(needle)).map(
        (s) => ({ kind: "ai" as const, ...s }),
      ),
    ];
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[14vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute inset-0 bg-ink/30 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[640px] surface-card hairline rounded-[24px] overflow-hidden"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const first = matches[0];
                if (first) {
                  window.location.href = first.kind === "ai" ? first.href : first.href;
                  onClose();
                } else if (q.trim()) {
                  window.location.href = `/ask?q=${encodeURIComponent(q.trim())}`;
                  onClose();
                }
              }}
              className="flex items-center gap-3 px-5 py-4 border-b border-line"
            >
              <span className="text-accent">
                <Icon name="spark" size={18} />
              </span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ask NMC anything…"
                className="flex-1 bg-transparent outline-none text-base sm:text-lg text-ink placeholder:text-ink-3 focus-ring rounded"
                spellCheck={false}
                autoComplete="off"
              />
              <kbd className="rounded bg-ink/[0.06] dark:bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-medium tabular text-ink-3">
                ESC
              </kbd>
            </form>
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {!q && (
                <>
                  <SectionHead>Jump to</SectionHead>
                  {NAV.map((n) => (
                    <PaletteRow
                      key={n.href}
                      onClose={onClose}
                      href={n.href}
                      icon={<Icon name={n.icon} size={14} />}
                      title={n.label}
                      subtitle={n.blurb}
                    />
                  ))}
                  <SectionHead>Try asking</SectionHead>
                  {SUGGESTIONS.slice(0, 3).map((s) => (
                    <PaletteRow
                      key={s.q}
                      onClose={onClose}
                      href={s.href}
                      icon={<Icon name="spark" size={14} />}
                      title={s.q}
                      subtitle="AI · routes you instantly"
                    />
                  ))}
                </>
              )}
              {q && matches.length > 0 && (
                <>
                  <SectionHead>Results</SectionHead>
                  {matches.map((m, i) => (
                    <PaletteRow
                      key={i}
                      onClose={onClose}
                      href={m.kind === "ai" ? m.href : m.href}
                      icon={
                        <Icon name={m.kind === "ai" ? "spark" : (m as { icon: "spark"|"pay"|"map"|"report"|"services"|"projects"|"alerts"|"data"|"community" }).icon} size={14} />
                      }
                      title={m.kind === "ai" ? m.q : m.label}
                      subtitle={m.kind === "ai" ? "AI suggestion" : (m as { blurb: string }).blurb}
                    />
                  ))}
                </>
              )}
              {q && matches.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-ink-3">
                    Ask the AI assistant about{" "}
                    <span className="text-ink">&ldquo;{q}&rdquo;</span>?
                  </p>
                  <Link
                    onClick={onClose}
                    href={`/ask?q=${encodeURIComponent(q)}`}
                    className="inline-flex items-center gap-2 mt-3 rounded-full bg-ink text-bg px-4 py-2 text-sm font-medium hover:scale-[1.02] transition-transform"
                  >
                    Ask <Icon name="arrow" size={13} />
                  </Link>
                </div>
              )}
            </div>
            <div className="px-5 py-3 border-t border-line-soft flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-ink-4">
              <span className="inline-flex items-center gap-2">
                <Icon name="shield" size={11} /> Govt secured
              </span>
              <span>
                <kbd className="rounded bg-ink/[0.06] dark:bg-white/[0.08] px-1.5 py-0.5 tabular text-ink-3">↵</kbd>{" "}
                to ask
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 pt-3 pb-1 text-[10px] uppercase tracking-[0.18em] text-ink-4">
      {children}
    </div>
  );
}

function PaletteRow({
  onClose,
  href,
  icon,
  title,
  subtitle,
}: {
  onClose: () => void;
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex items-center gap-3 px-5 py-2.5 hover:bg-ink/[0.03] transition-colors group focus-ring"
    >
      <span className="grid place-items-center h-8 w-8 rounded-lg bg-ink/[0.04] text-ink-2 group-hover:bg-accent-soft group-hover:text-accent transition-colors">
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[14px] font-medium text-ink truncate">{title}</span>
        <span className="block text-[12px] text-ink-3 truncate">{subtitle}</span>
      </span>
      <Icon name="chevron" size={14} />
    </Link>
  );
}
