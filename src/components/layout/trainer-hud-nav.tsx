"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
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
  const { scrollY } = useScroll();
  const navY = useTransform(scrollY, [0, 160], [0, -3]);
  const navScale = useTransform(scrollY, [0, 220], [1, 0.988]);

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

  const navShellStyle =
    reduceMotion ? undefined : { y: navY, scale: navScale };

  return (
    <nav
      aria-label="Portfolio sections"
      className="trainer-hud-nav pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 md:px-6 md:pb-8"
    >
      <div
        className="pointer-events-auto flex w-full max-w-4xl flex-col items-stretch gap-2 md:max-w-none md:flex-row md:justify-center"
      >
        <motion.div
          style={navShellStyle}
          className="device-shell flex w-full items-center justify-between gap-2 rounded-xl px-2 py-2 backdrop-blur-xl will-change-transform md:w-auto md:px-3 md:py-2"
        >
          <span className="flex shrink-0 items-center gap-1.5 pl-2 md:pl-1" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full border border-white/50 bg-[var(--accent-blue)] shadow-[0_0_10px_rgba(143,217,255,0.48)]" />
            <span className="h-2 w-2 rounded-full border border-black/25 bg-[var(--accent-yellow)]" />
            <span className="h-2 w-2 rounded-full border border-black/25 bg-[var(--accent-green)]" />
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
                    className="relative block rounded-md px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-device-dark)]"
                  >
                    {isActive && !reduceMotion ? (
                      <motion.span
                        layoutId="trainer-hud-active"
                        className="absolute inset-0 -z-10 rounded-md border-2 border-[var(--border-game)] bg-[var(--surface-dialogue)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.6),2px_2px_0_rgba(38,18,24,0.45)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    {isActive && reduceMotion ? (
                      <span
                        className="absolute inset-0 -z-10 rounded-md border-2 border-[var(--border-game)] bg-[var(--surface-dialogue)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.6),2px_2px_0_rgba(38,18,24,0.45)]"
                        aria-hidden
                      />
                    ) : null}
                    <span
                      className={
                        isActive
                          ? "text-[var(--surface-dialogue-ink)]"
                          : "text-rose-50/72 hover:text-white"
                      }
                    >
                      {label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </nav>
  );
}
