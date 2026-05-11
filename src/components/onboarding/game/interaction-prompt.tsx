"use client";

import { AnimatePresence, motion } from "framer-motion";
import { INTERACTION_ZONE } from "./game-config";

type InteractionPromptProps = {
  visible: boolean;
};

export function InteractionPrompt({ visible }: InteractionPromptProps) {
  const cx = INTERACTION_ZONE.x + INTERACTION_ZONE.w / 2;
  const cy = INTERACTION_ZONE.y - 18;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="interact-prompt"
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "absolute",
            left: cx,
            top: cy,
            translateX: "-50%",
            zIndex: 30,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-zinc-950/75 px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.55)] backdrop-blur-md"
          >
            <kbd className="rounded border border-white/25 bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase text-zinc-100">
              E
            </kbd>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300">
              Talk
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
