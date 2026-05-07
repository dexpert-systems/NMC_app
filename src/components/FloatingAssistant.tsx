"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./Icon";
import { isAuthed } from "@/lib/auth";

type Turn = {
  role: "user" | "assistant";
  text: string;
  cta?: { label: string; href: string };
};

type Suggestion = {
  q: string;
  reply: string;
  cta?: { label: string; href: string };
};

const PRELOGIN: Suggestion[] = [
  {
    q: "What services does NMC offer?",
    reply:
      "42 services online — property tax, birth & death certificates, trade licenses, water connections, building permits, NOCs, and more. Sign in to use any of them.",
    cta: { label: "Sign in", href: "/sign-in" },
  },
  {
    q: "How do I pay my property tax?",
    reply:
      "Sign in with mobile + OTP. Your dues appear automatically. One tap on UPI and you&rsquo;re done — under 30 seconds, end to end.",
    cta: { label: "Sign in", href: "/sign-in" },
  },
  {
    q: "How does sign-in work?",
    reply:
      "Mobile + OTP, or DigiLocker for instant Aadhaar / property auto-load. No passwords. Secure, government-grade.",
    cta: { label: "Get started", href: "/sign-in" },
  },
  {
    q: "Is it available in Marathi?",
    reply:
      "Yes — type or speak in English, हिन्दी, or मराठी. The assistant understands all three and answers in the language you used.",
  },
];

