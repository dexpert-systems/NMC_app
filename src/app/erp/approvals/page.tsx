"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ErpShell } from "@/components/erp/ErpShell";
import { Icon } from "@/components/Icon";

type App = {
  id: string;
  business: string;
  category: string;
  ward: string;
  fee: number;
  age: string;
  risk: number; // 0..1
  flags: string[];
  status: "pending" | "flagged" | "ready";
};

const APPS: App[] = [
  {
    id: "TL-9123",
    business: "Sai Auto Spares · Renewal",
    category: "Shop / retail",
    ward: "Sitabuldi",
    fee: 1500,
    age: "12h",
    risk: 0.78,
    flags: ["Duplicate PAN", "Address mismatch"],
    status: "flagged",
  },
  {
    id: "TL-9117",
    business: "Mahal Sweets Pvt · Renewal",
    category: "Restaurant",
    ward: "Mahal",
    fee: 3500,
    age: "1d",
    risk: 0.12,
    flags: [],
    status: "ready",
  },
  {
    id: "TL-9131",
    business: "Civil Cellular · New",
    category: "Service",
    ward: "Civil Lines",
    fee: 1200,
    age: "8h",
    risk: 0.42,
    flags: ["Recent ownership transfer"],
    status: "pending",
  },
  {
    id: "TL-9098",
    business: "Wardha Logistics · Renewal",
    category: "Office",
    ward: "Wardha Rd",
    fee: 2000,
    age: "2d",
    risk: 0.18,
    flags: [],
    status: "ready",
  },
  {
    id: "TL-9104",
    business: "Pratap Fast Food · New",
    category: "Restaurant",
    ward: "Pratap N.",
    fee: 3500,
    age: "1d",
    risk: 0.89,
    flags: ["Premises photo doesn't match address", "Owner has 3 prior rejections"],
    status: "flagged",
  },
];

