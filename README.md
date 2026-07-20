# Devforge — marketing website

The marketing site for **Devforge Pty Ltd** and its product family: **Anvil DB**,
**Aegis**, **Foundry** and **Stencil**.

Built with **React Router 8** in framework mode (SSR) — a multi-route content site,
**not** a single-page app. Every page is its own server-rendered document with its
own loader/meta and code-split bundle.

## Stack

| Concern      | Choice                                              |
| ------------ | --------------------------------------------------- |
| Framework    | React Router 8 (framework mode, SSR)                |
| Routing      | `remix-flat-routes` via the routes-option-adapter   |
| Animation    | `framer-motion` + hand-authored CSS keyframes       |
| Styling      | Tailwind CSS v4 (`@tailwindcss/vite`)               |
| Fonts        | Geist / Geist Mono, self-hosted via `@fontsource`   |
| Icons        | `lucide-react` (+ inline brand glyphs)              |
| Language     | TypeScript (strict)                                 |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5273
```

> React Router 8 prefers Node ≥ 22.22. Older 22.x prints a warning but builds/serves fine.

## Scripts

```bash
npm run dev         # dev server (HMR)
npm run build       # production build (client + server bundles)
npm run start       # serve the production build
npm run typecheck   # react-router typegen && tsc
```

## Routes

Routing is file-based (`app/routes/`, resolved by `remix-flat-routes`):

| File                         | URL                     |
| ---------------------------- | ----------------------- |
| `_index.tsx`                 | `/`                     |
| `products._index.tsx`        | `/products`             |
| `products.anvil-db.tsx`      | `/products/anvil-db`    |
| `products.aegis.tsx`         | `/products/aegis`       |
| `products.foundry.tsx`       | `/products/foundry`     |
| `products.stencil.tsx`       | `/products/stencil`     |
| `company.tsx`                | `/company`              |
| `contact.tsx`                | `/contact` (+ `action`) |
| `$.tsx`                      | catch-all 404           |

## Architecture

- **`app/data/products.ts`** — the single product catalogue that drives the home
  constellation, the `/products` grid and every product page. Product routes are
  thin: they read from this catalogue and render the shared `ProductPage` template.
- **`app/data/site.ts`** — company details, nav and footer links.
- **`app/components/forge-constellation.tsx`** — the animated home hero: products
  orbit a molten core on a `requestAnimationFrame` clock, each node a real `<Link>`
  (so it works and is crawlable without JS). Adapted from a constellation-nav
  experiment and re-themed for the forge.
- **`app/components/ember-field.tsx`** — the reusable ambient backdrop (rising
  embers, sparks, panning grid, glow). Positions are derived deterministically from
  the index so server and client render identically — no hydration mismatch.
- **`app/components/reveal.tsx`** — framer-motion scroll-reveal wrappers.
- **`app/app.css`** — Tailwind theme tokens, the forge palette and all keyframes.

### Design language

A "forge-punk" fusion: dark iron backgrounds, molten-metal accents (gold → orange →
red), HUD framing, and a rising-ember particle field. Each product carries its own
accent — Anvil `#4f8fea`, Aegis `#2dd4bf`, Foundry `#fb923c`, Stencil `#d946ef`.

The whole UI honours `prefers-reduced-motion` (ambient loops freeze).

## Notes

- The contact form validates **server-side** in a React Router `action`, so it works
  with or without client JavaScript. Wire the send step (Resend / webhook / queue)
  where the `TODO` comment sits in `app/routes/contact.tsx`.
- Product feature copy is drawn from each product's own repo/README.
- **Meta/SEO:** every route builds its tags with `pageMeta()` (`app/lib/meta.ts`).
  React Router renders only the leaf route's `meta` (child replaces parent — no
  merge), so the shared helper emits the full Open Graph / Twitter / canonical /
  JSON-LD set per page. The social card is `public/og.png` (1200×630).
- `© 2026 Devforge Pty Ltd.`
