# Trainer Richin Portfolio — Autonomous Redesign Roadmap

## Product direction

The portfolio will become a literal, Gen 4-inspired Pokémon journey while
remaining immediately useful to software-engineering recruiters, developers,
and collaborators.

The redesign uses Pokémon as the world and interaction language. Richin's
engineering work remains the primary content.

Decisions already locked:

- Keep the playable Pokémon Center introduction.
- Use a sunset route for the main trainer-profile hero.
- Preserve the complete current biography.
- Use a hybrid six-slot project party with a large selected-project summary.
- Present experience as a vertical overworld route with connected locations.
- Preserve and strengthen the interactive Technical Pokédex.
- Use medium interaction: scrolling and selection should feel game-like, but
  essential information must not require character movement.
- Preserve the trainer card, headshot, six projects, project-detail modals,
  floating navigation, résumé actions, contact links, and current content.
- Do not require commissioned or hand-drawn artwork. Prefer existing assets,
  CSS environments, reusable interface primitives, and restrained geometric
  decoration.

## Non-breaking contract

Every implementation phase must preserve these behaviors unless its acceptance
criteria explicitly replace the presentation:

1. The page remains statically renderable through the Next.js App Router.
2. The intro can be completed or skipped and always releases the body scroll
   lock.
3. Desktop intro controls remain available: WASD/arrow movement, Shift sprint,
   E/Enter interaction, Escape behavior, collision handling, receptionist and
   visitor dialogue, and numeric destination shortcuts. Coarse-pointer/mobile
   visitors retain a direct-entry fallback.
4. The destination flow continues to support `#home`, `#projects`,
   `#experience`, `#pokedex`, `#resume`, and `#contact`.
5. The floating navigation reports the active section and moves to each
   destination.
6. `main#portfolio-main` remains the stable application container used by the
   current visual effects.
7. Every project is visible in the page without opening a modal.
8. Every project can open its detail modal.
9. Project modals close through the close control, backdrop, and Escape key;
   focus remains trapped while open.
10. The Technical Pokédex preserves category selection, search, skill
   selection, proficiency information, keyboard access, and its empty state.
11. The trainer profile card remains operable with fine-pointer hover/click,
    coarse-pointer tap, Enter/Space, `aria-pressed`, and a reduced-motion
    alternative.
12. GitHub, LinkedIn, Spotify, project, résumé, email, and other outbound links
    retain their current destinations.
13. The résumé remains both viewable and downloadable from `/resume.pdf`.
14. All primary content remains available with reduced motion enabled.
15. Decorative environment layers remain hidden from assistive technology and
    never intercept pointer input.
16. No phase removes or rewrites résumé claims, project metrics, employment
    history, technologies, or the full biography without user approval.
17. The source-of-truth collections remain complete: six projects, five
    experiences, and 42 skills.
18. Sparse source entries remain valid. In particular, the current Pendo
    experience must render correctly without invented technologies or extra
    accomplishments.
19. Mobile layouts must not require horizontal page scrolling.

## Visual and usability principles

- First recruiter scan: name, current role, specialties, project evidence, and
  résumé action must remain obvious.
- Literal Pokémon cues belong in section composition, controls, transitions,
  and language—not only in decorative labels.
- Pixel typography is reserved for compact labels, location banners, and
  controls. Long-form content uses a highly readable sans-serif.
- Sunset colors provide the shared atmosphere. Each section may introduce a
  distinct environment while retaining common tokens and route continuity.
- Interaction is progressive enhancement. Visitors can scan and navigate the
  complete portfolio without completing the game or discovering hidden
  gestures.
- Animation must honor `prefers-reduced-motion`.
- Strong focus states, semantic headings, accessible names, and color contrast
  are release requirements.

## Phase workflow

Each phase is implemented on an isolated `codex/pokemon-phase-*` branch. The
master agent reviews the diff, runs the production build, completes relevant
interaction and visual checks, and requests fixes before publishing. A phase is
merged only after its acceptance criteria pass. The next branch begins from the
merged result.

User visual approval is required after Phase 3 and Phase 5.

## Phase 0 — Baseline, safeguards, and specification

Deliverables:

- This master roadmap and non-breaking contract.
- A clean baseline production build.
- An inventory of stable content, interactions, anchors, and data boundaries.
- A per-phase file map and validation matrix.
- An explicit warning against activating the dormant fixed-world prototypes,
  which currently depend on missing `/public/world/reference.webp` artwork and
  conflict with the scroll-first recruiter experience.

Acceptance criteria:

- No product code or content changes.
- Baseline build completes.
- The roadmap covers every requested phase and the two approval gates.
- The contract identifies all recruiter-critical and keyboard-critical flows.

