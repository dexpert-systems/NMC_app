"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ErpShell } from "@/components/erp/ErpShell";
import { Icon } from "@/components/Icon";
import { LiveCounter } from "@/components/erp/LiveCounter";
import { getCurrentRole, ROLES } from "@/lib/erp";

export default function CommissionerCockpit() {
  const router = useRouter();

  // Role-aware home: redirect non-commissioners to their home view.
  useEffect(() => {
    const r = getCurrentRole();
    if (!r) return;
    if (r !== "commissioner" && r !== "survey") {
      router.replace(ROLES[r].homeHref);
    }
  }, [router]);

  return (
    <ErpShell>
      <div className="px-5 lg:px-8 pt-6 pb-12 max-w-[1400px] mx-auto">
        {/* Cockpit hero strip */}
        <CockpitHero />

        {/* Action stack — what should you do next */}
        <ActionStack />

        {/* KPI grid */}
        <KPIGrid />

        {/* Risk heatmap + escalation stream */}
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-4">
          <RiskHeatmap />
          <EscalationStream />
        </div>

        {/* Workflow timeline */}
        <WorkflowTimeline />
      </div>
    </ErpShell>
  );
}

/* ────────────── COCKPIT HERO ────────────── */

function CockpitHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[18px] border border-line bg-surface/40 p-6 sm:p-8"
    >
      <div
        aria-hidden
        className="absolute -top-1/2 -right-1/4 h-[180%] w-[60%] rounded-full opacity-20 blur-3xl bg-gradient-to-br from-accent/40 via-heritage/20 to-transparent"
      />
      <div className="relative flex items-start justify-between flex-wrap gap-5">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3">
            <span className="h-px w-8 bg-line" />
            <span>Commissioner&rsquo;s cockpit · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</span>
          </div>
          <h1 className="font-display mt-4 text-[clamp(32px,5vw,56px)] font-medium leading-[0.98] tracking-tightest text-ink">
            Good evening, Anita.
            <br />
            <span className="italic font-light text-ink-2">The city is mostly on track.</span>
          </h1>
          <p className="mt-5 text-[14px] sm:text-[15px] text-ink-3 max-w-2xl leading-relaxed">
            Q3 collection is{" "}
            <span className="text-ink tabular">87%</span> of target with{" "}
            <span className="text-ink tabular">11 days</span> left. Two wards
            need a push. Nine grievances escalated to your queue. Sentiment
            climbing — best month since launch.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
            City pulse
          </div>
          <div className="font-display tabular text-5xl font-medium text-ink leading-none">
            +2.4
          </div>
          <div className="text-[11px] text-ink-3 uppercase tracking-[0.14em]">
            <span className="text-sage">▲ 11 pp</span> · vs last week
          </div>
        </div>
      </div>

      <div className="relative mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SubKPI k="Wards on track" v="31" total="/ 38" tone="sage" />
        <SubKPI k="Open escalations" v="9" total="of 12 today" tone="amber" />
        <SubKPI k="AI agents active" v="9" total="across depts" tone="accent" pulse />
        <SubKPI k="SLA compliance" v="94" total="% MTD" tone="sage" />
      </div>
    </motion.div>
  );
}

function SubKPI({
  k,
  v,
  total,
  tone,
  pulse,
}: {
  k: string;
  v: string;
  total: string;
  tone: "sage" | "amber" | "accent";
  pulse?: boolean;
}) {
  return (
    <div className="rounded-md border border-line bg-bg/40 px-4 py-3 relative overflow-hidden">
      {pulse && (
        <span
          aria-hidden
          className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-sage live-dot"
        />
      )}
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">{k}</div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="font-display tabular text-3xl text-ink leading-none">
          {v}
        </span>
        <span className="text-[11px] text-ink-3">{total}</span>
      </div>
      <div
        className={
          "mt-2 h-0.5 w-full rounded-full " +
          (tone === "sage"
            ? "bg-sage/40"
            : tone === "amber"
            ? "bg-amber/40"
            : "bg-accent/40")
        }
      />
    </div>
  );
}

/* ────────────── ACTION STACK ────────────── */

