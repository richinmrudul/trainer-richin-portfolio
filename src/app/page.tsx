import { PokemonCenterIntro } from "@/components/onboarding/pokemon-center-intro";
import { AmbientParticles } from "@/components/effects/ambient-particles";
import { AtmosphericBackground } from "@/components/effects/atmospheric-background";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { TrainerHudNav } from "@/components/layout/trainer-hud-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { PokedexSection } from "@/components/sections/pokedex-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <PokemonCenterIntro />
      <main
        id="portfolio-main"
        className="relative isolate overflow-x-hidden border-t border-emerald-900/35 bg-transparent pb-28 md:pb-32"
      >
        <AtmosphericBackground />
        <CursorGlow />
        <AmbientParticles />
        <div className="relative z-10">
          <HeroSection />
          <ProjectsSection />
          <ExperienceSection />
          <PokedexSection />
          <ResumeSection />
          <ContactSection />
        </div>
      </main>
      <TrainerHudNav />
    </>
  );
}
