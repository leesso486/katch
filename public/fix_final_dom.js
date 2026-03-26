const fs = require('fs');

let html = fs.readFileSync('my_learning.html', 'utf8');

// 1. Fix missing </div> in panel-studentMgmt
// Look for panel-studentMgmt
let stIdx = html.indexOf('id="panel-studentMgmt"');
if(stIdx > -1) {
    let ulIdx = html.indexOf('</ul>', stIdx);
    let divIdx = html.indexOf('</div>', ulIdx);
    // The missing </div> should go right after this </div>
    if (html.substring(divIdx, divIdx + 12).indexOf('</div></div>') === -1) {
        html = html.substring(0, divIdx + 6) + '\n            </div>' + html.substring(divIdx + 6);
    }
}

// 2. Build the Teacher GVR Panel HTML explicitly
// First extract the 4 summary charts HTML
const gridIdx = html.indexOf('<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:25px;">');
const endGridIdx = html.indexOf('<!-- Chart 1', gridIdx); // Actually, the 100-bar chart isn't there anymore.
// We need to find the end of the grid.
let gridHtml = '';
if(gridIdx > -1) {
    let pHomeEnd = html.indexOf('<!-- ============================', gridIdx);
    gridHtml = html.substring(gridIdx, pHomeEnd);
    // Find the last </div> before pHomeEnd
    let lastDiv = gridHtml.lastIndexOf('</div>');
    gridHtml = gridHtml.substring(0, lastDiv + 6); // roughly the end of the grid
}

// Rename chart IDs for teacher
let tCharts4Html = gridHtml.replace(/id="gvrChart1"/g, 'id="tGvrChart1"')
                           .replace(/id="gvrChart2"/g, 'id="tGvrChart2"')
                           .replace(/id="gvrChart3"/g, 'id="tGvrChart3"')
                           .replace(/id="gvrChart4"/g, 'id="tGvrChart4"');

