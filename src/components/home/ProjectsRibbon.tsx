"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";
import { Icon } from "../Icon";

type Project = {
  title: string;
  ward: string;
  budget: string;
  progress: number;
  status: "in-progress" | "completed" | "tender";
  hue: string;
};

const PROJECTS: Project[] = [
  {
    title: "Dharampeth water main upgrade",
    ward: "Dharampeth",
    budget: "₹3.1 Cr",
    progress: 78,
    status: "in-progress",
    hue: "from-accent/40 via-accent/15 to-transparent",
  },
  {
    title: "Sitabuldi smart streetlights",
    ward: "Sitabuldi",
    budget: "₹1.8 Cr",
    progress: 92,
    status: "in-progress",
    hue: "from-heritage/40 via-heritage/15 to-transparent",
  },
  {
    title: "Futala lakefront restoration",
    ward: "Civil Lines",
    budget: "₹6.4 Cr",
    progress: 100,
    status: "completed",
    hue: "from-sage/40 via-sage/15 to-transparent",
  },
  {
    title: "Ambazari park revival",
    ward: "Ambazari",
    budget: "₹2.2 Cr",
    progress: 34,
    status: "in-progress",
    hue: "from-amber/40 via-amber/15 to-transparent",
  },
  {
    title: "Wardha Road BRT corridor",
    ward: "Wardha Road",
    budget: "₹14.7 Cr",
    progress: 0,
    status: "tender",
    hue: "from-ink/30 via-ink/10 to-transparent",
  },
];

export function ProjectsRibbon() {
  return (
    <Section className="mt-20 sm:mt-28">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-6 sm:mb-8">
        <div>
          <SectionLabel>Where your tax goes</SectionLabel>
          <h2 className="font-display mt-3 text-[clamp(28px,4vw,44px)] font-medium tracking-tight text-ink leading-[1.05]">
            Live projects <span className="italic font-light text-ink-2">across the city.</span>
          </h2>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors focus-ring rounded"
        >
          See all 47 projects <Icon name="arrow" size={13} />
        </Link>
      </div>

      <div className="-mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 min-w-max pb-2">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.05,
              }}
              className="relative w-[300px] sm:w-[340px] surface-card hairline rounded-[20px] overflow-hidden"
            >
              <div className={`relative h-32 bg-gradient-to-br ${p.hue} bg-bg-2`}>
                <div className="absolute inset-0 opacity-50">
                  <svg viewBox="0 0 340 128" className="w-full h-full">
                    <defs>
                      <pattern
                        id={`grid-${i}`}
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          opacity="0.18"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
                  </svg>
                </div>
                <span
                  className={
                    "absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] font-medium " +
                    (p.status === "completed"
                      ? "bg-sage/15 text-sage"
                      : p.status === "in-progress"
                      ? "bg-ink/10 text-ink-2"
                      : "bg-amber/15 text-amber")
                  }
                >
                  {p.status === "completed" ? "Done" : p.status === "in-progress" ? "Live" : "Tender"}
                </span>
                <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.16em] text-ink-3">
                  {p.ward} ward
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl tracking-tight text-ink leading-tight">
                  {p.title}
                </h3>
                <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  <span className="tabular text-ink-2">{p.budget}</span>
                  <span className="tabular">{p.progress}%</span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className={
                      "h-full rounded-full " +
                      (p.status === "completed" ? "bg-sage" : "bg-gradient-to-r from-accent to-accent-2")
                    }
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
