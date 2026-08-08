# coolify-create-app.ps1
#
# Creates the ai-solutions application in Coolify via the REST API.
# Based on the ERP/MCA pattern: POST /api/v1/applications with docker-compose settings.
#
# Usage: pwsh scripts/coolify-create-app.ps1

$ErrorActionPreference = 'Stop'

function Read-Creds([string]$path) {
    $c = @{}
    foreach ($line in Get-Content $path) {
        $t = $line.Trim()
        if (-not $t -or $t.StartsWith('#')) { continue }
        $eq = $t.IndexOf('=')
        if ($eq -lt 1) { continue }
        $c[$t.Substring(0, $eq).Trim()] = $t.Substring($eq + 1).Trim()
    }
    return $c
}

$creds = Read-Creds '.coolify-creds.local'
$base  = $creds['COOLIFY_BASE_URL'].TrimEnd('/')
$token = $creds['COOLIFY_API_TOKEN']
$h = @{
    Authorization  = "Bearer $token"
    Accept         = 'application/json'
    'Content-Type' = 'application/json'
}

Write-Host "Coolify base: $base" -ForegroundColor Cyan
Write-Host ""

# First list existing projects to find or create the Ai Solutions project
Write-Host "Looking up projects..." -ForegroundColor Cyan
$projects = Invoke-RestMethod -Method Get -Uri "$base/api/v1/projects" -Headers $h
$aiProject = $projects | Where-Object { $_.name -eq 'Ai Solutions' }
if (-not $aiProject) {
    Write-Host "No 'Ai Solutions' project found. Creating..." -ForegroundColor Yellow
    $projectBody = @{ name = 'Ai Solutions'; description = 'Ai Solutions website - aisolutions.in' } | ConvertTo-Json -Compress
    $newProject = Invoke-RestMethod -Method Post -Uri "$base/api/v1/projects" -Headers $h -Body $projectBody
    Write-Host "Project created: $($newProject.uuid)" -ForegroundColor Green
    $projectUuid = $newProject.uuid
} else {
    Write-Host "Found existing project: $($aiProject.uuid)" -ForegroundColor Green
    $projectUuid = $aiProject.uuid
}

# Create the application
Write-Host ""
Write-Host "Creating ai-solutions application..." -ForegroundColor Cyan

# First get the GitHub app environment ID and source ID from existing repos
Write-Host "Looking up server/environment configuration from existing apps..." -ForegroundColor Cyan
$existingApps = Invoke-RestMethod -Method Get -Uri "$base/api/v1/applications" -Headers $h
$erpApp = $existingApps | Where-Object { $_.name -eq 'erp' }
if (-not $erpApp) {
    throw "Could not find erp app for reference configuration"
}
$environmentId = $erpApp.environment_id
$serverUuid = $erpApp.server_uuid

$body = @{
    name                    = 'ai-solutions'
    description             = 'Ai Solutions marketing website - aisolutions.in'
    environment_id          = $environmentId
    source_id               = 2   # 2 = GitHub App
    repository_project_id   = 1241230208
    git_repository          = 'jupo-webtech/ai-solutions'
    git_branch              = 'main'
    build_pack              = 'dockercompose'
    docker_compose_location = '/docker-compose.coolify.yml'
    ports_exposes           = '3000'
    ports_mappings          = '3000:3000'
    instant_deploy          = $false
    health_check_path       = '/api/health'
    health_check_port       = '3000'
    health_check_method     = 'GET'
    health_check_return_code = 200
    health_check_scheme     = 'http'
    health_check_interval   = 30
    health_check_timeout    = 10
    health_check_retries    = 3
    health_check_start_period = 60
    project_uuid            = $projectUuid
    server_uuid             = $serverUuid
} | ConvertTo-Json -Compress

try {
    $r = Invoke-RestMethod -Method Post -Uri "$base/api/v1/applications" -Headers $h -Body $body
    Write-Host "SUCCESS - new app UUID: $($r.uuid)" -ForegroundColor Green
    $newUuid = $r.uuid

    # Update creds file
    $credsContent = Get-Content '.coolify-creds.local' -Raw
    $credsContent = $credsContent -replace 'COOLIFY_PROJECT_UUID=.*', "COOLIFY_PROJECT_UUID=$projectUuid"
    $credsContent = $credsContent -replace 'COOLIFY_APPLICATION_UUID=.*', "COOLIFY_APPLICATION_UUID=$newUuid"
    Set-Content '.coolify-creds.local' $credsContent
    Write-Host "Updated .coolify-creds.local with new UUIDs" -ForegroundColor Green

    # Set the SOURCE_COMMIT env var to enable commit SHA in health endpoint
    Write-Host "`nSetting SOURCE_COMMIT env var..." -ForegroundColor Cyan
    $envBody = @{ key = 'SOURCE_COMMIT'; value = '${SOURCE_COMMIT}'; is_preview = $false; is_literal = $false } | ConvertTo-Json -Compress
    try {
        Invoke-RestMethod -Method Patch -Uri "$base/api/v1/applications/$newUuid/envs" -Headers $h -Body $envBody | Out-Null
        Write-Host "  SET SOURCE_COMMIT (will auto-populate from git)" -ForegroundColor Green
    } catch {
        Write-Host "  WARN: Could not set SOURCE_COMMIT - set manually or via coolify-env.ps1" -ForegroundColor Yellow
    }

    Write-Host ""
    Write-Host "Done! App created with UUID: $newUuid" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. In Coolify dashboard, configure the app's domain to aisolutions.in"
    Write-Host "  2. Run: pwsh scripts/deploy.ps1 to trigger first deployment"

} catch {
    $code = $_.Exception.Response.StatusCode.value__
    $detail = $_.ErrorDetails.Message
    Write-Host "FAIL $code : $detail" -ForegroundColor Red
    Write-Host ""
    Write-Host "Manual fallback:" -ForegroundColor Yellow
    Write-Host "  Go to $base, create a new app under 'Ai Solutions' project"
    Write-Host "  Source: GitHub App -> jupo-webtech/ai-solutions (main branch)"
    Write-Host "  Build Pack: Docker Compose"
    Write-Host "  Compose location: /docker-compose.coolify.yml"
    Write-Host "  Port: 3000"
    Write-Host "  Health check: /api/health"
    Write-Host "  Then update COOLIFY_APPLICATION_UUID in .coolify-creds.local"
}