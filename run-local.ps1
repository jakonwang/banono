$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontend = Join-Path $root "frontend"
$cms = Join-Path $root "cms"
$frontendDist = Join-Path $frontend "dist"
$cmsPublic = Join-Path $cms "public"
function Start-IfNeeded {
    param(
        [string]$Name,
        [string]$Command,
        [string[]]$CommandArgs,
        [string]$WorkingDirectory,
        [int]$Port
    )

    try {
        $listening = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    } catch {
        $listening = $null
    }

    if (-not $listening) {
        Start-Process -WindowStyle Hidden -FilePath $Command -ArgumentList $CommandArgs -WorkingDirectory $WorkingDirectory
        Start-Sleep -Seconds 2
    }
}

function Start-CmsServer {
    param(
        [string]$WorkingDirectory
    )

    try {
        $listening = Get-NetTCPConnection -LocalPort 1337 -State Listen -ErrorAction SilentlyContinue
    } catch {
        $listening = $null
    }

    if (-not $listening) {
        $command = "`$Host.UI.RawUI.WindowTitle = 'Banono CMS'; Set-Location -LiteralPath '$WorkingDirectory'; npm run develop"
        Start-Process -FilePath "powershell" -ArgumentList @("-NoExit", "-ExecutionPolicy", "Bypass", "-Command", $command) -WorkingDirectory $WorkingDirectory -WindowStyle Minimized
        Start-Sleep -Seconds 10
    }
}

function Wait-UrlHealthy {
    param(
        [string]$HealthUrl,
        [int]$MaxRetries = 20
    )

    for ($attempt = 1; $attempt -le $MaxRetries; $attempt++) {
        try {
            $response = Invoke-WebRequest -UseBasicParsing $HealthUrl -TimeoutSec 2
            if ($response.StatusCode -eq 200) {
                return $true
            }
        } catch {
        }
        Start-Sleep -Milliseconds 500
    }

    return $false
}

function Stop-PortProcess {
    param(
        [int]$Port
    )

    try {
        $connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
        if ($connections) {
            $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
            foreach ($pid in $pids) {
                try {
                    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                } catch {
                }
            }
            Start-Sleep -Milliseconds 800
        }
    } catch {
    }
}

if (-not (Test-Path (Join-Path $root "cms\.tmp"))) {
    New-Item -ItemType Directory -Path (Join-Path $root "cms\.tmp") | Out-Null
}

Stop-PortProcess -Port 1337

Push-Location $frontend
try {
    npm run build | Out-Host
} finally {
    Pop-Location
}

Push-Location $cms
try {
    npm run build | Out-Host
} finally {
    Pop-Location
}

if (Test-Path $frontendDist) {
    Get-ChildItem -Path $frontendDist -Force | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination $cmsPublic -Recurse -Force
    }
}

Start-CmsServer -WorkingDirectory $cms

if (-not (Wait-UrlHealthy -HealthUrl "http://127.0.0.1:1337/index.html")) {
    Write-Error "Frontend failed to become healthy on http://127.0.0.1:1337/index.html"
}

if (-not (Wait-UrlHealthy -HealthUrl "http://127.0.0.1:1337/api/public/site")) {
    Write-Error "CMS failed to become healthy on http://127.0.0.1:1337/api/public/site"
}

Start-Process "http://127.0.0.1:1337/index.html"
Write-Output "Started site at http://127.0.0.1:1337/index.html"
Write-Output "CMS admin at http://127.0.0.1:1337/admin"
Write-Output "CMS public API at http://127.0.0.1:1337/api/public/site"
