"use client";

import Image from "next/image";

/**
 * Fixed viewport route map — user's reference art (`/world/reference.webp`).
 * Subtle readability overlays only; no generated path stripes.
 */
export function RouteWorldLayer() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a120e]"
      aria-hidden
    >
      <Image
        src="/world/reference.webp"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[center_32%] [image-rendering:pixelated] max-md:object-[center_38%] max-md:scale-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/48 via-black/36 to-black/54" />
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 120px rgba(0,0,0,0.55), inset 0 0 40px rgba(0,0,0,0.35)",
        }}
      />
    </div>
  );
}
