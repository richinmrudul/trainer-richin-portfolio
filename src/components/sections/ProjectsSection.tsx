import { SectionContainer } from "@/components/layout/SectionContainer";

export function ProjectsSection() {
  return (
    <SectionContainer id="projects" aria-labelledby="projects-heading">
      <header className="max-w-2xl space-y-2">
        <h2
          id="projects-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500"
        >
          Projects
        </h2>
        <p className="text-zinc-400">Work samples will appear here.</p>
      </header>
    </SectionContainer>
  );
}
