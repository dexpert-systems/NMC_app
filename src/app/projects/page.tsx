"use client";

import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { ModuleHero } from "@/components/ModuleHero";
import { Icon } from "@/components/Icon";
import { formatINR } from "@/lib/format";

const SUMMARY = [
  { label: "Active projects", value: "47" },
  { label: "Total value", value: "₹284 Cr" },
  { label: "Wards covered", value: "38 / 38" },
  { label: "On schedule", value: "82%" },
];

const PROJECTS = [
  {
    title: "Dharampeth water main upgrade",
    cat: "Water",
    ward: "Dharampeth",
    budget: 31_00_00_000,
    progress: 78,
    next: "Connection switchover · May 22",
    contractor: "AquaWorks Ltd.",
  },
  {
    title: "Sitabuldi smart streetlights",
    cat: "Energy",
    ward: "Sitabuldi",
    budget: 18_00_00_000,
    progress: 92,
    next: "Final inspection · Jun 4",
    contractor: "Voltic Pvt. Ltd.",
  },
  {
    title: "Ambazari park revival",
    cat: "Parks",
    ward: "Ambazari",
    budget: 22_00_00_000,
    progress: 34,
    next: "Lake desilting begins · Jul 1",
    contractor: "GreenCity Build",
  },
  {
    title: "Wardha Road BRT corridor",
    cat: "Mobility",
    ward: "Wardha Road",
    budget: 147_00_00_000,
    progress: 0,
    next: "Tender open · closes Jun 30",
    contractor: "Tender stage",
  },
];

export default function ProjectsPage() {
  return (
    <SiteShell>
      <Section>
        <ModuleHero
          eyebrow="Transparency"
          title="Every rupee,"
          italic="every project, in plain sight."
          description="Live progress on every active civic project — funded by your taxes, run by your city, traceable to the line item."
          meta={
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot" />
              Updated daily by NMC project office
            </span>
          }
        />
      </Section>

      <Section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {SUMMARY.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="surface-card hairline rounded-[20px] p-5"
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
                {s.label}
              </div>
              <div className="font-display mt-3 tabular text-[clamp(28px,4.5vw,40px)] font-medium text-ink leading-none tracking-tight">
                {s.value}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionLabel>Live projects</SectionLabel>
        <div className="mt-6 space-y-3 sm:space-y-4">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              className="surface-card hairline rounded-[20px] p-6 sm:p-7"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-5 lg:gap-8 items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-ink/[0.04] text-ink-2 text-[10px] uppercase tracking-[0.14em] px-2.5 py-1">
                      {p.cat}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-ink-3">
                      {p.ward} ward
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
                    {p.title}
                  </h3>
                  <div className="mt-3 text-[13px] text-ink-3">
                    Contractor · <span className="text-ink-2">{p.contractor}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
                    Budget
                  </div>
                  <div className="font-display tabular text-2xl text-ink leading-none mt-1">
                    {formatINR(p.budget)}
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink-3 mb-1.5">
                      <span>Progress</span>
                      <span className="tabular text-ink-2">{p.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className={
                          "h-full rounded-full " +
                          (p.progress === 0
                            ? "bg-ink/20"
                            : p.progress >= 90
                            ? "bg-sage"
                            : "bg-gradient-to-r from-accent to-accent-2")
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
                    What&rsquo;s next
                  </div>
                  <p className="text-[13px] text-ink-2 mt-1.5">{p.next}</p>
                  <button className="mt-4 inline-flex items-center gap-2 text-[13px] text-ink-2 hover:text-ink transition-colors focus-ring rounded">
                    Project page <Icon name="arrow" size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Tenders */}
      <Section className="mt-20 sm:mt-28">
        <SectionLabel>Open tenders</SectionLabel>
        <h2 className="font-display mt-4 text-[clamp(28px,4vw,44px)] font-medium tracking-tight text-ink leading-[1.05]">
          Bid, build, <span className="italic font-light text-ink-2">be part of Nagpur.</span>
        </h2>
        <p className="mt-4 text-base text-ink-3 max-w-xl leading-relaxed">
          12 active tenders worth ₹187 Cr. Detailed specs, transparent
          evaluation, blockchain-anchored audit trail.
        </p>
        <button className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink text-bg px-5 py-3 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring">
          Browse tenders <Icon name="arrow" size={13} />
        </button>
      </Section>
    </SiteShell>
  );
}
