# CLAUDE.md

This file guides Claude Code when working in this repository.

## Build standard

Follow `WEBSITE_BUILD_FRAMEWORK.md` strictly for all work in this repo. It defines the production-quality bar (performance, security, accessibility, responsive design, SEO), the inspection-before-editing protocol, component and page rules, and the required final response format. Read it before making changes.

## Project overview

Aldin is a German-language website (career coaching: Bewerbungscoach, Lebenslauf-Erstellung) built with:

- Next.js 14 (App Router, `src/app/`)
- TypeScript
- Tailwind CSS
- Auth via `jose` + `bcryptjs` (see `src/lib/auth.ts`, `middleware.ts`)

## Structure

- `src/app/` — routes: home, `admin`, `api`, `bewerbungscoach`, `blog`, `lebenslauf-erstellen`, `produkte`
- `src/components/` — shared components (`Navbar`, `Footer`, `PublicLayout`, `AdminShell`, `WaButton`)
- `src/lib/` — `auth.ts`, `cities.ts`, `config.ts`, `db.ts`
- `scripts/seed.ts` — database seeding

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (also the primary verification step)
- `npm run seed` — seed the database
- `npm run typecheck` — TypeScript check (`tsc --noEmit`)
- `npm run lint` — ESLint (`next/core-web-vitals` + prettier config)
- `npm run format` / `npm run format:check` — Prettier (markdown excluded)

There is no `test` script. Verify changes with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Conventions

- Site content is in German; keep new user-facing copy in German.
- Respect the existing stack — do not add dependencies or migrate frameworks without being asked.
- Never commit secrets; use `.env.local` locally and keep `.env.example` updated when new variables are required.