## Phase 1 — Gen 4 sunset-route design foundations

Primary scope:

- Establish semantic design tokens for sunset sky, route terrain, cream
  dialogue surfaces, device surfaces, type accents, focus rings, text, and
  borders.
- Add reusable environment and game-interface primitives without changing the
  information architecture.
- Convert global atmosphere from a nearly uniform dark developer dashboard to
  a layered sunset-route foundation.
- Keep readable content surfaces and restrained motion.

Likely files:

- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/ui/pokemon-panel.tsx`
- `src/components/ui/route-sign-header.tsx`
- `src/components/layout/SectionContainer.tsx`
- focused new primitives under `src/components/layout/`

Acceptance criteria:

- Existing sections and interactions still work.
- Tokens are reusable by later phases; later components do not need unrelated
  one-off color systems.
- Text contrast remains recruiter-readable over every environment.
- Reduced-motion behavior remains intact.
- Desktop and mobile show no horizontal overflow.

## Phase 2 — Pokémon Center to sunset-route transition

Primary scope:

- Replace the generic intro dismissal with a staged exit into Route 01.
- Support game completion, destination selection, and skip behavior.
- Use a brief white/sky transition and location banner without delaying access
  to the portfolio.
- Preserve direct destination scrolling.

Likely files:

- `src/components/onboarding/pokemon-center-intro.tsx`
- `src/components/onboarding/game/pokemon-center-game.tsx`
- `src/lib/motion.ts`
- focused transition primitive under `src/components/onboarding/`
- `src/app/globals.css`

Acceptance criteria:

- Skip reaches `#home`; selected destinations reach their requested anchors.
- Scroll lock is always released.
- Transition is short, skippable through the existing flow, and static under
  reduced motion.
- No duplicate or stale overlay remains after exit.
- Intro focus is contained while modal and transferred to the selected
  destination after exit.

## Phase 3 — Sunset Route 01 trainer-profile hero

Primary scope:

- Present the complete biography inside a readable trainer introduction over a
  sunset route.
- Preserve the trainer card, headshot, social links, résumé link, metadata, and
  specialties.
- Add a recruiter-forward current-quest treatment and clear Projects/Résumé
  actions without removing existing content.
- Use environmental depth and route details that do not require custom art.

Likely files:

- `src/components/sections/hero-section.tsx`
- `src/components/hero/trainer-card-flip.tsx`
- focused sunset-route environment primitive
- `src/app/globals.css`

Acceptance criteria:

- Full biography remains present and readable.
- Name, current role, specialties, projects action, and résumé action are
  visible without game interaction.
- Trainer-card flip remains pointer- and keyboard-operable.
- Hero is coherent at desktop and mobile sizes.
- Production build and focused interaction checks pass.
- Pause for user visual approval before Phase 4.

## Phase 4 — Hybrid project party

Primary scope:

- Replace the uniform card grid with a six-slot party selector and a large
  selected-project summary.
- Keep every project scannable without opening the modal.
- Preserve the existing detailed modal as the deepest information layer while
  reskinning it toward a Gen 4 summary screen.
- Give each project a stable type/accent language based on existing data.

Likely files:

- `src/components/sections/projects-section.tsx`
- `src/components/projects/project-card.tsx`
- `src/components/projects/project-detail-modal.tsx`
- focused party-selector and selected-summary components
- `src/components/projects/project-accent.ts`
- `src/content/projects.ts` only if additive presentation metadata is needed

Acceptance criteria:

- Exactly six project slots are present.
- Keyboard and pointer users can change the selected project.
- The selected summary exposes title, screenshot, category, description,
  impact, and technologies.
- All six projects remain individually inspectable in the existing modal.
- Closing a project modal restores focus to the invoking party slot or action.
- Mobile uses a readable selector/summary flow without a cramped desktop party
  grid.

## Phase 5 — Vertical overworld experience journey

Primary scope:

- Transform the résumé timeline into a connected vertical route.
- Treat each employer or organization as a distinct location/checkpoint.
- Use CSS terrain, route lines, signs, and simple silhouettes rather than
  commissioned artwork.
- Preserve dates, roles, locations, bullets, and technologies.

Likely files:

- `src/components/sections/experience-section.tsx`
- `src/components/experience/experience-timeline-card.tsx`
- focused overworld route/location primitives
- `src/content/experience.ts` only for additive presentation metadata
- `src/app/globals.css`

Acceptance criteria:

- Every experience remains readable in document order.
- The active route treatment is decorative and does not hide content.
- Route progress responds to scroll and becomes static under reduced motion.
- Mobile uses one clear route rather than alternating cards.
- Pause for user visual approval before Phase 6.

