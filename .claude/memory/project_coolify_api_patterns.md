---
name: project-coolify-api-patterns
description: Coolify API quirks discovered while creating and configuring this app
metadata:
  type: project
---

Lessons from creating `pqm7a8asdjzvxa2ev785r3jn` on 2026-08-08.

**Why:** The standard `POST /api/v1/applications` returns 404 for GitHub App-backed apps. Required trial-and-error to find the right endpoints.

**How to apply:** Use these patterns for any future Coolify app creation or config on this server.

## Correct endpoint for GitHub App repos
`POST /api/v1/applications/private-github-app` - not `/api/v1/applications`.
Fields: `environment_uuid`, `git_source_uuid` (GitHub App UUID), `git_repository`, `git_branch`, `build_pack`, `docker_compose_location`, `ports_exposes`, `project_uuid`, `server_uuid`, `destination_uuid`.

## PATCH returns `{"uuid": "..."}` only
The PATCH endpoint returns just the UUID, not the full updated object. Do a GET to verify changes.

## docker_compose_domains
- Must be set as array: `[{name: "app", domain: "https://..."}]`
- Requires `docker_compose_raw` to be populated (happens after first successful deploy)
- Setting it before first deploy fails with "Reload the compose file from the git repository first"
- After a successful deploy, PATCH with the array and redeploy to regenerate Traefik labels with the correct domain + port

## ports_exposes defaults to 80
When creating via `private-github-app` endpoint, `ports_exposes` defaults to `80` regardless of what you pass. Must PATCH to `3000` after creation.

## source_type stays GithubApp
Even when creating via `POST /api/v1/applications/public`, `source_type` stays `App\Models\GithubApp`. The "public" endpoint doesn't change auth type - use the GitHub App endpoint and ensure the App is installed on the target org.

## Environment IDs
The "Ai Solutions" project has `environment_id: 8` (UUID `up2ocekqx8uceygdl3yh3qpw`). ERP uses `environment_id: 7`. These differ - always use the correct project's environment UUID.
