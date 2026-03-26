const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

const sCharts4Html = `
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:25px;">
                        <!-- Chart 1: Error Rate by Question -->
                        <div style="background:#fff; border:1px solid #e0e4e8; border-radius:12px; padding:20px; box-shadow:0 4px 6px rgba(0,0,0,0.04);">
                            <div style="font-size:15px; font-weight:800; color:#333; margin-bottom:15px; display:flex; align-items:center; gap:6px;"><i class="fas fa-search text-blue"></i> 전체 문항 오답률 현황 (GR 영역)</div>
                            <div style="height:220px; width:100%; position:relative;"><canvas id="gvrChart1"></canvas></div>
                        </div>
                        
                        <!-- Chart 2: Score Trend -->
                        <div style="background:#fff; border:1px solid #e0e4e8; border-radius:12px; padding:20px; box-shadow:0 4px 6px rgba(0,0,0,0.04);">
                            <div style="font-size:15px; font-weight:800; color:#333; margin-bottom:15px; display:flex; align-items:center; gap:6px;"><i class="fas fa-chart-line text-green"></i> 나의 성적 추이 (최근 5회 과제)</div>
                            <div style="height:220px; width:100%; position:relative;"><canvas id="gvrChart2"></canvas></div>
                        </div>
                        
                        <!-- Chart 3: Domain Average Comparison -->
                        <div style="background:#fff; border:1px solid #e0e4e8; border-radius:12px; padding:20px; box-shadow:0 4px 6px rgba(0,0,0,0.04);">
                            <div style="font-size:15px; font-weight:800; color:#333; margin-bottom:15px; display:flex; align-items:center; gap:6px;"><i class="fas fa-chart-bar text-teal"></i> 영역별 전체 평균 vs. 나의 평균 비교</div>
                            <div style="height:220px; width:100%; position:relative;"><canvas id="gvrChart3"></canvas></div>
                        </div>
                        
                        <!-- Chart 4: Error Types -->
                        <div style="background:#fff; border:1px solid #e0e4e8; border-radius:12px; padding:20px; box-shadow:0 4px 6px rgba(0,0,0,0.04);">
                            <div style="font-size:15px; font-weight:800; color:#333; margin-bottom:15px; display:flex; align-items:center; gap:6px;"><i class="fas fa-layer-group text-purple"></i> 나의 오답 유형 vs. 전체 오답 유형 TOP 3</div>
                            <div style="height:220px; width:100%; position:relative;"><canvas id="gvrChart4"></canvas></div>
                        </div>
                    </div>
`;

const tCharts4Html = `
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:25px;">
                        <!-- Chart 1: Error Rate by Question -->
                        <div style="background:#fff; border:1px solid #e0e4e8; border-radius:12px; padding:20px; box-shadow:0 4px 6px rgba(0,0,0,0.04);">
                            <div style="font-size:15px; font-weight:800; color:#333; margin-bottom:15px; display:flex; align-items:center; gap:6px;"><i class="fas fa-search text-blue"></i> 학급 문항 오답률 현황 (GR 영역)</div>
                            <div style="height:220px; width:100%; position:relative;"><canvas id="tGvrChart1"></canvas></div>
                        </div>
                        
                        <!-- Chart 2: Score Trend -->
                        <div style="background:#fff; border:1px solid #e0e4e8; border-radius:12px; padding:20px; box-shadow:0 4px 6px rgba(0,0,0,0.04);">
                            <div style="font-size:15px; font-weight:800; color:#333; margin-bottom:15px; display:flex; align-items:center; gap:6px;"><i class="fas fa-chart-line text-green"></i> 학급 평균 성적 추이 (최근 5회)</div>
                            <div style="height:220px; width:100%; position:relative;"><canvas id="tGvrChart2"></canvas></div>
                        </div>
                        
                        <!-- Chart 3: Domain Average Comparison -->
                        <div style="background:#fff; border:1px solid #e0e4e8; border-radius:12px; padding:20px; box-shadow:0 4px 6px rgba(0,0,0,0.04);">
                            <div style="font-size:15px; font-weight:800; color:#333; margin-bottom:15px; display:flex; align-items:center; gap:6px;"><i class="fas fa-chart-bar text-teal"></i> 영역별 전체 평균 vs. 우리 반 평균 비교</div>
                            <div style="height:220px; width:100%; position:relative;"><canvas id="tGvrChart3"></canvas></div>
                        </div>
                        
                        <!-- Chart 4: Error Types -->
                        <div style="background:#fff; border:1px solid #e0e4e8; border-radius:12px; padding:20px; box-shadow:0 4px 6px rgba(0,0,0,0.04);">
                            <div style="font-size:15px; font-weight:800; color:#333; margin-bottom:15px; display:flex; align-items:center; gap:6px;"><i class="fas fa-layer-group text-purple"></i> 우리 반 오답 유형 vs. 전체 오답 유형 TOP 3</div>
                            <div style="height:220px; width:100%; position:relative;"><canvas id="tGvrChart4"></canvas></div>
                        </div>
                    </div>
`;

const dashWelcomeHtml = `
                <div class="dash-welcome" style="background:linear-gradient(135deg, #2a3f54, #1a237e); padding:20px 30px; margin-bottom:25px; border-radius:16px; color:white;">
                    <h2 style="font-size:22px; font-weight:900; margin:0;"><i class="fas fa-graduation-cap text-teal"></i> 김지민 학생, 환영합니다!</h2>
                    <p style="font-size:14px; opacity:0.8; margin-top:5px; margin-bottom:0;">오늘도 KNS와 함께 목표를 향해 달려보아요!</p>
                </div>
`;

