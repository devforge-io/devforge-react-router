# Devforge website

This repository is the **workspace** for the Devforge marketing site (https://devforge.io).
It contains no application code of its own. The site is made of two separate git
repositories that are cloned *into* this directory and ignored by this repo's git:

| Path         | Repository                          | What it is                                                                                 |
| ------------ | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `./stencil`  | `devforge-io/devforge-stencil`      | The CMS + web server. A fork of Stencil (`devforge-io/stencil`) with Devforge customisations. |
| `./content`  | `devforge-io/website-stencil`       | The site content: pages, components, assets and settings that Stencil reads from GitHub.     |

Stencil is a Git-backed CMS: the running app reads content from the **GitHub** copy of
`website-stencil` (branch `draft` for the admin UI, branch `main` for the public site),
not from the local `./content` folder. The local clone is there so content can be edited,
diffed and committed with normal tools. See `CLAUDE.md` for the editing and publishing
workflow.

## Prerequisites

- Git with SSH access to the `devforge-io` GitHub organisation.
- Node.js **22.x** (`stencil/.nvmrc` pins `22`; `nvm use` inside `./stencil` picks it up).
- Credentials for Stencil (ask Ben, or create your own per `stencil/README.md`):
  - a GitHub OAuth App (client id + secret) whose callback URL is `http://localhost:5174/auth/github/callback`
  - a fine-grained GitHub token with **Contents: read/write** on `devforge-io/website-stencil`
  - SMTP credentials for the contact form (optional for local work)

## Install

All commands are run from this directory (the workspace root).

### 1. Clone the workspace

```bash
git clone git@github.com:devforge-io/devforge-react-router.git devforge-website
cd devforge-website
```

### 2. Install `./stencil` (the app)

```bash
git clone git@github.com:devforge-io/devforge-stencil.git stencil
git -C stencil remote add upstream git@github.com:devforge-io/stencil.git
git -C stencil remote set-url --push upstream no_push   # never push to the original by accident
git -C stencil fetch upstream

cd stencil
nvm use            # Node 22
npm install
cp .env.example .env
cd ..
```

Fill in `stencil/.env`. The Devforge-specific values are:

```dotenv
GITHUB_OWNER=devforge-io
GITHUB_REPO=website-stencil
GITHUB_BRANCH=draft
GITHUB_PUBLISH_BRANCH=main
GITHUB_CONTENT_PATH=content
GITHUB_COMPONENT_PATH=components

GITHUB_TOKEN=<fine-grained token, Contents read/write on website-stencil>
GITHUB_OAUTH_CLIENT_ID=<OAuth App client id>
GITHUB_OAUTH_CLIENT_SECRET=<OAuth App client secret>
SESSION_SECRET=<any long random string>

# Contact form (optional locally)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
```

`GITHUB_TOKEN` is what lets anonymous visitors see the public site, and what the
admin UI uses to commit to `website-stencil`. Sign-in roles come from the user's
permission on `website-stencil` (admin, maintain, write).

### 3. Install `./content` (the site content)

```bash
git clone git@github.com:devforge-io/website-stencil.git content
git -C content checkout draft
```

Always work on **`draft`**. `main` is written only by Stencil's Publish action
(details in `CLAUDE.md`).

### 4. Run it

```bash
cd stencil
npm run dev        # http://localhost:5174
```

- `http://localhost:5174/` is the public site, served from `website-stencil@main`.
- `http://localhost:5174/content` is the admin UI (sign in with GitHub), served from `website-stencil@draft`.

Other scripts inside `./stencil`:

```bash
npm run typecheck  # react-router typegen && tsc
npm test           # node --test over app/**/*.test.ts
npm run build      # production build
npm start          # serve the production build
```

## Layout after install

```
.
├── README.md            this file
├── CLAUDE.md            working rules for content edits, publishing and fork updates
├── .gitignore           ignores ./stencil and ./content
├── stencil/             git repo: devforge-io/devforge-stencil  (remotes: origin, upstream)
└── content/             git repo: devforge-io/website-stencil    (branches: draft, main)
    ├── content/         *.page files, index.css, pages.json, assets/, files/
    ├── components/      reusable component JSON (inlined into pages)
    └── settings.json    site settings (name, url, OG image, body classes)
```

Each of the three directories (`.`, `./stencil`, `./content`) is its own git repository.
Run git with `-C stencil` or `-C content` (or `cd` first); running `git status` here
only shows the workspace files.
