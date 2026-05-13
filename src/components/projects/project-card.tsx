"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/content/projects";
import { TypeBadgeAuto } from "@/components/ui/type-badge";
import { accentStyles } from "./project-accent";
import { ProjectPreview } from "./project-preview";
import { useMouseDepth } from "@/hooks/use-mouse-depth";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

const MAX_TECH = 4;

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const a = accentStyles[project.accent];
  const chips = project.tech.slice(0, MAX_TECH);
  const depth = useMouseDepth(4);

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
        whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/45 text-left shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] outline-none transition-[border-color,box-shadow] duration-300 ease-out hover:border-zinc-400/50 hover:shadow-[0_28px_64px_-28px_rgba(56,189,248,0.18),0_22px_50px_-32px_rgba(0,0,0,0.55)] focus-visible:ring-2 focus-visible:ring-zinc-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          aria-label={`Open dossier: ${project.title}`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
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

              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                {project.buildId}
              </p>

              <div className="mb-2 mt-2 flex flex-wrap items-center gap-2">
                <p
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] ${a.category}`}
                >
                  {project.category}
                </p>
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
                {project.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                {project.description}
              </p>

              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Capability tags">
                {project.typeBadges.map((tag) => (
                  <li key={tag}>
                    <TypeBadgeAuto label={tag} />
                  </li>
                ))}
              </ul>

              <p className="mt-4 font-mono text-xs text-zinc-500">
                <span className="text-zinc-600">Impact · </span>
                {project.impact}
              </p>

              <ul
                className="mt-4 flex flex-wrap gap-1.5 border-t border-zinc-800/60 pt-4"
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
