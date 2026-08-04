import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { PRODUCTS } from "~/data/products";
import { resolveIcon } from "~/components/icon";
import { DevforgeEmblem } from "~/components/logo";

const CORE = { x: 50, y: 50 };

/**
 * The home hero: each Devforge product is a node orbiting a central molten core,
 * linked by pulsing spokes. Nodes are real <Link>s to the product routes (so the
 * page still works, and is crawlable, with JS disabled). Drift is driven by a
 * requestAnimationFrame clock that freezes while a node is hovered, so it "locks
 * on". Backdrop + entrance use CSS keyframes and framer-motion respectively.
 *
 * Adapted from a constellation-navigation experiment; re-themed for the forge.
 */
export function ForgeConstellation() {
  const items = PRODUCTS;
  const [hovered, setHovered] = useState<number | null>(null);
  const [t, setT] = useState(0);
  const lastRef = useRef<number | null>(null);
  const accRef = useRef(0);
  const hoveredRef = useRef<number | null>(null);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  // rAF clock in seconds; only advances while nothing is hovered.
  useEffect(() => {
    let alive = true;
    let raf = 0;
    const loop = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = now - lastRef.current;
      lastRef.current = now;
      if (hoveredRef.current === null) accRef.current += dt;
      if (alive) setT(accRef.current / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  const N = items.length || 1;

  const nodes = items.map((item, i) => {
    const baseA = (-90 + (i * 360) / N) * (Math.PI / 180);
    const a = baseA + 0.05 * Math.sin(t * 0.4 + i * 1.7);
    const r = 34 + 2.4 * Math.sin(t * 0.36 + i * 1.1);
    return {
      item,
      i,
      x: CORE.x + r * Math.cos(a),
      y: CORE.y + r * Math.sin(a),
      accent: item.accent,
      f: (t * 0.42 + i * 0.18) % 1, // pulse travel fraction (core -> node)
    };
  });

  const dim = (i: number) => hovered !== null && hovered !== i;
  const hoverAccent = hovered !== null ? nodes[hovered].accent : "#f5a524";

  // Orbital HUD rings (memoised, SMIL-rotated so rAF frames don't reconcile them).
  const rings = useMemo(
    () => (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        <circle cx="50" cy="50" r="30" fill="none" stroke="#f5a524" strokeOpacity="0.06" strokeWidth="0.12" />
        <g>
          <circle cx="50" cy="50" r="47" fill="none" stroke="#f5a524" strokeOpacity="0.15" strokeWidth="0.3" strokeDasharray="0.3 2.6" />
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="80s" repeatCount="indefinite" />
        </g>
        <g>
          <circle cx="50" cy="50" r="43" fill="none" stroke="#f97316" strokeOpacity="0.12" strokeWidth="0.35" strokeDasharray="5 4" />
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="360 50 50" to="0 50 50" dur="58s" repeatCount="indefinite" />
        </g>
        <g>
          <circle cx="50" cy="50" r="49" fill="none" stroke="#fbbf24" strokeOpacity="0.22" strokeWidth="0.5" strokeDasharray="14 63" strokeLinecap="round" />
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="110s" repeatCount="indefinite" />
        </g>
      </svg>
    ),
    [],
  );

  return (
    <div className="relative mx-auto w-full max-w-[min(620px,74vw)]">
      {/* Telemetry line */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-3 flex items-center justify-center gap-3"
      >
        <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-forge [box-shadow:0_0_6px_#f5a524]" />
        <span className="font-mono text-[10px] tracking-[0.4em] text-forge/70">
          PRODUCT MATRIX · {String(N).padStart(2, "0")} FORGED
        </span>
        <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-forge [box-shadow:0_0_6px_#f5a524]" />
      </motion.div>

      <div className="relative aspect-square w-full">
        {rings}

        {/* Spokes + travelling pulses */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible" }}
        >
          {nodes.map((n) => {
            const active = hovered === n.i;
            const faded = dim(n.i);
            const px = CORE.x + (n.x - CORE.x) * n.f;
            const py = CORE.y + (n.y - CORE.y) * n.f;
            const pulseOpacity = Math.sin(n.f * Math.PI) * (faded ? 0.25 : 1);
            const rip = n.f > 0.72 ? (n.f - 0.72) / 0.28 : 0;
            return (
              <g key={`spoke-${n.i}`}>
                {active && (
                  <line x1={CORE.x} y1={CORE.y} x2={n.x} y2={n.y} stroke={n.accent} strokeWidth={1.1} strokeOpacity={0.18} strokeLinecap="round" />
                )}
                <line
                  x1={CORE.x}
                  y1={CORE.y}
                  x2={n.x}
                  y2={n.y}
                  stroke={n.accent}
                  strokeWidth={active ? 0.34 : 0.2}
                  strokeOpacity={faded ? 0.08 : active ? 0.75 : 0.34}
                  style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
                />
                {rip > 0 && !faded && (
                  <circle cx={n.x} cy={n.y} r={1.6 + rip * 3.2} fill="none" stroke={n.accent} strokeWidth={0.25} opacity={Math.sin(rip * Math.PI) * 0.6} />
                )}
                <circle cx={px} cy={py} r={1.7} fill={n.accent} opacity={pulseOpacity * 0.25} />
                <circle cx={px} cy={py} r={active ? 1.1 : 0.8} fill={n.accent} opacity={pulseOpacity} />
              </g>
            );
          })}
        </svg>

        {/* Core hub */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 104,
              height: 104,
              background: `radial-gradient(circle, ${hoverAccent}30, transparent 70%)`,
              animation: "glowPulse 5s ease-in-out infinite",
              transition: "background 0.4s",
            }}
          />
          {[0, 1].map((k) => (
            <span
              key={k}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 64,
                height: 64,
                border: "1px solid rgba(245,165,36,0.35)",
                animation: `ringPulse 4s ease-out ${k * 2}s infinite`,
              }}
            />
          ))}
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
            style={{
              width: 80,
              height: 80,
              borderColor: "rgba(251,146,60,0.3)",
              animation: "spin360rev 24s linear infinite",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
            style={{
              width: 58,
              height: 58,
              background:
                "conic-gradient(from 0deg, #ffcf5c, #f97316, #ef4444, #f5a524, #ffcf5c)",
              filter: "blur(7px)",
              animation: "spin360 12s linear infinite",
            }}
          />
          <div
            className="relative flex items-center justify-center rounded-2xl"
            style={{
              width: 66,
              height: 66,
              background: "#0a0713",
              border: `1px solid ${hoverAccent}`,
              boxShadow: `0 0 26px ${hoverAccent}66, inset 0 0 14px ${hoverAccent}33`,
              animation: "coreBeat 4s ease-in-out infinite",
              transition: "border-color 0.4s, box-shadow 0.4s",
            }}
          >
            <DevforgeEmblem height={34} />
          </div>
        </div>

        {/* Product nodes */}
        {nodes.map((n) => {
          const active = hovered === n.i;
          const faded = dim(n.i);
          const IconCmp = resolveIcon(n.item.icon);
          return (
            <div
              key={n.item.slug}
              className="absolute"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: active ? 20 : 10,
              }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25 + n.i * 0.1, type: "spring", stiffness: 240, damping: 18 }}
              >
                <Link
                  to={`/products/${n.item.slug}`}
                  onMouseEnter={() => setHovered(n.i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(n.i)}
                  onBlur={() => setHovered(null)}
                  aria-label={`${n.item.name}, ${n.item.eyebrow}`}
                  className="group relative flex cursor-pointer flex-col items-center outline-none"
                  style={{
                    opacity: faded ? 0.4 : 1,
                    filter: faded ? "grayscale(0.5)" : "none",
                    transition: "opacity 0.3s, filter 0.3s",
                  }}
                >
                  {/* Idle pulse ring */}
                  <span
                    className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: 44,
                      height: 44,
                      border: `1px solid ${n.accent}`,
                      opacity: 0.4,
                      animation: `ringPulse ${3 + (n.i % 3)}s ease-out ${n.i * 0.3}s infinite`,
                    }}
                  />

                  {/* Node body */}
                  <span
                    className="relative flex items-center justify-center rounded-2xl transition-transform duration-300"
                    style={{
                      width: 44,
                      height: 44,
                      background:
                        "radial-gradient(circle, rgba(16,12,26,0.96), rgba(8,6,15,0.98))",
                      border: `1px solid ${n.accent}${active ? "" : "88"}`,
                      boxShadow: active
                        ? `0 0 30px ${n.accent}, inset 0 0 12px ${n.accent}40`
                        : `0 0 12px ${n.accent}55`,
                      transform: active ? "scale(1.2)" : "scale(1)",
                    }}
                  >
                    <IconCmp
                      size={20}
                      style={{ color: n.accent, filter: `drop-shadow(0 0 5px ${n.accent})` }}
                    />
                  </span>

                  {/* Label */}
                  <span
                    className="mt-2.5 whitespace-nowrap font-mono text-[11px] font-semibold transition-colors duration-300"
                    style={{
                      color: active ? n.accent : "rgba(255,255,255,0.82)",
                      textShadow: active ? `0 0 12px ${n.accent}80` : "none",
                    }}
                  >
                    {n.item.name}
                  </span>
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Readout */}
      <div className="relative mt-3 min-h-[5rem] px-4 text-center">
        <div
          className="mb-1.5 inline-flex items-center gap-2 font-mono text-xs tracking-[0.22em]"
          style={{
            color: hovered !== null ? hoverAccent : "rgba(245,165,36,0.6)",
            transition: "color 0.3s",
          }}
        >
          <span>
            {hovered !== null
              ? `▸ ${nodes[hovered].item.name.toUpperCase()} · ${nodes[hovered].item.eyebrow}`
              : "▸ SELECT A PRODUCT"}
          </span>
          <span
            className="inline-block h-3 w-1.5 align-middle animate-caret"
            style={{ background: hovered !== null ? hoverAccent : "rgba(245,165,36,0.7)" }}
          />
        </div>
        <div
          className="mx-auto mb-2 h-px w-24 transition-colors duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${hovered !== null ? hoverAccent : "rgba(245,165,36,0.4)"}, transparent)`,
          }}
        />
        <p className="mx-auto h-10 max-w-md text-sm leading-relaxed text-white/55">
          {hovered !== null
            ? nodes[hovered].item.blurb
            : "Four tools, one forge. Hover a node to preview, click to enter."}
        </p>
      </div>
    </div>
  );
}
