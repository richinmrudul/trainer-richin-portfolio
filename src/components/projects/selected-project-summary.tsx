"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import type { CSSProperties, MouseEvent } from "react";
import type { Project } from "@/content/projects";
import { TypeBadgeAuto } from "@/components/ui/type-badge";
import { ProjectPreview } from "./project-preview";
import { accentStyles } from "./project-accent";

type SelectedProjectSummaryProps = {
  project: Project;
  panelId: string;
  onOpen: (
    project: Project,
    trigger: HTMLButtonElement,
  ) => void;
};

type SummaryAccentProperties = CSSProperties & {
  "--party-accent": string;
  "--party-accent-soft": string;
  "--party-accent-deep": string;
};

export function SelectedProjectSummary({
  project,
  panelId,
  onOpen,
}: SelectedProjectSummaryProps) {
  const reduceMotion = useReducedMotion();
  const accent = accentStyles[project.accent];
  const style: SummaryAccentProperties = {
    "--party-accent": accent.color,
    "--party-accent-soft": accent.softColor,
    "--party-accent-deep": accent.deepColor,
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    onOpen(project, event.currentTarget);
  };

  return (
    <div className="project-party-summary-frame" style={style}>
      <div className="project-party-summary-frame__top" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={project.id}
          id={panelId}
          role="tabpanel"
          aria-labelledby={`project-party-tab-${project.id}`}
          className="project-party-summary"
          initial={reduceMotion ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
        >
          <div className="project-party-summary__screen">
            <div className="project-party-summary__scanline" aria-hidden />
            <ProjectPreview
              src={project.image}
              alt={`${project.title} project preview`}
              accent={project.accent}
              className="project-party-summary__preview"
            />
            <div className="project-party-summary__screen-label">
              <span>Project preview</span>
              <span>{project.buildId}</span>
            </div>
          </div>

          <div className="project-party-summary__content">
            <div className="project-party-summary__eyebrow">
              <span className="project-party-summary__type-dot" aria-hidden />
              <span>{project.category}</span>
              <span className="project-party-summary__entry">
                Party entry {project.buildId.match(/\d+/)?.[0] ?? ""}
              </span>
            </div>

            <h3>{project.title}</h3>

            <ul
              className="project-party-summary__badges"
              aria-label="Project capabilities"
            >
              {project.typeBadges.map((badge) => (
                <li key={badge}>
                  <TypeBadgeAuto label={badge} />
                </li>
              ))}
            </ul>

            <p className="project-party-summary__description">
              {project.description}
            </p>

            {project.note ? (
              <p className="mt-3 rounded-md border border-[#c9b896]/25 bg-black/15 px-3 py-2 font-mono text-[12px] leading-snug text-[#5f574d]">
                {project.note}
              </p>
            ) : null}

            <div className="project-party-summary__impact">
              <Sparkles aria-hidden />
              <div>
                <span>Battle result / impact</span>
                <strong>{project.impact}</strong>
              </div>
            </div>

            <div className="project-party-summary__stack">
              <span>Technologies</span>
              <ul aria-label="Technologies">
                {project.tech.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="project-party-summary__action"
              onClick={handleOpen}
            >
              <BookOpen aria-hidden />
              Inspect full project
              <ArrowUpRight aria-hidden />
            </button>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
