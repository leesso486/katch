$text = Get-Content 'build_pages.ps1' -Encoding UTF8 -Raw
$utf8Bom = New-Object System.Text.UTF8Encoding($true)
[System.IO.File]::WriteAllText('build_pages_bom.ps1', $text, $utf8Bom)
Write-Host "Successfully added BOM to build_pages_bom.ps1"
