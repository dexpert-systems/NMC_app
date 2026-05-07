"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  value: number | string;
  unit?: string;
  trend?: string;
  spark?: number[];
  format?: "number" | "currency" | "percent" | "currency-compact" | "number-compact";
};

export function MetricTile({
  label,
  value,
  unit,
  trend,
  spark,
  format = "number",
}: Props) {
  return (
    <div className="surface-card hairline rounded-[20px] p-5 transition-shadow hover:shadow-card overflow-hidden">
      <div className="flex items-start justify-between gap-2">
        <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3 truncate">
          {label}
        </div>
        {trend && (
          <span className="text-[10px] tabular text-sage font-medium shrink-0">{trend}</span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5 min-w-0">
        <div className="font-display tabular text-[clamp(24px,3.6vw,36px)] font-medium leading-none tracking-tight text-ink truncate">
          {typeof value === "number" ? (
            <CountUp to={value} format={format} />
          ) : (
            value
          )}
        </div>
        {unit && <span className="text-sm text-ink-3 shrink-0">{unit}</span>}
      </div>
      {spark && <Sparkline data={spark} />}
    </div>
  );
}

function CountUp({
  to,
  format,
}: {
  to: number;
  format: "number" | "currency" | "percent" | "currency-compact" | "number-compact";
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);

  const formatted =
    format === "currency"
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(Math.round(n))
      : format === "currency-compact"
      ? formatCompactINR(n)
      : format === "number-compact"
      ? formatCompactNumber(n)
      : format === "percent"
      ? `${Math.round(n)}%`
      : new Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 0,
        }).format(Math.round(n));

  return <span ref={ref}>{formatted}</span>;
}

function formatCompactINR(n: number): string {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(n >= 1e8 ? 0 : 1)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  if (n >= 1e3) return `₹${(n / 1e3).toFixed(0)} K`;
  return `₹${Math.round(n)}`;
}

function formatCompactNumber(n: number): string {
  if (n >= 1e7) return `${(n / 1e7).toFixed(n >= 1e8 ? 0 : 1)} Cr`;
  if (n >= 1e5) return `${(n / 1e5).toFixed(1)} L`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)} K`;
  return `${Math.round(n)}`;
}

function Sparkline({ data }: { data: number[] }) {
  const w = 120;
  const h = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const path = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="mt-3 text-accent"
    >
      <path
        d={`${path} L${w},${h} L0,${h} Z`}
        fill="currentColor"
        fillOpacity="0.10"
      />
      <path d={path} stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
