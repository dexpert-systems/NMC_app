"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { ROLES, type Role } from "@/lib/erp";
import { Icon } from "@/components/Icon";

type NavItem = {
  href: string;
  label: string;
  icon: "spark" | "pay" | "map" | "report" | "services" | "projects" | "alerts" | "data" | "community" | "search";
  badge?: string;
  /** Higher = more important for this role */
  weight: Partial<Record<Role, number>>;
};

const ALL_NAV: NavItem[] = [
  { href: "/erp", label: "Cockpit", icon: "data", weight: { commissioner: 100, cafo: 60, inspector: 50, "trade-officer": 50, survey: 60, revenue: 60 } },
  { href: "/erp/revenue", label: "Revenue", icon: "pay", badge: "₹4.2 Cr today", weight: { commissioner: 90, cafo: 100, revenue: 100 } },
  { href: "/erp/approvals", label: "Approvals", icon: "services", badge: "47 pending", weight: { commissioner: 70, "trade-officer": 100 } },
  { href: "/erp/inspections", label: "Inspections", icon: "map", badge: "12 today", weight: { commissioner: 60, inspector: 100, "trade-officer": 70 } },
  { href: "/erp/grievances", label: "Grievances", icon: "report", badge: "9 escalated", weight: { commissioner: 95, cafo: 40, inspector: 60, "trade-officer": 50 } },
  { href: "/erp/projects", label: "Projects", icon: "projects", weight: { commissioner: 80, cafo: 70 } },
  { href: "/erp/intelligence", label: "Intelligence", icon: "spark", weight: { commissioner: 85, cafo: 70, "trade-officer": 60 } },
];

const SHORTCUTS: Record<Role, { label: string; href: string; tone: "accent" | "warn" | "danger" | "sage" }[]> = {
  commissioner: [
    { label: "9 escalations need review", href: "/erp/grievances", tone: "danger" },
    { label: "Q3 board meeting brief ready", href: "#", tone: "accent" },
    { label: "Revenue tracker · 87% on target", href: "/erp/revenue", tone: "sage" },
  ],
  cafo: [
    { label: "₹14.8 Cr defaulter recovery target", href: "/erp/revenue", tone: "warn" },
    { label: "Reconciliation gap · 4 entries", href: "/erp/revenue", tone: "danger" },
    { label: "Auto-reminders out: 4,128", href: "/erp/revenue", tone: "sage" },
  ],
  inspector: [
    { label: "12 inspections on your route today", href: "/erp/inspections", tone: "accent" },
    { label: "3 SLA breaches imminent", href: "/erp/inspections", tone: "danger" },
    { label: "AI suggests new route order", href: "/erp/inspections", tone: "sage" },
  ],
  "trade-officer": [
    { label: "47 approvals pending review", href: "/erp/approvals", tone: "accent" },
    { label: "5 flagged for fraud signals", href: "/erp/approvals", tone: "danger" },
    { label: "8 inspections this week", href: "/erp/inspections", tone: "warn" },
  ],
  survey: [
    { label: "23 properties pending survey", href: "/erp", tone: "accent" },
    { label: "GIS sync · last 12 min ago", href: "/erp", tone: "sage" },
  ],
  revenue: [
    { label: "Ward 14 due window · 8 days", href: "/erp/revenue", tone: "warn" },
    { label: "₹2.1 L collected · last hour", href: "/erp/revenue", tone: "sage" },
  ],
};

