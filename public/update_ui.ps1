$text = Get-Content 'teacher_dashboard.html' -Raw -Encoding UTF8
$idx = $text.IndexOf('<div id="teacherView">')
if ($idx -ge 0) {
    $pre = $text.Substring(0, $idx)
    $newUi = Get-Content 'teacher_ui.html' -Raw -Encoding UTF8
    Set-Content -Path 'teacher_dashboard.html' -Value ($pre + $newUi) -Encoding UTF8
} else {
    Write-Host 'Not found'
}
