"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";
import { Icon } from "../Icon";

type Item = {
  kind: "event" | "poll" | "campaign";
  title: string;
  meta: string;
  cta: string;
  href: string;
};

const ITEMS: Item[] = [
  {
    kind: "event",
    title: "Orange City Marathon 2026",
    meta: "May 18 · Civil Lines · 12,400 registered",
    cta: "Register",
    href: "/community",
  },
  {
    kind: "poll",
    title: "Should we add a metro stop at Manish Nagar?",
    meta: "9,213 votes · 4 days left",
    cta: "Cast your vote",
    href: "/community",
  },
  {
    kind: "campaign",
    title: "Swachh Nagpur — Ward Cleanliness Drive",
    meta: "Volunteers needed · 5 wards · weekend",
    cta: "Join in",
    href: "/community",
  },
];

export function CommunityRow() {
  return (
    <Section className="mt-20 sm:mt-28">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-6 sm:mb-8">
        <div>
          <SectionLabel>The city is alive</SectionLabel>
          <h2 className="font-display mt-3 text-[clamp(28px,4vw,44px)] font-medium tracking-tight text-ink leading-[1.05]">
            Take part <span className="italic font-light text-ink-2">— this week.</span>
          </h2>
        </div>
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors focus-ring rounded"
        >
          Explore community <Icon name="arrow" size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.05,
            }}
          >
            <Link
              href={item.href}
              className="group block surface-card hairline rounded-[20px] p-5 sm:p-6 h-full transition-all hover:shadow-card hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    "rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] font-medium " +
                    (item.kind === "event"
                      ? "bg-heritage/10 text-heritage"
                      : item.kind === "poll"
                      ? "bg-accent-soft text-accent"
                      : "bg-sage/10 text-sage")
                  }
                >
                  {item.kind}
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-ink-4">
                  Featured
                </span>
              </div>
              <h3 className="font-display mt-4 text-xl sm:text-2xl tracking-tight text-ink leading-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-[13px] text-ink-3">{item.meta}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-ink-2 group-hover:text-ink transition-colors">
                {item.cta} <Icon name="arrow" size={13} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
