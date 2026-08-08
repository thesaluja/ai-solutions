# Ai Solutions - Developer Guidelines

## Code Navigation

On this repo jcodemunch is not indexed. Use targeted `Grep` for symbol search. Use `Read` only when about to edit a specific file.

## Session Cost Rules

- Restart session after every git push.
- Headroom is BLOCKING: any tool output >4000 chars - call `mcp__headroom__headroom_compress` immediately.
- No Opus unless user types `/model opus`.

## Project Overview

Marketing website for Ai Solutions at `aisolutions.in`. Static/SSR content only - no database, no auth, no backend services.

**Stack**: Next.js 15 (App Router) + TypeScript + TailwindCSS + Framer Motion + React Three Fiber + shadcn/ui
**GitHub**: `thesaluja/ai-solutions` (main branch)
**Coolify app UUID**: `pqm7a8asdjzvxa2ev785r3jn`
**Health check**: `https://aisolutions.in/api/health`

## Build Commands

```bash
npm install --legacy-peer-deps   # install (legacy needed for R3F peer deps)
npm run dev                       # local dev on :3000
npm run build                     # production build (must pass before push)
npm run typecheck                 # tsc --noEmit
npm start                         # start production server
```

## Architecture

```
src/
├── app/              # Next.js App Router pages
│   ├── api/health/   # Health check endpoint
│   ├── layout.tsx    # Root layout + metadata
│   ├── page.tsx      # Home page (all sections)
│   ├── loading.tsx   # Loading screen
│   ├── not-found.tsx # 404 page
│   ├── robots.ts     # robots.txt
│   └── sitemap.ts    # sitemap.xml
├── components/
│   ├── motion/       # Reusable animation primitives
│   ├── ui/           # Base UI components (shadcn/ui)
│   ├── layout/       # Nav, Footer, Command Palette
│   ├── sections/     # Page sections (14 sections)
│   └── three/        # Three.js / R3F scenes (hero)
├── hooks/            # Custom React hooks
├── lib/              # Utilities, constants, metadata
└── types/            # TypeScript types
```

No database, no auth, no API routes other than `/api/health`.

## Deploy

Push to `main` on `thesaluja/ai-solutions` - Coolify webhook auto-triggers a redeploy.

Verify: `curl https://aisolutions.in/api/health` should return `{"status":"ok","commitSha":"<sha>"}`.

Build pack: Docker Compose pointing to `docker-compose.coolify.yml`. Port 3000.

## End-of-Task Checklist

1. `npm run build` must pass locally before pushing.
2. `git status` - check ` D` lines, confirm each deletion.
3. Stage explicit file paths. Never stage `.env` / `.claude/` / secrets.
4. Commit: `feat/fix/chore/refactor(scope): description`. No AI attribution.
5. Push to `main`. Verify `/api/health` returns updated `commitSha` within ~3 min.
6. Start a fresh session after pushing.

## Style

- No em dashes (`-`, `,`, or parens instead).
- Match existing Tailwind + component patterns.
- No AI co-author trailers in commits.
- `npm install --legacy-peer-deps` always (peer dep conflicts with R3F).
