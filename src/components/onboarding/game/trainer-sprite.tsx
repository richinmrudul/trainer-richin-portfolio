"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Direction } from "./use-player-movement";
import { PLAYER_H, PLAYER_W } from "./game-config";

type TrainerSpriteProps = {
  x: number;
  y: number;
  direction: Direction;
  moving: boolean;
};

export function TrainerSprite({ x, y, direction, moving }: TrainerSpriteProps) {
  const reduced = useReducedMotion();
  const [walkFrame, setWalkFrame] = useState(0);

  useEffect(() => {
    if (!moving || reduced) {
      const resetId = requestAnimationFrame(() => {
        setWalkFrame(0);
      });
      return () => cancelAnimationFrame(resetId);
    }
    const id = window.setInterval(() => {
      setWalkFrame((frame) => (frame === 0 ? 1 : 0));
    }, 145);
    return () => window.clearInterval(id);
  }, [moving, reduced]);

  const side = direction === "left" || direction === "right";
  const facingUp = direction === "up";
  const footOffset = moving ? (walkFrame === 0 ? -2 : 2) : 0;
  const bodyOffset = moving ? (walkFrame === 0 ? 1 : -1) : 0;

  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: PLAYER_W,
        height: PLAYER_H,
        translateX: 0,
        translateY: 0,
        imageRendering: "pixelated",
      }}
      animate={
        reduced || !moving
          ? { y: 0 }
          : { y: [0, -1, 0, -1, 0] }
      }
      transition={
        moving && !reduced
          ? { duration: 0.38, ease: "linear", repeat: Infinity }
          : { duration: 0.1 }
      }
    >
      {/* Ground shadow */}
      <div className="absolute bottom-[1px] left-1/2 h-2 w-7 -translate-x-1/2 rounded-full bg-[#6b4f2c]/25" />

      {/* Backpack, mostly visible when walking upward or sideways */}
      {facingUp || side ? (
        <div
          className="absolute top-[17px] h-[15px] w-[8px] rounded-[2px] bg-[#7b4a2f] shadow-[inset_0_-3px_0_#513221]"
          style={{
            left: direction === "right" ? 2 : undefined,
            right: direction === "left" ? 2 : undefined,
          }}
        />
      ) : null}

      {/* Legs */}
      <div
        className="absolute bottom-[4px] left-[8px] h-[9px] w-[6px] rounded-[1px] bg-[#2563eb] shadow-[inset_0_-2px_0_#1e40af]"
        style={{ transform: `translateY(${footOffset}px)` }}
      />
      <div
        className="absolute bottom-[4px] right-[8px] h-[9px] w-[6px] rounded-[1px] bg-[#2563eb] shadow-[inset_0_-2px_0_#1e40af]"
        style={{ transform: `translateY(${-footOffset}px)` }}
      />

      {/* Shoes */}
      <div
        className="absolute bottom-[2px] left-[7px] h-[3px] w-[8px] bg-[#2f2a2a]"
        style={{ transform: `translateY(${footOffset}px)` }}
      />
      <div
        className="absolute bottom-[2px] right-[7px] h-[3px] w-[8px] bg-[#2f2a2a]"
        style={{ transform: `translateY(${-footOffset}px)` }}
      />

      {/* Body */}
      <div
        className="absolute left-[6px] top-[17px] h-[17px] w-5 rounded-[3px] bg-[#f8fafc] shadow-[inset_0_-4px_0_#cbd5e1]"
        style={{ transform: `translateY(${bodyOffset}px)` }}
      >
        <div className="absolute left-0 top-[5px] h-[6px] w-full bg-[#ef4444]" />
        <div className="absolute left-[8px] top-0 h-full w-[4px] bg-[#1d4ed8]" />
      </div>

      {/* Head */}
      <div
        className="absolute left-1/2 top-[3px] h-[18px] w-[20px] -translate-x-1/2 overflow-hidden rounded-[3px] bg-[#ffd4ae]"
        style={{
          boxShadow: "0 1px 0 #8a5a44, inset 0 -2px 0 rgba(138,90,68,0.18)",
        }}
      >
        {/* Hair and face */}
        <div className="absolute inset-x-0 top-0 h-[5px] bg-[#2f2a2a]" />
        {!facingUp ? (
          <>
            <div className="absolute bottom-[5px] left-[5px] h-[3px] w-[2px] bg-[#2f2a2a]" />
            <div className="absolute bottom-[5px] right-[5px] h-[3px] w-[2px] bg-[#2f2a2a]" />
          </>
        ) : null}
      </div>

      {/* Red cap */}
      <div className="absolute left-[5px] top-0 h-[9px] w-[22px] rounded-t-[4px] bg-[#ef4444] shadow-[inset_0_-2px_0_#b91c1c]" />
      {!facingUp ? (
        <div className="absolute left-[10px] top-[7px] h-[4px] w-3 rounded-b-[2px] bg-[#dc2626]" />
      ) : null}
      {side ? (
        <div
          className="absolute top-[7px] h-[4px] w-[7px] bg-[#dc2626]"
          style={{
            left: direction === "right" ? 22 : undefined,
            right: direction === "left" ? 22 : undefined,
          }}
        />
      ) : null}
    </motion.div>
  );
}
