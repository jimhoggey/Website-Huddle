# Huddle

**The youth management app built for Friday night youth groups.**

Huddle helps youth leaders manage run sheets, rosters, communication, and safety — so leaders lead with clarity and youth feel like they belong.

## About

Huddle is an all-in-one youth management platform designed for Friday night youth groups. It provides tools for:

- **Run sheets** — Plan and organize your youth group sessions
- **Rosters** — Manage leader and volunteer schedules
- **Attendance** — Track who's coming each week
- **Communication** — Keep leaders and families in the loop
- **Safety** — Built-in tools to support duty of care

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) |
| Frontend | React 19, TanStack Router |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript (strict mode) |
| Forms | [Formspree](https://formspree.io/) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com/) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22+

### Installation

```bash
git clone https://github.com/jimhoggey/Huddle-Website.git
cd Website-Huddle

npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Vite dev server with HMR on port 3000 |
| `npm run build` | Production build — prerenders every route into `dist/client` |
| `npm run preview` | Serve the built site locally through Wrangler, exactly as Cloudflare Pages will |
| `npm run deploy` | Build and publish to Cloudflare Pages from the CLI |
| `npm run typecheck` | TypeScript check, no emit |

## Deployment

The site is a **fully static** build. `npm run build` prerenders each route to
HTML in `dist/client`, which Cloudflare Pages serves straight from the edge —
there is no server runtime, no Worker, and no Pages Function to maintain.

### Cloudflare Pages build settings

Connect the GitHub repo in the Cloudflare dashboard (Workers & Pages → Create →
Pages → Connect to Git) and use:

| Setting | Value |
|---------|-------|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist/client` |
| Node version | `22` (set `NODE_VERSION=22` if the default is older) |

Pushes to `main` publish to production; every other branch gets a preview
deployment. `wrangler.toml` carries the same output directory so CLI deploys
(`npm run deploy`) and local previews (`npm run preview`) stay in sync with it.

### Custom domain

`public/robots.txt` and `public/sitemap.xml` currently point at
`https://tryhuddle.pages.dev`. Update both to the production hostname once a
custom domain is attached in **Pages → Custom domains**.

## Forms

The early-access form posts directly to Formspree from the browser via
[`@formspree/react`](https://github.com/formspree/formspree-js). The form ID
lives in `src/routes/index.tsx` as `FORMSPREE_FORM_ID` — Formspree IDs are
public by design, so there is no secret to configure and nothing to add to the
Cloudflare environment.

Submissions land in the Formspree dashboard. A hidden `_gotcha` honeypot field
is included; Formspree silently discards anything that fills it in.

## Project Structure

```
src/
├── routes/         # File-based routing (TanStack Router)
│   ├── __root.tsx  # Root document, SEO metadata, JSON-LD
│   └── index.tsx   # Landing page + early-access form
├── router.tsx      # Router instance
└── styles.css      # Global styles and Tailwind config
public/
├── _headers        # Cloudflare Pages response headers
├── robots.txt
└── sitemap.xml
wrangler.toml       # Cloudflare Pages project configuration
```

## License

All rights reserved.
