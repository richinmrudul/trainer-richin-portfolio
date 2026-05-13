import type { ReactNode } from "react";

export type RouteSectionVariant =
  | "profile"
  | "projects"
  | "experience"
  | "pokedex"
  | "resume"
  | "contact";

const variantRing: Record<RouteSectionVariant, string> = {
  profile:
    "border-emerald-900/35 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(16,185,129,0.08)]",
  projects:
    "border-sky-900/35 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(14,165,233,0.08)]",
  experience:
    "border-amber-900/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(245,158,11,0.07)]",
  pokedex:
    "border-rose-900/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(244,63,94,0.1)]",
  resume:
    "border-zinc-700/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
  contact:
    "border-violet-900/35 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(139,92,246,0.08)]",
};

type RouteSectionFrameProps = {
  children: ReactNode;
  variant: RouteSectionVariant;
  label?: string;
  className?: string;
};

/**
 * Glass panel over route terrain — keeps copy readable, slight personality per section.
 */
export function RouteSectionFrame({
  children,
  variant,
  label,
  className = "",
}: RouteSectionFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-zinc-950/58 backdrop-blur-lg md:rounded-3xl ${variantRing[variant]} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/[0.12]"
        aria-hidden
      />
      {label ? (
        <div className="relative border-b border-zinc-800/60 px-4 py-2 sm:px-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            {label}
          </p>
        </div>
      ) : null}
      <div className="relative px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  );
}
