"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { ModuleHero } from "@/components/ModuleHero";
import { Icon } from "@/components/Icon";

const LAYERS = [
  { id: "tax", label: "Tax zones", color: "bg-accent" },
  { id: "water", label: "Water lines", color: "bg-heritage" },
  { id: "roads", label: "Road projects", color: "bg-amber" },
  { id: "parks", label: "Parks & green", color: "bg-sage" },
  { id: "complaints", label: "Open complaints", color: "bg-danger" },
];

const PINS = [
  { x: 30, y: 35, color: "#E25822", label: "Dharampeth · 73% paid" },
  { x: 55, y: 22, color: "#1A3A5C", label: "Civil Lines water main" },
  { x: 70, y: 60, color: "#4F8B5C", label: "Futala lakefront — done" },
  { x: 25, y: 70, color: "#C97A0E", label: "Wardha Rd BRT corridor" },
  { x: 78, y: 38, color: "#B0331A", label: "Reported pothole · 4h ago" },
];

export default function MapPage() {
  const [active, setActive] = useState<Record<string, boolean>>({
    tax: true,
    water: true,
    roads: true,
    parks: false,
    complaints: true,
  });

  return (
    <SiteShell>
      <Section>
        <ModuleHero
          eyebrow="Smart city map"
          title="See the city"
          italic="like the city sees itself."
          description="Wards, properties, water lines, road projects, complaints — every layer of Nagpur in one interactive surface."
          meta={
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot" />
              Live data · refreshed every 30s
            </span>
          }
        />
      </Section>

      <Section className="mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          {/* Map surface */}
          <div className="relative h-[520px] sm:h-[640px] rounded-[24px] overflow-hidden surface-card hairline">
            {/* Stylized base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#EAE3D2] via-[#E5DECA] to-[#D9DCC8]" />
            {/* Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden>
              <defs>
                <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#0B1E3F"
                    strokeWidth="0.5"
                    opacity="0.18"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
            </svg>
            {/* Roads */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden>
              <path d="M0 30 Q30 20, 60 35 T100 30" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" fill="none" />
              <path d="M0 55 Q40 50, 80 60 T100 55" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.55" fill="none" />
              <path d="M40 0 Q45 35, 50 80" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.55" fill="none" />
            </svg>
            {/* Pins */}
            {PINS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.4 + i * 0.08,
                }}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span className="relative grid place-items-center">
                  <span
                    className="absolute h-7 w-7 rounded-full opacity-30 animate-ping"
                    style={{ background: p.color, animationDuration: "2.4s" }}
                  />
                  <span
                    className="relative h-3 w-3 rounded-full ring-4 ring-white/80 shadow-lifted"
                    style={{ background: p.color }}
                  />
                </span>
              </motion.div>
            ))}
            {/* Floating info card */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:max-w-[300px] glass rounded-2xl p-4 shadow-card">
              <div className="text-[10px] uppercase tracking-[0.16em] text-ink-3">
                Selected
              </div>
              <div className="font-display text-lg text-ink leading-tight mt-1">
                Plot 47, Dharampeth Ward
              </div>
              <div className="mt-2 text-[12px] text-ink-3">
                Residential · ₹4,820 due · 73% of ward has paid
              </div>
              <button className="mt-3 text-[12px] text-ink-2 hover:text-ink underline underline-offset-2 focus-ring rounded">
                Open property →
              </button>
            </div>
            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5">
              <ControlBtn>+</ControlBtn>
              <ControlBtn>−</ControlBtn>
              <ControlBtn>
                <Icon name="map" size={14} />
              </ControlBtn>
            </div>
          </div>

          {/* Layer panel */}
          <aside className="space-y-3">
            <div className="surface-card hairline rounded-[20px] p-5">
              <SectionLabel>Layers</SectionLabel>
              <div className="mt-4 space-y-2.5">
                {LAYERS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setActive((a) => ({ ...a, [l.id]: !a[l.id] }))}
                    className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-ink/[0.04] transition-colors focus-ring"
                  >
                    <span className="flex items-center gap-2.5 text-sm text-ink">
                      <span className={"h-2.5 w-2.5 rounded-sm " + l.color} />
                      {l.label}
                    </span>
                    <span
                      className={
                        "relative h-5 w-9 rounded-full transition-colors " +
                        (active[l.id] ? "bg-ink" : "bg-ink/15")
                      }
                    >
                      <span
                        className={
                          "absolute top-0.5 h-4 w-4 rounded-full bg-bg transition-all " +
                          (active[l.id] ? "left-4" : "left-0.5")
                        }
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="surface-card hairline rounded-[20px] p-5">
              <SectionLabel>Search</SectionLabel>
              <div className="mt-3 flex items-center gap-2 rounded-full bg-ink/[0.04] px-3 py-2">
                <Icon name="search" size={14} />
                <input
                  placeholder="Find ward, project, address…"
                  className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink-3 focus-ring rounded"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Dharampeth", "Civil Lines", "Sitabuldi", "Wardha Rd"].map((w) => (
                  <button
                    key={w}
                    className="text-[11px] rounded-full bg-surface/60 hover:bg-surface text-ink-3 hover:text-ink border border-line px-2.5 py-1 focus-ring transition-colors"
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div className="surface-card hairline rounded-[20px] p-5">
              <SectionLabel>Stats</SectionLabel>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <Stat k="Wards" v="38" />
                <Stat k="Projects" v="47" />
                <Stat k="Open issues" v="328" />
                <Stat k="Survey done" v="91%" />
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </SiteShell>
  );
}

function ControlBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="grid place-items-center h-9 w-9 rounded-full glass shadow-soft text-ink-2 hover:text-ink focus-ring transition-colors"
    >
      {children}
    </button>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-ink/[0.03] px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">
        {k}
      </div>
      <div className="font-display text-lg tabular text-ink leading-tight mt-0.5">
        {v}
      </div>
    </div>
  );
}
