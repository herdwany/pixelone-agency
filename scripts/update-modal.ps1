$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$old = [System.IO.File]::ReadAllText("$PSScriptRoot\old-modal.txt", [Text.Encoding]::UTF8)
$new = [System.IO.File]::ReadAllText("$PSScriptRoot\new-modal.txt", [Text.Encoding]::UTF8)

$files = Get-ChildItem "c:\Users\herdw\Documents\pixelone-agency\pixelone\service-*.html"
$count = 0
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [Text.Encoding]::UTF8)
    if ($content.Contains($old)) {
        $content = $content.Replace($old, $new)
        [System.IO.File]::WriteAllText($f.FullName, $content, $utf8NoBom)
        $count++
        Write-Host "OK: $($f.Name)"
    }
    else {
        Write-Host "SKIP: $($f.Name)"
    }
}
Write-Host "Updated: $count files"
