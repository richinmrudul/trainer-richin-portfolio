import { PokemonCenterIntro } from "@/components/onboarding/PokemonCenterIntro";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { PokedexSection } from "@/components/sections/PokedexSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
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
