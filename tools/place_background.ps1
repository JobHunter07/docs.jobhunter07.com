# Search for a background image in the repo and copy it to pandoc-templates/assets/background.jpg
# Usage: powershell -ExecutionPolicy Bypass -File tools/place_background.ps1

$repoRoot = Get-Location
$searchNames = @('background.jpg','Background.jpg','background.png','Background.png','background.jpeg','Background.jpeg','jobhunter-background.jpg','jobhunter07-background.jpg')
$found = $null

Write-Host "Searching for background images under repository root: $repoRoot"
foreach ($name in $searchNames) {
    $matches = Get-ChildItem -Path $repoRoot -Recurse -ErrorAction SilentlyContinue -Filter $name -File | Where-Object { $_.FullName -notmatch 'pandoc-templates\\assets' }
    if ($matches) {
        $found = $matches[0]
        break
    }
}

if (-not $found) {
    # Try a broader search for files containing "background" in name
    $matches = Get-ChildItem -Path $repoRoot -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '(?i)background' -and ($_.Extension -match '\.(jpg|jpeg|png|svg)') -and $_.FullName -notmatch 'pandoc-templates\\assets' }
    if ($matches) { $found = $matches[0] }
}

if (-not $found) {
    Write-Host "No background image found automatically. Please place your image file at: pandoc-templates/assets/background.jpg (or .png/.svg) and re-run the generator." -ForegroundColor Yellow
    exit 1
}

$destDir = Join-Path $repoRoot 'pandoc-templates\assets'
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

$ext = $found.Extension.ToLower()
$dest = Join-Path $destDir ("background" + $ext)
Copy-Item -Path $found.FullName -Destination $dest -Force
Write-Host "Copied background image:`n  From: $($found.FullName)`n  To:   $dest" -ForegroundColor Green

# Suggest regenerating PDF
Write-Host "Run the PDF generator (tools/generate_pdf.ps1) or rerun your pandoc command to include the background image."