import type { ProjectAccent } from "@/content/projects";

/** Restrained accent tokens — border washes, labels, and subtle hover rim. */
export const accentStyles: Record<
  ProjectAccent,
  {
    bar: string;
    category: string;
    chip: string;
    modalBar: string;
    glow: string;
  }
> = {
  sky: {
    bar: "bg-sky-500/55",
    category: "text-sky-300/85",
    chip: "border-sky-800/40 bg-sky-950/35 text-sky-200/75",
    modalBar: "from-sky-500/25 to-transparent",
    glow: "bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,rgba(56,189,248,0.14),transparent_55%)]",
  },
  amber: {
    bar: "bg-amber-500/50",
    category: "text-amber-200/80",
    chip: "border-amber-900/35 bg-amber-950/30 text-amber-100/75",
    modalBar: "from-amber-500/20 to-transparent",
    glow: "bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,rgba(251,191,36,0.12),transparent_55%)]",
  },
  violet: {
    bar: "bg-violet-500/50",
    category: "text-violet-300/85",
    chip: "border-violet-800/40 bg-violet-950/35 text-violet-200/75",
    modalBar: "from-violet-500/20 to-transparent",
    glow: "bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,rgba(167,139,250,0.14),transparent_55%)]",
  },
  indigo: {
    bar: "bg-indigo-500/50",
    category: "text-indigo-300/85",
    chip: "border-indigo-800/40 bg-indigo-950/35 text-indigo-200/75",
    modalBar: "from-indigo-500/20 to-transparent",
    glow: "bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,rgba(129,140,248,0.13),transparent_55%)]",
  },
  teal: {
    bar: "bg-teal-500/55",
    category: "text-teal-300/85",
    chip: "border-teal-800/40 bg-teal-950/35 text-teal-200/75",
    modalBar: "from-teal-500/24 to-transparent",
    glow: "bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,rgba(45,212,191,0.13),transparent_55%)]",
  },
};
