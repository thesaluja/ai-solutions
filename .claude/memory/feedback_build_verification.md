---
name: feedback-build-verification
description: npm run build must pass locally before pushing - tsc alone is not sufficient
metadata:
  type: feedback
---

Run `npm run build` locally before any push. `tsc --noEmit` is necessary but not sufficient - Next.js enforces constraints tsc cannot catch (server/client boundary violations, edge runtime, etc.).

**Why:** Universal rule from global CLAUDE.md. Next.js build catches things tsc misses.

**How to apply:** After any change to `app/` pages, layout, components, or server actions - run `npm run build` and confirm it passes before committing. This is the only deploy-equivalent pre-push check.
