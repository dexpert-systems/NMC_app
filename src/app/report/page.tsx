"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { ModuleHero } from "@/components/ModuleHero";
import { Icon } from "@/components/Icon";

const CATEGORIES = [
  { emoji: "🕳", label: "Pothole", auto: "Roads dept · ~6 hours" },
  { emoji: "💡", label: "Streetlight", auto: "Electrical · ~2 hours" },
  { emoji: "🗑", label: "Garbage", auto: "Sanitation · ~4 hours" },
  { emoji: "💧", label: "Water leak", auto: "Water · ~1 hour" },
  { emoji: "🚧", label: "Drainage", auto: "PWD · ~8 hours" },
  { emoji: "🌳", label: "Tree fallen", auto: "Parks · ~3 hours" },
];

const NEARBY = [
  { id: "NMC-RP-9241", title: "Pothole on Kingsway", time: "32 min ago", status: "Acknowledged" },
  { id: "NMC-RP-9238", title: "Streetlight out · Sitabuldi", time: "2 hrs ago", status: "Crew dispatched" },
  { id: "NMC-RP-9230", title: "Garbage overflow · Lakadganj", time: "5 hrs ago", status: "Resolved" },
];

export default function ReportPage() {
  const [step, setStep] = useState<"compose" | "submitted">("compose");
  const [cat, setCat] = useState<string | null>(null);

  return (
    <SiteShell>
      <Section>
        <ModuleHero
          eyebrow="Report an issue"
          title="See it. Tap it."
          italic="We&rsquo;re on it."
          description="Photo, voice, or one-tap. Auto-categorized by AI, instantly routed to the right department, and live-tracked like a delivery."
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 sm:gap-8">
          {/* Composer */}
          <div className="surface-card hairline rounded-[24px] p-6 sm:p-8">
            {step === "compose" ? (
              <>
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  Step 1 · Pick a category
                </div>
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 gap-2.5">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setCat(c.label)}
                      className={
                        "flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-4 transition-all focus-ring " +
                        (cat === c.label
                          ? "border-accent bg-accent-soft"
                          : "border-line hover:border-ink/15 bg-surface/40 hover:bg-surface")
                      }
                    >
                      <span className="text-2xl">{c.emoji}</span>
                      <span className="text-[12px] font-medium text-ink">
                        {c.label}
                      </span>
                    </button>
                  ))}
                </div>

                {cat && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage/10 text-sage text-[12px] px-3 py-1.5"
                  >
                    <Icon name="spark" size={12} />
                    AI auto-routed: {CATEGORIES.find((c) => c.label === cat)?.auto}
                  </motion.div>
                )}

                <div className="mt-7 text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  Step 2 · Tell us where
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <ChipBtn icon="map">Use my location</ChipBtn>
                  <ChipBtn icon="search">Pin on map</ChipBtn>
                  <ChipBtn icon="services">Type address</ChipBtn>
                </div>

                <div className="mt-7 text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  Step 3 · Show us
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2.5">
                  <UploadTile icon="report" label="Photo" />
                  <UploadTile icon="voice" label="Voice note" />
                  <UploadTile icon="services" label="Video" />
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("submitted")}
                    disabled={!cat}
                    className="rounded-full bg-ink text-bg px-6 py-3.5 text-sm font-medium shadow-lifted hover:scale-[1.01] active:scale-[0.99] transition-transform focus-ring disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Submit report
                  </button>
                  <span className="text-[12px] text-ink-3">
                    You&rsquo;ll get live updates by SMS + WhatsApp
                  </span>
                </div>
              </>
            ) : (
              <Submitted cat={cat ?? "Issue"} onAgain={() => { setStep("compose"); setCat(null); }} />
            )}
          </div>

          {/* Live tracker */}
          <div className="space-y-3">
            <div className="surface-card hairline rounded-[20px] p-6">
              <div className="flex items-center justify-between">
                <SectionLabel>Live in your ward</SectionLabel>
                <span className="text-[10px] uppercase tracking-[0.16em] text-sage flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot" /> Live
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {NEARBY.map((n, i) => (
                  <div key={n.id} className="flex items-start gap-3">
                    <div className="grid place-items-center h-8 w-8 rounded-full shrink-0 bg-ink/[0.04]">
                      <Icon name="report" size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-ink truncate">
                        {n.title}
                      </div>
                      <div className="text-[12px] text-ink-3 mt-0.5 tabular">
                        {n.id} · {n.time} ·{" "}
                        <span
                          className={
                            n.status === "Resolved"
                              ? "text-sage"
                              : n.status === "Crew dispatched"
                              ? "text-amber"
                              : "text-ink-2"
                          }
                        >
                          {n.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card hairline rounded-[20px] p-6">
              <SectionLabel>This week</SectionLabel>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <Stat k="Reported" v="412" />
                <Stat k="Resolved" v="338" />
                <Stat k="Median" v="3h" />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function ChipBtn({
  icon,
  children,
}: {
  icon: "map" | "search" | "services";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full bg-surface/60 hover:bg-surface text-ink-2 hover:text-ink border border-line text-[13px] px-3.5 py-2 transition-all focus-ring"
    >
      <Icon name={icon} size={13} />
      {children}
    </button>
  );
}

function UploadTile({
  icon,
  label,
}: {
  icon: "report" | "voice" | "services";
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-line hover:border-ink/15 px-3 py-6 transition-colors focus-ring text-ink-2 hover:text-ink"
    >
      <Icon name={icon} size={18} />
      <span className="text-[12px]">{label}</span>
    </button>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-ink/[0.03] px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">
        {k}
      </div>
      <div className="font-display text-xl tabular text-ink leading-tight mt-0.5">
        {v}
      </div>
    </div>
  );
}

function Submitted({ cat, onAgain }: { cat: string; onAgain: () => void }) {
  const id = `NMC-RP-${Math.floor(9300 + Math.random() * 600)}`;
  const STAGES = ["Submitted", "AI routed", "Crew assigned", "On the way", "Resolved"];
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid place-items-center h-10 w-10 rounded-full bg-sage/10 text-sage">
          <Icon name="check" size={18} />
        </span>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Report received
          </div>
          <div className="font-display text-2xl tracking-tight text-ink">
            {cat} · {id}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-3">
          Live status
        </div>
        <div className="relative">
          <div className="absolute left-3 top-3 bottom-3 w-px bg-line" />
          {STAGES.map((s, i) => {
            const active = i === 0;
            const done = i < 0;
            return (
              <div key={s} className="relative flex items-center gap-3 py-2.5">
                <span
                  className={
                    "relative grid place-items-center h-6 w-6 rounded-full text-[10px] font-bold " +
                    (active
                      ? "bg-accent text-white"
                      : done
                      ? "bg-sage text-white"
                      : "bg-ink/[0.06] text-ink-3")
                  }
                >
                  {done ? "✓" : i + 1}
                </span>
                <span
                  className={
                    "text-sm " + (active ? "text-ink font-medium" : "text-ink-3")
                  }
                >
                  {s}
                </span>
                {active && (
                  <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-amber">
                    in progress
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={onAgain}
          className="rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-medium hover:scale-[1.01] active:scale-[0.99] transition-transform focus-ring"
        >
          Report another
        </button>
        <button className="text-sm text-ink-3 hover:text-ink transition-colors focus-ring rounded">
          Share with neighbours →
        </button>
      </div>
    </div>
  );
}
