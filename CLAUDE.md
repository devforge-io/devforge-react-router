# CLAUDE.md

Working rules for the Devforge website workspace. Read this before changing anything.

## 1. What lives where

This root repo holds **only** `README.md`, `CLAUDE.md` and `.gitignore`. The real work
happens in two nested, gitignored clones. Each is its own git repository with its own
remote, branches and history. `git status` at the root will never show their changes.

| Path        | Remote(s)                                                                      | Branch to work on                         |
| ----------- | ------------------------------------------------------------------------------ | ----------------------------------------- |
| `./content` | `origin` = `devforge-io/website-stencil`                                       | `draft` (always). `main` is publish-only. |
| `./stencil` | `origin` = `devforge-io/devforge-stencil` (our fork), `upstream` = `devforge-io/stencil` (original) | `main`                                    |

Always address them explicitly: `git -C content ...`, `git -C stencil ...`.

Style rule for everything written for Ben (copy, docs, commit messages): **no em dashes**.
Use a comma, colon, parentheses or a full stop instead.

Stencil reads content from **GitHub**, not from `./content` on disk. A local edit is
invisible to the running app (and to the live site) until it is pushed to `draft`, and
invisible to the public until it is **published** to `main`.

## 2. Editing content (`./content`)

### 2.1 The draft -> main rule

- `draft` is the working branch. Every edit, by hand or through the Stencil admin UI, lands here.
- `main` is the published branch. The public site, the JSON API and embeds serve from it.
- **`main` is only ever written by Stencil's Publish / Unpublish actions.** Publishing is
  a per-file copy: Stencil reads the file from `draft` and writes it to `main` through the
  GitHub API with a commit like `Publish <slug>` (plus `Publish asset <file>`, the compiled
  CSS for pages, and an index update). It is not a git merge.

Therefore, in `./content`:

- Do **not** `git merge draft` into `main`.
- Do **not** `git pull` / `git rebase` / `git cherry-pick` from `draft` onto `main`.
- Do **not** push directly to `main`, and do not fast-forward it.
- Do **not** resolve "draft is ahead of main" by syncing branches. That state is normal; it
  means there is unpublished work. Publish what is ready, leave the rest.

Why: a merge would publish every unfinished draft at once, skip the compiled CSS, asset
and index steps Stencil performs on publish, and bypass the role check (only Admin or
Moderator may publish). Stencil's "Unpublished changes" badge and `/content/:slug/history`
compare file blob SHAs between the two branches, so `main` must only contain what was
deliberately published.

### 2.2 Workflow for a content change

1. `git -C content checkout draft && git -C content pull` (make sure you are on `draft`).
2. Edit the files (see 2.3). Keep unrelated files byte-identical.
3. Commit on `draft` with a plain message describing the change.
4. Push `draft` when Ben asks (pushing makes the change visible in the admin UI at once).
5. **Publishing is Ben's job. Claude never publishes.** Ben opens the Stencil admin
   (`/content`), opens the page and clicks **Publish** / **Publish Changes**. Assets referenced
   by a page are published with it. When reporting a finished content change, say which
   pages need publishing and stop there.
6. To check what is live vs pending: `git -C content fetch && git -C content log --oneline
   origin/main -5` shows the `Publish <slug>` commits, and
   `git -C content diff origin/main origin/draft --stat` lists what is still unpublished.

### 2.3 Content file facts

- `content/<slug>.page` = YAML frontmatter (`title`, `description`, `ogImage`, `path`,
  `contentType: page`) followed by a JSON body. Routing is by the `path` field (`/` is the
  home page). Two shapes exist:
  - hand-generated pages: `{ "html", "css" }` only;
  - pages saved through the Stencil page builder (currently `index.page`): the full builder
    project `{ "version", "root", "canvasScripts", "canvasStyles", "html", "css" }`, pretty
    printed with 2-space indent. The exact bytes depend on who last wrote the file (Stencil
    writes `JSON.stringify(obj, null, 2)` after a blank line and keeps non-ASCII literal; a
    Python script may have used `\uXXXX` escapes), so before editing, find the
    `json.dumps(...)` settings that reproduce the current file byte for byte and assert on it;
    never assume. `root` is the node tree the builder edits; `html` is what the public site
    serves. **If a page has `root`, keep `root` and `html` in step**, or the
    next save in the builder regenerates `html` from the stale tree and drops your edit.
- `components/<slug>.json` = `{ meta: {slug, name, category, description, type: "static"},
  html, css, pages: [...] }`, pretty printed (2-space, `ensure_ascii=False`, no trailing
  newline). Components saved through the builder also carry `projectData`: a compact JSON
  string of `{version, root}` whose `root.children[0]` must equal the same component's subtree
  inside each page's `root`. Same rule: when `projectData` exists, update it alongside `html`.
  Node ids in a page tree must be unique; mint new ids with a fresh prefix (e.g.
  `pb-<something>-N`) rather than reusing neighbours' ids. Static components are **inlined
  verbatim** into every page that uses them, marked with `data-pb-component="<slug>"` on the
  root element. There is no runtime component registry.
