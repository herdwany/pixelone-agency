param(
    [string]$Root = "C:\Users\herdw\Documents\pixelone-agency\pixelone"
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $Root)) {
    throw "Root path not found: $Root"
}

$outDir = Join-Path $Root 'content'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$files = Get-ChildItem -Path $Root -Filter *.html -File
$langs = @('ar')

foreach ($file in $files) {
    $raw = [System.IO.File]::ReadAllText($file.FullName)

    $titleMatch = [regex]::Match($raw, '<title>([\s\S]*?)</title>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    $title = if ($titleMatch.Success) { [System.Net.WebUtility]::HtmlDecode($titleMatch.Groups[1].Value.Trim()) } else { '' }

    $descMatch = [regex]::Match($raw, '<meta\s+name="description"\s+content="([\s\S]*?)"', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    $metaDescription = if ($descMatch.Success) { [System.Net.WebUtility]::HtmlDecode($descMatch.Groups[1].Value.Trim()) } else { '' }

    $bodyMatch = [regex]::Match($raw, '<body[^>]*>([\s\S]*?)</body>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    $bodyHtml = if ($bodyMatch.Success) { $bodyMatch.Groups[1].Value } else { $raw }

    $bodyHtml = [regex]::Replace($bodyHtml, '<!--[\s\S]*?-->', '', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $bodyHtml = [regex]::Replace($bodyHtml, '<script\b[^>]*>[\s\S]*?</script>', '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $bodyHtml = [regex]::Replace($bodyHtml, '<style\b[^>]*>[\s\S]*?</style>', '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)

    $textMatches = [regex]::Matches($bodyHtml, '>([^<>]+)<', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $texts = New-Object System.Collections.Generic.List[string]

    foreach ($m in $textMatches) {
        $txt = [System.Net.WebUtility]::HtmlDecode($m.Groups[1].Value)
        $trimmed = ($txt -replace '\s+', ' ').Trim()
        if ([string]::IsNullOrWhiteSpace($trimmed)) { continue }
        $texts.Add($trimmed) | Out-Null
    }

    $payload = [ordered]@{
        page            = $file.BaseName
        title           = $title
        metaDescription = $metaDescription
        texts           = $texts
        attributes      = @()
    }

    foreach ($lang in $langs) {
        $langPath = Join-Path $outDir ($file.BaseName + '.' + $lang + '.json')

        if (Test-Path $langPath) {
            continue
        }

        $langPayload = [ordered]@{
            page            = $file.BaseName
            lang            = $lang
            title           = $title
            metaDescription = $metaDescription
            texts           = $texts
            attributes      = @()
        }

        $langJson = $langPayload | ConvertTo-Json -Depth 6
        [System.IO.File]::WriteAllText($langPath, $langJson, $utf8NoBom)
    }
}

Write-Host "Page content JSON regenerated in: $outDir"
