import { PokemonCenterIntro } from "@/components/onboarding/pokemon-center-intro";
import { AmbientParticles } from "@/components/effects/ambient-particles";
import { AtmosphericBackground } from "@/components/effects/atmospheric-background";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { TrainerHudNav } from "@/components/layout/trainer-hud-nav";
import { PortfolioRouteProvider } from "@/components/layout/scroll-route-context";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ActivitySection } from "@/components/sections/activity-section";
import { PokedexSection } from "@/components/sections/pokedex-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <PortfolioRouteProvider>
      <PokemonCenterIntro />
      <main
        id="portfolio-main"
        className="route-world relative isolate overflow-x-hidden border-t border-[var(--border-game-soft)]"
      >
        <AtmosphericBackground />
        <CursorGlow />
        <AmbientParticles />
        <div className="relative z-10 pr-14">
          <HeroSection />
          <ProjectsSection />
          <ExperienceSection />
          <ActivitySection />
          <PokedexSection />
          <ResumeSection />
          <ContactSection />
        </div>
      </main>
      <TrainerHudNav />
    </PortfolioRouteProvider>
  );
}
