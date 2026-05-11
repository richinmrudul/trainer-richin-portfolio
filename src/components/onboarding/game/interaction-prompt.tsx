"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getNpcById } from "./game-config";

type InteractionPromptProps = {
  /** NPC id when in range, else null */
  nearNpcId: string | null;
  visible: boolean;
};

export function InteractionPrompt({ nearNpcId, visible }: InteractionPromptProps) {
  const zone = nearNpcId ? getNpcById(nearNpcId)?.interactionZone : undefined;
  const cx = zone ? zone.x + zone.w / 2 : 0;
  const cy = zone ? zone.y - 18 : 0;

  return (
    <AnimatePresence>
      {visible && zone ? (
        <motion.div
          key={`interact-${nearNpcId}`}
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
            className="flex items-center gap-2 rounded-full border-2 border-[#2f2a2a] bg-[#fff8df] px-3 py-1.5 shadow-[0_3px_0_#8a5a44]"
          >
            <kbd className="rounded border border-[#2f2a2a]/40 bg-white px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase text-[#2f2a2a]">
              E
            </kbd>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2f2a2a]">
              Press E to talk
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
