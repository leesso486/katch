const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

const targetStart = '<div class="content-panel" id="panel-teacherDash">';
const targetIdxStart = html.indexOf(targetStart);

if (targetIdxStart !== -1) {
    const targetSubstringStart = targetIdxStart + targetStart.length;
    const endPanelStr = '<div class="content-panel" id="panel-studentMgmt">';
    const targetIdxEnd = html.indexOf(endPanelStr, targetSubstringStart);
    
    if (targetIdxEnd !== -1) {
        let newContent = `
                <div class="dash-welcome" style="background:linear-gradient(135deg,#1a237e,#283593); position:relative; overflow:hidden;">
                    <div style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0.1; background-image:radial-gradient(circle at 50% 50%, #fff 2px, transparent 2px); background-size:30px 30px; z-index:0;"></div>
                    <div class="dw-left" style="position:relative; z-index:1;">
                        <h2>이은혜 강사님, 종합 GVR 현황 📊</h2>
                        <p style="color:#bbdefb;">[고1 정규 내신 특강반] 의 최근 1주차 GVR 과제 심층 분석 데이터입니다.</p>
                    </div>
                    <div class="dw-streak" style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); z-index:1; position:relative;">
                        <i class="fas fa-users"></i> 분석 대상: 6명
                    </div>
                </div>

                <!-- 1. Domain Filter -->
                <div style="background: white; border-radius: 12px; border: 1px solid #e0e4e8; padding: 20px; margin-bottom: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap: 15px;">
                        <h3 style="font-size:16px; font-weight:800; color:#111; margin:0;"><i class="fas fa-filter text-blue"></i> 영역 (Domain) </h3>
                        <div class="target-switch" style="display:inline-flex; background:#f0f2f5; border-radius:30px; padding:4px;">
                            <a href="#" style="padding:6px 18px; border-radius:20px; color:white; background:#283593; text-decoration:none; font-weight:800; font-size:13px; box-shadow:0 2px 5px rgba(0,0,0,0.1);" onclick="return false;">전체 (All)</a>
                            <a href="#" style="padding:6px 18px; border-radius:20px; color:#555; background:transparent; text-decoration:none; font-weight:800; font-size:13px;" onclick="return false;">RC (독해)</a>
                            <a href="#" style="padding:6px 18px; border-radius:20px; color:#555; background:transparent; text-decoration:none; font-weight:800; font-size:13px;" onclick="return false;">GR (문법)</a>
                            <a href="#" style="padding:6px 18px; border-radius:20px; color:#555; background:transparent; text-decoration:none; font-weight:800; font-size:13px;" onclick="return false;">VO (어휘)</a>
                        </div>
                    </div>
                    <div style="font-size:13px; font-weight:bold; color:#777; background:#f9f9f9; padding:8px 15px; border-radius:20px; border:1px solid #eee;">
                        <i class="fas fa-calendar-check"></i> 데이터 기준: 2024년 10월 3주차
                    </div>
                </div>

                <!-- 2. Error Rate Vertical Bar Chart (Scrollable) -->
                <div style="background: white; border-radius: 12px; border: 1px solid #e0e4e8; padding: 25px; margin-bottom: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                    <div class="flex-between mb-15">
                        <h3 style="font-size:18px; font-weight:800; color:#1a237e; margin:0;"><i class="fas fa-chart-bar"></i> 문항별 학급 오답률 (Error Rate)</h3>
                        <button class="btn-sm btn-outline-gray" style="font-weight:bold;"><i class="fas fa-download"></i> 차트 다운로드</button>
                    </div>
                    <p style="font-size:13px; color:#666; margin-bottom:20px;">각 문항의 전체 학생 대비 오답률을 나타냅니다. 오답률이 60%를 초과하는 문항은 <span style="color:#e91e63; font-weight:bold;">빨간색</span> 으로 표시됩니다.</p>
                    
                    <div style="width:100%; overflow-x:auto; padding-bottom:15px; border-bottom:1px solid #eee;" class="custom-scrollbar">
                        <div id="dynamic-error-chart" style="display:flex; align-items:flex-end; gap:20px; height:200px; padding-top:20px; min-width: 1200px;">
                            <!-- Bars injected by script below -->
                        </div>
                    </div>
                </div>

                <!-- 3. Student Answer Distribution Table -->
                <div style="background: white; border-radius: 12px; border: 1px solid #e0e4e8; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                    <div class="flex-between mb-15">
                        <h3 style="font-size:18px; font-weight:800; color:#1a237e; margin:0;"><i class="fas fa-sitemap"></i> 문항별 학생 답안 분포 (Distribution)</h3>
                        <div style="font-size:12px; color:#666; background:#fff3e0; padding:6px 12px; border-radius:6px; font-weight:bold; border:1px solid #ffe0b2;">
                            <span style="display:inline-block; width:10px; height:10px; background:#e8f5e9; border:1px solid #4caf50; border-radius:50%; margin-right:5px; vertical-align:middle;"></span>정답 (초록 배경)
                        </div>
                    </div>
                    
                    <div style="overflow-x:auto;">
                        <table style="width:100%; text-align:center; border-collapse:collapse; font-size:14px;">
                            <thead>
                                <tr style="background:#f5f6f8; border-top:2px solid #ccc; border-bottom:1px solid #ccc;">
                                    <th style="padding:15px 10px; color:#333;">문항</th>
                                    <th style="padding:15px 10px; color:#333;">영역</th>
                                    <th style="padding:15px 10px; color:#333;">난이도</th>
                                    <th style="padding:15px 10px; color:#42a5f5; width:15%;">Option A</th>
                                    <th style="padding:15px 10px; color:#42a5f5; width:15%;">Option B</th>
                                    <th style="padding:15px 10px; color:#42a5f5; width:15%;">Option C</th>
                                    <th style="padding:15px 10px; color:#42a5f5; width:15%;">Option D</th>
                                </tr>
                            </thead>
                            <tbody id="dynamic-distribution-table">
                                <!-- Table rows injected by script below -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div style="height: 30px;"></div>

                <script>
                    document.addEventListener("DOMContentLoaded", () => {
                        const chartContainer = document.getElementById("dynamic-error-chart");
                        const tableContainer = document.getElementById("dynamic-distribution-table");
                        if(!chartContainer || !tableContainer) return;
                        
                        let chartHtml = "";
                        let tableHtml = "";
                        const domains = ["RC", "GR", "RC", "VO"];
                        const diffs = ["하", "중", "상", "최상"];

                        for(let i=1; i<=40; i++) {
                            // Chart Logic
                            const rate = Math.floor(Math.random() * 85) + 5;
                            const isDanger = rate >= 60;
                            const color = isDanger ? "linear-gradient(to top, #f48fb1, #e91e63)" : "linear-gradient(to top, #90caf9, #2196f3)";
                            
                            chartHtml += \`
                                <div style="display:flex; flex-direction:column; align-items:center; flex:1;">
                                    <div style="font-size:11px; font-weight:900; color:\${isDanger ? '#e91e63' : '#333'}; margin-bottom:5px;">\${rate}%</div>
                                    <div style="width:100%; max-width:18px; height:150px; background:#f4f6f9; border-radius:10px; position:relative; overflow:hidden;">
                                        <div style="position:absolute; bottom:0; left:0; width:100%; height:\${rate}%; background:\${color}; border-radius:10px; transition: height 1.5s cubic-bezier(0.22, 1, 0.36, 1); min-height:5%;"></div>
                                    </div>
                                    <div style="font-size:12px; font-weight:bold; color:#555; margin-top:10px;">Q\${i}</div>
                                </div>
                            \`;

                            // Table Logic
                            if(i <= 5) {
                                const domain = domains[i % 4];
                                const diff = diffs[i % 4];
                                const diffColor = (diff === '중') ? '#3f51b5' : (diff === '상') ? '#e91e63' : (diff === '최상') ? '#ef6c00' : '#4caf50';
                                const diffBg = (diff === '중') ? '#e8eaf6' : (diff === '상') ? '#fce4ec' : (diff === '최상') ? '#fff3e0' : '#e8f5e9';
                                
                                const a = Math.floor(Math.random() * 20);
                                const c = Math.floor(Math.random() * 30);
                                const d = Math.floor(Math.random() * 20);
                                const b = 100 - a - c - d;
                                
                                tableHtml += \`
                                <tr style="border-bottom:1px solid #eee;">
                                    <td style="padding:12px 10px; font-weight:bold;">Q\${i}</td><td style="color:#777;">\${domain}</td><td><span style="background:\${diffBg}; color:\${diffColor}; padding:3px 8px; border-radius:4px; font-size:12px;">\${diff}</span></td>
                                    <td>\${a}%</td>
                                    <td style="background:#e8f5e9; font-weight:bold; color:#2e7d32; border:1px solid #81c784;"><strong>\${b}% (정답)</strong></td>
                                    <td \${c > 25 ? 'style="background:#ffebee; color:#d32f2f; font-weight:bold;"' : ''}>\${c}%\${c > 25 ? ' (오답多)' : ''}</td>
                                    <td>\${d}%</td>
                                </tr>
                                \`;
                            }
                        }
                        
                        tableHtml += \`<tr><td colspan="7" style="padding:15px; color:#888; font-size:13px; text-align:center;">... 이하 동일 (총 40문항 데이터 자동 계산됨)</td></tr>\`;
                        
                        chartContainer.innerHTML = chartHtml;
                        tableContainer.innerHTML = tableHtml;
                    });
                </script>
            `;
            
        let newFinalHtml = html.substring(0, targetSubstringStart) + "\\n" + newContent + "\\n            " + html.substring(targetIdxEnd);
        fs.writeFileSync('my_learning.html', newFinalHtml, 'utf8');
        console.log("Successfully replaced panel-teacherDash content with new GVR Analytics");
    } else {
        console.log("Could not find end of panel-teacherDash");
    }
} else {
    console.log("Could not find panel-teacherDash start element");
}
