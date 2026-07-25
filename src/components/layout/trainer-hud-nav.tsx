"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, type CSSProperties } from "react";
import {
  PORTFOLIO_ROUTE_STOPS,
  usePortfolioRoute,
} from "./scroll-route-context";

export function TrainerHudNav() {
  const reduceMotion = useReducedMotion();
  const { activeId, activeIndex, progress } = usePortfolioRoute();
  const { scrollY } = useScroll();
  const navY = useTransform(scrollY, [0, 160], [0, -3]);
  const navScale = useTransform(scrollY, [0, 220], [1, 0.988]);

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
  const progressStyle = {
    "--route-progress": progress,
  } as CSSProperties;
  const activeStop =
    PORTFOLIO_ROUTE_STOPS[activeIndex] ?? PORTFOLIO_ROUTE_STOPS[0];

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
          className="trainer-route-device device-shell w-full rounded-xl px-2 py-2 backdrop-blur-xl will-change-transform md:w-auto md:min-w-[46rem] md:px-3 md:py-2"
        >
          <div
            className="trainer-route-meter"
            style={progressStyle}
            aria-hidden
          >
            <span className="trainer-route-meter__track">
              <span className="trainer-route-meter__fill" />
            </span>
            <span className="trainer-route-meter__stops">
              {PORTFOLIO_ROUTE_STOPS.map((stop, index) => (
                <span
                  key={stop.id}
                  className="trainer-route-meter__stop"
                  data-state={
                    index < activeIndex
                      ? "complete"
                      : index === activeIndex
                        ? "current"
                        : "upcoming"
                  }
                />
              ))}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <span className="flex shrink-0 items-center gap-1.5 pl-2 md:pl-1" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full border border-white/50 bg-[var(--accent-blue)] shadow-[0_0_10px_rgba(143,217,255,0.48)]" />
              <span className="h-2 w-2 rounded-full border border-black/25 bg-[var(--accent-yellow)]" />
              <span className="h-2 w-2 rounded-full border border-black/25 bg-[var(--accent-green)]" />
            </span>

            <p className="trainer-route-location" aria-live="polite">
              <span>Now exploring</span>
              <strong>{activeStop.label}</strong>
              <span>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(PORTFOLIO_ROUTE_STOPS.length).padStart(2, "0")}
              </span>
            </p>

            <ul className="custom-scrollbar flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-1 md:flex-none md:overflow-visible md:px-0">
            {PORTFOLIO_ROUTE_STOPS.map(({ id, shortLabel }) => {
              const isActive = activeId === id;
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
                      {shortLabel}
                    </span>
                  </a>
                </li>
              );
            })}
            </ul>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
