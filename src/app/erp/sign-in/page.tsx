"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ROLES, setCurrentRole, type Role } from "@/lib/erp";
import { Icon } from "@/components/Icon";

const ROLE_CARDS: {
  id: Role;
  emoji: string;
  blurb: string;
  capabilities: string[];
  hue: string;
}[] = [
  {
    id: "commissioner",
    emoji: "🎯",
    blurb: "City-wide intelligence · governance KPIs · escalation control · predictive risk.",
    capabilities: ["Risk heatmap", "Q4 forecast", "Escalation review", "Citizen sentiment"],
    hue: "from-accent/30 via-heritage/15 to-transparent",
  },
  {
    id: "cafo",
    emoji: "💼",
    blurb: "Revenue forecasting · defaulter targeting · reconciliation · campaign orchestration.",
    capabilities: ["Defaulter recovery", "Reconciliation", "Forecast next month", "Auto-reminders"],
    hue: "from-sage/30 via-heritage/15 to-transparent",
  },
  {
    id: "inspector",
    emoji: "🛠",
    blurb: "Geo-tagged tasks · AI route optimisation · SLA-aware queue · evidence-grade photos.",
    capabilities: ["Today's route", "SLA timers", "Photo upload", "Auto-routing"],
    hue: "from-amber/30 via-accent/15 to-transparent",
  },
  {
    id: "trade-officer",
    emoji: "🪪",
    blurb: "Approval queues · fraud signals · auto-renew low-risk · field coordination.",
    capabilities: ["Approval queue", "Fraud flags", "Auto-renew", "Inspection coord."],
    hue: "from-heritage/30 via-sage/15 to-transparent",
  },
  {
    id: "survey",
    emoji: "📐",
    blurb: "Property survey assignments · GIS sync · prioritised routes.",
    capabilities: ["Survey queue", "GIS sync", "Route plan"],
    hue: "from-accent/30 via-amber/15 to-transparent",
  },
  {
    id: "revenue",
    emoji: "💰",
    blurb: "Ward-level collection · due window targeting · door-to-door coordination.",
    capabilities: ["Ward queue", "Due windows", "Door-to-door"],
    hue: "from-sage/30 via-accent/15 to-transparent",
  },
];

export default function ErpSignInPage() {
  const router = useRouter();

  const enter = (id: Role) => {
    setCurrentRole(id);
    router.push(ROLES[id].homeHref);
  };

  return (
    <div className="dark min-h-svh bg-bg text-ink relative overflow-x-hidden">
      {/* Ambient grid + glow */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(226,88,34,0.10), transparent 70%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 pt-6 pb-2">
        <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-md">
          <span className="grid place-items-center h-9 w-9 rounded-md bg-ink text-bg shadow-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 3 L20 8 L20 16 L12 21 L4 16 L4 8 Z" stroke="#E25822" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="2" fill="#E25822" />
            </svg>
          </span>
          <span className="flex flex-col text-left leading-[1.1]">
            <span className="text-[12px] font-medium text-ink tracking-tight whitespace-nowrap">
              Nagpur Municipal Corporation
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
              Operations · Internal
            </span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-[12px] uppercase tracking-[0.14em] text-ink-3 hover:text-ink transition-colors focus-ring rounded"
        >
          Citizen view →
        </Link>
      </header>

      <section className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-12 pt-10 sm:pt-14 pb-20">
        <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3">
          <span className="h-px w-8 bg-line" />
          <span>Operations · authorised access</span>
        </div>

        <h1 className="font-display mt-5 text-[clamp(40px,6.5vw,84px)] font-medium leading-[0.96] tracking-tightest text-ink max-w-3xl">
          The municipal operating system{" "}
          <span className="italic font-light text-ink-2">— signed in as.</span>
        </h1>

        <p className="mt-7 text-base sm:text-[17px] text-ink-3 max-w-2xl leading-relaxed">
          Pick the role you&rsquo;re here as. The system reorders itself around your work — your queue, your KPIs, your AI insights, your escalations. Every screen that follows adapts.
        </p>

        <div className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="shield" size={11} />
            Govt-grade · Aadhaar + RBAC
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="lock" size={11} />
            Audited every action
          </span>
          <span>·</span>
          <span>Demo mode</span>
        </div>

        {/* Role cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {ROLE_CARDS.map((card, i) => {
            const profile = ROLES[card.id];
            return (
              <motion.button
                key={card.id}
                type="button"
                onClick={() => enter(card.id)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.06,
                }}
                className="group relative overflow-hidden text-left rounded-[18px] border border-line bg-surface/30 hover:bg-surface/60 hover:border-ink/15 p-6 transition-all focus-ring"
              >
                {/* Hue glow */}
                <div
                  aria-hidden
                  className={
                    "absolute -top-1/2 -right-1/4 h-[140%] w-[80%] rounded-full opacity-30 blur-3xl bg-gradient-to-br " +
                    card.hue
                  }
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">{card.emoji}</div>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-ink-4">
                      {card.id}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-[22px] tracking-tight text-ink leading-tight">
                    {profile.shortName}
                  </h3>
                  <div className="mt-1 text-[12px] text-ink-3">{profile.dept}</div>
                  <p className="mt-4 text-[13px] text-ink-2 leading-relaxed">
                    {card.blurb}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {card.capabilities.map((c) => (
                      <span
                        key={c}
                        className="rounded bg-bg/60 border border-line px-2 py-0.5 text-[10px] text-ink-3"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between text-[12px]">
                    <span className="text-ink-3">
                      Continue as <span className="text-ink">{profile.name}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-accent group-hover:translate-x-0.5 transition-transform">
                      Enter
                      <Icon name="arrow" size={11} />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-10 text-[11px] text-ink-4 leading-relaxed max-w-2xl">
          Demo mode lets you explore each role without credentials. In production, sign-in
          uses Aadhaar + role-based access control with biometric step-up for
          sensitive operations (recovery campaigns, large approvals, governance
          escalations).
        </p>
      </section>
    </div>
  );
}
