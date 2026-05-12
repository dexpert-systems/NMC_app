"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/Icon";
import { ROLES, type Role } from "@/lib/erp";
import { getReply, getStarters, getWelcome, type Reply } from "./assistant-data";

type Msg =
  | { role: "user"; text: string }
  | { role: "assistant"; reply: Reply };

export function ErpAssistant({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const profile = ROLES[role];

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, { role: "assistant", reply: getReply(role, t) }]);
    }, 750);
  };

  const reset = () => {
    setMessages([]);
    setInput("");
  };

  const starters = getStarters(role);
  const welcome = getWelcome(role);

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40">
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[min(380px,calc(100vw-2rem))] sm:w-[400px] surface-card rounded-2xl overflow-hidden shadow-lifted flex flex-col"
            style={{ maxHeight: "min(640px, calc(100vh - 6rem))" }}
          >
            {/* Header */}
            <header className="flex items-center gap-2.5 px-4 py-3 border-b border-line-soft shrink-0">
              <span className="relative grid place-items-center h-8 w-8 rounded-md bg-ink text-bg shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3 L20 8 L20 16 L12 21 L4 16 L4 8 Z"
                    stroke="#E25822"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="2" fill="#E25822" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-ink leading-tight truncate">
                  NMC Ops Assistant
                </div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3 inline-flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot shrink-0" />
                  <span className="truncate">
                    {profile.shortName} · {profile.initials}
                  </span>
                </div>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={reset}
                  className="text-[10px] uppercase tracking-[0.14em] text-ink-3 hover:text-ink transition-colors focus-ring rounded px-1.5 shrink-0"
                  aria-label="Reset"
                >
                  Reset
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid place-items-center h-7 w-7 rounded-full hover:bg-ink/[0.05] text-ink-3 hover:text-ink focus-ring transition-colors shrink-0"
              >
                <Icon name="close" size={12} />
              </button>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
              {messages.length === 0 ? (
                <>
                  <div className="flex gap-2.5">
                    <span className="grid place-items-center h-7 w-7 rounded-md bg-accent/15 text-accent shrink-0 mt-0.5">
                      <Icon name="spark" size={12} />
                    </span>
                    <div className="text-[13px] text-ink leading-relaxed">
                      {welcome}
                    </div>
                  </div>

                  <div className="pt-2 space-y-1.5">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3 px-1">
                      Try
                    </div>
                    {starters.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="w-full flex items-center gap-2 rounded-md border border-line bg-surface/70 hover:bg-surface hover:border-ink/15 px-3 py-2 text-left text-[12px] text-ink-2 hover:text-ink transition-colors focus-ring group"
                      >
                        <span className="flex-1 truncate">{s}</span>
                        <Icon name="arrow" size={11} />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <AnimatePresence initial={false}>
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className={
                          "flex gap-2 " +
                          (m.role === "user" ? "justify-end" : "justify-start")
                        }
                      >
                        {m.role === "user" ? (
                          <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-ink text-bg px-3.5 py-2 text-[13px]">
                            {m.text}
                          </div>
                        ) : (
                          <AssistantBubble reply={m.reply} onAsk={send} />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {thinking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2 items-center"
                    >
                      <span className="grid place-items-center h-7 w-7 rounded-md bg-accent/15 text-accent shrink-0">
                        <Icon name="spark" size={12} />
                      </span>
                      <div className="flex items-center gap-1.5 py-2">
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
                    </motion.div>
                  )}
                  <div ref={endRef} />
                </>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-line-soft p-3 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 bg-transparent outline-none text-[13px] text-ink placeholder:text-ink-3 px-2 py-1.5 focus-ring rounded"
                spellCheck={false}
                autoComplete="off"
              />
              <button
                type="button"
                aria-label="Voice"
                className="grid place-items-center h-8 w-8 rounded-md text-ink-3 hover:text-ink hover:bg-ink/[0.04] transition-colors focus-ring shrink-0"
              >
                <Icon name="voice" size={13} />
              </button>
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send"
                className="grid place-items-center h-8 w-8 rounded-md bg-ink text-bg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.04] active:scale-[0.96] transition-transform focus-ring shrink-0"
              >
                <Icon name="send" size={12} />
              </button>
            </form>

            <div className="px-4 py-1.5 border-t border-line/60 text-[9px] uppercase tracking-[0.14em] text-ink-4 text-center shrink-0">
              Grounded on NMC data · audit log on
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2.5 rounded-full bg-ink text-bg pl-2 pr-4 py-2 shadow-lifted hover:scale-[1.03] active:scale-[0.97] transition-transform focus-ring"
            aria-label="Open NMC Ops Assistant"
          >
            <span className="relative grid place-items-center h-8 w-8 rounded-full bg-accent text-white shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2 L13.8 9 L21 12 L13.8 15 L12 22 L10.2 15 L3 12 L10.2 9 Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="flex flex-col text-left leading-[1.1]">
              <span className="text-[12px] font-medium tracking-tight">
                Ask Ops AI
              </span>
              <span className="text-[9px] uppercase tracking-[0.16em] text-bg/60">
                {profile.shortName}
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function AssistantBubble({
  reply,
  onAsk,
}: {
  reply: Reply;
  onAsk: (q: string) => void;
}) {
  return (
    <div className="flex gap-2 max-w-[92%]">
      <span className="grid place-items-center h-7 w-7 rounded-md bg-accent/15 text-accent shrink-0 mt-0.5">
        <Icon name="spark" size={12} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] text-ink leading-relaxed">{reply.text}</p>
        {reply.visual}
        {typeof reply.confidence === "number" && (
          <div className="mt-2 text-[9px] uppercase tracking-[0.14em] text-ink-4 tabular">
            {Math.round(reply.confidence * 100)}% confidence · model v3.2
          </div>
        )}
        {reply.followUps && reply.followUps.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {reply.followUps.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => onAsk(f)}
                className="rounded-full bg-surface/70 hover:bg-surface text-ink-2 hover:text-ink border border-line text-[11px] px-2.5 py-1 transition-colors focus-ring"
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
