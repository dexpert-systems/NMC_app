"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { isAuthed, signOut } from "@/lib/auth";

type Props = {
  onCommandOpen: () => void;
  onLogoClick?: () => void;
  variant?: "auto" | "marketing" | "minimal";
};

export function TopBar({ onCommandOpen, onLogoClick, variant = "auto" }: Props) {
  const [time, setTime] = useState("");
  const [served, setServed] = useState(73294);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isAuthed());
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm} IST`);
    };
    tick();
    const t = setInterval(tick, 30_000);
    const s = setInterval(
      () => setServed((n) => n + Math.floor(Math.random() * 3 + 1)),
      4000,
    );
    return () => {
      clearInterval(t);
      clearInterval(s);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onCommandOpen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCommandOpen]);

  if (variant === "minimal") {
    return (
      <header className="relative z-20 flex items-center justify-between px-5 sm:px-10 lg:px-12 pt-6 pb-2">
        <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-md">
          <NMCMark />
          <span className="hidden sm:flex flex-col text-left leading-[1.1]">
            <span className="text-[12px] font-medium text-ink tracking-tight whitespace-nowrap">
              Nagpur Municipal Corporation
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Smart City</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-ink-3 hover:text-ink transition-colors focus-ring rounded"
        >
          Back to home
        </Link>
      </header>
    );
  }

  const homeHref = authed ? "/citizen" : "/";

  return (
    <header className="relative z-20 flex items-center justify-between px-5 sm:px-10 lg:px-12 pt-6 pb-2">
      <Link
        href={homeHref}
        onClick={onLogoClick}
        className="flex items-center gap-2.5 focus-ring rounded-md group"
        aria-label="Nagpur Municipal Corporation home"
      >
        <NMCMark />
        <span className="hidden sm:flex flex-col text-left leading-[1.1]">
          <span className="text-[12px] font-medium text-ink tracking-tight whitespace-nowrap">
            Nagpur Municipal Corporation
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Smart City</span>
        </span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden md:flex items-center gap-2.5 rounded-full bg-surface/60 backdrop-blur-md border border-line px-3 py-1.5 text-[11px] tabular text-ink-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sage live-dot" />
          </span>
          <span className="text-ink-2 font-medium">LIVE</span>
          <span className="text-ink-4">·</span>
          <span>{time}</span>
          <span className="text-ink-4">·</span>
          <span className="text-ink-2 tabular">
            {served.toLocaleString("en-IN")}
          </span>
          <span className="text-ink-4">served today</span>
        </div>

        <button
          type="button"
          onClick={onCommandOpen}
          className="hidden sm:inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-ink-3 hover:text-ink transition-colors focus-ring"
          aria-label="Search · Cmd K"
        >
          <Icon name="search" size={13} />
          <span>Search</span>
          <kbd className="ml-1 rounded bg-ink/[0.06] dark:bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-medium tabular text-ink-2">
            ⌘K
          </kbd>
        </button>

        <button
          type="button"
          onClick={onCommandOpen}
          className="sm:hidden grid place-items-center h-9 w-9 rounded-full glass focus-ring text-ink-2"
          aria-label="Search"
        >
          <Icon name="search" size={14} />
        </button>

        {authed ? (
          <div className="relative group">
            <button
              className="grid place-items-center h-9 w-9 rounded-full glass focus-ring"
              aria-label="Account"
            >
              <span className="text-[11px] font-semibold text-ink-2">RK</span>
            </button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block focus-within:block">
              <div className="surface-card rounded-2xl p-2 w-48 shadow-card">
                <div className="px-3 py-2 border-b border-line-soft">
                  <div className="text-sm font-medium text-ink">Rajesh Kumar</div>
                  <div className="text-[11px] text-ink-3 mt-0.5">+91 98765 43210</div>
                </div>
                <Link
                  href="/citizen"
                  className="block px-3 py-2 text-sm text-ink-2 hover:bg-ink/[0.04] rounded-lg transition-colors"
                >
                  My dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    if (typeof window !== "undefined") window.location.href = "/";
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-ink-2 hover:bg-ink/[0.04] rounded-lg transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-bg px-4 py-2 text-xs sm:text-sm font-medium shadow-soft hover:scale-[1.02] active:scale-[0.98] transition-transform focus-ring"
          >
            Sign in
            <span className="hidden sm:inline">
              <Icon name="arrow" size={12} />
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}

function NMCMark() {
  return (
    <span className="relative grid place-items-center h-9 w-9 rounded-xl bg-ink text-white shadow-soft overflow-hidden">
      <span
        aria-hidden
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 20%, #2A2E33 0%, #0B0C0E 60%)",
        }}
      />
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="relative"
        aria-hidden
      >
        <path
          d="M12 3 L20 8 L20 16 L12 21 L4 16 L4 8 Z"
          stroke="#E25822"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2" fill="#E25822" />
      </svg>
    </span>
  );
}
