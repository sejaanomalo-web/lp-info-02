export default function ImagePlaceholder({ label, ratio = "aspect-[4/5]", className = "" }) {
  return (
    <div
      className={`placeholder-pattern relative overflow-hidden rounded-[1.4rem] border border-white/15 bg-white/5 p-4 text-left shadow-premium ${ratio} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="grid-overlay absolute inset-0 opacity-50" />
      <div className="relative z-10 flex h-full items-end">
        <div className="w-full rounded-2xl border border-white/15 bg-[#201747]/80 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-cream/80">Placeholder visual</p>
          <p className="mt-1 text-base font-semibold text-white">{label}</p>
        </div>
      </div>
    </div>
  );
}
