"use client";

export function Aurora() {
  return (
    <div className="aurora" aria-hidden>
      <div
        className="aurora-blob animate-drift1"
        style={{
          background:
            "radial-gradient(closest-side, rgba(226,88,34,0.55), transparent 70%)",
          top: "-20%",
          left: "-15%",
        }}
      />
      <div
        className="aurora-blob animate-drift2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(26,58,92,0.40), transparent 70%)",
          top: "20%",
          right: "-10%",
        }}
      />
      <div
        className="aurora-blob animate-drift3"
        style={{
          background:
            "radial-gradient(closest-side, rgba(79,139,92,0.28), transparent 70%)",
          bottom: "-25%",
          left: "20%",
        }}
      />
    </div>
  );
}
