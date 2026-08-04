import type { Route } from "./+types/route";
import { Link } from "react-router";
import { ArrowLeft, Monitor, Server } from "lucide-react";
import { SITE } from "~/data/site";
import { EmberField } from "~/components/ember-field";
import { CodeBlock } from "~/components/code-block";
import { DownloadCta } from "~/components/download-cta";
import { Cta, Eyebrow, SectionHeading } from "~/components/primitives";
import { Reveal } from "~/components/reveal";
import { pageMeta } from "~/lib/meta";

const ACCENT = "#fb923c";
const RELEASES = "https://github.com/devforge-io/foundry/releases";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: `Install & update Foundry · ${SITE.name}`,
    description:
      "Self-host the Foundry server (install, config, TLS, ports and updates) and install, point and update the desktop client.",
    path: "/products/foundry/server",
  });
}

const SERVER_CODE = [
  {
    label: "Install",
    lang: "bash",
    code: `# published release binary -> /usr/local/bin/foundry
curl -fsSL https://devforge.io/foundry/install.sh | sh

# a specific version / custom directory
FOUNDRY_VERSION=v0.1.0 FOUNDRY_INSTALL_DIR="$HOME/.local/bin" \\
  curl -fsSL https://devforge.io/foundry/install.sh | sh`,
  },
  {
    label: "Configure",
    lang: "bash",
    code: `# scaffold a production config at /etc/foundry/foundry.toml
sudo foundry init

# it presets one public :443 + a media UDP range. edit it:
#   bind       = "0.0.0.0:443"
#   tls_cert   = "/etc/letsencrypt/live/foundry.example.com/fullchain.pem"
#   tls_key    = "/etc/letsencrypt/live/foundry.example.com/privkey.pem"
#   public_url = "https://foundry.example.com"`,
  },
  {
    label: "TLS",
    lang: "bash",
    code: `# issue a cert over port 80 (foundry keeps 443)
sudo certbot certonly --standalone --preferred-challenges http \\
  -d foundry.example.com --agree-tos -m you@example.com

# /etc/letsencrypt/{live,archive} are 0700 root, so give a group read access
# and put the foundry user in it. modern certbot preserves the group + mode of
# the renewed key (setgid on the dirs also carries it), so this survives.
sudo groupadd --system ssl-cert 2>/dev/null || true
sudo usermod -aG ssl-cert foundry
sudo chgrp -R ssl-cert /etc/letsencrypt/live /etc/letsencrypt/archive
sudo find /etc/letsencrypt/live /etc/letsencrypt/archive -type d -exec chmod g+rx,g+s {} +
sudo find /etc/letsencrypt/archive -type f -name '*.pem' -exec chmod g+r {} +

# point tls_cert/tls_key at the live paths (see Configure), then restart so the
# service gains its new group. reset-failed clears any earlier crash-loop lock.
sudo systemctl reset-failed foundry
sudo systemctl restart foundry`,
  },
  {
    label: "Ports",
    lang: "bash",
    code: `# open the firewall (Ubuntu ufw)
sudo ufw allow 443/tcp           # messaging, API, uploads, signaling
sudo ufw allow 16384:32768/udp   # call media (SFU RTP/SRTP)
sudo ufw allow 3478:3479/udp     # STUN/TURN (coturn), if run here`,
  },
  {
    label: "Run",
    lang: "bash",
    code: `# foreground (Ctrl-C to stop)
foundry

# or as a background daemon (writes a PID file + log)
foundry start
foundry status
foundry stop`,
  },
  {
    label: "Service (systemd)",
    lang: "bash",
    code: `# dedicated user + dirs, then create the unit yourself
sudo useradd --system --home /var/lib/foundry --create-home foundry
sudo mkdir -p /var/lib/foundry/data /var/log/foundry
sudo chown -R foundry:foundry /var/lib/foundry /var/log/foundry /etc/foundry

sudo tee /etc/systemd/system/foundry.service >/dev/null <<'EOF'
[Unit]
Description=Foundry server
After=network.target
[Service]
Type=simple
User=foundry
WorkingDirectory=/var/lib/foundry
AmbientCapabilities=CAP_NET_BIND_SERVICE
ExecStart=/usr/local/bin/foundry
Restart=on-failure
[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now foundry
sudo journalctl -u foundry -f`,
  },
  {
    label: "Update",
    lang: "bash",
    code: `# re-run the installer to get the latest binary (your data/ is untouched)
curl -fsSL https://devforge.io/foundry/install.sh | sh

# then restart it
foundry stop && foundry start        # or, with systemd: sudo systemctl restart foundry`,
  },
];

