import type { ReactNode } from "react";

export type PokemonPanelVariant =
  | "dark"
  | "light"
  | "red"
  | "screen"
  | "trainer"
  | "pokedex";

const variantShell: Record<PokemonPanelVariant, string> = {
  dark: "border-zinc-800/90 bg-zinc-950/55 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
  light:
    "border-zinc-700/60 bg-zinc-100/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
  red: "border-rose-900/45 bg-gradient-to-b from-rose-950/35 to-zinc-950/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
  screen:
    "border-zinc-700/70 bg-zinc-950/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]",
  trainer:
    "border-[#c4a574]/30 bg-gradient-to-br from-[#171f22]/98 via-zinc-950/[0.97] to-[#0d1416] shadow-[inset_0_1px_0_0_rgba(255,250,240,0.08),0_0_0_1px_rgba(185,28,28,0.12),0_24px_80px_-40px_rgba(0,0,0,0.55)]",
  pokedex:
    "border-rose-600/45 bg-gradient-to-b from-rose-950/50 via-zinc-950/92 to-zinc-950/95 shadow-[inset_0_1px_0_0_rgba(255,240,240,0.06),0_0_0_1px_rgba(220,38,38,0.22),0_28px_90px_-36px_rgba(0,0,0,0.65)]",
};

const labelBar: Record<PokemonPanelVariant, string> = {
  dark: "border-zinc-800/70",
  light: "border-zinc-700/60",
  red: "border-rose-900/40",
  screen: "border-zinc-800/70",
  trainer: "border-[#c9b896]/20 bg-black/15",
  pokedex: "border-rose-800/50 bg-black/20",
};

const labelText: Record<PokemonPanelVariant, string> = {
  dark: "text-zinc-500",
  light: "text-zinc-600",
  red: "text-rose-200/80",
  screen: "text-zinc-500",
  trainer: "text-[#e8e0d4]/85",
  pokedex: "text-rose-100/85",
};

const gridOverlay =
  "pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.038]";
const gridStyle = {
  backgroundImage:
    "linear-gradient(to right, rgba(245,240,230,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,240,230,0.35) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
} as const;

type PokemonPanelProps = {
  children: ReactNode;
  className?: string;
  variant?: PokemonPanelVariant;
  label?: string;
  showGrid?: boolean;
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
        <div
          className={`relative z-[1] flex items-center justify-between border-b px-4 py-2.5 sm:px-5 ${labelBar[variant]}`}
        >
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.22em] ${labelText[variant]}`}
          >
            {label}
          </span>
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500/85 shadow-[0_0_6px_rgba(244,63,94,0.45)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500/85 shadow-[0_0_6px_rgba(14,165,233,0.45)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/85 shadow-[0_0_6px_rgba(251,191,36,0.45)]" />
          </span>
        </div>
      ) : null}
      <div className={`relative z-[1] ${flush ? "p-0" : "p-4 sm:p-5"}`}>
        {children}
      </div>
    </div>
  );
}
