"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, BookOpen, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type RefObject,
} from "react";
import type { Project } from "@/content/projects";
import { easeOutExpo } from "@/lib/motion";
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

const blockTransition = {
  duration: 0.38,
  ease: easeOutExpo,
} as const;

type ProjectDetailModalProps = {
  project: Project | null;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
};

export function ProjectDetailModal({
  project,
  onClose,
  returnFocusRef,
}: ProjectDetailModalProps) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const open = project !== null;
  const modalAccentStyle = project
    ? ({
        "--project-modal-accent": accentStyles[project.accent].color,
        "--project-modal-accent-deep": accentStyles[project.accent].deepColor,
      } as CSSProperties)
    : undefined;

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
    document.body.classList.add("project-detail-modal-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("project-detail-modal-open");
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

  const stagger = reduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.055, delayChildren: 0.06 },
        },
      };

  const item = reduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: blockTransition },
      };

  return (
    <AnimatePresence
      onExitComplete={() => {
        returnFocusRef?.current?.focus();
      }}
    >
      {project && (
        <motion.div
          key={project.id}
          role="presentation"
          data-project-detail-modal="open"
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22, ease: easeOutExpo }}
        >
          <motion.button
            type="button"
            aria-label="Close project entry"
            className="project-detail-backdrop absolute inset-0 bg-zinc-950/75 backdrop-blur-md"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="project-detail-shell relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-[#34394a] bg-[#f3ead6] shadow-[0_32px_100px_-28px_rgba(0,0,0,0.92)] sm:rounded-2xl"
            style={modalAccentStyle}
            initial={
              reduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? undefined : { opacity: 0, y: 14, scale: 0.99 }
            }
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="project-detail-accent-bar h-1 w-full shrink-0"
              aria-hidden
            />

            <div className="project-detail-header flex items-start justify-between gap-3 border-b border-[#aaa08f] bg-[#f8f0dd] px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-2">
                <BookOpen
                  className="h-4 w-4 shrink-0 text-[#b8ad9c]"
                  aria-hidden
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ad9c]">
                  Pokétch project summary
                </p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="project-detail-close rounded-lg border border-[#6e675c] bg-[#f8f0dd] p-2 text-[#3c3b45] transition-colors hover:border-[#3c3b45] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f87b5]"
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row">
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="project-detail-visual shrink-0 border-b border-[#34394a] bg-[#24313a] p-4 sm:p-6 md:w-[46%] md:border-b-0 md:border-r md:border-[#34394a]"
              >
                <motion.div variants={item}>
                  <ProjectPreview
                    src={project.image}
                    alt={`${project.title} preview`}
                    accent={project.accent}
                    variant="modal"
                  />
                </motion.div>
                <motion.div
                  variants={item}
                  className="project-detail-metrics mt-4 rounded-lg border border-[#c9b896]/15 bg-black/30 px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,250,240,0.04)]"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8275]">
                    Metrics
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#d4cdc0]">
                    {project.metrics.map((m) => (
                      <li key={m} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9b896]/50" aria-hidden />
                        {m}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="project-detail-copy flex min-w-0 flex-1 flex-col gap-5 p-4 sm:p-6"
              >
                <motion.div variants={item}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a8275]">
                    Entry ref · {project.buildId}
                  </p>
                  <p
                    className="project-detail-category mt-2 inline-block rounded-full border px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
                  >
                    {project.category}
                  </p>
                  <h2
                    id={titleId}
                    className="mt-3 text-balance text-3xl font-semibold tracking-[-0.02em] text-[#faf8f3] sm:text-[2.1rem]"
                  >
                    {project.title}
                  </h2>
                  <ul
                    className="mt-4 flex flex-wrap gap-1.5"
                    aria-label="Capability tags"
                  >
                    {project.typeBadges.map((tag) => (
                      <li key={tag}>
                        <TypeBadgeAuto label={tag} />
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-base leading-relaxed text-[#c9c2b6] sm:text-[17px]">
                    {project.description}
                  </p>
                </motion.div>

                <motion.div
                  variants={item}
                  className="project-detail-block rounded-xl border border-[#ede6d8]/10 bg-black/22 p-4 shadow-[inset_0_1px_0_0_rgba(255,250,240,0.04)]"
                >
                  <h3 className="border-b border-[#ede6d8]/10 pb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#e8e0d4]">
                    System architecture
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#d4cdc0] md:text-[15px]">
                    {project.architecture}
                  </p>
                </motion.div>

                <motion.div variants={item}>
                  <h3 className="border-b border-[#ede6d8]/10 pb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#e8e0d4]">
                    Engineering highlights
                  </h3>
                  <ul className="mt-3 list-inside list-disc space-y-2.5 text-sm leading-relaxed text-[#d4cdc0] marker:text-[#c9b896]/70 md:text-[15px]">
                    {project.bullets.map((b, i) => (
                      <li key={`${project.id}-bullet-${i}`} className="pl-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={item}>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8275]">
                    Stack
                  </h3>
                  <ul
                    className="mt-3 flex flex-wrap gap-2"
                    aria-label="Technologies"
                  >
                    {project.tech.map((t) => (
                      <li key={t}>
                        <span
                          className="project-detail-chip inline-block rounded-md border px-2.5 py-1 font-mono text-[11px]"
                        >
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={item}>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8275]">
                    Lessons learned
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#a8a095]">
                    {project.lessonsLearned.map((line, i) => (
                      <li key={`${project.id}-lesson-${i}`} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9b896]/50" aria-hidden />
                        {line}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  variants={item}
                  className="project-detail-impact rounded-lg border border-[#c9b896]/18 bg-black/35 px-4 py-3"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8275]">
                    Impact
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#f4f1ea]">
                    {project.impact}
                  </p>
                </motion.div>

                <motion.div variants={item} className="mt-auto flex flex-wrap gap-3 pt-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-detail-primary-action inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
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
                      className="project-detail-secondary-action inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
                    >
                      <GitHubMark className="h-4 w-4" />
                      GitHub
                    </a>
                  ) : null}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
