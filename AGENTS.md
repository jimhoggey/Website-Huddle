# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

Huddle — a marketing landing page for a youth management app built for Friday
night youth groups. Built with TanStack Start, prerendered to static HTML, and
deployed on Cloudflare Pages.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5.7 (strict mode) |
| Forms | Formspree (`@formspree/react`) |
| Deployment | Cloudflare Pages |

## Directory Structure

```
├── public
│   ├── _headers          # Cloudflare Pages response headers (security + asset caching)
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src
│   ├── routes
│   │   ├── __root.tsx    # Root document: head metadata, JSON-LD, <html> shell
│   │   └── index.tsx     # The entire landing page + early-access form
│   ├── router.tsx        # TanStack Router setup from the generated routeTree
│   └── styles.css        # Global styles, animations, CSS custom properties
├── AGENTS.md             # This document
├── README.md
├── package.json
├── tsconfig.json         # ES2022, strict, @/* path alias for src/*
├── vite.config.ts        # TanStack Start (prerender enabled), React, Tailwind
└── wrangler.toml         # Cloudflare Pages project config
```

## Key Concepts

### Static prerendering

`vite build` renders every route to static HTML in `dist/client`. Cloudflare
Pages serves that directory directly — there is **no** server runtime, Worker,
or Pages Function. Anything needing a server would have to be added
deliberately (a `functions/` directory would turn on Pages Functions).

This is why full page content appears in `dist/client/index.html`: SEO and
social crawlers get real markup, not an empty SPA shell.

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` — Root layout wrapping all pages
- `index.tsx` — Route for `/`

`src/routeTree.gen.ts` is generated at build/dev time and is gitignored.

### The early-access form

`EarlyAccessForm` in `src/routes/index.tsx` posts straight to Formspree from the
browser using `useForm(FORMSPREE_FORM_ID)` from `@formspree/react`.

- The form ID is a public identifier — no secret, no env var, nothing to
  configure in Cloudflare.
- `state.submitting` / `state.succeeded` / `state.errors` drive the button, the
  success panel, and the inline error line.
- A hidden `_gotcha` honeypot field is included; Formspree discards submissions
  that fill it in.
- The group-size range input submits as `group-size`; the email input must stay
  named `email` so Formspree uses it as the reply-to address.

Keep the existing visual design of this form (slider, counter, size label,
success state) intact when changing submission plumbing.

## Development Commands

```bash
npm run dev        # Vite dev server on port 3000
npm run build      # Production build + prerender into dist/client
npm run preview    # Serve the built site via Wrangler, as Cloudflare Pages will
npm run deploy     # Build and publish to Cloudflare Pages
npm run typecheck  # tsc --noEmit
```

## Deployment

Cloudflare Pages, connected to the GitHub repo.

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `dist/client` |
| Node version | 22 |

`main` publishes to production; other branches get preview deployments.

`public/robots.txt` and `public/sitemap.xml` hardcode the site origin — update
both when a custom domain is attached.

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes, with inline `style` objects for one-off values
  (brand purple `#7C3AED`, shadows, transforms)
- Scroll-reveal animation classes (`.reveal`, `.reveal-scale`, `.reveal-left`,
  `.reveal-right`, `.divider-animated`, `.story-line`) are wired up by the
  `useReveal` IntersectionObserver hook in `index.tsx`

### TypeScript
- Strict mode, `noUnusedLocals` and `noUnusedParameters` are on
- Import paths use the `@/` alias
- Type-only imports use the `type` keyword

### State Management
- React hooks for local state; no global store in use
