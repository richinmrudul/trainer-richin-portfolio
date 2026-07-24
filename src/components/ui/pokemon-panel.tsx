import type { ReactNode } from "react";

export type PokemonPanelVariant =
  | "dark"
  | "light"
  | "red"
  | "screen"
  | "trainer"
  | "pokedex";

const variantShell: Record<PokemonPanelVariant, string> = {
  dark: "pokemon-panel--dark",
  light: "pokemon-panel--light",
  red: "pokemon-panel--red",
  screen: "pokemon-panel--screen",
  trainer: "pokemon-panel--trainer",
  pokedex: "pokemon-panel--pokedex",
};

const labelText: Record<PokemonPanelVariant, string> = {
  dark: "text-[var(--text-muted)]",
  light: "text-[var(--text-secondary)]",
  red: "text-rose-50/90",
  screen: "text-[var(--text-muted)]",
  trainer: "text-[var(--text-secondary)]",
  pokedex: "text-rose-50/90",
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
      className={`pokemon-panel relative overflow-hidden rounded-xl ${variantShell[variant]} ${className}`}
    >
      {showGrid ? (
        <div className={gridOverlay} style={gridStyle} aria-hidden />
      ) : null}
      {label ? (
        <div
          className="pokemon-panel__label relative z-[1] flex items-center justify-between border-b px-4 py-2.5 sm:px-5"
        >
          <span
            className={`game-label ${labelText[variant]}`}
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
