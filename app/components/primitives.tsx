import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "~/lib/utils";

/** A monospace HUD eyebrow with a pulsing status dot. */
export function Eyebrow({
  children,
  accent = "#f5a524",
  className,
}: {
  children: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.28em]",
        className,
      )}
      style={{ color: accent }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full animate-pulse-slow"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
      />
      {children}
    </span>
  );
}

/** Four glowing corner brackets that frame a HUD panel. */
export function CornerBrackets({
  accent = "rgba(245,165,36,0.4)",
  size = 14,
  inset = 10,
}: {
  accent?: string;
  size?: number;
  inset?: number;
}) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    pointerEvents: "none",
  };
  return (
    <>
      <span style={{ ...base, top: inset, left: inset, borderTop: `1px solid ${accent}`, borderLeft: `1px solid ${accent}` }} />
      <span style={{ ...base, top: inset, right: inset, borderTop: `1px solid ${accent}`, borderRight: `1px solid ${accent}` }} />
      <span style={{ ...base, bottom: inset, left: inset, borderBottom: `1px solid ${accent}`, borderLeft: `1px solid ${accent}` }} />
      <span style={{ ...base, bottom: inset, right: inset, borderBottom: `1px solid ${accent}`, borderRight: `1px solid ${accent}` }} />
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  accent,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  accent?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow accent={accent}>{eyebrow}</Eyebrow>}
      <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-white/55",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function Pill({
  children,
  accent = "#f5a524",
  className,
}: {
  children: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide",
        className,
      )}
      style={{
        borderColor: `${accent}44`,
        background: `${accent}12`,
        color: accent,
      }}
    >
      {children}
    </span>
  );
}

type CtaProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "ghost" | "accent";
  accent?: string;
  className?: string;
  arrow?: boolean;
};

/** Internal (to) or external (href) call-to-action button with a sliding arrow. */
export function Cta({
  children,
  to,
  href,
  variant = "primary",
  accent = "#f5a524",
  className,
  arrow = true,
}: CtaProps) {
  const isExternal = Boolean(href);
  const inner = (
    <>
      <span>{children}</span>
      {arrow &&
        (isExternal ? (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        ) : (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
        ))}
    </>
  );

  const base =
    "group/cta inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08060f]";

  const styles: React.CSSProperties =
    variant === "primary"
      ? {
          background: "linear-gradient(120deg, #ffcf5c, #f97316 55%, #ef4444)",
          color: "#1a0f00",
          boxShadow: "0 8px 30px -10px rgba(249,115,22,0.6)",
        }
      : variant === "accent"
        ? {
            background: `${accent}18`,
            color: accent,
            border: `1px solid ${accent}55`,
          }
        : {
            background: "rgba(255,255,255,0.03)",
            color: "rgba(255,255,255,0.82)",
            border: "1px solid rgba(255,255,255,0.12)",
          };

  const cls = cn(
    base,
    variant === "primary" && "hover:brightness-110 hover:-translate-y-0.5",
    variant !== "primary" && "hover:bg-white/[0.07] hover:-translate-y-0.5",
    className,
  );

  if (to) {
    return (
      <Link to={to} className={cls} style={styles}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cls}
      style={styles}
    >
      {inner}
    </a>
  );
}
