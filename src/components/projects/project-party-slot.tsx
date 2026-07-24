"use client";

import type { CSSProperties, KeyboardEvent, Ref } from "react";
import type { Project } from "@/content/projects";
import { accentStyles } from "./project-accent";

type ProjectPartySlotProps = {
  project: Project;
  index: number;
  selected: boolean;
  panelId: string;
  buttonRef: Ref<HTMLButtonElement>;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

type PartyAccentProperties = CSSProperties & {
  "--party-accent": string;
  "--party-accent-soft": string;
  "--party-accent-deep": string;
};

export function ProjectPartySlot({
  project,
  index,
  selected,
  panelId,
  buttonRef,
  onSelect,
  onKeyDown,
}: ProjectPartySlotProps) {
  const accent = accentStyles[project.accent];
  const style: PartyAccentProperties = {
    "--party-accent": accent.color,
    "--party-accent-soft": accent.softColor,
    "--party-accent-deep": accent.deepColor,
  };

  return (
    <button
      ref={buttonRef}
      id={`project-party-tab-${project.id}`}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      className="project-party-slot"
      style={style}
      onClick={onSelect}
      onKeyDown={onKeyDown}
    >
      <span className="project-party-slot__number" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="project-party-slot__ball" aria-hidden>
        <span />
      </span>

      <span className="project-party-slot__copy">
        <span className="project-party-slot__category">{project.category}</span>
        <span className="project-party-slot__title">{project.title}</span>
        <span className="project-party-slot__impact">
          <span aria-hidden>◆</span>
          {project.impact}
        </span>
      </span>

      <span className="project-party-slot__status" aria-hidden>
        {selected ? "Active" : "Select"}
      </span>
    </button>
  );
}
