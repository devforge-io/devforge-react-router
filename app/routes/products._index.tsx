import type { Route } from "./+types/products._index";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "~/data/products";
import { SITE } from "~/data/site";
import { EmberField } from "~/components/ember-field";
import { ProductCard } from "~/components/product-card";
import { Eyebrow, SectionHeading } from "~/components/primitives";
import { Reveal, RevealItem, RevealStagger } from "~/components/reveal";
import { pageMeta } from "~/lib/meta";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: `Products — ${SITE.name}`,
    description:
      "Explore the Devforge product family: Anvil DB, Aegis, Foundry and Stencil — self-hostable developer infrastructure you own. Rust engines, React and React Native apps.",
    path: "/products",
  });
}

export default function ProductsIndex() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-32 pb-14">
        <EmberField density={24} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 80% at 50% -10%, rgba(249,115,22,0.14) 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <Eyebrow>The product family</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 max-w-2xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Everything Devforge has{" "}
              <span className="text-molten">forged</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
              Four independent tools that share one philosophy — self-hostable
              by default, no vendor lock-in, and infrastructure you fully own.
              Pick one, or run them together.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <RevealStagger className="grid gap-4 md:grid-cols-2">
            {PRODUCTS.map((product) => (
              <RevealItem key={product.slug}>
                <ProductCard product={product} featured />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Comparison table */}
      <section className="relative border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="At a glance"
              title="How the family compares"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/8 bg-white/[0.02]">
                    <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                      Product
                    </th>
                    <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                      Category
                    </th>
                    <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                      Language
                    </th>
                    <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                      Status
                    </th>
                    <th className="px-5 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p) => (
                    <tr
                      key={p.slug}
                      className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-2.5">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              background: p.accent,
                              boxShadow: `0 0 8px ${p.accent}`,
                            }}
                          />
                          <span className="font-medium text-white">
                            {p.name}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-white/55">{p.eyebrow}</td>
                      <td className="px-5 py-4 text-white/55">{p.language}</td>
                      <td className="px-5 py-4">
                        <span
                          className="rounded-full px-2.5 py-1 font-mono text-[11px]"
                          style={{
                            background: `${p.accent}12`,
                            color: p.accent,
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          to={`/products/${p.slug}`}
                          className="inline-flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
                        >
                          View <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