const POSTLOGIN: Suggestion[] = [
  {
    q: "Pay my property tax",
    reply:
      "Your Q3 dues are ₹4,820, due in 8 days. Pay before May 31 to keep the ₹240 rebate.",
    cta: { label: "Pay now", href: "/citizen" },
  },
  {
    q: "Why is my bill high?",
    reply:
      "Mostly the water benefit cess revision (+4%). Compared to last quarter you&rsquo;re paying ₹180 more — but the May 31 rebate offsets ₹240.",
    cta: { label: "See breakdown", href: "/property" },
  },
  {
    q: "Track my application",
    reply:
      "Your birth certificate (NMC-BR-2026-04823) is under verification at the Dharampeth zonal office. Estimated 2 working days.",
    cta: { label: "Open application", href: "/services" },
  },
  {
    q: "Report a pothole",
    reply:
      "I can route a pothole report to the Roads dept in seconds — usually resolved in ~6 hours. Want me to start?",
    cta: { label: "Report now", href: "/report" },
  },
];

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAuthed(isAuthed());
  }, []);

  // Reset chat when toggling open/auth
  useEffect(() => {
    if (!open) {
      setTurns([]);
      setInput("");
      setThinking(false);
    }
  }, [open, authed]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, thinking]);

  const suggestions = authed ? POSTLOGIN : PRELOGIN;

  const ask = (s: Suggestion) => {
    setTurns((t) => [...t, { role: "user", text: s.q }]);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setTurns((t) => [
        ...t,
        { role: "assistant", text: s.reply, cta: s.cta },
      ]);
    }, 750);
  };

  const askFreeform = (q: string) => {
    if (!q.trim()) return;
    setInput("");
    if (typeof window !== "undefined") {
      window.location.href = `/ask?q=${encodeURIComponent(q.trim())}`;
    }
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40">
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card hairline rounded-[24px] shadow-lifted overflow-hidden w-[min(380px,calc(100vw-32px))] max-h-[min(560px,calc(100svh-100px))] flex flex-col"
          >
            {/* Header */}
            <header className="flex items-center gap-2.5 px-4 py-3.5 border-b border-line-soft">
              <NMCMark />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-ink leading-tight truncate">
                  NMC Assistant
                </div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3 inline-flex items-center gap-1.5 mt-0.5 truncate">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot shrink-0" />
                  <span className="truncate">
                    {authed ? "Personalized" : "Pre-login"}
                  </span>
                </div>
              </div>
              <Link
                href="/ask"
                className="hidden sm:inline-flex text-[10px] uppercase tracking-[0.14em] text-ink-3 hover:text-ink transition-colors focus-ring rounded shrink-0"
                onClick={() => setOpen(false)}
              >
                Full chat →
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid place-items-center h-7 w-7 rounded-full hover:bg-ink/[0.05] text-ink-3 hover:text-ink focus-ring transition-colors shrink-0"
              >
                <Icon name="close" size={12} />
              </button>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5">
              {turns.length === 0 ? (
                <>
                  {/* Welcome bubble */}
                  <div className="flex gap-2.5">
                    <span className="grid place-items-center h-7 w-7 rounded-full bg-accent-soft text-accent shrink-0 mt-0.5">
                      <Icon name="spark" size={12} />
                    </span>
                    <div className="rounded-2xl rounded-bl-sm bg-ink/[0.04] px-3.5 py-2.5 text-[13px] text-ink leading-relaxed max-w-[88%]">
                      {authed ? (
                        <>
                          Hi Rajesh. I&rsquo;ve found your dues, applications and
                          ward updates. <span className="text-ink-3">Tap a starter or just type.</span>
                        </>
                      ) : (
                        <>
                          Hi! I&rsquo;m the NMC Assistant. I can help with
                          property tax, complaints, certificates and 40+ other
                          services. <span className="text-ink-3">Try a question below.</span>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {turns.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={
                        "flex gap-2.5 " +
                        (t.role === "user" ? "justify-end" : "")
                      }
                    >
                      {t.role === "assistant" && (
                        <span className="grid place-items-center h-7 w-7 rounded-full bg-accent-soft text-accent shrink-0 mt-0.5">
                          <Icon name="spark" size={12} />
                        </span>
                      )}
                      <div
                        className={
                          "max-w-[80%] " +
                          (t.role === "user"
                            ? "rounded-2xl rounded-br-sm bg-ink text-bg px-3.5 py-2 text-[13px]"
                            : "")
                        }
                      >
                        {t.role === "assistant" ? (
                          <>
                            <p
                              className="text-[13px] text-ink leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: t.text }}
                            />
                            {t.cta && (
                              <Link
                                href={t.cta.href}
                                onClick={() => setOpen(false)}
                                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ink text-bg px-3 py-1.5 text-[11px] font-medium hover:scale-[1.02] transition-transform"
                              >
                                {t.cta.label}
                                <Icon name="arrow" size={11} />
                              </Link>
                            )}
                          </>
                        ) : (
                          t.text
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {thinking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2.5"
                    >
                      <span className="grid place-items-center h-7 w-7 rounded-full bg-accent-soft text-accent shrink-0">
                        <Icon name="spark" size={12} />
                      </span>
                      <div className="flex items-center gap-1 py-2.5">
                        {[0, 0.15, 0.3].map((d) => (
                          <motion.span
                            key={d}
                            initial={{ opacity: 0.3, y: 0 }}
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{
                              duration: 1.1,
                              ease: "easeInOut",
                              repeat: Infinity,
                              delay: d,
                            }}
                            className="h-1.5 w-1.5 rounded-full bg-ink-3"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              {/* Suggestion chips */}
              {turns.length === 0 && (
                <div className="pt-2 grid grid-cols-1 gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s.q}
                      type="button"
                      onClick={() => ask(s)}
                      className="group text-left flex items-center justify-between rounded-xl bg-surface/60 hover:bg-surface border border-line px-3 py-2.5 transition-all focus-ring"
                    >
                      <span className="text-[13px] text-ink-2 group-hover:text-ink transition-colors">
                        {s.q}
                      </span>
                      <Icon name="arrow" size={12} />
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                askFreeform(input);
              }}
              className="border-t border-line-soft px-3 py-3 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 bg-transparent outline-none text-[13px] text-ink placeholder:text-ink-3 px-2 focus-ring rounded"
                spellCheck={false}
                autoComplete="off"
              />
              <button
                type="button"
                aria-label="Voice"
                className="grid place-items-center h-8 w-8 rounded-full text-ink-3 hover:text-ink hover:bg-ink/[0.04] transition-colors focus-ring"
              >
                <Icon name="voice" size={13} />
              </button>
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="grid place-items-center h-8 w-8 rounded-full bg-ink text-bg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.05] active:scale-[0.95] transition-transform focus-ring"
              >
                <Icon name="send" size={12} />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(true)}
            aria-label="Open NMC Assistant"
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-ink text-bg pl-1.5 pr-4 py-1.5 shadow-lifted hover:scale-[1.04] active:scale-[0.97] transition-transform focus-ring"
          >
            <span className="grid place-items-center h-9 w-9 rounded-full bg-accent text-white relative">
              <span className="absolute inset-0 rounded-full bg-accent opacity-40 animate-ping" />
              <Icon name="spark" size={15} />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[12px] font-medium">Ask NMC</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-bg/60">
                {authed ? "Personalized" : "Pre-login"}
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function NMCMark() {
  return (
    <span className="relative grid place-items-center h-8 w-8 rounded-lg bg-ink text-white shadow-soft overflow-hidden shrink-0">
      <span
        aria-hidden
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 20%, #2A2E33 0%, #0B0C0E 60%)",
        }}
      />
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        className="relative"
        aria-hidden
      >
        <path
          d="M12 3 L20 8 L20 16 L12 21 L4 16 L4 8 Z"
          stroke="#E25822"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2" fill="#E25822" />
      </svg>
    </span>
  );
}
