"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { isAuthed } from "@/lib/auth";

type Msg = {
  role: "user" | "assistant";
  text: string;
  rich?: React.ReactNode;
};

const STARTERS = [
  { label: "Pay my property tax", route: "/property" },
  { label: "Why is my bill high?" },
  { label: "Report a pothole", route: "/report" },
  { label: "Apply for birth certificate", route: "/services" },
  { label: "Track my application status" },
  { label: "When is the next water shutdown?", route: "/alerts" },
];

type Reply = {
  text: string;
  cta?: { label: string; href: string };
  /** True if this answer requires user-specific data (auth gated). */
  needsAuth?: boolean;
};

const SAMPLE_REPLIES: Record<string, Reply> = {
  "why is my bill high": {
    text:
      "Your Q3 bill is ₹4,820. The biggest line items are general tax (₹2,200) and water benefit (₹980). Compared to last quarter you paid ₹4,640, so the increase is mostly from a 4% revision in water benefit cess. You qualify for a ₹240 rebate if you pay before May 31.",
    cta: { label: "See full breakdown", href: "/property" },
    needsAuth: true,
  },
  "track my application": {
    text:
      "I see one open application — Birth certificate, submitted April 28. Status: under verification at the Dharampeth zonal office. Estimated completion: 2 working days.",
    cta: { label: "Open application", href: "/services" },
    needsAuth: true,
  },
  "pay my property tax": {
    text:
      "Your Q3 dues are ₹4,820, due in 8 days. Pay before May 31 to keep the ₹240 rebate.",
    cta: { label: "Pay now", href: "/citizen" },
    needsAuth: true,
  },
  "my dues": {
    text:
      "Your current dues are ₹4,820 — Q3 of 2025–26.",
    cta: { label: "Pay now", href: "/citizen" },
    needsAuth: true,
  },
  "my application": {
    text:
      "You have one open application: Birth certificate, under verification.",
    cta: { label: "Open application", href: "/services" },
    needsAuth: true,
  },
  "my receipts": {
    text:
      "I can pull up every payment you've made to NMC.",
    cta: { label: "View receipts", href: "/property" },
    needsAuth: true,
  },
  "default": {
    text:
      "I can help with property tax, complaints, certificates, water connections, and 40+ other civic services. What would you like to start with?",
  },
};

const AUTH_KEYWORDS = [
  "my ",
  "i ",
  "track",
  "status",
  "application",
  "bill",
  "due",
  "dues",
  "receipt",
  "rebate",
  "ward",
  "license renew",
];

const SIGN_IN_REPLY: Reply = {
  text:
    "To answer that I'd need to look up your records, which means signing in first. It takes about 30 seconds — mobile + OTP, or DigiLocker.",
  cta: { label: "Sign in", href: "/sign-in" },
};

