"use client";

import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { ModuleHero } from "@/components/ModuleHero";
import { Icon } from "@/components/Icon";

type Alert = {
  level: "info" | "warn" | "critical";
  category: string;
  title: string;
  detail: string;
  area: string;
  when: string;
};

const ALERTS: Alert[] = [
  {
    level: "warn",
    category: "Water",
    title: "Scheduled water shutdown",
    detail:
      "Pipeline maintenance affects Dharampeth & Dhantoli wards. Please store water in advance.",
    area: "Dharampeth · Dhantoli",
    when: "Tomorrow · 6:00 — 9:00 AM",
  },
  {
    level: "info",
    category: "Health",
    title: "Free dengue testing camp",
    detail: "All citizens welcome. Bring an ID. No appointment needed.",
    area: "All zonal offices",
    when: "May 12 · 9 AM — 4 PM",
  },
  {
    level: "critical",
    category: "Weather",
    title: "Yellow alert · heavy rain expected",
    detail:
      "Met department forecasts 80–110mm rain over the next 36 hours. Avoid waterlogged areas.",
    area: "City-wide",
    when: "Today · 6 PM onwards",
  },
  {
    level: "info",
    category: "Traffic",
    title: "Wardha Road diversion",
    detail: "BRT works. Use Trimurti Nagar Rd for southbound traffic.",
    area: "Wardha Road",
    when: "Until Jun 4",
  },
];

const CONTACTS = [
  { label: "Emergency", num: "112" },
  { label: "Fire", num: "101" },
  { label: "Ambulance", num: "108" },
  { label: "NMC Control Room", num: "0712-2567333" },
];

export default function AlertsPage() {
  return (
    <SiteShell>
      <Section>
        <ModuleHero
          eyebrow="Alerts"
          title="The city, when it"
          italic="needs to reach you."
          description="Weather, water, traffic, health — every advisory that matters, surfaced the moment it&rsquo;s issued. Verified by NMC."
          meta={
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber live-dot" />
              4 active advisories
            </span>
          }
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 sm:gap-6">
          <div className="space-y-3">
            {ALERTS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="surface-card hairline rounded-[20px] p-6"
              >
                <div className="flex items-center gap-2.5">
                  <LevelBadge level={a.level} />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-ink-3">
                    {a.category}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl sm:text-2xl tracking-tight text-ink leading-tight">
                  {a.title}
                </h3>
                <p className="mt-3 text-[14px] text-ink-2 leading-relaxed">
                  {a.detail}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <Field k="Area" v={a.area} />
                  <Field k="When" v={a.when} />
                </div>
              </motion.div>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="surface-card hairline rounded-[20px] p-6">
              <SectionLabel>Get notified</SectionLabel>
              <p className="mt-4 text-sm text-ink-3 leading-relaxed">
                Push, SMS, WhatsApp, or email. Choose what matters to you,
                ward-by-ward.
              </p>
              <div className="mt-5 space-y-2">
                {[
                  ["Weather", true],
                  ["Water shutdowns", true],
                  ["Traffic", true],
                  ["Health advisories", true],
                  ["Project work", false],
                ].map(([label, on]) => (
                  <label
                    key={label as string}
                    className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-ink/[0.04] cursor-pointer transition-colors"
                  >
                    <span className="text-sm text-ink">{label}</span>
                    <span
                      className={
                        "relative h-5 w-9 rounded-full transition-colors " +
                        (on ? "bg-ink" : "bg-ink/15")
                      }
                    >
                      <span
                        className={
                          "absolute top-0.5 h-4 w-4 rounded-full bg-bg transition-all " +
                          (on ? "left-4" : "left-0.5")
                        }
                      />
                    </span>
                  </label>
                ))}
              </div>
              <button className="mt-5 w-full rounded-full bg-ink text-bg px-4 py-2.5 text-sm font-medium hover:scale-[1.01] active:scale-[0.99] transition-transform focus-ring">
                Save preferences
              </button>
            </div>

            <div className="surface-card hairline rounded-[20px] p-6">
              <SectionLabel>Emergency contacts</SectionLabel>
              <div className="mt-4 space-y-2.5">
                {CONTACTS.map((c) => (
                  <a
                    key={c.label}
                    href={`tel:${c.num.replace(/\D/g, "")}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-ink/[0.04] transition-colors group focus-ring"
                  >
                    <span className="text-sm text-ink">{c.label}</span>
                    <span className="font-display tabular text-base text-ink-2 group-hover:text-accent transition-colors">
                      {c.num}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </SiteShell>
  );
}

function LevelBadge({ level }: { level: "info" | "warn" | "critical" }) {
  const cls =
    level === "critical"
      ? "bg-danger/10 text-danger"
      : level === "warn"
      ? "bg-amber/10 text-amber"
      : "bg-heritage/10 text-heritage";
  const label = level === "critical" ? "Critical" : level === "warn" ? "Advisory" : "Info";
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold px-2.5 py-1 " +
        cls
      }
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {label}
    </span>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-ink/[0.03] px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">
        {k}
      </div>
      <div className="text-ink mt-0.5 text-[13px]">{v}</div>
    </div>
  );
}
