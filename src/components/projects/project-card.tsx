"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/content/projects";
import { TypeBadgeAuto } from "@/components/ui/type-badge";
import { accentStyles } from "./project-accent";
import { ProjectPreview } from "./project-preview";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

const MAX_TECH = 4;

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const a = accentStyles[project.accent];
  const chips = project.tech.slice(0, MAX_TECH);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const rafTilt = useRef<number | null>(null);

  const resetTilt = useCallback(() => {
    const tilt = tiltRef.current;
    if (!tilt) return;
    tilt.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (reduceMotion) return;
      const btn = buttonRef.current;
      const tilt = tiltRef.current;
      if (!btn || !tilt) return;
      if (rafTilt.current != null) cancelAnimationFrame(rafTilt.current);
      rafTilt.current = requestAnimationFrame(() => {
        rafTilt.current = null;
        const r = btn.getBoundingClientRect();
        const px = ((e.clientX - r.left) / Math.max(r.width, 1) - 0.5) * 2;
        const py = ((e.clientY - r.top) / Math.max(r.height, 1) - 0.5) * 2;
        const max = 5.5;
        tilt.style.transform = `perspective(1000px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateZ(0)`;
      });
    },
    [reduceMotion],
  );

  return (
    <div
      className="h-full [perspective:1200px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => onOpen(project)}
        onPointerMove={onPointerMove}
        onPointerLeave={resetTilt}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/40 text-left shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] outline-none transition-[border-color,box-shadow] duration-300 hover:border-zinc-600/80 focus-visible:ring-2 focus-visible:ring-zinc-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        aria-label={`Open dossier: ${project.title}`}
      >
        {/* Hover rim light — GPU-friendly opacity */}
        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${a.glow}`}
          aria-hidden
        />

        <div
          ref={tiltRef}
          className="relative flex h-full min-h-0 flex-col transition-[transform] duration-150 ease-out will-change-transform"
          style={{
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)",
          }}
        >
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
    </div>
  );
}
