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
      className="trainer-hud-nav pointer-events-none fixed right-0 top-1/2 z-[90] -translate-y-1/2 pr-[max(0.25rem,env(safe-area-inset-right))]"
    >
      <div className="pointer-events-auto">
        <motion.div
          style={navShellStyle}
          className="trainer-route-device device-shell w-14 rounded-l-xl rounded-r-sm px-1 py-2 backdrop-blur-xl will-change-transform"
        >
          <div className="trainer-route-heading">
            <span className="trainer-route-lights" aria-hidden>
              <span className="trainer-route-light trainer-route-light--blue" />
              <span className="trainer-route-light trainer-route-light--yellow" />
              <span className="trainer-route-light trainer-route-light--green" />
            </span>

            <p className="sr-only" aria-live="polite">
              Now exploring {activeStop.label}, stop {activeIndex + 1} of{" "}
              {PORTFOLIO_ROUTE_STOPS.length}
            </p>
            <span className="trainer-route-location__count" aria-hidden>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="trainer-route-body">
            <div
              className="trainer-route-meter"
              style={progressStyle}
              role="progressbar"
              aria-label="Portfolio route progress"
              aria-valuemin={1}
              aria-valuemax={PORTFOLIO_ROUTE_STOPS.length}
              aria-valuenow={activeIndex + 1}
              aria-valuetext={`${activeStop.shortLabel}, stop ${activeIndex + 1} of ${PORTFOLIO_ROUTE_STOPS.length}`}
            >
              <span className="trainer-route-meter__track" aria-hidden>
                <span className="trainer-route-meter__fill" />
              </span>
              <span className="trainer-route-meter__stops" aria-hidden>
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

            <ul className="trainer-route-links">
              {PORTFOLIO_ROUTE_STOPS.map(({ id, shortLabel }, index) => {
                const isActive = activeId === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-label={`Go to ${shortLabel} section${isActive ? " (current)" : ""}`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={(e) => onNavigate(e, `#${id}`)}
                      className="trainer-route-link relative block rounded-md font-mono font-semibold uppercase outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-device-dark)]"
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
                        className="trainer-route-link__index"
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`trainer-route-link__label ${
                          isActive
                            ? "text-[var(--surface-dialogue-ink)]"
                            : "text-rose-50/72 hover:text-white"
                        }`}
                        aria-hidden
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
