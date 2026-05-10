import { SectionContainer } from "@/components/layout/SectionContainer";

export function ResumeSection() {
  return (
    <SectionContainer id="resume" aria-labelledby="resume-heading">
      <header className="max-w-2xl space-y-2">
        <h2
          id="resume-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500"
        >
          Résumé
        </h2>
        <p className="text-zinc-400">Download and highlights will appear here.</p>
      </header>
    </SectionContainer>
  );
}
