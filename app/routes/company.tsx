import type { Route } from "./+types/company";
import { PRINCIPLES, PRODUCTS } from "~/data/products";
import { SITE } from "~/data/site";
import { EmberField } from "~/components/ember-field";
import { DevforgeLogo } from "~/components/logo";
import { Icon } from "~/components/icon";
import { Cta, Eyebrow, SectionHeading } from "~/components/primitives";
import { Reveal, RevealItem, RevealStagger } from "~/components/reveal";
import { pageMeta } from "~/lib/meta";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: `Company · ${SITE.name}`,
    description: `${SITE.company} is a blacksmith's shop for software, building self-hostable developer infrastructure you fully own.`,
    path: "/company",
  });
}

const METAPHOR = [
  { key: "devforge", name: "Devforge", role: "The forge itself, the shop where everything is made." },
  ...PRODUCTS.map((p) => ({ key: p.slug, name: p.name, role: p.forgeNote })),
];

export default function Company() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <EmberField density={28} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 80% at 50% -10%, rgba(249,115,22,0.15) 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <div className="relative mb-8 flex justify-center">
              <div className="pointer-events-none absolute inset-0 flex justify-center">
                <div className="h-40 w-64 rounded-full bg-forge/15 blur-3xl" />
              </div>
              <DevforgeLogo className="relative w-64 max-w-[70vw] sm:w-80" />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <Eyebrow className="justify-center">{SITE.company}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              A blacksmith's shop{" "}
              <span className="text-molten">for software</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
              {SITE.company} builds developer infrastructure the way a smith
              works metal: heated, shaped, and tempered until it's dependable.
              Every tool we make is self-hostable and yours to own, no managed
              cloud, no lock-in.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-16">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-[15px] leading-relaxed text-white/65">
              <h2 className="text-2xl font-semibold text-white">
                Why we build
              </h2>
              <p>
                Modern software teams stitch together a dozen hosted services and
                hope the seams hold. Your data ends up scattered across vendors,
                hidden behind databases you can't read, and locked into clouds
                you can't leave.
              </p>
              <p>
                Devforge takes the opposite bet. We build small, sharp tools,
                fast where it counts and familiar everywhere else. Wherever it
                fits, your data lives in human-readable files and history you
                control; everywhere, it's yours to self-host. Standards you
                already know, not a walled garden.
              </p>
              <p>
                The result is infrastructure you can actually reason about: see
                how it works, run it on your own metal, and walk away whenever
                you want. Batteries included, but never a black box.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-forge/70">
                The forge metaphor
              </h3>
              <ul className="mt-5 space-y-4">
                {METAPHOR.map((m) => (
                  <li key={m.key} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forge [box-shadow:0_0_8px_#f5a524]" />
                    <span>
                      <span className="font-medium text-white">{m.name}</span>
                      <span className="mx-1.5 text-white/25">·</span>
                      <span className="text-sm text-white/55">{m.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="relative overflow-hidden border-t border-white/5 py-20">
        <EmberField density={12} glow className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our principles"
              align="center"
              title="Four principles, pressed into every tool"
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

      {/* Product roll-call */}
      <section className="relative border-t border-white/5 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
              What leaves the forge
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <div
                key={p.slug}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4"
              >
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder + CTA */}
      <section className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 120% at 50% 120%, rgba(249,115,22,0.14) 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-white/40">
              Founded {SITE.founded} · {SITE.founder}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Building the tools we{" "}
              <span className="text-molten">wished existed</span>.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Cta to="/contact">Get in touch</Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
