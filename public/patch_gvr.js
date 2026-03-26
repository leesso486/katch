const fs = require('fs');
let content = fs.readFileSync('dashboard_gvr.html', 'utf8');

const TABS_HTML = `
            <!-- TEACHER TABS -->
            <div class="teacher-tabs" style="display:flex; border-bottom:2px solid #ddd; margin-bottom:20px;">
                <button class="t-tab" onclick="switchTTab('all')" style="padding:12px 20px; font-weight:bold; font-size:16px; border:none; background:none; border-bottom:3px solid transparent; color:#666; cursor:pointer;" id="tb-all">전체 학원 통합 분석</button>
                <button class="t-tab active" onclick="switchTTab('my')" style="padding:12px 20px; font-weight:bold; font-size:16px; border:none; background:none; border-bottom:3px solid #3f51b5; color:#3f51b5; cursor:pointer;" id="tb-my">내 수업 반 분석 (중2외고전사고반-C)</button>
                <button class="t-tab" onclick="switchTTab('stu')" style="padding:12px 20px; font-weight:bold; font-size:16px; border:none; background:none; border-bottom:3px solid transparent; color:#666; cursor:pointer;" id="tb-stu">개별 학생 상세 관리</button>
            </div>

            <div id="t-tab-all" style="display:none; margin-bottom: 30px;">
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="dash-panel" style="padding: 20px;">
                        <div class="panel-title" style="font-size:16px; margin-bottom:15px;"><i class="fas fa-chart-line" style="color:#A0D468;"></i> 전체 학원 평균 vs 내 반 평균 비교</div>
                        <div style="height:250px;"><canvas id="crossAvgChart"></canvas></div>
                    </div>
                    <div class="dash-panel" style="padding: 20px;">
                        <div class="panel-title" style="font-size:16px; margin-bottom:15px;"><i class="fas fa-exclamation-triangle" style="color:#ff9800;"></i> 통합 반 오답률 TOP 5 문항</div>
                        <div style="height:250px;"><canvas id="crossTopChart"></canvas></div>
                    </div>
                </div>
            </div>

            <div id="t-tab-stu" style="display:none; margin-bottom: 30px;">
                <div style="display:flex; gap:20px;">
                    <div style="width:250px; background:white; border-radius:12px; border:1px solid #ddd; padding:20px; box-shadow:0 4px 6px rgba(0,0,0,0.02);">
                        <h4 style="margin-bottom:15px; color:#111;"><i class="fas fa-users" style="color:#3f51b5;"></i> 학생 목록</h4>
                        <div style="position:relative; margin-bottom:15px;">
                            <input type="text" placeholder="학생 검색..." style="width:100%; padding:8px 12px; border:1px solid #ddd; border-radius:6px; font-size:13px; outline:none; box-sizing:border-box;">
                            <i class="fas fa-search" style="position:absolute; right:10px; top:10px; color:#999;"></i>
                        </div>
                        <ul style="list-style:none; padding:0; margin:0;" id="stu-list">
                            <li onclick="selectStu(this)" style="padding:10px; background:#f0f2f5; border-radius:6px; margin-bottom:5px; cursor:pointer; font-weight:bold; color:#3f51b5; border:1px solid #3f51b5;">이소영 (GVR 수행률: 100%)</li>
                            <li onclick="selectStu(this)" style="padding:10px; border-radius:6px; margin-bottom:5px; cursor:pointer; border:1px solid transparent; transition:0.2s;">김지훈 (GVR 수행률: 85%)</li>
                            <li onclick="selectStu(this)" style="padding:10px; border-radius:6px; margin-bottom:5px; cursor:pointer; border:1px solid transparent; transition:0.2s;">박민지 (GVR 수행률: 60%)</li>
                        </ul>
                    </div>
                    <div style="flex:1;">
                        <div class="dash-panel" style="padding: 20px; margin-bottom:20px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                                <h3 style="color:#111; margin:0;"><span id="cur-stu-name">이소영</span> 학생 - 정기 진단테스트 성적 요약</h3>
                                <a href="student_diagnostics.html" class="btn-sm btn-outline-gray" style="font-size:12px; padding:4px 10px;">상세 리포트 보기</a>
                            </div>
                            <div style="display:flex; gap:30px; align-items:center; background:#f8fbff; padding:20px; border-radius:8px; border:1px solid #e3f2fd;">
                                <div style="text-align:center; padding-right:30px; border-right:1px dashed #bbdefb;">
                                    <div style="font-size:13px; color:#555; font-weight:bold;">종합 점수</div>
                                    <div style="font-size:40px; font-weight:900; color:#1976d2; line-height:1; margin-top:5px;">88<span style="font-size:16px; color:#666;">점</span></div>
                                </div>
                                <div style="flex:1;">
                                    <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; font-weight:bold;">
                                        <span style="color:#555;">영역별 성취도 (학원 평균 대비)</span>
                                        <span style="color:#4CAF50;">상위 15%</span>
                                    </div>
                                    <div style="height:10px; background:#e0e0e0; border-radius:5px; margin-bottom:15px; overflow:hidden;">
                                        <div style="width:85%; height:100%; background:linear-gradient(90deg, #4CAF50, #8BC34A);"></div>
                                    </div>
                                    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; text-align:center; font-size:12px;">
                                        <div style="background:white; padding:8px; border-radius:4px; border:1px solid #eee;"><strong style="color:#333; display:block;">LC</strong> <span style="color:#1976d2;">95점</span></div>
                                        <div style="background:white; padding:8px; border-radius:4px; border:1px solid #eee;"><strong style="color:#333; display:block;">GR</strong> <span style="color:#1976d2;">82점</span></div>
                                        <div style="background:white; padding:8px; border-radius:4px; border:1px solid #eee;"><strong style="color:#333; display:block;">VO</strong> <span style="color:#1976d2;">90점</span></div>
                                        <div style="background:white; padding:8px; border-radius:4px; border:1px solid #eee;"><strong style="color:#333; display:block;">RC</strong> <span style="color:#1976d2;">85점</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dash-panel" style="padding: 20px;">
                            <h3 style="color:#111; margin-bottom:15px; display:flex; justify-content:space-between;">
                                주간 GVR 과제 수행률 및 변화 추이
                                <span style="font-size:12px; font-weight:normal; color:#e91e63; background:#fff0f2; padding:3px 8px; border-radius:12px;">최근 3회 연속 100% 달성 달성</span>
                            </h3>
                            <div style="height:220px;"><canvas id="stuGvrChart"></canvas></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="t-tab-my" style="display:block;">
`;

