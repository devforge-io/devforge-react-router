import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { cn } from "~/lib/utils";

const REPO = "devforge-io/foundry";
const LABELS = {
  mac: "Download for macOS",
  win: "Download for Windows",
} as const;
const MATCH = {
  mac: /\.dmg$/i,
  win: /\.(msi|exe)$/i,
} as const;
type OS = keyof typeof LABELS;

// No Linux desktop build yet, so Linux/other visitors fall through to the
// generic label and the releases-page href.
function detectOs(): OS | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator as unknown as { userAgentData?: { platform?: string } };
  const s = (
    ua.userAgentData?.platform ||
    navigator.platform ||
    navigator.userAgent ||
    ""
  ).toLowerCase();
  if (/mac|iphone|ipad|ipod/.test(s)) return "mac";
  if (/win/.test(s)) return "win";
  return null;
}

/**
 * A download button that detects the visitor's OS and, on click, fetches the
 * latest release and sends them straight to the matching installer. Renders a
 * real <a href={releasesUrl}> so it still works without JS, on right-click, and
 * as the fallback when detection or the release lookup fails.
 */
export function DownloadCta({
  href,
  accent,
  variant = "accent",
  children,
}: {
  href: string;
  accent: string;
  variant?: "accent" | "primary";
  children: React.ReactNode;
}) {
  const [os, setOs] = useState<OS | null>(null);
  const [busy, setBusy] = useState(false);

  // Detect on the client only (avoids SSR/hydration mismatch on the label).
  useEffect(() => setOs(detectOs()), []);

  async function onClick(e: React.MouseEvent) {
    if (!os) return; // undetected -> follow the href to the releases page
    e.preventDefault();
    setBusy(true);
    try {
      const r = await fetch(
        `https://api.github.com/repos/${REPO}/releases/latest`,
        { headers: { Accept: "application/vnd.github+json" } },
      );
      if (!r.ok) throw new Error("no release");
      const rel = (await r.json()) as {
        assets?: Array<{ name: string; browser_download_url: string }>;
      };
      const matches = (rel.assets ?? []).filter((a) => MATCH[os].test(a.name));
      const pick =
        matches.find((a) => /universal|aarch64|arm64/i.test(a.name)) ??
        matches[0];
      window.location.href = pick ? pick.browser_download_url : href;
    } catch {
      window.location.href = href;
    }
  }

  const style: React.CSSProperties =
    variant === "primary"
      ? {
          background: "linear-gradient(120deg, #ffcf5c, #f97316 55%, #ef4444)",
          color: "#1a0f00",
          boxShadow: "0 8px 30px -10px rgba(249,115,22,0.6)",
        }
      : { background: `${accent}18`, color: accent, border: `1px solid ${accent}55` };

  return (
    <a
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
        variant === "primary" ? "hover:brightness-110" : "hover:bg-white/[0.07]",
      )}
      style={style}
    >
      <Download className="h-4 w-4" />
      <span>{busy ? "Preparing…" : os ? LABELS[os] : children}</span>
    </a>
  );
}
