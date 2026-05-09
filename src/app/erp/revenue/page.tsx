"use client";

import { motion } from "framer-motion";
import { ErpShell } from "@/components/erp/ErpShell";
import { Icon } from "@/components/Icon";

export default function RevenueIntelligencePage() {
  return (
    <ErpShell>
      <div className="px-5 lg:px-8 pt-6 pb-12 max-w-[1400px] mx-auto">
        <RevenueHero />
        <DefaulterIntelligence />
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-4">
          <CollectionForecast />
          <ReconciliationStream />
        </div>
        <CampaignOrchestrator />
      </div>
    </ErpShell>
  );
}

/* ─── HERO ─── */
function RevenueHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[18px] border border-line bg-surface/40 p-6 sm:p-8"
    >
      <div
        aria-hidden
        className="absolute -top-1/2 -right-1/4 h-[180%] w-[60%] rounded-full opacity-20 blur-3xl bg-gradient-to-br from-sage/40 via-heritage/20 to-transparent"
      />
      <div className="relative flex items-start justify-between flex-wrap gap-5">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3">
            <span className="h-px w-8 bg-line" />
            <span>Revenue intelligence · CAFO console</span>
          </div>
          <h1 className="font-display mt-4 text-[clamp(32px,5vw,56px)] font-medium leading-[0.98] tracking-tightest text-ink">
            Q3, on quiet pace.
            <br />
            <span className="italic font-light text-ink-2">Three levers can close the gap.</span>
          </h1>
          <p className="mt-5 text-[14px] sm:text-[15px] text-ink-3 max-w-2xl leading-relaxed">
            Collection at <span className="text-ink tabular">₹113 Cr</span> of <span className="text-ink tabular">₹130 Cr</span> target. Defaulter intelligence has identified <span className="text-ink tabular">342 high-value accounts</span> worth <span className="text-ink tabular">₹14.8 Cr</span>. AI campaign ready to deploy on your nod.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Forecast · Q3 close
          </div>
          <div className="font-display tabular text-5xl font-medium text-ink leading-none">
            ₹126 Cr
          </div>
          <div className="text-[11px] text-ink-3 uppercase tracking-[0.14em]">
            <span className="text-amber">▼ ₹4 Cr</span> · without action
          </div>
        </div>
      </div>

      <div className="relative mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { k: "Collected today", v: "₹4.2 Cr", trend: "+12.4%", tone: "sage" },
          { k: "Defaulter pipeline", v: "₹14.8 Cr", trend: "342 accts", tone: "amber" },
          { k: "Reminders out", v: "4,128", trend: "AI auto", tone: "accent" },
          { k: "Recon gap", v: "₹84,200", trend: "4 entries", tone: "amber" },
        ].map((s) => (
          <div key={s.k} className="rounded-md border border-line bg-bg/40 px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">{s.k}</div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="font-display tabular text-3xl text-ink leading-none">
                {s.v}
              </span>
            </div>
            <div className={"mt-2 text-[11px] tabular " + (s.tone === "amber" ? "text-amber" : s.tone === "accent" ? "text-accent" : "text-sage")}>
              {s.trend}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── DEFAULTER INTELLIGENCE ─── */
const DEFAULTERS = [
  { name: "Sai Auto Spares", id: "NMC-SB-1042-X1", outstanding: 184_000, ward: "Sitabuldi", risk: "high", lastPaid: "Q2 2024–25", reason: "Repeated non-response · 3 reminders bounced" },
  { name: "Mahal Sweets Pvt", id: "NMC-MH-3318-A2", outstanding: 142_500, ward: "Mahal", risk: "high", lastPaid: "Q1 2024–25", reason: "Address mismatch · field check needed" },
  { name: "Wardha Logistics", id: "NMC-WR-9221-B4", outstanding: 96_800, ward: "Wardha Rd", risk: "med", lastPaid: "Q4 2024–25", reason: "Delayed payer · usually pays late Q3" },
  { name: "Lakadganj Clinic", id: "NMC-LK-4421-C7", outstanding: 78_400, ward: "Lakadganj", risk: "med", lastPaid: "Q3 2024–25", reason: "New ownership · transfer pending" },
  { name: "Civil Plaza Mall", id: "NMC-CL-1188-D2", outstanding: 612_000, ward: "Civil Lines", risk: "high", lastPaid: "Q2 2024–25", reason: "Dispute filed · revaluation requested" },
];

function DefaulterIntelligence() {
  return (
    <div className="mt-8">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-ink-3">
            <span className="h-px w-6 bg-line" />
            <span>Defaulter intelligence · top 5 of 342</span>
          </div>
          <h2 className="font-display mt-3 text-[clamp(22px,3vw,32px)] font-medium tracking-tight text-ink leading-[1.05]">
            Where ₹14.8 Cr is sitting.
          </h2>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-ink text-bg px-4 py-2 text-[12px] font-medium hover:scale-[1.02] transition-transform focus-ring">
          Launch campaign · 800 accts
          <Icon name="arrow" size={11} />
        </button>
      </div>

      <div className="rounded-[14px] border border-line bg-surface/20 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.5fr_1fr_140px_120px_120px] gap-4 px-5 py-3 border-b border-line/60 text-[10px] uppercase tracking-[0.14em] text-ink-3">
          <span>Account</span>
          <span>Why high risk</span>
          <span>Ward</span>
          <span>Last paid</span>
          <span className="text-right">Outstanding</span>
        </div>
        {DEFAULTERS.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className={
              "grid grid-cols-1 md:grid-cols-[1.5fr_1fr_140px_120px_120px] gap-4 px-5 py-4 hover:bg-bg/40 transition-colors group cursor-pointer " +
              (i < DEFAULTERS.length - 1 ? "border-b border-line/40" : "")
            }
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={
                    "h-1.5 w-1.5 rounded-full shrink-0 " +
                    (d.risk === "high" ? "bg-danger" : "bg-amber")
                  }
                />
                <span className="text-[13px] font-medium text-ink truncate">
                  {d.name}
                </span>
              </div>
              <div className="text-[11px] text-ink-3 tabular mt-0.5">{d.id}</div>
            </div>
            <div className="text-[12px] text-ink-2 leading-snug">{d.reason}</div>
            <div className="text-[12px] text-ink-3">{d.ward}</div>
            <div className="text-[12px] text-ink-3 tabular">{d.lastPaid}</div>
            <div className="text-right">
              <div className="font-display tabular text-lg text-ink leading-none">
                ₹{d.outstanding.toLocaleString("en-IN")}
              </div>
              <button className="mt-1 text-[10px] uppercase tracking-[0.14em] text-accent hover:underline focus-ring rounded">
                Open file →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── COLLECTION FORECAST (mini chart) ─── */
function CollectionForecast() {
  // Mock 12 weekly points — actual + forecast
  const weeks = [82, 85, 88, 90, 91, 93, 96, 99, 102, 105, 108, 113];
  const target = 130;
  const max = target * 1.05;
  const pointFor = (v: number, i: number) => ({
    x: (i / (weeks.length - 1)) * 100,
    y: 100 - (v / max) * 100,
  });
  const path = weeks
    .map((v, i) => `${i === 0 ? "M" : "L"} ${pointFor(v, i).x.toFixed(2)} ${pointFor(v, i).y.toFixed(2)}`)
    .join(" ");

  // Forecast extension
  const forecast = [113, 116, 119, 122, 125, 126];
  const forecastPath = forecast
    .map((v, i) => {
      const idx = (weeks.length - 1) + i;
      const x = (idx / (weeks.length - 1 + forecast.length - 1)) * 100;
      const y = 100 - (v / max) * 100;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  const targetY = 100 - (target / max) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55 }}
      className="rounded-[14px] border border-line bg-surface/30 p-5 sm:p-6"
    >
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
            <Icon name="data" size={10} />
            Collection forecast · Q3
          </div>
          <h3 className="font-display mt-2 text-[20px] tracking-tight text-ink leading-tight">
            Trajectory & target
          </h3>
        </div>
        <span className="text-[11px] tabular text-ink-3">
          ₹113 Cr <span className="text-ink-4">/ ₹130 Cr</span>
        </span>
      </div>

      <div className="relative h-44">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {/* Target line */}
          <line x1="0" y1={targetY} x2="100" y2={targetY} stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" strokeDasharray="2,2" />
          {/* Actual area */}
          <path d={`${path} L 100 100 L 0 100 Z`} fill="url(#g1)" opacity="0.4" />
          {/* Actual line */}
          <path d={path} stroke="#E25822" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
          {/* Forecast line (dashed) */}
          <path d={forecastPath} stroke="#E25822" strokeWidth="1" fill="none" strokeDasharray="3,2" opacity="0.7" vectorEffect="non-scaling-stroke" />
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E25822" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E25822" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {/* Glowing "now" point at the last actual data — meaningful, marks live position */}
        {(() => {
          const last = pointFor(weeks[weeks.length - 1], weeks.length - 1);
          return (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center pointer-events-none"
              style={{ left: `${last.x}%`, top: `${last.y}%` }}
            >
              <span className="absolute h-6 w-6 rounded-full bg-accent/30 blur-md now-glow" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-bg shadow-[0_0_12px_rgba(226,88,34,0.6)]" />
            </div>
          );
        })()}
        <div className="absolute right-2 text-[10px] uppercase tracking-[0.14em] text-ink-3" style={{ top: `${targetY}%`, transform: "translateY(-50%)" }}>
          ₹130 Cr target
        </div>
        <div className="absolute bottom-1 right-2 text-[10px] uppercase tracking-[0.14em] text-accent inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent live-dot" />
          Now
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { k: "Top 800 reminders", v: "+₹3.4 Cr", on: true },
          { k: "Rebate +5 days", v: "+₹1.1 Cr", on: false },
          { k: "Mahal officers ×2", v: "+₹0.8 Cr", on: false },
        ].map((l) => (
          <button
            key={l.k}
            className={
              "rounded-md border px-3 py-2.5 text-left transition-colors focus-ring " +
              (l.on
                ? "border-accent/40 bg-accent/10"
                : "border-line bg-bg/30 hover:bg-bg/50")
            }
          >
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">
              {l.k}
            </div>
            <div className="mt-1 text-[14px] tabular text-ink">{l.v}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── RECONCILIATION ─── */
const RECON = [
  { batch: "UPI · 06 May 14:22", amount: 21_400, status: "pending", note: "NPCI ack delayed" },
  { batch: "UPI · 07 May 09:15", amount: 18_200, status: "pending", note: "Awaiting bank file" },
  { batch: "UPI · 07 May 11:08", amount: 24_600, status: "pending", note: "Auto-retry queued" },
  { batch: "Card · 07 May 16:30", amount: 20_000, status: "pending", note: "Settlement T+1" },
];

function ReconciliationStream() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="rounded-[14px] border border-line bg-surface/30 p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
            <span className="h-1.5 w-1.5 rounded-full bg-amber live-dot" />
            Reconciliation gap
          </div>
          <h3 className="font-display mt-2 text-[20px] tracking-tight text-ink leading-tight">
            ₹84,200 unmatched
          </h3>
        </div>
        <span className="text-[11px] tabular text-ink-3">4 batches</span>
      </div>

      <div className="space-y-2">
        {RECON.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-md bg-bg/30 px-3.5 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-ink truncate tabular">{r.batch}</div>
              <div className="text-[10px] text-ink-3 truncate">{r.note}</div>
            </div>
            <div className="font-display tabular text-base text-ink-2 shrink-0">
              ₹{r.amount.toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full rounded-md border border-line bg-bg/30 hover:bg-bg/50 px-4 py-2.5 text-[12px] text-ink-2 hover:text-ink transition-colors focus-ring">
        Run auto-recon now
      </button>
    </motion.div>
  );
}

/* ─── CAMPAIGN ORCHESTRATOR ─── */
function CampaignOrchestrator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55 }}
      className="mt-8 rounded-[18px] border border-line bg-surface/30 p-6 sm:p-8"
    >
      <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-3">
        <Icon name="spark" size={10} />
        <span>AI campaign · ready</span>
      </div>
      <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-medium tracking-tight text-ink leading-[1.05]">
        Recover <span className="italic font-light text-ink-2">₹14.8 Cr</span> · approve to launch.
      </h2>
      <p className="mt-3 text-[13px] text-ink-3 max-w-2xl leading-relaxed">
        AI has segmented 800 high-value defaulters and drafted personalised
        reminders in English / हिन्दी / मराठी. Channel mix optimised by past
        response rates. Estimated recovery <span className="text-ink tabular">±1.2 Cr</span>.
      </p>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { ch: "WhatsApp", count: "612", rate: "Read 84%", tone: "sage" },
          { ch: "SMS", count: "800", rate: "Read 62%", tone: "accent" },
          { ch: "Voice (regional)", count: "188", rate: "Avg pickup 34%", tone: "amber" },
        ].map((c) => (
          <div key={c.ch} className="rounded-md border border-line bg-bg/40 px-4 py-3.5">
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">
              {c.ch}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display tabular text-2xl text-ink leading-none">
                {c.count}
              </span>
              <span className="text-[11px] text-ink-3">recipients</span>
            </div>
            <div className={"mt-2 text-[11px] " + (c.tone === "sage" ? "text-sage" : c.tone === "amber" ? "text-amber" : "text-accent")}>
              {c.rate}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-md bg-ink text-bg px-5 py-2.5 text-[13px] font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring">
          Approve & launch
          <span className="grid place-items-center h-5 w-5 rounded-full bg-accent text-white">
            <Icon name="arrow" size={11} />
          </span>
        </button>
        <button className="text-[12px] text-ink-3 hover:text-ink transition-colors focus-ring rounded">
          Preview a sample message
        </button>
        <span className="ml-auto text-[10px] uppercase tracking-[0.14em] text-ink-4">
          Audit trail attached · model v3.2
        </span>
      </div>
    </motion.div>
  );
}
