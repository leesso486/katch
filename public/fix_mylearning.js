const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

// 1. Remove "GVR 대시보드" Nav Item
html = html.replace(
    /<a class="nav-item" href="#" onclick="showPanel\('homework', 'GVR 학습 현황', this\)">[\s\S]*?<\/a>/,
    ''
);

// 2. Extract GVR Content
const gvrContentRegex = /<!-- 4-Panel Dashboard Section -->[\s\S]*?(?=<\/div>\s*<\/div>\s*<!-- ============================)/;
let gvrContentMatch = html.match(gvrContentRegex);
if (!gvrContentMatch) {
    console.log("Failed to extract GVR content");
    process.exit(1);
}
let gvrContent = gvrContentMatch[0];

// 3. Remove "GVR 학습 대시보드" title from the extracted content
gvrContent = gvrContent.replace(/<h3 style="display:flex; justify-content:space-between; align-items:center;">[\s\S]*?<\/h3>/, '');

// 4. Update gvrChart4 title to '나의 오답 유형 vs. 전체 오답 유형 TOP 3' (Vertical! Wait, in my_learning it's gvrChart1 that is horizontal, gvrChart4 is vertical).

// 5. Insert GVR Content into panel-dashboard
//    We will place it right after `<div class="grid-3">...</div>`
html = html.replace(
    /(<div class="dash-card">\s*<div class="dash-card-title">GVR 숙제 제출 현황<a href="#" onclick="showPanel\('homework','숙제 현황',null\)">전체보기 →<\/a><\/div>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/,
    function(match) {
        return '\n\n' + gvrContent + '\n\n' + '</div>\n            </div>';
    }
);

// Remove the old panel-homework entirely
html = html.replace(/<!-- ============================\s*PANEL: 숙제 현황 \(GVR\/OMR\)\s*============================ -->[\s\S]*?(?=<!-- ============================\s*PANEL: 성적표\s*============================ -->)/, '');

// 6. Fix the JavaScript for the charts: gvrChart1 to gvrChart4.
// Chart 1 must be indexAxis: 'y'
const scriptGvr1Regex = /const ctxGvr1[\s\S]*?new Chart\(ctxGvr1, \{[\s\S]*?\}\);/;
html = html.replace(scriptGvr1Regex, function(match){
    // Inject indexAxis: 'y' to options
    if(!match.includes("indexAxis")) {
        let ret = match.replace(/options:\s*\{/, "options: { indexAxis: 'y',");
        // swap x and y axes in scales if they exist
        ret = ret.replace(/y:\s*\{([^}]+)\}/, "tempY: {$1}").replace(/x:\s*\{([^}]+)\}/, "y: {$1}").replace(/tempY:\s*\{([^}]+)\}/, "x: {$1}");
        return ret;
    }
    return match;
});

// Remove any broken onclick references to showPanel('homework')
html = html.replace(/onclick="showPanel\('homework','[^']*',null\)"/g, "");

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Migrated my_learning.html GVR panels to main dashboard');
