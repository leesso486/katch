$filePath = "my_learning.html"
$newContentPath = "new_dashboard.html"

$text = [IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
$replacement = [IO.File]::ReadAllText($newContentPath, [System.Text.Encoding]::UTF8)

# Avoid non-ASCII characters in regex
$pattern = '(?sm)<div class="content-panel active" id="panel-dashboard">.*?</div></div></div>\s*(?=<!-- =+\s*PANEL:)'

if ($text -match $pattern) {
    Write-Host "Pattern matched!"
    $newText = [regex]::Replace($text, $pattern, $replacement + "`r`n            ")
    [IO.File]::WriteAllText($filePath, $newText, [System.Text.Encoding]::UTF8)
    Write-Host "Replaced successfully!"
} else {
    Write-Host "Pattern DID NOT match!"
}
