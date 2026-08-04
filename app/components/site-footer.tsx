import { Link } from "react-router";
import { FOOTER_LINKS, SITE } from "~/data/site";
import { DevforgeWordmark } from "~/components/logo";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070510]">
      {/* molten hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-forge/60 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <DevforgeWordmark />
          <p className="max-w-xs text-sm leading-relaxed text-white/50">
            {SITE.tagline} Self-hostable developer tools you fully own, built so
            your data stays yours.
          </p>
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
          Self-hostable · {SITE.domain}
        </p>
      </div>
    </footer>
  );
}
