---
name: feedback-commit-style
description: Commit format and push behavior for this repo
metadata:
  type: feedback
---

Format: `feat/fix/chore/refactor(scope): description`. No trailing blank line, no Co-Authored-By, no AI attribution.

**Why:** Consistent with all other repos in this workspace (ERP, MCA, WooStoreAudit). Universal rule from global CLAUDE.md.

**How to apply:** After a coding change is completed and verified, commit and push to `main` by default. Don't stop at "implemented locally" unless the user says to hold.
