#!/usr/bin/env bash
# Install git hooks for this repo. Run once per clone.
set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOK="$REPO_ROOT/.git/hooks/pre-push"

cat > "$HOOK" << 'EOF'
#!/usr/bin/env bash
# Pre-push hook: stamp SOURCE_COMMIT in Coolify before Coolify's webhook fires.
REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CREDS="$REPO_ROOT/.coolify-creds.local"
[ -f "$CREDS" ] || exit 0

# Parse key=value lines
while IFS='=' read -r key val; do
  [[ "$key" =~ ^# ]] && continue
  [[ -z "$key" ]] && continue
  export "${key// /}=${val// /}"
done < "$CREDS"

[ -z "$COOLIFY_API_TOKEN" ] && exit 0
[ -z "$COOLIFY_APPLICATION_UUID" ] && exit 0
[ -z "$COOLIFY_BASE_URL" ] && exit 0

SHA=$(git rev-parse HEAD 2>/dev/null) || exit 0

curl -s -X PATCH \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  "$COOLIFY_BASE_URL/api/v1/applications/$COOLIFY_APPLICATION_UUID/envs" \
  -d "{\"key\":\"SOURCE_COMMIT\",\"value\":\"$SHA\",\"is_buildtime\":true,\"is_runtime\":false}" \
  > /dev/null 2>&1 || true  # best-effort, never block the push

exit 0
EOF

chmod +x "$HOOK"
echo "Installed pre-push hook at $HOOK"
