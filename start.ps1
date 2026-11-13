param(
  [switch]$Preview
)

$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$LocalNode = Join-Path $ProjectRoot '.runtime\node\node.exe'
$NodeCommand = Get-Command node -ErrorAction SilentlyContinue

if ($NodeCommand) {
  $NodePath = $NodeCommand.Source
} else {
  $NodeCandidates = @(
    $LocalNode,
    'C:\Program Files\nodejs\node.exe'
  )
  $NodePath = $NodeCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
}

if (-not $NodePath) {
  throw 'Node.js not found. Install Node.js or add .runtime\node to this project.'
}

$VitePath = Join-Path $ProjectRoot 'node_modules\vite\bin\vite.js'
if (-not (Test-Path -LiteralPath $VitePath)) {
  throw 'Dependencies not found. Run npm install in the project folder.'
}

$Mode = if ($Preview) { 'preview' } else { 'dev' }

Push-Location $ProjectRoot
try {
  & $NodePath $VitePath $Mode --host 0.0.0.0
} finally {
  Pop-Location
}
