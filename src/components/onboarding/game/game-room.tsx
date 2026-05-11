"use client";

import { GAME_NPCS, ROOM_H, ROOM_W, TILE } from "./game-config";
import { NpcSprite } from "./npc-sprite";

/* ─── Helpers ──────────────────────────────────────────────────── */

function Tile({
  x, y, w = TILE, h = TILE,
  className, style,
}: {
  x: number; y: number; w?: number; h?: number;
  className?: string; style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ position: "absolute", left: x, top: y, width: w, height: h, ...style }}
    />
  );
}

/* ─── Floor ─────────────────────────────────────────────────────── */

/**
 * Center “trainer orb” mosaic — same technique as classic RPG floor emblems
 * (stepped circle from tile colors), using original portfolio colors only.
 */
function floorEmblemClass(col: number, row: number): string | null {
  const tcx = 11;
  const tcy = 9;
  const dx = col - tcx;
  const dy = row - tcy;
  const d = Math.hypot(dx, dy);
  if (d > 5.35) return null;
  if (d < 1.15) {
    return "bg-[#fff2bd] border-[#d9b775]/55";
  }
  if (dy === 0 && d <= 4.85 && d >= 1.15) {
    return "bg-[#2f2a2a] border-[#1a1a1a]/40";
  }
  if (dy < 0) {
    return "bg-[#e07862] border-[#c45a4a]/55";
  }
  return "bg-[#fffef2] border-[#e8d4a8]/55";
}

function Floor() {
  const tiles: React.ReactNode[] = [];
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 22; col++) {
      const even = (row + col) % 2 === 0;
      const emblem = floorEmblemClass(col, row);
      const base = even ? "bg-[#fff2bd]" : "bg-[#ffe8a1]";
      const bg = emblem ?? base;
      const border = "border border-[#d9b775]/45";
      tiles.push(
        <Tile
          key={`f-${row}-${col}`}
          x={col * TILE} y={row * TILE}
          className={`${border} ${bg}`}
        />
      );
    }
  }
  return <>{tiles}</>;
}

/* ─── Walls ─────────────────────────────────────────────────────── */

function Walls() {
  return (
    <>
      {/* Top wall */}
      <Tile x={0} y={0} w={ROOM_W} h={TILE}
        className="bg-[#f7d6bf] border-b-4 border-[#b85d5a]" />
      {/* Bottom wall */}
      <Tile x={0} y={ROOM_H - TILE} w={ROOM_W} h={TILE}
        className="bg-[#f7d6bf] border-t-4 border-[#b85d5a]" />
      {/* Left wall */}
      <Tile x={0} y={0} w={TILE} h={ROOM_H}
        className="bg-[#f7d6bf] border-r-4 border-[#b85d5a]" />
      {/* Right wall */}
      <Tile x={ROOM_W - TILE} y={0} w={TILE} h={ROOM_H}
        className="bg-[#f7d6bf] border-l-4 border-[#b85d5a]" />

      {/* Back wall panel above counter */}
      <Tile x={TILE} y={TILE} w={ROOM_W - TILE * 2} h={TILE * 2}
        className="bg-[#ffe1ca] border-b-2 border-[#e4997b]" />

      {/* Entrance arch opening in bottom wall */}
      <Tile x={ROOM_W / 2 - TILE * 2} y={ROOM_H - TILE} w={TILE * 4} h={TILE}
        className="bg-[#fff2bd] border-x-4 border-[#b85d5a]" />
    </>
  );
}

/* ─── Counter ────────────────────────────────────────────────────── */

function Counter() {
  const cLeft  = TILE * 3;
  const cTop   = TILE * 3;
  const cW     = TILE * 16;
  const cH     = TILE * 2;

  return (
    <>
      {/* Main counter surface */}
      <Tile x={cLeft} y={cTop} w={cW} h={cH}
        style={{ borderRadius: 4 }}
        className="bg-[#f26f65] shadow-[0_5px_0_#a64644,0_10px_18px_rgba(117,66,40,0.25)]" />

      {/* Counter top highlight */}
      <Tile x={cLeft + 6} y={cTop + 6} w={cW - 12} h={12}
        style={{ borderRadius: 3, background: "#ffb2a6" }} />

      {/* Blue service monitors */}
      <Tile x={cLeft + TILE} y={cTop + 23} w={TILE * 2} h={16}
        style={{ borderRadius: 3, background: "#7dd3fc" }} />
      <Tile x={cLeft + cW - TILE * 3} y={cTop + 23} w={TILE * 2} h={16}
        style={{ borderRadius: 3, background: "#93c5fd" }} />

      {/* Counter front face */}
      <Tile x={cLeft} y={cTop + cH - 4} w={cW} h={10}
        style={{ borderRadius: "0 0 4px 4px" }}
        className="bg-[#c75651]" />

      {/* PORTFOLIO CENTER sign strip */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: cLeft + 12, top: cTop + 12,
          width: cW - 24, height: 18,
          borderRadius: 3,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#fff6d5",
          fontFamily: "ui-monospace, monospace",
          fontSize: 7, letterSpacing: "0.24em",
          color: "#a64644", textTransform: "uppercase",
          boxShadow: "inset 0 0 0 1px rgba(166,70,68,0.28)",
        }}
      >
        PORTFOLIO CENTER
      </div>

      {/* Receptionist behind counter */}
      <NurseSprite />
    </>
  );
}

