# Portfolio — Ginabeth Daroy

A personal portfolio site: hero, about, work history, project experience, skills,
and credentials, with a dark plum/rose theme and scroll-reveal animations.

## Tech stack

| Layer    | Choice                                                |
| -------- | ----------------------------------------------------- |
| Backend  | [AdonisJS 7](https://adonisjs.com)                    |
| Frontend | [Inertia](https://inertiajs.com) + Vue 3 + TypeScript |
| Build    | [Vite 7](https://vite.dev)                            |
| Database | SQLite (via `better-sqlite3`) + Lucid ORM             |
| Toasts   | `vue-sonner`                                          |

## Prerequisites

- **Node.js >= 24**
- npm

## Setup

```bash
npm install
cp .env.example .env
node ace generate:key      # writes APP_KEY into .env
node ace migration:run     # creates the SQLite tables (tmp/db.sqlite3)
node ace db:seed           # loads profile + skills content
```

## Running

```bash
npm run dev                # dev server with hot module replacement
```

It prints a local URL to open. For a production build:

```bash
npm run build          # compiles into build/
cd build
npm ci --omit=dev
node bin/server.js
```

## Where the content lives

The page mixes database-backed content with static arrays.

**Database (`profiles` + `skills` tables)** — name, title, about, email, location,
and the grouped skill list. These are populated by
[`database/seeders/portfolio_seeder.ts`](database/seeders/portfolio_seeder.ts).
To change them, edit the seeder and re-run:

```bash
node ace migration:fresh --seed   # drops all tables, re-migrates, re-seeds
```

**Static, in [`inertia/pages/home.vue`](inertia/pages/home.vue)** — edit the arrays
at the top of `<script setup>`:

- `experience` — work history timeline
- `projectExperience` — the project cards (generalized; see the confidentiality note)
- `credentials` — education and certifications
- `phone` — contact phone number

The contact form has no backend; it opens a pre-filled `mailto:` draft in the
visitor's email client.

## Project structure

```
app/
  controllers/        # admin CRUD (Profile, Projects, Skills) — see note below
  models/             # Lucid models: Profile, Project, Skill, User
  middleware/
database/
  migrations/
  seeders/portfolio_seeder.ts
inertia/
  css/app.css         # single global stylesheet (design tokens + components)
  composables/use_scroll_reveal.ts
  layouts/default.vue  # header, nav, footer
  pages/
    home.vue           # the portfolio page
    admin/dashboard.vue # content editor (currently unreachable — see note)
    errors/
start/routes.ts
```

## Note: authentication is disabled

Login / signup / logout have been removed from the UI and routes. The
`/admin` dashboard and its CRUD controllers still exist but sit behind auth
middleware, so `/admin` just redirects to `/`. `@adonisjs/auth`, the `User`
model, the `users` table, and the auth middleware are left in place so this can
be re-enabled later. Until then, content is edited via the seeder (above).

## Scripts

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Dev server with HMR                     |
| `npm run build`     | Production build into `build/`          |
| `npm start`         | Run the compiled server (from `build/`) |
| `npm test`          | Run the Japa test suite                 |
| `npm run lint`      | ESLint                                  |
| `npm run format`    | Prettier                                |
| `npm run typecheck` | `tsc` + `vue-tsc`                       |
