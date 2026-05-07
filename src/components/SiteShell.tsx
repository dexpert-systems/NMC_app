"use client";

import { useState } from "react";
import { Aurora } from "./Aurora";
import { TopBar } from "./TopBar";
import { CommandPalette } from "./CommandPalette";
import { FloatingAssistant } from "./FloatingAssistant";
import { SiteFooter } from "./SiteFooter";

type Props = {
  children: React.ReactNode;
  hideFooter?: boolean;
  topBarVariant?: "auto" | "marketing" | "minimal";
  hideAssistant?: boolean;
};

export function SiteShell({
  children,
  hideFooter = false,
  topBarVariant = "auto",
  hideAssistant = false,
}: Props) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <main className="relative min-h-svh overflow-x-hidden">
      <Aurora />
      <TopBar
        onCommandOpen={() => setPaletteOpen(true)}
        variant={topBarVariant}
      />
      {children}
      {!hideFooter && <SiteFooter />}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      {!hideAssistant && <FloatingAssistant />}
    </main>
  );
}
