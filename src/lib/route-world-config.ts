/** Layout for desktop route columns (trainer sits in center gutter). */
export type RouteCheckpointSide = "left" | "right" | "full";

export const ROUTE_PATH_GUTTER = "minmax(4.5rem, 7vw)";

/** Human-readable checkpoint copy (also used on signs). */
export const ROUTE_LABELS = {
  home: "Trainer profile",
  projects: "Project team",
  experience: "Experience route",
  pokedex: "Technical Pokédex",
  resume: "Trainer file",
  contact: "Save station",
} as const;
