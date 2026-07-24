"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";

type RouteExitTransitionProps = {
  destinationLabel: string;
};

export const RouteExitTransition = forwardRef<
  HTMLDivElement,
  RouteExitTransitionProps
>(function RouteExitTransition({ destinationLabel }, ref) {
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`center-route-exit ${reduced ? "center-route-exit--reduced" : ""}`}
      tabIndex={-1}
      aria-label={`Now entering ${destinationLabel}`}
      aria-live="polite"
    >
      <div className="center-route-exit__flash" aria-hidden="true" />
      <div className="center-route-exit__sky" aria-hidden="true">
        <div className="center-route-exit__sun" />
        <div className="center-route-exit__cloud center-route-exit__cloud--one" />
        <div className="center-route-exit__cloud center-route-exit__cloud--two" />
        <div className="center-route-exit__ridge center-route-exit__ridge--far" />
        <div className="center-route-exit__ridge center-route-exit__ridge--near" />
        <div className="center-route-exit__grass" />
        <div className="center-route-exit__path" />
      </div>

      <motion.div
        className="center-route-exit__location"
        initial={reduced ? false : { opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.28 }}
      >
        <span className="center-route-exit__eyebrow">NOW ENTERING</span>
        <strong>{destinationLabel}</strong>
        <span className="center-route-exit__rule" aria-hidden="true" />
      </motion.div>
    </div>
  );
});
