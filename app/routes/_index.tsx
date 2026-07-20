import type { Route } from "./+types/_index";
import { Braces, Server, ShieldCheck, Zap } from "lucide-react";
import { PRINCIPLES, PRODUCTS } from "~/data/products";
import { SITE } from "~/data/site";
import { EmberField } from "~/components/ember-field";
import { ForgeConstellation } from "~/components/forge-constellation";
import { ProductCard } from "~/components/product-card";
import { Cta, Eyebrow, SectionHeading } from "~/components/primitives";
import { Reveal, RevealItem, RevealStagger } from "~/components/reveal";
import { pageMeta } from "~/lib/meta";

export function meta(_: Route.MetaArgs) {
  return pageMeta({ path: "/" });
}

const TENETS = [
  {
    icon: Zap,
    title: "Rust & React",
    body: "Rust engines for the hot paths; React and React Native for the apps.",
  },
  {
    icon: Braces,
    title: "Open standards",
    body: "Cypher, GraphQL, WHIP/WHEP, Git — the interfaces you already know.",
  },
  {
    icon: Server,
    title: "Self-hostable",
    body: "Run the whole stack yourself — no sidecars, no managed cloud required.",
  },
  {
    icon: ShieldCheck,
    title: "Own your data",
    body: "No vendor lock-in. Your data stays in open formats and stores you control.",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <EmberField density={30} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(115% 80% at 50% -5%, rgba(249,115,22,0.16) 0%, transparent 50%)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-24">
          <div className="pt-8 lg:pt-0">
            <Reveal>
              <Eyebrow>{SITE.company} · Est. {SITE.founded}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
                Developer infrastructure{" "}
                <span className="text-molten">you own.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                Devforge builds a small family of self-hostable tools — a graph
                database, an egress proxy, a team-chat platform and a Git-backed
                CMS. Rust engines for the hot paths, React and React Native for
                the apps. Own your data; run the whole stack yourself.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Cta to="/products">Explore the products</Cta>
                <Cta href={SITE.socials.github} variant="ghost">
                  View on GitHub
                </Cta>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <ForgeConstellation />
          </div>
        </div>
      </section>

      {/* ── Tenets ───────────────────────────────────────────────────────── */}
      <section className="relative border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <RevealStagger className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {TENETS.map((tenet) => (
              <RevealItem
                key={tenet.title}
                className="flex flex-col gap-2 py-8 sm:pr-8"
              >
                <tenet.icon className="h-5 w-5 text-forge" />
                <h3 className="mt-1 text-base font-semibold text-white">
                  {tenet.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {tenet.body}
                </p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The product family"
              title={
                <>
                  Four tools, <span className="text-molten">one forge</span>.
                </>
              }
              intro="Each product stands on its own — but they share a philosophy: self-hostable by default, no vendor lock-in, and infrastructure you fully own."
            />
          </Reveal>

          <RevealStagger className="mt-12 grid gap-4 md:grid-cols-2">
            {PRODUCTS.map((product) => (
              <RevealItem key={product.slug}>
                <ProductCard product={product} featured />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/5 py-20 sm:py-24">
        <EmberField density={14} glow className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What we build by"
              align="center"
              title="Principles pressed into every tool"
              intro="Devforge is a blacksmith's shop for software. These four principles shape everything that leaves the forge."
            />
          </Reveal>
          <RevealStagger className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <RevealItem key={p.title}>
                <div className="h-full rounded-xl border border-white/8 bg-white/[0.02] p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-forge/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {p.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 120% at 50% 120%, rgba(249,115,22,0.16) 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Let's forge something{" "}
              <span className="text-molten">together</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
              Adopting a product, self-hosting at scale, or just curious what
              we're building? We'd love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Cta to="/contact">Get in touch</Cta>
              <Cta to="/company" variant="ghost">
                About Devforge
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
