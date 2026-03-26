const fs = require('fs');

let html = fs.readFileSync('my_learning.html', 'utf8');

// The exact section we want to replace starts AFTER panel-homework
let hwStart = html.indexOf('id="panel-homework"');
if (hwStart === -1) {
    console.log("Error: panel-homework not found!");
    process.exit(1);
}

let startHTML = html.indexOf('<div class="dash-welcome"', hwStart);
let endHTML = html.indexOf('<!-- 2. Homework Status Section -->', startHTML);

if (startHTML !== -1 && endHTML !== -1) {
    let newDashboardHTML = `
                <!-- Pixel-Perfect Dashboard Replication -->
                <div style="background:#f0f4f8; padding:20px; border-radius:15px; margin-bottom:25px;">
                    <!-- Header -->
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="background:#42a5f5; color:white; width:30px; height:30px; border-radius:8px; display:flex; justify-content:center; align-items:center;"><i class="fas fa-chart-bar"></i></div>
                            <h2 style="font-size:18px; font-weight:900; color:#111; margin:0;">학생 성적 및 오답 분석 대시보드 (김지민 학생)</h2>
                        </div>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <img src="https://i.pravatar.cc/150?img=47" style="width:38px; height:38px; border-radius:50%; border:2px solid #fff; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
                            <div style="text-align:right; line-height:1.2;">
                                <div style="font-size:13px; font-weight:800; color:#111;">김지민 학생 <i class="fas fa-chevron-down" style="font-size:10px; color:#888; margin-left:3px;"></i></div>
                                <div style="font-size:11px; color:#888;">2026.03.03</div>
                            </div>
                        </div>
                    </div>

                    <!-- Grid -->
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                        
                        <!-- Chart 1: HTML Progress Bars -->
                        <div style="background:#fff; border-radius:12px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                            <div style="font-size:14px; font-weight:800; color:#111; margin-bottom:15px; display:flex; align-items:center; gap:6px;">
                                <i class="fas fa-search" style="color:#64b5f6;"></i> 전체 문항 오답률 현황 (GR 영역)
                            </div>
                            
                            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:15px;">
                                <!-- Col 1 -->
                                <div>
                                    <div style="font-size:11px; font-weight:bold; color:#777; margin-bottom:12px; text-align:center;">전체 문항 오답률 현황</div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q1</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:29%; background:#64b5f6; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">29%</div></div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q2</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:78%; background:#42a5f5; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">78%</div></div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q3</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:45%; background:#2196F3; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">45%</div></div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q4</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:45%; background:#1976D2; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">45%</div></div>
                                    </div>
                                    <!-- X-Axis Labels -->
                                    <div style="display:flex; justify-content:space-between; padding-left:26px; font-size:9px; color:#999; margin-top:-2px;">
                                        <span>0</span><span>20</span><span>40</span><span>60</span><span>80</span><span>100</span>
                                    </div>
                                    <div style="text-align:center; font-size:10px; color:#777; margin-top:3px; padding-left:26px;">오답률 (%)</div>
                                </div>

                                <!-- Col 2 -->
                                <div>
                                    <div style="font-size:11px; font-weight:bold; color:#777; margin-bottom:12px; text-align:center;">전체 문항 오답률 현황</div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q4</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:45%; background:#64b5f6; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">45%</div></div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q5</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:67%; background:#42a5f5; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">67%</div></div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q6</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:82%; background:#2196F3; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">82%</div></div>
                                    </div>
                                    <div style="height:30px;"></div>
                                    <!-- X-Axis Labels -->
                                    <div style="display:flex; justify-content:space-between; padding-left:26px; font-size:9px; color:#999; margin-top:-2px;">
                                        <span>0</span><span>20</span><span>40</span><span>60</span><span>80</span><span>100</span>
                                    </div>
                                    <div style="text-align:center; font-size:10px; color:#777; margin-top:3px; padding-left:26px;">오답률 (%)</div>
                                </div>

                                <!-- Col 3 -->
                                <div>
                                    <div style="font-size:11px; font-weight:bold; color:#777; margin-bottom:12px; text-align:center;">전체 문항 오답률 현황</div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q7</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:78%; background:#64b5f6; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">78%</div></div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q8</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:91%; background:#42a5f5; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">91%</div></div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q9</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:63%; background:#2196F3; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">63%</div></div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px; font-size:12px; font-weight:bold;">
                                        <div style="width:20px; color:#555;">Q10</div>
                                        <div style="flex:1; background:#f5f7fa; height:20px;"><div style="width:47%; background:#1976D2; height:100%; color:white; font-size:10px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px;">47%</div></div>
                                    </div>
                                    <!-- X-Axis Labels -->
                                    <div style="display:flex; justify-content:space-between; padding-left:26px; font-size:9px; color:#999; margin-top:-2px;">
                                        <span>0</span><span>20</span><span>40</span><span>60</span><span>80</span><span>100</span>
                                    </div>
                                    <div style="text-align:center; font-size:10px; color:#777; margin-top:3px; padding-left:26px;">오답률 (%)</div>
                                </div>
                            </div>
                        </div>

                        <!-- Chart 2: Score Trend -->
                        <div style="background:#fff; border-radius:12px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                            <div style="font-size:14px; font-weight:800; color:#111; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
                                <div><i class="fas fa-chart-line" style="color:#81c784; margin-right:5px;"></i> 나의 성적 추이 (최근 5회 과제)</div>
                                <div style="display:flex; gap:10px; font-size:11px; font-weight:bold; color:#555;">
                                    <div style="display:flex; align-items:center; gap:4px;"><div style="width:10px; height:10px; background:#42a5f5;"></div>나의 점수</div>
                                    <div style="display:flex; align-items:center; gap:4px;"><div style="width:20px; height:2px; background:#ff9800; position:relative;"><div style="width:6px; height:6px; background:#ff9800; border-radius:50%; position:absolute; top:-2px; left:7px;"></div></div>전체 평균</div>
                                </div>
                            </div>
                            <div style="height:200px; width:100%; position:relative;"><canvas id="mockChart2"></canvas></div>
                        </div>

                        <!-- Chart 3: Domain Average -->
                        <div style="background:#fff; border-radius:12px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                            <div style="font-size:14px; font-weight:800; color:#111; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
                                <div><i class="fas fa-chart-bar" style="color:#4db6ac; margin-right:5px;"></i> 영역별 전체 평균 vs. 나의 평균 비교</div>
                                <div style="display:flex; gap:10px; font-size:11px; font-weight:bold; color:#555;">
                                    <div style="display:flex; align-items:center; gap:4px;"><div style="width:10px; height:10px; background:#42a5f5;"></div>전체 평균</div>
                                    <div style="display:flex; align-items:center; gap:4px;"><div style="width:10px; height:10px; background:#ffb74d;"></div>나의 평균</div>
                                </div>
                            </div>
                            <div style="height:200px; width:100%; position:relative;"><canvas id="mockChart3"></canvas></div>
                        </div>
                        
                        <!-- Chart 4: Error Types Split -->
                        <div style="background:#fff; border-radius:12px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                            <div style="font-size:14px; font-weight:800; color:#111; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
                                <div><i class="fas fa-layer-group" style="color:#ab47bc; margin-right:5px;"></i> 나의 오답 유형 vs. 전체 오답 유형 TOP 3</div>
                                <div style="display:flex; gap:10px; font-size:11px; font-weight:bold; color:#555;">
                                    <div style="display:flex; align-items:center; gap:4px;"><div style="width:10px; height:10px; background:#42a5f5;"></div>전체</div>
                                    <div style="display:flex; align-items:center; gap:4px;"><div style="width:10px; height:10px; background:#ffb74d;"></div>나의</div>
                                </div>
                            </div>
                            
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; height:200px;">
                                <!-- Left Split: 전체 오답률 -->
                                <div style="position:relative; display:flex; flex-direction:column; height:100%;">
                                    <div style="text-align:center; font-size:11px; font-weight:bold; background:#e3f2fd; padding:3px; border-radius:4px; margin-bottom:10px; color:#1565c0;">**전체 오답률 (%)</div>
                                    <div style="flex:1; position:relative;"><canvas id="mockChart4a"></canvas></div>
                                </div>
                                <!-- Right Split: 나의 오답률 -->
                                <div style="position:relative; display:flex; flex-direction:column; height:100%;">
                                    <div style="text-align:center; font-size:11px; font-weight:bold; background:#fff3e0; padding:3px; border-radius:4px; margin-bottom:10px; color:#e65100;">나의 오답률 (%)</div>
                                    <div style="flex:1; position:relative;"><canvas id="mockChart4b"></canvas></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                `;

    html = html.substring(0, startHTML) + newDashboardHTML + html.substring(endHTML);
} else {
    console.log("Error: start or end tags not found!");
    process.exit(1);
}

