param(
  [string]$input = "input.md",
  [string]$outputName = "$([DateTime]::Now.ToString('yyyy-MM-dd_HH-mm'))-document.pdf",
  [string]$template = "pandoc-templates/jobhunter07.tex",
  [string]$engine = "xelatex"
)

# Ensure output folder
$destFolder = Join-Path -Path (Get-Location) -ChildPath "pdfs"
if (-not (Test-Path $destFolder)) { New-Item -ItemType Directory -Path $destFolder | Out-Null }

$outputPath = Join-Path -Path $destFolder -ChildPath $outputName

Write-Host "Generating PDF to: $outputPath"

pandoc $input -o $outputPath --template=$template --pdf-engine=$engine
if ($LASTEXITCODE -ne 0) { Write-Error "Pandoc failed with exit code $LASTEXITCODE"; exit $LASTEXITCODE }
Write-Host "Done."