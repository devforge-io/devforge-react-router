import type { Route } from "./+types/contact";
import { Form } from "react-router";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { PRODUCTS } from "~/data/products";
import { SITE } from "~/data/site";
import { DiscordIcon, GithubIcon } from "~/components/brand-icons";
import { EmberField } from "~/components/ember-field";
import { CornerBrackets, Eyebrow } from "~/components/primitives";
import { Reveal } from "~/components/reveal";
import { cn } from "~/lib/utils";
import { pageMeta } from "~/lib/meta";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: `Contact — ${SITE.name}`,
    description: `Get in touch with ${SITE.company} about Anvil DB, Aegis, Foundry or Stencil.`,
    path: "/contact",
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ActionResult = {
  ok: boolean;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; topic: string; message: string };
};

export async function action({
  request,
}: Route.ActionArgs): Promise<ActionResult> {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const topic = String(form.get("topic") ?? "general").trim();
  const message = String(form.get("message") ?? "").trim();

  const errors: ActionResult["errors"] = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (message.length < 10)
    errors.message = "A little more detail helps — 10 characters or more.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, values: { name, email, topic, message } };
  }

  // In a real deployment, forward the message here — e.g. Resend, a webhook, or
  // an internal queue. This route intentionally does the validation server-side
  // so the form works with or without client JavaScript.
  return { ok: true };
}

const TOPICS = [
  { value: "general", label: "General enquiry" },
  ...PRODUCTS.map((p) => ({ value: p.slug, label: p.name })),
  { value: "selfhost", label: "Self-hosting at scale" },
];

export default function Contact({ actionData }: Route.ComponentProps) {
  const result = actionData as ActionResult | undefined;
  const errors = result?.errors;
  const values = result?.values;

  return (
    <div className="relative min-h-[80vh] overflow-hidden pt-32 pb-24">
      <EmberField density={22} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% -10%, rgba(249,115,22,0.14) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-5xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1fr]">
        {/* Left rail */}
        <div>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Let's forge something{" "}
              <span className="text-molten">together</span>.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/60">
              Questions about a product, self-hosting, or a partnership? Send us
              a note and we'll get back to you.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-forge">
                  <Mail className="h-4 w-4" />
                </span>
                {SITE.email}
              </a>
              <a
                href={SITE.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-forge">
                  <GithubIcon size={16} />
                </span>
                github.com/devforge-io
              </a>
              <a
                href={SITE.socials.discord}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-forge">
                  <DiscordIcon size={16} />
                </span>
                Join our Discord
              </a>
            </div>
          </Reveal>
        </div>

        {/* Form card */}
        <Reveal delay={0.12}>
          <div className="relative rounded-2xl border border-white/10 bg-[#0b0912]/80 p-6 backdrop-blur sm:p-8">
            <CornerBrackets />
            {result?.ok ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <CheckCircle2 className="h-12 w-12 text-forge" />
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Message sent
                </h2>
                <p className="mt-2 max-w-xs text-sm text-white/55">
                  Thanks for reaching out — we'll be in touch soon. Consider this
                  note struck and cooling.
                </p>
              </div>
            ) : (
              <Form method="post" className="space-y-5" noValidate>
                <Field label="Name" error={errors?.name}>
                  <input
                    name="name"
                    type="text"
                    defaultValue={values?.name}
                    placeholder="Ada Lovelace"
                    className={inputCls(Boolean(errors?.name))}
                  />
                </Field>

                <Field label="Email" error={errors?.email}>
                  <input
                    name="email"
                    type="email"
                    defaultValue={values?.email}
                    placeholder="ada@example.com"
                    className={inputCls(Boolean(errors?.email))}
                  />
                </Field>

                <Field label="Topic">
                  <select
                    name="topic"
                    defaultValue={values?.topic ?? "general"}
                    className={inputCls(false)}
                  >
                    {TOPICS.map((t) => (
                      <option key={t.value} value={t.value} className="bg-[#0b0912]">
                        {t.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Message" error={errors?.message}>
                  <textarea
                    name="message"
                    rows={5}
                    defaultValue={values?.message}
                    placeholder="Tell us what you're building…"
                    className={cn(inputCls(Boolean(errors?.message)), "resize-y")}
                  />
                </Field>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-[#1a0f00] transition-all hover:-translate-y-0.5 hover:brightness-110"
                  style={{
                    background:
                      "linear-gradient(120deg, #ffcf5c, #f97316 55%, #ef4444)",
                    boxShadow: "0 8px 30px -10px rgba(249,115,22,0.6)",
                  }}
                >
                  Send message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-center text-xs text-white/35">
                  We'll only use your details to reply. No lists, no spam.
                </p>
              </Form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
          {label}
        </span>
        {error && <span className="text-[11px] text-molten">{error}</span>}
      </span>
      {children}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors",
    "focus:border-forge/50 focus:bg-white/[0.04]",
    hasError ? "border-molten/60" : "border-white/10",
  );
}
