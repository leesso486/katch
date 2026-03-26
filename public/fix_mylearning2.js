const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

// 1. Remove "GVR 대시보드" Nav Item
html = html.replace(
    /(<a class="nav-item"[^>]*onclick="showPanel\('homework'[^>]*>[\s\S]*?<\/a>)/g,
    ''
);

// 2. Extract entire content inside id="panel-homework", specifically the contents of .simple-panel
const hwPanelMatch = html.match(/<div class="content-panel" id="panel-homework">\s*<div class="simple-panel">\s*<h3[^>]*>[\s\S]*?<\/a>\s*<\/h3>([\s\S]*?)<\/div>\s*<\/div>/);

if (hwPanelMatch) {
    let gvrContent = hwPanelMatch[1]; // Everything after the <h3> title
    
    // The panel-dashboard ends with:
    // </div> <!-- End grid-3 -->
    // <div class="dash-card">...GVR Homework...</div>
    // </div> <!-- end panel-dashboard -->
    // We will append gvrContent right inside panel-dashboard
    
    // First, let's delete the existing GVR Homework card in panel-dashboard to avoid duplicates
    html = html.replace(/<!-- GVR Homework -->\s*<div class="dash-card">[\s\S]*?<\/div>\s*(?=<\/div>\s*<!-- ============================)/, '');
    
    // Now append gvrContent before the closing </div> of panel-dashboard
    html = html.replace(/(<\/div>\s*)(?=<!-- ============================\s*PANEL: 진단테스트)/, '\n' + gvrContent + '\n$1');
    
    // Remove the panel-homework div completely
    html = html.replace(/<!-- ============================\s*PANEL: 숙제 현황 \(GVR\/OMR\)\s*============================ -->\s*<div class="content-panel" id="panel-homework">[\s\S]*?<\/div>\s*<\/div>\s*(?=<!-- ============================\s*PANEL: 성적표)/, '');
    
    // Fix gvrChart1 to be horizontal
    html = html.replace(/const ctxGvr1[\s\S]*?new Chart\(ctxGvr1,\s*\{[\s\S]*?options:\s*\{/, function(match) {
        if (!match.includes("indexAxis")) {
            return match + "\n                    indexAxis: 'y',";
        }
        return match;
    });
    
    // Swap X and Y scales for gvrChart1 manually
    html = html.replace(/(new Chart\(ctxGvr1[\s\S]*?)scales:\s*\{\s*y:\s*\{([^}]+)\},\s*x:\s*\{([^}]+)\}\s*\}/, '$1scales: { x: {$2}, y: {$3} }');

    fs.writeFileSync('my_learning.html', html, 'utf8');
    console.log('Successfully migrated GVR to panel-dashboard');
} else {
    console.log('Could not find panel-homework content');
}
