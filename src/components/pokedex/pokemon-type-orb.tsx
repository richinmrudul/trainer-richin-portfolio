"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PokemonSkillType } from "@/content/skills";

const TYPE_META: Record<
  PokemonSkillType,
  {
    label: string;
    shell: string;
    core: string;
    spark: string;
    motif: string;
  }
> = {
  fire: {
    label: "Fire",
    shell: "border-orange-400/45 bg-orange-950/35 shadow-[0_0_26px_rgba(249,115,22,0.22)]",
    core: "from-red-500 via-orange-400 to-amber-200",
    spark: "bg-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.8)]",
    motif: "bg-[radial-gradient(circle_at_50%_82%,rgba(254,240,138,0.95)_0_8%,transparent_9%),radial-gradient(circle_at_38%_52%,rgba(251,146,60,0.85)_0_14%,transparent_15%),radial-gradient(circle_at_60%_36%,rgba(239,68,68,0.82)_0_18%,transparent_19%)]",
  },
  water: {
    label: "Water",
    shell: "border-sky-300/45 bg-sky-950/35 shadow-[0_0_26px_rgba(56,189,248,0.2)]",
    core: "from-cyan-300 via-sky-500 to-blue-800",
    spark: "bg-cyan-100 shadow-[0_0_10px_rgba(103,232,249,0.8)]",
    motif: "bg-[radial-gradient(ellipse_at_48%_32%,rgba(224,242,254,0.9)_0_10%,transparent_11%),radial-gradient(ellipse_at_50%_66%,rgba(14,165,233,0.82)_0_26%,transparent_27%)]",
  },
  electric: {
    label: "Electric",
    shell: "border-yellow-300/45 bg-yellow-950/30 shadow-[0_0_28px_rgba(250,204,21,0.22)]",
    core: "from-yellow-200 via-amber-400 to-orange-600",
    spark: "bg-yellow-100 shadow-[0_0_12px_rgba(254,240,138,0.9)]",
    motif: "bg-[linear-gradient(116deg,transparent_0_37%,rgba(254,252,232,0.92)_38%_48%,transparent_49%_55%,rgba(250,204,21,0.88)_56%_67%,transparent_68%)]",
  },
  grass: {
    label: "Grass",
    shell: "border-emerald-300/45 bg-emerald-950/35 shadow-[0_0_26px_rgba(52,211,153,0.18)]",
    core: "from-lime-300 via-emerald-500 to-green-900",
    spark: "bg-lime-100 shadow-[0_0_10px_rgba(217,249,157,0.8)]",
    motif: "bg-[radial-gradient(ellipse_at_38%_54%,rgba(220,252,231,0.9)_0_13%,transparent_14%),radial-gradient(ellipse_at_62%_46%,rgba(134,239,172,0.86)_0_18%,transparent_19%)]",
  },
  psychic: {
    label: "Psychic",
    shell: "border-fuchsia-300/45 bg-fuchsia-950/35 shadow-[0_0_28px_rgba(217,70,239,0.22)]",
    core: "from-fuchsia-300 via-violet-500 to-indigo-900",
    spark: "bg-pink-100 shadow-[0_0_12px_rgba(251,207,232,0.88)]",
    motif: "bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(253,244,255,0.78)_0_2px,transparent_3px_10px)]",
  },
  steel: {
    label: "Steel",
    shell: "border-slate-300/45 bg-slate-950/45 shadow-[0_0_24px_rgba(148,163,184,0.2)]",
    core: "from-zinc-100 via-slate-500 to-zinc-900",
    spark: "bg-slate-100 shadow-[0_0_10px_rgba(226,232,240,0.75)]",
    motif: "bg-[linear-gradient(135deg,transparent_0_25%,rgba(248,250,252,0.82)_26%_31%,transparent_32%_58%,rgba(203,213,225,0.76)_59%_65%,transparent_66%)]",
  },
  ground: {
    label: "Ground",
    shell: "border-stone-300/45 bg-stone-950/40 shadow-[0_0_24px_rgba(168,162,158,0.16)]",
    core: "from-yellow-100 via-amber-700 to-stone-900",
    spark: "bg-yellow-100 shadow-[0_0_10px_rgba(254,249,195,0.72)]",
    motif: "bg-[linear-gradient(155deg,transparent_0_34%,rgba(254,240,138,0.72)_35%_43%,transparent_44%),linear-gradient(25deg,transparent_0_48%,rgba(120,113,108,0.88)_49%_58%,transparent_59%)]",
  },
  flying: {
    label: "Flying",
    shell: "border-indigo-200/45 bg-indigo-950/35 shadow-[0_0_26px_rgba(129,140,248,0.2)]",
    core: "from-white via-sky-300 to-indigo-700",
    spark: "bg-white shadow-[0_0_12px_rgba(255,255,255,0.78)]",
    motif: "bg-[radial-gradient(ellipse_at_36%_54%,rgba(255,255,255,0.88)_0_15%,transparent_16%),radial-gradient(ellipse_at_63%_46%,rgba(224,242,254,0.78)_0_21%,transparent_22%)]",
  },
  dark: {
    label: "Dark",
    shell: "border-zinc-400/45 bg-zinc-950/60 shadow-[0_0_24px_rgba(24,24,27,0.55)]",
    core: "from-zinc-500 via-neutral-800 to-black",
    spark: "bg-zinc-200 shadow-[0_0_10px_rgba(212,212,216,0.5)]",
    motif: "bg-[radial-gradient(circle_at_48%_50%,transparent_0_28%,rgba(244,244,245,0.6)_29%_34%,transparent_35%)]",
  },
  normal: {
    label: "Normal",
    shell: "border-stone-200/35 bg-stone-950/35 shadow-[0_0_22px_rgba(214,211,209,0.12)]",
    core: "from-stone-100 via-stone-400 to-zinc-700",
    spark: "bg-stone-100 shadow-[0_0_9px_rgba(245,245,244,0.65)]",
    motif: "bg-[radial-gradient(circle_at_50%_50%,rgba(250,250,249,0.78)_0_20%,transparent_21%)]",
  },
};

type PokemonTypeOrbProps = {
  type: PokemonSkillType;
};

export function PokemonTypeOrb({ type }: PokemonTypeOrbProps) {
  const reduceMotion = useReducedMotion();
  const meta = TYPE_META[type];

  return (
    <figure
      className={`absolute right-5 top-4 z-20 flex h-[74px] w-[74px] items-center justify-center rounded-full border ring-1 ring-white/5 md:right-6 md:top-5 md:h-[88px] md:w-[88px] ${meta.shell}`}
      aria-label={`Pokemon type: ${meta.label}`}
    >
      <motion.div
        className="pokedex-type-ring absolute inset-[7px] rounded-full border border-white/20"
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }
        }
        aria-hidden
      />
      <motion.div
        className={`relative flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${meta.core} md:h-[60px] md:w-[60px]`}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.045, 1],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <span
          className={`pokedex-type-motif absolute inset-[10px] rounded-full opacity-85 mix-blend-screen ${meta.motif}`}
          aria-hidden
        />
        <span
          className={`absolute right-2 top-2 h-1.5 w-1.5 rounded-full ${meta.spark}`}
          aria-hidden
        />
      </motion.div>
      <span className="pointer-events-none absolute -bottom-4 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/55 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#d9d1c4] md:inline">
        {meta.label}
      </span>
    </figure>
  );
}
