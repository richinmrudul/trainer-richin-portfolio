"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

export type Destination = {
  id: string;
  index: number;
  title: string;
  description: string;
  target: string;
};

type DestinationMenuProps = {
  destinations: Destination[];
  selectedIndex: number | null;
  onSelect: (target: string) => void;
  onHoverIndex: (index: number | null) => void;
  className?: string;
};

export function DestinationMenu({
  destinations,
  selectedIndex,
  onSelect,
  onHoverIndex,
  className = "",
}: DestinationMenuProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      role="listbox"
      aria-label="Portfolio destinations"
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={staggerContainer}
      className={`grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 ${className}`}
    >
      {destinations.map((d, i) => {
        const isSelected = selectedIndex === i;
        return (
          <motion.div key={d.id} variants={fadeUp}>
            <button
              type="button"
              role="option"
              aria-selected={isSelected}
              onMouseEnter={() => onHoverIndex(i)}
              onMouseLeave={() => onHoverIndex(null)}
              onFocus={() => onHoverIndex(i)}
              onBlur={() => onHoverIndex(null)}
              onClick={() => onSelect(d.target)}
              className={`group flex h-full w-full flex-col rounded-2xl border p-4 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-[border-color,box-shadow,background-color,transform] sm:p-5 ${
                isSelected
                  ? "border-white/35 bg-white/[0.14] shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                  : "border-white/12 bg-zinc-950/40 hover:border-white/22 hover:bg-white/[0.1] active:scale-[0.99]"
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[10px] tabular-nums text-zinc-400">
                  {String(d.index).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Route
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-50">
                {d.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {d.description}
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-sky-400/25 via-transparent to-red-400/25 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export const defaultDestinations: Destination[] = [
  {
    id: "full",
    index: 1,
    title: "Full Journey",
    description:
      "Start from the hero and explore the full portfolio.",
    target: "#home",
  },
  {
    id: "projects",
    index: 2,
    title: "Projects",
    description:
      "Review shipped products, AI systems, and engineering builds.",
    target: "#projects",
  },
  {
    id: "experience",
    index: 3,
    title: "Experience",
    description: "View backend, AI, and infrastructure work.",
    target: "#experience",
  },
  {
    id: "resume",
    index: 4,
    title: "Resume",
    description: "Open the recruiter-ready trainer file.",
    target: "#resume",
  },
];
