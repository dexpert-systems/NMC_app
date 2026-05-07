"use client";

import { Section } from "../Section";
import { SectionLabel } from "../SectionLabel";
import { MetricTile } from "../MetricTile";

const SPARK = (seed: number) =>
  Array.from({ length: 14 }, (_, i) =>
    Math.round(40 + 30 * Math.sin(seed + i * 0.6) + (i * 5) / 3),
  );

export function CivicPulse() {
  return (
    <Section className="mt-20 sm:mt-28">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-6 sm:mb-8">
        <div>
          <SectionLabel>The city, right now</SectionLabel>
          <h2 className="font-display mt-3 text-[clamp(28px,4vw,44px)] font-medium tracking-tight text-ink leading-[1.05]">
            Civic pulse <span className="italic font-light text-ink-2">— last 24 hours</span>
          </h2>
        </div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
          updated 12 sec ago
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <MetricTile
          label="Citizens served"
          value={73294}
          trend="+8.1%"
          spark={SPARK(5)}
        />
        <MetricTile
          label="Issues resolved"
          value={1284}
          unit="of 1,612"
          trend="79%"
          spark={SPARK(7)}
        />
        <MetricTile
          label="Avg. response time"
          value={42}
          unit="min"
          trend="-9 min"
          spark={SPARK(11)}
        />
      </div>
    </Section>
  );
}