export default function ApprovalsPage() {
  return (
    <ErpShell>
      <div className="px-5 lg:px-8 pt-6 pb-12 max-w-[1400px] mx-auto">
        <Hero />
        <ApprovalQueue />
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
        className="absolute -top-1/2 -right-1/4 h-[180%] w-[60%] rounded-full opacity-20 blur-3xl bg-gradient-to-br from-heritage/40 via-sage/15 to-transparent"
      />
      <div className="relative flex items-start justify-between flex-wrap gap-5">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3">
            <span className="h-px w-8 bg-line" />
            <span>Trade licensing · Priya&rsquo;s queue</span>
          </div>
          <h1 className="font-display mt-4 text-[clamp(32px,5vw,56px)] font-medium leading-[0.98] tracking-tightest text-ink">
            47 in queue.
            <br />
            <span className="italic font-light text-ink-2">5 need a closer look.</span>
          </h1>
          <p className="mt-5 text-[14px] sm:text-[15px] text-ink-3 max-w-2xl leading-relaxed">
            AI has triaged today&rsquo;s applications. Low-risk renewals can clear in one tap. <span className="text-ink">5 fraud signals</span> have been flagged for human review. Auto-approve the safe ones to clear the queue in a third of the time.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="flex items-baseline gap-2">
            <span className="font-display tabular text-5xl text-ink leading-none">42</span>
            <span className="text-[11px] text-ink-3">low risk</span>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md bg-sage text-white px-4 py-2 text-[12px] font-medium hover:scale-[1.02] transition-transform focus-ring">
            Auto-approve 42
            <Icon name="check" size={11} />
          </button>
        </div>
      </div>

      <div className="relative mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { k: "In queue", v: "47" },
          { k: "Flagged", v: "5", tone: "danger" },
          { k: "Ready (low risk)", v: "42", tone: "sage" },
          { k: "Avg. clearance", v: "1.4 d", tone: "accent" },
        ].map((s) => (
          <div key={s.k} className="rounded-md border border-line bg-bg-2/70 px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">{s.k}</div>
            <div className={"mt-1.5 font-display tabular text-2xl leading-none " + (s.tone === "danger" ? "text-danger" : s.tone === "sage" ? "text-sage" : "text-ink")}>
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ApprovalQueue() {
  const [open, setOpen] = useState<string | null>("TL-9123");

  return (
    <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
      <div className="rounded-[14px] border border-line bg-surface/50 overflow-hidden">
        <div className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
              <Icon name="services" size={10} />
              Pending
            </div>
            <h3 className="font-display mt-1 text-[20px] tracking-tight text-ink leading-tight">
              Approval queue
            </h3>
          </div>
          <select className="text-[11px] uppercase tracking-[0.14em] text-ink-2 bg-bg-2 border border-line rounded-md px-3 py-1.5 focus-ring">
            <option>By risk · high to low</option>
            <option>Oldest first</option>
            <option>By fee</option>
          </select>
        </div>

        <div className="max-h-[640px] overflow-y-auto">
          {APPS.map((a, i) => {
            const active = open === a.id;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setOpen(a.id)}
                className={
                  "w-full text-left px-5 py-4 transition-colors " +
                  (active ? "bg-bg/50" : "hover:bg-bg-2/60") +
                  (i < APPS.length - 1 ? " border-b border-line/40" : "")
                }
              >
                <div className="flex items-center gap-3">
                  <RiskBadge risk={a.risk} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-ink truncate">
                      {a.business}
                    </div>
                    <div className="text-[10px] text-ink-3 mt-0.5 tabular">
                      #{a.id} · {a.category} · {a.ward}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display tabular text-base text-ink leading-none">
                      ₹{a.fee.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-ink-3 mt-1 tabular">{a.age} ago</div>
                  </div>
                </div>
                {a.flags.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {a.flags.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 rounded text-[10px] uppercase tracking-[0.14em] bg-danger/15 text-danger px-1.5 py-0.5"
                      >
                        <span className="h-1 w-1 rounded-full bg-current" />
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      <div className="rounded-[14px] border border-line bg-surface/50 overflow-hidden">
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <Detail app={APPS.find((a) => a.id === open)!} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RiskBadge({ risk }: { risk: number }) {
  const tone = risk > 0.6 ? "danger" : risk > 0.3 ? "amber" : "sage";
  return (
    <span
      className={
        "grid place-items-center h-9 w-9 rounded-md text-[10px] font-bold tabular shrink-0 " +
        (tone === "danger"
          ? "bg-danger/15 text-danger"
          : tone === "amber"
          ? "bg-amber/15 text-amber"
          : "bg-sage/15 text-sage")
      }
      title={`AI risk score ${Math.round(risk * 100)}%`}
    >
      {Math.round(risk * 100)}
    </span>
  );
}

function Detail({ app }: { app: App }) {
  return (
    <div>
      <div className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
            <span className={"h-1.5 w-1.5 rounded-full " + (app.risk > 0.6 ? "bg-danger" : app.risk > 0.3 ? "bg-amber" : "bg-sage")} />
            #{app.id} · {app.status === "flagged" ? "FLAGGED" : app.status.toUpperCase()}
          </div>
          <h3 className="font-display mt-1 text-[20px] tracking-tight text-ink leading-tight">
            {app.business}
          </h3>
          <div className="text-[11px] text-ink-3 mt-1">
            {app.category} · {app.ward} · ₹{app.fee.toLocaleString("en-IN")} fee
          </div>
        </div>
        <RiskBadge risk={app.risk} />
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* AI summary */}
        <div className="rounded-md border border-line bg-bg-2/70 p-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-2">
            <Icon name="spark" size={10} />
            AI assessment · model v3.2
          </div>
          <p className="text-[12px] text-ink-2 leading-relaxed">
            {app.flags.length > 0
              ? `${app.flags.length} fraud signal${app.flags.length === 1 ? "" : "s"} detected. The PAN appears on a previous rejected application from a different ward (3 months ago). Address proof shows a different premises than the photo. Recommend field inspection before approval.`
              : "All documents auto-validated. PAN matches I-T database. Premises photo matches lease agreement. No prior rejections. Owner has clean payment history. Safe to approve."}
          </p>
        </div>

        {/* Documents */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-2">
            Documents
          </div>
          <div className="space-y-1.5">
            {[
              ["PAN card", "Verified · I-T match", "sage"],
              ["Lease agreement", app.flags.includes("Address mismatch") ? "Address mismatch · review" : "Verified · 14 mo remaining", app.flags.includes("Address mismatch") ? "danger" : "sage"],
              ["Premises photo", app.flags.length > 1 ? "Doesn't match lease · review" : "Auto-verified", app.flags.length > 1 ? "danger" : "sage"],
            ].map(([label, status, tone]) => (
              <div key={label as string} className="flex items-center justify-between rounded-md bg-bg-2/60 px-3.5 py-2.5">
                <span className="text-[12px] text-ink">{label as string}</span>
                <span className={"text-[11px] " + (tone === "danger" ? "text-danger" : "text-sage")}>{status as string}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flags */}
        {app.flags.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-2">
              Flags · why
            </div>
            <div className="space-y-1.5">
              {app.flags.map((f) => (
                <div key={f} className="rounded-md border border-danger/30 bg-danger/8 px-3.5 py-2.5 text-[12px] text-ink">
                  • {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-sage text-white px-4 py-2.5 text-[13px] font-medium hover:scale-[1.01] focus-ring">
            <Icon name="check" size={12} /> Approve
          </button>
          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-bg-2/70 hover:bg-bg-2 border border-line px-4 py-2.5 text-[13px] font-medium text-ink-2 hover:text-ink focus-ring">
            Send to inspection
          </button>
          <button className="rounded-md border border-line bg-bg-2/70 hover:bg-bg-2 px-3 py-2.5 text-[13px] text-ink-3 hover:text-ink focus-ring">
            Reject
          </button>
        </div>

        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-4 text-center pt-1">
          Every action audited · biometric step-up for high risk
        </div>
      </div>
    </div>
  );
}
