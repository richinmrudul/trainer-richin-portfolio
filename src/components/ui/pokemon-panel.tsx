import type { ReactNode } from "react";

export type PokemonPanelVariant = "dark" | "light" | "red" | "screen";

const variantShell: Record<PokemonPanelVariant, string> = {
  dark: "border-zinc-800/90 bg-zinc-950/55 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
  light:
    "border-zinc-700/60 bg-zinc-100/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
  red: "border-rose-900/45 bg-gradient-to-b from-rose-950/35 to-zinc-950/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
  screen:
    "border-zinc-700/70 bg-zinc-950/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]",
};

const gridOverlay =
  "pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.045]";
const gridStyle = {
  backgroundImage:
    "linear-gradient(to right, rgb(228 228 231) 1px, transparent 1px), linear-gradient(to bottom, rgb(228 228 231) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
} as const;

type PokemonPanelProps = {
  children: ReactNode;
  className?: string;
  variant?: PokemonPanelVariant;
  label?: string;
  /** Show faint scanner grid inside the panel */
  showGrid?: boolean;
  /** Remove inner padding (e.g. full-bleed links inside cards). */
  flush?: boolean;
};

export function PokemonPanel({
  children,
  className = "",
  variant = "dark",
  label,
  showGrid = true,
  flush = false,
}: PokemonPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${variantShell[variant]} ${className}`}
    >
      {showGrid ? (
        <div className={gridOverlay} style={gridStyle} aria-hidden />
      ) : null}
      {label ? (
        <div className="relative z-[1] flex items-center justify-between border-b border-zinc-800/70 px-4 py-2.5 sm:px-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
            {label}
          </span>
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.45)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500/80 shadow-[0_0_6px_rgba(14,165,233,0.45)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.45)]" />
          </span>
        </div>
      ) : null}
      <div
        className={`relative z-[1] ${flush ? "p-0" : "p-4 sm:p-5"}`}
      >
        {children}
      </div>
    </div>
  );
}
