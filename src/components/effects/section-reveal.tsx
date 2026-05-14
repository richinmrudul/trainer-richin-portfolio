"use client";

import type { ComponentProps } from "react";
import { ScrollReveal } from "@/components/layout/scroll-reveal";

type ScrollRevealProps = ComponentProps<typeof ScrollReveal>;

/**
 * Section entrance — defaults to fade-up (cheapest smooth reveal).
 * Pass `variant="cinematic"` for a slightly tighter premium entrance (still no blur).
 */
export function SectionReveal({
  variant = "fadeUp",
  ...rest
}: ScrollRevealProps) {
  return <ScrollReveal variant={variant} {...rest} />;
}

export { ScrollReveal } from "@/components/layout/scroll-reveal";
export type { ScrollRevealVariant } from "@/components/layout/scroll-reveal";
