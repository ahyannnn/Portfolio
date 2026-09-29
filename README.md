# Developer Portfolio

Minimal, professional portfolio for an IT student — built with Next.js App Router,
TypeScript, Tailwind CSS v4, Motion, and Lucide icons. Deploys to Cloudflare via
`@opennextjs/cloudflare`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content — where to edit

All personal content lives in data files (no hardcoded duplication):

- `lib/site.ts` — name, email, GitHub, LinkedIn, university, resume path, nav
- `data/projects.ts` — project cards + `/projects/[slug]` detail pages
- `data/skills.ts` — skill categories (only list what you can evidence)
- `data/experience.ts` — experience timeline + education

Placeholders use `[YOUR ...]` / `TODO:` — search the repo for `TODO` or
`[YOUR` to find everything to fill in before launch.

Replace `public/resume.pdf` with your real resume (same filename keeps the
Hero CTA working). Add project screenshots under `public/projects/` and set
`image: "/projects/xxx.png"` in `data/projects.ts`.

## Scripts

- `npm run dev` — local dev
- `npm run build` — production Next.js build
- `npm run preview` — Cloudflare OpenNext build + local preview
- `npm run deploy` — deploy to Cloudflare Workers/Pages
- `npm run cf-typegen` — regenerate `cloudflare-env.d.ts`
- `npx tsc --noEmit` / `npx eslint app components lib data types` — checks

## Deploy (Cloudflare)

1. `npm run preview` to verify the OpenNext bundle (`.open-next/`).
2. `npm run deploy` (requires `wrangler login`).
3. Add your custom domain later in the Cloudflare dashboard — no code change
   needed. Update `site.url` in `lib/site.ts` once the domain is live so
   OG metadata, `robots.ts`, and `sitemap.ts` use the right origin.

## Conventions

- TypeScript strict, no `any` in app source.
- Server Components by default; `"use client"` only for nav, theme, forms, motion.
- One accent color (`--accent`) with intentional light/dark tokens in
  `app/globals.css`. Theme defaults to system preference via `next-themes`.
- Motion is subtle and disabled under `prefers-reduced-motion`.
