import { Link } from "react-router";
import { FOOTER_LINKS, SITE } from "~/data/site";
import { DevforgeWordmark } from "~/components/logo";
import { DiscordIcon, GithubIcon } from "~/components/brand-icons";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070510]">
      {/* molten hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-forge/60 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <DevforgeWordmark />
          <p className="max-w-xs text-sm leading-relaxed text-white/50">
            {SITE.tagline} Self-hostable tools — Rust engines, React & React
            Native apps — built so you own the whole stack.
          </p>
          <div className="mt-1 flex items-center gap-2">
            <a
              href={SITE.socials.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:border-forge/40 hover:text-forge"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={SITE.socials.discord}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Discord"
              className="rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:border-forge/40 hover:text-forge"
            >
              <DiscordIcon size={18} />
            </a>
          </div>
        </div>

        {FOOTER_LINKS.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/5 px-5 py-6 text-xs text-white/40 sm:flex-row sm:px-8">
        <p>
          © {SITE.founded} {SITE.company}. All rights reserved.
        </p>
        <p className="font-mono tracking-wide">
          Rust + React · {SITE.domain}
        </p>
      </div>
    </footer>
  );
}