function ChatInner() {
  const params = useSearchParams();
  const initialQ = params.get("q") || "";
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [authed, setAuthed] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAuthed(isAuthed());
    inputRef.current?.focus();
    if (initialQ) {
      send(initialQ, isAuthed());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const send = (text: string, authNow?: boolean) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);

    const isUserAuthed = authNow ?? authed;

    setTimeout(() => {
      const key = text.toLowerCase();
      const matched =
        Object.entries(SAMPLE_REPLIES).find(([k]) => key.includes(k))?.[1] ??
        SAMPLE_REPLIES.default;

      // Gate any reply that needs personal data behind sign-in.
      // Also gate the "default" reply if the question itself contains personal
      // pronouns / data-requesting keywords.
      const needsAuth =
        matched.needsAuth ||
        (matched === SAMPLE_REPLIES.default &&
          AUTH_KEYWORDS.some((k) => key.includes(k)));

      const reply: Reply =
        needsAuth && !isUserAuthed ? SIGN_IN_REPLY : matched;

      setThinking(false);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: reply.text,
          rich: reply.cta ? (
            <Link
              href={reply.cta.href}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink text-bg px-4 py-2 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring"
            >
              {reply.cta.label}
              <Icon name="arrow" size={13} />
            </Link>
          ) : undefined,
        },
      ]);
    }, 700);
  };

  return (
    <Section className="pt-4 pb-8">
      <div className="max-w-[820px] mx-auto">
        {messages.length === 0 ? (
          <div className="min-h-[calc(100svh-220px)] flex flex-col items-center justify-center pb-32 text-center">
            <div className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-accent-soft text-accent">
              <Icon name="spark" size={22} />
            </div>
            <h1 className="font-display mt-6 text-[clamp(36px,6vw,72px)] font-medium tracking-tightest text-ink leading-[0.98]">
              Ask anything <span className="italic font-light text-ink-2">civic.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ink-3 max-w-md mx-auto">
              Pay bills, file complaints, find services, understand schemes — all
              in plain English, हिन्दी, or मराठी.
            </p>
            <div className="mt-10 hidden sm:flex flex-wrap justify-center gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => send(s.label)}
                  className="rounded-full bg-surface/60 hover:bg-surface text-ink-2 hover:text-ink border border-line text-[13px] px-3.5 py-2 transition-all focus-ring"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-6 pb-32 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    "flex gap-3 " +
                    (m.role === "user" ? "justify-end" : "justify-start")
                  }
                >
                  {m.role === "assistant" && (
                    <span className="grid place-items-center h-8 w-8 rounded-full bg-accent-soft text-accent shrink-0 mt-0.5">
                      <Icon name="spark" size={14} />
                    </span>
                  )}
                  <div
                    className={
                      "max-w-[78%] " +
                      (m.role === "user"
                        ? "rounded-2xl rounded-br-sm bg-ink text-bg px-4 py-2.5 text-[15px]"
                        : "")
                    }
                  >
                    <p
                      className={
                        m.role === "assistant"
                          ? "text-[15px] sm:text-base text-ink leading-relaxed"
                          : ""
                      }
                    >
                      {m.text}
                    </p>
                    {m.rich}
                  </div>
                </motion.div>
              ))}
              {thinking && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <span className="grid place-items-center h-8 w-8 rounded-full bg-accent-soft text-accent shrink-0">
                    <Icon name="spark" size={14} />
                  </span>
                  <div className="flex items-center gap-1.5 py-3">
                    <Dot delay={0} />
                    <Dot delay={0.15} />
                    <Dot delay={0.3} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="fixed bottom-0 left-0 right-0 z-20 px-4 sm:px-8 pt-12 pb-4 sm:pb-6 pointer-events-none bg-gradient-to-t from-bg via-bg/85 to-transparent">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="pointer-events-auto max-w-[820px] mx-auto"
        >
          <div className="surface-card shadow-lifted rounded-3xl px-3 py-2 flex items-end gap-2">
            <button
              type="button"
              aria-label="Voice"
              className="grid place-items-center h-10 w-10 rounded-full text-ink-3 hover:text-ink hover:bg-ink/[0.04] transition-colors focus-ring shrink-0"
            >
              <Icon name="voice" size={16} />
            </button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder="Ask anything… ⌘K"
              className="flex-1 bg-transparent outline-none resize-none text-base text-ink placeholder:text-ink-3 py-2.5 max-h-32 focus-ring rounded"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!input.trim()}
              className="grid place-items-center h-10 w-10 rounded-full bg-ink text-bg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.04] active:scale-[0.96] transition-transform focus-ring shrink-0"
            >
              <Icon name="send" size={14} />
            </button>
          </div>
          <div className="text-center mt-2 text-[10px] uppercase tracking-[0.16em] text-ink-4">
            English · हिन्दी · मराठी · Shift + Enter for new line
          </div>
        </form>
      </div>
    </Section>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0.3, y: 0 }}
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
      transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity, delay }}
      className="h-1.5 w-1.5 rounded-full bg-ink-3"
    />
  );
}

export default function AskPage() {
  return (
    <SiteShell hideFooter>
      <Suspense fallback={null}>
        <ChatInner />
      </Suspense>
    </SiteShell>
  );
}
