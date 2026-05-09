"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type Role } from "@/lib/erp";
import { Icon } from "@/components/Icon";

type Suggestion = {
  q: string;
  category: "query" | "action" | "navigate";
  icon?: "spark" | "pay" | "map" | "report" | "services" | "projects" | "alerts" | "data";
  href?: string;
};

const SUGGESTIONS_BY_ROLE: Record<Role, Suggestion[]> = {
  commissioner: [
    { q: "Show me wards underperforming this quarter", category: "query", icon: "data" },
    { q: "Why is Sitabuldi grievance rate spiking?", category: "query", icon: "spark" },
    { q: "Forecast Q4 collection at current trajectory", category: "query", icon: "data" },
    { q: "Open governance escalations", category: "navigate", icon: "alerts", href: "/erp/grievances" },
    { q: "Approve flagged trade renewals", category: "action", icon: "services", href: "/erp/approvals" },
    { q: "Compare ward performance · YoY", category: "query", icon: "data" },
  ],
  cafo: [
    { q: "Defaulters above ₹1 lakh outstanding", category: "query", icon: "pay" },
    { q: "Reconcile pending UPI batches", category: "action", icon: "pay", href: "/erp/revenue" },
    { q: "Forecast next month's collection", category: "query", icon: "data" },
    { q: "Auto-issue reminders for ward 14", category: "action", icon: "alerts" },
  ],
  inspector: [
    { q: "Today's inspection route", category: "navigate", icon: "map", href: "/erp/inspections" },
    { q: "Pending pothole reports in Zone 4", category: "query", icon: "report" },
    { q: "Mark inspection #DR-8821 complete", category: "action", icon: "services" },
  ],
  "trade-officer": [
    { q: "Pending approvals · oldest first", category: "navigate", icon: "services", href: "/erp/approvals" },
    { q: "Show fraud-flagged applications", category: "query", icon: "alerts" },
    { q: "Auto-approve low-risk renewals", category: "action", icon: "spark" },
  ],
  survey: [
    { q: "Properties awaiting survey · prioritized", category: "navigate", icon: "map" },
  ],
  revenue: [
    { q: "Ward 14 due window properties", category: "query", icon: "pay" },
    { q: "Send reminder to top 200 defaulters", category: "action", icon: "alerts" },
  ],
};

const SAMPLE_REPLIES: Record<string, string> = {
  "underperforming": "Three wards are >15% below their Q3 target: Mahal (52%), Lakadganj (58%), Sitabuldi (61%). Mahal also has the highest grievance backlog. Recommend a coordinated revenue + grievance push.",
  "sitabuldi": "Grievances up 38% week-on-week, driven by garbage (44 of 87 new) and drainage (28). The trigger appears to be the May 4 storm — drainage failures cascaded into garbage backlog. Zone 2 head was last briefed 6 days ago.",
  "forecast": "On current trajectory, Q3 closes at ₹126 Cr (target: ₹130 Cr). Three levers can close the gap: (1) reminder campaign for top 800 defaulters, (2) extending the rebate window by 5 days, (3) deploying 2 extra officers to Mahal & Lakadganj.",
  "defaulters": "342 properties have outstanding > ₹1 L. Total recoverable: ₹14.8 Cr. Top 50 alone account for ₹6.2 Cr. AI suggests prioritizing the top 50 with personal SMS + door-to-door visits.",
  "default": "I can query municipal records, run forecasts, summarise governance trends, or navigate you to the right module. Be more specific or pick a suggestion below.",
};

type Msg = { role: "user" | "assistant"; text: string };

