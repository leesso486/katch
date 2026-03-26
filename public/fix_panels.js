const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

// The Student's 4 summary charts
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

// The Teacher's 4 summary charts
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

// Extract Homework & Report Card HTML dynamically so we don't lose data
let hwStart = html.indexOf('<!-- 2. Homework Status Section -->');
let diagComment = html.indexOf('<!-- ============================', hwStart);
// But wait! Because of the missing div, it might just bleed into panel-diag.
// We just substring up to diagComment.
let homeworkAndReportHtml = html.substring(hwStart, diagComment);
// Fix the trailing divs. Make sure it is exactly balanced. It's basically the inner contents.
// In our structure, we just insert it.
// Wait, we need to balance it individually.
// It has 2 outer containers: "2. Homework" and "3. Report Card" which are just block divs.
// Wait, looking at the DOM earlier:
// <div style="font-size:16px;">과제 제출 현황</div>
// <div class="hw-item">...</div>
// <div style="margin-top:10px;"> ... </div>
// <div style="font-size:16px;">... 성적표 </div>
// <div style="display:flex; gap:15px;">...</div>
// We can just clean up the trailing </div>s.
homeworkAndReportHtml = homeworkAndReportHtml.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*$/, '</div></div>');
// Actually, I'll just hardcode the trailing part so it is 100% stable.
let extractHw = homeworkAndReportHtml.substring(0, homeworkAndReportHtml.lastIndexOf('</div>'));
// Find exactly where the flex gap:15px ends. It ends with two divs.

const chart100Html = `
                    <!-- Chart 100: 문항별 상세 분석 및 오답률 -->
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

// Build the perfect panel-homework
const perfectHomework = `
            <!-- ============================
                 PANEL: GVR 학습 현황 (디폴트)
            ============================ -->
            <div class="content-panel active" id="panel-homework">
                <div class="dash-welcome" style="background:linear-gradient(135deg, #2a3f54, #1a237e); padding:20px 30px; margin-bottom:25px; border-radius:16px; color:white;">
                    <h2 style="font-size:22px; font-weight:900; margin:0;"><i class="fas fa-graduation-cap text-teal"></i> 김지민 학생, 환영합니다!</h2>
                    <p style="font-size:14px; opacity:0.8; margin-top:5px; margin-bottom:0;">오늘도 KNS와 함께 목표를 향해 달려보아요!</p>
                </div>
                
                ${sCharts4Html}

                <!-- 2. Homework Status Section -->
                <div style="font-size:16px; font-weight:800; margin-bottom:15px; color:#111;"><i class="fas fa-tasks text-orange"></i> 과제 제출 현황</div>
                <div class="hw-item" style="border: 2px solid #E91E63; background:#fff0f2;">
                    <div>
                        <span style="background:#E91E63; color:white; padding:3px 8px; border-radius:4px; font-size:10px; font-weight:bold; margin-bottom:5px; display:inline-block;">미제출</span>
                        <div class="hw-title" style="color:#111;">3월 1주차 정규 GVR 과제</div>
                        <div class="hw-deadline"><i class="fas fa-exclamation-triangle text-red"></i> 마감: 2026.03.12 (목) 23:59 — D-day</div>
                    </div>
                    <a href="omr.html" style="background:#E91E63; color:white; padding:10px 20px; border-radius:8px; font-weight:800; text-decoration:none;">지금 제출하기 →</a>
                </div>
                
                <div style="margin-top:10px;">
                    <div class="dash-card-title" style="font-size:14px; margin-bottom:10px; color:#555;">이전 과제 다시 풀기 (오답/리뷰)</div>
                    <div class="hw-item" style="padding:15px; border-left:4px solid #4CAF50;">
                        <div>
                            <div class="hw-title" style="font-size:14px;">2월 4주차 종합 평가</div>
                            <div class="hw-deadline" style="color:#4CAF50;"><i class="fas fa-check-circle"></i> 제출 완료 (85점)</div>
                        </div>
                        <div style="display:flex; gap:10px;">
                            <a href="gvr_review.html" class="btn-outline-navy" style="font-size:12px; padding:6px 12px; border-radius:6px; text-decoration:none;">오답 노트 다운로드</a>
                            <a href="gvr_review.html" class="btn-primary" style="font-size:12px; padding:6px 12px; border-radius:6px; background:#1a237e; color:white; text-decoration:none;">온라인 재확인</a>
                        </div>
                    </div>
                </div>

                <!-- 3. Report Card Section -->
                <div style="font-size:16px; font-weight:800; margin: 30px 0 15px; color:#111;"><i class="fas fa-medal text-gold"></i> 최신 GVR 성적표</div>
                <div style="display:flex; gap:15px;">
                    <div style="flex:1; background:white; border:1px solid #ddd; border-radius:12px; padding:20px; transition:0.2s; cursor:pointer;" onmouseover="this.style.borderColor='#1a237e'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.05)';" onmouseout="this.style.borderColor='#ddd'; this.style.boxShadow='none';" onclick="location.href='report_gvr.html'">
                        <div style="font-size:12px; font-weight:bold; color:#1a237e; margin-bottom:5px;">2월 GVR 종합 분석</div>
                        <h4 style="font-size:16px; font-weight:900; margin-bottom:10px;">2월 4주차 GVR 성적표</h4>
                        <p style="font-size:12px; color:#666; margin-bottom:15px;">나의 강약점 분석 및 김치삼 원장님 총평이 업데이트 되었습니다.</p>
                        <span style="font-size:13px; font-weight:bold; color:#E91E63;">결과 확인하기 &rarr;</span>
                    </div>
                    <div style="flex:1; background:white; border:1px solid #ddd; border-radius:12px; padding:20px; transition:0.2s; cursor:pointer;" onmouseover="this.style.borderColor='#1a237e'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.05)';" onmouseout="this.style.borderColor='#ddd'; this.style.boxShadow='none';" onclick="location.href='report_gvr.html'">
                        <div style="font-size:12px; font-weight:bold; color:#888; margin-bottom:5px;">2월 3주차 분석</div>
                        <h4 style="font-size:16px; font-weight:900; margin-bottom:10px; color:#555;">2월 3주차 GVR 성적표</h4>
                        <span style="font-size:13px; font-weight:bold; color:#1a237e;">지난 결과 보기 &rarr;</span>
                    </div>
                </div>
            </div>
