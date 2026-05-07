"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { ModuleHero } from "@/components/ModuleHero";
import { Icon } from "@/components/Icon";
import { formatINR } from "@/lib/format";

type Stage = "intro" | "form" | "submitted";
type Step = 0 | 1 | 2 | 3;

const STEPS = [
  { key: "business", label: "Business" },
  { key: "premises", label: "Premises" },
  { key: "documents", label: "Documents" },
  { key: "fees", label: "Fees & review" },
];

const CATEGORIES = [
  { id: "shop", emoji: "🛍", label: "Shop / retail", fee: 1500 },
  { id: "food", emoji: "🍽", label: "Restaurant / food", fee: 3500 },
  { id: "service", emoji: "🛠", label: "Service / repair", fee: 1200 },
  { id: "manufacture", emoji: "🏭", label: "Manufacturing", fee: 6500 },
  { id: "office", emoji: "🏢", label: "Office / consulting", fee: 2000 },
  { id: "other", emoji: "✨", label: "Other", fee: 2500 },
];

export default function TradeLicensePage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState<Step>(0);
  const [biz, setBiz] = useState({ name: "", category: "", pan: "" });
  const [prem, setPrem] = useState({ ward: "", area: "", ownership: "owned" });
  const [docs, setDocs] = useState<{ kyc: boolean; lease: boolean; layout: boolean }>({ kyc: false, lease: false, layout: false });

  const fee = CATEGORIES.find((c) => c.id === biz.category)?.fee ?? 0;
  const areaSurcharge = prem.area ? Math.min(2000, parseInt(prem.area || "0") * 5) : 0;
  const totalFee = fee + areaSurcharge;

  const canNext = (() => {
    if (step === 0) return biz.name.trim() && biz.category && /^[A-Z]{5}\d{4}[A-Z]$/.test(biz.pan);
    if (step === 1) return prem.ward && prem.area && /^\d+$/.test(prem.area);
    if (step === 2) return docs.kyc && docs.layout && (prem.ownership === "owned" || docs.lease);
    return true;
  })();

  return (
    <SiteShell>
      <Section>
        <ModuleHero
          eyebrow="Trade license"
          title="License your business,"
          italic="in 5 working days."
          description="The legal nod for any business operating inside Nagpur city limits — guided by AI, auto-validated documents, and a tracker that updates in real time."
          meta={
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              ~ 5 days · 38,000+ active licenses · ₹1,200–6,500 base fee
            </span>
          }
        />
      </Section>

      {stage === "intro" && (
        <>
          <Section className="mt-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
              <FeatureCard
                icon="spark"
                title="AI-guided"
                blurb="The assistant pre-fills what it can — PAN, GST, your linked properties — and asks only what it must."
              />
              <FeatureCard
                icon="check"
                title="Auto-validated"
                blurb="Documents are verified the moment you upload. No back-and-forth, no manual review queues."
              />
              <FeatureCard
                icon="map"
                title="Live tracking"
                blurb="From submission to license-in-hand: every stage timestamped, every officer named."
              />
            </div>
          </Section>

          <Section className="mt-16 sm:mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 items-start">
              <div>
                <SectionLabel>Eligibility</SectionLabel>
                <h2 className="font-display mt-4 text-[clamp(28px,4vw,44px)] font-medium tracking-tight text-ink leading-[1.05]">
                  Most businesses qualify <span className="italic font-light text-ink-2">— check yours.</span>
                </h2>
                <p className="mt-5 text-base text-ink-3 leading-relaxed max-w-md">
                  Any commercial activity inside Nagpur Municipal Corporation
                  limits requires a trade license. Renewal is annual.
                </p>
                <button
                  onClick={() => {
                    setStage("form");
                    setStep(0);
                  }}
                  className="mt-7 group inline-flex items-center gap-3 rounded-full bg-ink text-bg px-6 py-3.5 text-sm font-medium shadow-lifted hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring"
                >
                  Start application
                  <span className="grid place-items-center h-7 w-7 rounded-full bg-accent text-white">
                    <Icon name="arrow" size={13} />
                  </span>
                </button>
              </div>

              <div className="surface-card hairline rounded-[24px] p-6 sm:p-8">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  You&rsquo;ll need
                </div>
                <h3 className="font-display mt-2 text-2xl tracking-tight text-ink leading-tight">
                  Three documents,
                  <br />
                  <span className="italic font-light text-ink-2">five minutes.</span>
                </h3>
                <ul className="mt-7 space-y-4 text-sm text-ink-2">
                  <DocLine
                    label="PAN of the business or proprietor"
                    detail="We auto-validate against the I-T database."
                  />
                  <DocLine
                    label="Premises proof (rent agreement or sale deed)"
                    detail="If rented, the lease must extend at least 11 months."
                  />
                  <DocLine
                    label="Layout sketch or photograph of the premises"
                    detail="A phone photo is fine — must show entrance signage."
                  />
                </ul>
                <div className="mt-7 pt-6 border-t border-line-soft text-[12px] text-ink-3 leading-relaxed">
                  Don&rsquo;t have everything yet? You can save and resume any time.
                </div>
              </div>
            </div>
          </Section>

          <Section className="mt-16 sm:mt-20">
            <SectionLabel>Fee schedule</SectionLabel>
            <h3 className="font-display mt-4 text-[clamp(24px,3.5vw,36px)] font-medium tracking-tight text-ink">
              Pay once a year. <span className="italic font-light text-ink-2">No surprises.</span>
            </h3>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CATEGORIES.map((c) => (
                <div
                  key={c.id}
                  className="surface-card hairline rounded-[16px] px-4 py-5"
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <div className="mt-3 text-[12px] font-medium text-ink leading-tight">
                    {c.label}
                  </div>
                  <div className="mt-1 text-[11px] text-ink-3 tabular">
                    from {formatINR(c.fee)}/yr
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12px] text-ink-4 leading-relaxed">
              Fees vary by premises area — exact amount is shown before you pay.
              No officer can ask for anything more.
            </p>
          </Section>
        </>
      )}

      {stage === "form" && (
        <Section className="mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 items-start">
            {/* Steps rail */}
            <aside className="lg:sticky lg:top-6">
              <div className="surface-card hairline rounded-[20px] p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3 px-2 mb-3">
                  Application
                </div>
                <div className="space-y-1">
                  {STEPS.map((s, i) => {
                    const active = step === i;
                    const done = step > i;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => done && setStep(i as Step)}
                        disabled={!done}
                        className={
                          "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors text-left " +
                          (active
                            ? "bg-ink/[0.06]"
                            : done
                            ? "hover:bg-ink/[0.04] cursor-pointer"
                            : "")
                        }
                      >
                        <span
                          className={
                            "grid place-items-center h-6 w-6 rounded-full text-[10px] font-bold shrink-0 " +
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
                            "text-[13px] " +
                            (active
                              ? "text-ink font-medium"
                              : done
                              ? "text-ink-2"
                              : "text-ink-3")
                          }
                        >
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-line-soft px-2 text-[11px] text-ink-3">
                  Auto-saved · 12 sec ago
                </div>
              </div>
            </aside>

            <div className="surface-card hairline rounded-[24px] p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {step === 0 && (
                  <motion.div
                    key="biz"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SectionLabel>Step 1 of 4 · Business</SectionLabel>
                    <h2 className="font-display mt-4 text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
                      Tell us about your business.
                    </h2>

                    <div className="mt-7 space-y-5">
                      <Field label="Business / trade name">
                        <input
                          autoFocus
                          value={biz.name}
                          onChange={(e) =>
                            setBiz({ ...biz, name: e.target.value })
                          }
                          placeholder="e.g. Sai Auto Spares"
                          className="w-full bg-transparent outline-none text-base text-ink placeholder:text-ink-4 focus-ring rounded"
                        />
                      </Field>

                      <Field label="Category">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                          {CATEGORIES.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() =>
                                setBiz({ ...biz, category: c.id })
                              }
                              className={
                                "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all focus-ring " +
                                (biz.category === c.id
                                  ? "border-accent bg-accent-soft"
                                  : "border-line hover:border-ink/15")
                              }
                            >
                              <span className="text-lg">{c.emoji}</span>
                              <span className="text-[12px] text-ink leading-tight">
                                {c.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </Field>

                      <Field
                        label="Business / proprietor PAN"
                        hint="Format: ABCDE1234F"
                      >
                        <input
                          value={biz.pan}
                          onChange={(e) =>
                            setBiz({
                              ...biz,
                              pan: e.target.value
                                .toUpperCase()
                                .replace(/[^A-Z0-9]/g, "")
                                .slice(0, 10),
                            })
                          }
                          placeholder="ABCDE1234F"
                          className="w-full bg-transparent outline-none text-base tabular tracking-wider text-ink placeholder:text-ink-4 focus-ring rounded"
                        />
                      </Field>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="prem"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SectionLabel>Step 2 of 4 · Premises</SectionLabel>
                    <h2 className="font-display mt-4 text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
                      Where does the business operate?
                    </h2>

                    <div className="mt-7 space-y-5">
                      <Field label="Ward">
                        <select
                          value={prem.ward}
                          onChange={(e) =>
                            setPrem({ ...prem, ward: e.target.value })
                          }
                          className="w-full bg-transparent outline-none text-base text-ink focus-ring rounded"
                        >
                          <option value="">Select a ward…</option>
                          {[
                            "Dharampeth",
                            "Civil Lines",
                            "Sitabuldi",
                            "Lakadganj",
                            "Ambazari",
                            "Wardha Road",
                            "Mahal",
                            "Manish Nagar",
                          ].map((w) => (
                            <option key={w} value={w}>
                              {w}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Built-up area" hint="In square feet">
                        <div className="flex items-baseline gap-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={prem.area}
                            onChange={(e) =>
                              setPrem({
                                ...prem,
                                area: e.target.value.replace(/\D/g, ""),
                              })
                            }
                            placeholder="0"
                            className="flex-1 bg-transparent outline-none text-base tabular text-ink placeholder:text-ink-4 focus-ring rounded"
                          />
                          <span className="text-[12px] text-ink-3">sq ft</span>
                        </div>
                      </Field>

                      <Field label="Premises ownership">
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          {(
                            [
                              { id: "owned", label: "Owned" },
                              { id: "rented", label: "Rented / leased" },
                            ] as const
                          ).map((o) => (
                            <button
                              key={o.id}
                              type="button"
                              onClick={() =>
                                setPrem({ ...prem, ownership: o.id })
                              }
                              className={
                                "rounded-xl border px-4 py-3 text-sm text-left transition-all focus-ring " +
                                (prem.ownership === o.id
                                  ? "border-accent bg-accent-soft text-ink"
                                  : "border-line hover:border-ink/15 text-ink-2")
                              }
                            >
                              {o.label}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="docs"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SectionLabel>Step 3 of 4 · Documents</SectionLabel>
                    <h2 className="font-display mt-4 text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
                      Upload your three documents.
                    </h2>
                    <p className="mt-3 text-sm text-ink-3 max-w-md">
                      Each one is auto-validated as you upload. Phone photos are fine.
                    </p>

                    <div className="mt-7 space-y-3">
                      <UploadRow
                        label="PAN card"
                        sub="Required · auto-validated against I-T database"
                        done={docs.kyc}
                        onUpload={() => setDocs({ ...docs, kyc: true })}
                      />
                      {prem.ownership === "rented" && (
                        <UploadRow
                          label="Lease agreement"
                          sub="Required for rented premises · 11+ months"
                          done={docs.lease}
                          onUpload={() => setDocs({ ...docs, lease: true })}
                        />
                      )}
                      <UploadRow
                        label="Premises layout / photo"
                        sub="Required · entrance + signage visible"
                        done={docs.layout}
                        onUpload={() => setDocs({ ...docs, layout: true })}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="fees"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SectionLabel>Step 4 of 4 · Review & pay</SectionLabel>
                    <h2 className="font-display mt-4 text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
                      Almost done.
                    </h2>

                    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ReviewCell label="Business" value={biz.name || "—"} />
                      <ReviewCell
                        label="Category"
                        value={
                          CATEGORIES.find((c) => c.id === biz.category)?.label ?? "—"
                        }
                      />
                      <ReviewCell label="PAN" value={biz.pan || "—"} />
                      <ReviewCell label="Ward" value={prem.ward || "—"} />
                      <ReviewCell
                        label="Area"
                        value={prem.area ? `${prem.area} sq ft` : "—"}
                      />
                      <ReviewCell
                        label="Ownership"
                        value={prem.ownership === "owned" ? "Owned" : "Rented"}
                      />
                    </div>

                    <div className="mt-8 surface-card hairline rounded-[20px] p-5 bg-bg-2">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
                        Computed fee
                      </div>
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex items-center justify-between text-ink-2">
                          <span>Base · {CATEGORIES.find((c) => c.id === biz.category)?.label}</span>
                          <span className="tabular">{formatINR(fee)}</span>
                        </div>
                        <div className="flex items-center justify-between text-ink-2">
                          <span>Area surcharge · {prem.area} sq ft</span>
                          <span className="tabular">{formatINR(areaSurcharge)}</span>
                        </div>
                        <div className="border-t border-line-soft my-2" />
                        <div className="flex items-baseline justify-between text-ink">
                          <span className="text-[12px] uppercase tracking-[0.16em] text-ink-3">
                            Total · payable now
                          </span>
                          <span className="font-display tabular text-3xl font-medium leading-none">
                            {formatINR(totalFee)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-5 text-[11px] text-ink-4">
                      Payment opens UPI / card / net banking. Refundable if your
                      application is rejected.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer nav */}
              <div className="mt-10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (step === 0) setStage("intro");
                    else setStep((step - 1) as Step);
                  }}
                  className="inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink transition-colors focus-ring rounded"
                >
                  <Icon name="back" size={13} />
                  {step === 0 ? "Back to overview" : "Previous"}
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => setStep((step + 1) as Step)}
                    className="inline-flex items-center gap-2 rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue
                    <Icon name="arrow" size={13} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStage("submitted")}
                    className="inline-flex items-center gap-2 rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring"
                  >
                    Pay {formatINR(totalFee)} & submit
                    <span className="grid place-items-center h-5 w-5 rounded-full bg-accent text-white">
                      <Icon name="arrow" size={11} />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </Section>
      )}

      {stage === "submitted" && (
        <Section className="mt-2">
          <Submitted
            biz={biz.name}
            fee={totalFee}
            onAgain={() => {
              setStage("intro");
              setStep(0);
            }}
          />
        </Section>
      )}
    </SiteShell>
  );
}

function FeatureCard({
  icon,
  title,
  blurb,
}: {
  icon: "spark" | "check" | "map";
  title: string;
  blurb: string;
}) {
  return (
    <div className="surface-card hairline rounded-[20px] p-6">
      <span className="grid place-items-center h-10 w-10 rounded-xl bg-ink/[0.04] text-ink-2">
        <Icon name={icon} size={16} />
      </span>
      <h3 className="font-display mt-5 text-xl tracking-tight text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-3 leading-relaxed">{blurb}</p>
    </div>
  );
}

function DocLine({ label, detail }: { label: string; detail: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid place-items-center h-5 w-5 rounded-full bg-sage/15 text-sage shrink-0">
        <Icon name="check" size={11} />
      </span>
      <span>
        <span className="block text-ink">{label}</span>
        <span className="block text-[12px] text-ink-3 mt-0.5">{detail}</span>
      </span>
    </li>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] uppercase tracking-[0.16em] text-ink-3">
          {label}
        </span>
        {hint && <span className="text-[11px] text-ink-4">{hint}</span>}
      </div>
      <div className="rounded-xl bg-ink/[0.03] px-3.5 py-3 border border-transparent focus-within:border-accent/40 transition-colors">
        {children}
      </div>
    </label>
  );
}

function UploadRow({
  label,
  sub,
  done,
  onUpload,
}: {
  label: string;
  sub: string;
  done: boolean;
  onUpload: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onUpload}
      className={
        "w-full flex items-center justify-between gap-4 rounded-xl border px-4 py-4 transition-all focus-ring text-left " +
        (done
          ? "border-sage/40 bg-sage/5"
          : "border-line hover:border-ink/15 hover:bg-ink/[0.02]")
      }
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={
            "grid place-items-center h-9 w-9 rounded-xl shrink-0 " +
            (done ? "bg-sage text-white" : "bg-ink/[0.04] text-ink-2")
          }
        >
          {done ? <Icon name="check" size={14} /> : <span className="text-[14px]">↑</span>}
        </span>
        <div className="min-w-0">
          <div className="text-[13px] font-medium text-ink">{label}</div>
          <div className="text-[11px] text-ink-3 mt-0.5">{sub}</div>
        </div>
      </div>
      <span className="text-[11px] uppercase tracking-[0.14em] text-ink-3">
        {done ? "Verified" : "Upload"}
      </span>
    </button>
  );
}

function ReviewCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink/[0.03] px-3.5 py-2.5">
      <div className="text-[10px] uppercase tracking-[0.16em] text-ink-3">
        {label}
      </div>
      <div className="text-[14px] text-ink mt-0.5 truncate">{value}</div>
    </div>
  );
}

function Submitted({
  biz,
  fee,
  onAgain,
}: {
  biz: string;
  fee: number;
  onAgain: () => void;
}) {
  const id = `NMC-TL-${Math.floor(40000 + Math.random() * 9999)}`;
  const STAGES = [
    { name: "Submitted", t: "just now", on: true, current: true },
    { name: "AI verification", t: "~ 2 min", on: false, current: false },
    { name: "Officer review", t: "Day 1", on: false, current: false },
    { name: "Field inspection", t: "Day 3", on: false, current: false },
    { name: "License issued", t: "Day 5", on: false, current: false },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 sm:gap-8 items-start">
      <div className="surface-card hairline rounded-[24px] p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-10 w-10 rounded-full bg-sage/10 text-sage">
            <Icon name="check" size={18} />
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
              Application received
            </div>
            <div className="font-display text-2xl tracking-tight text-ink">
              {biz || "Trade license"}
            </div>
            <div className="text-[12px] text-ink-3 tabular mt-0.5">
              {id} · {formatINR(fee)} paid
            </div>
          </div>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink/[0.03] px-3 py-1.5 text-[11px] text-ink-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot" />
          You&rsquo;ll get SMS + WhatsApp on every status change.
        </div>

        <div className="mt-7 flex items-center gap-3">
          <Link
            href="/citizen"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-medium hover:scale-[1.02] transition-transform focus-ring"
          >
            Back to home
            <Icon name="arrow" size={13} />
          </Link>
          <button
            onClick={onAgain}
            className="text-sm text-ink-3 hover:text-ink transition-colors focus-ring rounded"
          >
            Apply for another →
          </button>
        </div>
      </div>

      <div className="surface-card hairline rounded-[24px] p-6 sm:p-8">
        <SectionLabel>Live status</SectionLabel>
        <div className="mt-6 relative">
          <div className="absolute left-3 top-3 bottom-3 w-px bg-line" />
          {STAGES.map((s, i) => (
            <div key={s.name} className="relative flex items-center gap-3 py-2.5">
              <span
                className={
                  "relative grid place-items-center h-6 w-6 rounded-full text-[10px] font-bold shrink-0 " +
                  (s.current
                    ? "bg-accent text-white"
                    : s.on
                    ? "bg-sage text-white"
                    : "bg-ink/[0.06] text-ink-3")
                }
              >
                {s.on && !s.current ? "✓" : i + 1}
              </span>
              <div className="flex-1 flex items-center justify-between gap-3">
                <span
                  className={
                    "text-sm " +
                    (s.current ? "text-ink font-medium" : "text-ink-2")
                  }
                >
                  {s.name}
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-ink-3 tabular">
                  {s.t}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-ink-4 leading-relaxed">
          Estimated issue date: <span className="text-ink-2 tabular">Day 5 (Mon next week)</span>. The license is delivered as a verifiable digital certificate, plus a printable copy.
        </p>
      </div>
    </div>
  );
}
