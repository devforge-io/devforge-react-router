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
  links: { label: string; href: string; kind: "primary" | "ghost" }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "anvil-db",
    key: "anvil",
    name: "Anvil DB",
    wordmark: "Anvil",
    icon: "Waypoints",
    accent: "#4f8fea",
    glow: "#7babf0",
    status: "Public Alpha",
    language: "Rust",
    forgeNote: "The anvil — where connected data is shaped.",
    eyebrow: "GRAPH DATABASE",
    tagline: "The graph database forged for performance.",
    subtitle:
      "A Rust-powered graph database with a native Cypher engine, ACID transactions, an auto-generated GraphQL API, and built-in graph algorithms — engineered for speed, safety, and scale.",
    blurb:
      "Rust graph database with Cypher, ACID, GraphQL and built-in algorithms — batteries included, in a single binary.",
    overview:
      "Building connected-data applications normally means stitching together a graph engine, a document store, a GraphQL layer, an auth service, file storage and an admin UI. Anvil collapses all of it into one memory-safe Rust binary with no sidecars — so you focus on your data, not your infrastructure. It speaks Cypher and GraphQL, connects through native drivers in four languages, and imports Neo4j dumps. No JVM. No garbage-collection pauses.",
    highlights: [
      "No JVM, no GC pauses — pure Rust",
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
          "A browser UI with a Cypher editor, force-directed graph visualization, a schema browser, monitoring dashboard and RLS policy manager — included.",
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
    slug: "aegis",
    key: "aegis",
    name: "Aegis",
    wordmark: "Aegis",
    icon: "ShieldCheck",
    accent: "#2dd4bf",
    glow: "#5eead4",
    status: "v0.1 · Early",
    language: "Rust",
    forgeNote: "The shield — one guarded door for every request.",
    eyebrow: "EGRESS PROXY",
    tagline: "One controlled door for all your outbound traffic.",
    subtitle:
      "A minimal, header-driven HTTP forwarding proxy written in Rust. Put the destination in an X-Target-Url header; Aegis authenticates, allowlists, terminates TLS and streams the response back — from a single binary.",
    blurb:
      "A minimal, header-driven HTTP forwarding proxy in Rust — one authenticated, allowlisted, TLS-terminating egress point.",
    overview:
      "Applications that call external APIs need a controlled, observable egress point — to centralize outbound traffic, enforce which upstreams are reachable, authenticate who may use the door, terminate and rotate TLS, and get consistent request logging. Aegis does exactly that and nothing more: no route configuration, no service mesh, no heavyweight gateway. Each request carries its target in one header; the proxy forwards the method, headers and body, and streams the response back verbatim.",
    highlights: [
      "One header: X-Target-Url — no route config",
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
          "Watches cert and key files and swaps certificates live on change — no restart, no signal. Certbot, acme.sh and Kubernetes mounted secrets just work.",
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
          "One tracing line per request and response, with sensitive headers — Authorization, Cookie, Proxy-Authorization — automatically redacted.",
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
    status: "v0.1 · In development",
    language: "Rust",
    forgeNote: "The foundry — where a team is cast together.",
    eyebrow: "TEAM CHAT & VIDEO",
    tagline: "Your team chat, in your Git repo.",
    subtitle:
      "A self-hosted, Slack-like team chat and video platform built in Rust — running on its own in-memory graph engine, with Git as the durable store. No database. No cloud lock-in.",
    blurb:
      "Self-hosted, Slack-like chat and video in Rust. An in-memory graph runtime with Git as the durable store — no database.",
    overview:
      "Foundry gives teams Slack-style chat and calls without their conversations, files and identities living in someone else's cloud. It runs on its own in-memory property-graph engine as the runtime source of truth, uses the filesystem for instant crash-proof durability, and commits everything to Git for offsite backup and restore-by-clone. It is event-sourced end to end, so live state and recovered state are identical by construction — you can literally git log your history.",
    highlights: [
      "Event-sourced: live state == recovered state",
      "git log your entire message history",
      "Its own pure-Rust SFU — no third-party media service",
      "Native Tauri desktop client",
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
        title: "Built-in video & screen sharing",
        description:
          "Foundry ships its own pure-Rust SFU embedded in the server binary, speaking the IETF WISH standard (WHIP to publish, WHEP to subscribe). Anyone can share their screen, several at once.",
      },
      {
        icon: "FolderGit2",
        title: "Git-backed backup & restore",
        description:
          "Instance-wide snapshots are committed and pushed to a GitHub remote. A fresh boot with no local data restores the whole instance by cloning the remote.",
      },
      {
        icon: "Lock",
        title: "Channel access control",
        description:
          "Restrict channels by role, by named groups or by explicit membership — visible-but-locked or fully invisible, with request-to-join approval. All enforced server-side.",
      },
      {
        icon: "KeyRound",
        title: "Real accounts & security",
        description:
          "Register and log in with Argon2id-hashed passwords (only the PHC hash is stored) and stateless HMAC-signed session tokens — no server-side session store.",
      },
      {
        icon: "Boxes",
        title: "Content-addressed attachments",
        description:
          "Uploads are stored once per unique file; images render inline, everything else as downloads — all backed up and restored alongside your messages.",
      },
    ],
    code: [
      {
        label: "Run it",
        lang: "bash",
        code: `# server on http://127.0.0.1:8080
cargo run -p foundry-server

# desktop app
cd client && pnpm install && pnpm tauri dev`,
      },
      {
        label: "It's just Git",
        lang: "bash",
        code: `# every message is a commit-backed event
git -C data log

# inspect any point in history
git -C data show`,
      },
      {
        label: "Typed protocol",
        lang: "rust",
        code: `pub enum ClientMsg {
    Register     { username: String, password: String },
    Login        { username: String, password: String },
    SendMessage  { channel_id: String, text: String },
    CreateOrg    { name: String },
    CreateChannel{ org_id: String, name: String },
    // call_start / call_join / call_publish, admin, access control ...
}`,
      },
    ],
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/devforge-io/foundry",
        kind: "primary",
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
    forgeNote: "The stencil — patterns you press onto the web.",
    eyebrow: "GIT-BACKED CMS",
    tagline: "Author content and design layouts — stored as files in Git.",
    subtitle:
      "A headless CMS with a visual page builder bolted on. Write Markdown, articles and wiki markup, or drag-and-drop pages and per-visitor components — all committed to your GitHub repo, versioned, and served or embedded anywhere. No database.",
    blurb:
      "Git-backed CMS and visual page builder. Content is human-readable files in your repo; every save is a commit. No database.",
    overview:
      "Traditional CMSes hide your content behind a database and split 'headless content' from 'visual layout'. Stencil does neither. Content lives as plain, human-readable files in your GitHub repository — Markdown, articles, wiki markup and drag-and-drop pages — and every save is a real commit with a draft-to-publish workflow, full history and side-by-side diffs. Editors get a rich visual builder and WYSIWYG editor; developers keep Git as the publishing pipeline and per-visitor personalization resolved on the server.",
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
          "Drag-and-drop blocks, a layers tree, live Tailwind class editing and a responsive canvas — outputting clean, self-hosted HTML with no build step.",
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
          "Components that render a different branch per visitor based on auth, geo, time, device, query params or A/B bucket — resolved server-side, edited in a visual flow diagram.",
      },
      {
        icon: "Layers",
        title: "Reusable components",
        description:
          "Build a fragment once — nav, footer, CTA — and drop it into any page. Edits propagate everywhere it is used.",
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
          "An edge-cached public site, a CORS-enabled read-only JSON API and template-free auto-resizing iframe embeds — serve or embed your content anywhere.",
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
    body: "Rust for the performance-critical engines and daemons — no JVM, no garbage-collection pauses. React and React Native for the apps and clients. Fast where it counts, familiar everywhere else.",
  },
  {
    title: "Own your data",
    body: "Self-hostable by default, with no vendor lock-in. Your graphs, content and messages live in stores and files you control — not someone else's cloud.",
  },
  {
    title: "Open and familiar",
    body: "Standards you already know — Cypher, GraphQL, WHIP/WHEP, Git — not a walled garden. Import your existing data and keep your existing tools.",
  },
  {
    title: "Built to be understood",
    body: "Batteries included, but never a black box. Human-readable storage, typed protocols and inspectable history you can reason about end to end.",
  },
];
