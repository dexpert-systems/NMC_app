"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "../Icon";

type Slide = {
  tag: string;
  title: string;
  italic?: string;
  blurb: string;
  hue: string;
  visual: React.ReactNode;
};

const SLIDES: Slide[] = [
  {
    tag: "Property tax",
    title: "Pay in",
    italic: "30 seconds.",
    blurb: "Find · explain · pay — UPI in one tap. Receipt before you blink.",
    hue: "from-accent/30 via-accent/10 to-transparent",
    visual: <PayVisual />,
  },
  {
    tag: "Civic AI",
    title: "Ask anything,",
    italic: "in any language.",
    blurb: "English, हिन्दी, मराठी — type or speak. The city responds.",
    hue: "from-heritage/30 via-heritage/10 to-transparent",
    visual: <AskVisual />,
  },
  {
    tag: "Live tracking",
    title: "Report once,",
    italic: "watch it move.",
    blurb: "Photo, voice, geotag. AI auto-routes. Live status like a delivery.",
    hue: "from-sage/30 via-sage/10 to-transparent",
    visual: <ReportVisual />,
  },
  {
    tag: "Civic services",
    title: "42 services,",
    italic: "no queues.",
    blurb: "Birth & death · trade license · water · NOC · building permits.",
    hue: "from-amber/30 via-amber/10 to-transparent",
    visual: <CertificateVisual />,
  },
  {
    tag: "Smart city map",
    title: "See your city,",
    italic: "ward by ward.",
    blurb: "Projects, water lines, complaints — every layer of Nagpur, live.",
    hue: "from-heritage/30 via-accent/10 to-transparent",
    visual: <MapVisual />,
  },
  {
    tag: "Transparency",
    title: "Every rupee,",
    italic: "in plain sight.",
    blurb: "Live progress on 47 active projects. Funded by you.",
    hue: "from-sage/30 via-amber/10 to-transparent",
    visual: <ProjectsVisual />,
  },
  {
    tag: "Alerts",
    title: "The city,",
    italic: "when it matters.",
    blurb: "Weather · water · health · traffic. Verified by NMC, the moment it&rsquo;s issued.",
    hue: "from-amber/30 via-danger/10 to-transparent",
    visual: <AlertVisual />,
  },
];

