import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Product } from "~/data/products";
import { PRODUCTS } from "~/data/products";
import { EmberField } from "~/components/ember-field";
import { CodeBlock } from "~/components/code-block";
import { Icon, resolveIcon } from "~/components/icon";
import { Cta, Eyebrow, Pill, SectionHeading } from "~/components/primitives";
import { Reveal, RevealItem, RevealStagger } from "~/components/reveal";
import { cn } from "~/lib/utils";

export function ProductPage({ product }: { product: Product }) {
  const Glyph = resolveIcon(product.icon);
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <div className="relative">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 50% -10%, ${product.accent}22 0%, transparent 55%)`,
          }}
        />
        <EmberField accent={product.accent} density={20} className="opacity-70" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            to="/products"
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All products
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Reveal>
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: `${product.accent}18`,
                      border: `1px solid ${product.accent}44`,
                      boxShadow: `0 0 24px ${product.accent}33`,
                    }}
                  >
                    <Glyph size={24} style={{ color: product.accent }} />
                  </span>
                  <Eyebrow accent={product.accent}>{product.eyebrow}</Eyebrow>
                </div>

                <h1 className="max-w-xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
                  {product.tagline}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
                  {product.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill accent={product.accent}>{product.status}</Pill>
                  <Pill accent={product.accent}>Built in {product.language}</Pill>
                  <Pill accent={product.accent}>Self-hostable</Pill>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {product.links.map((l) => (
                    <Cta
                      key={l.href}
                      href={l.href}
                      variant={l.kind === "primary" ? "accent" : "ghost"}
                      accent={product.accent}
                    >
                      {l.label}
                    </Cta>
                  ))}
                  <Cta to="/contact" variant="ghost" arrow>
                    Talk to us
                  </Cta>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <CodeBlock samples={product.code} accent={product.accent} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Highlights strip ─────────────────────────────────────────────── */}
      <section className="relative border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <RevealStagger className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {product.highlights.map((h) => (
              <RevealItem
                key={h}
                className="flex items-start gap-3 py-6 sm:pr-6"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${product.accent}1f` }}
                >
                  <Check className="h-3 w-3" style={{ color: product.accent }} />
                </span>
                <span className="text-sm leading-snug text-white/70">{h}</span>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What's inside"
              accent={product.accent}
              title={
                <>
                  Everything you need,{" "}
                  <span style={{ color: product.accent }}>batteries included</span>.
                </>
              }
              intro={product.overview}
            />
          </Reveal>

          <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f) => (
              <RevealItem key={f.title}>
                <FeatureCard
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                  accent={product.accent}
                />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Stats (optional) ─────────────────────────────────────────────── */}
      {product.stats && (
        <section className="relative border-y border-white/5 py-14">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <RevealStagger className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {product.stats.map((s) => (
                <RevealItem key={s.label} className="text-center">
                  <div
                    className="font-mono text-4xl font-semibold tracking-tight"
                    style={{ color: product.accent }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-sm text-white/50">{s.label}</div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      {/* ── Forge note + CTA ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <EmberField accent={product.accent} density={16} glow />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-white/40">
              {product.forgeNote}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to build with{" "}
              <span style={{ color: product.accent }}>{product.name}</span>?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {product.links.map((l) => (
                <Cta
                  key={l.href}
                  href={l.href}
                  variant={l.kind === "primary" ? "primary" : "ghost"}
                  accent={product.accent}
                >
                  {l.label}
                </Cta>
              ))}
              <Cta to="/contact" variant="ghost">
                Get in touch
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Explore the rest ─────────────────────────────────────────────── */}
      <section className="relative border-t border-white/5 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
            More from the forge
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-all hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.04]"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: `${p.accent}18` }}
                  >
                    <Icon name={p.icon} size={17} style={{ color: p.accent }} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white">
                      {p.name}
                    </span>
                    <span className="block text-xs text-white/45">
                      {p.eyebrow}
                    </span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-white/70" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  accent = "#f5a524",
  className,
}: {
  icon: string;
  title: string;
  description: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.035]",
        className,
      )}
    >
      {/* hover glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `${accent}44` }}
      />
      <span
        className="relative flex h-11 w-11 items-center justify-center rounded-lg"
        style={{
          background: `${accent}15`,
          border: `1px solid ${accent}33`,
        }}
      >
        <Icon name={icon} size={20} style={{ color: accent }} />
      </span>
      <h3 className="relative mt-4 text-base font-semibold text-white">
        {title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-white/55">
        {description}
      </p>
    </div>
  );
}
