import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import type { Product } from "~/data/products";
import { resolveIcon } from "~/components/icon";
import { cn } from "~/lib/utils";

/** An accented, hover-lit card linking to a product route. */
export function ProductCard({
  product,
  featured = false,
  className,
}: {
  product: Product;
  featured?: boolean;
  className?: string;
}) {
  const Glyph = resolveIcon(product.icon);
  return (
    <Link
      to={`/products/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.035]",
        featured && "sm:p-8",
        className,
      )}
      style={{ ["--acc" as string]: product.accent }}
    >
      {/* accent wash on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 80% at 100% 0%, ${product.accent}1f 0%, transparent 60%)`,
        }}
      />
      {/* top hairline that lights up */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)`,
        }}
      />

      <div className="relative flex items-center justify-between">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `${product.accent}16`,
            border: `1px solid ${product.accent}33`,
            boxShadow: `0 0 22px -6px ${product.accent}`,
          }}
        >
          <Glyph size={24} style={{ color: product.accent }} />
        </span>
        <span
          className="rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wide"
          style={{
            background: `${product.accent}12`,
            color: product.accent,
            border: `1px solid ${product.accent}30`,
          }}
        >
          {product.status}
        </span>
      </div>

      <div className="relative mt-5 flex items-baseline gap-2">
        <h3 className="text-xl font-semibold text-white">{product.name}</h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
          {product.eyebrow}
        </span>
      </div>

      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-white/55">
        {featured ? product.overview.split(". ")[0] + "." : product.blurb}
      </p>

      <span
        className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: product.accent }}
      >
        Explore {product.name}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