export function ServiceSlider() {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const tRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (hover) return;
    tRef.current = setInterval(() => {
      setI((x) => (x + 1) % SLIDES.length);
    }, 3000);
    return () => {
      if (tRef.current) clearInterval(tRef.current);
    };
  }, [hover]);

  const slide = SLIDES[i];

  return (
    <div
      className="relative w-full max-w-[480px] mx-auto"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ perspective: 2000 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative"
      >
        {/* Glow */}
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[40px] opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(226,88,34,0.30), transparent 70%)",
          }}
        />

        <div className="relative rounded-[28px] surface-card hairline overflow-hidden shadow-lifted h-[460px] sm:h-[500px]">
          {/* Tag header */}
          <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
            <motion.span
              key={`tag-${i}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full bg-ink/[0.04] backdrop-blur-md text-ink-2 text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 font-medium"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {slide.tag}
            </motion.span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-ink-4 tabular">
              {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>

          {/* Visual stage */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.hue}`} />
          <div className="relative h-[58%] grid place-items-center">
            <motion.div
              key={`visual-${i}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="px-6"
            >
              {slide.visual}
            </motion.div>
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-8 bg-gradient-to-t from-surface via-surface/95 to-transparent">
            <motion.div
              key={`caption-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
                <h3 className="font-display text-[clamp(22px,3.6vw,30px)] font-medium tracking-tight text-ink leading-[1.05]">
                  {slide.title}{" "}
                  {slide.italic && (
                    <span className="italic font-light text-ink-2">
                      {slide.italic}
                    </span>
                  )}
                </h3>
                <p
                  className="mt-2 text-[13px] text-ink-3 leading-relaxed max-w-md"
                  dangerouslySetInnerHTML={{ __html: slide.blurb }}
                />
              </motion.div>

            {/* Progress dots */}
            <div className="mt-4 flex items-center gap-1.5">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className="group relative h-1.5 rounded-full overflow-hidden bg-ink/[0.08] focus-ring"
                  style={{ width: idx === i ? "28px" : "10px", transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)" }}
                >
                  {idx === i && !hover && (
                    <motion.span
                      key={i}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-ink"
                    />
                  )}
                  {idx === i && hover && (
                    <span className="absolute inset-0 bg-ink" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating chip — shows AI overlay */}
      <motion.div
        initial={{ opacity: 0, y: 16, x: 16 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
        className="absolute -bottom-5 -right-2 sm:-right-6 glass shadow-lifted rounded-2xl px-4 py-3 max-w-[260px] z-20"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="grid place-items-center h-6 w-6 rounded-full bg-accent-soft text-accent">
            <Icon name="spark" size={11} />
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-ink-3">
            42 services · 1 platform
          </span>
        </div>
        <p className="text-[12px] text-ink leading-snug">
          Sign in once. Use everything.
        </p>
      </motion.div>
    </div>
  );
}

/* ────────── Service visuals (anonymized) ────────── */

function PayVisual() {
  return (
    <div className="relative w-full max-w-[280px] rounded-2xl bg-surface/85 backdrop-blur-sm border border-line p-4 shadow-card">
      <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-ink-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-accent" />
          Bill
        </span>
        <span className="tabular text-ink-4">●●●●-●●●●</span>
      </div>
      <div className="mt-3 text-ink-3 text-[12px]">●●●●●●● Ward</div>
      <div className="font-display tabular text-3xl font-medium leading-none mt-2 text-ink">
        ₹X,XXX
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ink/[0.06]">
        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-accent to-accent-2" />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink text-bg px-3 py-2 text-[11px] font-medium">
          Pay with UPI
          <span className="grid place-items-center h-4 w-4 rounded-full bg-accent text-white">
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function AskVisual() {
  return (
    <div className="relative w-full max-w-[300px] space-y-2">
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-br-sm bg-ink text-bg px-3.5 py-2 text-[12px] max-w-[80%]">
          Why is my bill high?
        </div>
      </div>
      <div className="flex items-start gap-2">
        <span className="grid place-items-center h-6 w-6 rounded-full bg-accent-soft text-accent shrink-0 mt-0.5">
          <Icon name="spark" size={10} />
        </span>
        <div className="rounded-2xl rounded-bl-sm bg-surface/90 backdrop-blur-sm border border-line px-3.5 py-2 text-[12px] text-ink-2 leading-relaxed">
          Mostly the water cess revision. You qualify for a ₹240 rebate if you pay
          before May 31.
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 pt-1">
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink-4">
          English · हिन्दी · मराठी
        </span>
      </div>
    </div>
  );
}

function ReportVisual() {
  return (
    <div className="relative w-full max-w-[300px] rounded-2xl bg-surface/85 backdrop-blur-sm border border-line p-4 shadow-card">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-sage live-dot" /> Live
        <span className="ml-auto tabular text-ink-4">NMC-RP-XXXX</span>
      </div>
      <div className="space-y-2.5">
        {[
          { stage: "Submitted", on: true, current: false },
          { stage: "AI routed", on: true, current: false },
          { stage: "Crew assigned", on: true, current: true },
          { stage: "On the way", on: false, current: false },
          { stage: "Resolved", on: false, current: false },
        ].map((s) => (
          <div key={s.stage} className="flex items-center gap-2.5">
            <span
              className={
                "h-4 w-4 rounded-full grid place-items-center text-[8px] font-bold " +
                (s.current
                  ? "bg-accent text-white"
                  : s.on
                  ? "bg-sage text-white"
                  : "bg-ink/[0.06] text-ink-3")
              }
            >
              {s.on && !s.current ? "✓" : ""}
            </span>
            <span
              className={
                "text-[12px] " + (s.current ? "text-ink font-medium" : "text-ink-3")
              }
            >
              {s.stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificateVisual() {
  return (
    <div className="relative w-full max-w-[280px] rounded-2xl bg-surface/85 backdrop-blur-sm border border-line p-5 shadow-card">
      <div className="text-[9px] uppercase tracking-[0.22em] text-ink-3 text-center">
        Government of Maharashtra
      </div>
      <div className="font-display text-center mt-2 text-lg tracking-tight text-ink">
        Birth Certificate
      </div>
      <div className="mt-3 space-y-1.5">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.14em] text-ink-4 w-12">
              Field {n}
            </span>
            <span className="flex-1 h-2 rounded-full bg-ink/[0.06]" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 right-3 grid place-items-center h-12 w-12 rounded-full border-2 border-accent text-accent">
        <span className="text-[8px] uppercase tracking-[0.12em] font-bold leading-none text-center">
          NMC
          <br />
          Verified
        </span>
      </div>
    </div>
  );
}

function MapVisual() {
  return (
    <div className="relative w-[280px] sm:w-[300px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#EAE3D2] via-[#E5DECA] to-[#D9DCC8] overflow-hidden shadow-card border border-line">
      <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 75" preserveAspectRatio="none">
        <defs>
          <pattern id="ms-grid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="#0B1E3F" strokeWidth="0.2" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100" height="75" fill="url(#ms-grid)" />
        <path d="M0 40 Q40 35, 100 45" stroke="#fff" strokeWidth="0.7" opacity="0.7" fill="none" />
        <path d="M30 0 Q35 40, 40 75" stroke="#fff" strokeWidth="0.5" opacity="0.55" fill="none" />
      </svg>
      {[
        { x: 25, y: 30, c: "#E25822" },
        { x: 60, y: 25, c: "#1A3A5C" },
        { x: 70, y: 55, c: "#4F8B5C" },
        { x: 35, y: 60, c: "#C97A0E" },
      ].map((p, idx) => (
        <span
          key={idx}
          className="absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span
            className="absolute h-5 w-5 rounded-full opacity-30 animate-ping"
            style={{ background: p.c, animationDuration: "2.4s" }}
          />
          <span
            className="relative h-2.5 w-2.5 rounded-full ring-2 ring-white/80"
            style={{ background: p.c }}
          />
        </span>
      ))}
    </div>
  );
}

function ProjectsVisual() {
  const projects = [
    { name: "Water main", pct: 78, color: "from-accent to-accent-2" },
    { name: "Streetlights", pct: 92, color: "from-heritage to-heritage" },
    { name: "Park revival", pct: 34, color: "from-sage to-sage" },
  ];
  return (
    <div className="relative w-full max-w-[300px] rounded-2xl bg-surface/85 backdrop-blur-sm border border-line p-4 shadow-card">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-3">
        <span>Live projects</span>
        <span className="tabular text-ink-4">3 of 47</span>
      </div>
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.name}>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-ink-2">{p.name}</span>
              <span className="tabular text-ink-3">{p.pct}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-ink/[0.06]">
              <div
                className={"h-full rounded-full bg-gradient-to-r " + p.color}
                style={{ width: `${p.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertVisual() {
  return (
    <div className="relative w-full max-w-[300px] rounded-2xl bg-surface/85 backdrop-blur-sm border border-line p-4 shadow-card">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber/10 text-amber text-[10px] uppercase tracking-[0.16em] font-semibold px-2.5 py-1 mb-3">
        <span className="h-1 w-1 rounded-full bg-amber live-dot" />
        Advisory
      </div>
      <div className="font-display text-base tracking-tight text-ink leading-snug">
        Yellow alert · heavy rain
      </div>
      <p className="mt-2 text-[11px] text-ink-3 leading-relaxed">
        80–110mm forecast over the next 36 hours. Avoid waterlogged areas.
      </p>
      <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-4">
        <span>City-wide</span>
        <span>·</span>
        <span>6 PM onwards</span>
      </div>
    </div>
  );
}
