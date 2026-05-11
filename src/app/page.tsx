import { PokemonCenterIntro } from "@/components/onboarding/pokemon-center-intro";
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
        className="border-t border-zinc-900 bg-zinc-950"
      >
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <PokedexSection />
        <ResumeSection />
        <ContactSection />
      </main>
    </>
  );
}
