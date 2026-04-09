import os

# Read the HTML file
html_file = 'teacher_dashboard.html'
with open(html_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Find the start of teacherView
target_str = '<div id="teacherView"'
idx = text.find(target_str)

if idx == -1:
    print("Could not find teacherView")
    exit(1)

pre_text = text[:idx]

new_teacher_ui = """<div id="teacherView" class="tw-layout" style="display:none;">
            <!-- LEFT PANEL -->
            <div class="tw-left">
                <div class="tw-card" style="padding: 18px;">
                    <div style="font-weight:900; font-size:18px;">이은혜 강사님 <i class="fas fa-check-circle text-green-500" style="font-size:14px;"></i></div>
                    <div style="font-size:12px; color:#64748b; margin-top:3px;">고등부 전임 | VIP 멤버</div>
                    <div style="margin-top:15px; display:flex; gap:10px;">
                        <div style="flex:1; background:#fef2f2; padding:10px; border-radius:8px; text-align:center;">
                            <div style="font-size:11px; color:#ef4444; font-weight:700;">위험 학생</div><div style="font-size:18px; font-weight:900; color:#b91c1c;">1명</div>
                        </div>
                        <div style="flex:1; background:#eff6ff; padding:10px; border-radius:8px; text-align:center;">
                            <div style="font-size:11px; color:#3b82f6; font-weight:700;">질문 목록</div><div style="font-size:18px; font-weight:900; color:#1d4ed8;">5건</div>
                        </div>
                    </div>
                </div>

                <div class="tw-card h-100">
                    <div class="tw-card-title" style="margin-bottom:12px;"><i class="fas fa-users text-indigo-500"></i> 수강생 관리 리스트</div>
                    <select class="tw-select" style="margin-bottom: 12px;">
                        <option>외고 최상위반 (12명)</option>
                        <option>일반고 내신대비반 (10명)</option>
                    </select>
                    <input type="text" placeholder="이름 검색..." class="tw-select" style="margin-bottom:15px; padding:8px 14px;">
                    
                    <div style="flex-grow:1; overflow-y:auto; margin-right:-5px;">
                        <div class="stu-list-item active" onclick="selectStudent('최유나', 'danger', event)">
                            <div>
                                <div class="stu-name">최유나 <i class="fas fa-exclamation-triangle text-red-500"></i></div>
                                <div class="stu-meta">평균 68점 (▼13) | 오답 15개</div>
                            </div>
                            <i class="fas fa-chevron-right text-slate-300"></i>
                        </div>
                        <div class="stu-list-item" onclick="selectStudent('박지민', 'good', event)">
                            <div>
                                <div class="stu-name">박지민</div>
                                <div class="stu-meta">평균 96점 (▲14) | 오답 2개</div>
                            </div>
                            <i class="fas fa-chevron-right text-slate-300"></i>
                        </div>
                        <div class="stu-list-item" onclick="selectStudent('조동기', 'warning', event)">
                            <div>
                                <div class="stu-name">조동기 <i class="fas fa-exclamation-circle text-yellow-500"></i></div>
                                <div class="stu-meta">평균 76점 (▼5) | 오답 11개</div>
                            </div>
                            <i class="fas fa-chevron-right text-slate-300"></i>
                        </div>
                        <div class="stu-list-item" onclick="selectStudent('이수진', 'good', event)">
                            <div>
                                <div class="stu-name">이수진</div>
                                <div class="stu-meta">평균 84점 (▲2) | 오답 7개</div>
                            </div>
                            <i class="fas fa-chevron-right text-slate-300"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CENTER PANEL -->
            <div class="tw-center">
                <div style="background:white; border-radius:16px; padding:25px; border:1px solid #e2e8f0; box-shadow:0 4px 20px rgba(0,0,0,0.03);">
                    <div style="display:flex; justify-content:space-between; align-items:start;">
                        <div>
                            <div style="font-size:12px; font-weight:800; color:#3b82f6; background:#eff6ff; padding:4px 10px; border-radius:12px; display:inline-block; margin-bottom:8px;">Custom Analytics Module</div>
                            <h2 style="margin:0; font-size:24px; font-weight:900; color:#1e293b;">학원별 맞춤 평가 분석 뷰</h2>
                            <p style="margin:6px 0 0; font-size:14px; color:#64748b; font-weight:600;">현재 데이터 세트: <span style="color:#1e293b;">[KNS어학원] GVR 68회차 통합 평가</span></p>
                        </div>
                        <div>
                            <select class="tw-select" style="width:auto; padding-right:30px; font-weight:800; border-color:#cbd5e1;">
                                <option>GVR 68회차 (현재)</option>
                                <option>GVR 67회차 (지난주)</option>
                                <option>월간 진단평가</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="tw-card" style="padding-top:15px;">
                    <div class="tw-card-title"><i class="fas fa-chart-bar text-pink-500"></i> 문항 유형별 오답률 분석 (클릭 시 하단 연동)</div>
                    <div style="height:250px;">
                        <canvas id="typeErrorChart"></canvas>
                    </div>
                </div>

                <div class="tw-card" id="drilldown-section" style="display:flex; flex-direction:column; min-height: 250px;">
                    <div class="tw-card-title" style="margin-bottom:10px;"><i class="fas fa-search-plus text-indigo-500"></i> 상세 문항 분석: <span id="selected-type-name" style="color:#e91e63;">어법 (도치)</span></div>
                    <div style="flex-grow:1; overflow-x:auto;">
                        <table class="tw-table">
                            <thead><tr><th>테스트</th><th>문항</th><th>오답률</th><th>주요 오답 (선택비율)</th><th>오답 학생 <i class="fas fa-angle-down"></i></th></tr></thead>
                            <tbody id="drilldown-tbody">
                                <tr><td>AT 1</td><td><strong>Q14</strong></td><td><span style="color:#ef4444; font-weight:900;">85%</span></td><td>④번 (65%) 🔥</td><td><button class="tw-btn outline" style="padding:4px 10px; font-size:12px;" onclick="document.getElementById('wrongStudents').style.display='block'">14명 리스트</button></td></tr>
                                <tr><td>AT 2</td><td><strong>Q08</strong></td><td><span>45%</span></td><td>③번 (25%)</td><td><button class="tw-btn outline" style="padding:4px 10px; font-size:12px;">7명 리스트</button></td></tr>
                                <tr><td>AT 3</td><td><strong>Q22</strong></td><td><span>30%</span></td><td>①번 (15%)</td><td><button class="tw-btn outline" style="padding:4px 10px; font-size:12px;">5명 리스트</button></td></tr>
                            </tbody>
                        </table>
                        <div id="wrongStudents" style="display:none; background:#f8fafc; padding:15px; border-radius:8px; margin-top:15px; border-left:4px solid #f43f5e; font-size:13px; color:#334155; font-weight:600;">
                            <div style="margin-bottom:8px;"><strong style="color:#e91e63;">[Q14 오답자 (14명)]</strong></div>
                            최유나, 조동기, 오서율, 김민지, 박수현, 이민호, 강지현, 윤도현, 장원영, 한소희, 유재석, 박명수, 하동훈, 노홍철
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT PANEL -->
            <div class="tw-right">
                <div class="tw-card h-100" style="background:#f8fafc; border:none; box-shadow:none; padding:0;">
                    
                    <div id="crm-profile" style="background:white; border-radius:16px; padding:22px; border:1px solid #e2e8f0; box-shadow:0 4px 15px rgba(0,0,0,0.03); height:100%; display:flex; flex-direction:column;">
                        <div style="display:flex; justify-content:space-between; align-items:start;">
                            <div>
                                <h2 style="margin:0; font-size:20px; font-weight:900;" id="prof-name">최유나 <i class="fas fa-exclamation-triangle text-red-500" style="font-size:14px;"></i></h2>
                                <div style="font-size:12px; color:#64748b; margin-top:4px; font-weight:600;">외고 심화반 | 010-1234-5678 (모)</div>
                            </div>
                            <div style="display:flex; gap:5px;">
                                <button class="tw-btn-icon" title="메시지 전송"><i class="fas fa-comment-dots"></i></button>
                                <button class="tw-btn-icon" title="전화걸기"><i class="fas fa-phone-alt"></i></button>
                            </div>
                        </div>
                        
                        <div id="prof-ai" style="background:#fef2f2; padding:12px; border-radius:8px; margin-top:15px; border-left:3px solid #ef4444;">
                            <div style="font-size:12px; color:#ef4444; font-weight:800;"><i class="fas fa-robot"></i> AI 처방 어드바이저</div>
                            <div style="font-size:13px; color:#7f1d1d; margin-top:4px; font-weight:600;">최근 2회차 연속 어법 오답률이 기준치를 초과했습니다. 맞춤 오답노트(쌍둥이 세트) 배포를 강력 권장합니다.</div>
                        </div>

                        <div style="margin-top:20px; flex-grow:1; display:flex; flex-direction:column;">
                            <div style="font-size:14px; font-weight:800; color:#1e293b; margin-bottom:10px;">CRM 학생 관리 히스토리</div>
                            <div class="tw-timeline" style="flex-grow:1; max-height:200px; overflow-y:auto;">
                                <div class="tw-tl-item">
                                    <div class="tw-tl-dot bg-pink"></div>
                                    <div class="tw-tl-time">방금 전</div>
                                    <div class="tw-tl-content">학생이 어법 Q&A 질문을 새로 등록함</div>
                                </div>
                                <div class="tw-tl-item">
                                    <div class="tw-tl-dot bg-blue"></div>
                                    <div class="tw-tl-time">어제 19:30 | 이은혜 강사</div>
                                    <div class="tw-tl-content">단어 미통과 건 학부모 전화상담 완료 (이번 주말 재시험 합의 / 기록 완료)</div>
                                </div>
                                <div class="tw-tl-item" style="margin-bottom:0;">
                                    <div class="tw-tl-dot bg-green"></div>
                                    <div class="tw-tl-time">4월 5일 | 시스템 자동화</div>
                                    <div class="tw-tl-content">주간 GVR 리뷰 리포트 카카오톡 알림톡 발송 성공</div>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top:15px;">
                            <textarea class="tw-textarea" placeholder="상담 메모 / 특이사항 빠른 기록 남기기..."></textarea>
                            <!-- TWIN CLINIC BUTTON -->
                            <button class="tw-btn solid-pink" style="width:100%; margin-top:10px;" onclick="openTwinModal()"><i class="fas fa-copy"></i> 오답 기반 쌍둥이 문제지 즉시 전송</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 쌍둥이 클리닉 배포 모달 (Twin Clinic) -->
        <div class="modal-overlay" id="twinModal" style="display:none; position:fixed; z-index:9999; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(3px);">
            <div class="modal-content" style="width:550px; background:white; padding:0; border-radius:20px; box-shadow:0 25px 50px rgba(0,0,0,0.2); overflow:hidden;">
                <div style="background:linear-gradient(135deg, #111, #1e2d5a); padding:25px; color:white; position:relative;">
                    <h2 style="margin:0; font-size:20px; font-weight:900;"><i class="fas fa-copy text-pink-500"></i> 쌍둥이 클리닉 (유사 오답노트) 생성</h2>
                    <p style="margin:5px 0 0; font-size:13px; opacity:0.9;">선택한 학생의 취약 데이터를 기반으로 KATCH AI가 검증된 쌍둥이 문항을 추출합니다.</p>
                    <button class="btn-close" style="position:absolute; right:20px; top:20px; background:rgba(255,255,255,0.2); color:white; border:none; width:30px; height:30px; border-radius:50%; cursor:pointer;" onclick="closeTwinModal()">&times;</button>
                </div>
                <div style="padding:30px;">
                    <div style="margin-bottom:20px;">
                        <label style="display:block; font-size:13px; font-weight:800; color:#475569; margin-bottom:8px;">배포 대상</label>
                        <div style="background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e2e8f0; font-weight:700; color:#3b82f6;"><i class="fas fa-user-check"></i> 최유나 학생 (외고 심화반)</div>
                    </div>
                    <div style="margin-bottom:20px;">
                        <label style="display:block; font-size:13px; font-weight:800; color:#475569; margin-bottom:8px;">문제 추출 기준</label>
                        <select class="tw-select">
                            <option>최근 1회차 GVR 오답 기준 (15문항 집중 공략)</option>
                            <option>최근 1달 누적 오답 집중 유형</option>
                            <option>수동으로 문항 번호 직접 선택</option>
                        </select>
                    </div>
                    <div style="margin-bottom:20px;">
                        <label style="display:block; font-size:13px; font-weight:800; color:#475569; margin-bottom:8px;">쌍둥이 문제 배수 옵션 (오답 1문항 당)</label>
                        <select class="tw-select">
                            <option>유사 변형문제 2배수 (총 30문항)</option>
                            <option>유사 변형문제 1배수 (총 15문항)</option>
                            <option>초고난도 심화 문제 1배수 (최상위권 전용)</option>
                        </select>
                    </div>
                    <div style="margin-bottom:25px;">
                        <label style="display:block; font-size:13px; font-weight:800; color:#475569; margin-bottom:8px;">해설 VOD 추천 첨부 연동</label>
                        <label style="display:flex; align-items:center; gap:8px; font-size:14px; font-weight:600; cursor:pointer;">
                            <input type="checkbox" checked style="width:16px; height:16px; accent-color:#e91e63;">
                            쌍둥이 문제지 리포트 하단에 취약 유형 개념특강 자동 연동
                        </label>
                    </div>
                    <button class="tw-btn solid-pink" style="width:100%; padding:15px; font-size:16px;" onclick="sendTwinClinic()"><i class="fas fa-paper-plane"></i> 생성 완료 후 학생 앱(App)으로 즉시 전송</button>
                    <div style="font-size:12px; color:#94a3b8; text-align:center; margin-top:12px; font-weight:600;">※ 발송된 내역은 우측 CRM 타임라인에 모바일 알림톡 여부와 함께 자동 기록됩니다.</div>
                </div>
            </div>
        </div>

        <script>
            // Ensure teacherView is active
            function initTeacherDash() {
                const tv = document.getElementById('teacherView');
                const sv = document.getElementById('studentView');
                if(tv) tv.style.display = 'grid'; // because layout is grid
                if(sv) sv.style.display = 'none';

                // Chart initialization safely
                setTimeout(() => {
                    const canvas = document.getElementById('typeErrorChart');
                    if(canvas) {
                        const ctx = canvas.getContext('2d');
                        if(window.teChart) window.teChart.destroy();
                        
                        Chart.defaults.font.family = 'Pretendard';
                        window.teChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['어법 (도치)', '어휘 (동의어)', '문장 삽입', '빈칸 추론', '순서 배열', '동사 수일치'],
                                datasets: [{
                                    label: '평균 오답률 (%)',
                                    data: [85, 45, 60, 80, 50, 20],
                                    backgroundColor: function(c) {
                                        return c.raw >= 60 ? '#f43f5e' : '#3b82f6';
                                    },
                                    borderRadius: 6,
                                    hoverBackgroundColor: '#1e293b'
                                }]
                            },
                            options: {
                                responsive: true, maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: { 
                                    y: { beginAtZero: true, max: 100 },
                                    x: { grid: { display: false }, ticks: { font: { weight:'bold' } } }
                                },
                                onClick: (e, els) => {
                                    if(els.length > 0) {
                                        const idx = els[0].index;
                                        const types = ['어법 (도치)', '어휘 (동의어)', '문장 삽입', '빈칸 추론', '순서 배열', '동사 수일치'];
                                        document.getElementById('selected-type-name').innerText = types[idx];
                                        
                                        const sec = document.getElementById('drilldown-section');
                                        sec.style.transform = 'scale(0.98)';
                                        sec.style.transition = '0.2s';
                                        setTimeout(() => sec.style.transform = 'scale(1)', 150);
                                    }
                                }
                            }
                        });
                    }
                }, 100);
            }

            function selectStudent(name, status, event) {
                document.querySelectorAll('.stu-list-item').forEach(el => el.classList.remove('active'));
                if(event) event.currentTarget.classList.add('active');
                
                document.getElementById('prof-name').innerHTML = name + (status==='danger'?' <i class="fas fa-exclamation-triangle text-red-500" style="font-size:14px;"></i>':'');
                
                const aiBox = document.getElementById('prof-ai');
                if(status === 'danger') {
                    aiBox.style.display = 'block';
                    aiBox.innerHTML = '<div style="font-size:12px; color:#ef4444; font-weight:800;"><i class="fas fa-robot"></i> AI 처방 어드바이저</div><div style="font-size:13px; color:#7f1d1d; margin-top:4px; font-weight:600;">최근 2회차 연속 어법 오답률이 기준치를 초과했습니다. 맞춤 오답노트(쌍둥이 세트) 배포를 강력 권장합니다.</div>';
                    aiBox.style.background = '#fef2f2'; aiBox.style.borderLeftColor = '#ef4444';
                } else if(status === 'warning') {
                    aiBox.style.display = 'block';
                    aiBox.innerHTML = '<div style="font-size:12px; color:#d97706; font-weight:800;"><i class="fas fa-robot"></i> AI 어드바이저</div><div style="font-size:13px; color:#92400e; margin-top:4px; font-weight:600;">어휘 점수가 소폭 하락세입니다. 동의어 재테스트가 필요합니다.</div>';
                    aiBox.style.background = '#fffbeb'; aiBox.style.borderLeftColor = '#f59e0b';
                } else {
                    aiBox.style.display = 'none';
                }
            }

            function openTwinModal() {
                document.getElementById('twinModal').style.display = 'flex';
            }
            function closeTwinModal() {
                document.getElementById('twinModal').style.display = 'none';
            }
            function sendTwinClinic() {
                // Change UI of the history to show it was sent
                const tlList = document.querySelector('.tw-timeline');
                const newTl = document.createElement('div');
                newTl.className = 'tw-tl-item';
                newTl.innerHTML = `
                    <div class="tw-tl-dot bg-pink"></div>
                    <div class="tw-tl-time">방금 전 | ${document.querySelector('.tw-select').value}</div>
                    <div class="tw-tl-content">[쌍둥이 클리닉] 오답노트 배포 완료 (${document.querySelectorAll('.tw-select')[1].value})</div>
                `;
                tlList.insertBefore(newTl, tlList.firstChild);
                
                closeTwinModal();
            }

            // Bind role toggle if it exists to also initTeacherDash
            setTimeout(() => {
                const roleBtns = document.querySelectorAll('.role-btn');
                if(roleBtns.length > 1) {
                    roleBtns[1].addEventListener('click', initTeacherDash);
                }
                
                // Check if current view is actually teacher
                const urlParams = new URLSearchParams(window.location.search);
                if(urlParams.get('view') !== 'student') {
                    initTeacherDash();
                }
            }, 100);
        </script>
    </div>
</body>
</html>
"""

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(pre_text + new_teacher_ui)

print('Successfully updated teacher_dashboard.html via python!')
