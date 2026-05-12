"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects, type Project } from "@/content/projects";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDetailModal } from "@/components/projects/project-detail-modal";

export function ProjectsSection() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <SectionContainer id="projects" aria-labelledby="projects-heading">
        <motion.header
          className="max-w-3xl space-y-4"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.header>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3 xl:gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setActive} />
          ))}
        </div>
      </SectionContainer>

      <ProjectDetailModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
