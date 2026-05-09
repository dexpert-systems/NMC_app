"use client";

import { motion } from "framer-motion";
import { ErpShell } from "@/components/erp/ErpShell";
import { Icon } from "@/components/Icon";

const HEAT = [
  { ward: "Sitabuldi", garbage: 44, drainage: 28, water: 9, light: 6, total: 87 },
  { ward: "Mahal", garbage: 12, drainage: 9, water: 27, light: 4, total: 52 },
  { ward: "Wardha Rd", garbage: 8, drainage: 6, water: 5, light: 8, total: 27 },
  { ward: "Lakadganj", garbage: 6, drainage: 4, water: 4, light: 4, total: 18 },
  { ward: "Civil Lines", garbage: 3, drainage: 2, water: 2, light: 1, total: 8 },
  { ward: "Dharampeth", garbage: 4, drainage: 3, water: 3, light: 2, total: 12 },
];

const ESCALATIONS = [
  {
    id: "GR-9921",
    title: "Sitabuldi sanitation backlog",
    ward: "Sitabuldi",
    age: "3h",
    severity: "critical",
    summary: "Cluster of 44 garbage complaints in 24h. AI links to May 4 storm — drainage backups → garbage backlog. Zone 2 head not yet briefed.",
    suggested: "Dispatch 2 sanitation crews + brief Zone 2 head + open Mahal coordination",
  },
  {
    id: "GR-9912",
    title: "Mahal water main complaint surge",
    ward: "Mahal",
    age: "1d",
    severity: "high",
    summary: "27 water complaints in 18h. Possible main leak. GIS overlay updated. Field inspector dispatched for sample testing.",
    suggested: "Authorise emergency repair contract · 6h response window",
  },
  {
    id: "GR-9908",
    title: "Wardha Rd traffic-light cluster",
    ward: "Wardha Rd",
    age: "8h",
    severity: "high",
    summary: "8 streetlight complaints along the BRT corridor. Pattern suggests a cable fault rather than individual failures.",
    suggested: "Field test cable continuity · 90 min · Electrical Zone 4",
  },
  {
    id: "GR-9899",
    title: "Lakadganj noise complaint pattern",
    ward: "Lakadganj",
    age: "2d",
    severity: "med",
    summary: "Repeat complaints from 3 households. Source identified — late-night construction. Notice issued, awaiting compliance.",
    suggested: "Compliance check · field officer · within 48h",
  },
];

