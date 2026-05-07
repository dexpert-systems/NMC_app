"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { signIn } from "@/lib/auth";

type Stage = "intro" | "phone" | "otp" | "verifying";

export default function SignInPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("intro");
  const [phone, setPhone] = useState("");

  const goCitizen = () => {
    signIn();
    router.push("/citizen");
  };

  return (
    <SiteShell topBarVariant="minimal" hideFooter hideAssistant>
      <Section className="pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center min-h-[calc(100svh-160px)]">
          {/* Editorial column */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3">
              <span className="h-px w-8 bg-line" />
              <span>Welcome</span>
            </div>
            <h1 className="font-display mt-5 text-[clamp(40px,7vw,80px)] font-medium leading-[0.96] tracking-tightest text-ink">
              Sign in to <span className="italic font-light text-ink-2">your city.</span>
            </h1>
            <p className="mt-6 text-[15px] sm:text-[17px] text-ink-3 leading-relaxed">
              One sign-in. Every civic service — your bills, applications,
              receipts, complaints, and the city around you.
            </p>

            <ul className="mt-10 space-y-3 text-sm text-ink-2">
              {[
                "Pay tax in 30 seconds — UPI, card, or net banking",
                "Track every certificate and complaint, like a delivery",
                "See the city: live projects, alerts, your ward",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 grid place-items-center h-5 w-5 rounded-full bg-sage/15 text-sage shrink-0">
                    <Icon name="check" size={11} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-ink-4">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="shield" size={11} />
                Govt secured
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="lock" size={11} />
                256-bit
              </span>
              <span>·</span>
              <span>Aadhaar OTP optional</span>
            </div>
          </div>

          {/* Auth card */}
          <div className="surface-card hairline rounded-[28px] p-6 sm:p-8 lg:p-10 max-w-[480px] w-full mx-auto lg:mx-0">
            <AnimatePresence mode="wait" initial={false}>
              {stage === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
                    Choose how to sign in
                  </div>
                  <h2 className="font-display mt-3 text-2xl sm:text-3xl tracking-tight text-ink">
                    Quick & secure
                  </h2>

                  <div className="mt-7 space-y-3">
                    <button
                      type="button"
                      onClick={() => setStage("phone")}
                      className="w-full group flex items-center gap-3 rounded-2xl border border-line bg-surface/60 hover:bg-surface hover:border-ink/15 px-4 py-4 text-left transition-all focus-ring"
                    >
                      <span className="grid place-items-center h-10 w-10 rounded-xl bg-accent-soft text-accent shrink-0">
                        <PhoneIcon />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-ink">Mobile + OTP</div>
                        <div className="text-[12px] text-ink-3 mt-0.5">
                          Recommended · 2 taps · no password
                        </div>
                      </div>
                      <Icon name="chevron" size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={goCitizen}
                      className="w-full group flex items-center gap-3 rounded-2xl border border-line bg-surface/60 hover:bg-surface hover:border-ink/15 px-4 py-4 text-left transition-all focus-ring"
                    >
                      <span className="grid place-items-center h-10 w-10 rounded-xl bg-heritage/10 text-heritage shrink-0">
                        <DigiLockerIcon />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-ink">DigiLocker</div>
                        <div className="text-[12px] text-ink-3 mt-0.5">
                          Auto-load Aadhaar · ID · property
                        </div>
                      </div>
                      <Icon name="chevron" size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={goCitizen}
                      className="w-full group flex items-center gap-3 rounded-2xl border border-line bg-surface/60 hover:bg-surface hover:border-ink/15 px-4 py-4 text-left transition-all focus-ring"
                    >
                      <span className="grid place-items-center h-10 w-10 rounded-xl bg-ink/[0.04] text-ink-2 shrink-0">
                        <Icon name="spark" size={14} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-ink">
                          Continue as demo
                        </div>
                        <div className="text-[12px] text-ink-3 mt-0.5">
                          Skip auth · explore as Rajesh K.
                        </div>
                      </div>
                      <Icon name="chevron" size={14} />
                    </button>
                  </div>

                  <p className="mt-7 text-[11px] text-ink-4 leading-relaxed">
                    By continuing you agree to NMC&rsquo;s{" "}
                    <a className="underline underline-offset-2 hover:text-ink-2">
                      terms
                    </a>{" "}
                    and{" "}
                    <a className="underline underline-offset-2 hover:text-ink-2">
                      privacy policy
                    </a>
                    . Your data stays in India.
                  </p>
                </motion.div>
              )}

              {stage === "phone" && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                >
                  <BackBar onClick={() => setStage("intro")} label="Mobile + OTP" />
                  <p className="mt-3 text-sm text-ink-3 leading-relaxed">
                    We&rsquo;ll text you a 6-digit code. No password required.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (phone.length === 10) setStage("otp");
                    }}
                    className="mt-6"
                  >
                    <div className="flex items-center gap-3 rounded-xl bg-ink/[0.03] px-4 py-3">
                      <span className="text-ink-3">+91</span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        autoFocus
                        placeholder="98xxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="flex-1 bg-transparent outline-none text-xl tabular text-ink placeholder:text-ink-4 focus-ring rounded"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={phone.length !== 10}
                      className="mt-5 w-full rounded-full bg-ink text-bg py-3.5 text-sm font-medium hover:scale-[1.01] active:scale-[0.99] transition-transform focus-ring disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Send OTP
                    </button>
                  </form>
                </motion.div>
              )}

              {stage === "otp" && (
                <OtpStage
                  phone={phone}
                  onBack={() => setStage("phone")}
                  onComplete={() => {
                    setStage("verifying");
                    setTimeout(goCitizen, 700);
                  }}
                />
              )}

              {stage === "verifying" && (
                <motion.div
                  key="verifying"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 flex flex-col items-center gap-4"
                >
                  <span className="h-10 w-10 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                  <p className="text-sm text-ink-3 uppercase tracking-[0.16em]">
                    Verifying & loading your city…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function OtpStage({
  phone,
  onBack,
  onComplete,
}: {
  phone: string;
  onBack: () => void;
  onComplete: () => void;
}) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const setAt = (i: number, v: string) => {
    const cleaned = v.replace(/\D/g, "").slice(0, 1);
    setDigits((d) => {
      const next = [...d];
      next[i] = cleaned;
      if (cleaned && i < 5) refs.current[i + 1]?.focus();
      if (next.every((x) => x !== "")) {
        setTimeout(() => onComplete(), 200);
      }
      return next;
    });
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      e.preventDefault();
      setDigits(text.split(""));
      setTimeout(() => onComplete(), 200);
    }
  };

  return (
    <motion.div
      key="otp"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
    >
      <BackBar onClick={onBack} label={`OTP sent to +91 ${phone}`} />
      <p className="mt-3 text-sm text-ink-3 leading-relaxed">
        Enter any 6 digits to continue (demo mode).
      </p>
      <div className="mt-6 flex justify-center gap-2 sm:gap-3" onPaste={onPaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={d}
            onChange={(e) => setAt(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !d && i > 0) {
                refs.current[i - 1]?.focus();
              }
            }}
            className="focus-ring h-14 w-12 rounded-xl bg-ink/[0.03] text-center text-2xl font-semibold tabular text-ink outline-none border border-line"
          />
        ))}
      </div>
      <p className="mt-6 text-center text-[12px] text-ink-3">
        Didn&rsquo;t get it? <button className="underline underline-offset-2">Resend in 24s</button>
      </p>
    </motion.div>
  );
}

function BackBar({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onClick}
        className="grid place-items-center h-8 w-8 rounded-full hover:bg-ink/[0.04] transition-colors focus-ring text-ink-2"
        aria-label="Back"
      >
        <Icon name="back" size={14} />
      </button>
      <span className="text-sm text-ink-2">{label}</span>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="7" y="2" width="10" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function DigiLockerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="13" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 14.5v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