const CLIENT_CODE = [
  {
    label: "Install",
    lang: "bash",
    code: `# macOS: open the .dmg and drag Foundry to Applications
# Windows: run the .msi (or .exe) installer`,
  },
  {
    label: "Point at your server",
    lang: "bash",
    code: `# config.json is created on first launch; set your server URL:
#   macOS    ~/Library/Application Support/io.devforge.foundry/config.json
#   Windows  %APPDATA%\\io.devforge.foundry\\config.json
{ "server": "https://foundry.example.com" }`,
  },
  {
    label: "Update",
    lang: "bash",
    code: `# download the latest installer and reinstall over the top.
# your server address (config.json) and login stay put.`,
  },
];

const PORTS = [
  ["443", "TCP", "Messaging, API, uploads, call signaling (HTTPS/WSS)"],
  ["16384-32768", "UDP", "Call media (the SFU's RTP/SRTP range)"],
  ["3478-3479", "UDP", "STUN/TURN (coturn), for NAT traversal"],
];

export default function FoundryServerGuide() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-28 pb-14">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 50% -10%, ${ACCENT}22 0%, transparent 55%)`,
          }}
        />
        <EmberField accent={ACCENT} density={20} className="opacity-70" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            to="/products/foundry"
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Foundry
          </Link>
          <Reveal>
            <Eyebrow accent={ACCENT}>Foundry · Self-hosting guide</Eyebrow>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Install &amp; update{" "}
              <span style={{ color: ACCENT }}>Foundry</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
              Foundry is two pieces: a self-hosted server you run on your own
              box, and a desktop client each person downloads. Here is how to
              install, configure and update both.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <DownloadCta href={RELEASES} accent={ACCENT} variant="accent">
                Download the app
              </DownloadCta>
              <Cta to="/products/foundry" variant="ghost">
                Foundry overview
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Server */}
      <section className="relative py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  background: `${ACCENT}16`,
                  border: `1px solid ${ACCENT}33`,
                }}
              >
                <Server className="h-5 w-5" style={{ color: ACCENT }} />
              </span>
              <SectionHeading
                eyebrow="Part 1"
                accent={ACCENT}
                title="Self-host the server"
              />
            </div>
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/60">
              The server is one self-contained binary. Install it, run{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-white/80">
                foundry init
              </code>{" "}
              for a production <span className="text-white/80">:443</span> setup,
              point it at TLS certificates, and open the firewall. Binding{" "}
              <span className="text-white/80">:443</span> needs
              CAP_NET_BIND_SERVICE (or root); certificate renewals hot-reload with
              no restart.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <CodeBlock samples={SERVER_CODE} accent={ACCENT} className="mt-8" />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/8 bg-white/[0.02]">
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                      Port
                    </th>
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                      Proto
                    </th>
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                      For
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PORTS.map(([port, proto, forr]) => (
                    <tr
                      key={port}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td
                        className="px-5 py-3 font-mono"
                        style={{ color: ACCENT }}
                      >
                        {port}
                      </td>
                      <td className="px-5 py-3 text-white/55">{proto}</td>
                      <td className="px-5 py-3 text-white/55">{forr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 text-sm leading-relaxed text-white/50">
              Optional: set{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-white/70">
                FOUNDRY_GIT_REMOTE
              </code>{" "}
              (plus a token) or use in-app <em>Sign in with GitHub</em> to push
              snapshots to a private repo for offsite backup, with
              restore-by-clone on a fresh boot. For calls across NAT, run coturn
              and set the STUN/TURN variables.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Client */}
      <section className="relative border-t border-white/5 py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  background: `${ACCENT}16`,
                  border: `1px solid ${ACCENT}33`,
                }}
              >
                <Monitor className="h-5 w-5" style={{ color: ACCENT }} />
              </span>
              <SectionHeading
                eyebrow="Part 2"
                accent={ACCENT}
                title="Install the desktop client"
              />
            </div>
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/60">
              The client is a normal desktop app for macOS and Windows.
              Download the installer for your OS, point it at your server once,
              and you are in. It resolves the server address at runtime, so the
              same build works against any server, and updates never touch your
              settings.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <CodeBlock samples={CLIENT_CODE} accent={ACCENT} className="mt-8" />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <DownloadCta href={RELEASES} accent={ACCENT} variant="primary">
                Download the app
              </DownloadCta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden py-20">
        <EmberField accent={ACCENT} density={14} />
        <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Stuck on setup?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/60">
              We are happy to help you get Foundry running on your own
              infrastructure.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Cta to="/contact">Get in touch</Cta>
              <Cta to="/products/foundry" variant="ghost">
                Back to Foundry
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
