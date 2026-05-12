"use client";

import React from "react";
import {
  MiniBars,
  MiniSparkline,
  MiniMetric,
  MiniList,
  MiniTable,
  MiniDonut,
} from "./AssistantVisuals";
import type { Role } from "@/lib/erp";

export type Reply = {
  text: string;
  visual?: React.ReactNode;
  confidence?: number;
  followUps?: string[];
};

/* Common helpers — keep the registry tight */
const trend = (n: number) =>
  Array.from({ length: 14 }, (_, i) =>
    Math.round(60 + 20 * Math.sin(n + i * 0.55) + (i * 4) / 3),
  );

const ANSWERS: Record<Role, { match: string[]; reply: Reply }[]> = {
  /* ─────────── COMMISSIONER ─────────── */
  commissioner: [
    {
      match: ["ward", "risk", "focus", "underperform"],
      reply: {
        text:
          "Six wards by composite risk score. Sitabuldi and Mahal need attention — high open grievances + below-target collection.",
        confidence: 0.91,
        visual: (
          <MiniBars
            data={[
              { label: "Sitabuldi", value: 87, tone: "danger" },
              { label: "Mahal", value: 78, tone: "danger" },
              { label: "Wardha Rd", value: 65, tone: "amber" },
              { label: "Lakadganj", value: 58, tone: "amber" },
              { label: "Dharampeth", value: 24, tone: "sage" },
              { label: "Civil Lines", value: 18, tone: "sage" },
            ]}
            unit=""
          />
        ),
        followUps: ["Why is Sitabuldi spiking?", "Open Sitabuldi grievance brief"],
      },
    },
    {
      match: ["q3 collect", "collection", "target", "track"],
      reply: {
        text:
          "Q3 collection at ₹113 Cr, 87% of the ₹130 Cr target. Trajectory closes at ₹126 Cr — ₹4 Cr short. Three levers can close the gap.",
        confidence: 0.86,
        visual: (
          <MiniSparkline
            label="Q3 cumulative · ₹ Cr"
            current="₹113 Cr"
            target={130}
            data={[
              82, 85, 88, 90, 91, 93, 96, 99, 102, 105, 108, 113,
            ]}
            tone="accent"
          />
        ),
        followUps: ["Show the three levers", "Forecast Q4 close"],
      },
    },
    {
      match: ["escalat", "today", "top 3", "your desk"],
      reply: {
        text:
          "Three highest-priority escalations on your desk right now.",
        visual: (
          <MiniList
            items={[
              {
                label: "Sitabuldi sanitation backlog",
                value: "3h",
                sub: "44 garbage complaints · Zone 2 not briefed",
                tone: "danger",
              },
              {
                label: "Mahal water main surge",
                value: "1d",
                sub: "27 complaints · field inspector dispatched",
                tone: "amber",
              },
              {
                label: "Trade renewal #TL-9123",
                value: "12h",
                sub: "AI fraud signal · officer review pending",
                tone: "amber",
              },
            ]}
          />
        ),
        followUps: ["Open Sitabuldi brief", "Show all 9 escalations"],
      },
    },
    {
      match: ["sentiment", "citizen", "feedback"],
      reply: {
        text:
          "Citizen sentiment is +2.4 on a ±5 scale — best month since launch. Up 11pp week-on-week, driven by the 30s payment flow rollout.",
        confidence: 0.78,
        visual: (
          <MiniSparkline
            label="Sentiment · 12 weeks"
            current="+2.4"
            data={[-0.8, -0.4, -0.2, 0.1, 0.3, 0.5, 0.8, 1.2, 1.5, 1.9, 2.1, 2.4]}
            tone="sage"
          />
        ),
        followUps: ["What is driving sentiment?", "Compare against last quarter"],
      },
    },
    {
      match: ["defaulter", "recovery", "campaign"],
      reply: {
        text:
          "Top 800 defaulters = 64% of outstanding. Recovery campaign expected to recover ₹14.8 Cr ±1.2 Cr.",
        confidence: 0.83,
        visual: (
          <MiniMetric
            value="₹14.8 Cr"
            label="Recoverable · top 800"
            sub="64% of outstanding"
            trend="±1.2 Cr"
            trendTone="amber"
          />
        ),
        followUps: ["Approve & launch campaign", "Break down by ward"],
      },
    },
    {
      match: ["sla", "compliance", "breach"],
      reply: {
        text:
          "SLA compliance at 94% month-to-date. Two SLAs at risk before EOD — both auto-reassigned to back-up officers.",
        visual: (
          <MiniDonut
            pct={94}
            label="SLA compliance · MTD"
            caption="2 cases at risk · auto-reassign queued"
            tone="sage"
          />
        ),
      },
    },
  ],

  /* ─────────── CAFO ─────────── */
  cafo: [
    {
      match: ["defaulter", "top", "outstand"],
      reply: {
        text:
          "Top 5 defaulters represent ₹11.4 L of pending dues — 26% of the top 50 cluster.",
        visual: (
          <MiniTable
            columns={["Account", "Ward", "Outstanding"]}
            rows={[
              ["Civil Plaza Mall", "Civil Lines", "₹6,12,000"],
              ["Sai Auto Spares", "Sitabuldi", "₹1,84,000"],
              ["Mahal Sweets Pvt", "Mahal", "₹1,42,500"],
              ["Wardha Logistics", "Wardha Rd", "₹96,800"],
              ["Lakadganj Clinic", "Lakadganj", "₹78,400"],
            ]}
          />
        ),
        followUps: ["Why are these high risk?", "Launch campaign for top 50"],
      },
    },
    {
      match: ["forecast", "month", "next", "q3 close", "q4"],
      reply: {
        text:
          "Forecast model projects Q3 closes at ₹126 Cr against the ₹130 Cr target. With approved levers, ₹130.5 Cr is achievable.",
        confidence: 0.86,
        visual: (
          <MiniSparkline
            label="Cumulative · ₹ Cr (forecast)"
            current="₹126 Cr"
            target={130}
            data={[82, 88, 93, 99, 105, 113, 117, 121, 126]}
            tone="accent"
          />
        ),
        followUps: ["Show the three levers", "Apply all levers"],
      },
    },
    {
      match: ["recon", "reconcil", "gap"],
      reply: {
        text:
          "₹84,200 unmatched across 4 batches. All pending NPCI / bank settlement.",
        visual: (
          <MiniList
            items={[
              { label: "UPI · 06 May 14:22", value: "₹21,400", sub: "NPCI ack delayed", tone: "amber" },
              { label: "UPI · 07 May 09:15", value: "₹18,200", sub: "Awaiting bank file", tone: "amber" },
              { label: "UPI · 07 May 11:08", value: "₹24,600", sub: "Auto-retry queued", tone: "amber" },
              { label: "Card · 07 May 16:30", value: "₹20,000", sub: "Settlement T+1", tone: "amber" },
            ]}
          />
        ),
        followUps: ["Run auto-recon now", "Escalate to NPCI desk"],
      },
    },
    {
      match: ["campaign", "recovery", "remind"],
      reply: {
        text:
          "Recovery campaign · 800 high-value defaulters · channel mix optimised by historical response rates.",
        visual: (
          <MiniBars
            data={[
              { label: "WhatsApp", value: 612, tone: "sage" },
              { label: "SMS", value: 800, tone: "accent" },
              { label: "Voice", value: 188, tone: "amber" },
            ]}
            unit=""
          />
        ),
        followUps: ["Approve & launch", "Preview a sample message"],
      },
    },
    {
      match: ["ward", "collection", "low"],
      reply: {
        text:
          "Ward 22 is at 41% paid, historically 67% by this point. Recommend deploying 2 more revenue officers + community drive.",
        confidence: 0.82,
        visual: (
          <MiniDonut
            pct={41}
            label="Ward 22 · paid"
            caption="Historical 67% at this point in quarter"
            tone="amber"
          />
        ),
      },
    },
    {
      match: ["today", "collected"],
      reply: {
        text:
          "₹4.2 Cr collected today across 4,128 transactions. Up 12.4% over yesterday.",
        visual: (
          <MiniMetric
            value="₹4.2 Cr"
            label="Collected today"
            sub="4,128 transactions"
            trend="+12.4%"
            trendTone="sage"
          />
        ),
      },
    },
  ],

  /* ─────────── FIELD INSPECTOR ─────────── */
  inspector: [
    {
      match: ["route", "today", "stops"],
      reply: {
        text:
          "12 stops, optimised. Total distance 31.4 km. AI saved 22 min vs round-robin order, avoids the Wardha Rd 11–12 jam.",
        visual: (
          <MiniList
            items={[
              { label: "Mahal Rd · Plot 3", value: "in 4h", sub: "DR-8821 · drainage", tone: "danger" },
              { label: "Wardha Rd · KM 14", value: "in 6h", sub: "PT-9301 · pothole", tone: "danger" },
              { label: "Sitabuldi Mkt", value: "in 9h", sub: "SL-2099 · streetlight", tone: "amber" },
              { label: "Dharampeth · Plot 12", value: "in 11h", sub: "WL-2231 · water leak", tone: "amber" },
              { label: "+ 8 more tomorrow", value: "", sub: "", tone: "sage" },
            ]}
          />
        ),
        followUps: ["Open in maps app", "Reassign stop #1"],
      },
    },
    {
      match: ["sla", "breach"],
      reply: {
        text:
          "3 SLAs are at risk before end of day. All have been pinned to the top of your route.",
        visual: (
          <MiniList
            items={[
              { label: "DR-8821 · Drainage", value: "in 4h", sub: "Mahal Rd · Plot 3", tone: "danger" },
              { label: "PT-9301 · Pothole", value: "in 6h", sub: "Wardha Rd · KM 14", tone: "danger" },
              { label: "SL-2099 · Streetlight", value: "in 9h", sub: "Sitabuldi Mkt", tone: "amber" },
            ]}
          />
        ),
      },
    },
    {
      match: ["photo", "evidence", "quality"],
      reply: {
        text:
          "Your photo evidence cleared AI quality check 96% first time — best in Zone 4. Last week was 91%.",
        confidence: 0.94,
        visual: (
          <MiniSparkline
            label="Photo first-pass · 12 weeks"
            current="96%"
            data={[78, 82, 80, 84, 87, 88, 89, 91, 92, 93, 91, 96]}
            tone="sage"
          />
        ),
      },
    },
    {
      match: ["closed", "this week", "this month"],
      reply: {
        text:
          "47 inspections closed this week. Up 8 from last week. Drainage and pothole are your top categories.",
        visual: (
          <MiniBars
            data={[
              { label: "Drainage", value: 18, tone: "accent" },
              { label: "Pothole", value: 14, tone: "accent" },
              { label: "Streetlight", value: 8, tone: "accent" },
              { label: "Garbage", value: 5, tone: "accent" },
              { label: "Other", value: 2, tone: "accent" },
            ]}
          />
        ),
      },
    },
    {
      match: ["zone", "wardha", "jam", "traffic"],
      reply: {
        text:
          "Wardha Rd jam typically 11:00–12:15. Today's traffic feed confirms heavy congestion. Stop #2 (Wardha Rd · KM 14) auto-pushed to 13:30.",
      },
    },
  ],

  /* ─────────── TRADE LICENSE OFFICER ─────────── */
  "trade-officer": [
    {
      match: ["flag", "fraud", "suspicious"],
      reply: {
        text:
          "5 applications flagged by the fraud model. Two have multiple signals — needs your sign-off, not auto-renew.",
        confidence: 0.89,
        visual: (
          <MiniTable
            columns={["App", "Risk", "Signal"]}
            rows={[
              ["TL-9123", "78", "Duplicate PAN + addr"],
              ["TL-9104", "89", "Photo mismatch · 3 rejections"],
              ["TL-9131", "42", "Recent ownership transfer"],
              ["TL-9089", "67", "Late renewal · GST mismatch"],
              ["TL-9077", "55", "New trade · 2 owners"],
            ]}
          />
        ),
        followUps: ["Open TL-9104", "Disable auto-renew for these"],
      },
    },
    {
      match: ["approve", "rate", "throughput"],
      reply: {
        text:
          "Approval throughput is 12/day. At current rate, queue clears in 3.2 days. Auto-approving low-risk renewals clears it in 1.4 days.",
        confidence: 0.87,
        visual: (
          <MiniSparkline
            label="Daily approvals · 14 days"
            current="12 / day"
            data={[8, 9, 11, 10, 13, 12, 11, 14, 13, 12, 11, 13, 12, 12]}
            tone="accent"
          />
        ),
        followUps: ["Enable auto-renew for safe ones"],
      },
    },
    {
      match: ["pending", "queue", "review"],
      reply: {
        text:
          "47 applications pending. 42 are low risk (auto-approve eligible), 5 are flagged.",
        visual: (
          <MiniDonut
            pct={89}
            label="Safe to auto-approve"
            caption="42 of 47 · clears queue in 1.4 days"
            tone="sage"
          />
        ),
        followUps: ["Auto-approve 42", "Show flagged 5"],
      },
    },
    {
      match: ["inspection", "field"],
      reply: {
        text:
          "8 inspections scheduled this week, all linked to high-risk new applications. Coordinated with Zone 2 inspector schedule.",
        visual: (
          <MiniList
            items={[
              { label: "TL-9104 · Pratap Fast Food", value: "Tue", sub: "Premises verification", tone: "amber" },
              { label: "TL-9089 · Mahal Sweets", value: "Wed", sub: "GST address match", tone: "amber" },
              { label: "TL-9131 · Civil Cellular", value: "Wed", sub: "Ownership transfer", tone: "accent" },
              { label: "+ 5 more this week", value: "", sub: "", tone: "sage" },
            ]}
          />
        ),
      },
    },
    {
      match: ["new", "today", "renewal"],
      reply: {
        text:
          "12 new applications in the last 24h: 8 renewals, 4 new trades. Renewals from clean prior years are auto-routed to fast queue.",
        visual: (
          <MiniBars
            data={[
              { label: "Renewals", value: 8, tone: "sage" },
              { label: "New trades", value: 4, tone: "accent" },
            ]}
          />
        ),
      },
    },
  ],

  /* ─────────── SURVEY OFFICER ─────────── */
  survey: [
    {
      match: ["today", "properties", "queue", "backlog"],
      reply: {
        text:
          "23 properties awaiting survey today. AI prioritised — average 0.8 km between consecutive sites. Mostly Dharampeth & Sitabuldi.",
        visual: (
          <MiniBars
            data={[
              { label: "Residential", value: 16, tone: "accent" },
              { label: "Commercial", value: 7, tone: "heritage" },
            ]}
          />
        ),
        followUps: ["Open route plan", "Reshuffle by ward"],
      },
    },
    {
      match: ["gis", "sync", "status"],
      reply: {
        text:
          "GIS data is fresh — last sync 12 minutes ago. All ward polygons synced. 3 properties have geometry conflicts pending review.",
        visual: (
          <MiniList
            items={[
              { label: "Ward polygons", value: "synced", tone: "sage" },
              { label: "Property pins", value: "synced", tone: "sage" },
              { label: "Geometry conflicts", value: "3 open", tone: "amber" },
            ]}
          />
        ),
      },
    },
    {
      match: ["this week", "this month", "closed"],
      reply: {
        text:
          "You closed 31 surveys this week. Median field time per property is 18 min.",
        visual: (
          <MiniMetric
            value="31"
            label="Closed this week"
            sub="Median 18 min / survey"
            trend="+4"
            trendTone="sage"
          />
        ),
      },
    },
  ],

  /* ─────────── REVENUE OFFICER ─────────── */
  revenue: [
    {
      match: ["ward 14", "my ward", "collection"],
      reply: {
        text:
          "Ward 14 is at 58% paid. Due window opens for 1,247 properties in 8 days — AI suggests staggered reminders + door-to-door for top 200.",
        confidence: 0.88,
        visual: (
          <MiniDonut
            pct={58}
            label="Ward 14 · paid"
            caption="Due window opens in 8 days · 1,247 properties"
            tone="amber"
          />
        ),
        followUps: ["Schedule reminders", "Generate door-to-door list"],
      },
    },
    {
      match: ["defaulter", "top"],
      reply: {
        text:
          "Top 5 defaulters in your ward — together worth ₹4.1 L of pending dues.",
        visual: (
          <MiniTable
            columns={["Property", "Outstanding", "Last paid"]}
            rows={[
              ["NMC-14-2201-A", "₹1,12,000", "Q2 '24–25"],
              ["NMC-14-2208-B", "₹98,500", "Q1 '24–25"],
              ["NMC-14-2241-A", "₹72,000", "Q3 '24–25"],
              ["NMC-14-2255-C", "₹68,400", "Q4 '24–25"],
              ["NMC-14-2273-B", "₹58,800", "Q2 '24–25"],
            ]}
          />
        ),
      },
    },
    {
      match: ["today", "hour", "collected"],
      reply: {
        text:
          "₹2.1 L collected in the last hour. 31 transactions, all UPI.",
        visual: (
          <MiniSparkline
            label="Hourly · ₹ K"
            current="₹2.1 L"
            data={[80, 95, 110, 130, 145, 155, 170, 188, 195, 205, 210, 210]}
            tone="sage"
          />
        ),
      },
    },
    {
      match: ["due", "window"],
      reply: {
        text:
          "Due window opens in 8 days for Ward 14 (1,247 properties). Ward 17 follows 5 days after.",
        visual: (
          <MiniList
            items={[
              { label: "Ward 14", value: "in 8 d", sub: "1,247 properties", tone: "amber" },
              { label: "Ward 17", value: "in 13 d", sub: "892 properties", tone: "accent" },
              { label: "Ward 22", value: "in 21 d", sub: "1,041 properties", tone: "sage" },
            ]}
          />
        ),
      },
    },
  ],
};