// 2. Clear old Chart rendering script from my_learning.html's bottom scripts
let scriptStart = html.indexOf('const gvrCtx1 = document.getElementById(\\\'gvrChart1\\\');');
if (scriptStart !== -1) {
    let oldScriptEnd = html.indexOf('</script>', scriptStart);
    // Remove exactly instructions for gvrChart1, 2, 3, 4
    html = html.replace(/const gvrCtx1[\s\S]*?\} \}\);\n\n/g, '');
    html = html.replace(/const gvrCtx2[\s\S]*?\} \}\);\n\n/g, '');
    html = html.replace(/const gvrCtx3[\s\S]*?\} \}\);\n\n/g, '');
    html = html.replace(/const gvrCtx4[\s\S]*?\} \}\);/g, '');
}

// 3. Add Custom Chart.js Script for Charts 2, 3, 4a, 4b
let replaceTarget = '// ==========================================\n            // Teacher GVR Charts';
if(html.includes(replaceTarget)) {
    let newScripts = `
// ==========================================
// PIXEL PERFECT MOCK CHARTS (Student)
// Custom plugin to draw top labels
const topLabelsPlugin = {
    id: 'topLabels',
    afterDatasetsDraw(chart) {
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((element, index) => {
                ctx.fillStyle = dataset.type === 'line' ? '#333' : '#555';
                ctx.font = 'bold 10px sans-serif';
                ctx.textAlign = 'center';
                const dataString = dataset.data[index] + (dataset.type === 'line' ? '점' : (dataset.isPercent ? '%' : ''));
                let yPos = dataset.type === 'line' ? element.y - 12 : element.y + 14;
                if(dataset.labelPos === 'top') yPos = element.y - 6;
                if (dataset.customTopLabel) yPos = element.y - 8;

                ctx.fillText(dataString, element.x, yPos);
            });
        });
    }
};

const mockChart2 = document.getElementById('mockChart2');
if (mockChart2) {
    new Chart(mockChart2, {
        type: 'bar',
        data: {
            labels: ['3/2', '3/9', '3/16', '3/23', '3/30'],
            datasets: [
                {
                    type: 'line', data: [68, 72, 65, 78, 82], borderColor: '#ff9800', backgroundColor: '#ff9800', borderWidth: 2, pointBackgroundColor: '#ff9800', pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 5, tension: 0.3
                },
                {
                    type: 'bar', data: [65, 70, 62, 75, 80], backgroundColor: '#42a5f5', borderRadius: {topRight: 4, topLeft: 4}, barPercentage: 0.5
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { duration:1000, delay: (ctx) => ctx.dataIndex * 150 },
            layout: { padding: { top: 20 } },
            plugins: { legend: { display: false }, tooltip: { enabled: true } },
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { stepSize: 20, font:{size:10} }, grid:{color:'#f0f0f0'}, title:{display:true, text:'나의 점수 (0-100)', font:{size:10}} },
                x: { grid: {display:false}, ticks:{font:{size:10}} }
            }
        },
        plugins: [topLabelsPlugin]
    });
}

const mockChart3 = document.getElementById('mockChart3');
if (mockChart3) {
    new Chart(mockChart3, {
        type: 'bar',
        data: {
            labels: ['독해력', '어휘', '문법'],
            datasets: [
                { data: [75, 80, 65], backgroundColor: '#42a5f5', borderRadius: {topRight: 4, topLeft: 4}, isPercent: true, customTopLabel: true },
                { data: [68, 75, 72], backgroundColor: '#ffb74d', borderRadius: {topRight: 4, topLeft: 4}, isPercent: true, customTopLabel: true }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { duration:1000, delay: (ctx) => ctx.dataIndex * 150 },
            layout: { padding: { top: 20 } },
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { stepSize: 20, font:{size:10} }, grid:{color:'#f0f0f0'}, title:{display:true, text:'평균 점수 (%)', font:{size:10}} },
                x: { grid: {display:false}, ticks:{font:{size:10}} }
            }
        },
        plugins: [topLabelsPlugin]
    });
}

const mockChart4a = document.getElementById('mockChart4a');
if (mockChart4a) {
    new Chart(mockChart4a, {
        type: 'bar',
        data: {
            labels: ['추론', '독해력', '문법'],
            datasets: [{ data: [40, 35, 15], backgroundColor: '#42a5f5', borderRadius: {topRight: 4, topLeft: 4}, isPercent: true, customTopLabel: true }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { duration:1000, delay: (ctx) => ctx.dataIndex * 150 },
            layout: { padding: { top: 20 } },
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 60, ticks: { stepSize: 20, font:{size:10} }, grid:{color:'#f0f0f0'}, title:{display:true, text:'오답률 (%)', font:{size:10}} },
                x: { grid: {display:false}, ticks:{font:{size:10}} }
            }
        },
        plugins: [topLabelsPlugin]
    });
}

const mockChart4b = document.getElementById('mockChart4b');
if (mockChart4b) {
    new Chart(mockChart4b, {
        type: 'bar',
        data: {
            labels: ['문법', '독해력', '논리'],
            datasets: [{ data: [30, 45, 25], backgroundColor: '#ffb74d', borderRadius: {topRight: 4, topLeft: 4}, isPercent: true, customTopLabel: true }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { duration:1000, delay: (ctx) => ctx.dataIndex * 150 },
            layout: { padding: { top: 20 } },
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 60, ticks: { stepSize: 20, font:{size:10} }, grid:{color:'#f0f0f0'}, position: 'right' },
                x: { grid: {display:false}, ticks:{font:{size:10}} }
            }
        },
        plugins: [topLabelsPlugin]
    });
}

// ==========================================
            // Teacher GVR Charts`;
    html = html.replace(replaceTarget, newScripts);
} else {
   console.log("Could not find Teacher GVR Charts delimiter to inject standard scripts!");
}

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Successfully wrote the pixel perfect layout!');