function NurseSprite() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: ROOM_W / 2 - 18,
        top: TILE * 1.55,
        width: 36,
        height: 44,
        zIndex: 4,
        imageRendering: "pixelated",
      }}
    >
      <div className="absolute bottom-0 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-[#815042]/25" />
      <div className="absolute left-[8px] top-[5px] h-5 w-5 rounded-[4px] bg-[#ffd6bd] shadow-[0_0_0_2px_#f7fafc]" />
      <div className="absolute left-[6px] top-[2px] h-3 w-6 rounded-t-md bg-[#f8fafc] shadow-[inset_0_-2px_0_#ef7b7b]" />
      <div className="absolute left-[11px] top-[9px] h-1 w-1 bg-[#49332c]" />
      <div className="absolute right-[11px] top-[9px] h-1 w-1 bg-[#49332c]" />
      <div className="absolute left-[7px] top-[23px] h-4 w-[22px] rounded-[3px] bg-[#fff7ed] shadow-[inset_0_-3px_0_#f7b4a8]" />
      <div className="absolute left-[14px] top-[25px] h-2 w-2 bg-[#ef4444]" />
      <div className="absolute left-[16px] top-[23px] h-6 w-1 bg-[#ef4444]" />
    </div>
  );
}

/* ─── Plant / Furniture ─────────────────────────────────────────── */

function PlantBlock({ x, y }: { x: number; y: number }) {
  return (
    <>
      {/* Pot */}
      <Tile x={x + 6} y={y + TILE + 4} w={TILE - 12} h={TILE - 8}
        style={{ borderRadius: "0 0 4px 4px" }}
        className="bg-[#c9824f] shadow-[inset_0_-3px_0_#9c5632]" />
      {/* Soil */}
      <Tile x={x + 4} y={y + TILE} w={TILE - 8} h={6}
        style={{ borderRadius: "3px 3px 0 0" }}
        className="bg-[#5c4a35]" />
      {/* Leaves */}
      <Tile x={x + 2} y={y + 4} w={TILE - 4} h={TILE - 6}
        style={{ borderRadius: 8 }}
        className="bg-[#37b24d] shadow-[inset_0_-3px_0_#23863a,0_2px_0_rgba(83,58,31,0.2)]" />
      <Tile x={x + 8} y={y} w={TILE - 16} h={TILE - 12}
        style={{ borderRadius: 7 }}
        className="bg-[#51cf66]" />
    </>
  );
}

function Bench({ x, y }: { x: number; y: number }) {
  return (
    <>
      {/* Seat */}
      <Tile x={x} y={y} w={TILE * 2} h={TILE}
        style={{ borderRadius: 4 }}
        className="bg-[#88c4e8] shadow-[inset_0_-4px_0_#4b91bd,0_2px_0_rgba(117,66,40,0.2)]" />
      {/* Legs */}
      <Tile x={x + 4} y={y + TILE - 2} w={8} h={TILE * 1.5}
        className="bg-[#4b91bd]" />
      <Tile x={x + TILE * 2 - 12} y={y + TILE - 2} w={8} h={TILE * 1.5}
        className="bg-[#4b91bd]" />
    </>
  );
}

/* ─── Decorative strip behind counter ───────────────────────────── */

function BackWallDecor() {
  return (
    <>
      {/* Blue wall band */}
      <Tile x={TILE} y={TILE * 2 + 4} w={ROOM_W - TILE * 2} h={6}
        className="bg-sky-300/75" />
      {/* Red wall band */}
      <Tile x={TILE} y={TILE * 2 + 12} w={ROOM_W - TILE * 2} h={6}
        className="bg-[#ef7b7b]/80" />
    </>
  );
}

/* ─── Vignette overlay ───────────────────────────────────────────── */

function Vignette() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20,
        background:
          "radial-gradient(ellipse 90% 85% at 50% 48%, transparent 55%, rgba(117,66,40,0.16) 100%)",
      }}
    />
  );
}

/* ─── Exported GameRoom ──────────────────────────────────────────── */

type GameRoomProps = { children?: React.ReactNode };

export function GameRoom({ children }: GameRoomProps) {
  return (
    <div
      style={{
        position: "relative",
        width: ROOM_W,
        height: ROOM_H,
        overflow: "hidden",
        imageRendering: "pixelated",
        background: "#fff2bd",
      }}
    >
      <Floor />
      <Walls />
      <BackWallDecor />
      <Counter />
      <PlantBlock x={TILE} y={TILE} />
      <PlantBlock x={ROOM_W - TILE * 3} y={TILE} />
      <Bench x={TILE} y={TILE * 6} />
      <Bench x={ROOM_W - TILE * 3} y={TILE * 6} />
      <PlantBlock x={TILE * 3} y={TILE * 12} />
      <PlantBlock x={ROOM_W - TILE * 4.5} y={TILE * 12} />

      {/* Side visitors (purple) */}
      {GAME_NPCS.filter((n) => n.kind !== "receptionist").map((n) => (
        <NpcSprite
          key={n.id}
          x={n.x}
          y={n.y}
          facing={n.direction ?? "down"}
        />
      ))}

      <Vignette />
      {children}
    </div>
  );
}