const ACTIONS = [
  {
    priority: 1,
    type: "escalation",
    title: "Sitabuldi grievance spike — clear in 1-tap",
    sub: "AI suggests escalating to Zone 2 head + dispatching 2 sanitation crews.",
    sla: "Action recommended today",
    cta: "Review brief",
    tone: "danger",
  },
  {
    priority: 2,
    type: "decision",
    title: "Defaulter recovery campaign · ₹14.8 Cr",
    sub: "Pre-approved batch of 800 SMS+WhatsApp reminders, ready to send.",
    sla: "Awaiting your nod · 38 min queued",
    cta: "Review & approve",
    tone: "accent",
  },
  {
    priority: 3,
    type: "approval",
    title: "Building permission #BP-2841",
    sub: "AI risk score 0.23 (low). Auto-recommended approval. Architect verified.",
    sla: "SLA breach in 18h",
    cta: "Approve",
    tone: "amber",
  },
];

function ActionStack() {
  return (
    <div className="mt-8">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-ink-3">
            <span className="h-px w-6 bg-line" />
            <span>Decide today</span>
          </div>
          <h2 className="font-display mt-3 text-[clamp(22px,3vw,32px)] font-medium tracking-tight text-ink leading-[1.05]">
            What needs you, ranked.
          </h2>
        </div>
        <button className="text-[12px] uppercase tracking-[0.14em] text-ink-3 hover:text-ink transition-colors focus-ring rounded">
          Open full queue →
        </button>
      </div>

      <div className="space-y-2.5">
        {ACTIONS.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.06,
            }}
            className="group rounded-[14px] border border-line bg-surface/30 hover:bg-surface/60 hover:border-ink/15 px-5 py-4 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="grid place-items-center h-10 w-10 rounded-md bg-bg/60 text-[13px] font-semibold tabular text-ink-2 shrink-0">
                #{a.priority}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={
                      "rounded px-1.5 py-0.5 text-[9px] uppercase tracking-[0.16em] font-medium " +
                      (a.tone === "danger"
                        ? "bg-danger/15 text-danger"
                        : a.tone === "amber"
                        ? "bg-amber/15 text-amber"
                        : "bg-accent/15 text-accent")
                    }
                  >
                    {a.type}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-ink-3">
                    {a.sla}
                  </span>
                </div>
                <h3 className="mt-1.5 text-[14px] font-medium text-ink leading-tight">
                  {a.title}
                </h3>
                <p className="mt-1 text-[12px] text-ink-3 leading-snug">{a.sub}</p>
              </div>
              <button className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-ink text-bg px-4 py-2 text-[12px] font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring shrink-0">
                {a.cta}
                <Icon name="arrow" size={11} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ────────────── KPI GRID ────────────── */

function KPIGrid() {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-4">
        <span className="h-px w-6 bg-line" />
        <span>City KPIs · last 24h</span>
        <span className="text-ink-4">·</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot" />
          live stream
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPI label="Q3 collection · live" tone="accent" progress={87}>
          <span className="font-display tabular text-[clamp(28px,3.5vw,36px)] font-medium leading-none text-ink">
            ₹113.<LiveCounter
              base={42}
              maxStep={1}
              intervalMs={9000}
              format={(n) => String(n).padStart(2, "0")}
            />
            <span className="text-[18px]"> Cr</span>
          </span>
          <KPISub sub="of ₹130 Cr target" trend="+₹4.2 Cr today" tone="accent" />
        </KPI>

        <KPI label="Citizens served · live" tone="sage" progress={79}>
          <span className="font-display tabular text-[clamp(28px,3.5vw,36px)] font-medium leading-none text-ink">
            <LiveCounter base={73294} maxStep={4} intervalMs={3500} />
          </span>
          <KPISub sub="this week" trend="+8.1% WoW" tone="sage" />
        </KPI>

        <KPI label="Pending approvals" tone="amber" progress={32}>
          <span className="font-display tabular text-[clamp(28px,3.5vw,36px)] font-medium leading-none text-ink">
            47
          </span>
          <KPISub sub="across 4 depts" trend="5 flagged" tone="amber" />
        </KPI>

        <KPI label="Citizen sentiment" tone="sage" progress={73}>
          <span className="font-display tabular text-[clamp(28px,3.5vw,36px)] font-medium leading-none text-ink">
            +2.4
          </span>
          <KPISub sub="out of ±5" trend="+11 pp WoW" tone="sage" />
        </KPI>
      </div>
    </div>
  );
}

