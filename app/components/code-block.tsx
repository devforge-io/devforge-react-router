import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { CodeSample } from "~/data/products";
import { cn } from "~/lib/utils";

/** Render a single code line with light comment de-emphasis (SSR-safe, no deps). */
function CodeLine({ line }: { line: string }) {
  const trimmed = line.trimStart();
  const isComment = trimmed.startsWith("//") || trimmed.startsWith("#");
  return (
    <span className={cn("block", isComment && "text-white/35 italic")}>
      {line.length ? line : " "}
    </span>
  );
}

/**
 * A tabbed code viewer with a copy button and a molten header bar. Purely
 * presentational + a little client state for the active tab / copied flash.
 */
export function CodeBlock({
  samples,
  accent = "#f5a524",
  className,
}: {
  samples: CodeSample[];
  accent?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = samples[active] ?? samples[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-[#0b0912]/90 shadow-2xl shadow-black/40 backdrop-blur",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-3 py-2">
        <div className="mr-1 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        </div>
        <div className="flex flex-1 gap-1 overflow-x-auto">
          {samples.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-md px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors",
                i === active
                  ? "text-white"
                  : "text-white/40 hover:text-white/70",
              )}
              style={
                i === active
                  ? { background: `${accent}1f`, color: accent }
                  : undefined
              }
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[11px] text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" style={{ color: accent }} />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-white/85">
        <code>
          {current.code.split("\n").map((line, i) => (
            <CodeLine key={i} line={line} />
          ))}
        </code>
      </pre>
    </div>
  );
}
