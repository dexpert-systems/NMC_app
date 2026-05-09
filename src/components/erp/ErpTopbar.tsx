"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ROLES, type Role, clearCurrentRole } from "@/lib/erp";
import { Icon } from "@/components/Icon";
import { LiveCounter } from "./LiveCounter";

type Props = {
  role: Role;
  onCommandOpen: () => void;
  insightsOpen: boolean;
  onInsightsToggle: () => void;
};

export function ErpTopbar({ role, onCommandOpen, insightsOpen, onInsightsToggle }: Props) {
  const [time, setTime] = useState("");
  const profile = ROLES[role];

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-bg/80 border-b border-line">
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 lg:px-6 py-3">
        {/* Workspace pill (mobile shows logo) */}
        <div className="lg:hidden flex items-center gap-2">
          <span className="grid place-items-center h-8 w-8 rounded-md bg-ink text-bg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 3 L20 8 L20 16 L12 21 L4 16 L4 8 Z" stroke="#E25822" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="2" fill="#E25822" />
            </svg>
          </span>
        </div>

        {/* Status / breadcrumb */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-3 shrink-0">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot" />
            LIVE
          </span>
          <span className="text-ink-4">·</span>
          <span className="tabular">{time} IST</span>
          <span className="text-ink-4">·</span>
          <span className="inline-flex items-center gap-1.5">
            <LiveCounter base={4218} maxStep={5} intervalMs={5000} suffix=" txns" />
          </span>
        </div>

        {/* Command bar — center */}
        <button
          type="button"
          onClick={onCommandOpen}
          className="flex-1 min-w-0 max-w-2xl mx-auto flex items-center gap-3 rounded-md bg-surface/70 hover:bg-surface border border-line hover:border-line/80 px-3 sm:px-3.5 py-2 text-[13px] text-ink-3 transition-colors focus-ring"
        >
          <Icon name="spark" size={13} />
          <span className="flex-1 text-left text-ink-3 truncate">
            Ask the system, run a query, jump anywhere…
          </span>
          <kbd className="hidden sm:inline rounded bg-bg/60 border border-line px-1.5 py-0.5 text-[10px] font-medium tabular text-ink-3">
            ⌘K
          </kbd>
        </button>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onInsightsToggle}
            className="hidden xl:inline-flex items-center gap-1.5 rounded-md border border-line bg-surface/70 hover:bg-surface px-2.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-3 hover:text-ink transition-colors focus-ring"
            aria-label="Toggle insights"
          >
            <Icon name="data" size={12} />
            <span>Insights</span>
            <span className={"ml-1 h-1.5 w-1.5 rounded-full " + (insightsOpen ? "bg-accent" : "bg-ink-4")} />
          </button>

          <button
            type="button"
            className="relative grid place-items-center h-9 w-9 rounded-md border border-line bg-surface/70 hover:bg-surface text-ink-2 hover:text-ink transition-colors focus-ring shrink-0"
            aria-label="Notifications"
          >
            <Icon name="alerts" size={14} />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>

          <div className="relative group shrink-0">
            <button
              type="button"
              className="flex items-center gap-2 rounded-md border border-line bg-surface/70 hover:bg-surface pl-1 pr-1 lg:pr-2.5 py-1 transition-colors focus-ring"
            >
              <span className="grid place-items-center h-7 w-7 rounded bg-accent/15 text-accent text-[10px] font-semibold shrink-0">
                {profile.initials}
              </span>
              <span className="hidden lg:inline max-w-[140px] xl:max-w-[200px] text-[12px] text-ink-2 tracking-tight truncate">
                {profile.shortName}
              </span>
            </button>
            <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block focus-within:block z-50 min-w-[220px]">
              <div className="rounded-md border border-line bg-surface/95 backdrop-blur-xl p-2 shadow-lifted">
                <div className="px-3 py-2 border-b border-line/60">
                  <div className="text-[12px] font-medium text-ink truncate">{profile.name}</div>
                  <div className="text-[10px] text-ink-3 mt-0.5 truncate">{profile.dept}</div>
                </div>
                <Link
                  href="/erp/sign-in"
                  onClick={(e) => {
                    clearCurrentRole();
                  }}
                  className="block px-3 py-2 text-[12px] text-ink-2 hover:bg-bg/40 rounded transition-colors"
                >
                  Switch role / sign out
                </Link>
                <Link
                  href="/"
                  className="block px-3 py-2 text-[12px] text-ink-2 hover:bg-bg/40 rounded transition-colors"
                >
                  Citizen view
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
