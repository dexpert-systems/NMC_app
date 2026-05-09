"use client";

import { motion } from "framer-motion";
import { ErpShell } from "@/components/erp/ErpShell";
import { Icon } from "@/components/Icon";

type Inspection = {
  id: string;
  type: "Pothole" | "Streetlight" | "Drainage" | "Garbage" | "Tree" | "Water leak";
  address: string;
  ward: string;
  sla: string;
  slaTone: "sage" | "amber" | "danger";
  pos: { x: number; y: number };
  priority: number;
};

const INSPECTIONS: Inspection[] = [
  { id: "DR-8821", type: "Drainage", address: "Mahal Rd · Plot 3", ward: "Mahal", sla: "in 4h", slaTone: "danger", pos: { x: 22, y: 38 }, priority: 1 },
  { id: "PT-9301", type: "Pothole", address: "Wardha Rd · KM 14", ward: "Wardha Rd", sla: "in 6h", slaTone: "danger", pos: { x: 30, y: 70 }, priority: 2 },
  { id: "SL-2099", type: "Streetlight", address: "Sitabuldi Mkt", ward: "Sitabuldi", sla: "in 9h", slaTone: "amber", pos: { x: 55, y: 30 }, priority: 3 },
  { id: "GR-4422", type: "Garbage", address: "Lakadganj Block A", ward: "Lakadganj", sla: "tomorrow", slaTone: "sage", pos: { x: 75, y: 55 }, priority: 4 },
  { id: "TR-1108", type: "Tree", address: "Civil Lines Park", ward: "Civil Lines", sla: "tomorrow", slaTone: "sage", pos: { x: 65, y: 22 }, priority: 5 },
  { id: "WL-2231", type: "Water leak", address: "Dharampeth · Plot 12", ward: "Dharampeth", sla: "in 11h", slaTone: "amber", pos: { x: 40, y: 50 }, priority: 6 },
  { id: "PT-9341", type: "Pothole", address: "Trimurti Nagar Rd", ward: "Trimurti", sla: "tomorrow", slaTone: "sage", pos: { x: 50, y: 78 }, priority: 7 },
  { id: "DR-8829", type: "Drainage", address: "Manish Nagar Cross", ward: "Manish N.", sla: "tomorrow", slaTone: "sage", pos: { x: 80, y: 35 }, priority: 8 },
];

