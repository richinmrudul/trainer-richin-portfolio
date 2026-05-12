"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  DEFAULT_SKILL_ID,
  type SkillCategory,
  skills,
} from "@/content/skills";
import { SectionContainer } from "@/components/layout/SectionContainer";
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

export function PokedexSection() {
  const reduceMotion = useReducedMotion();
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
    <SectionContainer id="pokedex" aria-labelledby="pokedex-heading">
      <motion.header
        className="max-w-3xl space-y-3"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
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
      </motion.header>

      <motion.div
        className="mt-12 md:mt-16"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <PokemonPanel
          variant="red"
          label="Dex terminal · skills"
          className="shadow-[0_28px_90px_-32px_rgba(0,0,0,0.88)]"
          showGrid
        >
          <div className="rounded-xl border border-zinc-800/75 bg-zinc-950/90 p-4 shadow-inner md:p-5">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
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
    </SectionContainer>
  );
}
