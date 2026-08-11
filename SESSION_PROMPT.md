# Session Prompt - Ai Solutions

## Read First

1. `AGENTS.md` - project overview and invariants
2. `CLAUDE.md` - Claude Code specific rules
3. `.claude/MEMORY.md` - behavioral feedback and project state

## Key Facts

- **Repo**: `thesaluja/ai-solutions` (master branch)
- **Live at**: `https://aisolutions.in`
- **Coolify UUID**: `pqm7a8asdjzvxa2ev785r3jn`
- **Stack**: Next.js 15 + R3F + Framer Motion, no DB, no auth
- **Install**: always `npm install --legacy-peer-deps`
- **Pre-push**: `npm run build` must pass

## Verify Deploy

```bash
curl https://aisolutions.in/api/health
# {"status":"ok","commitSha":"<7-char sha>"}
```

## Do Not Read

- `.claude/` session state files (auto-managed)