## Phase 6 — Technical Pokédex device upgrade

Primary scope:

- Preserve the existing skill data and interaction model.
- Make the casing, displays, controls, scan state, and type treatments more
  literal to a Gen 4 handheld Pokédex.
- Improve responsive behavior rather than shrinking the desktop device.

Likely files:

- `src/components/sections/pokedex-section.tsx`
- `src/components/pokedex/*`
- `src/components/ui/pokemon-panel.tsx`
- `src/app/globals.css`

Acceptance criteria:

- Search, category switching, selection, empty state, and proficiency meter all
  behave as before.
- Tabs and skill options remain keyboard-accessible with visible focus.
- Tab and listbox semantics gain conventional arrow-key navigation, including
  Home/End where appropriate.
- Skill text remains readable at mobile widths.
- Boot/scan effects are disabled or simplified for reduced motion.

## Phase 7 — Key-item résumé and League-gate contact

Primary scope:

- Present the résumé as a clearly labeled Key Item while keeping View and
  Download actions obvious.
- Turn contact into the final route destination/League communication gate.
- Preserve every current link and email destination.

Likely files:

- `src/components/sections/resume-section.tsx`
- `src/components/ui/resume-card.tsx`
- `src/components/sections/ContactSection.tsx`
- focused final-destination environment primitive

Acceptance criteria:

- View Resume and Download Resume remain separate, obvious actions.
- Contact information is never hidden behind a game mechanic.
- All links retain their targets and accessible names.
- The ending reads as a clear professional call to action.

## Phase 8 — Medium interaction and scroll storytelling

Primary scope:

- Add a route marker or trainer progress indicator across the portfolio.
- Add location banners, environmental transitions, party selection motion, and
  overworld checkpoint activation.
- Reconcile and reuse existing route/world prototypes only when they fit the
  shipped architecture; remove dead duplicates only after proving they are
  unused.

Likely files:

- `src/components/layout/trainer-hud-nav.tsx`
- `src/components/layout/scroll-route-context.tsx`
- selected existing route/world primitives
- `src/lib/motion-presets.ts`
- `src/app/page.tsx`
- `src/app/globals.css`

Acceptance criteria:

- Essential content never requires character controls.
- Active navigation and route progress agree.
- Animation does not cause layout shifts or trap input.
- Reduced-motion mode presents the same content and navigation with static
  state changes.
- Decorative work remains bounded on mobile.

## Phase 9 — Mobile, accessibility, performance, and final QA

Primary scope:

- Validate all release contracts across desktop and mobile.
- Resolve image configuration and oversized-asset issues that affect the final
  experience.
- Check semantic structure, keyboard flows, focus visibility, reduced motion,
  contrast, and responsive overflow.
- Produce final site-specific metadata/social presentation only after the
  shipped visual direction is stable.

Acceptance criteria:

- Production build and lint pass.
- All anchor, intro, party, modal, Pokédex, résumé, and contact checks pass.
- No unexpected console errors or horizontal page overflow.
- Recruiter-critical content remains immediately discoverable.
- Final desktop and mobile visual inspection passes.

## Validation matrix

Every phase:

- `npm run build`
- `npm run lint`
- inspect the phase diff for scope creep and content changes
- verify the source counts remain six projects, five experiences, and 42 skills
- verify no new source references a missing public asset
- verify desktop and mobile overflow
- verify reduced-motion rendering for changed animated surfaces
- verify focus visibility for changed interactive controls

Focused regression flows:

1. Skip the intro and reach the trainer profile.
2. Complete the intro and use any supported destination.
3. Navigate through all six floating-navigation destinations.
4. Operate the trainer-card flip with keyboard input.
5. Inspect each of the six projects and close its modal using all supported
   methods; confirm focus returns to its invoker.
6. Search the Pokédex, change categories, select a skill, and reach an empty
   result.
7. Open and download the résumé.
8. Activate every contact and social link without changing its destination.
9. Repeat the core scan with reduced motion enabled.
10. Exercise the desktop intro controls and the coarse-pointer/mobile direct
    entry path.

## Known baseline observations

- The production build passes on the current `main` baseline.
- The visual language below the intro is dominated by dark, similarly shaped
  panels; later phases must create environmental differentiation without
  sacrificing contrast.
- Several route/world components already exist but are not mounted by the
  current home page. Two dormant approaches reference missing
  `/world/reference.webp` artwork, duplicate active systems, and can lock or
  gate scrolling. They must not be activated as-is.
- Some image calls request qualities outside the current Next.js image
  configuration. Phase 9 must align configured qualities or normalize usage.
- Several large PNG assets should be evaluated for delivery cost during final
  performance work.
