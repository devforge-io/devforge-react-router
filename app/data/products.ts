/**
 * The Devforge product catalogue. This single module drives the animated home
 * constellation, the /products overview grid and every individual product route.
 * Icons are stored as lucide icon *names* (strings) and resolved to components in
 * `~/components/icon.tsx`, keeping this data module free of JSX.
 */

export type CodeSample = { label: string; lang: string; code: string };
export type Feature = { icon: string; title: string; description: string };
export type Stat = { value: string; label: string };

export type Product = {
  slug: string;
  key: string;
  name: string;
  wordmark: string;
  icon: string;
  accent: string;
  glow: string;
  status: string;
  language: string;
  forgeNote: string;
  eyebrow: string;
  tagline: string;
  subtitle: string;
  blurb: string;
  overview: string;
  highlights: string[];
  features: Feature[];
  stats?: Stat[];
  code: CodeSample[];
  links: { label: string; href: string; kind: "primary" | "ghost"; download?: boolean }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "anvil-db",
    key: "anvil",
    name: "Anvil",
    wordmark: "Anvil",
    icon: "Waypoints",
    accent: "#4f8fea",
    glow: "#7babf0",
    status: "Public Alpha",
    language: "Rust",
    forgeNote: "The anvil, where connected data is shaped.",
    eyebrow: "GRAPH DATABASE",
    tagline: "The graph database forged for performance.",
    subtitle:
      "A Rust-powered graph database with a native Cypher engine, ACID transactions, an auto-generated GraphQL API, and built-in graph algorithms, engineered for speed, safety, and scale.",
    blurb:
      "Rust graph database with Cypher, ACID, GraphQL and built-in algorithms, batteries included, in a single binary.",
    overview:
      "Building connected-data applications normally means stitching together a graph engine, a document store, a GraphQL layer, an auth service, file storage and an admin UI. Anvil collapses all of it into one memory-safe Rust binary with no sidecars, so you focus on your data, not your infrastructure. It speaks Cypher and GraphQL, connects through native drivers in four languages, and imports Neo4j dumps. No JVM. No garbage-collection pauses.",
    highlights: [
      "No JVM, no GC pauses, pure Rust",
      "Cypher-compatible; imports Neo4j dumps",
      "Native drivers for Rust, TypeScript, Python & Go",
      "Single binary, no sidecars to deploy",
    ],
    features: [
      {
        icon: "Terminal",
        title: "Cypher query engine",
        description:
          "Full Cypher: lexer, parser, semantic analysis, a cost-based optimizer and a Volcano-model executor with 25+ operators, multi-hop pattern matching and quantified paths.",
      },
      {
        icon: "ShieldCheck",
        title: "ACID transactions",
        description:
          "MVCC with version chains, three snapshot-isolation levels, record-level locking, deadlock detection and ARIES-style crash recovery.",
      },
      {
        icon: "Database",
        title: "Storage engine",
        description:
          "Page-based storage with an LRU cache, a CRC32-checksummed WAL, B+ tree indexes (unique, composite, full-text, spatial) and LZ4/Zstd compression.",
      },
      {
        icon: "Network",
        title: "Built-in graph algorithms",
        description:
          "PageRank, Dijkstra/A*, BFS/DFS, Louvain, connected components, betweenness & closeness centrality, MST, triangle counting and node similarity.",
      },
      {
        icon: "Braces",
        title: "Auto-generated GraphQL",
        description:
          "A GraphQL schema generated from your graph, with Relay-spec connections, filtering, batched DataLoader queries and real-time subscriptions over WebSockets.",
      },
      {
        icon: "Boxes",
        title: "Document store & file storage",
        description:
          "A native NoSQL collection store with secondary indexes and TTL, plus content-addressed object storage with signed URLs and on-the-fly image transforms.",
      },
      {
        icon: "Lock",
        title: "Row-level security & auth",
        description:
          "PostgreSQL-inspired RLS on nodes, relationships and documents; graph-native users and roles; JWT (RS256), a JWKS endpoint and Argon2id hashing.",
      },
      {
        icon: "Gauge",
        title: "Hammer visual browser",
        description:
          "A browser UI with a Cypher editor, force-directed graph visualization, a schema browser, monitoring dashboard and RLS policy manager. All bundled in.",
      },
    ],
    stats: [
      { value: "140K+", label: "lines of Rust" },
      { value: "3,200+", label: "tests" },
      { value: "50+", label: "APOC functions" },
      { value: "4", label: "native drivers" },
    ],
    code: [
      {
        label: "Cypher",
        lang: "cypher",
        code: `// Find the shortest path between two people
MATCH path = shortestPath(
  (a:Person {name: "Alice"})-[:FRIEND*]-(b:Person {name: "Hank"})
)
RETURN path, length(path) AS hops`,
      },
      {
        label: "GraphQL",
        lang: "graphql",
        code: `query GetEngineers {
  person(first: 10) {
    id
    name
    outgoing_friend {
      edges { since  node { name } }
    }
  }
}`,
      },
      {
        label: "Rust driver",
        lang: "rust",
        code: `let mut client = AnvilClient::new(
  "anvil://admin:pass@localhost:7474/default"
)?;
client.connect()?;
let result = client.query(
  "MATCH (n:Person) RETURN n.name",
  Params::new(),
)?;`,
      },
      {
        label: "Install",
        lang: "bash",
        code: `# Linux / macOS
curl -fsSL https://anvildb.com/install.sh | sh

# drivers
cargo add anvilent   npm i anvilent   pip install anvilent`,
      },
    ],
    links: [
      { label: "Visit anvildb.com", href: "https://anvildb.com", kind: "primary" },
      {
        label: "View on GitHub",
        href: "https://github.com/devforge-io/anvil",
        kind: "ghost",
      },
    ],
  },

  {
    slug: "hammer",
    key: "hammer",
    name: "Hammer",
    wordmark: "Hammer",
    icon: "Hammer",
    accent: "#a78bfa",
    glow: "#c4b5fd",
    status: "Public Alpha",
    language: "TypeScript",
    forgeNote: "The hammer, the tool that shapes what's on the anvil.",
    eyebrow: "GRAPH EXPLORER",
    tagline: "Explore your graph, visually.",
    subtitle:
      "Hammer is the web management UI for Anvil DB: a Cypher and GraphQL editor, an interactive force-directed graph canvas, schema and document browsers, and admin, monitoring and security tools, all in the browser.",
    blurb:
      "The web management UI for Anvil DB: query, visualize and administer your graph from the browser.",
    overview:
      "Hammer is the browser-based control room for Anvil DB. Write Cypher and GraphQL with rich result views, explore relationships on an interactive force-directed canvas, browse your schema and documents, and manage row-level security, functions, triggers, users and monitoring without leaving the page. It ships with Anvil, so a running database comes with a full visual workbench.",
    highlights: [
      "Cypher and GraphQL editors with table, JSON, graph and plan views",
      "Interactive force-directed graph canvas with focus mode",
      "Schema, documents, RLS policies, functions and triggers",
      "Admin, monitoring and slow-query tools, all in the browser",
    ],
    features: [
      {
        icon: "Terminal",
        title: "Cypher and GraphQL editors",
        description:
          "Write Cypher or explore the auto-generated GraphQL API, with table, JSON, graph and query-plan result views, plus full schema introspection.",
      },
      {
        icon: "Network",
        title: "Interactive graph canvas",
        description:
          "A D3 force-directed canvas with focus mode, neighbor orbit, lasso select, a minimap, four layouts and PNG/SVG export.",
      },
      {
        icon: "Database",
        title: "Schema and document browser",
        description:
          "Browse labels, relationship types, property keys, indexes and constraints, and do full collection CRUD with a JSON editor and sync rules.",
      },
      {
        icon: "Lock",
        title: "Security and access control",
        description:
          "Create and simulate row-level security policies, toggle RLS, and manage users and roles. Admin-only pages are enforced client and server-side.",
      },
      {
        icon: "Braces",
        title: "Functions and triggers",
        description:
          "Author, test and manage stored Cypher functions and event-driven triggers, with an activity log and dependency analysis.",
      },
      {
        icon: "Gauge",
        title: "Live monitoring",
        description:
          "Real-time server stats, a slow-query log, an event log and an alerts panel, so you can watch the database as it runs.",
      },
    ],
    code: [
      {
        label: "Run it",
        lang: "bash",
        code: `npm install
npm run dev   # http://localhost:5175`,
      },
      {
        label: "Query",
        lang: "cypher",
        code: `// paste into the Cypher editor
MATCH (p:Person)-[:FRIEND]->(f)
RETURN p, collect(f.name) AS friends`,
      },
      {
        label: "Connect",
        lang: "bash",
        code: `# Hammer talks to Anvil over HTTP
# default: http://localhost:7474
# set the URL in a connection profile, then log in`,
      },
    ],
    links: [
      { label: "Visit anvildb.com", href: "https://anvildb.com", kind: "primary" },
      {
        label: "View on GitHub",
        href: "https://github.com/devforge-io/anvil",
        kind: "ghost",
      },
    ],
  },

  {
    slug: "aegis",
    key: "aegis",
    name: "Aegis",
    wordmark: "Aegis",
    icon: "ShieldCheck",
    accent: "#2dd4bf",
    glow: "#5eead4",
    status: "v0.1 · Early",
    language: "Rust",
    forgeNote: "The shield, one guarded door for every request.",
    eyebrow: "EGRESS PROXY",
    tagline: "One controlled door for all your outbound traffic.",
    subtitle:
      "A minimal, header-driven HTTP forwarding proxy written in Rust. Put the destination in an X-Target-Url header; Aegis authenticates, allowlists, terminates TLS and streams the response back, all from a single binary.",
    blurb:
      "A minimal, header-driven HTTP forwarding proxy in Rust: one authenticated, allowlisted, TLS-terminating egress point.",
    overview:
      "Applications that call external APIs need a controlled, observable egress point, to centralize outbound traffic, enforce which upstreams are reachable, authenticate who may use the door, terminate and rotate TLS, and get consistent request logging. Aegis does exactly that and nothing more: no route configuration, no service mesh, no heavyweight gateway. Each request carries its target in one header; the proxy forwards the method, headers and body, and streams the response back verbatim.",
    highlights: [
      "One header: X-Target-Url, no route config",
      "TLS certs hot-reload live, no restart",
      "Tokens stored as SHA-256 only, compared in constant time",
      "Single static binary: Linux, macOS & Windows",
    ],
    features: [
      {
        icon: "Route",
        title: "Header-driven forwarding",
        description:
          "The target URL travels in the X-Target-Url request header. Aegis forwards the method, headers and body, and streams the upstream response straight back.",
      },
      {
        icon: "KeyRound",
        title: "Token authentication",
        description:
          "Optional Bearer auth on the proxy hop. Only SHA-256 hashes are persisted; the plaintext token is shown once and compared in constant time.",
      },
      {
        icon: "Shield",
        title: "Host allowlist",
        description:
          "Restrict which upstream hosts the proxy will fetch, with exact case-insensitive matching. Prevents open-proxy abuse by default.",
      },
      {
        icon: "RefreshCw",
        title: "TLS hot-reload",
        description:
          "Watches cert and key files and swaps certificates live on change, no restart, no signal. Certbot, acme.sh and Kubernetes mounted secrets just work.",
      },
      {
        icon: "GitCommit",
        title: "Upstream auth pass-through",
        description:
          "Your Authorization header is forwarded untouched to the upstream, while the Proxy-Authorization credential is stripped hop-by-hop so upstreams never see it.",
      },
      {
        icon: "ScrollText",
        title: "Structured, redacted logs",
        description:
          "One tracing line per request and response, with sensitive headers (Authorization, Cookie, Proxy-Authorization) automatically redacted.",
      },
      {
        icon: "Server",
        title: "Ops-ready CLI",
        description:
          "init, show, get/set, allow-host/deny-host and a full token subcommand suite. Runs in the foreground for systemd, Docker and Kubernetes, or daemonizes on Unix.",
      },
    ],
    code: [
      {
        label: "curl",
        lang: "bash",
        code: `curl https://proxy.devforge.org:8080/ \\
  -H 'X-Target-Url: https://api.example.com/v1/items' \\
  -H 'Authorization: Bearer sk-...'`,
      },
      {
        label: "Axios interceptor",
        lang: "ts",
        code: `const api = axios.create();
api.interceptors.request.use((config) => {
  config.headers.set("X-Target-Url", axios.getUri(config));
  config.url = "https://proxy.devforge.org:8080/";
  config.baseURL = undefined;
  config.params = undefined;
  return config;
});
// call sites stay unchanged
const { data } = await api.get("https://api.example.com/v1/items");`,
      },
      {
        label: "Set up",
        lang: "bash",
        code: `curl -fsSL https://raw.githubusercontent.com/devforge-io/aegis/master/install.sh | sudo sh

sudo aegis init
sudo aegis allow-host api.example.com
sudo aegis token create client-a     # -> Bearer OO5q...  (shown once)
sudo systemctl enable --now aegis`,
      },
    ],
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/devforge-io/aegis",
        kind: "primary",
      },
    ],
  },

  {
    slug: "foundry",
    key: "foundry",
    name: "Foundry",
    wordmark: "Foundry",
    icon: "MessagesSquare",
    accent: "#fb923c",
    glow: "#fdba74",
    status: "v0.1 · Beta",
    language: "Rust",
    forgeNote: "The foundry, where a team is cast together.",
    eyebrow: "TEAM CHAT & VIDEO",
    tagline: "Your team chat. Your server. Your data.",
    subtitle:
      "A self-hosted, Slack-like platform for team chat, calls and screen sharing. Real-time messaging and video over its own pure-Rust SFU, on a custom in-memory graph engine that persists snapshots to disk. One binary, no external database; Git is used only for offsite backup.",
    blurb:
      "Self-hosted, Slack-like chat and video in Rust. A custom in-memory graph engine with snapshots on disk; Git only for backup. No external database.",
    overview:
      "Foundry gives teams Slack-style chat, calls and screen sharing without their conversations, files and identities living in someone else's cloud. Data lives in a custom in-memory graph engine that is the runtime source of truth; every change is appended to disk the instant it happens, so a crash loses nothing, and periodic snapshots are written to disk and read straight back on boot. Git is used only for backup: each snapshot is committed for a rollback history and pushed to a remote for an offsite copy, with restore-by-clone on a fresh boot. It is event-sourced end to end, so live state and recovered state are identical by construction, and it installs as a single self-hosted binary.",
    highlights: [
      "Self-hosted server: one binary, one public port + a media UDP range",
      "Desktop client for macOS and Windows, pointed at your server",
      "Video, voice and screen sharing over its own pure-Rust SFU",
      "Custom in-memory graph engine; snapshots on disk, Git for backup",
    ],
    features: [
      {
        icon: "MessagesSquare",
        title: "Organizations, channels & messaging",
        description:
          "Multiple orgs per instance, each with its own channels and members. Messages round-trip over a single authenticated WebSocket, delivered only to that org's members.",
      },
      {
        icon: "Video",
        title: "Video, voice & screen sharing",
        description:
          "An embedded, pure-Rust SFU (WHIP/WHEP) forwards calls at direct, group or channel scope, with ring, accept and decline. Several people can share their screen at once, each share can carry its own audio, and quality adapts to each viewer's connection.",
      },
      {
        icon: "Lock",
        title: "Channel access control & groups",
        description:
          "Restrict a channel by role, by named groups or by explicit membership; make it visible-but-locked or invisible; approve request-to-join. Calls are off by default per channel. All enforced server-side.",
      },
      {
        icon: "FolderGit2",
        title: "Git-backed backup & restore",
        description:
          "Snapshots are committed and pushed to a GitHub remote (env config or in-app Sign in with GitHub); a fresh boot with no local data restores the whole instance by cloning the remote.",
      },
      {
        icon: "Globe",
        title: "Link previews & attachments",
        description:
          "Links unfurl as sender-resolved OpenGraph cards with inline YouTube, Vimeo and image embeds. File attachments are content-addressed, stored once, and images render inline.",
      },
      {
        icon: "Server",
        title: "Server & desktop client",
        description:
          "Self-host the server binary (a start/stop/status daemon; foundry init scaffolds a production :443 config with HTTPS/WSS hot-reloading certs, a media UDP range and coturn for NAT). The desktop client is a normal download you point at your server. Argon2id passwords, stateless HMAC sessions.",
      },
    ],
    code: [
      {
        label: "1 · Server",
        lang: "bash",
        code: `# install the server (published release binary)
curl -fsSL https://devforge.io/foundry/install.sh | sh

# scaffold a production config: one public :443 + media UDP range
sudo foundry init
sudo foundry start`,
      },
      {
        label: "2 · Ports & TLS",
        lang: "bash",
        code: `# point at your TLS certs (hot-reloaded on renewal)
FOUNDRY_TLS_CERT=/etc/foundry/tls.crt
FOUNDRY_TLS_KEY=/etc/foundry/tls.key

# open the firewall (Ubuntu ufw)
sudo ufw allow 443/tcp           # messaging, API, uploads, signaling
sudo ufw allow 16384:32768/udp   # call media (SFU RTP/SRTP)
sudo ufw allow 3478:3479/udp     # STUN/TURN (coturn) for NAT`,
      },
      {
        label: "3 · Desktop app",
        lang: "bash",
        code: `# download the installer for your OS from the releases page
#   macOS .dmg   Windows .msi/.exe
# then point it at your server (no rebuild needed):
#   macOS  ~/Library/Application Support/io.devforge.foundry/config.json
{ "server": "https://foundry.example.com" }`,
      },
    ],
    links: [
      {
        label: "Download the app",
        href: "https://github.com/devforge-io/foundry/releases",
        kind: "primary",
        download: true,
      },
      {
        label: "Server install guide",
        href: "/products/foundry/server",
        kind: "ghost",
      },
    ],
  },

  {
    slug: "stencil",
    key: "stencil",
    name: "Stencil",
    wordmark: "Stencil",
    icon: "LayoutTemplate",
    accent: "#d946ef",
    glow: "#e879f9",
    status: "Production-ready",
    language: "TypeScript",
    forgeNote: "The stencil, patterns you press onto the web.",
    eyebrow: "GIT-BACKED CMS",
    tagline: "Author content and design layouts, stored as files in Git.",
    subtitle:
      "A headless CMS with a visual page builder bolted on. Write Markdown, articles and wiki markup, or drag-and-drop pages and per-visitor components, all committed to your GitHub repo, versioned, and served or embedded anywhere. No database.",
    blurb:
      "Git-backed CMS and visual page builder. Content is human-readable files in your repo; every save is a commit. No database.",
    overview:
      "Traditional CMSes hide your content behind a database and split 'headless content' from 'visual layout'. Stencil does neither. Content lives as plain, human-readable files in your GitHub repository (Markdown, articles, wiki markup and drag-and-drop pages), and every save is a real commit with a draft-to-publish workflow, full history and side-by-side diffs. Editors get a rich visual builder and WYSIWYG editor; developers keep Git as the publishing pipeline and per-visitor personalization resolved on the server.",
    highlights: [
      "Every save is a real Git commit",
      "Draft → publish, with full history & diffs",
      "Headless JSON API + auto-resizing iframe embeds",
      "Per-visitor personalization, resolved server-side",
    ],
    features: [
      {
        icon: "Blocks",
        title: "Visual page builder",
        description:
          "Drag-and-drop blocks, a layers tree, live Tailwind class editing and a responsive canvas, outputting clean, self-hosted HTML with no build step.",
      },
      {
        icon: "GitBranch",
        title: "Git-backed, no database",
        description:
          "Content is stored as files in a GitHub repo. Every save is a commit, with a two-branch draft-to-publish model, full history and diffs.",
      },
      {
        icon: "Component",
        title: "Conditional components",
        description:
          "Components that render a different branch per visitor based on auth, geo, time, device, query params or A/B bucket, resolved server-side, edited in a visual flow diagram.",
      },
      {
        icon: "Layers",
        title: "Reusable components",
        description:
          "Build a fragment once (nav, footer, CTA) and drop it into any page. Edits propagate everywhere it is used.",
      },
      {
        icon: "PenTool",
        title: "Rich WYSIWYG editor",
        description:
          "A TipTap/ProseMirror editor for Markdown and articles: raw-markdown toggle, syntax-highlighted code blocks, tables, tasks, image align/resize and whiteboards.",
      },
      {
        icon: "Globe",
        title: "Headless API & embeds",
        description:
          "An edge-cached public site, a CORS-enabled read-only JSON API and template-free auto-resizing iframe embeds. Serve or embed your content anywhere.",
      },
    ],
    code: [
      {
        label: "Embed anywhere",
        lang: "html",
        code: `<iframe src="https://your-site/embed/articles/<slug>"
        style="width:100%;border:0" scrolling="no"></iframe>
<script src="https://your-site/embed.js" async></script>`,
      },
      {
        label: "Headless API",
        lang: "bash",
        code: `# list published content (filter by tag / draft)
GET /api/content?tag=changelog

# a single item -> { meta, html, raw, sha }
GET /api/content/:slug

# a specific version + diff
GET /api/content/:slug/version/:sha`,
      },
      {
        label: "Quick start",
        lang: "bash",
        code: `npm install
cp .env.example .env    # GITHUB_OWNER, GITHUB_REPO, OAuth, SESSION_SECRET
npm run dev`,
      },
    ],
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/devforge-io/stencil",
        kind: "primary",
      },
    ],
  },
];

export const PRODUCT_BY_SLUG: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p]),
);

export function getProduct(slug: string): Product | undefined {
  return PRODUCT_BY_SLUG[slug];
}

/** Shared company principles, surfaced on the home + company pages. */
export const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "The right tool for each layer",
    body: "Performance-critical engines built for speed; interfaces built to feel familiar. We reach for whatever fits each layer, and never make you pay for the wrong choice.",
  },
  {
    title: "Own your data",
    body: "Self-hostable by default, with no vendor lock-in. Your graphs, content and messages live in stores and files you control, not someone else's cloud.",
  },
  {
    title: "Open and familiar",
    body: "Standards you already know (Cypher, GraphQL, WHIP/WHEP, Git), not a walled garden. Import your existing data and keep your existing tools.",
  },
  {
    title: "Built to be understood",
    body: "Batteries included, but never a black box. Human-readable storage, typed protocols and inspectable history you can reason about end to end.",
  },
];
