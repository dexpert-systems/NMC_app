"use client";

/**
 * Slow-drifting deep-navy aurora for the ERP canvas.
 * Subtle compared to citizen — meant to add ambient life, not draw attention.
 */
export function ErpAurora() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-[1] pointer-events-none overflow-hidden"
    >
      <div
        className="absolute h-[70vw] w-[70vw] rounded-full blur-[80px] opacity-[0.18]"
        style={{
          top: "-15%",
          left: "-10%",
          background:
            "radial-gradient(closest-side, rgba(26, 58, 92, 0.85), transparent 70%)",
          animation: "erp-drift-1 60s ease-in-out infinite",
        }}
      />
      <div
        className="absolute h-[60vw] w-[60vw] rounded-full blur-[80px] opacity-[0.14]"
        style={{
          top: "20%",
          right: "-15%",
          background:
            "radial-gradient(closest-side, rgba(226, 88, 34, 0.55), transparent 70%)",
          animation: "erp-drift-2 78s ease-in-out infinite",
        }}
      />
      <div
        className="absolute h-[55vw] w-[55vw] rounded-full blur-[80px] opacity-[0.10]"
        style={{
          bottom: "-15%",
          left: "30%",
          background:
            "radial-gradient(closest-side, rgba(79, 139, 92, 0.5), transparent 70%)",
          animation: "erp-drift-3 92s ease-in-out infinite",
        }}
      />
    </div>
  );
}
