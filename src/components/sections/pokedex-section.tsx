"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_SKILL_ID,
  type SkillCategory,
  skills,
} from "@/content/skills";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionReveal, ScrollReveal } from "@/components/effects/section-reveal";
import { RouteSignHeader } from "@/components/ui/route-sign-header";
import { PokemonPanel } from "@/components/ui/pokemon-panel";
import { SkillCategoryTabs } from "@/components/pokedex/skill-category-tabs";
import { SkillList } from "@/components/pokedex/skill-list";
import { SkillDetailPanel } from "@/components/pokedex/skill-detail-panel";

const LISTBOX_ID = "pokedex-skill-listbox";

function filterSkills(category: SkillCategory, query: string) {
  const q = query.trim().toLowerCase();
  return skills.filter((s) => {
    if (s.category !== category) return false;
    if (!q) return true;
    if (s.name.toLowerCase().includes(q)) return true;
    return s.tags.some((t) => t.toLowerCase().includes(q));
  });
}

export function PokedexSection({ embedded = false }: { embedded?: boolean }) {
  const reduceMotion = useReducedMotion();
  const dexRef = useRef<HTMLDivElement>(null);
  const dexInView = useInView(dexRef, { once: true, margin: "-8% 0px" });
  const [scanSweep, setScanSweep] = useState(false);

  useEffect(() => {
    if (!dexInView || reduceMotion) return;
    const id = window.setTimeout(() => setScanSweep(true), 100);
    return () => window.clearTimeout(id);
  }, [dexInView, reduceMotion]);

  const [category, setCategory] = useState<SkillCategory>("languages");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(DEFAULT_SKILL_ID);

  const filtered = useMemo(
    () => filterSkills(category, search),
    [category, search],
  );

  const displayedSkill = useMemo(() => {
    if (filtered.length === 0) return null;
    return filtered.find((s) => s.id === selectedId) ?? filtered[0] ?? null;
  }, [filtered, selectedId]);

  useEffect(() => {
    if (filtered.length === 0) return;
    if (filtered.some((s) => s.id === selectedId)) return;
    const id = filtered[0]!.id;
    queueMicrotask(() => {
      setSelectedId(id);
    });
  }, [filtered, selectedId]);

  return (
    <SectionContainer
      id={embedded ? undefined : "pokedex"}
      aria-labelledby="pokedex-heading"
      className={embedded ? "py-8 md:py-10" : ""}
    >
      <SectionReveal>
        <header className="max-w-3xl space-y-5">
          <RouteSignHeader label="Technical Pokédex" />
          <h2
            id="pokedex-heading"
            className="text-balance text-2xl font-semibold tracking-tight text-[#faf8f3] md:text-3xl"
          >
            Technical Pokédex
          </h2>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-[#d4cdc0]">
            A catalog of languages, frameworks, and systems I use to build
            production software - searchable, categorized, and proficiency-scoped.
          </p>
        </header>
      </SectionReveal>

      <div className="relative mt-12 md:mt-16">
        {!reduceMotion ? (
          <div
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-b from-rose-950/20 via-transparent to-zinc-950/80 opacity-90 blur-2xl"
            aria-hidden
          />
        ) : null}

        <div
          ref={dexRef}
          className={
            !reduceMotion && dexInView ? "pokedex-dex-boot relative" : "relative"
          }
        >
          <PokemonPanel
            variant="pokedex"
            label="Dex terminal · skills"
            className="shadow-[0_28px_90px_-32px_rgba(0,0,0,0.88)]"
            showGrid
          >
            <div className="relative overflow-hidden rounded-xl border border-[#ede6d8]/18 bg-gradient-to-b from-[#141a1c]/95 to-[#0c1012]/98 p-4 shadow-[inset_0_1px_0_0_rgba(255,250,240,0.06)] md:p-5">
              {scanSweep && !reduceMotion ? (
                <div
                  className="pokedex-scan-once pointer-events-none absolute inset-x-[6%] top-0 z-[4] h-full"
                  aria-hidden
                />
              ) : null}

              <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
                <ScrollReveal variant="fadeUp" delay={0.06} className="min-h-0">
                  <div className="flex min-h-0 flex-col gap-4">
                    <SkillCategoryTabs active={category} onChange={setCategory} />
                    <SkillList
                      skills={filtered}
                      selectedId={selectedId}
                      onSelect={setSelectedId}
                      search={search}
                      onSearchChange={setSearch}
                      listId={LISTBOX_ID}
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="fadeUp" delay={0.18} className="min-h-0 lg:pl-1">
                  <SkillDetailPanel
                    skill={displayedSkill}
                    emptyMessage={
                      filtered.length === 0
                        ? "No skills match this filter. Try clearing search or another category."
                        : "Select a skill from the catalog."
                    }
                  />
                </ScrollReveal>
              </div>
            </div>
          </PokemonPanel>
        </div>
      </div>
    </SectionContainer>
  );
}
