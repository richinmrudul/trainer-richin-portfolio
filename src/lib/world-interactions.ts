/** Section keys aligned with route checkpoints / HUD ids. */
export type WorldSectionId =
  | "home"
  | "projects"
  | "experience"
  | "pokedex"
  | "resume"
  | "contact";

/** Scroll progress keyframes (0–1) and trainer position as % of viewport. */
export const WORLD_TRAINER_PATH: readonly {
  progress: number;
  xPct: number;
  yPct: number;
}[] = [
  { progress: 0, xPct: 50, yPct: 13 },
  { progress: 0.16, xPct: 49, yPct: 24 },
  { progress: 0.32, xPct: 51, yPct: 36 },
  { progress: 0.48, xPct: 50, yPct: 48 },
  { progress: 0.64, xPct: 49, yPct: 60 },
  { progress: 0.8, xPct: 51, yPct: 72 },
  { progress: 1, xPct: 50, yPct: 82 },
];

export function sampleTrainerPath(progress: number): { xPct: number; yPct: number } {
  const p = Math.max(0, Math.min(1, progress));
  const pts = WORLD_TRAINER_PATH;
  if (pts.length === 0) return { xPct: 50, yPct: 50 };
  if (p <= pts[0]!.progress) return { xPct: pts[0]!.xPct, yPct: pts[0]!.yPct };
  const last = pts[pts.length - 1]!;
  if (p >= last.progress) return { xPct: last.xPct, yPct: last.yPct };
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]!;
    const b = pts[i + 1]!;
    if (p >= a.progress && p <= b.progress) {
      const span = b.progress - a.progress || 1;
      const t = (p - a.progress) / span;
      return {
        xPct: a.xPct + (b.xPct - a.xPct) * t,
        yPct: a.yPct + (b.yPct - a.yPct) * t,
      };
    }
  }
  return { xPct: last.xPct, yPct: last.yPct };
}

export const WORLD_NPC_LINES: Record<
  WorldSectionId,
  { title: string; body: string }
> = {
  home: {
    title: "Route guide",
    body: "You've reached the trainer profile checkpoint - scroll the route to explore Richin's work, experience, skills, and how to connect.",
  },
  projects: {
    title: "Projects scout",
    body: "These are Richin's battle-tested builds - full-stack apps, ML systems, and shipped products.",
  },
  experience: {
    title: "Route historian",
    body: "This route tracks Richin’s engineering journey across The Data Mine, Profitize, Boilerexams, CS Club, Pendo, and Purdue.",
  },
  pokedex: {
    title: "Dex aide",
    body: "Open the Technical Pokédex to scan the languages, frameworks, and tools Richin uses.",
  },
  resume: {
    title: "Trainer file sign",
    body: "Trainer file available. View or download the recruiter-ready resume.",
  },
  contact: {
    title: "Save point guide",
    body: "Save your progress by connecting with Richin on GitHub, LinkedIn, or email.",
  },
};
