"use client";

import type { MotionValue } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const PORTFOLIO_ROUTE_STOPS = [
  { id: "home", label: "Route 01", shortLabel: "Home" },
  { id: "projects", label: "Project Camp", shortLabel: "Projects" },
  { id: "experience", label: "Career Route", shortLabel: "Experience" },
  { id: "pokedex", label: "Pokédex Lab", shortLabel: "Pokédex" },
  { id: "resume", label: "Key Item Depot", shortLabel: "Resume" },
  { id: "contact", label: "League Gate", shortLabel: "Contact" },
] as const;

export type PortfolioRouteId = (typeof PORTFOLIO_ROUTE_STOPS)[number]["id"];

type PortfolioRouteContextValue = {
  activeId: PortfolioRouteId;
  activeIndex: number;
  progress: number;
};

const PortfolioRouteContext =
  createContext<PortfolioRouteContextValue | null>(null);

export type RouteScrollContextValue = {
  scrollYProgress: MotionValue<number>;
  scrollY: MotionValue<number>;
};

export const RouteScrollContext = createContext<RouteScrollContextValue | null>(
  null,
);

export function useRouteScroll() {
  const ctx = useContext(RouteScrollContext);
  if (!ctx) {
    throw new Error("useRouteScroll must be used within ScrollRouteWorld");
  }
  return ctx;
}

function scrollMarker() {
  return window.scrollY + Math.min(window.innerHeight * 0.22, 200);
}

/**
 * Shared route state for the scroll-first portfolio. It keeps the HUD,
 * checkpoint styling, and continuous route meter on the same source of truth.
 */
export function PortfolioRouteProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<PortfolioRouteId>("home");
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  const updateRoute = useCallback(() => {
    const sections = PORTFOLIO_ROUTE_STOPS.map((stop) => ({
      ...stop,
      element: document.getElementById(stop.id),
    })).filter(
      (
        stop,
      ): stop is (typeof PORTFOLIO_ROUTE_STOPS)[number] & {
        element: HTMLElement;
      } => Boolean(stop.element),
    );

    if (sections.length === 0) return;

    const marker = scrollMarker();
    let nextIndex = 0;

    sections.forEach((section, index) => {
      const top =
        section.element.getBoundingClientRect().top + window.scrollY;
      if (top <= marker) nextIndex = index;
    });

    const stopCount = Math.max(1, sections.length - 1);
    const currentTop =
      sections[nextIndex]!.element.getBoundingClientRect().top + window.scrollY;
    const nextSection = sections[nextIndex + 1];
    const nextTop = nextSection
      ? nextSection.element.getBoundingClientRect().top + window.scrollY
      : currentTop;
    const segmentProgress = nextSection
      ? Math.min(
          1,
          Math.max(0, (marker - currentTop) / Math.max(1, nextTop - currentTop)),
        )
      : 0;
    const nextProgress = Math.min(
      1,
      (nextIndex + segmentProgress) / stopCount,
    );

    const nextId = sections[nextIndex]!.id;
    setActiveId((previous) => (previous === nextId ? previous : nextId));
    setProgress((previous) =>
      Math.abs(previous - nextProgress) < 0.001 ? previous : nextProgress,
    );

    sections.forEach((section, index) => {
      section.element.dataset.routeState =
        index < nextIndex
          ? "complete"
          : index === nextIndex
            ? "current"
            : "upcoming";
    });
  }, []);

  useEffect(() => {
    const scheduleUpdate = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        updateRoute();
      });
    };

    const initial = requestAnimationFrame(updateRoute);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      PORTFOLIO_ROUTE_STOPS.forEach(({ id }) => {
        document.getElementById(id)?.removeAttribute("data-route-state");
      });
    };
  }, [updateRoute]);

  const activeIndex = PORTFOLIO_ROUTE_STOPS.findIndex(
    (stop) => stop.id === activeId,
  );
  const value = useMemo(
    () => ({ activeId, activeIndex, progress }),
    [activeId, activeIndex, progress],
  );

  return (
    <PortfolioRouteContext.Provider value={value}>
      {children}
    </PortfolioRouteContext.Provider>
  );
}

export function usePortfolioRoute() {
  const context = useContext(PortfolioRouteContext);
  if (!context) {
    throw new Error(
      "usePortfolioRoute must be used within PortfolioRouteProvider",
    );
  }
  return context;
}
