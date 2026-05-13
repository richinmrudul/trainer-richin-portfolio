"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_SKILL_ID,
  type SkillCategory,
  skills,
} from "@/content/skills";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { PokemonPanel } from "@/components/ui/pokemon-panel";
import { SkillCategoryTabs } from "@/components/pokedex/skill-category-tabs";
import { SkillList } from "@/components/pokedex/skill-list";
import { SkillDetailPanel } from "@/components/pokedex/skill-detail-panel";
import { useMouseDepth } from "@/hooks/use-mouse-depth";

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
  const dexInView = useInView(dexRef, { once: true, margin: "-12% 0px" });
  const depth = useMouseDepth(3.5);

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
      <ScrollReveal variant="fadeUp">
        <header className="max-w-3xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
            Skill database
          </p>
          <h2
            id="pokedex-heading"
            className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl"
          >
            Technical Pokédex
          </h2>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-zinc-400">
            A catalog of languages, frameworks, and systems I use to build
            production software—searchable, categorized, and proficiency-scoped.
          </p>
        </header>
      </ScrollReveal>

      <div className="relative mt-12 md:mt-16">
        {!reduceMotion ? (
          <div
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-b from-rose-950/20 via-transparent to-zinc-950/80 opacity-90 blur-2xl"
            aria-hidden
          />
        ) : null}

        <motion.div
          ref={dexRef}
          style={
            reduceMotion || !depth.enabled
              ? undefined
              : { x: depth.x, y: depth.y, willChange: "transform" }
          }
          className={
            !reduceMotion && dexInView ? "pokedex-dex-boot relative" : "relative"
          }
        >
          {!reduceMotion && dexInView ? (
            <div
              className="pointer-events-none absolute inset-x-[8%] top-[-6%] z-[2] h-[120%] pokedex-scan-beam"
              aria-hidden
            />
          ) : null}

          <PokemonPanel
            variant="red"
            label="Dex terminal · skills"
            className="shadow-[0_28px_90px_-32px_rgba(0,0,0,0.88)]"
            showGrid
          >
            <div className="relative overflow-hidden rounded-xl border border-zinc-800/75 bg-zinc-950/90 p-4 shadow-inner md:p-5">
              <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
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

                <div className="min-h-0 lg:pl-1">
                  <SkillDetailPanel
                    skill={displayedSkill}
                    emptyMessage={
                      filtered.length === 0
                        ? "No skills match this filter. Try clearing search or another category."
                        : "Select a skill from the catalog."
                    }
                  />
                </div>
              </div>
            </div>
          </PokemonPanel>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
