"use client";

import type { ComponentProps } from "react";
import { ScrollReveal } from "@/components/layout/scroll-reveal";

type ScrollRevealProps = ComponentProps<typeof ScrollReveal>;

/**
 * Opinionated section entrance — defaults to cinematic (fade, lift, soft focus).
 * Pass `variant` to override (e.g. `"fadeUp"` for dense nested grids).
 */
export function SectionReveal({
  variant = "cinematic",
  ...rest
}: ScrollRevealProps) {
  return <ScrollReveal variant={variant} {...rest} />;
}

export { ScrollReveal } from "@/components/layout/scroll-reveal";
export type { ScrollRevealVariant } from "@/components/layout/scroll-reveal";