- **One change, two files (sometimes four representations).** Editing a component means
  editing `components/<slug>.json` *and* the identical copy inside every `content/<page>.page`
  listed in its `pages[]` (the `site-header` and `site-footer` components are in all pages),
  and, where they exist, the component's `projectData` tree and the page's `root` subtree.
  For the `{html, css}`-only files edit by text splice on the JSON-escaped string so the rest
  stays byte-for-byte; for the builder-format files, parse, verify the round-trip reproduces
  the original bytes, edit, and re-dump with the same settings. Before committing, assert that
  the component html still appears exactly once in each page html.
- CSS has two homes and the **public site serves only the compiled file**:
  `content/<slug>.css` (exists for pages saved through the builder, currently `index.css`)
  replaces the page's `css` field at render time (`public-page.server.ts`), and is published
  with the page; the builder canvas, on the other hand, reads the page's `css` field. A builder
  save writes the same string to both. So when you change CSS by hand on a page that has a
  compiled file, change the `css` field **and** `content/<slug>.css` identically. Inside that
  CSS, everything above the `/* ===== Auto-generated by the page builder ... */` marker is the
  hand-written part the builder preserves; anything below it is regenerated and dropped on the
  next save, so new rules go above the marker. Pages without a compiled file serve their `css`
  field directly.
- **Styling rule: Tailwind first, always.** Every public page and the builder canvas load the
  Tailwind CDN (v3, arbitrary values and opacity modifiers work: `bg-white/[0.03]`,
  `focus:border-[#f5a524]/45`, `flex-[1_1_16rem]`). New or changed markup must be styled with
  utility classes, not new hand-written classes or inline `style` attributes. Only reach for
  the hand-written CSS block for things utilities cannot express (keyframes, the shared forge
  theme classes that already exist such as `.btn`, `.cn`, `.reveal`). The builder-authored
  `.btn-primary` gradient buttons carry inline styles; leave those as they are for
  consistency, but do not add new inline-styled elements.
- `content/pages.json`, `components/components.json`, `content/tutorial.json` are indexes
  used by the admin listings. Add a new page to `pages.json`; the public site discovers pages
  by scanning the content dir, not by this index.
- Assets live in `content/assets/` and are referenced as `/api/assets/<file>` (they only
  resolve through the running Stencil app). Uploads served at custom URLs live in
  `content/files/` with `content/files.json`.
- `settings.json` holds site name, URL, default OG image, body classes, locale.
- A page may not claim these URL prefixes (`RESERVED_PREFIXES` in
  `stencil/app/lib/file-uploads.server.ts`): `/content /api /embed /guide /login /logout
  /components /settings /articles /tutorial /files /.well-known /robots.txt /sitemap.xml
  /llms.txt`. Fork routes also shadow any CMS page at the same path (for example
  `/tools/website-audit` is a fork route while `/tools` itself is a CMS page).
- `.page` files are **static HTML + CSS only**. Anything needing a server action, a loader,
  a resource route or live React goes into the `./stencil` fork as a route (section 3.3).

## 3. The Stencil fork (`./stencil`)

### 3.1 What it is

`origin` (`devforge-io/devforge-stencil`) is a fork of the original Stencil
(`upstream` = `devforge-io/stencil`). The fork's `main` is upstream `main` plus a stack of
Devforge customisations on top. Local customisations so far:

- `/tools/website-audit` (audit engine under `app/lib/audit/`, UI under
  `app/components/tools/audit/`, routes under `app/routes/tools+/` including the PDF report
  and the OG proxy), with CSRF helpers `app/lib/csrf.server.ts` + `app/components/csrf-input.tsx`.
- Site chrome for fork routes: `app/lib/site-chrome.server.ts` (pulls the header/footer
  components out of the content repo).
- SEO/security: `robots.txt`, `sitemap.xml`, `llms.txt` routes, full social metadata and
  baseline security headers in `app/root.tsx` / `app/lib/public-page.server.ts`.
- Small edits to `app/lib/settings.server.ts` and `app/lib/file-uploads.server.ts`, and
  extra dependencies in `package.json` (`pdfkit`, `@types/pdfkit`).

See exactly what is custom at any time:

```bash
git -C stencil fetch upstream
git -C stencil log --oneline upstream/main..main        # our commits
git -C stencil diff --stat upstream/main main           # our files
```

### 3.2 Pulling updates from the original without losing the customisations

Use a **merge**, not a reset and not a force-push. A merge keeps our commits, keeps
`origin/main` fast-forwardable for anything deployed from it, and makes conflicts explicit.

```bash
cd stencil
git checkout main && git pull origin main        # start from the fork's current state
git fetch upstream
git log --oneline main..upstream/main            # what is new upstream (review it first)
git merge upstream/main                          # bring it in on top of our customisations
```

If there are conflicts:

- Our customisations win for files that only we touched (the audit tool, tools routes,
  csrf, site-chrome). Upstream wins for files we never changed.
