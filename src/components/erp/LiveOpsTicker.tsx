"use client";

import { useEffect, useState } from "react";

const EVENTS = [
  "₹4,820 received · Plot 47 Dharampeth · UPI",
  "Pothole reported · Wardha Rd · auto-routed to Roads",
  "Trade renewal #TL-9117 approved by P. Deshmukh",
  "Field inspection complete · Sitabuldi Streetlight #SL-2099",
  "₹62,400 received · Sitabuldi commercial · Card",
  "AI flagged 3 trade applications · suspicious PAN",
  "Drainage SLA cleared · Lakadganj #DR-8810",
  "Survey complete · 4 new properties · Ward 14",
  "Birth certificate issued · NMC-BR-2026-04823",
  "₹1,84,200 received · Civil Lines · UPI batch",
];

export function LiveOpsTicker() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % EVENTS.length);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  // Show 3 most recent
  const visible = [0, 1, 2].map((o) => EVENTS[(idx + o) % EVENTS.length]);

  return (
    <div className="sticky bottom-0 z-20 backdrop-blur-xl bg-bg/80 border-t border-line">
      <div className="px-5 lg:px-6 py-2 flex items-center gap-3 text-[11px] tabular text-ink-3 overflow-hidden">
        <span className="inline-flex items-center gap-1.5 shrink-0 text-[10px] uppercase tracking-[0.16em]">
          <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot" />
          Live ops
        </span>
        <span className="text-ink-4 shrink-0">·</span>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex gap-8 whitespace-nowrap animate-[ticker_30s_linear_infinite]">
            {visible.concat(visible).map((e, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-ink-4" />
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
