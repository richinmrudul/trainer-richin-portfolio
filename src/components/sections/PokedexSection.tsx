import { SectionContainer } from "@/components/layout/SectionContainer";

export function PokedexSection() {
  return (
    <SectionContainer id="pokedex" aria-labelledby="pokedex-heading">
      <header className="max-w-2xl space-y-2">
        <h2
          id="pokedex-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500"
        >
          Pokédex
        </h2>
        <p className="text-zinc-400">Skills catalog scaffold.</p>
      </header>
    </SectionContainer>
  );
}
