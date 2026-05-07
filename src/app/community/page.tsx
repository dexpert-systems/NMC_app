"use client";

import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { ModuleHero } from "@/components/ModuleHero";
import { Icon } from "@/components/Icon";

const EVENTS = [
  {
    title: "Orange City Marathon 2026",
    date: "May 18",
    where: "Civil Lines",
    spots: "12,400 / 15,000 registered",
    hue: "from-accent/40 via-accent/15 to-transparent",
  },
  {
    title: "Nag Nadi clean-up drive",
    date: "May 25",
    where: "Ambazari",
    spots: "Volunteers needed",
    hue: "from-sage/40 via-sage/15 to-transparent",
  },
  {
    title: "Heritage walk · old Mahal",
    date: "May 11",
    where: "Mahal",
    spots: "Free · drop in",
    hue: "from-heritage/40 via-heritage/15 to-transparent",
  },
];

const POLLS = [
  {
    q: "Should we add a metro stop at Manish Nagar?",
    yes: 71,
    no: 29,
    total: "9,213",
    days: 4,
  },
  {
    q: "Single-use plastic ban in city markets?",
    yes: 88,
    no: 12,
    total: "14,628",
    days: 9,
  },
];

const STORIES = [
  {
    tag: "Citizen story",
    title: "How a Sitabuldi shopkeeper helped fix his street",
    excerpt:
      "He filed 4 reports, joined the ward committee, and now sits in on weekly municipal reviews.",
  },
  {
    tag: "Spotlight",
    title: "Nagpur leads India in citizen-AI civic tools",
    excerpt: "Recognised at the SmartCity India Forum 2026 for the NMC platform.",
  },
];

export default function CommunityPage() {
  return (
    <SiteShell>
      <Section>
        <ModuleHero
          eyebrow="Community"
          title="The city is"
          italic="more than its services."
          description="Events, polls, volunteer drives, citizen stories — the social fabric of Nagpur, woven into one place."
          meta={<span>1,42,000 citizens active this month</span>}
        />
      </Section>

      <Section>
        <SectionLabel>Happening soon</SectionLabel>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {EVENTS.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="surface-card hairline rounded-[20px] overflow-hidden"
            >
              <div className={`h-32 bg-gradient-to-br ${e.hue} bg-bg-2 grid place-items-center`}>
                <div className="text-center">
                  <div className="font-display text-3xl text-ink-2 leading-none">
                    {e.date.split(" ")[1]}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3 mt-1">
                    {e.date.split(" ")[0]}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl tracking-tight text-ink leading-tight">
                  {e.title}
                </h3>
                <div className="mt-2 text-[12px] text-ink-3">
                  {e.where} · {e.spots}
                </div>
                <button className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink transition-colors focus-ring rounded">
                  Register <Icon name="arrow" size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="mt-20 sm:mt-28">
        <SectionLabel>Cast your vote</SectionLabel>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {POLLS.map((p, i) => (
            <motion.div
              key={p.q}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="surface-card hairline rounded-[24px] p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent live-dot" />
                Active poll · {p.days} days left
              </div>
              <h3 className="font-display mt-4 text-2xl tracking-tight text-ink leading-tight">
                {p.q}
              </h3>
              <div className="mt-6 space-y-2.5">
                <PollBar label="Yes" pct={p.yes} accent="bg-sage" />
                <PollBar label="No" pct={p.no} accent="bg-ink-3" />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-[12px] text-ink-3 tabular">
                  {p.total} votes · weighted by ward
                </span>
                <button className="rounded-full bg-ink text-bg px-4 py-2 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring">
                  Vote
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="mt-20 sm:mt-28">
        <SectionLabel>Stories from the city</SectionLabel>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {STORIES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="surface-card hairline rounded-[24px] p-6 sm:p-8"
            >
              <span className="rounded-full bg-accent-soft text-accent text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 font-medium">
                {s.tag}
              </span>
              <h3 className="font-display mt-5 text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] text-ink-2 leading-relaxed">
                {s.excerpt}
              </p>
              <button className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink transition-colors focus-ring rounded">
                Read story <Icon name="arrow" size={12} />
              </button>
            </motion.article>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}

function PollBar({
  label,
  pct,
  accent,
}: {
  label: string;
  pct: number;
  accent: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[12px] mb-1">
        <span className="text-ink-2">{label}</span>
        <span className="tabular text-ink-3">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full overflow-hidden bg-ink/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className={"h-full rounded-full " + accent}
        />
      </div>
    </div>
  );
}
