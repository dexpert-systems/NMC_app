"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";
import { Icon } from "../Icon";
import { NAV } from "@/lib/nav";

const FEATURED = [
  { href: "/property", featured: true },
  { href: "/report", featured: false },
  { href: "/services", featured: false },
  { href: "/map", featured: false },
  { href: "/projects", featured: false },
  { href: "/data", featured: false },
];

export function ServiceTiles() {
  const tiles = FEATURED.map((f) => {
    const item = NAV.find((n) => n.href === f.href)!;
    return { ...item, featured: f.featured };
  });

  return (
    <Section className="mt-20 sm:mt-28">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-6 sm:mb-8">
        <div>
          <SectionLabel>Everything you need</SectionLabel>
          <h2 className="font-display mt-3 text-[clamp(28px,4vw,44px)] font-medium tracking-tight text-ink leading-[1.05]">
            One platform, <span className="italic font-light text-ink-2">all civic services.</span>
          </h2>
        </div>
        <Link
          href="/ask"
          className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors focus-ring rounded"
        >
          Ask the AI to find anything <Icon name="arrow" size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {tiles.map((t, i) => (
          <motion.div
            key={t.href}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.05,
            }}
            className={t.featured ? "sm:col-span-2 lg:col-span-2" : ""}
          >
            <Link
              href={t.href}
              className={
                "group block surface-card hairline rounded-[24px] p-6 sm:p-7 transition-all hover:shadow-card hover:-translate-y-0.5 " +
                (t.featured ? "min-h-[260px] flex flex-col justify-between" : "")
              }
            >
              <div className="flex items-start justify-between">
                <span className="grid place-items-center h-11 w-11 rounded-xl bg-ink/[0.04] text-ink-2 group-hover:bg-accent-soft group-hover:text-accent transition-colors">
                  <Icon name={t.icon} size={18} />
                </span>
                <Icon name="chevron" size={16} />
              </div>
              <div className={t.featured ? "mt-auto pt-8" : "mt-6"}>
                <div className="font-display text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
                  {t.label}
                </div>
                <p className="mt-2 text-sm text-ink-3 leading-relaxed">
                  {t.blurb}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
