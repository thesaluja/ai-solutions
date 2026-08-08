---
name: project-github-migration
description: Repo migrated from jupo-webtech/ai-solutions to thesaluja/ai-solutions on 2026-08-08
metadata:
  type: project
---

Repo was originally at `jupo-webtech/ai-solutions`. Migrated to `thesaluja/ai-solutions` on 2026-08-08.

**Why:** The Coolify GitHub App (`d1056zn6ik6zs4kzb51vcxwt`) is only installed on the `thesaluja` GitHub account. Deploying from `jupo-webtech` caused immediate deploy failures (4-10s, no logs) because Coolify could not clone the repo. All other repos on this Coolify instance (ERP, MCA, WooStoreAudit) are under `thesaluja`.

**How to apply:** All future pushes go to `thesaluja/ai-solutions`. `origin` remote is set to `https://github.com/thesaluja/ai-solutions.git`. Local branch is `master`, remote branch is `main` (pushed as `master:main`). Working branch going forward: `main` on remote, use `master` locally or rename to match.