export default function GrievancesPage() {
  return (
    <ErpShell>
      <div className="px-5 lg:px-8 pt-6 pb-12 max-w-[1400px] mx-auto">
        <Hero />
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-4">
          <Heatmap />
          <CategoryTrend />
        </div>
        <EscalationList />
      </div>
    </ErpShell>
  );
}

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-[18px] border border-line bg-surface/40 p-6 sm:p-8"
    >
      <div
        aria-hidden
        className="absolute -top-1/2 -right-1/4 h-[180%] w-[60%] rounded-full opacity-20 blur-3xl bg-gradient-to-br from-danger/40 via-amber/15 to-transparent"
      />
      <div className="relative flex items-start justify-between flex-wrap gap-5">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3">
            <span className="h-px w-8 bg-line" />
            <span>Grievance command · governance</span>
          </div>
          <h1 className="font-display mt-4 text-[clamp(32px,5vw,56px)] font-medium leading-[0.98] tracking-tightest text-ink">
            204 active.
            <br />
            <span className="italic font-light text-ink-2">9 escalated to your desk.</span>
          </h1>
          <p className="mt-5 text-[14px] sm:text-[15px] text-ink-3 max-w-2xl leading-relaxed">
            AI categorised every complaint, clustered them by pattern, and routed only what needs a human. <span className="text-ink">Sitabuldi & Mahal</span> account for 68% of today&rsquo;s open issues. One tap brief is ready.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Median resolution
          </div>
          <div className="font-display tabular text-5xl font-medium text-ink leading-none">
            42 min
          </div>
          <div className="text-[11px] text-ink-3">
            <span className="text-sage">▼ 9 min</span> · vs last month
          </div>
        </div>
      </div>

      <div className="relative mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { k: "Active", v: "204", tone: "amber" },
          { k: "Escalated", v: "9", tone: "danger" },
          { k: "Auto-resolved today", v: "138", tone: "sage" },
          { k: "Sentiment", v: "+2.4", tone: "sage" },
        ].map((s) => (
          <div key={s.k} className="rounded-md border border-line bg-bg/40 px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">{s.k}</div>
            <div className={"mt-1.5 font-display tabular text-2xl leading-none " + (s.tone === "danger" ? "text-danger" : s.tone === "amber" ? "text-amber" : "text-sage")}>
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Heatmap() {
  const max = Math.max(...HEAT.map((h) => h.total));
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55 }}
      className="rounded-[14px] border border-line bg-surface/30 p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
            <Icon name="map" size={10} />
            Ward heat · last 24h
          </div>
          <h3 className="font-display mt-1 text-[20px] tracking-tight text-ink leading-tight">
            Where the issues are
          </h3>
        </div>
        <span className="text-[11px] tabular text-ink-3">{HEAT.reduce((s, h) => s + h.total, 0)} total</span>
      </div>

      {/* Stacked bar per ward */}
      <div className="space-y-3">
        {HEAT.map((h, i) => {
          const pct = (h.total / max) * 100;
          return (
            <motion.div
              key={h.ward}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="grid grid-cols-[120px_1fr_60px] items-center gap-3"
            >
              <span className="text-[12px] text-ink-2 truncate">{h.ward}</span>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-bg/60" style={{ width: `${pct}%`, minWidth: "10%" }}>
                <span style={{ flexGrow: h.garbage }} className="bg-danger" />
                <span style={{ flexGrow: h.drainage }} className="bg-amber" />
                <span style={{ flexGrow: h.water }} className="bg-heritage" />
                <span style={{ flexGrow: h.light }} className="bg-accent" />
              </div>
              <span className="text-[11px] tabular text-ink text-right">{h.total}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-4 text-[10px] uppercase tracking-[0.14em] text-ink-3">
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-danger" /> Garbage</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-amber" /> Drainage</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-heritage" /> Water</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-accent" /> Streetlight</span>
      </div>
    </motion.div>
  );
}

function CategoryTrend() {
  // Mock 14-day series per category
  const SERIES: { name: string; color: string; points: number[] }[] = [
    { name: "Garbage", color: "#B0331A", points: [12, 14, 11, 16, 18, 22, 20, 24, 28, 36, 41, 44, 47, 44] },
    { name: "Drainage", color: "#C97A0E", points: [8, 10, 11, 9, 12, 14, 16, 18, 22, 26, 28, 32, 30, 28] },
    { name: "Water", color: "#1A3A5C", points: [10, 9, 11, 12, 14, 13, 15, 18, 22, 24, 26, 28, 27, 27] },
  ];
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
            <Icon name="data" size={10} />
            Category trend · 14 days
          </div>
          <h3 className="font-display mt-1 text-[20px] tracking-tight text-ink leading-tight">
            What&rsquo;s rising
          </h3>
        </div>
      </div>
      <div className="relative h-44">
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
          {SERIES.map((s) => {
            const max = 50;
            const path = s.points
              .map((v, i) => {
                const x = (i / (s.points.length - 1)) * 100;
                const y = 50 - (v / max) * 50;
                return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
              })
              .join(" ");
            return (
              <path
                key={s.name}
                d={path}
                stroke={s.color}
                strokeWidth="0.8"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
      </div>
      <div className="mt-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.14em] text-ink-3">
        {SERIES.map((s) => (
          <span key={s.name} className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-ink-3 leading-relaxed">
        Garbage and drainage spiked together post-storm. Water has its own trajectory — look at Mahal main first.
      </p>
    </motion.div>
  );
}

function EscalationList() {
  return (
    <div className="mt-8">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-ink-3">
            <span className="h-px w-6 bg-line" />
            <span>Escalations · your desk</span>
          </div>
          <h2 className="font-display mt-3 text-[clamp(22px,3vw,32px)] font-medium tracking-tight text-ink leading-[1.05]">
            9 cases need a decision.
          </h2>
        </div>
      </div>

      <div className="space-y-2.5">
        {ESCALATIONS.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-[14px] border border-line bg-surface/30 hover:bg-surface/50 transition-colors p-5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_220px] gap-5 items-start">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink-3">
                  <span
                    className={
                      "h-1.5 w-1.5 rounded-full " +
                      (e.severity === "critical"
                        ? "bg-danger live-dot"
                        : e.severity === "high"
                        ? "bg-amber"
                        : "bg-ink-3")
                    }
                  />
                  <span>{e.severity.toUpperCase()}</span>
                  <span className="text-ink-4">·</span>
                  <span>{e.ward}</span>
                  <span className="text-ink-4">·</span>
                  <span className="tabular">{e.age} ago</span>
                  <span className="text-ink-4">·</span>
                  <span className="tabular">#{e.id}</span>
                </div>
                <h3 className="font-display mt-2 text-[18px] tracking-tight text-ink leading-tight">
                  {e.title}
                </h3>
                <p className="mt-2 text-[12px] text-ink-3 leading-relaxed">{e.summary}</p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">
                  AI suggested action
                </div>
                <p className="mt-1.5 text-[12px] text-ink-2 leading-relaxed">{e.suggested}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-ink text-bg px-4 py-2.5 text-[12px] font-medium hover:scale-[1.01] focus-ring">
                  Approve action
                  <Icon name="arrow" size={11} />
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-bg/40 hover:bg-bg/60 border border-line px-4 py-2.5 text-[12px] text-ink-2 hover:text-ink focus-ring">
                  Open file
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
