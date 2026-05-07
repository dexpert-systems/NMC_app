"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Alert = {
  level: "info" | "warn" | "critical";
  text: string;
  href: string;
};

const ALERTS: Alert[] = [
  {
    level: "warn",
    text: "Water shutdown in Dharampeth & Dhantoli — 6 to 9 AM tomorrow",
    href: "/alerts",
  },
  {
    level: "info",
    text: "Property tax rebate window closes May 31",
    href: "/property",
  },
  {
    level: "info",
    text: "Pothole survey live in your ward — report issues with one tap",
    href: "/report",
  },
];

export function AlertStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative z-10 mx-5 sm:mx-8 lg:mx-12 mb-2"
    >
      <div className="glass rounded-full px-3 py-1.5 flex items-center gap-3 overflow-hidden">
        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-amber/10 text-amber px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-amber live-dot" />
          Live
        </span>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div
            className="flex gap-12 whitespace-nowrap text-[12px] sm:text-[13px] text-ink-2"
            style={{
              animation: "alert-marquee 36s linear infinite",
            }}
          >
            {[...ALERTS, ...ALERTS].map((a, i) => (
              <Link
                key={i}
                href={a.href}
                className="inline-flex items-center gap-2 hover:text-ink transition-colors focus-ring rounded"
              >
                <span
                  className={
                    "h-1 w-1 rounded-full " +
                    (a.level === "critical"
                      ? "bg-danger"
                      : a.level === "warn"
                      ? "bg-amber"
                      : "bg-sage")
                  }
                />
                {a.text}
                <span className="text-ink-4">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes alert-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  );
}
