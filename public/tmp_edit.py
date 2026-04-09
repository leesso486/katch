import re

with open('dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace CSS
new_css = """
        /* Student Dashboard Gamification Styling (Redesigned) */
        .student-layout { display: flex; gap: 30px; }
        .s-sidebar { width: 240px; background: white; border-radius: 16px; padding: 20px 0; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.03); flex-shrink: 0; align-self: flex-start; position: sticky; top: 100px; }
        .s-sidebar-logo { padding: 0 24px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #f1f5f9; margin-bottom: 15px; }
        .s-sidebar-logo .icon { width: 32px; height: 32px; background: #2563eb; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .s-sidebar-logo .text { font-weight: 800; font-size: 16px; color: #1e293b; line-height: 1.1; }
        .s-sidebar-logo .sub { font-size: 11px; color: #64748b; font-weight: 700; letter-spacing: 0.5px; }
        .s-nav { list-style: none; padding: 0; margin: 0; }
        .s-nav li { margin-bottom: 4px; padding: 0 12px; }
        .s-nav a { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; color: #64748b; text-decoration: none; font-weight: 700; font-size: 14px; transition: 0.2s; }
        .s-nav a:hover { background: #f8fafc; color: #1e293b; }
        .s-nav a.active { background: #eff6ff; color: #2563eb; }
        .s-nav a i { width: 18px; text-align: center; font-size: 16px; }
        .s-help { margin: 20px 12px 0; background: #f1f5f9; padding: 16px; border-radius: 12px; }
        .s-help-title { font-size: 13px; font-weight: 800; color: #334155; margin-bottom: 4px; }
        .s-help-desc { font-size: 11px; color: #64748b; }
        
        .s-main { flex-grow: 1; min-width: 0; }
        .s-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .s-breadcrumb { font-size: 14px; color: #64748b; font-weight: 600; }
        .s-breadcrumb span { color: #2563eb; font-weight: 800; }
        .s-status { display: flex; gap: 12px; align-items: center; }
        .s-badge { padding: 8px 16px; background: white; border-radius: 20px; font-weight: 800; font-size: 14px; display: flex; align-items: center; gap: 8px; border: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .s-avatar { width: 40px; height: 40px; border-radius: 50%; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        
        .s-hero { background: linear-gradient(135deg, #1d4ed8, #3b82f6); border-radius: 16px; padding: 32px; color: white; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2); }
        .s-hero h1 { font-size: 26px; font-weight: 900; margin: 0 0 10px 0; line-height: 1.3; }
        .s-hero p { margin: 0 0 20px 0; font-size: 14px; opacity: 0.9; line-height: 1.5; }
        .s-days { display: flex; gap: 10px; }
        .s-day { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; transition: 0.2s; }
        .s-day.done { background: white; color: #2563eb; }
        .s-day.now { background: #fbbf24; color: white; border: 2px solid white; }
        .s-rank { background: rgba(255,255,255,0.15); padding: 20px 30px; border-radius: 16px; text-align: center; backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.2); }
        .s-rank i { font-size: 30px; color: #fde047; margin-bottom: 8px; }
        .s-rank-lbl { font-size: 13px; font-weight: 600; opacity: 0.9; margin-bottom: 4px; }
        .s-rank-val { font-size: 24px; font-weight: 900; }
        
        .s-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (min-width: 1024px) { .s-grid { grid-template-columns: 1.5fr 1fr; } }
        
        .s-card { background: white; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
        .s-sec-h { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .s-sec-h h2 { font-size: 18px; font-weight: 900; color: #1e293b; margin: 0; }
        .s-sec-h a { font-size: 13px; color: #2563eb; font-weight: 700; text-decoration: none; }
        
        .s-task { padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; display: flex; align-items: center; gap: 16px; margin-bottom: 12px; transition: 0.2s; }
        .s-task:hover { border-color: #cbd5e1; box-shadow: 0 4px 15px rgba(0,0,0,0.03); transform: translateY(-2px); }
        .s-ticon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .s-tbadge { display: inline-block; padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 800; margin-bottom: 6px; letter-spacing: 0.5px; }
        .s-title { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
        .s-btn { padding: 8px 20px; border-radius: 20px; font-size: 13px; font-weight: 800; border: none; cursor: pointer; transition: 0.2s; white-space: nowrap; }
        .sb-blue { background: #2563eb; color: white; } .sb-blue:hover{background:#1d4ed8;}
        .sb-white { background: white; color: #64748b; border: 1px solid #cbd5e1; } .sb-white:hover{border-color:#2563eb; color:#2563eb;}
        .sb-green { background: #10b981; color: white; } .sb-green:hover{background:#059669;}
        
        .s-table { width: 100%; border-collapse: collapse; }
        .s-table th { text-align: left; padding: 12px 10px; font-size: 12px; color: #64748b; font-weight: 700; border-bottom: 1px solid #e2e8f0; }
        .s-table td { padding: 14px 10px; font-size: 13px; color: #1e293b; font-weight: 700; border-bottom: 1px solid #f1f5f9; }
        .schip { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 800; }
        .sc-g { background: #dcfce7; color: #16a34a; }
        .sc-r { background: #fee2e2; color: #dc2626; }
        
        .s-chart-box { background: #eff6ff; border-radius: 12px; padding: 20px; display: flex; align-items: center; justify-content: center; height: 260px; margin-bottom: 15px; }
        .s-chart-txt { background: #f8fafc; padding: 14px; border-radius: 8px; font-size: 13px; color: #64748b; line-height: 1.5; font-weight: 600; }
        
        .s-alist { display: flex; flex-direction: column; }
        .s-aitem { display: flex; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f5f9; }
        .sa-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: white; border: 1px solid #e2e8f0; margin-right: 14px; font-size:14px; flex-shrink: 0; }
        .sa-title { font-size: 14px; font-weight: 800; color: #1e293b; margin-bottom: 4px;}
        .sa-time { font-size: 11px; color: #94a3b8; font-weight: 600; }
        .sa-pts { font-weight: 800; font-size: 14px; margin-left: auto; }
"""

css_replace_pattern = re.compile(r'/\*\s*Student Dashboard Gamification Styling\s*\*/.*?(?=\/\*\s*Teacher CRM Dashboard Styling\s*\*\/)', re.DOTALL)
content = css_replace_pattern.sub(new_css, content)

# 2. Replace HTML
new_html = """
        <div id="studentView">
            <div class="student-layout">
                <aside class="s-sidebar">
                    <div class="s-sidebar-logo">
                        <div class="icon"><i class="fas fa-shield-alt"></i></div>
                        <div>
                            <div class="text">Accelerator</div>
                            <div class="sub">STUDENT PORTAL</div>
                        </div>
                    </div>
                    <ul class="s-nav">
                        <li><a href="#" class="active"><i class="fas fa-border-all"></i> Dashboard</a></li>
                        <li><a href="#"><i class="fas fa-book-open"></i> My Homework</a></li>
                        <li><a href="#"><i class="fas fa-file-signature"></i> GVR Test</a></li>
                        <li><a href="#"><i class="fas fa-store"></i> Points Store</a></li>
                        <li><a href="#"><i class="fas fa-user"></i> My Info</a></li>
                    </ul>
                    <div class="s-help">
                        <div class="s-help-title">Help Center</div>
                        <div class="s-help-desc">Need assistance with your homework?</div>
                    </div>
                </aside>

                <main class="s-main">
                    <div class="s-top">
                        <div class="s-breadcrumb">Main > <span>Dashboard</span></div>
                        <div class="s-status">
                            <div class="s-badge" style="color: #ea580c;"><i class="fas fa-fire"></i> 5일 연속</div>
                            <div class="s-badge" style="color: #d97706;"><i class="fas fa-coins"></i> 12,450 P</div>
                            <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" class="s-avatar">
                        </div>
                    </div>

                    <div class="s-hero">
                        <div>
                            <h1>반가워요, 박지민님!<br>오늘도 성장을 시작해볼까요?</h1>
                            <p>현재 5일 연속 학습 중입니다. 2일 더 완료하면 추가 포인트를<br>받을 수 있어요!</p>
                            <div class="s-days">
                                <div class="s-day done">월</div>
                                <div class="s-day done">화</div>
                                <div class="s-day done">수</div>
                                <div class="s-day done">목</div>
                                <div class="s-day now">금</div>
                                <div class="s-day">토</div>
                                <div class="s-day">일</div>
                            </div>
                        </div>
                        <div class="s-rank">
                            <i class="fas fa-medal"></i>
                            <div class="s-rank-lbl">이번 주 랭킹</div>
                            <div class="s-rank-val">상위 5%</div>
                        </div>
                    </div>

                    <div class="s-grid">
                        <div>
                            <!-- Tasks -->
                            <div class="s-sec-h">
                                <h2>오늘의 과제</h2>
                                <a href="#">전체 보기</a>
                            </div>
                            <div style="margin-bottom: 24px;">
                                <div class="s-task" style="border-left: 4px solid #f59e0b;">
                                    <div class="s-ticon" style="background: #eff6ff; color: #2563eb;"><i class="fas fa-book-reader"></i></div>
                                    <div style="flex-grow:1;">
                                        <div class="s-tbadge" style="background:#e0e7ff; color:#4f46e5;">READING</div>
                                        <div class="s-title">GVR Chapter 5: 문장 구조의 이해</div>
                                        <div style="display:flex; align-items:center; gap:10px;">
                                            <div style="flex-grow:1; height:6px; background:#f1f5f9; border-radius:3px; overflow:hidden;"><div style="height:100%; width:60%; background:#2563eb;"></div></div>
                                            <div style="font-size:12px; font-weight:800; color:#2563eb;">60%</div>
                                        </div>
                                    </div>
                                    <button class="s-btn sb-blue" onclick="location.href='omr.html'">계속하기</button>
                                </div>
                                <div class="s-task">
                                    <div class="s-ticon" style="background: #fef2f2; color: #ef4444;"><i class="fas fa-play-circle"></i></div>
                                    <div style="flex-grow:1;">
                                        <div class="s-tbadge" style="background:#fce7f3; color:#db2777;">LECTURE</div>
                                        <div class="s-title">Level 2 심화 영문법 - 관계대명사</div>
                                        <div style="font-size:12px; color:#64748b; font-weight:600;">강의 시간: 45분</div>
                                    </div>
                                    <button class="s-btn sb-white" onclick="location.href='store_vod.html'">시청하기</button>
                                </div>
                                <div class="s-task">
                                    <div class="s-ticon" style="background: #f0fdf4; color: #10b981;"><i class="fas fa-language"></i></div>
                                    <div style="flex-grow:1;">
                                        <div class="s-tbadge" style="background:#dcfce7; color:#16a34a;">VOCABULARY</div>
                                        <div class="s-title">수담비 필수 50단어</div>
                                        <div style="font-size:12px; color:#64748b; font-weight:600;">오늘의 목표: 50개 / 현재 0개</div>
                                    </div>
                                    <button class="s-btn sb-green" onclick="location.href='problem_bank.html'">학습 시작</button>
                                </div>
                            </div>

                            <!-- Table -->
                            <div class="s-sec-h">
                                <h2>최근 테스트 결과</h2>
                            </div>
                            <div class="s-card" style="padding: 0; overflow: hidden;">
                                <table class="s-table">
                                    <thead><tr><th>테스트 명</th><th>날짜</th><th>점수</th><th>상태</th></tr></thead>
                                    <tbody>
                                        <tr>
                                            <td>주간 어휘 평가 - Week 4</td>
                                            <td style="color:#64748b; font-weight:600;">2026.04.10</td>
                                            <td style="color:#2563eb;">95/100</td>
                                            <td><div class="schip sc-g">합격</div></td>
                                        </tr>
                                        <tr>
                                            <td>GVR 문법 성취도 평가</td>
                                            <td style="color:#64748b; font-weight:600;">2026.04.05</td>
                                            <td style="color:#2563eb;">82/100</td>
                                            <td><div class="schip sc-g">합격</div></td>
                                        </tr>
                                        <tr>
                                            <td>Mid-Term Mock Test</td>
                                            <td style="color:#64748b; font-weight:600;">2026.03.20</td>
                                            <td style="color:#ef4444;">68/100</td>
                                            <td><div class="schip sc-r">재응시 권고</div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <!-- Radar Chart -->
                            <div class="s-card" style="margin-bottom: 24px;">
                                <h2 style="font-size:16px; font-weight:900; color:#1e293b; margin:0 0 16px 0;">학습 역량 분석</h2>
                                <div class="s-chart-box">
                                    <canvas id="studentRadarChart"></canvas>
                                </div>
                                <div class="s-chart-txt">
                                    <strong style="color:#1e293b;">문법</strong> 영역이 지난주 대비 <strong style="color:#10b981;">12%</strong> 상승했습니다! 독해 영역 보충이 필요해 보입니다.
                                </div>
                            </div>

                            <!-- Timeline -->
                            <div class="s-card">
                                <h2 style="font-size:16px; font-weight:900; color:#1e293b; margin:0 0 16px 0;">최근 활동 & 포인트</h2>
                                <div class="s-alist">
                                    <div class="s-aitem">
                                        <div class="sa-icon" style="color:#f59e0b;"><i class="fas fa-calendar-check"></i></div>
                                        <div><div class="sa-title">일일 출석 체크</div><div class="sa-time">오늘 09:12</div></div>
                                        <div class="sa-pts" style="color:#10b981;">+100 P</div>
                                    </div>
                                    <div class="s-aitem">
                                        <div class="sa-icon" style="color:#2563eb;"><i class="fas fa-check-double"></i></div>
                                        <div><div class="sa-title">GVR Chapter 4 완료</div><div class="sa-time">어제 21:45</div></div>
                                        <div class="sa-pts" style="color:#10b981;">+500 P</div>
                                    </div>
                                    <div class="s-aitem">
                                        <div class="sa-icon" style="color:#d97706;"><i class="fas fa-trophy"></i></div>
                                        <div><div class="sa-title">어휘 테스트 만점 보상</div><div class="sa-time">2026.04.10</div></div>
                                        <div class="sa-pts" style="color:#10b981;">+1,000 P</div>
                                    </div>
                                    <div class="s-aitem" style="border:none; padding-bottom:0;">
                                        <div class="sa-icon" style="color:#64748b;"><i class="fas fa-shopping-bag"></i></div>
                                        <div><div class="sa-title">편의점 5천원권 교환</div><div class="sa-time">2026.04.08</div></div>
                                        <div class="sa-pts" style="color:#ef4444;">-5,000 P</div>
                                    </div>
                                </div>
                                <button class="s-btn sb-white" style="width:100%; margin-top:20px;">포인트 내역 더보기</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
"""

html_replace_pattern = re.compile(r'<div id="studentView">.*?</div>\s*<div id="teacherView">', re.DOTALL)
content = html_replace_pattern.sub(new_html + '\n        <div id="teacherView">', content)

# 3. Update Chart Logic
old_chart_logic = """
            radarChartInstance = new Chart(ctx, {
                type: 'radar',
                data: { labels: ['어휘 (VO)', '구문 (SC)', '독해 (RC)', '어법 (GR)', '듣기 (LC)', '모의 (MT)'], datasets: [{ label: '나의 역량', data: [85, 90, 75, 50, 95, 80], backgroundColor: 'rgba(79, 70, 229, 0.2)', borderColor: '#4f46e5', borderWidth: 2, pointBackgroundColor: '#4f46e5' }, { label: '반 평균', data: [70, 75, 80, 75, 85, 75], backgroundColor: 'rgba(203, 213, 225, 0.2)', borderColor: '#94a3b8', borderWidth: 1, pointBackgroundColor: '#94a3b8' }] },
                options: { responsive: true, maintainAspectRatio: false, scales: { r: { angleLines: { color: '#e2e8f0' }, grid: { color: '#e2e8f0' }, pointLabels: { font: { size: 12, weight: 800 }, color: '#334155' }, ticks: { display: false, min: 0, max: 100, stepSize: 20 } } }, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } } } }
            });
"""

new_chart_logic = """
            radarChartInstance = new Chart(ctx, {
                type: 'radar',
                data: { labels: ['어휘', '문법', '독해', '듣기', '수학', '논리'], datasets: [{ label: '나의 성취도', data: [82, 85, 68, 90, 75, 80], backgroundColor: 'rgba(37, 99, 235, 0.2)', borderColor: '#2563eb', borderWidth: 2, pointBackgroundColor: '#2563eb' }, { label: '반 평균', data: [75, 80, 75, 85, 68, 70], backgroundColor: 'transparent', borderColor: '#94a3b8', borderWidth: 2, borderDash: [5,5], pointBackgroundColor: '#94a3b8' }] },
                options: { responsive: true, maintainAspectRatio: false, scales: { r: { angleLines: { color: '#e2e8f0' }, grid: { color: '#e2e8f0' }, pointLabels: { font: { size: 12, weight: 800 }, color: '#1e293b' }, ticks: { display: false, min: 0, max: 100, stepSize: 20 } } }, plugins: { legend: { display: false } } }
            });
"""

content = content.replace(old_chart_logic, new_chart_logic)

with open('dashboard.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement successful.")
