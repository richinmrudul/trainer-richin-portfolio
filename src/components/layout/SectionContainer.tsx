import type { ReactNode } from "react";

type SectionContainerProps = {
  id?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
  className?: string;
};

export function SectionContainer({
  id,
  "aria-labelledby": ariaLabelledBy,
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`route-section mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}