function KPI({
  label,
  tone,
  progress,
  children,
}: {
  label: string;
  tone: "sage" | "amber" | "accent";
  progress: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-[14px] border border-line bg-surface/30 p-5"
    >
      <div className="text-[10px] uppercase tracking-[0.16em] text-ink-3">
        {label}
      </div>
      <div className="mt-3">{children}</div>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-bg/60">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className={
            "h-full rounded-full " +
            (tone === "sage"
              ? "bg-sage"
              : tone === "amber"
              ? "bg-amber"
              : "bg-accent")
          }
        />
      </div>
    </motion.div>
  );
}

function KPISub({
  sub,
  trend,
  tone,
}: {
  sub: string;
  trend: string;
  tone: "sage" | "amber" | "accent";
}) {
  return (
    <>
      <div className="text-[11px] text-ink-3 tabular mt-1">{sub}</div>
      <div
        className={
          "mt-3 text-[11px] tabular " +
          (tone === "amber" ? "text-amber" : tone === "accent" ? "text-accent" : "text-sage")
        }
      >
        {trend}
      </div>
    </>
  );
}

/* ────────────── RISK HEATMAP ────────────── */

const WARDS = [
  { name: "Dharampeth", paid: 73, grievances: 12, score: 87, risk: "low" },
  { name: "Civil Lines", paid: 81, grievances: 8, score: 91, risk: "low" },
  { name: "Sitabuldi", paid: 64, grievances: 87, score: 51, risk: "high" },
  { name: "Lakadganj", paid: 58, grievances: 18, score: 71, risk: "med" },
  { name: "Ambazari", paid: 69, grievances: 11, score: 82, risk: "low" },
  { name: "Wardha Rd", paid: 52, grievances: 27, score: 65, risk: "med" },
  { name: "Mahal", paid: 41, grievances: 24, score: 49, risk: "high" },
  { name: "Manish Nagar", paid: 71, grievances: 9, score: 84, risk: "low" },
  { name: "Mankapur", paid: 67, grievances: 14, score: 79, risk: "low" },
  { name: "Trimurti N.", paid: 75, grievances: 7, score: 89, risk: "low" },
  { name: "Hingna", paid: 49, grievances: 18, score: 62, risk: "med" },
  { name: "Pratap N.", paid: 78, grievances: 10, score: 85, risk: "low" },
];

function RiskHeatmap() {
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
            <Icon name="map" size={10} />
            Ward risk · this week
          </div>
          <h3 className="font-display mt-2 text-[20px] tracking-tight text-ink leading-tight">
            Where to focus
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.14em]">
          <Legend tone="low" label="Low" />
          <Legend tone="med" label="Watch" />
          <Legend tone="high" label="Critical" />
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
        {WARDS.map((w, i) => (
          <motion.button
            key={w.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.025 }}
            className={
              "relative rounded-md border text-left p-3 transition-all hover:scale-[1.02] focus-ring " +
              (w.risk === "high"
                ? "border-danger/40 bg-danger/10 risk-pulse"
                : w.risk === "med"
                ? "border-amber/30 bg-amber/8"
                : "border-line bg-bg/40 hover:bg-bg/60")
            }
          >
            <div className="text-[11px] font-medium text-ink truncate">
              {w.name}
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <span className="font-display tabular text-xl text-ink leading-none">
                {w.score}
              </span>
              <span className="text-[10px] tabular text-ink-3">{w.paid}%</span>
            </div>
            <div className="mt-1.5 text-[9px] uppercase tracking-[0.14em] text-ink-3 tabular">
              {w.grievances} open
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-dashed border-line bg-bg/20 p-3 flex items-start gap-2.5">
        <Icon name="spark" size={11} />
        <p className="text-[11px] text-ink-3 leading-relaxed">
          <span className="text-ink">Sitabuldi & Mahal</span> are pulling the city
          score down. AI suggests a <span className="text-ink">coordinated push</span>:
          revenue officers + sanitation crews + grievance triage. Estimated
          recovery: 4 weeks.
        </p>
      </div>
    </motion.div>
  );
}

function Legend({ tone, label }: { tone: "low" | "med" | "high"; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-ink-3">
      <span
        className={
          "h-2 w-2 rounded-sm " +
          (tone === "high"
            ? "bg-danger"
            : tone === "med"
            ? "bg-amber"
            : "bg-sage")
        }
      />
      {label}
    </span>
  );
}

/* ────────────── ESCALATION STREAM ────────────── */

