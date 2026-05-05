# Download copyright-free priority images from Unsplash (free commercial use).
# Run from the REPO ROOT in PowerShell:
#   cd C:\path\to\your\site
#   .\scripts\download-priority-images.ps1
#
# All photos are Unsplash license — free commercially, no attribution required.

$ErrorActionPreference = "Stop"

# Verify we're in the repo root
if (-not (Test-Path "apps\frontend\public\images\priorities")) {
    Write-Host "ERROR: Run this script from the repository root (the folder containing apps\)." -ForegroundColor Red
    Write-Host "Example:  cd C:\Users\borre\site   then re-run this script." -ForegroundColor Yellow
    exit 1
}

$dest = "apps\frontend\public\images\priorities"

$photos = [ordered]@{
    "lobbyists"        = "photo-1554232456-8727aae0cfa4"   # US Capitol / government
    "second-amendment" = "photo-1595590424283-b8f17842773f" # Responsible gun ownership
    "property-taxes"   = "photo-1570129477492-45c003edd2be" # Suburban home exterior
    "faith-family"     = "photo-1438232992991-995b671e4468" # Church community
    "classroom"        = "photo-1580582932707-520aed937b7b" # Children in classroom
    "law-enforcement"  = "photo-1589652717521-10c0d092dea9" # Police officer on duty
    "protect-children" = "photo-1503676260728-1c00da094a0b" # Child reading
}

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    "Accept"     = "image/jpeg,image/*,*/*;q=0.8"
    "Referer"    = "https://unsplash.com/"
}

$ok = 0
$fail = 0

foreach ($name in $photos.Keys) {
    $id  = $photos[$name]
    $url = "https://images.unsplash.com/$id`?w=1200&h=675&fit=crop&auto=format&q=85"
    $out = "$dest\$name.jpg"

    Write-Host "Downloading $name ... " -NoNewline
    try {
        Invoke-WebRequest -Uri $url -Headers $headers -OutFile $out -UseBasicParsing
        $kb = [math]::Round((Get-Item $out).Length / 1KB)
        Write-Host "OK ($kb KB)" -ForegroundColor Green
        $ok++
    }
    catch {
        Write-Host "FAILED: $_" -ForegroundColor Red
        $fail++
    }
}

Write-Host ""
Write-Host "$ok downloaded, $fail failed."

if ($ok -gt 0) {
    Write-Host ""
    Write-Host "Commit the new images:" -ForegroundColor Cyan
    Write-Host "  git add apps/frontend/public/images/priorities/"
    Write-Host "  git commit -m `"chore: replace priority images with Unsplash free-license photos`""
    Write-Host "  git push"
}
