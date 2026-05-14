"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/content/projects";
import { TypeBadgeAuto } from "@/components/ui/type-badge";
import { accentStyles } from "./project-accent";
import { ProjectPreview } from "./project-preview";
import { useMouseDepth } from "@/hooks/use-mouse-depth";

type ProjectCardProps = {
  project: Project;
  entryIndex: number;
  onOpen: (project: Project) => void;
};

const MAX_TECH = 4;

function buildRefLabel(buildId: string) {
  const parts = buildId.split("·");
  const tail = parts[1]?.trim();
  return tail && tail.length > 0 ? tail : buildId;
}

export function ProjectCard({ project, entryIndex, onOpen }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const a = accentStyles[project.accent];
  const chips = project.tech.slice(0, MAX_TECH);
  const depth = useMouseDepth(4);
  const entryNo = String(entryIndex).padStart(3, "0");
  const buildRef = buildRefLabel(project.buildId);

  return (
    <div
      className="h-full [perspective:1200px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={
          reduceMotion || !depth.enabled
            ? undefined
            : { x: depth.x, y: depth.y, willChange: "transform" }
        }
        className="h-full"
        whileHover={
          reduceMotion
            ? undefined
            : { y: -6, scale: 1.01, rotateX: 1.5, rotateY: -1.25 }
        }
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#2a3230]/95 bg-gradient-to-b from-[#171d1c]/98 via-[#121816]/98 to-[#0e1211] text-left shadow-[0_1px_0_0_rgba(255,250,240,0.05)_inset] outline-none transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#c9b896]/35 hover:shadow-[0_28px_64px_-28px_rgba(56,189,248,0.14),0_22px_50px_-32px_rgba(0,0,0,0.55)] focus-visible:ring-2 focus-visible:ring-[#c9b896]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f0e]"
          aria-label={`Open project entry: ${project.title}`}
        >
          <span
            className="pointer-events-none absolute bottom-0 left-1/2 z-[2] h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-sky-400/70 to-transparent opacity-0 transition-[width,opacity] duration-500 ease-out group-hover:w-[88%] group-hover:opacity-100"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f5f0e6]/30 to-transparent" />
            <div className="project-card-scan absolute inset-x-0 top-0 h-[120%]" aria-hidden />
          </div>

          <div
            className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${a.glow}`}
            aria-hidden
          />

          <div className="relative flex h-full min-h-0 flex-col">
            <div className={`h-0.5 w-full shrink-0 ${a.bar}`} aria-hidden />

            <div className="relative flex flex-1 flex-col p-4 sm:p-5">
              <ProjectPreview
                src={project.image}
                alt=""
                accent={project.accent}
                className="mb-4"
              />

              <div className="flex items-end justify-between gap-3 border-b border-[#ede6d8]/10 pb-2.5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#8a8275]">
                    Entry no.
                  </p>
                  <p className="mt-0.5 font-mono text-sm tabular-nums tracking-tight text-[#e8e0d4]">
                    {entryNo}
                  </p>
                </div>
                <p className="max-w-[52%] text-right font-mono text-[10px] uppercase tracking-[0.14em] text-[#7a7368]">
                  {buildRef}
                </p>
              </div>

              <div className="mb-2 mt-3 flex flex-wrap items-center gap-2">
                <p
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] ${a.category}`}
                >
                  {project.category}
                </p>
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-[#f4f1ea]">
                {project.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#b8b0a4]">
                {project.description}
              </p>

              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Capability tags">
                {project.typeBadges.map((tag) => (
                  <li key={tag}>
                    <TypeBadgeAuto label={tag} />
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-lg border border-[#c9b896]/18 bg-black/28 px-3 py-2.5 shadow-[inset_0_1px_0_0_rgba(255,250,240,0.04)]">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8a8275]">
                  Impact
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-[#e8e0d4]">
                  {project.impact}
                </p>
              </div>

              <ul
                className="mt-4 flex flex-wrap gap-1.5 border-t border-[#2a3230]/90 pt-4"
                aria-label="Technologies"
              >
                {chips.map((t) => (
                  <li key={t}>
                    <span
                      className={`inline-block rounded-md border px-2 py-0.5 font-mono text-[10px] ${a.chip}`}
                    >
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </button>
      </motion.div>
    </div>
  );
}
