param(
    [string]$Destination = ".\\astera-emulator-xr"
)

$ErrorActionPreference = "Stop"
$repo = "https://github.com/nawnie/nawnie.git"
$subdir = "projects/astera-emulator-xr"
$temp = Join-Path ([System.IO.Path]::GetTempPath()) ("astera-xr-" + [guid]::NewGuid().ToString("N"))

try {
    New-Item -ItemType Directory -Path $temp | Out-Null

    if (Get-Command git -ErrorAction SilentlyContinue) {
        $checkout = Join-Path $temp "repo"
        git clone --depth 1 --filter=blob:none --sparse $repo $checkout | Out-Host
        git -C $checkout sparse-checkout set $subdir | Out-Host
        $source = Join-Path $checkout ($subdir -replace "/", "\\")
    } else {
        $zip = Join-Path $temp "main.zip"
        $extract = Join-Path $temp "extract"
        Invoke-WebRequest -Uri "https://github.com/nawnie/nawnie/archive/refs/heads/main.zip" -OutFile $zip
        Expand-Archive -Path $zip -DestinationPath $extract
        $source = Join-Path $extract ("nawnie-main\\" + ($subdir -replace "/", "\\"))
    }

    if (Test-Path $Destination) {
        Remove-Item -Recurse -Force $Destination
    }
    Copy-Item -Recurse -Force $source $Destination
    Write-Host "Astera Emulator XR downloaded to: $Destination"
} finally {
    if (Test-Path $temp) {
        Remove-Item -Recurse -Force $temp
    }
}
