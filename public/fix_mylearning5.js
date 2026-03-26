const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

// 1. Add GVR 대시보드 to sidebar
const gvrNavItem = `
                <a class="nav-item" href="#" onclick="showPanel('homework', 'GVR 학습 현황', this)">
                    <div class="nav-icon"><i class="fas fa-book-open"></i></div>
                    GVR 학습 현황
                </a>`;
html = html.replace(/(<a class="nav-item active" href="#" onclick="showPanel\('dashboard', '나의 대시보드', this\)">[\s\S]*?<\/a>)/, '$1' + gvrNavItem);

// 2. Extract the GVR content block that we previously merged into panel-dashboard
const gvrContentRegex = /(<!-- 4-Panel Dashboard Section -->[\s\S]*?<div style="display:flex; gap:15px;">\s*<div style="flex:1;[\s\S]*?<\/div>\s*<div style="flex:1;[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<!-- ============================/g;

// Wait, the end of the restored block was:
//                         <div style="flex:1; ..."> ... </div>
//                     </div>
//                 </div>
//             </div> <!-- closes panel-dashboard -->
// <!-- ============================

let match = /(<!-- 4-Panel Dashboard Section -->[\s\S]*?지난 결과 보기 &rarr;<\/span>\s*<\/div>\s*<\/div>\s*<\/div>)/.exec(html);

if (match) {
    let gvrContent = match[0];
    
    // Remove it from panel-dashboard
    html = html.replace(gvrContent, '');
    
    // Create the new panel-homework
    let panelHomework = `
            <!-- ============================
                 PANEL: 숙제 현황 (GVR/OMR)
            ============================ -->
            <div class="content-panel" id="panel-homework">
                <div class="simple-panel" style="background:#f4f7fa; padding:0;">
                    <div style="padding:30px;">
                        <h3 style="display:flex; justify-content:space-between; align-items:center;">
                            <span><i class="fas fa-book-open"></i> GVR 학습 대시보드</span>
                            <span style="font-size:13px; font-weight:normal; color:#666; background:#fff; padding:5px 12px; border-radius:20px; border:1px solid #ddd;">업데이트: 2026.04.15 14:30</span>
                        </h3>
                        ${gvrContent}
                    </div>
                </div>
            </div>
`;
    
    // Insert panel-homework before panel-diag
    html = html.replace(/(<!-- ============================\s*PANEL: 진단테스트)/, panelHomework + '\n$1');
}

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Restored GVR tab and separate panel');
