const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

const restoredBlock = `
                    <!-- 4-Panel Dashboard Section -->
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
                        <div class="hw-item" style="background:#fafffa; border:1px solid #e8f5e9;">
                            <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                                <div>
                                    <span style="background:#4caf50; color:white; padding:3px 8px; border-radius:4px; font-size:10px; font-weight:bold; margin-bottom:5px; display:inline-block;">제출완료</span>
                                    <div class="hw-title">2월 4주차 라이팅 첨삭 과제</div><div class="hw-deadline" style="color:#888;">마감: 2026.02.28 | 점수 88/100</div>
                                </div>
                                <a href="gvr_review.html" style="background:#1a237e; color:white; padding:8px 15px; border-radius:6px; font-weight:bold; font-size:13px; text-decoration:none;"><i class="fas fa-redo"></i> 오답 다시풀기</a>
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

// Remove the truncated 4-Panel section
html = html.replace(/<!-- 4-Panel Dashboard Section -->[\s\S]*?(?=<!-- ============================\s*PANEL: 진단테스트)/, restoredBlock);

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Restored GVR charts securely');
