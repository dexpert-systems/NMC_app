"use client";

import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { ModuleHero } from "@/components/ModuleHero";
import { MetricTile } from "@/components/MetricTile";
import { Icon } from "@/components/Icon";

const SPARK = (seed: number, dir: number = 1) =>
  Array.from({ length: 14 }, (_, i) =>
    Math.round(40 + 30 * Math.sin(seed + i * 0.6) + dir * (i * 5) / 3),
  );

const WARDS = [
  { name: "Dharampeth", paid: 73, issues: 12, score: 87 },
  { name: "Civil Lines", paid: 81, issues: 8, score: 91 },
  { name: "Sitabuldi", paid: 64, issues: 21, score: 76 },
  { name: "Lakadganj", paid: 58, issues: 18, score: 71 },
  { name: "Ambazari", paid: 69, issues: 11, score: 82 },
  { name: "Wardha Rd.", paid: 52, issues: 27, score: 65 },
];

export default function DataPage() {
  return (
    <SiteShell>
      <Section>
        <ModuleHero
          eyebrow="Open data"
          title="The numbers"
          italic="behind your city."
          description="Every metric NMC tracks — revenue, complaints, environmental data, ward performance — published live, with download access."
          meta={<span>Public · CC-BY · refreshed every hour</span>}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-14">
          <MetricTile
            label="Annual revenue"
            value={2_84_50_00_000}
            format="currency-compact"
            trend="+11.2%"
            spark={SPARK(2)}
          />
          <MetricTile
            label="AQI · today"
            value={142}
            trend="moderate"
            spark={SPARK(5, -1)}
          />
          <MetricTile
            label="Population served"
            value={29_84_120}
            format="number-compact"
            trend="+2.1%"
            spark={SPARK(11)}
          />
          <MetricTile
            label="Tree cover"
            value={31}
            unit="%"
            trend="+0.4%"
            spark={SPARK(13)}
          />
        </div>

        {/* Ward leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 sm:gap-8 items-start">
          <div className="surface-card hairline rounded-[24px] p-6 sm:p-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <SectionLabel>Ward performance</SectionLabel>
                <h3 className="font-display mt-3 text-xl sm:text-2xl tracking-tight text-ink">
                  Composite civic score
                </h3>
              </div>
              <select className="text-[12px] uppercase tracking-[0.14em] text-ink-2 bg-ink/[0.04] rounded-full px-3 py-1.5 focus-ring">
                <option>This quarter</option>
                <option>Last quarter</option>
                <option>YTD</option>
              </select>
            </div>

            <div className="mt-6 space-y-3">
              {WARDS.map((w, i) => (
                <motion.div
                  key={w.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <span className="font-display tabular text-lg text-ink-3 w-6 text-right">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink font-medium">{w.name}</span>
                      <span className="tabular text-ink-2">{w.score}</span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-ink/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${w.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.04 }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                      />
                    </div>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-ink-3 tabular">
                      <span>{w.paid}% paid</span>
                      <span>·</span>
                      <span>{w.issues} open issues</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="surface-card hairline rounded-[20px] p-6">
              <SectionLabel>Datasets</SectionLabel>
              <div className="mt-5 space-y-3">
                {[
                  ["Property tax · 5y", "CSV · 12 MB"],
                  ["Complaints by ward", "CSV · 4 MB"],
                  ["Environment · AQI", "JSON · live"],
                  ["Budgets · 2024-26", "PDF · 8 MB"],
                  ["Tenders awarded", "CSV · 3 MB"],
                ].map(([label, meta]) => (
                  <a
                    key={label}
                    href="#"
                    className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-ink/[0.04] transition-colors group focus-ring"
                  >
                    <span>
                      <span className="block text-sm text-ink">{label}</span>
                      <span className="block text-[11px] text-ink-3">{meta}</span>
                    </span>
                    <Icon name="arrow" size={13} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
