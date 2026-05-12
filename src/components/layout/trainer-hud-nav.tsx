"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "pokedex", label: "Pokédex" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

function scrollOffset(): number {
  return Math.min(window.innerHeight * 0.22, 200);
}

export function TrainerHudNav() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string>("home");
  const ticking = useRef(false);

  const ids = useMemo(() => NAV_ITEMS.map((n) => n.id), []);

  const updateActive = useCallback(() => {
    const marker = window.scrollY + scrollOffset();
    let current = ids[0] ?? "home";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= marker) current = id;
    }
    setActive((prev) => (prev === current ? prev : current));
  }, [ids]);

  useEffect(() => {
    const initial = requestAnimationFrame(() => updateActive());
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        updateActive();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateActive]);

  const onNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!reduceMotion) return;
      e.preventDefault();
      const id = href.replace(/^#/, "");
      document.getElementById(id)?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
      if (typeof window !== "undefined" && window.history?.replaceState) {
        window.history.replaceState(null, "", href);
      }
    },
    [reduceMotion],
  );

  return (
    <nav
      aria-label="Portfolio sections"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 md:px-6 md:pb-8"
    >
      <div
        className="pointer-events-auto flex w-full max-w-4xl flex-col items-stretch gap-2 md:max-w-none md:flex-row md:justify-center"
      >
        <div
          className="flex w-full items-center justify-between gap-2 rounded-2xl border border-zinc-800/90 bg-zinc-950/75 px-2 py-2 shadow-[0_18px_48px_-24px_rgba(0,0,0,0.85)] backdrop-blur-xl md:w-auto md:rounded-full md:px-3 md:py-2"
        >
          <span className="flex shrink-0 items-center gap-1.5 pl-2 md:pl-1" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-rose-500/85 shadow-[0_0_10px_rgba(244,63,94,0.35)]" />
            <span className="h-2 w-2 rounded-full bg-sky-500/85 shadow-[0_0_10px_rgba(14,165,233,0.35)]" />
            <span className="h-2 w-2 rounded-full bg-amber-400/85 shadow-[0_0_10px_rgba(251,191,36,0.35)]" />
          </span>

          <ul className="custom-scrollbar flex max-w-[calc(100%-4rem)] flex-1 items-center gap-0.5 overflow-x-auto px-1 md:max-w-none md:flex-none md:overflow-visible md:px-0">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id} className="shrink-0">
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(e) => onNavigate(e, `#${id}`)}
                    className="relative block rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  >
                    {isActive && !reduceMotion ? (
                      <motion.span
                        layoutId="trainer-hud-active"
                        className="absolute inset-0 -z-10 rounded-full border border-zinc-700/70 bg-zinc-900/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    ) : null}
                    {isActive && reduceMotion ? (
                      <span
                        className="absolute inset-0 -z-10 rounded-full border border-zinc-700/70 bg-zinc-900/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                        aria-hidden
                      />
                    ) : null}
                    <span
                      className={
                        isActive ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                      }
                    >
                      {label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
