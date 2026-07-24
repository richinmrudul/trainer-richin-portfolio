"use client";

import dynamic from "next/dynamic";
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { projects, type Project } from "@/content/projects";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionReveal } from "@/components/effects/section-reveal";
import { RouteSignHeader } from "@/components/ui/route-sign-header";
import { ProjectPartySlot } from "@/components/projects/project-party-slot";
import { SelectedProjectSummary } from "@/components/projects/selected-project-summary";

const ProjectDetailModal = dynamic(
  () =>
    import("@/components/projects/project-detail-modal").then((mod) => ({
      default: mod.ProjectDetailModal,
    })),
  { ssr: false },
);

export function ProjectsSection({ embedded = false }: { embedded?: boolean }) {
  const panelId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [active, setActive] = useState<Project | null>(null);
  const slotRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  const selectedProject = projects[selectedIndex];

  const selectAndFocus = (index: number) => {
    const wrappedIndex = (index + projects.length) % projects.length;
    setSelectedIndex(wrappedIndex);
    slotRefs.current[wrappedIndex]?.focus();
  };

  const handleSlotKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = index + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = projects.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectAndFocus(nextIndex);
  };

  const openProject = (project: Project, trigger: HTMLElement) => {
    modalTriggerRef.current = trigger;
    setActive(project);
  };

  return (
    <>
      <SectionContainer
        id={embedded ? undefined : "projects"}
        aria-labelledby="projects-heading"
        className="project-party-section"
      >
        <SectionReveal>
          <header className="max-w-3xl space-y-5">
            <RouteSignHeader label="Project team" />
            <h2
              id="projects-heading"
              className="text-balance text-2xl font-semibold tracking-tight text-[#faf8f3] md:text-3xl"
            >
              Battle-tested builds
            </h2>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-[#d4cdc0]">
              Infrastructure, full-stack systems, ML pipelines, and shipped
              products - focused on measurable impact, solid architecture, and
              clear execution.
            </p>
          </header>
        </SectionReveal>

        <div className="project-party-layout">
          <div className="project-party-roster">
            <div className="project-party-roster__header">
              <div>
                <span>Trainer party</span>
                <strong>6 / 6 builds ready</strong>
              </div>
              <p>Choose a slot to inspect its field summary.</p>
            </div>

            <div
              className="project-party-roster__slots"
              role="tablist"
              aria-label="Project party"
            >
              {projects.map((project, index) => (
                <ProjectPartySlot
                  key={project.id}
                  project={project}
                  index={index}
                  selected={selectedIndex === index}
                  panelId={panelId}
                  buttonRef={(node) => {
                    slotRefs.current[index] = node;
                  }}
                  onSelect={() => setSelectedIndex(index)}
                  onKeyDown={(event) => handleSlotKeyDown(event, index)}
                />
              ))}
            </div>

            <p className="project-party-roster__hint">
              <span aria-hidden>✦</span>
              Arrow keys move through party slots. Every build stays visible
              without opening a detail screen.
            </p>
          </div>

          <SelectedProjectSummary
            project={selectedProject}
            panelId={panelId}
            onOpen={openProject}
          />
        </div>
      </SectionContainer>

      <ProjectDetailModal
        project={active}
        onClose={() => setActive(null)}
        returnFocusRef={modalTriggerRef}
      />
    </>
  );
}
