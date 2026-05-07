export function SectionLabel({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        "flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-3 " +
        (align === "center" ? "justify-center" : "")
      }
    >
      <span className="h-px w-8 bg-line" />
      <span>{children}</span>
      <span className="h-px w-8 bg-line" />
    </div>
  );
}
