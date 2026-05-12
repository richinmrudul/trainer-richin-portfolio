"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { projects, type Project } from "@/content/projects";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionReveal } from "@/components/layout/section-reveal";
import { ProjectCard } from "@/components/projects/project-card";

const ProjectDetailModal = dynamic(
  () =>
    import("@/components/projects/project-detail-modal").then((mod) => ({
      default: mod.ProjectDetailModal,
    })),
  { ssr: false },
);

export function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <SectionContainer id="projects" aria-labelledby="projects-heading">
        <SectionReveal>
          <header className="max-w-3xl space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              Project team
            </p>
            <h2
              id="projects-heading"
              className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl"
            >
              Battle-tested builds
            </h2>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-zinc-400">
              Full-stack systems, ML pipelines, and shipped products—focused on
              measurable impact, solid architecture, and clear execution.
            </p>
          </header>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3 xl:gap-8">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setActive} />
            ))}
          </div>
        </SectionReveal>
      </SectionContainer>

      <ProjectDetailModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