- Shared files that need a real merge: `app/root.tsx`, `app/lib/public-page.server.ts`,
  `app/lib/settings.server.ts`, `app/lib/file-uploads.server.ts`, `package.json`. Keep both
  sides' intent; never drop a Devforge addition to make a conflict go away.
- `package-lock.json`: take upstream's version (`git checkout --theirs package-lock.json`),
  then run `npm install` so the fork's extra dependencies are re-added, and stage the result.

Then verify and push to the fork:

```bash
npm install
npm run typecheck && npm test && npm run build
git push origin main
```

Never:

- `git reset --hard upstream/main`, `git checkout upstream/main -- <file>` on a customised
  file, or `git push --force` to `origin/main`. All of these discard customisations.
- push to `upstream`. The push URL is set to `no_push` on purpose
  (`git -C stencil remote set-url --push upstream no_push`); leave it that way.
- commit `.env`, `build/`, `.react-router/`, or `node_modules/` (all gitignored).

To send a change back to the original Stencil, make it in a branch based on `upstream/main`
(or in the separate original checkout) and open a PR against `devforge-io/stencil`. Do not
push fork-only Devforge features upstream.

### 3.3 The feature-requests tool (`/tools/feature-requests`)

Fork-only tool, added 2026-08-24. Code: `app/lib/feature-requests/` (Anvil client,
session cookie, store, HTTP helpers, embed script), `app/components/tools/feature-requests/`,
routes under `app/routes/tools+/feature-requests+/`. Setup and operations are in the fork's
`FEATURE-REQUESTS.md`. Facts that are easy to get wrong:

- Data and accounts live in **Anvil DB** (`ANVIL_URL` + `ANVIL_SERVICE_KEY`, or admin
  user/password, in `.env`; never commit the key). People sign up and sign in through Anvil's
  own `/auth/*` endpoints; after that the app trusts its own signed `_fr_session` cookie.
- Anvil 0.1.0 quirks the code works around, do not "clean them up": query parameters only
  bind in MATCH map patterns, so values are inlined via `lit()`/`mapLit()`/`setLit()` and ids
  pass `ident()`; list properties do not round-trip (origins are a space-joined string);
  `CREATE … RETURN` returns a summary row; `MATCH … CREATE` chains do not create; relationship
  traversal is unreliable, so the model is flat (`projectId`/`requestId` properties);
  `ORDER BY`/`LIMIT` sort is unreliable, so sorting happens in the store; `\uXXXX` escapes
  are not decoded; and an escaped quote followed by `//` inside a literal is read as a comment
  (`lit()` switches delimiters or inserts a zero-width space).
- `/auth/register` needs an admin-role principal. If the service key is not admin, password
  sign-up reports that and the emailed-code path (`/auth/otp/*`) is the way in; Anvil must have
  email configured and `allow_otp_registration` on for new accounts that way.
- Public JSON API under `/tools/feature-requests/api/*` is CORS-enabled: reads are open,
  writes honour the project's origin allow-list, honeypot field `website`, in-memory rate
  limits. `embed.js` is served from a string (`embed-script.ts`), cached at the edge.
- Fork routes that embed CMS chrome must render `<TailwindCdn />` (the header/footer are
  styled with utilities the fork's own Tailwind build does not generate).
- Route **components** must never import from a `*.server` module, not even a constant or a
  type used as a value cast: React Router strips server code from `loader`/`action` only, and
  Vercel's build fails with "Server-only module referenced by client". Put shared constants in
  a plain module (for example `feature-requests/shared.ts`) and use `import type` for types.
  Run `npm run build` (not just `typecheck`) before pushing the fork; it reproduces the error.

### 3.4 Writing a route in the fork

Use `app/routes/contact/route.tsx` (content supplies the design, the fork supplies the
action) or `app/routes/tools+/website-audit/route.tsx` (fully hand-written public page with
site chrome) as the template. Known traps:

1. Stencil's `<body>` is light-themed and `App()` is a bare `<Outlet />`; a Devforge-looking
   page must paint its own dark shell and pull the header/footer via `site-chrome.server.ts`.
2. The Tailwind `@theme` has no forge/molten/ember tokens (only `brand-*`); use literal hex
   values in fork-local components, do not edit the shared `app.css` for one route.
3. `Layout` hardcodes `<title>Stencil CMS</title>` before `<Meta />`, so a route's `meta()`
   title renders as a second `<title>`.
4. There is no global CSRF plumbing: mint the token in the route's own loader and pass it
   down, as the audit tool does.

Routing is `remix-flat-routes`: `route.tsx` per folder, `+` folders are path segments,
`[.]` escapes dots (`robots[.]txt`), `$` is a param, `_` prefix is a pathless layout.

## 4. Before you finish any task

- Content change: edited component JSON **and** every page copy (and builder trees);
  committed on `draft`; pushed if asked; listed the pages Ben needs to publish. Never
  published anything yourself.
- Fork change: `npm run typecheck` and `npm test` pass in `./stencil`; commit on `main`;
  push to `origin` only when asked; never to `upstream`.
- Root repo: only `README.md`, `CLAUDE.md`, `.gitignore` (and `.claude/`) belong here.
