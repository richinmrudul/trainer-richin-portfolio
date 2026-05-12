"use client";

export type NpcFacing = "up" | "down" | "left" | "right";

type NpcSpriteProps = {
  x: number;
  y: number;
  facing: NpcFacing;
  /** Outfit palette */
  variant?: "purple" | "black";
  /** Visual width in px */
  w?: number;
  /** Visual height in px */
  h?: number;
};

const PALETTE = {
  purple: {
    leg: "bg-[#4c1d95] shadow-[inset_0_-2px_0_#2e1065]",
    torso: "bg-[#7c3aed] shadow-[inset_0_-3px_0_#5b21b6]",
    torsoStripe: "bg-[#a78bfa]/55",
    arm: "bg-[#6d28d9]",
    collar: "bg-[#4c1d95]",
  },
  black: {
    leg: "bg-[#171717] shadow-[inset_0_-2px_0_#0a0a0a]",
    torso: "bg-[#262626] shadow-[inset_0_-3px_0_#171717]",
    torsoStripe: "bg-[#525252]/45",
    arm: "bg-[#404040]",
    collar: "bg-[#171717]",
  },
} as const;

/**
 * Small top-down visitor — purple or black outfit, same pixel-ish language as trainer.
 */
export function NpcSprite({
  x,
  y,
  facing,
  variant = "purple",
  w = 30,
  h = 36,
}: NpcSpriteProps) {
  const c = PALETTE[variant];
  const showFace = facing !== "up";
  const side = facing === "left" || facing === "right";

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        imageRendering: "pixelated",
      }}
    >
      <div className="absolute bottom-0 left-1/2 h-2 w-6 -translate-x-1/2 rounded-full bg-[#6b4f2c]/28" />

      {/* Legs */}
      <div
        className={`absolute bottom-[3px] left-[7px] h-[8px] w-[5px] rounded-[1px] ${c.leg}`}
      />
      <div
        className={`absolute bottom-[3px] right-[7px] h-[8px] w-[5px] rounded-[1px] ${c.leg}`}
      />

      {/* Torso */}
      <div
        className={`absolute left-[5px] top-[16px] h-[14px] w-5 rounded-[3px] ${c.torso}`}
      >
        <div
          className={`absolute left-[6px] top-[3px] h-[5px] w-[8px] rounded-[1px] ${c.torsoStripe}`}
        />
      </div>

      {/* Arms hint */}
      <div
        className={`absolute top-[18px] h-[6px] w-[4px] rounded-[1px] ${c.arm}`}
        style={{
          left: facing === "right" ? 2 : undefined,
          right: facing === "left" ? 2 : undefined,
          opacity: side ? 1 : 0.85,
        }}
      />
      <div
        className={`absolute top-[18px] h-[6px] w-[4px] rounded-[1px] ${c.arm}`}
        style={{
          right: facing === "right" ? 2 : undefined,
          left: facing === "left" ? 2 : undefined,
          opacity: side ? 1 : 0.85,
        }}
      />

      {/* Head */}
      <div
        className="absolute left-1/2 top-[4px] h-[15px] w-[17px] -translate-x-1/2 overflow-hidden rounded-[3px] bg-[#ffd4ae]"
        style={{ boxShadow: "0 1px 0 #8a5a44, inset 0 -2px 0 rgba(138,90,68,0.15)" }}
      >
        <div className="absolute inset-x-0 top-0 h-[4px] bg-[#2f2a2a]" />
        {showFace ? (
          <>
            <div className="absolute bottom-[4px] left-[4px] h-[2px] w-[2px] bg-[#2f2a2a]" />
            <div className="absolute bottom-[4px] right-[4px] h-[2px] w-[2px] bg-[#2f2a2a]" />
          </>
        ) : null}
      </div>

      {/* Hair / cap back */}
      <div className="absolute left-[7px] top-[2px] h-[5px] w-[16px] rounded-t-[3px] bg-[#2f2a2a]" />

      {/* Facing accent */}
      {facing === "down" ? (
        <div className={`absolute left-[11px] top-[14px] h-[2px] w-[8px] ${c.collar}`} />
      ) : null}
      {facing === "right" ? (
        <div className="absolute right-[4px] top-[11px] h-[2px] w-[5px] bg-[#2f2a2a]" />
      ) : null}
      {facing === "left" ? (
        <div className="absolute left-[4px] top-[11px] h-[2px] w-[5px] bg-[#2f2a2a]" />
      ) : null}
    </div>
  );
}