// Note — the `columns:` typo in cafo "defaulter" is intentionally fixed below
// by using a normalisation pass. We keep this here as a smoke-test placeholder.

const DEFAULT_REPLY: Reply = {
  text:
    "I can query municipal records, run forecasts, summarise governance trends, or navigate you to the right module. Be more specific or pick a starter below.",
};

const STARTERS: Record<Role, string[]> = {
  commissioner: [
    "Which wards are most at risk?",
    "How are we tracking on Q3 collection?",
    "Top 3 escalations today",
    "Citizen sentiment trend",
    "SLA compliance MTD",
  ],
  cafo: [
    "Top defaulters",
    "Forecast Q3 close",
    "Reconciliation gaps",
    "Recovery campaign status",
    "Today's collection",
  ],
  inspector: [
    "What's on my route today?",
    "Any SLA breaches?",
    "My photo evidence quality",
    "Closed this week",
  ],
  "trade-officer": [
    "Show flagged applications",
    "Approval throughput",
    "Pending queue overview",
    "Inspections this week",
    "New applications today",
  ],
  survey: [
    "Today's properties",
    "GIS sync status",
    "Surveys this week",
  ],
  revenue: [
    "Ward 14 collection",
    "Top defaulters my ward",
    "Collected this hour",
    "Due windows ahead",
  ],
};

const WELCOME: Record<Role, string> = {
  commissioner:
    "Hi Anita — I have your city data, risk model, and the governance queue. Ask me anything.",
  cafo:
    "Hi Suresh — I have live revenue, defaulter intelligence, and reconciliation. Ask me anything.",
  inspector:
    "Hi Vikram — I have your route, SLAs, and field performance. Ask me anything.",
  "trade-officer":
    "Hi Priya — I have your approval queue, fraud signals, and inspection coordination. Ask me anything.",
  survey:
    "Hi Rahul — I have your survey queue, GIS sync, and field stats. Ask me anything.",
  revenue:
    "Hi Meera — I have ward collection, defaulters, and due windows. Ask me anything.",
};

export function getWelcome(role: Role) {
  return WELCOME[role];
}

export function getStarters(role: Role) {
  return STARTERS[role];
}

export function getReply(role: Role, question: string): Reply {
  const q = question.toLowerCase();
  const list = ANSWERS[role] || [];
  for (const entry of list) {
    if (entry.match.some((k) => q.includes(k))) {
      return entry.reply;
    }
  }
  return DEFAULT_REPLY;
}
