"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { HeroCard } from "@/components/HeroCard";
import { AskBar } from "@/components/AskBar";
import { PaymentSheet } from "@/components/PaymentSheet";
import { ConfirmCheck } from "@/components/ConfirmCheck";
import { AlertStrip } from "@/components/home/AlertStrip";
import { CivicPulse } from "@/components/home/CivicPulse";
import { ServiceTiles } from "@/components/home/ServiceTiles";
import { ProjectsRibbon } from "@/components/home/ProjectsRibbon";
import { CommunityRow } from "@/components/home/CommunityRow";
import { TrustTheatre } from "@/components/home/TrustTheatre";
import { fetchBill } from "@/lib/mock";
import type { Bill } from "@/types";

export default function CitizenHome() {
  const [bill, setBill] = useState<Bill | null>(null);
  const [paySheetOpen, setPaySheetOpen] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    let active = true;
    fetchBill({ method: "auto", value: "returning-user" }).then((b) => {
      if (active) setBill(b);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <SiteShell>
      <AlertStrip />

      <AnimatePresence mode="wait">
        {!paid && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            {bill ? (
              <>
                <HeroCard
                  bill={bill}
                  onPayClick={() => setPaySheetOpen(true)}
                  onDifferentProperty={() => {
                    if (typeof window !== "undefined") {
                      window.location.href = "/property";
                    }
                  }}
                />
                <AskBar
                  onSubmit={(q) => {
                    if (typeof window !== "undefined") {
                      window.location.href = `/ask?q=${encodeURIComponent(q)}`;
                    }
                  }}
                />
              </>
            ) : (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3 text-ink-3">
                  <span className="h-8 w-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                  <span className="text-[11px] uppercase tracking-[0.2em]">
                    Looking up your dues…
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {paid && bill && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <ConfirmCheck bill={bill} onAskAnything={() => setPaid(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!paid && (
        <>
          <CivicPulse />
          <ServiceTiles />
          <ProjectsRibbon />
          <TrustTheatre />
          <CommunityRow />
        </>
      )}

      {bill && (
        <PaymentSheet
          open={paySheetOpen}
          bill={bill}
          onClose={() => setPaySheetOpen(false)}
          onPaid={() => {
            setPaySheetOpen(false);
            setPaid(true);
          }}
        />
      )}
    </SiteShell>
  );
}
