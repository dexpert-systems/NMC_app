"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { ModuleHero } from "@/components/ModuleHero";
import { Icon } from "@/components/Icon";

type Service = {
  slug: string;
  emoji: string;
  title: string;
  blurb: string;
  time: string;
  popular?: boolean;
  href?: string;
};

const SERVICES: Service[] = [
  { slug: "birth", emoji: "👶", title: "Birth certificate", blurb: "New issue, correction, duplicate", time: "2 days", popular: true },
  { slug: "death", emoji: "🕊", title: "Death certificate", blurb: "New issue, correction, duplicate", time: "2 days" },
  { slug: "trade", emoji: "🪪", title: "Trade license", blurb: "New / renewal · for shops & businesses", time: "5 days", popular: true, href: "/services/trade-license" },
  { slug: "water", emoji: "💧", title: "Water connection", blurb: "New · disconnection · meter change", time: "7 days" },
  { slug: "build", emoji: "🏗", title: "Building permission", blurb: "Plan approval · occupancy", time: "21 days" },
  { slug: "mut", emoji: "📜", title: "Mutation", blurb: "Property record update", time: "10 days" },
  { slug: "noc", emoji: "✅", title: "NOCs", blurb: "Fire · health · road cutting", time: "5 days" },
  { slug: "marriage", emoji: "💍", title: "Marriage registration", blurb: "New · duplicate", time: "3 days" },
  { slug: "pet", emoji: "🐕", title: "Pet license", blurb: "New · renewal", time: "1 day" },
];

export default function ServicesPage() {
  return (
    <SiteShell>
      <Section>
        <ModuleHero
          eyebrow="Civic services"
          title="Every service,"
          italic="a conversation."
          description="Certificates, licenses, NOCs — all guided by AI, auto-validated documents, no queues, no forms longer than they need to be."
          meta={
            <span>
              42 services online · all status tracked · digital locker
            </span>
          }
        />
      </Section>

      <Section className="mt-2">
        <div className="surface-card hairline rounded-full px-4 py-2 flex items-center gap-3 max-w-2xl mb-8">
          <Icon name="search" size={14} />
          <input
            placeholder="Search services… birth certificate, water connection, NOC"
            className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink-3 focus-ring rounded"
          />
          <span className="text-[10px] uppercase tracking-[0.16em] text-ink-4">
            42 services
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
            >
              <Link
                href={s.href ?? "#"}
                className="group relative block surface-card hairline rounded-[20px] p-6 transition-all hover:shadow-card hover:-translate-y-0.5"
              >
                {s.popular && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-accent-soft text-accent text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 font-medium">
                    Popular
                  </span>
                )}
                <span className="text-3xl">{s.emoji}</span>
                <h3 className="font-display mt-4 text-xl tracking-tight text-ink leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-ink-3 leading-relaxed">{s.blurb}</p>
                <div className="mt-5 flex items-center justify-between text-[12px]">
                  <span className="text-ink-3">~ {s.time}</span>
                  <span className="inline-flex items-center gap-1 text-ink-2 group-hover:text-ink transition-colors">
                    Start <Icon name="arrow" size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* In-progress applications */}
      <Section className="mt-20 sm:mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 items-start">
          <div>
            <SectionLabel>Your applications</SectionLabel>
            <h2 className="font-display mt-4 text-[clamp(32px,5vw,56px)] font-medium tracking-tightest text-ink leading-[0.98]">
              Track like <span className="italic font-light text-ink-2">a delivery.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-ink-3 max-w-md leading-relaxed">
              From submission to certificate-in-hand, watch every step. Get
              notified the moment something needs your attention.
            </p>
          </div>

          <div className="surface-card hairline rounded-[24px] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  Open application
                </div>
                <div className="font-display mt-1 text-2xl text-ink leading-tight">
                  Birth certificate
                </div>
                <div className="text-[12px] text-ink-3 mt-1 tabular">
                  NMC-BR-2026-04823 · submitted Apr 28
                </div>
              </div>
              <span className="rounded-full bg-amber/10 text-amber text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 font-medium">
                Verifying
              </span>
            </div>

            <div className="mt-7 grid grid-cols-4 gap-1">
              {["Submitted", "Documents OK", "Verifying", "Issued"].map((s, i) => {
                const filled = i <= 2;
                const active = i === 2;
                return (
                  <div key={s}>
                    <div
                      className={
                        "h-1 rounded-full " +
                        (filled
                          ? active
                            ? "bg-amber"
                            : "bg-sage"
                          : "bg-ink/[0.08]")
                      }
                    />
                    <div className="mt-2 text-[11px] text-ink-3">{s}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <Field k="Applicant" v="Aarav Kumar" />
              <Field k="Place of birth" v="Lata Mangeshkar Hosp." />
              <Field k="Documents" v="3 of 3 verified" />
              <Field k="Estimated" v="2 working days" />
            </div>

            <div className="mt-7 flex items-center gap-3">
              <Link
                href="/ask?q=Where+is+my+birth+certificate+application"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-bg px-4 py-2 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring"
              >
                Ask AI for an update <Icon name="arrow" size={13} />
              </Link>
              <button className="text-sm text-ink-3 hover:text-ink transition-colors focus-ring rounded">
                View documents
              </button>
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-ink/[0.03] px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">
        {k}
      </div>
      <div className="text-ink mt-0.5 text-[13px]">{v}</div>
    </div>
  );
}
