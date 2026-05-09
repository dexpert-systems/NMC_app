"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdaptiveSidebar } from "./AdaptiveSidebar";
import { ErpTopbar } from "./ErpTopbar";
import { InsightsPanel } from "./InsightsPanel";
import { CommandConsole } from "./CommandConsole";
import { LiveOpsTicker } from "./LiveOpsTicker";
import { ErpAurora } from "./ErpAurora";
import { getCurrentRole, type Role } from "@/lib/erp";

type Props = {
  children: React.ReactNode;
  /** If specified, the page will redirect non-matching roles. */
  expectedRole?: Role;
};

export function ErpShell({ children, expectedRole }: Props) {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(true);

  useEffect(() => {
    const r = getCurrentRole();
    if (!r) {
      router.replace("/erp/sign-in");
      return;
    }
    setRole(r);
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key === "Escape" && paletteOpen) setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  if (!role) {
    return (
      <div className="dark erp-canvas min-h-svh flex items-center justify-center text-ink-3">
        <ErpAurora />
        <div className="relative flex flex-col items-center gap-3 z-10">
          <span className="h-8 w-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
          <span className="text-[11px] uppercase tracking-[0.2em]">
            Loading workspace…
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="dark erp-canvas erp-noise min-h-svh text-ink overflow-x-hidden relative">
      {/* Ambient layers */}
      <ErpAurora />
      <div aria-hidden className="erp-grid" />
      <div aria-hidden className="erp-vignette" />
      <div aria-hidden className="scan-line" />

      <div className="relative flex">
        <AdaptiveSidebar role={role} />

        <div className="flex-1 min-w-0 flex flex-col">
          <ErpTopbar
            role={role}
            onCommandOpen={() => setPaletteOpen(true)}
            insightsOpen={insightsOpen}
            onInsightsToggle={() => setInsightsOpen((v) => !v)}
          />

          <div className="flex-1 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">{children}</div>
            <aside
              className={
                "hidden xl:block sticky top-0 self-start h-svh overflow-y-auto " +
                (insightsOpen ? "" : "xl:hidden")
              }
            >
              <InsightsPanel role={role} />
            </aside>
          </div>

          <LiveOpsTicker />
        </div>
      </div>

      <CommandConsole
        role={role}
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </div>
  );
}
