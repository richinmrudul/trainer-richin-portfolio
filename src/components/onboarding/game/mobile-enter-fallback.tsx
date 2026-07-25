"use client";

import { motion, useReducedMotion } from "framer-motion";

type MobileEnterFallbackProps = {
  onSelect: (target: string) => void;
  onSkip: () => void;
};

const QUICK_ROUTES = [
  { number: "02", label: "Projects", target: "#projects" },
  { number: "03", label: "Experience", target: "#experience" },
  { number: "04", label: "Pokédex", target: "#pokedex" },
  { number: "05", label: "Resume", target: "#resume" },
  { number: "06", label: "Contact", target: "#contact" },
];

function PokeballMark() {
  return (
    <span
      aria-hidden
      className="relative block size-5 shrink-0 overflow-hidden rounded-full border-2 border-[#252b39] bg-[linear-gradient(to_bottom,#e45c5c_0_44%,#252b39_44%_56%,#f9f1d9_56%)]"
    >
      <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#252b39] bg-[#f9f1d9]" />
    </span>
  );
}

function MobileCenterScene() {
  return (
    <div
      aria-hidden
      className="mobile-center-scene relative min-h-0 overflow-hidden rounded-[18px] border-[5px] border-[#262b38] bg-[#ffe6aa] shadow-[0_10px_0_#11141d,0_22px_48px_-20px_rgba(0,0,0,0.8)]"
    >
      <div className="absolute inset-x-0 top-0 h-[35%] border-b-[3px] border-[#b84e4e] bg-[#f8d9c5]">
        <div className="absolute inset-x-[7%] bottom-[16%] h-2 rounded-full bg-[#78c8ec]" />
        <div className="absolute inset-x-[7%] bottom-[7%] h-1.5 rounded-full bg-[#e67c78]" />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 top-[35%]"
        style={{
          backgroundColor: "#ffe7a7",
          backgroundImage:
            "linear-gradient(rgba(190,139,73,.26) 1px,transparent 1px),linear-gradient(90deg,rgba(190,139,73,.26) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="absolute left-1/2 top-[12%] z-10 -translate-x-1/2">
        <div className="relative h-9 w-9">
          <div className="absolute left-1/2 top-0 h-5 w-6 -translate-x-1/2 rounded-t-[8px] bg-white shadow-[inset_0_-4px_0_#ef8f8b]" />
          <div className="absolute left-1/2 top-2 size-4 -translate-x-1/2 rounded-[4px] bg-[#ffd5bd]" />
          <div className="absolute left-1/2 top-[19px] h-4 w-7 -translate-x-1/2 rounded-[4px] bg-white shadow-[inset_0_-4px_0_#f2aca4]" />
          <div className="absolute left-1/2 top-[21px] h-3 w-1 -translate-x-1/2 bg-[#e45757]" />
        </div>
      </div>

      <div className="absolute inset-x-[8%] top-[29%] z-[8] h-[22%] rounded-md bg-[#ef6b65] shadow-[0_6px_0_#a74646,0_12px_20px_rgba(117,66,40,0.24)]">
        <div className="absolute inset-x-2 top-2 h-2 rounded bg-[#ffaca1]" />
        <div className="absolute left-[8%] top-[42%] h-3 w-[15%] rounded-sm bg-[#80d2ef]" />
        <div className="absolute right-[8%] top-[42%] h-3 w-[15%] rounded-sm bg-[#80d2ef]" />
        <div className="absolute inset-x-[25%] top-[38%] flex h-4 items-center justify-center rounded-sm bg-[#fff5d5] font-mono text-[6px] font-bold tracking-[0.18em] text-[#9f4545]">
          PORTFOLIO CENTER
        </div>
      </div>

      <div className="absolute bottom-[11%] left-1/2 z-10 h-10 w-8 -translate-x-1/2">
        <div className="absolute bottom-0 left-1/2 h-2 w-7 -translate-x-1/2 rounded-full bg-[#77522f]/25" />
        <div className="absolute bottom-1 left-[5px] h-4 w-[22px] rounded-sm bg-white shadow-[inset_0_-4px_0_#c7d2e3]" />
        <div className="absolute bottom-2 left-[5px] h-1.5 w-[22px] bg-[#ef5350]" />
        <div className="absolute left-1/2 top-1 size-5 -translate-x-1/2 rounded-[4px] bg-[#ffd4ae] shadow-[inset_0_4px_0_#30333c]" />
        <div className="absolute left-1/2 top-0 h-2.5 w-6 -translate-x-1/2 rounded-t bg-[#e94f4f]" />
      </div>

      <div className="absolute bottom-[9%] left-[6%] h-[37%] w-[15%] rounded-md bg-[#75bddd] shadow-[inset_0_-7px_0_#4188ad]" />
      <div className="absolute bottom-[9%] right-[6%] h-[37%] w-[15%] rounded-md bg-[#75bddd] shadow-[inset_0_-7px_0_#4188ad]" />
      <div className="absolute bottom-[2%] left-1/2 h-[13%] w-[28%] -translate-x-1/2 border-x-[5px] border-[#b84e4e] bg-[#fff2bd]" />

      <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-[#252b39]/15 bg-[#fff8e6]/90 px-2.5 py-1 font-mono text-[7px] font-bold uppercase tracking-[0.16em] text-[#6f4a3f] shadow-sm">
        <span className="size-1.5 rounded-full bg-[#54b874]" />
        Center online
      </div>
    </div>
  );
}

export function MobileEnterFallback({
  onSelect,
  onSkip,
}: MobileEnterFallbackProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mobile-center-shell relative h-full w-full overflow-hidden text-[#252b39]">
      <div aria-hidden className="mobile-center-sky absolute inset-0" />

      <header className="mobile-center-header relative z-10 flex w-full items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#fff4d9]/75">
          <span className="flex gap-1" aria-hidden>
            <span className="size-2 rounded-full bg-[#e95b5b]" />
            <span className="size-2 rounded-full bg-[#69bfe7]" />
            <span className="size-2 rounded-full bg-[#61b47e]" />
          </span>
          Sinnoh · Route 01
        </div>
        <button
          type="button"
          onClick={onSkip}
          className="min-h-11 rounded-full border border-white/20 bg-[#161b29]/75 px-4 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#fff4d9] shadow-lg backdrop-blur-md transition-colors hover:bg-[#222a3c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8edaff]"
        >
          Skip intro
        </button>
      </header>

      <div className="mobile-center-layout relative z-10 mx-auto grid min-h-0 w-full max-w-[430px] flex-1 gap-3">
        <motion.div
          className="min-h-0"
          initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <MobileCenterScene />
        </motion.div>

        <motion.section
          aria-labelledby="mobile-intro-title"
          className="mobile-center-menu min-h-0 rounded-[18px] border-[4px] border-[#252b39] bg-[#f9f1d9] p-3 shadow-[0_8px_0_#11141d,0_20px_48px_-18px_rgba(0,0,0,0.75),inset_0_0_0_2px_#d7c9a6]"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="mobile-center-copy mb-2.5 border-b-2 border-[#d5c7a5] pb-2.5">
            <p className="mb-1 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-[#ae4a4a]">
              Portfolio Center
            </p>
            <h2
              id="mobile-intro-title"
              className="text-[clamp(1.35rem,6vw,1.75rem)] font-black leading-none tracking-[-0.035em]"
            >
              Welcome, Trainer.
            </h2>
            <p className="mt-1.5 text-[11px] leading-snug text-[#5d584e]">
              Richin&apos;s journey is ready. Choose your next route.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelect("#home")}
            className="mobile-center-primary mb-2.5 flex min-h-12 w-full items-center gap-3 rounded-xl border-2 border-[#252b39] bg-[#a73d45] px-3.5 text-left text-[#fff8e6] shadow-[0_4px_0_#252b39] transition-[transform,background-color] hover:bg-[#92343c] active:translate-y-0.5 active:shadow-[0_2px_0_#252b39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35bdf2]"
          >
            <PokeballMark />
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#fff8e6]">
                Route 01
              </span>
              <span className="block text-sm font-extrabold leading-tight">
                Enter Portfolio
              </span>
            </span>
            <span aria-hidden className="font-mono text-lg">
              ›
            </span>
          </button>

          <nav aria-label="Quick portfolio destinations">
            <p className="mb-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#736b5d]">
              Fly to a destination
            </p>
            <div className="mobile-center-routes grid grid-cols-2 gap-1.5">
              {QUICK_ROUTES.map((route) => (
                <button
                  key={route.target}
                  type="button"
                  onClick={() => onSelect(route.target)}
                  className="mobile-center-route flex min-h-11 items-center gap-2 rounded-lg border-2 border-[#b9ad91] bg-[#fffaf0] px-2.5 text-left transition-[transform,background-color,border-color] hover:border-[#7faaca] hover:bg-[#edf8fb] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#278cc2]"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#252b39] font-mono text-[8px] font-bold text-[#fff4d9]">
                    {route.number}
                  </span>
                  <span className="truncate font-mono text-[9px] font-bold uppercase tracking-[0.08em]">
                    {route.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </motion.section>
      </div>

      <footer className="mobile-center-footer relative z-10 text-center font-mono text-[7px] font-bold uppercase tracking-[0.2em] text-[#fff4d9]/50">
        Tap a route to begin
      </footer>
    </div>
  );
}
