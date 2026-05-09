"use client";

import { motion } from "framer-motion";
import { type Role, ROLES } from "@/lib/erp";
import { Icon } from "@/components/Icon";

type Insight = {
  type: "predict" | "alert" | "action" | "info";
  title: string;
  body: string;
  cta?: string;
  conf?: number;
};

const INSIGHTS_BY_ROLE: Record<Role, Insight[]> = {
  commissioner: [
    {
      type: "alert",
      title: "Sitabuldi grievance spike",
      body: "Open complaints up 38% week-on-week. Garbage + drainage are the top two categories. Recommend escalation to Zone 2 head.",
      cta: "Open ward",
      conf: 0.91,
    },
    {
      type: "predict",
      title: "Q3 collection forecast",
      body: "On current trajectory, Q3 will close at ₹126 Cr — ₹4 Cr below target. Issuing reminders to top 800 defaulters could close the gap.",
      cta: "Review recovery plan",
      conf: 0.86,
    },
    {
      type: "action",
      title: "Two SLAs at risk",
      body: "Building permission #BP-2841 and Trade renewal #TL-9123 will breach SLA in <24h. Auto-reassigned suggestion ready.",
      cta: "Review queue",
    },
    {
      type: "info",
      title: "Citizen sentiment",
      body: "AI sentiment up 11pp this month. Largest contributor: 30s payment flow rolling out citywide.",
    },
  ],
  cafo: [
    {
      type: "predict",
      title: "Defaulter recovery model",
      body: "Top 800 defaulters represent 64% of outstanding. Targeted SMS + WhatsApp campaign expected to recover ₹14.8 Cr (±1.2 Cr).",
      cta: "Launch campaign",
      conf: 0.83,
    },
    {
      type: "alert",
      title: "Reconciliation gap",
      body: "4 UPI batches from May 6–7 unreconciled (₹84,200). NPCI confirmation pending. Auto-flagged for review.",
      cta: "Review entries",
    },
    {
      type: "action",
      title: "Ward 22 collection low",
      body: "Only 41% paid — historically 67% by this point. Suggest deploying 2 more revenue officers + community drive.",
      cta: "Plan intervention",
    },
  ],
  inspector: [
    {
      type: "predict",
      title: "Optimal route saved 22 min",
      body: "AI re-ordered today's 12 inspections. Net 22 min saved + avoids Wardha Rd jam between 11–12.",
      cta: "Apply route",
      conf: 0.94,
    },
    {
      type: "alert",
      title: "3 SLA breaches imminent",
      body: "Drainage #DR-8821, Pothole #PT-9301, Streetlight #SL-2099 all due before EOD. Prioritized to top of route.",
      cta: "View breaches",
    },
    {
      type: "info",
      title: "Photo evidence quality",
      body: "Last week 96% of your reports cleared AI quality check first time — best in Zone 4.",
    },
  ],
  "trade-officer": [
    {
      type: "alert",
      title: "5 applications flagged",
      body: "AI fraud signal triggered on 5 trade renewals — duplicate PAN, address mismatch, recent ownership transfers.",
      cta: "Review flags",
      conf: 0.89,
    },
    {
      type: "predict",
      title: "Approval throughput",
      body: "At current rate, queue clears in 3.2 days. Auto-approving low-risk renewals (last yr clean) would clear in 1.4 days.",
      cta: "Enable auto-renew",
      conf: 0.87,
    },
    {
      type: "action",
      title: "8 inspections this week",
      body: "Linked to high-risk new applications. Coordinated with Zone 2 inspector schedule.",
    },
  ],
  survey: [
    {
      type: "action",
      title: "23 properties awaiting survey",
      body: "AI prioritized list ready — 7 commercial, 16 residential, average distance 0.8 km between consecutive sites.",
      cta: "Open route",
    },
  ],
  revenue: [
    {
      type: "predict",
      title: "Ward 14 due window opens",
      body: "1,247 properties enter due window in 8 days. AI suggests staggered reminders + door-to-door for top 200 defaulters.",
      cta: "Schedule",
      conf: 0.88,
    },
  ],
};

export function InsightsPanel({ role }: { role: Role }) {
  const insights = INSIGHTS_BY_ROLE[role];
  const profile = ROLES[role];

  return (
    <div className="border-l border-line bg-bg-2/70 backdrop-blur-xl px-5 py-5 h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center h-7 w-7 rounded-md bg-accent/15 text-accent">
            <Icon name="spark" size={13} />
          </span>
          <div>
            <div className="text-[12px] font-medium text-ink leading-tight">
              AI Insights
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-ink-3 mt-0.5">
              tuned for {profile.shortName.toLowerCase()}
            </div>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.14em] text-ink-3 inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot" />
          Live
        </span>
      </div>

      <div className="space-y-2.5">
        {insights.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            className="rounded-md border border-line bg-surface/70 p-3.5"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <TypeBadge type={it.type} />
              {typeof it.conf === "number" && (
                <span className="text-[9px] uppercase tracking-[0.14em] text-ink-4 tabular ml-auto">
                  {Math.round(it.conf * 100)}% confidence
                </span>
              )}
            </div>
            <h4 className="text-[13px] font-medium text-ink leading-tight">
              {it.title}
            </h4>
            <p className="mt-1.5 text-[11px] text-ink-3 leading-snug">
              {it.body}
            </p>
            {it.cta && (
              <button className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-accent hover:underline focus-ring rounded">
                {it.cta} <Icon name="arrow" size={10} />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-5 rounded-md border border-dashed border-line bg-surface/50 p-3.5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
          <Icon name="spark" size={10} />
          Ask follow-up
        </div>
        <button className="mt-2 w-full text-left text-[12px] text-ink-2 hover:text-ink transition-colors focus-ring rounded">
          &ldquo;Why is Sitabuldi spiking?&rdquo;
          <Icon name="arrow" size={11} />
        </button>
        <button className="mt-1.5 w-full text-left text-[12px] text-ink-2 hover:text-ink transition-colors focus-ring rounded">
          &ldquo;Forecast next month&rsquo;s collection&rdquo;
          <Icon name="arrow" size={11} />
        </button>
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: Insight["type"] }) {
  const map = {
    predict: { label: "Forecast", cls: "bg-heritage/15 text-heritage" },
    alert: { label: "Alert", cls: "bg-danger/15 text-danger" },
    action: { label: "Action", cls: "bg-accent/15 text-accent" },
    info: { label: "Insight", cls: "bg-sage/15 text-sage" },
  } as const;
  const m = map[type];
  return (
    <span className={"inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] font-medium " + m.cls}>
      <span className="h-1 w-1 rounded-full bg-current" />
      {m.label}
    </span>
  );
}