const chart100Html = `
                    <!-- Chart 1: 문항별 상세 분석 및 오답률 -->
                    <div class="dash-panel" style="padding: 20px; background:#fff; border:1px solid #e0e4e8; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.04); margin-bottom:25px;">
                        <div class="panel-title" style="font-size:16px; margin-bottom:15px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
                            <span><i class="fas fa-search" style="color:#5D9CEC;"></i> 문항별 상세 분석 및 오답률 <span style="font-size:12px; font-weight:normal; color:#888;">[최신 2026.03.11 14:30 갱신]</span></span>
                            <div class="gvr-tabs" style="display:flex; gap:8px;">
                                <button class="btn-sm btn-outline-navy active" data-type="ALL" onclick="filterChart('ALL', this)" style="padding:4px 12px; font-size:13px; font-weight:bold; cursor:pointer; background:white; border:1px solid #ddd; border-radius:6px;">전체</button>
                                <button class="btn-sm btn-outline-gray" data-type="LC" onclick="filterChart('LC', this)" style="padding:4px 12px; font-size:13px; font-weight:bold; cursor:pointer; background:white; border:1px solid #ddd; border-radius:6px;">듣기 (LC)</button>
                                <button class="btn-sm btn-outline-gray" data-type="GR" onclick="filterChart('GR', this)" style="padding:4px 12px; font-size:13px; font-weight:bold; cursor:pointer; background:white; border:1px solid #ddd; border-radius:6px;">문법 (기본형식)</button>
                                <button class="btn-sm btn-outline-gray" data-type="VO" onclick="filterChart('VO', this)" style="padding:4px 12px; font-size:13px; font-weight:bold; cursor:pointer; background:white; border:1px solid #ddd; border-radius:6px;">어휘</button>
                                <button class="btn-sm btn-outline-gray" data-type="RC" onclick="filterChart('RC', this)" style="padding:4px 12px; font-size:13px; font-weight:bold; cursor:pointer; background:white; border:1px solid #ddd; border-radius:6px;">독해</button>
                                <button class="btn-sm btn-outline-gray" onclick="sortChart(this)" data-sort="num" style="padding:4px 12px; font-size:13px; font-weight:bold; cursor:pointer; margin-left:15px; background:#f4f6f9; border:1px solid #ddd; border-radius:6px;"><i class="fas fa-sort-amount-down"></i> 오답률순</button>
                            </div>
                        </div>
                        <div style="width: 100%; overflow-x: auto; padding-bottom:10px; border-bottom:1px solid #eee;">
                            <div style="min-width: 1000px; height: 280px;" id="chart-width-container">
                                <canvas id="errorRateChart"></canvas>
                            </div>
                        </div>

                        <!-- Chart 3: 문항 상세 오답 분석 (Detailed) -->
                        <div style="margin-top:20px;" id="q-detail-container">
                            <div style="font-size:15px; font-weight:bold; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                                <span><span id="selected-q-title" style="color:#e91e63;">Q3</span> 문항 상세 오답 분석</span>
                                <button class="btn-sm btn-outline-gray" style="font-size:11px; padding:3px 8px;">실제 문항 및 선택지 보기</button>
                            </div>
                            <table style="width:100%; border-collapse:collapse; border:1px solid #ddd; font-size:13px; text-align:center;">
                                <tr style="background:#f8f9fa;">
                                    <th style="padding:10px; border:1px solid #ddd; width:20%;">선택 문항</th>
                                    <th style="padding:10px; border:1px solid #ddd;">학생의 답안 분포</th>
                                    <th style="padding:10px; border:1px solid #ddd; width:25%;">선택 인원 및 오답자</th>
                                </tr>
                                <tr>
                                    <td rowspan="4" style="border:1px solid #ddd; vertical-align:middle; background:#fff;">
                                        <strong id="selected-q-name">Q3 (GR)</strong><br>
                                        <span style="color:#f44336; font-weight:bold;" id="selected-q-er">오답률 48%</span>
                                    </td>
                                    <td style="border:1px solid #ddd; padding:8px; text-align:left;">
                                        <i class="far fa-circle text-gray-500"></i> a 12%
                                    </td>
                                    <td style="border:1px solid #ddd;">
                                        3명 <button class="btn-sm btn-outline-gray" style="font-size:10px; padding:2px 5px; margin-left:5px;" onclick="toggleStudentList(this)">오답자 보기</button>
                                        <div class="student-list" style="display:none; text-align:left; background:#f5f5f5; padding:5px; border-radius:4px; margin-top:5px; font-size:11px; color:#555;">이영희, 박수민, 최동훈</div>
                                    </td>
                                </tr>
                                <tr style="background:#fff0f2;">
                                    <td style="border:1px solid #ddd; padding:8px; text-align:left; position:relative;">
                                        <span class="badge" style="background:#f44336; color:white; font-size:10px; padding:2px 5px; border-radius:3px; margin-right:5px;">Most</span>
                                        <strong style="color:#d32f2f;">b 48% (H Confused)</strong>
                                        <div style="position:absolute; top:0; left:0; height:100%; width:48%; background:rgba(244,67,54,0.1); z-index:0;"></div>
                                        <span style="position:relative; z-index:1; float:right; font-weight:bold; color:#d32f2f;">48%</span>
                                    </td>
                                    <td style="border:1px solid #ddd; background:#fff0f2;">
                                        <strong>12명</strong> <button class="btn-sm" style="font-size:10px; padding:2px 5px; margin-left:5px; background:white; color:#e91e63; border:1px solid #e91e63;" onclick="toggleStudentList(this)">오답자 보기</button>
                                        <div class="student-list" style="display:none; text-align:left; background:white; padding:5px; border-radius:4px; margin-top:5px; font-size:11px; color:#d32f2f; font-weight:bold;">김지민, 강동원, 조인성, 원빈, 정우성 외 7명</div>
                                    </td>
                                </tr>
                                <tr style="background:#e8f5e9;">
                                    <td style="border:1px solid #ddd; padding:8px; text-align:left; position:relative;">
                                        <i class="fas fa-check-circle" style="color:#4CAF50; margin-right:5px;"></i>
                                        <strong>c 32% (정답)</strong>
                                        <div style="position:absolute; top:0; left:0; height:100%; width:32%; background:rgba(76,175,80,0.1); z-index:0;"></div>
                                    </td>
                                    <td style="border:1px solid #ddd; background:#e8f5e9;">
                                        8명 <span style="font-size:10px; color:#4CAF50; margin-left:5px;">(정답자)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border:1px solid #ddd; padding:8px; text-align:left;">
                                        <i class="far fa-circle text-gray-500"></i> d 8%
                                    </td>
                                    <td style="border:1px solid #ddd;">
                                        2명 <button class="btn-sm btn-outline-gray" style="font-size:10px; padding:2px 5px; margin-left:5px;" onclick="toggleStudentList(this)">오답자 보기</button>
                                        <div class="student-list" style="display:none; text-align:left; background:#f5f5f5; padding:5px; border-radius:4px; margin-top:5px; font-size:11px; color:#555;">송혜교, 전지현</div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
`;

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

// Insert the new panel rigidly right above panel-studentMgmt
let stIdx2 = html.indexOf('id="panel-studentMgmt"');
let pStart = html.lastIndexOf('<!-- ============================', stIdx2);
if(!html.includes('id="panel-teacherGvr"')) {
    html = html.substring(0, pStart) + teacherGvrPanel + '\n' + html.substring(pStart);
}

// Add the nav link in teacherNav just above 콘텐츠 통합관리
let cIdx = html.indexOf('콘텐츠 통합관리');
let navStart = html.lastIndexOf('<div class="nav-section-label"', cIdx);
const teacherNavLink = `                <div class="nav-section-label">GVR 심층 분석</div>
                <a class="nav-item" href="#" onclick="showPanel('teacherGvr', '강사용 GVR 대시보드', this)">
                    <div class="nav-icon"><i class="fas fa-chart-area"></i></div>
                    GVR 통합 분석
                </a>
`;
if(!html.includes("showPanel('teacherGvr'")) {
    html = html.substring(0, navStart) + teacherNavLink + html.substring(navStart);
}

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Fixed missing div and injected Teacher GVR Panel correctly.');
