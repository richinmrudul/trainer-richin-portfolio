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
      className="trainer-hud-nav pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 2xl:inset-x-auto 2xl:bottom-auto 2xl:right-4 2xl:top-1/2 2xl:-translate-y-1/2 2xl:px-0 2xl:pb-0 2xl:pt-0"
    >
      <div className="pointer-events-auto w-full max-w-md 2xl:w-auto 2xl:max-w-none">
        <motion.div
          style={navShellStyle}
          className="trainer-route-device device-shell w-full rounded-xl px-2 py-2 backdrop-blur-xl will-change-transform 2xl:w-[10.75rem] 2xl:px-2.5 2xl:py-2.5"
        >
          <div className="trainer-route-heading">
            <span className="trainer-route-lights" aria-hidden>
              <span className="trainer-route-light trainer-route-light--blue" />
              <span className="trainer-route-light trainer-route-light--yellow" />
              <span className="trainer-route-light trainer-route-light--green" />
            </span>

            <p className="trainer-route-location" aria-live="polite">
              <span className="trainer-route-location__eyebrow">
                Now exploring
              </span>
              <strong>{activeStop.label}</strong>
              <span className="trainer-route-location__count">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(PORTFOLIO_ROUTE_STOPS.length).padStart(2, "0")}
              </span>
            </p>
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
                      >
                        {shortLabel}
                      </span>
                      <span
                        className="trainer-route-link__status"
                        aria-hidden
                        data-active={isActive ? "true" : "false"}
                      />
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
