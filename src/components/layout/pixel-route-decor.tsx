import { routeColors } from "@/lib/route-decor";

export type PixelRouteDecorVariant =
  | "treeCluster"
  | "tallGrass"
  | "flowerPatch"
  | "pathPatch"
  | "ledge"
  | "routeSign"
  | "waterPatch"
  | "bridgeHint";

type Density = "low" | "medium" | "high";

type PixelRouteDecorProps = {
  variant: PixelRouteDecorVariant;
  className?: string;
  density?: Density;
};

const densityScale: Record<Density, number> = { low: 1, medium: 1.35, high: 1.7 };

export function PixelRouteDecor({
  variant,
  className = "",
  density = "low",
}: PixelRouteDecorProps) {
  const s = densityScale[density];
  const base = `pointer-events-none select-none [image-rendering:pixelated] ${className}`;

  switch (variant) {
    case "treeCluster":
      return (
        <div className={base} aria-hidden>
          <div className="flex gap-1 opacity-90" style={{ transform: `scale(${s})`, transformOrigin: "bottom center" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="h-8 w-10 rounded-t-sm"
                  style={{
                    background: `linear-gradient(180deg, ${routeColors.treeHighlight} 0%, ${routeColors.tree} 100%)`,
                    boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.25)",
                  }}
                />
                <div
                  className="h-3 w-3"
                  style={{ backgroundColor: routeColors.cliff }}
                />
              </div>
            ))}
          </div>
        </div>
      );

    case "tallGrass":
      return (
        <div className={`${base} flex gap-0.5 opacity-70`} aria-hidden>
          {Array.from({ length: Math.round(5 * s) }).map((_, i) => (
            <div
              key={i}
              className="w-0.5 rounded-t-full"
              style={{
                height: `${10 + (i % 3) * 4}px`,
                background: `linear-gradient(180deg, ${routeColors.grassLight}, ${routeColors.grassMid})`,
              }}
            />
          ))}
        </div>
      );

    case "flowerPatch":
      return (
        <div className={`${base} flex gap-1 opacity-85`} aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: routeColors.flowerPink }} />
          <span className="h-1 w-1 rounded-full" style={{ background: routeColors.flowerWhite }} />
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: routeColors.flowerRed }} />
        </div>
      );

    case "pathPatch":
      return (
        <div
          className={`${base} rounded-full opacity-50 blur-[0.5px]`}
          style={{
            width: `${80 * s}px`,
            height: `${36 * s}px`,
            background: `radial-gradient(ellipse at center, ${routeColors.sand} 0%, ${routeColors.sandDark} 55%, transparent 72%)`,
          }}
          aria-hidden
        />
      );

    case "ledge":
      return (
        <div className={base} aria-hidden>
          <div
            className="h-2 w-24 rounded-sm opacity-80"
            style={{
              background: `linear-gradient(180deg, ${routeColors.cliff} 0%, #2a221c 100%)`,
              boxShadow: "0 2px 0 rgba(0,0,0,0.35)",
            }}
          />
        </div>
      );

    case "routeSign":
      return (
        <div className={`${base} flex flex-col items-center opacity-75`} aria-hidden>
          <div
            className="flex h-6 min-w-[52px] items-center justify-center rounded-sm border border-black/30 px-1"
            style={{
              background: `linear-gradient(180deg, ${routeColors.sand} 0%, ${routeColors.sandDark} 100%)`,
            }}
          >
            <span className="h-1 w-8 rounded-full bg-black/20" />
          </div>
          <div className="h-4 w-1" style={{ backgroundColor: routeColors.cliff }} />
        </div>
      );

    case "waterPatch":
      return (
        <div
          className={`${base} rounded-full opacity-45`}
          style={{
            width: `${100 * s}px`,
            height: `${48 * s}px`,
            background: `radial-gradient(ellipse at 40% 40%, ${routeColors.waterLight} 0%, ${routeColors.water} 50%, transparent 70%)`,
          }}
          aria-hidden
        />
      );

    case "bridgeHint":
      return (
        <div className={`${base} flex items-end gap-0.5 opacity-60`} aria-hidden>
          <div className="h-1 w-6 rounded-sm" style={{ background: routeColors.sandDark }} />
          <div className="h-1.5 w-8 rounded-sm" style={{ background: routeColors.sand }} />
          <div className="h-1 w-6 rounded-sm" style={{ background: routeColors.sandDark }} />
        </div>
      );

    default:
      return null;
  }
}
