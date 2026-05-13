"use client";

import type { MotionValue } from "framer-motion";
import { createContext, useContext } from "react";

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
