"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { MarketingHero } from "@/components/marketing/Hero";
import { MarketingStats } from "@/components/marketing/Stats";
import { Mission } from "@/components/marketing/Mission";
import { WhatYouCanDo } from "@/components/marketing/WhatYouCanDo";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { AIPreview } from "@/components/marketing/AIPreview";
import { Testimonials } from "@/components/marketing/Testimonial";
import { FAQ } from "@/components/marketing/FAQ";
import { CtaBand } from "@/components/marketing/CtaBand";
import { isAuthed } from "@/lib/auth";

export default function MarketingHome() {
  const router = useRouter();

  // If signed in, jump to the citizen dashboard.
  useEffect(() => {
    if (isAuthed()) router.replace("/citizen");
  }, [router]);

  return (
    <SiteShell topBarVariant="marketing">
      <MarketingHero />
      <MarketingStats />
      <Mission />
      <WhatYouCanDo />
      <HowItWorks />
      <AIPreview />
      <Testimonials />
      <FAQ />
      <CtaBand />
    </SiteShell>
  );
}