`;

// Build the perfect panel-teacherGvr
const perfectTeacherGvr = `
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


// Replace the buggy blocks!
// Find boundaries
let pHomeStart = html.indexOf('<!-- ============================', html.indexOf('PANEL: GVR 학습 현황 (디폴트)') - 50);
if(pHomeStart === -1) pHomeStart = html.indexOf('<div class="content-panel active" id="panel-homework">');
let pDiagStart = html.indexOf('<!-- ============================', html.indexOf('PANEL: 진단테스트') - 50);
if (pDiagStart === -1) pDiagStart = html.indexOf('id="panel-diag"');

let pTeacherGvrStart = html.indexOf('<!-- ============================', html.indexOf('PANEL: 강사 GVR 상세 분석') - 50);
let pStudentMgmtStart = html.indexOf('<!-- ============================', html.indexOf('PANEL: 학생 관리') - 50);
if (pTeacherGvrStart === -1) pTeacherGvrStart = html.indexOf('id="panel-teacherGvr"');
if (pStudentMgmtStart === -1) pStudentMgmtStart = html.indexOf('id="panel-studentMgmt"');

// Slice out the file and rebuild
if (pHomeStart > -1 && pDiagStart > -1 && pTeacherGvrStart > -1 && pStudentMgmtStart > -1) {
    let newHtml = html.substring(0, pHomeStart) + '\n' + perfectHomework + '\n\n' + 
                  html.substring(pDiagStart, pTeacherGvrStart) + '\n' + perfectTeacherGvr + '\n\n' +
                  html.substring(pStudentMgmtStart);
    fs.writeFileSync('my_learning.html', newHtml, 'utf8');
    console.log('REPLACEMENT SUCCESS: Panels regenerated.');
} else {
    console.log('REPLACEMENT FAILED: Boundaries not found', {pHomeStart, pDiagStart, pTeacherGvrStart, pStudentMgmtStart});
}
