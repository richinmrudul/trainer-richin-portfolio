import { SectionContainer } from "@/components/layout/SectionContainer";

export function ExperienceSection() {
  return (
    <SectionContainer id="experience" aria-labelledby="experience-heading">
      <header className="max-w-2xl space-y-2">
        <h2
          id="experience-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500"
        >
          Experience
        </h2>
        <p className="text-zinc-400">Roles and impact will appear here.</p>
      </header>
    </SectionContainer>
  );
}
