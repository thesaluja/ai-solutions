# deploy.ps1
#
# Manually trigger a Coolify deployment for the Ai Solutions app.
# Run this after pushing commits.
#
# Usage:
#   pwsh scripts/deploy.ps1              # trigger deploy, wait for result
#   pwsh scripts/deploy.ps1 -Force       # force rebuild even without new commits
#   pwsh scripts/deploy.ps1 -NoWait      # fire-and-forget, don't poll
#
# Reads credentials from .coolify-creds.local.

param(
    [switch]$Force,
    [switch]$NoWait
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
        $creds[$trimmed.Substring(0, $eq).Trim()] = $trimmed.Substring($eq + 1).Trim()
    }
    return $creds
}

$creds   = Read-Creds '.coolify-creds.local'
$base    = $creds['COOLIFY_BASE_URL'].TrimEnd('/')
$token   = $creds['COOLIFY_API_TOKEN']
$appUuid = $creds['COOLIFY_APPLICATION_UUID']

if (-not $appUuid) {
    Write-Host "ERROR: COOLIFY_APPLICATION_UUID not set in .coolify-creds.local" -ForegroundColor Red
    Write-Host "Run scripts/coolify-create-app.ps1 first to create the Coolify app." -ForegroundColor Yellow
    exit 1
}

$headers = @{ 'Authorization' = "Bearer $token"; 'Accept' = 'application/json' }

Write-Host "Triggering deploy for $appUuid (force=$Force)..." -ForegroundColor Cyan

$force_param = if ($Force) { 'true' } else { 'false' }
$resp = Invoke-RestMethod -Method Post -Uri "$base/api/v1/deploy?uuid=$appUuid&force=$force_param" -Headers $headers
$deployUuid = $resp.deployments[0].deployment_uuid

if (-not $deployUuid) {
    Write-Host "ERROR: no deployment_uuid in response:" -ForegroundColor Red
    $resp | ConvertTo-Json
    exit 1
}

Write-Host "Deployment queued: $deployUuid" -ForegroundColor Green

if ($NoWait) {
    Write-Host "Skipping wait (-NoWait). Track at: $base" -ForegroundColor Yellow
    exit 0
}

$deadline = (Get-Date).AddMinutes(28)
$lastStatus = ''
Write-Host "Polling status..."

while ((Get-Date) -lt $deadline) {
    $status = 'unknown'
    try {
        $body = Invoke-RestMethod -Method Get -Uri "$base/api/v1/deployments/$deployUuid" -Headers $headers
        $status = $body.status ?? 'unknown'
    } catch { }

    if ($status -ne $lastStatus) {
        Write-Host "  [$(Get-Date -Format 'HH:mm:ss')] status=$status"
        $lastStatus = $status
    }

    switch ($status) {
        { $_ -in 'finished', 'success' } {
            Write-Host ""
            Write-Host "Deploy succeeded." -ForegroundColor Green

            Write-Host "Verifying /api/health..." -ForegroundColor Cyan
            Start-Sleep -Seconds 15
            for ($i = 1; $i -le 6; $i++) {
                try {
                    $health = Invoke-RestMethod -Uri 'https://aisolutions.in/api/health' -ErrorAction Stop
                    $sha = $health.commitSha?.Substring(0, 7)
                    Write-Host "  health ok - sha=$sha"
                    Write-Host "Fresh container confirmed." -ForegroundColor Green
                    break
                } catch {
                    Write-Host "  health check attempt $i failed: $($_.Exception.Message)"
                }
                Start-Sleep -Seconds 15
            }
            exit 0
        }
        { $_ -in 'failed', 'degraded' } {
            Write-Host ""
            Write-Host "Deploy FAILED." -ForegroundColor Red
            exit 1
        }
    }

    Start-Sleep -Seconds 10
}

Write-Host ""
Write-Host "Timeout after 28 minutes." -ForegroundColor Red
exit 1