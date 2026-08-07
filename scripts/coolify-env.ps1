# coolify-env.ps1
#
# Set or update environment variables on the Ai Solutions Coolify app.
#
# Usage:
#   pwsh scripts/coolify-env.ps1 -Set @{ APP_URL = 'https://aisolutions.in' }
#   pwsh scripts/coolify-env.ps1 -Set @{ KEY = 'value' } -Deploy
#   pwsh scripts/coolify-env.ps1 -Set @{ FOO = 'bar' } -DryRun

param(
    [Parameter(Mandatory = $true)]
    [hashtable]$Set,

    [switch]$Deploy,

    [switch]$DryRun,

    [switch]$IsLiteral,

    [string]$CredsFile = '.coolify-creds.local'
)

$ErrorActionPreference = 'Stop'

function Read-Creds([string]$path) {
    if (-not (Test-Path $path)) {
        throw "Credentials file not found at $path"
    }
    $creds = @{}
    foreach ($line in Get-Content $path) {
        $trimmed = $line.Trim()
        if (-not $trimmed -or $trimmed.StartsWith('#')) { continue }
        $eq = $trimmed.IndexOf('=')
        if ($eq -lt 1) { continue }
        $k = $trimmed.Substring(0, $eq).Trim()
        $v = $trimmed.Substring($eq + 1).Trim()
        $creds[$k] = $v
    }
    return $creds
}

$creds   = Read-Creds $CredsFile
$base    = $creds['COOLIFY_BASE_URL'].TrimEnd('/')
$token   = $creds['COOLIFY_API_TOKEN']
$appUuid = $creds['COOLIFY_APPLICATION_UUID']

if (-not $appUuid) {
    throw "COOLIFY_APPLICATION_UUID not set in .coolify-creds.local"
}

$headers = @{
    Authorization  = "Bearer $token"
    Accept         = 'application/json'
    'Content-Type' = 'application/json'
}

Write-Host "Coolify: $base | App: $appUuid" -ForegroundColor Cyan

foreach ($key in $Set.Keys) {
    $value = $Set[$key]
    $body = @{
        key        = $key
        value      = $value
        is_preview = $false
        is_literal = $IsLiteral
    }

    if ($DryRun) {
        Write-Host "DRYRUN: PATCH $key=$value" -ForegroundColor Yellow
        continue
    }

    try {
        $bodyJson = $body | ConvertTo-Json -Compress
        Invoke-RestMethod -Method Patch -Uri "$base/api/v1/applications/$appUuid/envs" -Headers $headers -Body $bodyJson | Out-Null
        Write-Host "  SET $key" -ForegroundColor Green
    } catch {
        try {
            Invoke-RestMethod -Method Post -Uri "$base/api/v1/applications/$appUuid/envs" -Headers $headers -Body ($body | ConvertTo-Json -Compress) | Out-Null
            Write-Host "  CREATED $key" -ForegroundColor Green
        } catch {
            Write-Host "  FAILED $key : $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

if ($Deploy) {
    Write-Host ""
    Write-Host "Triggering deploy..." -ForegroundColor Cyan
    $resp = Invoke-RestMethod -Method Post -Uri "$base/api/v1/deploy?uuid=$appUuid&force=false" -Headers $headers
    Write-Host "Deployment queued: $($resp.deployments[0].deployment_uuid)" -ForegroundColor Green
}