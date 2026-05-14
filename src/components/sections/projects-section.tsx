"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { projects, type Project } from "@/content/projects";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { RouteSignHeader } from "@/components/ui/route-sign-header";
import { ProjectCard } from "@/components/projects/project-card";

const ProjectDetailModal = dynamic(
  () =>
    import("@/components/projects/project-detail-modal").then((mod) => ({
      default: mod.ProjectDetailModal,
    })),
  { ssr: false },
);

export function ProjectsSection({ embedded = false }: { embedded?: boolean }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <SectionContainer
        id={embedded ? undefined : "projects"}
        aria-labelledby="projects-heading"
      >
        <ScrollReveal variant="fadeUp">
          <header className="max-w-3xl space-y-5">
            <RouteSignHeader label="Project team" />
            <h2
              id="projects-heading"
              className="text-balance text-2xl font-semibold tracking-tight text-[#faf8f3] md:text-3xl"
            >
              Battle-tested builds
            </h2>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-[#d4cdc0]">
              Full-stack systems, ML pipelines, and shipped products—focused on
              measurable impact, solid architecture, and clear execution.
            </p>
          </header>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3 xl:gap-8">
          {projects.map((p, i) => (
            <ScrollReveal key={p.id} variant="fadeUp" delay={i * 0.1}>
              <ProjectCard
                project={p}
                entryIndex={i + 1}
                onOpen={setActive}
              />
            </ScrollReveal>
          ))}
        </div>
      </SectionContainer>

      <ProjectDetailModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