export default function InspectionsPage() {
  return (
    <ErpShell>
      <div className="px-5 lg:px-8 pt-6 pb-12 max-w-[1400px] mx-auto">
        <Hero />
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-4">
          <RouteMap />
          <Queue />
        </div>
        <SLAStrip />
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
      className="relative overflow-hidden rounded-[18px] border border-line bg-surface/70 p-6 sm:p-8"
    >
      <div
        aria-hidden
        className="absolute -top-1/2 -right-1/4 h-[180%] w-[60%] rounded-full opacity-20 blur-3xl bg-gradient-to-br from-amber/40 via-accent/15 to-transparent"
      />
      <div className="relative flex items-start justify-between flex-wrap gap-5">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3">
            <span className="h-px w-8 bg-line" />
            <span>Field inspector · Vikram</span>
          </div>
          <h1 className="font-display mt-4 text-[clamp(32px,5vw,56px)] font-medium leading-[0.98] tracking-tightest text-ink">
            12 stops today.
            <br />
            <span className="italic font-light text-ink-2">Optimised, in your pocket.</span>
          </h1>
          <p className="mt-5 text-[14px] sm:text-[15px] text-ink-3 max-w-2xl leading-relaxed">
            AI re-ordered today&rsquo;s inspections to <span className="text-ink">save 22 minutes</span> and avoid the Wardha Rd 11–12 jam. <span className="text-ink">3 SLAs</span> are at risk — pinned to top.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Today
          </div>
          <div className="font-display tabular text-5xl font-medium text-ink leading-none">
            8 → 12
          </div>
          <div className="text-[11px] text-ink-3">closed → assigned</div>
        </div>
      </div>

      <div className="relative mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { k: "Route distance", v: "31.4 km", trend: "−4.6 km" },
          { k: "Est. time saved", v: "22 min", trend: "AI route" },
          { k: "Photo evidence", v: "96%", trend: "first-pass" },
          { k: "Closed this week", v: "47", trend: "+8" },
        ].map((s) => (
          <div key={s.k} className="rounded-md border border-line bg-bg-2/70 px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">{s.k}</div>
            <div className="mt-1.5 font-display tabular text-2xl text-ink leading-none">{s.v}</div>
            <div className="mt-1.5 text-[11px] text-sage tabular">{s.trend}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RouteMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55 }}
      className="rounded-[14px] border border-line bg-surface/50 overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
            <Icon name="map" size={10} />
            Today&rsquo;s route · Zone 4
          </div>
          <h3 className="font-display mt-1 text-[20px] tracking-tight text-ink leading-tight">
            8 stops mapped, in optimal order
          </h3>
        </div>
        <button className="text-[11px] uppercase tracking-[0.14em] text-accent hover:underline focus-ring rounded">
          Open in maps app →
        </button>
      </div>

      <div className="relative h-[420px] sm:h-[480px] bg-gradient-to-br from-[#0E1219] via-[#0B0E14] to-[#06080C]">
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden>
          <defs>
            <pattern id="route-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#route-grid)" />
        </svg>
        {/* Roads (mock) */}
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0 40 Q30 35, 60 50 T100 45" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" fill="none" />
          <path d="M0 60 Q40 55, 80 65 T100 60" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" fill="none" />
          <path d="M40 0 Q45 35, 50 80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" fill="none" />
        </svg>
        {/* Route line */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path
            d={
              "M " +
              INSPECTIONS.map((p) => `${p.pos.x} ${p.pos.y}`).join(" L ")
            }
            fill="none"
            stroke="#E25822"
            strokeWidth="0.5"
            strokeDasharray="1.5,1"
            opacity="0.9"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* Pins */}
        {INSPECTIONS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 + i * 0.05 }}
            style={{ left: `${p.pos.x}%`, top: `${p.pos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
          >
            <span className="relative grid place-items-center">
              <span
                className={
                  "absolute h-7 w-7 rounded-full opacity-30 animate-ping " +
                  (p.slaTone === "danger" ? "bg-danger" : p.slaTone === "amber" ? "bg-amber" : "bg-sage")
                }
                style={{ animationDuration: "2.4s" }}
              />
              <span
                className={
                  "relative grid place-items-center h-6 w-6 rounded-full text-[9px] font-bold ring-2 ring-bg/60 " +
                  (p.slaTone === "danger"
                    ? "bg-danger text-white"
                    : p.slaTone === "amber"
                    ? "bg-amber text-white"
                    : "bg-sage text-white")
                }
              >
                {p.priority}
              </span>
            </span>
          </motion.div>
        ))}
        {/* Active pin tooltip */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[320px] rounded-md border border-line bg-bg/85 backdrop-blur-md p-3.5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
            <span className="h-1.5 w-1.5 rounded-full bg-danger live-dot" />
            Stop #1 · SLA in 4h
          </div>
          <div className="font-display mt-2 text-[15px] text-ink leading-tight">
            Mahal Rd · Plot 3
          </div>
          <div className="text-[11px] text-ink-3 mt-1">
            Drainage #DR-8821 · reported 22h ago
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md bg-ink text-bg px-3 py-1.5 text-[11px] font-medium">
              Start →
            </button>
            <button className="text-[11px] text-ink-3 hover:text-ink rounded focus-ring">
              Reassign
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Queue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="rounded-[14px] border border-line bg-surface/50 overflow-hidden flex flex-col h-fit"
    >
      <div className="px-5 py-4 border-b border-line/60">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
          <Icon name="services" size={10} />
          Queue · ranked
        </div>
        <h3 className="font-display mt-1 text-[20px] tracking-tight text-ink leading-tight">
          Today, in order
        </h3>
      </div>
      <div className="overflow-y-auto max-h-[480px]">
        {INSPECTIONS.map((p, i) => (
          <div
            key={p.id}
            className={
              "flex items-center gap-3 px-4 py-3 hover:bg-bg-2/70 transition-colors cursor-pointer " +
              (i < INSPECTIONS.length - 1 ? "border-b border-line/40" : "")
            }
          >
            <span
              className={
                "grid place-items-center h-7 w-7 rounded text-[10px] font-bold tabular shrink-0 " +
                (p.slaTone === "danger"
                  ? "bg-danger/15 text-danger"
                  : p.slaTone === "amber"
                  ? "bg-amber/15 text-amber"
                  : "bg-sage/15 text-sage")
              }
            >
              {p.priority}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-ink truncate">
                {p.type} · {p.address}
              </div>
              <div className="text-[10px] text-ink-3 mt-0.5 tabular">
                #{p.id} · {p.ward}
              </div>
            </div>
            <span
              className={
                "text-[10px] uppercase tracking-[0.14em] tabular shrink-0 " +
                (p.slaTone === "danger"
                  ? "text-danger"
                  : p.slaTone === "amber"
                  ? "text-amber"
                  : "text-sage")
              }
            >
              {p.sla}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SLAStrip() {
  return (
    <div className="mt-8 rounded-[14px] border border-line bg-surface/50 p-5 sm:p-6">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-4">
        <span className="h-1.5 w-1.5 rounded-full bg-danger live-dot" />
        SLA · breach radar
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {INSPECTIONS.filter((i) => i.slaTone !== "sage").map((p) => (
          <div
            key={p.id}
            className={
              "rounded-md border p-4 " +
              (p.slaTone === "danger"
                ? "border-danger/40 bg-danger/8"
                : "border-amber/40 bg-amber/8")
            }
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em]">
              <span className={p.slaTone === "danger" ? "text-danger" : "text-amber"}>
                Breach {p.sla}
              </span>
              <span className="text-ink-3">#{p.id}</span>
            </div>
            <div className="font-display mt-2 text-[15px] text-ink leading-tight">
              {p.type} · {p.address}
            </div>
            <button className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-accent hover:underline focus-ring rounded">
              Open file →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
