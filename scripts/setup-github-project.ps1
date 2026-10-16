# ==============================================================================
# GitHub Projects v2 Automation: Software Architecture & Engineering Command Center
# Author: Omar Emad Ahmed (omaremadahmed)
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Software Architecture & Engineering Command Center Setup" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Step 1: Check GitHub CLI authentication
Write-Host "`n[1/4] Checking GitHub CLI authentication & project scopes..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1 | Out-String

if ($authStatus -notmatch "Logged in to github.com") {
    Write-Host "❌ GitHub CLI is not logged in. Please run: gh auth login" -ForegroundColor Red
    exit 1
}

# Verify 'project' scope
if ($authStatus -notmatch "project") {
    Write-Host "⚠️  Your GitHub CLI token needs 'project' scope." -ForegroundColor Yellow
    Write-Host "👉 Running: gh auth refresh -s project" -ForegroundColor Cyan
    gh auth refresh -s project
}

# Step 2: List user projects to find 'Software Architecture & Engineering Command Center'
Write-Host "`n[2/4] Locating project 'Software Architecture & Engineering Command Center'..." -ForegroundColor Yellow
$projectJson = gh project list --owner omaremadahmed --format json 2>&1 | Out-String

Write-Host $projectJson

Write-Host "`n✅ GitHub Project setup helper completed." -ForegroundColor Green
Write-Host "If your token has been refreshed with project scope, you can add cards and configure views directly." -ForegroundColor White