export function CommandConsole({
  role,
  open,
  onClose,
}: {
  role: Role;
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const suggestions = SUGGESTIONS_BY_ROLE[role];

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      setQ("");
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setQ("");
    setThinking(true);
    setTimeout(() => {
      const lk = t.toLowerCase();
      const reply =
        Object.entries(SAMPLE_REPLIES).find(([k]) => lk.includes(k))?.[1] ??
        SAMPLE_REPLIES.default;
      setThinking(false);
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    }, 700);
  };

  const filteredSuggestions = useMemo(() => {
    if (!q.trim()) return suggestions;
    const needle = q.toLowerCase();
    return suggestions.filter((s) => s.q.toLowerCase().includes(needle));
  }, [q, suggestions]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            onClick={onClose}
            aria-label="Close"
            className="absolute inset-0 bg-bg/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[720px] rounded-md border border-line bg-surface/95 backdrop-blur-xl overflow-hidden shadow-lifted"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(q);
              }}
              className="flex items-center gap-3 px-5 py-4 border-b border-line"
            >
              <span className="grid place-items-center h-8 w-8 rounded-md bg-accent/15 text-accent">
                <Icon name="spark" size={14} />
              </span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ask the system, run a query, jump anywhere…"
                className="flex-1 bg-transparent outline-none text-base text-ink placeholder:text-ink-3 focus-ring rounded"
                spellCheck={false}
                autoComplete="off"
              />
              <kbd className="rounded bg-bg/60 border border-line px-1.5 py-0.5 text-[10px] font-medium tabular text-ink-3">
                ESC
              </kbd>
            </form>

            <div className="max-h-[60vh] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-2">
                  <SectionHead>{q ? "Suggested" : "Try"}</SectionHead>
                  {filteredSuggestions.length === 0 ? (
                    <button
                      onClick={() => send(q)}
                      className="w-full px-3 py-2.5 rounded-md hover:bg-bg/40 text-left text-[13px] text-ink-2 hover:text-ink transition-colors focus-ring"
                    >
                      Ask: <span className="text-ink">&ldquo;{q}&rdquo;</span>
                    </button>
                  ) : (
                    filteredSuggestions.map((s, i) => (
                      <SuggestionRow
                        key={i}
                        suggestion={s}
                        onSelect={() => {
                          if (s.href) {
                            window.location.href = s.href;
                            onClose();
                          } else {
                            send(s.q);
                          }
                        }}
                      />
                    ))
                  )}
                </div>
              ) : (
                <div className="px-5 py-4 space-y-4">
                  <AnimatePresence initial={false}>
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className={
                          "flex gap-3 " + (m.role === "user" ? "justify-end" : "justify-start")
                        }
                      >
                        {m.role === "assistant" && (
                          <span className="grid place-items-center h-7 w-7 rounded-md bg-accent/15 text-accent shrink-0 mt-0.5">
                            <Icon name="spark" size={12} />
                          </span>
                        )}
                        <div
                          className={
                            "max-w-[78%] " +
                            (m.role === "user"
                              ? "rounded-md bg-ink/[0.08] text-ink px-3.5 py-2 text-[13px]"
                              : "text-[13px] text-ink-2 leading-relaxed")
                          }
                        >
                          {m.text}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {thinking && (
                    <div className="flex gap-3">
                      <span className="grid place-items-center h-7 w-7 rounded-md bg-accent/15 text-accent shrink-0">
                        <Icon name="spark" size={12} />
                      </span>
                      <div className="flex items-center gap-1.5 py-2.5">
                        {[0, 0.15, 0.3].map((d) => (
                          <motion.span
                            key={d}
                            initial={{ opacity: 0.3, y: 0 }}
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity, delay: d }}
                            className="h-1.5 w-1.5 rounded-full bg-ink-3"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
              )}
            </div>

            {messages.length > 0 && (
              <div className="border-t border-line px-3 py-2 flex items-center gap-2">
                <button
                  onClick={() => setMessages([])}
                  className="text-[11px] uppercase tracking-[0.14em] text-ink-3 hover:text-ink transition-colors px-2.5 py-1.5 rounded hover:bg-bg/40 focus-ring"
                >
                  ← New query
                </button>
                <div className="flex-1 text-right text-[10px] uppercase tracking-[0.14em] text-ink-4">
                  AI grounded on NMC live data · audit log on
                </div>
              </div>
            )}

            <div className="px-5 py-2 border-t border-line/60 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-ink-4">
              <span className="inline-flex items-center gap-2">
                <Icon name="shield" size={10} />
                Govt-grade · audited
              </span>
              <span>
                <kbd className="rounded bg-bg/60 px-1.5 py-0.5 tabular text-ink-3">↵</kbd> ask
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
    <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-ink-3">
      {children}
    </div>
  );
}

function SuggestionRow({
  suggestion,
  onSelect,
}: {
  suggestion: Suggestion;
  onSelect: () => void;
}) {
  const tag = {
    query: { label: "Query", cls: "bg-heritage/15 text-heritage" },
    action: { label: "Action", cls: "bg-accent/15 text-accent" },
    navigate: { label: "Jump", cls: "bg-sage/15 text-sage" },
  }[suggestion.category];
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-bg/40 text-left transition-colors focus-ring group"
    >
      <span className="grid place-items-center h-8 w-8 rounded-md bg-bg/60 text-ink-3 group-hover:text-ink transition-colors shrink-0">
        <Icon name={suggestion.icon || "spark"} size={13} />
      </span>
      <span className="flex-1 min-w-0 text-[13px] text-ink-2 group-hover:text-ink transition-colors truncate">
        {suggestion.q}
      </span>
      <span
        className={
          "rounded px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] font-medium " +
          tag.cls
        }
      >
        {tag.label}
      </span>
      <Icon name="chevron" size={12} />
    </button>
  );
}
