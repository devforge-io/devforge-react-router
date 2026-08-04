import { cn } from "~/lib/utils";

/**
 * Brand assets. The real Devforge logo is a detailed metallic emblem + wordmark;
 * we ship two transparent PNGs derived from it:
 *   - /devforge-emblem.png, emblem only (hammer + anvil + gear + </>)
 *   - /devforge-logo.png, full stacked lockup (emblem over DEVFORGE)
 * For tiny surfaces (favicon) a simplified inline glyph, DevforgeMark, is used.
 */

/** The forge emblem as a transparent image. Wider than tall (~1.8:1). */
export function DevforgeEmblem({
  className,
  height,
  alt = "Devforge emblem",
}: {
  className?: string;
  height?: number;
  alt?: string;
}) {
  return (
    <img
      src="/devforge-emblem.png"
      alt={alt}
      draggable={false}
      style={height ? { height, width: "auto" } : undefined}
      className={cn("select-none object-contain", className)}
    />
  );
}

/** The metallic "DEVFORGE" wordmark (silver DEV / molten FORGE) as an image. */
export function DevforgeName({
  className,
  height = 18,
  alt = "Devforge",
}: {
  className?: string;
  height?: number;
  alt?: string;
}) {
  return (
    <img
      src="/devforge-wordmark.png"
      alt={alt}
      draggable={false}
      style={{ height, width: "auto" }}
      className={cn("select-none object-contain", className)}
    />
  );
}

/** The full Devforge lockup (emblem + DEVFORGE wordmark) as a transparent image. */
export function DevforgeLogo({ className }: { className?: string }) {
  return (
    <img
      src="/devforge-logo.png"
      alt="Devforge"
      draggable={false}
      className={cn("select-none object-contain", className)}
    />
  );
}

/**
 * Horizontal lockup for the nav / footer: the real emblem + the real "DEVFORGE"
 * wordmark image (the name comes from the logo itself, not CSS text). The emblem
 * is marked decorative so screen readers announce the name only once.
 */
export function DevforgeWordmark({
  className,
  height = 28,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <DevforgeEmblem
        height={height}
        alt=""
        className="drop-shadow-[0_0_10px_rgba(249,115,22,0.35)]"
      />
      <DevforgeName height={Math.round(height * 0.62)} />
    </span>
  );
}

/**
 * Simplified inline mark (anvil + spark), used where a raster emblem would be
 * muddy (favicon-scale) or as a no-request fallback. Mirrors /favicon.svg.
 */
export function DevforgeMark({
  size = 28,
  className,
  spark = true,
}: {
  size?: number;
  className?: string;
  spark?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="df-mark" x1="4" y1="4" x2="28" y2="30">
          <stop offset="0" stopColor="#ffcf5c" />
          <stop offset="0.5" stopColor="#f97316" />
          <stop offset="1" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <path
        d="M7 15h18c0 2.4-1.6 3.7-3.6 4.2l.8 2.1h2.3c.6 0 1 .5 1 1.1v1.4H6.2v-1.4c0-.6.4-1.1 1-1.1h2.3l.8-2.1C7.9 18.6 7 17.2 7 15Z"
        fill="url(#df-mark)"
      />
      <rect x="12.4" y="23.8" width="7.2" height="4.2" rx="1" fill="url(#df-mark)" />
      <path d="M25 12.4 29 11v4l-4 .9V12.4Z" fill="url(#df-mark)" opacity="0.85" />
      {spark && (
        <path
          d="M16 3.5l1.6 4.2 4.2 1.5-4.2 1.6L16 15l-1.6-4.2L10.2 9.2l4.2-1.5L16 3.5Z"
          fill="#ffcf5c"
        />
      )}
    </svg>
  );
}
