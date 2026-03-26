const fs = require('fs');

let html = fs.readFileSync('my_learning.html', 'utf8');

// 1. Extract 100-bar chart block
const chart100StartStr = '<!-- Chart 1: 문항별 상세 분석 및 오답률 -->';
const chart100EndStr = '<div class="dash-card" style="margin-top:25px;">'; // This is right after the 100 bar chart closes its panel?
// Wait, the 100-bar chart was injected inside panel-homework.
// Let's use regex to extract it safely.
const extract100Regex = /(<!-- Chart 1: 문항별 상세 분석 및 오답률 -->[\s\S]*?)(?=<!-- 2\. Homework Status Section -->|<div class="dash-card" style="margin-top:25px;">)/;
let match100 = extract100Regex.exec(html);
if (!match100) {
    console.error("100 chart not found");
    process.exit(1);
}
let chart100Html = match100[1];
// Remove it from current location (panel-homework)
html = html.replace(extract100Regex, '');

// 2. Extract 4-panel grid from panel-homework
const extract4ChartsRegex = /(<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:25px;">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/;
let match4 = extract4ChartsRegex.exec(html);
if (!match4) {
    // try a slightly different marker if the closing div count is different
    const fallbackRegex = /(<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:25px;">[\s\S]*?<!-- Chart 4: Error Types -->[\s\S]*?<\/canvas><\/div>\s*<\/div>\s*<\/div>)/;
    match4 = fallbackRegex.exec(html);
}
if(!match4){
    console.error("4 charts not found");
    process.exit(1);
}
let charts4Html = match4[1];

// Copy the 4 charts and rename IDs for teacher panel
let tCharts4Html = charts4Html.replace(/id="gvrChart1"/g, 'id="tGvrChart1"')
                              .replace(/id="gvrChart2"/g, 'id="tGvrChart2"')
                              .replace(/id="gvrChart3"/g, 'id="tGvrChart3"')
                              .replace(/id="gvrChart4"/g, 'id="tGvrChart4"');

// 3. Create new panel-teacherGvr
const teacherGvrPanel = `
            <!-- ============================
                 PANEL: 강사 GVR 상세 분석
            ============================ -->
            <div class="content-panel" id="panel-teacherGvr">
                <div class="dash-welcome" style="background:linear-gradient(135deg, #1e2d5a, #4A89DC); padding:20px 30px; margin-bottom:25px; border-radius:16px; color:white;">
                    <h2 style="font-size:22px; font-weight:900; margin:0;"><i class="fas fa-microscope text-teal"></i> 강사용 GVR 통합 분석 대시보드</h2>
                    <p style="font-size:14px; opacity:0.8; margin-top:5px; margin-bottom:0;">우리 반 전체 학생의 GVR(문법/어휘/독해/듣기) 취약점 및 문항별 상세 오답 분석</p>
                </div>
                
                ${tCharts4Html}
                
                ${chart100Html}
            </div>
`;

// Insert the new panel before panel-studentMgmt
html = html.replace('<!-- ============================\n                 PANEL: 학생 관리\n            ============================ -->', 
                    teacherGvrPanel + '\n            <!-- ============================\n                 PANEL: 학생 관리\n            ============================ -->');

// 4. Add link to teacherNav
const teacherNavLink = `
                <div class="nav-section-label">GVR 심층 분석</div>
                <a class="nav-item" href="#" onclick="showPanel('teacherGvr', '강사용 GVR 대시보드', this)">
                    <div class="nav-icon"><i class="fas fa-chart-area"></i></div>
                    GVR 통합 분석
                </a>
`;
// Insert before "콘텐츠 통합관리"
html = html.replace('<div class="nav-section-label">콘텐츠 통합관리</div>', teacherNavLink + '\n                <div class="nav-section-label">콘텐츠 통합관리</div>');

// 5. Add JS to render tGvrCharts
// We'll duplicate the gvrChart initialization block
const extractJsRegex = /(\/\/ 1\. Chart 1: Error Rate by Question[\s\S]*?\}\s*\}\s*\)\s*;\s*\})/m;
// Actually, extracting all 4 charts JS is tricky with regex. Let's just append custom JS at the end of the script tag!
const tGvrJsCode = `
            // ================= Teacher GVR Charts =================
            const tCtx1 = document.getElementById('tGvrChart1');
            if(tCtx1) { new Chart(tCtx1, { type:'bar', data: { labels: ['Q1','Q2','Q3','Q4','Q5'], datasets:[{label:'학급 오답률', data:[32,60,45,40,75], backgroundColor:'#E91E63', borderRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{min:0,max:100}} } }); }
            
            const tCtx2 = document.getElementById('tGvrChart2');
            if(tCtx2) { new Chart(tCtx2, { type:'line', data: { labels: ['AT1','AT2','AT3','AT4','AT5'], datasets:[{label:'학급 평균 성적', data:[75,78,76,82,85], borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.1)', fill:true, tension:0.3, pointRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{min:0,max:100}} } }); }
            
            const tCtx3 = document.getElementById('tGvrChart3');
            if(tCtx3) { new Chart(tCtx3, { type:'radar', data: { labels: ['듣기','문법','어휘','독해'], datasets:[{label:'전체 평균', data:[75,68,72,70], borderColor:'#888', backgroundColor:'rgba(136,136,136,0.1)', pointBackgroundColor:'#888'},{label:'학급 평균', data:[82,65,78,74], borderColor:'#10b981', backgroundColor:'rgba(16,185,129,0.2)', pointBackgroundColor:'#10b981'}] }, options:{ responsive:true, maintainAspectRatio:false, scales:{r:{min:0,max:100,ticks:{display:false}}} } }); }

            const tCtx4 = document.getElementById('tGvrChart4');
            if(tCtx4) { new Chart(tCtx4, { type:'bar', data: { labels: ['추론','세부내용','주제','어법','문맥'], datasets:[{label:'우리반 오답률', data:[45,30,25,15,5], backgroundColor:'#4FC1E9', borderRadius:4}] }, options:{ indexAxis:'y', responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{min:0,max:100}} } }); }
`;

html = html.replace(/(\n\s*\}\);\s*<\/script>\s*<\/body>)/, '\n' + tGvrJsCode + '$1');

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Teacher GVR Panel successfully created.');