// Replace panel-homework content without touching the outer div
let hwStart = html.indexOf('<div class="content-panel" id="panel-homework">');
if (hwStart === -1) hwStart = html.indexOf('<div class="content-panel active" id="panel-homework">');

if (hwStart > -1) {
    let innerStart = html.indexOf('>', hwStart) + 1;
    let hwEnd = html.indexOf('<!-- 2. Homework Status Section -->', innerStart);
    
    if (hwEnd > -1) {
        html = html.substring(0, innerStart) + '\n' + dashWelcomeHtml + '\n' + sCharts4Html + '\n' + html.substring(hwEnd);
    }
}

// Ensure chart initialization logic is injected before </script> at the bottom
const chartInitCode = `
            // ================= 4 Summary Charts (Student) =================
            const ctx1 = document.getElementById('gvrChart1');
            if(ctx1) { new Chart(ctx1, { type:'bar', data: { labels: ['Q1','Q2','Q3','Q4','Q5'], datasets:[{label:'나의 오답률', data:[32,60,45,40,75], backgroundColor:'#E91E63', borderRadius:4}] }, options:{ indexAxis:'y', responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{min:0,max:100}} } }); }
            
            const ctx2 = document.getElementById('gvrChart2');
            if(ctx2) { new Chart(ctx2, { type:'line', data: { labels: ['3/2','3/9','3/16','3/23','3/30'], datasets:[{label:'나의 점수', data:[65,70,62,75,80], borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.1)', fill:true, tension:0.3, pointRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{min:0,max:100}} } }); }
            
            const ctx3 = document.getElementById('gvrChart3');
            if(ctx3) { new Chart(ctx3, { type:'bar', data: { labels: ['독해력','어휘','문법'], datasets:[{label:'전체 평균', data:[75,80,65], backgroundColor:'#4A89DC', borderRadius:4},{label:'나의 평균', data:[68,75,72], backgroundColor:'#F6BB42', borderRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, scales:{y:{min:0,max:100}} } }); }

            const ctx4 = document.getElementById('gvrChart4');
            if(ctx4) { new Chart(ctx4, { type:'bar', data: { labels: ['추론','독해력','문법','논리'], datasets:[{label:'전체', data:[40,35,15,30], backgroundColor:'#4A89DC', borderRadius:4}, {label:'나의', data:[40,35,15,45], backgroundColor:'#F6BB42', borderRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, scales:{y:{min:0,max:100}} } }); }

            // ================= Teacher GVR Charts =================
            const tCtx1 = document.getElementById('tGvrChart1');
            if(tCtx1) { new Chart(tCtx1, { type:'bar', data: { labels: ['Q1','Q2','Q3','Q4','Q5'], datasets:[{label:'학급 오답률', data:[32,60,45,40,75], backgroundColor:'#E91E63', borderRadius:4}] }, options:{ indexAxis:'y', responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{min:0,max:100}} } }); }
            
            const tCtx2 = document.getElementById('tGvrChart2');
            if(tCtx2) { new Chart(tCtx2, { type:'line', data: { labels: ['3/2','3/9','3/16','3/23','3/30'], datasets:[{label:'학급 평균 성적', data:[75,78,76,82,85], borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.1)', fill:true, tension:0.3, pointRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{min:0,max:100}} } }); }
            
            const tCtx3 = document.getElementById('tGvrChart3');
            if(tCtx3) { new Chart(tCtx3, { type:'bar', data: { labels: ['독해력','어휘','문법'], datasets:[{label:'전체 평균', data:[75,80,65], backgroundColor:'#4A89DC', borderRadius:4},{label:'학급 평균', data:[82,85,78], backgroundColor:'#8CC152', borderRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, scales:{y:{min:0,max:100}} } }); }

            const tCtx4 = document.getElementById('tGvrChart4');
            if(tCtx4) { new Chart(tCtx4, { type:'bar', data: { labels: ['추론','독해력','문법','논리'], datasets:[{label:'전체', data:[40,35,15,30], backgroundColor:'#4A89DC', borderRadius:4}, {label:'학급', data:[35,30,12,25], backgroundColor:'#8CC152', borderRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, scales:{y:{min:0,max:100}} } }); }
`;

let scriptTag = html.lastIndexOf('</script>');
if (!html.includes('gvrChart1')) {
    html = html.substring(0, scriptTag) + chartInitCode + '\n' + html.substring(scriptTag);
}

// Build panel-teacherGvr if it doesn't exist
if (!html.includes('id="panel-teacherGvr"')) {
    let teacherGvrHtml = `
            <!-- ============================
                 PANEL: 강사 GVR 상세 분석
            ============================ -->
            <div class="content-panel" id="panel-teacherGvr">
                <div class="dash-welcome" style="background:linear-gradient(135deg, #1e2d5a, #4A89DC); padding:20px 30px; margin-bottom:25px; border-radius:16px; color:white;">
                    <h2 style="font-size:22px; font-weight:900; margin:0;"><i class="fas fa-microscope text-teal"></i> 강사용 GVR 통합 분석 대시보드</h2>
                    <p style="font-size:14px; opacity:0.8; margin-top:5px; margin-bottom:0;">우리 반 전체 학생의 GVR(문법/어휘/독해/듣기) 취약점 및 문항별 상세 오답 분석</p>
                </div>
                
                ${tCharts4Html}
            </div>
`;
    let studentMgmtStart = html.indexOf('<!-- ============================', html.indexOf('id="panel-studentMgmt"') - 50);
    if(studentMgmtStart > -1) {
        html = html.substring(0, studentMgmtStart) + teacherGvrHtml + '\n\n' + html.substring(studentMgmtStart);
    }
}

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Injected GVR dashboard successfully');
