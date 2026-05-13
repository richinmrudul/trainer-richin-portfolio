"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  SHOW_WORLD_DEBUG,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "./world-config";
import { useWorldMovement } from "./use-world-movement";
import { WorldControlsHud } from "./world-controls-hud";
import { WorldMap } from "./world-map";
import { WorldPlayer } from "./world-player";

const HUD_RESERVE_PX = 52;

function useViewportSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  return { ref, ...size };
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setM(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return m;
}

/**
 * Full-map overworld: entire route visible (contain fit), no camera, walkable-only movement.
 */
export function PortfolioWorld() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { ref: viewportRef, w: vpW, h: vpH } = useViewportSize();

  const movementDisabled = isMobile || reduceMotion === true;
  const player = useWorldMovement({ disabled: movementDisabled });

  const { stageWidth, stageHeight } = useMemo(() => {
    const availW = Math.max(1, vpW);
    const availH = Math.max(1, vpH - HUD_RESERVE_PX);
    const fit = Math.min(availW / WORLD_WIDTH, availH / WORLD_HEIGHT);
    return {
      stageWidth: WORLD_WIDTH * fit,
      stageHeight: WORLD_HEIGHT * fit,
    };
  }, [vpW, vpH]);

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[5] flex flex-col bg-[#2f4530]">
      <div
        ref={viewportRef}
        className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-2 pt-2"
      >
        {isMobile ? (
          <div className="mb-3 max-w-md rounded-xl border border-zinc-700/80 bg-zinc-950/90 px-4 py-3 text-center text-sm text-zinc-300">
            <p className="mb-2">
              This route is best explored on desktop with a keyboard.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
              Map preview below — full controls coming later.
            </p>
          </div>
        ) : null}

        <WorldMap stageWidth={stageWidth} stageHeight={stageHeight}>
          {!isMobile ? <WorldPlayer player={player} stageWidth={stageWidth} /> : null}
        </WorldMap>

        {SHOW_WORLD_DEBUG && !isMobile ? (
          <div className="pointer-events-none absolute left-3 top-3 z-[40] rounded border border-zinc-600 bg-black/75 px-2 py-1 font-mono text-[11px] text-lime-200">
            x: {player.x.toFixed(0)} y: {player.y.toFixed(0)}
            <br />
            stage: {stageWidth.toFixed(0)}×{stageHeight.toFixed(0)}
          </div>
        ) : null}
      </div>

      <WorldControlsHud isMobile={isMobile} />
    </div>
  );
}