const ESCALATIONS = [
  {
    title: "Sitabuldi sanitation backlog",
    dept: "Solid Waste",
    age: "3h",
    severity: "critical",
    detail: "44 garbage complaints in 24h, AI links to May 4 storm. Suggests 2 extra crews + 12h push.",
  },
  {
    title: "Trade renewal #TL-9123 SLA risk",
    dept: "Licensing",
    age: "12h",
    severity: "high",
    detail: "AI fraud signal. Officer review pending. Auto-deferred for human approval.",
  },
  {
    title: "Mahal water main complaint surge",
    dept: "Water",
    age: "1d",
    severity: "high",
    detail: "27 complaints. Possible main leak. Inspector dispatched, GIS overlay updated.",
  },
  {
    title: "Building permission #BP-2841",
    dept: "Town Planning",
    age: "18h",
    severity: "med",
    detail: "Low-risk renewal but signed dossier missing. Auto-chased applicant.",
  },
];

function EscalationStream() {
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
            <span className="h-1.5 w-1.5 rounded-full bg-danger live-dot" />
            Escalations · live
          </div>
          <h3 className="font-display mt-2 text-[20px] tracking-tight text-ink leading-tight">
            Reaching your desk
          </h3>
        </div>
        <span className="text-[11px] tabular text-ink-3">
          9 active · 3 critical
        </span>
      </div>

      <div className="space-y-2">
        {ESCALATIONS.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="rounded-md border border-line bg-bg/30 hover:bg-bg/50 transition-colors p-3.5"
          >
            <div className="flex items-center gap-2">
              <span
                className={
                  "h-1.5 w-1.5 rounded-full shrink-0 " +
                  (e.severity === "critical"
                    ? "bg-danger live-dot"
                    : e.severity === "high"
                    ? "bg-amber"
                    : "bg-ink-3")
                }
              />
              <span className="text-[11px] uppercase tracking-[0.14em] text-ink-3">
                {e.dept}
              </span>
              <span className="ml-auto text-[10px] tabular text-ink-4">
                {e.age} ago
              </span>
            </div>
            <h4 className="mt-2 text-[13px] font-medium text-ink leading-tight">
              {e.title}
            </h4>
            <p className="mt-1.5 text-[11px] text-ink-3 leading-snug">
              {e.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ────────────── WORKFLOW TIMELINE ────────────── */

function WorkflowTimeline() {
  const events = [
    { time: "16:42", actor: "AI Agent", desc: "Auto-routed 12 inspections to Zone 4 inspector", tone: "sage" },
    { time: "16:38", actor: "P. Deshmukh", desc: "Approved trade renewal #TL-9117", tone: "ink" },
    { time: "16:21", actor: "AI Agent", desc: "Issued reminders to 142 ward 22 defaulters", tone: "sage" },
    { time: "16:15", actor: "S. Bhandari", desc: "Locked Q3 reconciliation batch · ₹4.2 Cr verified", tone: "ink" },
    { time: "15:54", actor: "AI Agent", desc: "Flagged 5 trade applications for fraud signals", tone: "amber" },
    { time: "15:42", actor: "V. Shinde", desc: "Closed 4 inspections · evidence uploaded", tone: "ink" },
  ];
  return (
    <div className="mt-8">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-ink-3">
            <span className="h-px w-6 bg-line" />
            <span>Operations log · last hour</span>
          </div>
          <h2 className="font-display mt-3 text-[clamp(22px,3vw,32px)] font-medium tracking-tight text-ink leading-[1.05]">
            What just happened.
          </h2>
        </div>
        <span className="text-[11px] tabular text-ink-3">
          184 events · all audited
        </span>
      </div>

      <div className="rounded-[14px] border border-line bg-surface/20 overflow-hidden">
        {events.map((e, i) => (
          <div
            key={i}
            className={
              "flex items-center gap-4 px-5 py-3 hover:bg-bg/40 transition-colors " +
              (i < events.length - 1 ? "border-b border-line/40" : "")
            }
          >
            <span className="text-[11px] tabular text-ink-3 shrink-0 w-12">
              {e.time}
            </span>
            <span
              className={
                "h-1.5 w-1.5 rounded-full shrink-0 " +
                (e.tone === "sage"
                  ? "bg-sage"
                  : e.tone === "amber"
                  ? "bg-amber"
                  : "bg-accent")
              }
            />
            <span className="text-[11px] uppercase tracking-[0.14em] text-ink-3 shrink-0 w-24 truncate">
              {e.actor}
            </span>
            <span className="flex-1 text-[12px] text-ink-2 truncate">
              {e.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
