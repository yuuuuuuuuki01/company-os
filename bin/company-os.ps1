param(
    [Parameter(Position = 0)]
    [ValidateSet('status', 'light-watch', 'portfolio', 'tactical')]
    [string]$Command = 'status'
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$OutputEncoding = [Console]::OutputEncoding

$Root = Split-Path -Parent $PSScriptRoot

function Read-Utf8([string]$Path) {
    Get-Content -Raw -Encoding utf8 $Path
}

function Resolve-DocPathById {
    param(
        [string]$Folder,
        [string]$Id
    )

    $dir = Join-Path $Root $Folder
    foreach ($file in Get-ChildItem $dir -Filter *.md) {
        $head = Get-Content -Path $file.FullName -TotalCount 20 -Encoding utf8
        if ($head -match ("id:\s*" + [regex]::Escape($Id))) {
            return $file.FullName
        }
    }

    throw "Document id not found: $Id"
}

function Get-MarkdownTableRows {
    param(
        [string]$Path,
        [string]$HeaderPrefix = '|'
    )

    $content = Read-Utf8 $Path
    $lines = $content -split "`r?`n"
    $rows = @()
    $seenHeader = $false

    foreach ($line in $lines) {
        if (-not $line.StartsWith($HeaderPrefix)) { continue }
        if (-not $seenHeader) {
            $seenHeader = $true
            continue
        }
        if ($line -match '^\|\s*---') { continue }
        $cells = $line.Trim('|').Split('|') | ForEach-Object { $_.Trim() }
        if ($cells.Count -gt 1) {
            $rows += ,$cells
        }
    }

    return $rows
}

function Show-Status {
    $activityPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-current-activity-board'
    $boardPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-company-os-improvement-board'

    $activityRows = Get-MarkdownTableRows -Path $activityPath
    $boardRows = Get-MarkdownTableRows -Path $boardPath

    $activeActors = $activityRows | Select-Object -First 4
    $activeItems = $boardRows | Where-Object { $_[6] -eq 'active' } | Select-Object -First 4

    Write-Output '今の位置'
    foreach ($row in $activeActors) {
        Write-Output ("- {0}: {1}" -f $row[0], $row[3])
    }

    Write-Output ''
    Write-Output '次の作業'
    foreach ($row in $activeItems) {
        Write-Output ("- {0}: {1} -> {2}" -f $row[1], $row[4], $row[7])
    }

    Write-Output ''
    Write-Output ("参照: {0}" -f $activityPath)
    Write-Output ("参照: {0}" -f $boardPath)
}

function Show-LightWatch {
    $watchPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-continuous-operations-watch'
    $queuePath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-inactive-business-screening-queue'

    $watchRows = Get-MarkdownTableRows -Path $watchPath
    $queueRows = Get-MarkdownTableRows -Path $queuePath

    Write-Output '今の位置'
    foreach ($row in $watchRows) {
        Write-Output ("- {0}: {1}" -f $row[0], $row[2])
    }

    Write-Output ''
    Write-Output '次の作業'
    foreach ($row in ($queueRows | Select-Object -First 3)) {
        Write-Output ("- {0}: {1} / {2}" -f $row[1], $row[5], $row[7])
    }

    Write-Output ''
    Write-Output ("参照: {0}" -f $watchPath)
    Write-Output ("参照: {0}" -f $queuePath)
}

function Show-Portfolio {
    $portfolioPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-business-portfolio'
    $inactivePath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-inactive-business-readiness'

    $portfolioRows = Get-MarkdownTableRows -Path $portfolioPath
    $inactiveRows = Get-MarkdownTableRows -Path $inactivePath

    Write-Output '今の位置'
    foreach ($row in ($portfolioRows | Select-Object -First 6)) {
        Write-Output ("- {0}: {1} / {2}" -f $row[0], $row[1], $row[4])
    }

    Write-Output ''
    Write-Output '次の作業'
    foreach ($row in ($inactiveRows | Where-Object { $_[5] -notlike 'review-opened' } | Select-Object -First 4)) {
        Write-Output ("- {0}: {1}" -f $row[0], $row[5])
    }

    Write-Output ''
    Write-Output ("参照: {0}" -f $portfolioPath)
    Write-Output ("参照: {0}" -f $inactivePath)
}

function Show-Tactical {
    $boardPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-company-os-improvement-board'
    $activityPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-current-activity-board'

    $boardRows = Get-MarkdownTableRows -Path $boardPath
    $activityRows = Get-MarkdownTableRows -Path $activityPath

    Write-Output '今の位置'
    foreach ($row in ($boardRows | Where-Object { $_[6] -eq 'active' } | Select-Object -First 5)) {
        Write-Output ("- {0}: {1} / {2}" -f $row[1], $row[4], $row[8])
    }

    Write-Output ''
    Write-Output '次の作業'
    foreach ($row in ($activityRows | Select-Object -First 4)) {
        Write-Output ("- {0}: {1}" -f $row[0], $row[4])
    }

    Write-Output ''
    Write-Output ("参照: {0}" -f $boardPath)
    Write-Output ("参照: {0}" -f $activityPath)
}

switch ($Command) {
    'status' { Show-Status }
    'light-watch' { Show-LightWatch }
    'portfolio' { Show-Portfolio }
    'tactical' { Show-Tactical }
}
