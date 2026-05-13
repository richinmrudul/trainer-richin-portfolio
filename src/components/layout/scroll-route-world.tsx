"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { RouteScrollContext } from "./scroll-route-context";
import { RouteWorldLayer } from "./route-world-layer";
import { ScrollTrainer } from "./scroll-trainer";
import { WorldDialogProvider } from "./world-dialogue";

type ScrollRouteWorldProps = {
  children: React.ReactNode;
};

/**
 * Scroll-linked route world: reference map, trainer, dialogue provider.
 */
export function ScrollRouteWorld({ children }: ScrollRouteWorldProps) {
  const { ref, scrollYProgress, scrollY } = useScrollProgress();

  return (
    <WorldDialogProvider>
      <RouteScrollContext.Provider value={{ scrollYProgress, scrollY }}>
        <div ref={ref} className="relative z-10">
          <RouteWorldLayer />
          <div className="relative z-10">{children}</div>
          <ScrollTrainer />
        </div>
      </RouteScrollContext.Provider>
    </WorldDialogProvider>
  );
}
