"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type KeyboardEvent } from "react";
import type { Skill } from "@/content/skills";

type SkillListProps = {
  skills: Skill[];
  selectedId: string;
  onSelect: (id: string) => void;
  search: string;
  onSearchChange: (q: string) => void;
  listId: string;
  searchId: string;
};

export function SkillList({
  skills,
  selectedId,
  onSelect,
  search,
  onSearchChange,
  listId,
  searchId,
}: SkillListProps) {
  const reduceMotion = useReducedMotion();
  const optionRefs = useRef(new Map<string, HTMLButtonElement>());
  const effectiveSelectedId =
    skills.find((skill) => skill.id === selectedId)?.id ?? skills[0]?.id;

  useEffect(() => {
    const visibleIds = new Set(skills.map((skill) => skill.id));
    for (const id of optionRefs.current.keys()) {
      if (!visibleIds.has(id)) optionRefs.current.delete(id);
    }
  }, [skills]);

  function moveToOption(index: number) {
    const nextSkill = skills[index];
    if (!nextSkill) return;
    onSelect(nextSkill.id);
    optionRefs.current.get(nextSkill.id)?.focus();
  }

  function handleOptionKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIndex = (index + 1) % skills.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        nextIndex = (index - 1 + skills.length) % skills.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = skills.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    moveToOption(nextIndex);
  }

  return (
    <div className="pokedex-catalog">
      <div className="pokedex-search-wrap">
        <label htmlFor={searchId} className="pokedex-screen-label">
          Search database
        </label>
        <div className="pokedex-search-field">
          <span aria-hidden className="pokedex-search-field__prompt">
            &gt;
          </span>
          <input
            id={searchId}
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Name or tag…"
            autoComplete="off"
          />
          <span
            className="pokedex-search-field__count"
            aria-label={`${skills.length} matching skills`}
          >
            {String(skills.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      <ul
        id={listId}
        role="listbox"
        aria-label="Skills"
        aria-describedby={`${listId}-instructions`}
        className="custom-scrollbar pokedex-skill-list"
      >
        {skills.length === 0 ? (
          <li className="pokedex-skill-list__empty">
            <span aria-hidden>NO DATA</span>
            <span>No skills match this filter.</span>
          </li>
        ) : (
          skills.map((s, index) => {
            const isSelected = s.id === effectiveSelectedId;
            return (
              <li key={s.id} role="none" className="relative">
                <motion.button
                  ref={(node) => {
                    if (node) optionRefs.current.set(s.id, node);
                    else optionRefs.current.delete(s.id);
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  layout={!reduceMotion}
                  onClick={() => onSelect(s.id)}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                  whileTap={reduceMotion ? undefined : { scale: 0.995 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="pokedex-skill-option"
                >
                  <span aria-hidden className="pokedex-skill-option__cursor">
                    ▶
                  </span>
                  <span className="pokedex-skill-option__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pokedex-skill-option__name">{s.name}</span>
                  <span className="pokedex-skill-option__level">
                    {s.proficiency}/5
                  </span>
                </motion.button>
              </li>
            );
          })
        )}
      </ul>
      <p id={`${listId}-instructions`} className="sr-only">
        Use arrow keys to move through skills. Press Home or End to jump to the
        first or last skill.
      </p>
    </div>
  );
}
