import type { ReactNode } from "react";

export type TypeBadgeTone =
  | "neutral"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "psychic"
  | "steel"
  | "dark";

const toneClass: Record<TypeBadgeTone, string> = {
  neutral:
    "border-zinc-700/80 bg-zinc-950/70 text-zinc-300 ring-zinc-700/40",
  fire: "border-rose-900/60 bg-rose-950/40 text-rose-100/90 ring-rose-900/35",
  water: "border-sky-900/55 bg-sky-950/35 text-sky-100/90 ring-sky-900/30",
  electric:
    "border-amber-900/55 bg-amber-950/35 text-amber-100/90 ring-amber-900/30",
  grass: "border-emerald-900/55 bg-emerald-950/35 text-emerald-100/90 ring-emerald-900/30",
  psychic:
    "border-violet-900/55 bg-violet-950/35 text-violet-100/90 ring-violet-900/30",
  steel: "border-slate-700/70 bg-slate-950/50 text-slate-200 ring-slate-700/35",
  dark: "border-zinc-600/70 bg-zinc-950/80 text-zinc-200 ring-zinc-700/40",
};

/** Maps common skill/type labels to restrained palette buckets (not literal game types). */
export function inferTone(label: string): TypeBadgeTone {
  const u = label.toUpperCase();
  if (/AI|ML|PYTHON|PYTORCH|TENSOR/.test(u)) return "psychic";
  if (/WEB|REACT|NEXT|FRONT|UI|CSS|TAILWIND/.test(u)) return "water";
  if (/BACK|GO|API|SYSTEM|DOCKER|K8S|KUBERNETES|AKS|INFRA/.test(u)) return "steel";
  if (/DATA|POSTGRES|SQL|ANALYTICS/.test(u)) return "grass";
  if (/FULL|STACK|PRODUCT|FIREBASE/.test(u)) return "fire";
  if (/DEPLOY|LEAD|ORG|CLUB/.test(u)) return "electric";
  if (/SPORTS|NBA|PREDICT/.test(u)) return "dark";
  return "neutral";
}

export type TypeBadgeProps = {
  children: ReactNode;
  tone?: TypeBadgeTone;
  className?: string;
};

export function TypeBadge({ children, tone = "neutral", className = "" }: TypeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] shadow-sm ring-1 ring-inset ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Convenience: infers tone from label text for dense lists (badges remain readable without hue-only meaning). */
export function TypeBadgeAuto({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <TypeBadge tone={inferTone(label)} className={className}>
      {label}
    </TypeBadge>
  );
}
