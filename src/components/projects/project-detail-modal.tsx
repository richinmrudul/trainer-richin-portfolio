"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Sparkles, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import type { Project } from "@/content/projects";
import { TypeBadgeAuto } from "@/components/ui/type-badge";
import { accentStyles } from "./project-accent";
import { ProjectPreview } from "./project-preview";

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

type ProjectDetailModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const open = project !== null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
  }, [open, project?.id]);

  useEffect(() => {
    if (!open || !panelRef.current) return;

    const getFocusable = () =>
      panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      if (
        document.activeElement &&
        !panelRef.current.contains(document.activeElement)
      ) {
        return;
      }
      const nodes = getFocusable();
      if (!nodes?.length) return;
      const list = Array.from(nodes).filter((el) => !el.hasAttribute("disabled"));
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          role="presentation"
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close project dossier"
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[6px]"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-zinc-800/90 bg-zinc-900/95 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] sm:rounded-2xl"
            initial={
              reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }
            }
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`h-1 w-full shrink-0 bg-gradient-to-r ${accentStyles[project.accent].modalBar}`}
              aria-hidden
            />

            <div className="flex items-start justify-between gap-3 border-b border-zinc-800/80 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-2">
                <Sparkles
                  className="h-4 w-4 shrink-0 text-zinc-500"
                  aria-hidden
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Project dossier
                </p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="rounded-lg border border-zinc-700/80 bg-zinc-950/50 p-2 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row">
              <div className="shrink-0 border-b border-zinc-800/80 p-4 sm:p-6 md:w-[46%] md:border-b-0 md:border-r md:border-zinc-800/80">
                <ProjectPreview
                  src={project.image}
                  alt={`${project.title} preview`}
                  accent={project.accent}
                  variant="modal"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-5 p-4 sm:p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    {project.buildId}
                  </p>
                  <p
                    className={`mt-2 font-mono text-[10px] uppercase tracking-[0.2em] ${accentStyles[project.accent].category}`}
                  >
                    {project.category}
                  </p>
                  <h2
                    id={titleId}
                    className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
                  >
                    {project.title}
                  </h2>
                  <ul
                    className="mt-3 flex flex-wrap gap-1.5"
                    aria-label="Capability tags"
                  >
                    {project.typeBadges.map((tag) => (
                      <li key={tag}>
                        <TypeBadgeAuto label={tag} />
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Engineering highlights
                  </h3>
                  <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-zinc-300 marker:text-zinc-600">
                    {project.bullets.map((b, i) => (
                      <li key={`${project.id}-bullet-${i}`} className="pl-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Stack
                  </h3>
                  <ul
                    className="mt-3 flex flex-wrap gap-2"
                    aria-label="Technologies"
                  >
                    {project.tech.map((t) => (
                      <li key={t}>
                        <span
                          className={`inline-block rounded-md border px-2.5 py-1 font-mono text-[11px] ${accentStyles[project.accent].chip}`}
                        >
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/50 px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Impact
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">
                    {project.impact}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden />
                      Live
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
                    >
                      <GitHubMark className="h-4 w-4" />
                      GitHub
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
