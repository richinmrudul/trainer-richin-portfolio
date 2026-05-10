import { site } from "@/content/site";
import { SectionContainer } from "@/components/layout/SectionContainer";

export function HeroSection() {
  return (
    <SectionContainer id="hero" aria-labelledby="hero-heading">
      <div className="max-w-2xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          Welcome
        </p>
        <h1
          id="hero-heading"
          className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl"
        >
          {site.trainerName}
        </h1>
        <p className="text-pretty text-lg text-zinc-400">{site.subtitle}</p>
      </div>
    </SectionContainer>
  );
}
