param(
    [Parameter(Position = 0)]
    [ValidateSet('status', 'light-watch', 'portfolio', 'tactical', 'review-open', 'report-rollup', 'script-audit-sample')]
    [string]$Command = 'status'
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$OutputEncoding = [Console]::OutputEncoding

$Root = Split-Path -Parent $PSScriptRoot

function Read-Utf8 {
    param([string]$Path)

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

function Write-Section {
    param(
        [string]$Title,
        [string[]]$Lines
    )

    Write-Output $Title
    if ($null -eq $Lines -or $Lines.Count -eq 0) {
        Write-Output '- none'
    }
    else {
        foreach ($line in $Lines) {
            Write-Output ("- {0}" -f $line)
        }
    }
    Write-Output ''
}

function Show-Status {
    $activityPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-current-activity-board'
    $boardPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-company-os-improvement-board'

    $activityRows = Get-MarkdownTableRows -Path $activityPath
    $boardRows = Get-MarkdownTableRows -Path $boardPath

    Write-Section 'current activity' (
        $activityRows |
        Select-Object -First 4 |
        ForEach-Object { "{0}: {1}" -f $_[0], $_[3] }
    )
    Write-Section 'next bounded work' (
        $boardRows |
        Where-Object { $_[6] -eq 'active' } |
        Select-Object -First 4 |
        ForEach-Object { "{0}: {1} -> {2}" -f $_[1], $_[4], $_[7] }
    )
    Write-Output ("source: {0}" -f $activityPath)
    Write-Output ("source: {0}" -f $boardPath)
}

function Show-LightWatch {
    $watchPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-continuous-operations-watch'
    $queuePath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-inactive-business-screening-queue'

    $watchRows = Get-MarkdownTableRows -Path $watchPath
    $queueRows = Get-MarkdownTableRows -Path $queuePath

    Write-Section 'continuous watch' (
        $watchRows |
        Select-Object -First 5 |
        ForEach-Object { "{0}: {1}" -f $_[0], $_[2] }
    )
    Write-Section 'queue sample' (
        $queueRows |
        Select-Object -First 4 |
        ForEach-Object { "{0}: {1} / {2}" -f $_[1], $_[5], $_[7] }
    )
    Write-Output ("source: {0}" -f $watchPath)
    Write-Output ("source: {0}" -f $queuePath)
}

function Show-Portfolio {
    $portfolioPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-business-portfolio'
    $inactivePath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-inactive-business-readiness'

    $portfolioRows = Get-MarkdownTableRows -Path $portfolioPath
    $inactiveRows = Get-MarkdownTableRows -Path $inactivePath

    Write-Section 'portfolio sample' (
        $portfolioRows |
        Select-Object -First 6 |
        ForEach-Object { "{0}: {1} / {2}" -f $_[0], $_[1], $_[4] }
    )
    Write-Section 'inactive next steps' (
        $inactiveRows |
        Where-Object { $_[5] -ne 'review-opened' } |
        Select-Object -First 4 |
        ForEach-Object { "{0}: {1}" -f $_[0], $_[5] }
    )
    Write-Output ("source: {0}" -f $portfolioPath)
    Write-Output ("source: {0}" -f $inactivePath)
}

function Show-Tactical {
    $boardPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-company-os-improvement-board'
    $activityPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-current-activity-board'

    $boardRows = Get-MarkdownTableRows -Path $boardPath
    $activityRows = Get-MarkdownTableRows -Path $activityPath

    Write-Section 'tactical board' (
        $boardRows |
        Where-Object { $_[6] -eq 'active' } |
        Select-Object -First 5 |
        ForEach-Object { "{0}: {1} / {2}" -f $_[1], $_[4], $_[8] }
    )
    Write-Section 'recent handoff' (
        $activityRows |
        Select-Object -First 4 |
        ForEach-Object { "{0}: {1}" -f $_[0], $_[4] }
    )
    Write-Output ("source: {0}" -f $boardPath)
    Write-Output ("source: {0}" -f $activityPath)
}

function Show-ReviewOpen {
    $queuePath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-inactive-business-screening-queue'
    $scriptPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-routine-work-scriptification'

    $queueRows = Get-MarkdownTableRows -Path $queuePath
    $scriptRows = Get-MarkdownTableRows -Path $scriptPath

    Write-Section 'review-open queue' (
        $queueRows |
        Select-Object -First 5 |
        ForEach-Object { "{0}: {1} / {2}" -f $_[1], $_[5], $_[7] }
    )
    Write-Section 'script candidates' (
        $scriptRows |
        Where-Object { $_[5] -ne 'active' } |
        Select-Object -First 4 |
        ForEach-Object { "{0}: {1}" -f $_[0], $_[5] }
    )
    Write-Output ("source: {0}" -f $queuePath)
    Write-Output ("source: {0}" -f $scriptPath)
}

function Show-ReportRollup {
    $improvementPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-company-os-improvement-board'
    $auditPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-script-audit'

    $improvementRows = Get-MarkdownTableRows -Path $improvementPath
    $auditRows = Get-MarkdownTableRows -Path $auditPath

    Write-Section 'watch items' (
        $improvementRows |
        Where-Object { $_[4] -eq 'watch' } |
        Select-Object -First 6 |
        ForEach-Object { "{0}: {1}" -f $_[1], $_[6] }
    )
    Write-Section 'audit targets' (
        $auditRows |
        Select-Object -First 5 |
        ForEach-Object { "{0}: {1}" -f $_[0], $_[4] }
    )
    Write-Output ("source: {0}" -f $improvementPath)
    Write-Output ("source: {0}" -f $auditPath)
}

function Show-ScriptAuditSample {
    $auditPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-script-audit'
    $tokenPath = Resolve-DocPathById -Folder 'ledgers' -Id 'ledger-all-department-token-efficiency-notice'

    $auditRows = Get-MarkdownTableRows -Path $auditPath
    $tokenRows = Get-MarkdownTableRows -Path $tokenPath

    Write-Section 'script audit sample' (
        $auditRows |
        Select-Object -First 5 |
        ForEach-Object { "{0}: {1} / {2}" -f $_[0], $_[1], $_[4] }
    )
    Write-Section 'token efficiency notice' (
        $tokenRows |
        Select-Object -First 5 |
        ForEach-Object { "{0}: {1}" -f $_[0], $_[2] }
    )
    Write-Output ("source: {0}" -f $auditPath)
    Write-Output ("source: {0}" -f $tokenPath)
}

switch ($Command) {
    'status' { Show-Status }
    'light-watch' { Show-LightWatch }
    'portfolio' { Show-Portfolio }
    'tactical' { Show-Tactical }
    'review-open' { Show-ReviewOpen }
    'report-rollup' { Show-ReportRollup }
    'script-audit-sample' { Show-ScriptAuditSample }
}
