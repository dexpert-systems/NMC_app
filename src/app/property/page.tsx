"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { ModuleHero } from "@/components/ModuleHero";
import { Icon } from "@/components/Icon";
import { formatINR } from "@/lib/format";

const PAID = [
  { period: "Q2 · 2025–26", amount: 4640, date: "Jan 14, 2026", method: "UPI · GPay", txn: "NMC8K3AX2918" },
  { period: "Q1 · 2025–26", amount: 4480, date: "Oct 9, 2025", method: "UPI · PhonePe", txn: "NMC2P9LM7124" },
  { period: "Q4 · 2024–25", amount: 4380, date: "Jul 4, 2025", method: "Net banking", txn: "NMCRF44Z0094" },
  { period: "Q3 · 2024–25", amount: 4380, date: "Apr 3, 2025", method: "UPI · GPay", txn: "NMCXX12MM042" },
];

export default function PropertyPage() {
  return (
    <SiteShell>
      <Section>
        <ModuleHero
          eyebrow="Property tax"
          title="Pay, understand,"
          italic="and trace every rupee."
          description="Find your property in seconds. Get a visual bill that explains itself. Pay with one tap. Watch where the money goes."
          cta={
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-full bg-ink text-bg px-6 py-3.5 text-sm font-medium shadow-lifted hover:scale-[1.01] active:scale-[0.99] transition-transform focus-ring"
            >
              See current dues
              <span className="grid place-items-center h-7 w-7 rounded-full bg-accent text-white">
                <Icon name="arrow" size={13} />
              </span>
            </Link>
          }
          meta={
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              73% of your ward has paid this quarter
            </span>
          }
        />
      </Section>

      <Section className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          <FeatureCard
            icon="search"
            title="Find your property"
            blurb="By mobile, ID, or pick on a map — no forms."
          />
          <FeatureCard
            icon="spark"
            title="Why this amount?"
            blurb="Inline AI explanations of every cess and rebate."
          />
          <FeatureCard
            icon="check"
            title="Pay in 30 seconds"
            blurb="UPI · QR · Net banking · cards. End-to-end encrypted."
          />
        </div>
      </Section>

      {/* Payment history */}
      <Section className="mt-20 sm:mt-28">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6 sm:mb-8">
          <div>
            <SectionLabel>Your record</SectionLabel>
            <h2 className="font-display mt-3 text-[clamp(28px,4vw,44px)] font-medium tracking-tight text-ink leading-[1.05]">
              Payment timeline
            </h2>
          </div>
          <span className="text-sm text-ink-3 tabular">
            Total paid since 2022 ·{" "}
            <span className="text-ink font-medium">{formatINR(63420)}</span>
          </span>
        </div>

        <div className="surface-card hairline rounded-[24px] overflow-hidden">
          {PAID.map((p, i) => (
            <motion.div
              key={p.txn}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              className={
                "flex items-center gap-4 sm:gap-6 px-5 sm:px-7 py-5 " +
                (i < PAID.length - 1 ? "border-b border-line-soft" : "")
              }
            >
              <div className="hidden sm:block">
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-sage/10 text-sage">
                  <Icon name="check" size={16} />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg sm:text-xl tracking-tight text-ink">
                  {p.period}
                </div>
                <div className="mt-0.5 text-[13px] text-ink-3">
                  {p.date} · {p.method} ·{" "}
                  <span className="tabular text-ink-4">{p.txn}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display tabular text-2xl text-ink leading-none">
                  {formatINR(p.amount)}
                </div>
                <button className="mt-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors underline underline-offset-2 focus-ring rounded">
                  Receipt
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Visual breakdown teaser */}
      <Section className="mt-20 sm:mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div>
            <SectionLabel>How your tax is calculated</SectionLabel>
            <h2 className="font-display mt-4 text-[clamp(32px,5vw,56px)] font-medium tracking-tightest text-ink leading-[0.98]">
              No more <span className="italic font-light text-ink-2">cryptic columns.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-ink-3 max-w-md leading-relaxed">
              Every rupee in your bill, explained as a sentence. Every rebate
              you qualify for, surfaced automatically.
            </p>
            <Link
              href="/ask?q=Why+is+my+bill+high"
              className="mt-7 inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors focus-ring rounded"
            >
              Ask the AI to explain yours <Icon name="arrow" size={13} />
            </Link>
          </div>

          <div className="surface-card hairline rounded-[24px] p-6 sm:p-8">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-2">
              Q3 · 2025–26
            </div>
            <div className="font-display tabular text-4xl sm:text-5xl font-medium leading-none text-ink">
              ₹4,820
            </div>
            <div className="mt-6 space-y-3 text-sm">
              {[
                ["General tax", 2200, "bg-accent"],
                ["Water benefit", 980, "bg-heritage"],
                ["Sewerage", 740, "bg-sage"],
                ["Education cess", 460, "bg-amber"],
                ["Tree cess", 240, "bg-ink-3"],
                ["Fire cess", 200, "bg-danger/70"],
              ].map(([label, amt, bg]) => (
                <div key={label as string} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-ink-2">
                    <span className={"h-2.5 w-2.5 rounded-sm " + bg} />
                    {label}
                  </span>
                  <span className="tabular text-ink">{formatINR(amt as number)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function FeatureCard({
  icon,
  title,
  blurb,
}: {
  icon: "search" | "spark" | "check";
  title: string;
  blurb: string;
}) {
  return (
    <div className="surface-card hairline rounded-[20px] p-6">
      <span className="grid place-items-center h-10 w-10 rounded-xl bg-ink/[0.04] text-ink-2">
        <Icon name={icon} size={16} />
      </span>
      <h3 className="font-display mt-5 text-xl tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-2 text-sm text-ink-3 leading-relaxed">{blurb}</p>
    </div>
  );
}
