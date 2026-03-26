const fs = require('fs');

const gvrPath = 'dashboard_gvr.html';
const mlPath = 'my_learning.html';

if(!fs.existsSync(gvrPath) || !fs.existsSync(mlPath)) {
    console.log("Files missing");
    process.exit(1);
}

let gvrHtml = fs.readFileSync(gvrPath, 'utf8');
let mlHtml = fs.readFileSync(mlPath, 'utf8');

// 1. Extract HTML Block
// Chart 1: 문항별 상세 분석 및 오답률
const htmlStartMarker = '<!-- Chart 1: 문항별 상세 분석 및 오답률 -->';
const htmlEndMarker = '<!-- Right Panel (Charts 2 & 4) -->';

let htmlBlock = '';
const gvrLines = gvrHtml.split('\n');
let capturing = false;
for(let line of gvrLines) {
    if(line.includes(htmlStartMarker)) capturing = true;
    if(line.includes(htmlEndMarker)) capturing = false;
    if(capturing) htmlBlock += line + '\n';
}

// Remove the extra closing </div> inside that block if any? Wait, lines 459 and 460 are closing </div>
// The snippet I see has:
// 457:                         </div>
// 458: 
// 459:                     </div>
// 460:                 </div>
// 462:                 <!-- Right Panel (Charts 2 & 4) -->
// We only want up to line 459!
htmlBlock = htmlBlock.replace(/<\/div>\s*<\/div>\s*$/, '</div>\n');

// 2. Extract JS Block
// Starts at: window.toggleStudentList
// Ends after window.sortChart
let jsBlock = '';
capturing = false;
for(let line of gvrLines) {
    if(line.includes('window.toggleStudentList = function')) capturing = true;
    if(line.includes('window.switchTTab = function')) {
        capturing = false;
        break;
    }
    if(capturing) jsBlock += line + '\n';
}
// Note: Document loaded listener inside GVR might conflict, but `window.allQuestions` and `renderErrorChart` don't necessarily need exactly DOMContentLoaded if we just paste them inside the script. But wait, `Chart.register(ChartDataLabels);` needs to be run!
// Let's slightly clean up the JS block so it correctly executes in my_learning.js.
// Since my_learning.js has scripts at the bottom, we can just append it.

// 3. Inject CSS Plugin
if(!mlHtml.includes('chartjs-plugin-datalabels')) {
    mlHtml = mlHtml.replace('</head>', '    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>\n</head>');
}

// 4. Inject HTML Block
// We want to inject it inside my_learning.html's panel-homework.
// After the 4-panel grid which ends right before <!-- 2. Homework Status Section -->
// Let's use string replace!
mlHtml = mlHtml.replace(/(<!-- 2\. Homework Status Section -->)/, htmlBlock + '\n                    $1');

// 5. Inject JS Block
// Inside <script> before // Chart section... or just at the very end of <script>
mlHtml = mlHtml.replace(/<\/script>\s*<\/body>/, jsBlock + '\n    </script>\n</body>');

// 6. Save my_learning.html
fs.writeFileSync(mlPath, mlHtml, 'utf8');

// 7. Delete dashboard_gvr.html
fs.unlinkSync(gvrPath);

console.log('Successfully merged details and deleted dashboard_gvr.html');
