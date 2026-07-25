"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, type KeyboardEvent } from "react";
import type { SkillCategory } from "@/content/skills";
import { skillCategoryLabels, skillCategories } from "@/content/skills";

type SkillCategoryTabsProps = {
  active: SkillCategory;
  onChange: (c: SkillCategory) => void;
  panelId: string;
  tabIdPrefix: string;
};

export function SkillCategoryTabs({
  active,
  onChange,
  panelId,
  tabIdPrefix,
}: SkillCategoryTabsProps) {
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveToTab(index: number) {
    const nextCategory = skillCategories[index];
    if (!nextCategory) return;
    onChange(nextCategory);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % skillCategories.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex =
          (index - 1 + skillCategories.length) % skillCategories.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = skillCategories.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    moveToTab(nextIndex);
  }

  return (
    <div
      role="tablist"
      aria-label="Skill categories"
      className="pokedex-category-tabs"
    >
      {skillCategories.map((cat, index) => {
        const isActive = active === cat;
        return (
          <motion.button
            key={cat}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId}
            id={`${tabIdPrefix}-${cat}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(cat)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            whileTap={reduceMotion ? undefined : { y: 1 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pokedex-category-tab"
          >
            <span aria-hidden className="pokedex-category-tab__led" />
            <span>{skillCategoryLabels[cat]}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