export function AdaptiveSidebar({ role }: { role: Role }) {
  const pathname = usePathname() || "";
  const profile = ROLES[role];

  const orderedNav = useMemo(() => {
    return [...ALL_NAV]
      .map((n) => ({ ...n, w: n.weight[role] ?? 0 }))
      .filter((n) => n.w > 0)
      .sort((a, b) => b.w - a.w);
  }, [role]);

  const shortcuts = SHORTCUTS[role];

  return (
    <aside className="hidden lg:flex flex-col w-[280px] shrink-0 border-r border-line h-svh sticky top-0 overflow-y-auto bg-bg-2/70 backdrop-blur-xl">
      {/* Workspace header */}
      <div className="px-5 pt-6 pb-5 border-b border-line">
        <div className="flex items-center gap-2.5">
          <span className="relative grid place-items-center h-9 w-9 rounded-md bg-ink text-bg shadow-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 3 L20 8 L20 16 L12 21 L4 16 L4 8 Z" stroke="#E25822" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="2" fill="#E25822" />
            </svg>
          </span>
          <div>
            <div className="text-[12px] font-medium text-ink leading-tight">
              NMC Operations
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3 mt-0.5">
              Municipal ERP
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-md bg-surface/70 border border-line px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center h-8 w-8 rounded-md bg-accent/15 text-accent text-[11px] font-semibold shrink-0">
              {profile.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-medium text-ink leading-tight truncate">
                {profile.name}
              </div>
              <div className="text-[10px] text-ink-3 mt-0.5 truncate">
                {profile.shortName}
              </div>
            </div>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-line/60 space-y-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-3">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot shrink-0" />
              <span>Online</span>
            </div>
            <div className="truncate">{profile.dept}</div>
          </div>
        </div>
      </div>

      {/* AI shortcuts */}
      <div className="px-3 pt-5 pb-3">
        <div className="px-2 pb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-ink-3">
          <Icon name="spark" size={10} />
          AI · prioritized for you
        </div>
        <div className="space-y-1">
          {shortcuts.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="block rounded-md px-3 py-2.5 hover:bg-surface transition-colors group"
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={
                    "mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 " +
                    (s.tone === "danger"
                      ? "bg-danger"
                      : s.tone === "warn"
                      ? "bg-amber"
                      : s.tone === "sage"
                      ? "bg-sage"
                      : "bg-accent")
                  }
                />
                <span className="text-[12px] text-ink-2 leading-snug group-hover:text-ink transition-colors">
                  {s.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Adaptive nav */}
      <div className="px-3 pt-3 pb-3 border-t border-line">
        <div className="px-2 pb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-ink-3">
          <span>Workspace</span>
          <span className="text-ink-4 normal-case tracking-normal">
            ⌘K · jump
          </span>
        </div>
        <div className="space-y-0.5">
          {orderedNav.map((n) => {
            const active = pathname === n.href || (n.href !== "/erp" && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors group " +
                  (active
                    ? "bg-accent/10 text-ink"
                    : "text-ink-2 hover:bg-surface/70 hover:text-ink")
                }
              >
                <span
                  className={
                    "grid place-items-center h-7 w-7 rounded-md shrink-0 transition-colors " +
                    (active
                      ? "bg-accent text-white"
                      : "bg-surface/60 text-ink-3 group-hover:text-ink")
                  }
                >
                  <Icon name={n.icon as "spark"} size={12} />
                </span>
                <span className="flex-1 text-[13px] truncate">{n.label}</span>
                {n.badge && (
                  <span className="text-[10px] tabular text-ink-3 px-1.5 py-0.5 rounded bg-surface/70 shrink-0">
                    {n.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* System status footer */}
      <div className="mt-auto border-t border-line px-5 py-4">
        <div className="text-[9px] uppercase tracking-[0.18em] text-ink-3 mb-2">
          System status
        </div>
        <div className="space-y-1.5 text-[10px] text-ink-3">
          {[
            ["GIS sync", "OK · 12s ago", "sage", false],
            ["UPI gateway", "Live", "sage", true],
            ["AI agents", "9 active", "sage", true],
            ["Aadhaar API", "Throttled", "amber", false],
          ].map(([k, v, tone, pulse]) => (
            <div key={k as string} className="flex items-center justify-between">
              <span>{k as string}</span>
              <span
                className={
                  "tabular inline-flex items-center gap-1.5 " +
                  (tone === "amber"
                    ? "text-amber"
                    : tone === "danger"
                    ? "text-danger"
                    : "text-sage")
                }
              >
                {pulse && (
                  <span
                    className={
                      "h-1.5 w-1.5 rounded-full live-dot " +
                      (tone === "amber" ? "bg-amber" : "bg-sage")
                    }
                  />
                )}
                {v as string}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
