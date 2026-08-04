import { useMemo } from "react";
import { cn } from "~/lib/utils";

/**
 * Ambient "forge" backdrop: a panning grid, two drifting glow clouds, a field of
 * rising embers and occasional flying sparks, all pure CSS animation (keyframes
 * live in app.css). Positions/timings are derived deterministically from the
 * index so the server and client render byte-identical markup (no hydration
 * mismatch, no Math.random). Meant to sit behind content with `pointer-events-none`.
 */
export function EmberField({
  density = 26,
  accent = "#f5a524",
  className,
  glow = true,
}: {
  density?: number;
  accent?: string;
  className?: string;
  glow?: boolean;
}) {
  const embers = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const left = (i * 61.8) % 100;
      const size = 1.5 + ((i * 7) % 5) * 0.7;
      const duration = 9 + ((i * 13) % 11);
      const delay = -((i * 3.7) % duration);
      const drift = ((i % 5) - 2) * 16;
      const opacity = 0.35 + ((i * 17) % 5) * 0.12;
      const warm = i % 3 === 0 ? "#ffcf5c" : i % 3 === 1 ? "#f97316" : accent;
      return { i, left, size, duration, delay, drift, opacity, warm };
    });
  }, [density, accent]);

  const sparks = useMemo(
    () => [
      { top: "12%", delay: "1s", dur: "11s" },
      { top: "38%", delay: "7s", dur: "13s" },
      { top: "68%", delay: "15s", dur: "10s" },
    ],
    [],
  );

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {/* Forge-glow clouds */}
      {glow && (
        <>
          <div
            className="absolute -top-24 left-1/4 h-[560px] w-[560px] rounded-full [filter:blur(150px)]"
            style={{
              background: `radial-gradient(circle, ${hexA(accent, 0.14)}, transparent 62%)`,
              animation: "glowPulse 22s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-[-10%] right-[12%] h-[440px] w-[440px] rounded-full [filter:blur(140px)]"
            style={{
              background:
                "radial-gradient(circle, rgba(239,68,68,0.10), transparent 66%)",
              animation: "glowPulse 30s ease-in-out 4s infinite reverse",
            }}
          />
        </>
      )}

      {/* Panning grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,165,36,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,165,36,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, #000 40%, transparent 100%)",
          animation: "gridPan 18s linear infinite",
        }}
      />

      {/* Rising embers */}
      <div className="absolute inset-0">
        {embers.map((e) => (
          <span
            key={e.i}
            className="absolute bottom-[-12px] rounded-full"
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              background: e.warm,
              boxShadow: `0 0 ${e.size * 3}px ${e.warm}`,
              // custom props consumed by the emberRise keyframe
              ["--ember-drift" as string]: `${e.drift}px`,
              ["--ember-opacity" as string]: e.opacity,
              animation: `emberRise ${e.duration}s linear ${e.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Flying sparks */}
      <div className="absolute inset-0">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              top: s.top,
              left: "-6%",
              width: 110,
              height: 1.5,
              background:
                "linear-gradient(90deg, transparent, rgba(255,207,92,0.95))",
              filter: "drop-shadow(0 0 5px #ffcf5c)",
              opacity: 0,
              transform: "rotate(18deg)",
              animation: `sparkFly ${s.dur} ease-in ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(4,3,10,0.6) 100%)",
        }}
      />
    </div>
  );
}

/** Turn a #rrggbb hex + alpha into an rgba() string. */
function hexA(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