const SCRIPT_ADDON = `
            window.switchTTab = function(id) {
                document.getElementById('t-tab-all').style.display = 'none';
                document.getElementById('t-tab-my').style.display = 'none';
                document.getElementById('t-tab-stu').style.display = 'none';
                document.getElementById('tb-all').style.cssText = 'padding:12px 20px; font-weight:bold; font-size:16px; border:none; background:none; border-bottom:3px solid transparent; color:#666; cursor:pointer;';
                document.getElementById('tb-my').style.cssText = 'padding:12px 20px; font-weight:bold; font-size:16px; border:none; background:none; border-bottom:3px solid transparent; color:#666; cursor:pointer;';
                document.getElementById('tb-stu').style.cssText = 'padding:12px 20px; font-weight:bold; font-size:16px; border:none; background:none; border-bottom:3px solid transparent; color:#666; cursor:pointer;';

                document.getElementById('t-tab-'+id).style.display = 'block';
                document.getElementById('tb-'+id).style.cssText = 'padding:12px 20px; font-weight:bold; font-size:16px; border:none; background:none; border-bottom:3px solid #3f51b5; color:#3f51b5; cursor:pointer;';
                
                // Init charts if needed
                if(id==='all' && !window.crossAvgChartInited) {
                    window.crossAvgChartInited = true;
                    new Chart(document.getElementById('crossAvgChart').getContext('2d'), {
                        type: 'bar',
                        data: {
                            labels: ['LC','GR','VO','RC'],
                            datasets: [
                                {label:'학원 전체 평균', data:[75,68,72,70], backgroundColor:'#e0e0e0', borderRadius:2},
                                {label:'우리반 평균', data:[82,65,78,74], backgroundColor:'#A0D468', borderRadius:2}
                            ]
                        },
                        options: { responsive:true, maintainAspectRatio:false, scales: { y: { min:0, max:100 } } }
                    });
                    new Chart(document.getElementById('crossTopChart').getContext('2d'), {
                        type: 'bar',
                        data: {
                            labels: ['GR 시제', 'RC 빈칸', 'LC 일치', 'VO 다의어'],
                            datasets: [{label:'통합 오답률(%)', data:[65, 58, 42, 38], backgroundColor:'#ff9800', borderRadius:2}]
                        },
                        options: { indexAxis: 'y', responsive:true, maintainAspectRatio:false, scales: { x: { min:0, max:100 } }, plugins: { legend: { display: false } } }
                    });
                }
                
                if(id==='stu' && !window.stuGvrChartInited) {
                    window.stuGvrChartInited = true;
                    new Chart(document.getElementById('stuGvrChart').getContext('2d'), {
                        type: 'line',
                        data: {
                            labels: ['AT1','AT2','AT3','AT4','AT5','AT6'],
                            datasets: [{
                                label:'이소영 학생 GVR 정답률', data:[80, 85, 82, 88, 92, 88], 
                                borderColor:'#3f51b5', backgroundColor:'rgba(63,81,181,0.1)', fill:true, tension:0.3, pointRadius:4
                            }]
                        },
                        options: { responsive:true, maintainAspectRatio:false, scales: { y: { min:0, max:100 } } }
                    });
                }
            };

            window.selectStu = function(el) {
                const list = document.getElementById('stu-list').children;
                for(let i=0; i<list.length; i++) {
                    list[i].style.background = 'transparent';
                    list[i].style.color = 'inherit';
                    list[i].style.border = '1px solid transparent';
                }
                el.style.background = '#f0f2f5';
                el.style.color = '#3f51b5';
                el.style.border = '1px solid #3f51b5';
                document.getElementById('cur-stu-name').innerText = el.innerText.split(' ')[0];
            };
`;

// Insert the UI
content = content.replace('<!-- NEW ANALYSIS DASHBOARD (Based on User Image 2) -->', TABS_HTML);

// Close the wrapper
content = content.replace('</main>', '</div>\n        </main>');

// Insert Script
content = content.replace('// Init', SCRIPT_ADDON + '\n            // Init');

fs.writeFileSync('dashboard_gvr.html', content, 'utf8');
console.log('patched dashboard_gvr.html');
