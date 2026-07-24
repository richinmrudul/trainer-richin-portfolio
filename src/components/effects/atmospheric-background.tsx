"use client";

import { useReducedMotion } from "framer-motion";
import { usePortfolioParallax } from "@/hooks/use-parallax";
import { ParallaxLayer } from "./parallax-layer";

/**
 * Background atmosphere: light scroll parallax, CSS-only motion on layers.
 * Pointer + extra DOM motion removed for scroll performance.
 */
export function AtmosphericBackground() {
  const reduceMotion = useReducedMotion();
  const { yFar, yMid, yFore, ribbonY } = usePortfolioParallax();

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--route-sky-night) 0%, #293653 10%, var(--route-sky-dusk) 27%, var(--route-sky-rose) 44%, var(--route-sky-gold) 58%, #506a50 72%, var(--route-grass-dark) 100%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(circle 7rem at 78% 13%, rgb(255 224 163 / 0.72), rgb(246 186 112 / 0.2) 52%, transparent 72%), radial-gradient(ellipse 120% 42% at 50% 18%, rgb(255 210 164 / 0.2), transparent 62%), linear-gradient(180deg, transparent 0 55%, rgb(20 48 40 / 0.14) 72%, rgb(10 26 28 / 0.52) 100%)",
          }}
        />

        {/* CSS-only horizon silhouettes keep the world literal without artwork. */}
        <div
          className="absolute inset-x-[-8%] top-[52%] h-[12%] opacity-55"
          style={{
            background:
              "linear-gradient(145deg, transparent 0 16%, var(--route-grass-far) 16% 28%, transparent 28% 34%, var(--route-grass-far) 34% 52%, transparent 52% 58%, var(--route-grass-far) 58% 78%, transparent 78%)",
            filter: "blur(0.4px)",
          }}
        />
        <div
          className="absolute inset-x-0 top-[62%] h-[38%] opacity-70"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent 0 30px, rgb(225 200 148 / 0.05) 30px 32px), linear-gradient(165deg, var(--route-grass) 0 42%, var(--route-path) 42% 55%, var(--route-grass-dark) 55% 100%)",
          }}
        />

        {!reduceMotion ? (
          <ParallaxLayer
            className="absolute inset-[-30%] overflow-hidden will-change-transform"
            y={yFar}
          >
            <div
              className="depth-aurora-a absolute -left-[20%] top-[-15%] h-[85%] w-[75%] rounded-full opacity-90"
              style={{
                background:
                  "radial-gradient(closest-side, rgb(255 198 118 / 0.24), rgb(184 95 114 / 0.14) 45%, transparent 72%)",
                filter: "blur(2px)",
              }}
            />
            <div
              className="depth-aurora-b absolute -right-[18%] bottom-[-20%] h-[90%] w-[70%] rounded-full opacity-85"
              style={{
                background:
                  "radial-gradient(closest-side, rgb(88 123 151 / 0.22), rgb(41 79 67 / 0.14) 48%, transparent 72%)",
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 130% 90% at 40% -5%, rgb(255 224 163 / 0.14), transparent 58%), radial-gradient(ellipse 100% 70% at 95% 35%, rgb(242 166 94 / 0.1), transparent 52%), radial-gradient(ellipse 85% 60% at 5% 75%, rgb(73 123 152 / 0.1), transparent 50%)",
              }}
            />
          </ParallaxLayer>
        ) : (
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse 100% 80% at 50% 0%, rgb(255 224 163 / 0.1), transparent 55%), radial-gradient(ellipse 80% 60% at 100% 40%, rgb(184 95 114 / 0.08), transparent 50%)",
            }}
          />
        )}

        <ParallaxLayer
          className="absolute inset-[-15%] will-change-transform"
          y={ribbonY}
        >
          <div
            className="absolute inset-x-[-15%] top-[18%] h-[42%] opacity-[0.16] depth-ribbon-drift"
            style={{
              background:
                "radial-gradient(ellipse 55% 38% at 50% 50%, rgb(255 224 163 / 0.4), rgb(242 166 94 / 0.15) 42%, transparent 68%)",
              filter: "blur(1px)",
            }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          className="absolute inset-[-14%] will-change-transform"
          y={yMid}
        >
          <div
            className="absolute inset-0 opacity-[0.085]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-11deg, transparent, transparent 16px, rgba(228,228,231,0.09) 16px, rgba(228,228,231,0.09) 17px), repeating-linear-gradient(79deg, transparent, transparent 20px, rgba(161,161,170,0.07) 20px, rgba(161,161,170,0.07) 21px)",
              maskImage:
                "radial-gradient(ellipse 88% 72% at 50% 52%, black 22%, transparent 74%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[38%] opacity-[0.12]"
            style={{
              background:
                "linear-gradient(to top, rgb(10 24 26 / 0.78) 0%, transparent 62%), radial-gradient(ellipse 58% 42% at 22% 100%, rgb(41 79 67 / 0.42), transparent 68%)",
            }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          className="absolute inset-[-10%] will-change-transform"
          y={yFore}
        >
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              maskImage:
                "radial-gradient(ellipse 95% 80% at 50% 45%, black 18%, transparent 78%)",
            }}
          />
        </ParallaxLayer>

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 82% 58% at 50% 14%, transparent 38%, rgba(8, 16, 18, 0.5) 100%), radial-gradient(ellipse 95% 55% at 50% 100%, transparent 42%, rgba(6, 12, 14, 0.42) 100%), linear-gradient(to bottom, rgba(8, 14, 16, 0.32), transparent 20%, transparent 78%, rgba(6, 12, 14, 0.36))",
          }}
        />
      </div>
    </>
  );
}
