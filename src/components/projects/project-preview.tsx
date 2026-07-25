"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectAccent } from "@/content/projects";
import { accentStyles } from "./project-accent";

type ProjectPreviewProps = {
  src: string;
  alt: string;
  accent: ProjectAccent;
  className?: string;
  /** Larger treatment inside modal */
  variant?: "card" | "modal";
};

export function ProjectPreview({
  src,
  alt,
  accent,
  className = "",
  variant = "card",
}: ProjectPreviewProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const frame =
    variant === "modal"
      ? "min-h-[200px] sm:min-h-[280px] md:min-h-0 md:aspect-[4/3]"
      : "aspect-[16/10]";

  if (showPlaceholder) {
    return (
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-900/90 ${frame} ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(161 161 170) 1px, transparent 1px), linear-gradient(to bottom, rgb(161 161 170) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)",
          }}
          aria-hidden
        />
        <div
          className={`absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r ${accentStyles[accent].modalBar}`}
          aria-hidden
        />
        <p className="relative z-10 px-4 text-center font-mono text-xs tracking-wide text-zinc-500">
          Project preview pending
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-950 ${frame} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={
          variant === "modal"
            ? "(min-width: 768px) 50vw, 100vw"
            : "(min-width: 1024px) 48vw, 100vw"
        }
        className="object-cover object-top"
        onError={() => setShowPlaceholder(true)}
      />
    </div>
  );
}
