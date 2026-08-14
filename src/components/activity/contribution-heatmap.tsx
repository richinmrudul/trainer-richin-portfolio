"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ContributionWeek } from "@/lib/github-contributions";

const LEVEL_CLASS = [
  "bg-[#1a2a1f]/55 border-[#2d3d32]/40",
  "bg-[#2f5a3c]/70 border-[#3f6f4c]/50",
  "bg-[#3f8f55]/80 border-[#4ea566]/55",
  "bg-[#52b56a] border-[#6bc97f]/60",
  "bg-[#7ae08f] border-[#9aefaa]/70",
] as const;

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;
const CELL = 11;
const GAP = 3;
const DAY_COL = 28;

type ContributionHeatmapProps = {
  weeks: ContributionWeek[];
  className?: string;
};

function monthLabel(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  return d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
}

export function ContributionHeatmap({
  weeks,
  className = "",
}: ContributionHeatmapProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [hover, setHover] = useState<{
    date: string;
    count: number;
  } | null>(null);

  const monthMarks = useMemo(() => {
    const marks: Array<{ index: number; label: string }> = [];
    let last = "";
    weeks.forEach((week, index) => {
      const first = week.days[0];
      if (!first) return;
      const label = monthLabel(first.date);
      if (label !== last) {
        marks.push({ index, label });
        last = label;
      }
    });
    return marks;
  }, [weeks]);

  const intrinsicWidth =
    DAY_COL + weeks.length * CELL + Math.max(weeks.length - 1, 0) * GAP;
  const intrinsicHeight = 18 + 7 * CELL + 6 * GAP;

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth;
      if (available <= 0) return;
      setScale(Math.min(1, available / intrinsicWidth));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [intrinsicWidth]);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={shellRef}
        className="w-full overflow-hidden"
        style={{ height: intrinsicHeight * scale }}
      >
        <div
          className="origin-top-left"
          style={{
            width: intrinsicWidth,
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="mb-1.5 grid"
            style={{
              gridTemplateColumns: `${DAY_COL}px repeat(${weeks.length}, ${CELL}px)`,
              columnGap: GAP,
            }}
            aria-hidden
          >
            <span />
            {weeks.map((_, i) => {
              const mark = monthMarks.find((m) => m.index === i);
              return (
                <span
                  key={`m-${i}`}
                  className="font-mono text-[9px] uppercase tracking-wide text-[#9a9285]"
                >
                  {mark?.label ?? ""}
                </span>
              );
            })}
          </div>

          <div className="flex" style={{ gap: GAP }}>
            <div
              className="flex flex-col"
              style={{ width: DAY_COL, gap: GAP }}
              aria-hidden
            >
              {DAY_LABELS.map((label, i) => (
                <span
                  key={`d-${i}`}
                  className="flex items-center font-mono text-[9px] text-[#9a9285]"
                  style={{ height: CELL }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div
              className="flex"
              style={{ gap: GAP }}
              role="img"
              aria-label="GitHub contribution calendar"
            >
              {weeks.map((week, wi) => (
                <div
                  key={`w-${wi}`}
                  className="flex flex-col"
                  style={{ gap: GAP }}
                >
                  {week.days.map((day) => (
                    <button
                      key={day.date}
                      type="button"
                      className={`rounded-[2px] border transition-[transform,box-shadow] duration-150 hover:z-10 hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#c9b896]/70 ${LEVEL_CLASS[day.level]}`}
                      style={{ width: CELL, height: CELL }}
                      aria-label={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                      onMouseEnter={() =>
                        setHover({ date: day.date, count: day.count })
                      }
                      onMouseLeave={() => setHover(null)}
                      onFocus={() =>
                        setHover({ date: day.date, count: day.count })
                      }
                      onBlur={() => setHover(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="min-h-[1.25rem] font-mono text-[11px] text-[#b8afa0]">
          {hover
            ? `${hover.count} contribution${hover.count === 1 ? "" : "s"} on ${hover.date}`
            : "Hover a day for details"}
        </p>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-[#9a9285]">
          <span>Less</span>
          {LEVEL_CLASS.map((cls) => (
            <span
              key={cls}
              className={`h-2.5 w-2.5 rounded-[2px] border ${cls}`}
              aria-hidden
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
