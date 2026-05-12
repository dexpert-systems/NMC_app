"use client";

import { motion } from "framer-motion";

type Tone = "sage" | "amber" | "danger" | "accent" | "heritage" | "ink";

const TONE_BG: Record<Tone, string> = {
  sage: "bg-sage",
  amber: "bg-amber",
  danger: "bg-danger",
  accent: "bg-accent",
  heritage: "bg-heritage",
  ink: "bg-ink",
};

const TONE_TEXT: Record<Tone, string> = {
  sage: "text-sage",
  amber: "text-amber",
  danger: "text-danger",
  accent: "text-accent",
  heritage: "text-heritage",
  ink: "text-ink",
};

/* ───────────── Mini bar chart ───────────── */

type BarItem = { label: string; value: number; tone?: Tone; sub?: string };

export function MiniBars({
  data,
  unit = "",
  max,
}: {
  data: BarItem[];
  unit?: string;
  max?: number;
}) {
  const m = max ?? Math.max(...data.map((d) => d.value));
  return (
    <div className="mt-3 rounded-md border border-line bg-surface/70 p-3">
      <div className="space-y-2">
        {data.map((d, i) => {
          const pct = (d.value / m) * 100;
          const tone = d.tone ?? "accent";
          return (
            <div
              key={d.label}
              className="grid grid-cols-[78px_1fr_48px] items-center gap-2 text-[11px]"
            >
              <span className="text-ink-2 truncate">{d.label}</span>
              <div className="h-2 rounded-full bg-bg-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className={"h-full rounded-full " + TONE_BG[tone]}
                />
              </div>
              <span className="text-right tabular text-ink font-medium">
                {d.value.toLocaleString("en-IN")}
                {unit && <span className="text-ink-3 ml-0.5">{unit}</span>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────── Sparkline + metric ───────────── */

export function MiniSparkline({
  data,
  target,
  unit,
  label,
  current,
  tone = "accent",
}: {
  data: number[];
  target?: number;
  unit?: string;
  label?: string;
  current?: number | string;
  tone?: Tone;
}) {
  const max = Math.max(...data, target ?? -Infinity);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const path = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 50 - ((v - min) / range) * 45;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  const lastPt = {
    x: 100,
    y: 50 - ((data[data.length - 1] - min) / range) * 45,
  };
  const targetY = typeof target === "number" ? 50 - ((target - min) / range) * 45 : null;
  const stroke =
    tone === "sage" ? "#1F9D55" :
    tone === "amber" ? "#C97A0E" :
    tone === "danger" ? "#B0331A" :
    tone === "heritage" ? "#1A3A5C" :
    "#E25822";

  return (
    <div className="mt-3 rounded-md border border-line bg-surface/70 p-3">
      <div className="flex items-baseline justify-between mb-2">
        <div>
          {label && (
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">
              {label}
            </div>
          )}
          {current !== undefined && (
            <div className={"font-display tabular text-xl leading-none mt-0.5 " + TONE_TEXT[tone === "ink" ? "ink" : "ink"]}>
              {current}
              {unit && <span className="text-[11px] text-ink-3 ml-1">{unit}</span>}
            </div>
          )}
        </div>
        {typeof target === "number" && (
          <div className="text-right text-[10px] uppercase tracking-[0.14em] text-ink-3">
            <div>target</div>
            <div className="tabular text-ink-2 mt-0.5">
              {target.toLocaleString("en-IN")}
              {unit && <span className="text-ink-3 ml-0.5">{unit}</span>}
            </div>
          </div>
        )}
      </div>
      <div className="relative h-12">
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
          {targetY !== null && (
            <line
              x1="0" y1={targetY} x2="100" y2={targetY}
              stroke="rgba(11,12,14,0.18)"
              strokeWidth="0.4"
              strokeDasharray="2,2"
            />
          )}
          <defs>
            <linearGradient id={`spark-${tone}-${stroke.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.30" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L 100 50 L 0 50 Z`} fill={`url(#spark-${tone}-${stroke.slice(1)})`} />
          <path d={path} stroke={stroke} strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        <span
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-bg shadow-[0_0_8px_currentColor]"
          style={{
            left: `${lastPt.x}%`,
            top: `${lastPt.y}%`,
            background: stroke,
            color: stroke,
          }}
        />
      </div>
    </div>
  );
}

/* ───────────── Metric card ───────────── */

export function MiniMetric({
  value,
  label,
  trend,
  trendTone = "sage",
  sub,
}: {
  value: string;
  label: string;
  trend?: string;
  trendTone?: Tone;
  sub?: string;
}) {
  return (
    <div className="mt-3 rounded-md border border-line bg-surface/70 p-3 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3 truncate">
          {label}
        </div>
        <div className="font-display tabular text-2xl text-ink leading-none mt-1.5">
          {value}
        </div>
        {sub && <div className="text-[10px] text-ink-3 mt-1">{sub}</div>}
      </div>
      {trend && (
        <div className={"text-[10px] uppercase tracking-[0.14em] " + TONE_TEXT[trendTone]}>
          {trend}
        </div>
      )}
    </div>
  );
}

/* ───────────── Mini list ───────────── */

export function MiniList({
  items,
}: {
  items: { label: string; value?: string; sub?: string; tone?: Tone }[];
}) {
  return (
    <div className="mt-3 rounded-md border border-line bg-surface/70 overflow-hidden">
      {items.map((it, i) => (
        <div
          key={it.label + i}
          className={
            "flex items-center gap-2.5 px-3 py-2 " +
            (i < items.length - 1 ? "border-b border-line/60" : "")
          }
        >
          <span
            className={
              "h-1.5 w-1.5 rounded-full shrink-0 " +
              TONE_BG[it.tone ?? "ink"]
            }
          />
          <div className="flex-1 min-w-0">
            <div className="text-[12px] text-ink truncate">{it.label}</div>
            {it.sub && (
              <div className="text-[10px] text-ink-3 mt-0.5 truncate">{it.sub}</div>
            )}
          </div>
          {it.value && (
            <div className="text-[11px] tabular text-ink-2 shrink-0">{it.value}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ───────────── Mini table ───────────── */

export function MiniTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="mt-3 rounded-md border border-line bg-surface/70 overflow-hidden">
      <div
        className="grid border-b border-line/60 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-ink-3 gap-2"
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((c, i) => (
          <span key={c} className={i === columns.length - 1 ? "text-right" : ""}>
            {c}
          </span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className={
            "grid px-3 py-2 text-[11px] gap-2 " +
            (i < rows.length - 1 ? "border-b border-line/40" : "")
          }
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
        >
          {row.map((cell, j) => (
            <span
              key={j}
              className={
                "truncate tabular " +
                (j === columns.length - 1
                  ? "text-right text-ink font-medium"
                  : j === 0
                  ? "text-ink"
                  : "text-ink-3")
              }
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ───────────── Donut score ───────────── */

export function MiniDonut({
  pct,
  label,
  caption,
  tone = "accent",
}: {
  pct: number;
  label: string;
  caption?: string;
  tone?: Tone;
}) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const filled = (pct / 100) * c;
  const stroke =
    tone === "sage" ? "#1F9D55" :
    tone === "amber" ? "#C97A0E" :
    tone === "danger" ? "#B0331A" :
    "#E25822";

  return (
    <div className="mt-3 rounded-md border border-line bg-surface/70 p-3 flex items-center gap-3">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 70 70" className="w-full h-full -rotate-90">
          <circle
            cx="35" cy="35" r={r}
            stroke="rgba(11,12,14,0.08)"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx="35" cy="35" r={r}
            stroke={stroke}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            initial={{ strokeDasharray: `0 ${c}` }}
            animate={{ strokeDasharray: `${filled} ${c}` }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display tabular text-sm font-medium text-ink">
            {pct}%
          </span>
        </div>
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-medium text-ink leading-tight">{label}</div>
        {caption && (
          <div className="text-[10px] text-ink-3 mt-1 leading-snug">{caption}</div>
        )}
      </div>
    </div>
  );
}
