# Ai Solutions - Agent Guidelines

Entry point for all AI coding agents (Claude Code, Codex, Devin, Gemini, Copilot).

## What This Project Is

Marketing website for Ai Solutions at `aisolutions.in`. Static content, no database, no auth. Built with Next.js 15 App Router + React Three Fiber hero + Framer Motion animations + 14 page sections.

## Before You Start

- Read `CLAUDE.md` end-to-end (Claude Code).
- Read `.claude/MEMORY.md` for behavioral feedback and project state.
- No database schema, no auth system, no API beyond `/api/health`.

## Architectural Invariants

- **No DB, no auth** - purely a marketing/content site.
- **`npm install --legacy-peer-deps`** always - R3F has peer dep conflicts.
- **`npm run build` must pass** before any push.
- **Port 3000** - never change.

## Project Layout

```
src/app/          # Pages and API route
src/components/   # motion/, ui/, layout/, sections/, three/
src/hooks/        # Custom hooks
src/lib/          # Utils, constants, metadata
src/types/        # TS types
```

Key files:
- `src/app/page.tsx` - main page, imports all 14 section components
- `src/app/api/health/route.ts` - health check
- `src/components/three/` - R3F hero scene
- `docker-compose.coolify.yml` - Coolify deployment config
- `Dockerfile` - multi-stage Node 22 Alpine build

## Deployment

- GitHub: `thesaluja/ai-solutions` (main branch)
- Coolify app UUID: `pqm7a8asdjzvxa2ev785r3jn`
- Domain: `aisolutions.in`
- Auto-deploys on push to `main` via GitHub App webhook.
- Verify: `curl https://aisolutions.in/api/health`

## Commit & Push

Format: `feat/fix/chore/refactor(scope): description`

No AI co-author trailers. No em dashes. Commit and push to `main` after every verified change.

## Cross-Repo Coolify Reference

All repos deploy to `beta.myvps.in`. If hitting a Docker/Coolify issue, check sibling repos:
- `e:/Work/Git/ERP` - pnpm + Next.js 16 + Prisma + multi-stage Docker, most mature deploy config
- `e:/Work/Git/MCA` - npm + Next.js + Playwright base image, SOURCE_COMMIT pattern
- `e:/Work/Git/WooStoreAudit` - monorepo, separate web/api/worker containers

Full Coolify playbook: `C:\Users\saluj\.claude\coolify-patterns.md`
