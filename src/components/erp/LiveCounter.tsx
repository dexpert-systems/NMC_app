"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Initial value */
  base: number;
  /** How many to increment per tick (random in 1..max) */
  maxStep?: number;
  /** Tick interval in ms */
  intervalMs?: number;
  /** Format the displayed value */
  format?: (n: number) => string;
  /** Suffix string (e.g. " Cr") */
  suffix?: string;
  className?: string;
};

/**
 * A number that ticks up over time — used to make KPI cards feel "live".
 * Increments by 1..maxStep every `intervalMs`. Subtle by default.
 */
export function LiveCounter({
  base,
  maxStep = 3,
  intervalMs = 4000,
  format,
  suffix,
  className,
}: Props) {
  const [n, setN] = useState(base);
  const [flash, setFlash] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      const inc = 1 + Math.floor(Math.random() * maxStep);
      setN((v) => v + inc);
      setFlash(true);
      window.setTimeout(() => setFlash(false), 600);
    }, intervalMs);
    return () => {
      clearInterval(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [maxStep, intervalMs]);

  const display = format
    ? format(n)
    : n.toLocaleString("en-IN");

  return (
    <span
      className={
        "tabular transition-colors duration-500 " +
        (flash ? "text-sage" : "") +
        (className ? " " + className : "")
      }
    >
      {display}
      {suffix}
    </span>
  );
}
