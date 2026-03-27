import os

target_file = r"c:\Users\SsoHot\Desktop\수능사이트시안\katch-web\public\dashboard.html"
with open(target_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_ui = """        <!-- =========================
             STUDENT / PARENT VIEW (GAMIFIED)
        ========================= -->
        <div id="studentView">
            <div class="stu-hero">
                <div class="stu-avatar-wrap">
                    <div class="stu-avatar">
                        <img src="https://i.pravatar.cc/150?img=11" alt="Avatar">
                    </div>
                    <div class="stu-level-badge">Lv. 14 KATCH Master</div>
                </div>
                <div class="stu-info">
                    <div class="stu-greeting">환영합니다, 박지민님! 🔥</div>
                    <div style="font-size: 14px; opacity: 0.9;">다음 레벨까지 350 XP 남았습니다. (이번 주 3일 연속 학습 중!)</div>
                    <div class="stu-xp-bar"><div class="stu-xp-fill" style="width: 65%;"></div></div>
                    <div class="stu-stats">
                        <div class="stu-stat-item"><i class="fas fa-fire" style="color:#f87171;"></i> <div><div class="stu-stat-label">연속 학습</div><div class="stu-stat-val text-white">3일</div></div></div>
                        <div class="stu-stat-item"><i class="fas fa-star" style="color:#fbbf24;"></i><div><div class="stu-stat-label">획득 포인트</div><div class="stu-stat-val text-white">1,250 P</div></div></div>
                        <div class="stu-stat-item" style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); cursor:pointer;" onclick="location.href='store_vod.html'">
                            <i class="fas fa-gift text-white"></i><div class="stu-stat-label text-white" style="font-weight:800;">포인트 샵</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="stu-grid">
                <div style="display:flex; flex-direction:column; gap:25px;">
                    <div class="panel">
                        <div class="panel-header">
                            <h3 class="panel-title"><i class="fas fa-clipboard-check text-indigo-600"></i> 오늘의 미션 센터</h3>
                            <a href="#" style="font-size:12px; color:#64748b; font-weight:700; text-decoration:none;">전체보기 <i class="fas fa-angle-right"></i></a>
                        </div>
                        <div class="quest-list">
                            <div class="quest-item">
                                <div style="display:flex; align-items:center;">
                                    <div class="quest-icon q-blue"><i class="fas fa-pen-nib"></i></div>
                                    <div class="quest-info"><div class="quest-title">정규 GVR 과제 3회차 제출</div><div class="quest-meta">마감: 오늘 23:59까지</div></div>
                                </div>
                                <div style="display:flex; align-items:center;">
                                    <div class="quest-reward">+ 500 XP</div><button class="btn-quest" onclick="location.href='omr.html'">제출하기</button>
                                </div>
                            </div>
                            <div class="quest-item">
                                <div style="display:flex; align-items:center;">
                                    <div class="quest-icon q-pink"><i class="fas fa-play"></i></div>
                                    <div class="quest-info"><div class="quest-title">[VOD] 빈칸 추론 약점 공략 시청</div><div class="quest-meta">마감: 내일 23:59까지</div></div>
                                </div>
                                <div style="display:flex; align-items:center;">
                                    <div class="quest-reward">+ 300 XP</div><button class="btn-quest" onclick="location.href='store_vod.html'">수강하기</button>
                                </div>
                            </div>
                            <div class="quest-item" style="opacity: 0.6; background:#f1f5f9; border-color:#e2e8f0;">
                                <div style="display:flex; align-items:center;">
                                    <div class="quest-icon q-green" style="background:#e2e8f0; color:#94a3b8;"><i class="fas fa-check"></i></div>
                                    <div class="quest-info"><div class="quest-title" style="text-decoration:line-through;">KATCH 모의고사 오답노트 작성</div><div class="quest-meta">완료됨</div></div>
                                </div>
                                <div style="display:flex; align-items:center;">
                                    <div class="quest-reward" style="background:transparent; border:none; color:#16a34a;"><i class="fas fa-check-circle"></i> 지급 완료</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel">
                        <div class="panel-header"><h3 class="panel-title"><i class="fas fa-history text-indigo-600"></i> 최근 성적 / 응시 이력</h3></div>
                        <div>
                            <div class="eh-item">
                                <div><div class="eh-title">제3회 KATCH 모의고사 (영어)</div><div class="eh-meta">2026.04.15 | KATCH 온라인 응시</div></div>
                                <div style="text-align:right;"><div class="eh-score">84<span style="font-size:14px; color:#888;">점</span></div><a href="report_premium.html" class="btn-outline-indigo" style="display:inline-block; margin-top:5px; text-decoration:none;">성적표 분석</a></div>
                            </div>
                            <div class="eh-item">
                                <div><div class="eh-title">제2회 KATCH 모의고사 (영어)</div><div class="eh-meta">2026.03.10 | 대치 본원 오프라인 응시</div></div>
                                <div style="text-align:right;"><div class="eh-score">82<span style="font-size:14px; color:#888;">점</span></div><a href="report_premium.html" class="btn-outline-indigo" style="display:inline-block; margin-top:5px; text-decoration:none;">성적표 분석</a></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display:flex; flex-direction:column; gap:25px;">
                    <div class="panel">
                        <div class="panel-header" style="margin-bottom:10px;"><h3 class="panel-title"><i class="fas fa-trophy text-yellow-500"></i> 나의 학습 위치</h3></div>
                        <div class="rank-card">
                            <h3>소속 반 내 상위권 도약 중!</h3>
                            <div class="huge">Top 12%</div>
                            <p>다음 달까지 Top 10% 진입 시 5,000 P 특별 보상</p>
                        </div>
                        <div style="height: 200px; padding: 10px;">
                            <canvas id="studentRadarChart"></canvas>
                        </div>
                        <div class="ai-weakness">
                            <div class="ai-title"><i class="fas fa-robot text-blue-500"></i> AI 약점 처방</div>
                            <div class="ai-desc">이번 주 <strong style="color:#ef4444;">어법 (문장구조)</strong> 영역의 오답률이 급증했습니다! AI맞춤형 처방을 확인하세요.</div>
                            <button class="btn-quest" style="width:100%; margin:10px 0 0 0; background:#3b82f6;" onclick="location.href='problem_bank.html'">맞춤 처방 훈련 시작</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="teacherView">
            <div class="crm-hero">
                <div>
                    <h2>강인호 강사 워크스페이스 <i class="fas fa-check-circle text-green-500" style="font-size:18px;"></i></h2>
                    <p>현재 3개 반, 총 24명의 학생을 특별 관리하고 있습니다.</p>
                </div>
                <div class="crm-actions">
                    <button class="btn-crm btn-crm-outline" onclick="location.href='admin_input.html'"><i class="fas fa-database"></i> 문제 은행 관리</button>
                    <button class="btn-crm btn-crm-outline" onclick="location.href='problem_bank.html'"><i class="fas fa-pencil-alt"></i> 교재 / 시험지 생성</button>
                    <button class="btn-crm btn-crm-primary" onclick="bulkAssignModal()"><i class="fas fa-paper-plane"></i> 일괄 과제 배포</button>
                </div>
            </div>

            <div class="crm-widgets">
                <div class="crm-widget">
                    <div class="cw-icon cw-blue"><i class="fas fa-users"></i></div>
                    <div class="cw-info"><h4>총 수강생</h4><div class="cw-val">24<span style="font-size:14px; color:#94a3b8; font-weight:600;">명</span></div></div>
                </div>
                <div class="crm-widget" style="cursor: pointer;" onclick="filterTableByStatus('good')">
                    <div class="cw-icon cw-green"><i class="fas fa-check-double"></i></div>
                    <div class="cw-info"><h4>평균 과제 제출률</h4><div class="cw-val">85<span style="font-size:14px; color:#94a3b8; font-weight:600;">%</span></div></div>
                </div>
                <div class="crm-widget">
                    <div class="cw-icon cw-yellow"><i class="fas fa-chart-line"></i></div>
                    <div class="cw-info"><h4>반 평균 점수</h4><div class="cw-val">81.5<span style="font-size:14px; color:#94a3b8; font-weight:600;">점</span></div></div>
                </div>
                <div class="crm-widget" style="border-left: 4px solid #ef4444; cursor:pointer;" onclick="filterTableByStatus('danger')">
                    <div class="cw-icon cw-red"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="cw-info"><h4>주의/위험 학생</h4><div class="cw-val" id="risk-count">3<span style="font-size:14px; color:#94a3b8; font-weight:600;">명</span></div></div>
                </div>
            </div>

            <div class="risk-banner">
                <div class="risk-info">
                    <i class="fas fa-bell"></i>
                    <div>
                        <h4>AI 리스크 모니터링 경보</h4>
                        <p><strong>최유나(외고 심화반)</strong> 과제 미제출 연속 3회 누적 및 성적 급락 감지. 빠른 상담 요망.</p>
                    </div>
                </div>
                <button class="btn-risk" onclick="openStudentModal(5)">학생 차트 보기 / 상담</button>
            </div>

            <div class="crm-table-container">
                <div class="crm-table-header">
                    <h3><i class="fas fa-clipboard-list text-indigo-600"></i> 수강생 통합 관리대장</h3>
                    <div class="crm-filters">
                        <div class="crm-search"><i class="fas fa-search"></i><input type="text" id="student-search" placeholder="학생명 검색..." oninput="renderTable()"></div>
                        <select class="crm-select" id="class-filter" onchange="renderTable()">
                            <option value="">모든 클래스</option>
                            <option value="외고 최상위반">외고 최상위반</option>
                            <option value="외고 심화반">외고 심화반</option>
                            <option value="의대 준비 프리미엄">의대 준비 프리미엄</option>
                        </select>
                        <select class="crm-select" id="status-filter" onchange="renderTable()">
                            <option value="">모든 상태</option>
                            <option value="danger">위험 (집중 관리)</option>
                            <option value="warning">주의 (관찰 요망)</option>
                            <option value="good">양호</option>
                        </select>
                        <button class="btn-crm btn-crm-outline" style="padding: 10px; font-size: 13px;"><i class="fas fa-file-excel text-green-600"></i> 엑셀 다운로드</button>
                    </div>
                </div>
                <table class="crm-table">
                    <thead>
                        <tr><th width="40">#</th><th width="220">학생 정보</th><th>모의고사 점수</th><th>성적 추이</th><th>최근 과제</th><th width="120">빠른 액션</th></tr>
                    </thead>
                    <tbody id="crm-table-body"></tbody>
                </table>
            </div>
        </div>

        <div class="modal-overlay" id="studentDetailModal" style="align-items:center; justify-content:center;">
            <div class="modal-content" style="width:min(900px,95vw); max-height:92vh;">
                <div class="modal-header" id="modal-student-header">
                    <div><h2 id="modal-student-name" style="margin:0 0 4px;"></h2><div id="modal-student-meta" style="font-size:13px; opacity:0.8;"></div></div>
                    <button class="btn-close" onclick="closeStudentModal()">&times;</button>
                </div>
                <div style="display:flex; background:#f8f9fa; border-bottom:1px solid #e0e0e0; gap:0; overflow-x:auto;">
                    <button class="sdt-tab active" onclick="switchStudentTab('report')"><i class="fas fa-list-check"></i> 정오표</button>
                    <button class="sdt-tab" onclick="switchStudentTab('trend')"><i class="fas fa-chart-line"></i> 성적 추이</button>
                    <button class="sdt-tab" onclick="switchStudentTab('homework')"><i class="fas fa-book-open"></i> 과제 현황</button>
                    <button class="sdt-tab" onclick="switchStudentTab('note')"><i class="fas fa-sticky-note"></i> 상담 노트</button>
                </div>
                <div class="modal-body" id="modal-tab-body"></div>
            </div>
        </div>

        <div class="modal-overlay" id="bulkModal" style="align-items:center; justify-content:center;">
            <div class="modal-content" style="width:min(500px,95vw); max-height:85vh;">
                <div class="modal-header" style="background:#2563eb;">
                    <h2><i class="fas fa-paper-plane"></i> 일괄 과제 배포</h2>
                    <button class="btn-close" onclick="document.getElementById('bulkModal').classList.remove('active')">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom:16px;"><label style="font-size:13px; font-weight:700; color:#555; display:block; margin-bottom:6px;">배포 대상 클래스</label><select style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; font-size:14px;"><option>전체 (24명)</option></select></div>
                    <div style="margin-bottom:16px;"><label style="font-size:13px; font-weight:700; color:#555; display:block; margin-bottom:6px;">과제 유형</label><select style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; font-size:14px;"><option>GVR OMR 제출</option></select></div>
                    <div style="margin-bottom:16px;"><label style="font-size:13px; font-weight:700; color:#555; display:block; margin-bottom:6px;">제출 마감일</label><input type="date" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; font-size:14px;" id="bulkDate"></div>
                    <div style="margin-bottom:20px;"><label style="font-size:13px; font-weight:700; color:#555; display:block; margin-bottom:6px;">과제 설명</label><textarea style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; resize:vertical; min-height:80px;"></textarea></div>
                    <button onclick="alert('배포되었습니다.'); document.getElementById('bulkModal').classList.remove('active');" style="width:100%; padding:16px; background:#2563eb; color:white; border:none; border-radius:10px; font-weight:900; cursor:pointer;"><i class="fas fa-paper-plane"></i> 과제 배포하기</button>
                </div>
            </div>
        </div>
    <script>
        const STUDENTS = [
            { id:1, name:'박지민', className:'외고 최상위반', score:96, delta:14.5, wrong:2, hw:'제출', status:'good' },
            { id:2, name:'김지훈', className:'외고 최상위반', score:88, delta:6.5, wrong:5, hw:'제출', status:'good' },
            { id:3, name:'이수진', className:'외고 최상위반', score:84, delta:2.5, wrong:7, hw:'제출', status:'good' },
            { id:4, name:'조동기', className:'외고 심화반', score:76, delta:-5.5, wrong:11, hw:'미제출', status:'warning' },
            { id:5, name:'최유나', className:'외고 심화반', score:68, delta:-13.5, wrong:15, hw:'미제출', status:'danger' },
            { id:6, name:'정하윤', className:'외고 심화반', score:91, delta:9.5, wrong:3, hw:'제출', status:'good' },
            { id:7, name:'오서율', className:'의대 준비 프리미엄', score:64, delta:-17.5, wrong:18, hw:'미제출', status:'danger' },
            { id:8, name:'강다온', className:'의대 준비 프리미엄', score:79, delta:-2.5, wrong:9, hw:'제출', status:'warning' },
        ];
        let selectedStudent = null;
        let radarChartInstance = null;
        
        function renderTable() {
            const search = (document.getElementById('student-search')?.value || '').toLowerCase();
            const cls = document.getElementById('class-filter')?.value || '';
            const status = document.getElementById('status-filter')?.value || '';
            const tbody = document.getElementById('crm-table-body');
            if (!tbody) return;
            const filtered = STUDENTS.filter(s => {
                if (search && !s.name.toLowerCase().includes(search)) return false;
                if (cls && s.className !== cls) return false;
                if (status === 'danger' && s.status !== 'danger') return false;
                if (status === 'warning' && !['danger','warning'].includes(s.status)) return false;
                if (status === 'good' && s.status !== 'good') return false;
                return true;
            });
            tbody.innerHTML = filtered.map((s, i) => `
                <tr style="background: ${s.status === 'danger' ? '#fef2f2' : s.status === 'warning' ? '#fffbeb' : 'white'};">
                    <td style="color:#94a3b8;">${i+1}</td>
                    <td>
                        <div class="stu-name-cell">
                            <div class="stu-mini-avatar" style="background:${s.status === 'danger' ? '#fecaca' : s.status === 'warning' ? '#fef08a' : '#e0e7ff'}; color:${s.status === 'danger' ? '#b91c1c' : s.status === 'warning' ? '#b45309' : '#4f46e5'}">${s.name[0]}</div>
                            <div style="cursor:pointer;" onclick="openStudentModal(${s.id})">
                                <div class="stu-name-col">${s.name} ${s.status === 'danger' ? '<i class="fas fa-exclamation-circle text-red-500 text-xs"></i>' : ''}</div>
                                <div class="stu-class-col">${s.className}</div>
                            </div>
                        </div>
                    </td>
                    <td><div style="font-size:16px; font-weight:800; color:#1e293b;">${s.score}<span style="font-size:12px; color:#64748b; font-weight:600;">점</span></div></td>
                    <td><div class="score-trend"><span class="${s.delta >= 0 ? 'trend-up' : 'trend-down'}"><i class="fas fa-arrow-${s.delta >= 0 ? 'up' : 'down'}"></i> ${Math.abs(s.delta)}</span></div></td>
                    <td><div class="hw-badge ${s.hw === '제출' ? 'hw-done' : 'hw-miss'}">${s.hw === '제출' ? '제출 완료' : '미제출 🚨'}</div></td>
                    <td>
                        <div class="action-btns">
                            <button class="btn-act primary-act" title="상담" onclick="openStudentModal(${s.id})"><i class="fas fa-user-md"></i></button>
                            <button class="btn-act" title="메시지"><i class="fas fa-comment-dots"></i></button>
                            <button class="btn-act" title="맞춤 숙제"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </td>
                </tr>
            `).join('');
            document.getElementById('risk-count').innerHTML = STUDENTS.filter(s => s.status === 'danger' || s.status === 'warning').length + '<span style="font-size:14px; color:#94a3b8; font-weight:600;">명</span>';
        }
        function filterTableByStatus(status) { document.getElementById('status-filter').value = status; renderTable(); document.getElementById('teacherView').scrollIntoView({ behavior: 'smooth' }); }
        function bulkAssignModal() { document.getElementById('bulkDate').valueAsDate = new Date(); document.getElementById('bulkModal').classList.add('active'); }
        function openStudentModal(id) {
            selectedStudent = STUDENTS.find(s => s.id === id);
            if (!selectedStudent) return;
            document.getElementById('modal-student-name').textContent = selectedStudent.name + ' 학생 통합 관리';
            document.getElementById('modal-student-meta').textContent = selectedStudent.className + ' ・ 최신 점수: ' + selectedStudent.score + '점 ・ 오답: ' + selectedStudent.wrong + '개';
            switchStudentTab('report');
            document.getElementById('studentDetailModal').classList.add('active');
        }
        function closeStudentModal() { document.getElementById('studentDetailModal').classList.remove('active'); }
        function switchStudentTab(tab) {
            document.querySelectorAll('.sdt-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.sdt-tab').forEach(t => { if (t.textContent.includes(tab === 'report' ? '정오표' : tab === 'trend' ? '성적' : tab === 'homework' ? '과제' : '상담')) t.classList.add('active'); });
            const body = document.getElementById('modal-tab-body');
            const s = selectedStudent;
            if (!s) return;
            if (tab === 'report') {
                body.innerHTML = \`<div style="display:flex; gap:20px; align-items:center; margin-bottom:25px; background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0;">
                        <div style="font-size:36px; font-weight:900; color:#1e293b;">\${s.score}<span style="font-size:14px; color:#64748b;">점</span></div>
                        <div style="width:1px; height:40px; background:#cbd5e1;"></div>
                        <div style="color:#64748b; font-weight:600;">반평균 81.5점 (대비 <span style="color:\${s.delta>=0?'#10b981':'#ef4444'}">\${s.delta>=0?'+':''}\${s.delta}</span>)</div>
                        <div style="width:1px; height:40px; background:#cbd5e1;"></div><div style="color:#64748b; font-weight:600;">오답: <strong style="color:#ef4444;">\${s.wrong}개</strong></div>
                    </div>
                    <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:12px; padding:20px; margin-bottom:20px;">
                        <div style="font-weight:900; color:#ef4444; margin-bottom:10px; font-size:15px;"><i class="fas fa-skull"></i> 킬러 문항 취약 분석</div>
                        <p style="font-size:14px; color:#334155; line-height:1.7; background:white; padding:15px; border-radius:8px; border-left:4px solid #ef4444; margin:0; font-weight:600;">AI 분석: <strong>빈칸 추론(전체 오답률 78%)</strong>과 <strong>어법 위치(전체 오답률 65%)</strong> 함정에 취약합니다.</p>
                    </div>
                    <table style="width:100%; border-collapse:collapse; border:1px solid #e2e8f0;">
                        <thead><tr style="background:#f8fafc;"><th style="padding:12px; text-align:left; color:#64748b; font-size:13px;">문항</th><th style="padding:12px; text-align:left; color:#64748b; font-size:13px;">영역/유형</th><th style="padding:12px; text-align:center; color:#64748b; font-size:13px;">제출</th><th style="padding:12px; text-align:center; color:#64748b; font-size:13px;">정답</th></tr></thead>
                        <tbody><tr><td style="padding:12px; border-top:1px solid #e2e8f0;">21</td><td style="padding:12px; border-top:1px solid #e2e8f0;"><strong>빈칸 추론</strong></td><td style="padding:12px; text-align:center; color:#ef4444; font-weight:900; border-top:1px solid #e2e8f0;">③</td><td style="padding:12px; text-align:center; color:#10b981; font-weight:900; border-top:1px solid #e2e8f0;">②</td></tr><tr><td style="padding:12px; border-top:1px solid #e2e8f0;">34</td><td style="padding:12px; border-top:1px solid #e2e8f0;"><strong>어법 (위치)</strong></td><td style="padding:12px; text-align:center; color:#ef4444; font-weight:900; border-top:1px solid #e2e8f0;">①</td><td style="padding:12px; text-align:center; color:#10b981; font-weight:900; border-top:1px solid #e2e8f0;">④</td></tr></tbody>
                    </table>\`;
            } else if (tab === 'trend') {
                body.innerHTML = \`<div style="height:260px; margin-bottom:20px;"><canvas id="modal-trend-chart"></canvas></div>\`;
                setTimeout(() => {
                    const ctx = document.getElementById('modal-trend-chart')?.getContext('2d');
                    if (ctx) new Chart(ctx, { type: 'bar', data: { labels: ['1회차','2회차','3회차(최신)'], datasets: [{ label: '학생 점수', data: [70, Math.max(50, s.score - s.delta), s.score], backgroundColor: '#3b82f6', borderRadius: 4 }, { label: '반 평균', type: 'line', data: [75, 78, 81.5], borderColor: '#f59e0b', fill: false, tension: 0.1 }]}, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { min:50, max:100 } } } });
                }, 50);
            } else if (tab === 'note') {
                body.innerHTML = \`<div style="margin-bottom:20px; background:#f8fafc; border-radius:10px; padding:16px; border:1px solid #e2e8f0;"><div style="font-size:13px; font-weight:700; color:#64748b; margin-bottom:10px;">저장된 상담 노트</div><div style="background:white; border-radius:8px; padding:15px; border-left:4px solid #3b82f6; margin-bottom:10px; border:1px solid #e2e8f0; border-left-width:4px;"><div style="font-size:12px; color:#94a3b8; font-weight:600; margin-bottom:5px;">2026.03.10 강인호 작성</div><div style="font-size:14px; color:#334155; line-height:1.6; font-weight:600;">단어 암기량이 부족하여 독해가 밀리는 현상. VOD 보강 지시.</div></div></div><textarea placeholder="새 상담 노트를 입력하세요..." style="width:100%; min-height:100px; padding:14px; border:1px solid #cbd5e1; border-radius:10px; font-family:inherit; font-size:14px; resize:vertical; margin-bottom:12px; outline:none; focus:border-color:#3b82f6;"></textarea><button style="padding:12px 24px; background:#2563eb; color:white; border:none; border-radius:8px; font-weight:900; cursor:pointer; width:100%;"><i class="fas fa-save"></i> 노트 저장</button>\`;
            } else { body.innerHTML = \`<div style="padding:30px; text-align:center; color:#64748b; font-weight:600;">과제 내역이 표시됩니다.</div>\`; }
        }
        function switchView(view) {
            document.getElementById('btnStudent').classList.remove('active');
            document.getElementById('btnTeacher').classList.remove('active');
            if (view === 'student') {
                document.getElementById('btnStudent').classList.add('active');
                document.getElementById('studentView').style.display = 'block';
                document.getElementById('teacherView').style.display = 'none';
                setTimeout(() => renderRadarChart(), 100);
            } else {
                document.getElementById('btnTeacher').classList.add('active');
                document.getElementById('studentView').style.display = 'none';
                document.getElementById('teacherView').style.display = 'block';
                renderTable();
            }
        }
        function renderRadarChart() {
            const ctx = document.getElementById('studentRadarChart')?.getContext('2d');
            if (!ctx) return;
            if (radarChartInstance) radarChartInstance.destroy();
            Chart.defaults.color = '#64748b'; Chart.defaults.font.family = 'Pretendard';
            radarChartInstance = new Chart(ctx, {
                type: 'radar',
                data: { labels: ['어휘 (VO)', '구문 (SC)', '독해 (RC)', '어법 (GR)', '듣기 (LC)', '모의 (MT)'], datasets: [{ label: '나의 역량', data: [85, 90, 75, 50, 95, 80], backgroundColor: 'rgba(79, 70, 229, 0.2)', borderColor: '#4f46e5', borderWidth: 2, pointBackgroundColor: '#4f46e5' }, { label: '반 평균', data: [70, 75, 80, 75, 85, 75], backgroundColor: 'rgba(203, 213, 225, 0.2)', borderColor: '#94a3b8', borderWidth: 1, pointBackgroundColor: '#94a3b8' }] },
                options: { responsive: true, maintainAspectRatio: false, scales: { r: { angleLines: { color: '#e2e8f0' }, grid: { color: '#e2e8f0' }, pointLabels: { font: { size: 12, weight: 800 }, color: '#334155' }, ticks: { display: false, min: 0, max: 100, stepSize: 20 } } }, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } } } }
            });
        }
        document.addEventListener('DOMContentLoaded', () => {
            renderRadarChart(); renderTable();
            window.onclick = function(e) { if(e.target.classList.contains('modal-overlay')) e.target.classList.remove('active'); };
        });
    </script>"""

new_lines = new_ui.split(chr(10))

lines = lines[:207] + [line + chr(10) for line in new_lines] + lines[791:]
with open(target_file, "w", encoding="utf-8") as f:
    f.writelines(lines)
