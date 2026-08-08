---
name: project-overview
description: Ai Solutions website - stack, deploy config, Coolify UUIDs, GitHub repo
metadata:
  type: project
---

Marketing website for Ai Solutions at aisolutions.in. Static/SSR, no database, no auth.

**Stack**: Next.js 15 App Router + TypeScript + TailwindCSS + Framer Motion + React Three Fiber + shadcn/ui
**GitHub**: `thesaluja/ai-solutions` (main branch) - migrated from `jupo-webtech/ai-solutions` on 2026-08-08
**Coolify app UUID**: `pqm7a8asdjzvxa2ev785r3jn`
**Coolify project UUID**: `f6v392fjsr34ebfj447d19jb`
**Coolify environment UUID**: `up2ocekqx8uceygdl3yh3qpw`
**Server UUID**: `u11zk2bosntictmsfh6offxb` (beta.myvps.in, EC2 3.7.234.159)
**Domain**: `aisolutions.in` (DNS -> 3.7.234.159, SSL via Let's Encrypt / Traefik)
**Health check**: `https://aisolutions.in/api/health`
**Build pack**: Docker Compose (`docker-compose.coolify.yml`), port 3000
**Install**: always `npm install --legacy-peer-deps` (R3F peer dep conflicts)

**Why:** [[project-github-migration]]
