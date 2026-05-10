import type { ProjectAccent } from "@/content/projects";

/** Restrained accent tokens — border washes and labels only, no glows. */
export const accentStyles: Record<
  ProjectAccent,
  {
    bar: string;
    category: string;
    chip: string;
    modalBar: string;
  }
> = {
  sky: {
    bar: "bg-sky-500/55",
    category: "text-sky-300/85",
    chip: "border-sky-800/40 bg-sky-950/35 text-sky-200/75",
    modalBar: "from-sky-500/25 to-transparent",
  },
  amber: {
    bar: "bg-amber-500/50",
    category: "text-amber-200/80",
    chip: "border-amber-900/35 bg-amber-950/30 text-amber-100/75",
    modalBar: "from-amber-500/20 to-transparent",
  },
  violet: {
    bar: "bg-violet-500/50",
    category: "text-violet-300/85",
    chip: "border-violet-800/40 bg-violet-950/35 text-violet-200/75",
    modalBar: "from-violet-500/20 to-transparent",
  },
  indigo: {
    bar: "bg-indigo-500/50",
    category: "text-indigo-300/85",
    chip: "border-indigo-800/40 bg-indigo-950/35 text-indigo-200/75",
    modalBar: "from-indigo-500/20 to-transparent",
  },
};
