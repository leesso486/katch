$UTF8 = New-Object System.Text.UTF8Encoding($false)

$GLOBAL_HEAD = @"
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KATCH - 강사 워크스페이스</title>
    <!-- CSS -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="sub.css">
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { background-color: #f4f6f9; font-family: 'Pretendard', sans-serif; margin:0; padding:0; color:#1e293b; overflow-x:hidden;}
        
        .ml-topbar {
            height: 60px; background: #111; color: white;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px; position: sticky; top: 0; z-index: 999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .ml-topbar-left { display: flex; align-items: center; gap: 15px; }
        .ml-logo { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 22px; letter-spacing: -1px; }
        .ml-logo a { color: white; text-decoration: none; }
        .ml-logo span { color: #E91E63; }
        .ml-page-title { font-size: 15px; font-weight: 700; opacity: 0.7; border-left: 1px solid rgba(255,255,255,0.2); padding-left: 15px; }
        .ml-topbar-right { display: flex; align-items: center; gap: 15px; }
        .role-toggle { display: flex; background: rgba(255,255,255,0.1); border-radius: 20px; padding: 3px; }
        .role-btn { padding: 5px 14px; border-radius: 16px; font-size: 12px; font-weight: 700; cursor: pointer; border: none; background: transparent; color: rgba(255,255,255,0.6); transition: 0.2s; }
        .role-btn.active { background: white; color: #111; }
        .user-pts { background: rgba(255,193,7,0.15); border: 1px solid rgba(255,193,7,0.3); color: #FFD700; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 700; cursor: pointer; text-decoration:none; display:flex; gap:6px; align-items:center; }
        .user-info { display: flex; align-items: center; gap: 10px; font-size: 14px; }
        .user-avatar { width: 34px; height: 34px; background: #1976d2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color:white; }

        .dash-container { max-width: 1600px; margin: 30px auto; padding: 0 30px;}
        .admin-sidebar {
            width:260px; min-width:260px; background:#0f172a; height:calc(100vh - 60px); 
            position:fixed; left:0; top:60px; border-right:1px solid #1e293b; overflow-y:auto; z-index:100;
        }
        .as-nav-item { transition:0.2s; }
        .as-nav-item:hover, .as-nav-item.active { background:rgba(255,255,255,0.05); color:#fff !important; }
        .as-nav-item.active { border: 1px solid rgba(59,130,246,0.3); background:rgba(59,130,246,0.15); border-radius: 10px; }
        
        .main-wrapper { flex:1; margin-left:260px; }

        .tw-card { background: white; border-radius: 16px; padding: 22px; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 20px;}
        .tw-btn { padding: 10px 16px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: 0.2s; border: none; }
        .tw-btn.solid-blue { background: #2563eb; color: white; }
        .tw-btn.solid-blue:hover { background: #1d4ed8; }
        .tw-btn.solid-pink { background: #e91e63; color: white; box-shadow: 0 4px 10px rgba(233,30,99,0.2); }
        .tw-btn.solid-pink:hover { background: #d81b60; transform: translateY(-2px); }
        .tw-btn.outline { background: white; color: #1e293b; border: 1px solid #e2e8f0; }
        .tw-btn.outline:hover { background: #f8fafc; border-color: #cbd5e1; }
        .tw-select, .tw-input { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; font-family: inherit; color: #334155; font-weight: 600; outline: none; transition:0.2s; }
        .tw-select:focus, .tw-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        
    </style>
</head>
<body>
"@

$GLOBAL_TOPBAR = @"
<div class="ml-topbar">
    <div class="ml-topbar-left">
        <div class="ml-logo"><a href="index.html">KATCH<span>.</span></a></div>
        <div class="ml-page-title">강사 워크스페이스</div>
    </div>
    <div class="ml-topbar-right">
        <div class="role-toggle">
            <button class="role-btn" onclick="location.href='my_learning.html'"><i class="fas fa-user-graduate"></i> 학생</button>
            <button class="role-btn active"><i class="fas fa-chalkboard-teacher"></i> 강사/관리자</button>
        </div>
        <a href="#" class="user-pts"><i class="fas fa-bell"></i> 알림 3</a>
        <div class="user-info">
            <div class="user-avatar">이</div>
            <span style="font-size:14px; font-weight:600;">이은혜 강사</span>
        </div>
    </div>
</div>
"@

function getSidebar($activeId) {
    if($activeId -eq 'dash') { $d='active'; $dw='700' } else { $d=''; $dw='600' }
    if($activeId -eq 'grade') { $g='active'; $gw='700' } else { $g=''; $gw='600' }
    if($activeId -eq 'gvr') { $gv='active'; $gvw='700' } else { $gv=''; $gvw='600' }
    if($activeId -eq 'input') { $i='active'; $iw='700' } else { $i=''; $iw='600' }
    if($activeId -eq 'bank') { $b='active'; $bw='700' } else { $b=''; $bw='600' }
    if($activeId -eq 'comm') { $c='active'; $cw='700' } else { $c=''; $cw='600' }

    return @"
<div class="admin-sidebar">
    <div style="padding:25px 20px; background:linear-gradient(135deg, rgba(59,130,246,0.1), rgba(15,23,42,0)); border-bottom:1px solid rgba(255,255,255,0.05);">
        <h2 style="font-size:16px; font-weight:800; color:#fff; margin:0 0 5px 0;">이은혜 강사님</h2>
        <p style="font-size:12px; color:#94a3b8; margin:0;">고등관 전임 / KATCH 관리자</p>
    </div>
    
    <nav class="as-nav" style="padding: 20px 15px;">
        <div style="font-size:11px; font-weight:800; color:#64748b; margin:0 0 10px 10px; letter-spacing:1px;">HOME</div>
        <a href="teacher_dashboard.html" class="as-nav-item $d" style="display:flex; align-items:center; gap:12px; padding:12px 15px; color:#cbd5e1; border-radius:10px; font-size:14px; font-weight:$dw; text-decoration:none; margin-bottom:20px;"><i class="fas fa-home" style="width:20px; text-align:center;"></i> 대시보드 홈</a>

        <div style="font-size:11px; font-weight:800; color:#64748b; margin:10px 0 10px 10px; letter-spacing:1px;">학습 관리</div>
        <a href="teacher_grading.html" class="as-nav-item $g" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:$gw; text-decoration:none; margin-bottom:5px;"><i class="fas fa-check-double" style="width:20px; text-align:center;"></i> 서술형 채점 / 피드백</a>
        <a href="admin_gvr_analytics.html" class="as-nav-item $gv" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:$gvw; text-decoration:none; margin-bottom:5px;"><i class="fas fa-chart-line" style="width:20px; text-align:center;"></i> 주간 GVR 분석</a>
        <a href="teacher_dashboard.html" class="as-nav-item" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none; margin-bottom:5px;"><i class="fas fa-users-cog" style="width:20px; text-align:center;"></i> 수강생 관리(조회)</a>
        
        <div style="font-size:11px; font-weight:800; color:#64748b; margin:25px 0 10px 10px; letter-spacing:1px;">콘텐츠 관리</div>
        <a href="admin_input.html" class="as-nav-item $i" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:$iw; text-decoration:none; margin-bottom:5px;"><i class="fas fa-cloud-upload-alt" style="width:20px; text-align:center;"></i> 문항 업로드 (DB)</a>
        <a href="problem_bank.html" class="as-nav-item $b" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:$bw; text-decoration:none; margin-bottom:5px;"><i class="fas fa-layer-group" style="width:20px; text-align:center;"></i> 문제은행 출제</a>
        
        <div style="font-size:11px; font-weight:800; color:#64748b; margin:25px 0 10px 10px; letter-spacing:1px;">커뮤니티</div>
        <a href="teacher_community.html" class="as-nav-item $c" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:$cw; text-decoration:none;"><i class="fas fa-store" style="width:20px; text-align:center;"></i> 지식 마켓 & 라운지</a>
    </nav>
</div>
"@
}

$grade_sidebar = getSidebar 'grade'
$content_grading = @"
$GLOBAL_HEAD
$GLOBAL_TOPBAR
<div style="display:flex; width:100%;">
    $grade_sidebar
    <div class="main-wrapper">
        <div class="dash-container">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px;">
                <h1 style="font-size:24px; font-weight:900; margin:0;"><i class="fas fa-check-double text-indigo-500"></i> 서술형 채점 및 피드백</h1>
                <div style="display:flex; gap:10px;">
                    <select class="tw-select" style="width:auto;"><option>예비고1 특목고 배치고사 (15번 서술형)</option></select>
                    <button class="tw-btn outline"><i class="fas fa-print"></i> OMR 통합조회</button>
                </div>
            </div>

            <div style="display:grid; grid-template-columns:300px 1fr; gap:20px;">
                <!-- 대기열 -->
                <div class="tw-card" style="padding:0; overflow:hidden; display:flex; flex-direction:column; height:calc(100vh - 180px);">
                    <div style="padding:20px; background:#f8fafc; border-bottom:1px solid #e2e8f0;">
                        <div style="font-size:14px; font-weight:800;">서술형 대기열 (총 42명)</div>
                        <div style="font-size:12px; color:#64748b; margin-top:5px;">미채점 <strong style="color:#ef4444;">12명</strong> / 완료 30명</div>
                    </div>
                    <div style="flex:1; overflow-y:auto; padding:10px;">
                        <!-- 학생 아이템 -->
                        <div style="padding:15px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; margin-bottom:10px; cursor:pointer;">
                            <div style="display:flex; justify-content:space-between; align-items:start;">
                                <div><div style="font-size:14px; font-weight:800; color:#1d4ed8;">김민지 학생 <i class="fas fa-exclamation-circle text-red-500"></i></div><div style="font-size:11px; color:#64748b; margin-top:4px;">제출: 14:32</div></div>
                                <span style="font-size:10px; font-weight:800; background:#fef2f2; color:#ef4444; padding:2px 6px; border-radius:4px;">채점 대기</span>
                            </div>
                        </div>
                        <div style="padding:15px; border:1px solid transparent; border-radius:10px; margin-bottom:10px; cursor:pointer;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                            <div style="display:flex; justify-content:space-between; align-items:start;">
                                <div><div style="font-size:14px; font-weight:800; color:#334155;">이서준 학생</div><div style="font-size:11px; color:#64748b; margin-top:4px;">제출: 14:45</div></div>
                                <span style="font-size:10px; font-weight:800; background:#fef2f2; color:#ef4444; padding:2px 6px; border-radius:4px;">채점 대기</span>
                            </div>
                        </div>
                        <div style="padding:15px; border:1px solid transparent; border-radius:10px; margin-bottom:10px; cursor:pointer;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                            <div style="display:flex; justify-content:space-between; align-items:start;">
                                <div><div style="font-size:14px; font-weight:800; color:#334155;">박지우 학생</div><div style="font-size:11px; color:#64748b; margin-top:4px;">제출: 13:10</div></div>
                                <span style="font-size:10px; font-weight:800; background:#dcfce7; color:#16a34a; padding:2px 6px; border-radius:4px;">6/6점 완료</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 채점 및 피드백 -->
                <div style="display:flex; flex-direction:column; gap:20px;">
                    <div class="tw-card" style="margin-bottom:0;">
                        <h3 style="font-size:18px; margin:0 0 15px 0; font-weight:900;">김민지 학생의 답안 <span style="font-size:14px; font-weight:600; color:#64748b;">- 문항 15번 (배점 6점)</span></h3>
                        <div style="background:#f8fafc; border-left:4px solid #3b82f6; padding:20px; border-radius:8px; font-size:16px; line-height:1.6; color:#1e293b;">
                            상호 이타주의가 유지되려면 자신을 도와준 <mark style="background:#fef08a; padding:2px 4px; border-radius:4px; font-weight:800;">개체를 기억</mark>하고, 은혜를 갚지 않는 <mark style="background:#fef08a; padding:2px 4px; border-radius:4px; font-weight:800;">얌체족을 구별</mark>해내는 능력이 박쥐에게 필요하다.
                        </div>
                        <div style="font-size:12px; color:#64748b; margin-top:10px; text-align:right;">시스템 1차 판독: <strong style="color:#10b981;">유사도 85% 이상 (합격권)</strong></div>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 340px; gap:20px;">
                        <div class="tw-card" style="background:#fffbeb; border-color:#fef3c7;">
                            <h4 style="font-size:15px; margin:0 0 15px 0; color:#d97706;"><i class="fas fa-key"></i> 핵심 채점 기준표 (Rubric)</h4>
                            <div style="font-size:14px; line-height:1.6; color:#92400e; margin-bottom:15px;"><strong>모범 답안:</strong> 다른 개체를 개별적으로 인식(구별)하는 능력과 과거의 도움(사건)을 기억하는 능력이 필요하다.</div>
                            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                <span style="background:white; border:1px solid #fcd34d; color:#b45309; padding:4px 10px; font-size:12px; font-weight:800; border-radius:20px;">✓ 개체 인식 (3점)</span>
                                <span style="background:white; border:1px solid #fcd34d; color:#b45309; padding:4px 10px; font-size:12px; font-weight:800; border-radius:20px;">✓ 과거 기억 (3점)</span>
                            </div>
                        </div>

                        <div class="tw-card" style="background:#f8fafc;">
                            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
                                <span style="font-size:14px; font-weight:800; color:#475569;">최종 점수 확정</span>
                                <div style="display:flex; align-items:baseline; gap:5px;">
                                    <input type="number" value="6" style="width:60px; font-size:24px; font-weight:900; text-align:center; border:2px solid #cbd5e1; border-radius:8px; color:#1e293b;">
                                    <span style="font-size:14px; font-weight:800; color:#94a3b8;">/ 6 점</span>
                                </div>
                            </div>
                            <!-- 오답노트 발송 자동화 (Twin Clinic) -->
                            <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:15px; margin-bottom:20px;">
                                <div style="font-size:13px; font-weight:800; color:#ef4444; margin-bottom:8px;"><i class="fas fa-magic"></i> AI 추천: 유사 오답 팩 발송</div>
                                <div style="font-size:12px; color:#991b1b; margin-bottom:12px;">이 문항의 점수가 3점 이하라면, 어법(구문독해) 보충을 위한 쌍둥이 클리닉 배포를 권장합니다.</div>
                                <button class="tw-btn solid-pink" style="width:100%; font-size:12px; padding:8px;" onclick="alert('김민지 학생에게 구문독해(주제추론) 관련 쌍둥이 유사문항 5세트가 모바일 앱으로 자동 전송되었습니다.')"><i class="fas fa-copy"></i> 어법 쌍둥이 클리닉 즉시 전송</button>
                            </div>

                            <button class="tw-btn solid-blue" style="width:100%; font-size:15px;" onclick="alert('저장 완료! 다음 학생으로 넘어갑니다.')"><i class="fas fa-save"></i> 저장 및 다음 학생 채점</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body></html>
"@

[System.IO.File]::WriteAllText("teacher_grading.html", $content_grading, $UTF8)

$gvr_sidebar = getSidebar 'gvr'
$content_gvr = @"
$GLOBAL_HEAD
$GLOBAL_TOPBAR
<div style="display:flex; width:100%;">
    $gvr_sidebar
    <div class="main-wrapper">
        <div class="dash-container">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px;">
                <h1 style="font-size:24px; font-weight:900; margin:0;"><i class="fas fa-chart-line text-indigo-500"></i> 주간 GVR 학습 분석 (Custom Analytics)</h1>
                <div style="display:flex; gap:10px;">
                    <select class="tw-select" style="width:auto;"><option>1분기 4주차 종합 데이터</option></select>
                    <button class="tw-btn outline"><i class="fas fa-download"></i> 학부모 리포트 일괄 생성</button>
                </div>
            </div>

            <div style="display:grid; grid-template-columns:2fr 1fr; gap:20px; margin-bottom:20px;">
                <div class="tw-card">
                    <h3 style="font-size:16px; font-weight:800; margin:0 0 20px 0;">전체 클래스 영역별 성취도 (GVR)</h3>
                    <div style="height: 300px;"><canvas id="gvrTrendChart"></canvas></div>
                </div>
                <div class="tw-card">
                    <h3 style="font-size:16px; font-weight:800; margin:0 0 20px 0;">클래스 평균 레이더 차트</h3>
                    <div style="height: 300px; display:flex; justify-content:center;"><canvas id="gvrRadarChart"></canvas></div>
                </div>
            </div>

            <div class="tw-card">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <h3 style="font-size:16px; font-weight:800; margin:0;">이번 주 최다 취약 유형 (Top 5) <span style="font-size:12px; font-weight:600; color:#ef4444; background:#fef2f2; padding:4px 8px; border-radius:8px; margin-left:10px;">자동 생성된 쌍둥이 클리닉 권장</span></h3>
                </div>
                <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:15px;">
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:20px; border-radius:12px; text-align:center;">
                        <div style="font-size:24px; font-weight:900; color:#ef4444; margin-bottom:5px;">68%</div>
                        <div style="font-size:13px; font-weight:800; color:#1e293b;">추론 (빈칸)</div><div style="font-size:11px; color:#64748b; margin-top:5px;">오답률 1위</div>
                        <button class="tw-btn solid-pink" style="margin-top:15px; width:100%; font-size:11px; padding:6px;">클리닉 배포</button>
                    </div>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:20px; border-radius:12px; text-align:center;">
                        <div style="font-size:24px; font-weight:900; color:#f97316; margin-bottom:5px;">62%</div>
                        <div style="font-size:13px; font-weight:800; color:#1e293b;">서술형 배열</div><div style="font-size:11px; color:#64748b; margin-top:5px;">오답률 2위</div>
                        <button class="tw-btn outline" style="margin-top:15px; width:100%; font-size:11px; padding:6px;">유사문제 보기</button>
                    </div>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:20px; border-radius:12px; text-align:center;">
                        <div style="font-size:24px; font-weight:900; color:#f59e0b; margin-bottom:5px;">55%</div>
                        <div style="font-size:13px; font-weight:800; color:#1e293b;">시제/수일치</div><div style="font-size:11px; color:#64748b; margin-top:5px;">오답률 3위</div>
                        <button class="tw-btn outline" style="margin-top:15px; width:100%; font-size:11px; padding:6px;">유사문제 보기</button>
                    </div>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:20px; border-radius:12px; text-align:center;">
                        <div style="font-size:24px; font-weight:900; color:#64748b; margin-bottom:5px;">48%</div>
                        <div style="font-size:13px; font-weight:800; color:#1e293b;">어휘 (동의어)</div><div style="font-size:11px; color:#64748b; margin-top:5px;">오답률 4위</div>
                        <button class="tw-btn outline" style="margin-top:15px; width:100%; font-size:11px; padding:6px;">유사문제 보기</button>
                    </div>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:20px; border-radius:12px; text-align:center;">
                        <div style="font-size:24px; font-weight:900; color:#64748b; margin-bottom:5px;">42%</div>
                        <div style="font-size:13px; font-weight:800; color:#1e293b;">문장 삽입</div><div style="font-size:11px; color:#64748b; margin-top:5px;">오답률 5위</div>
                        <button class="tw-btn outline" style="margin-top:15px; width:100%; font-size:11px; padding:6px;">유사문제 보기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    const ctxTrend = document.getElementById('gvrTrendChart').getContext('2d');
    new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: ['1주차', '2주차', '3주차', '4주차'],
            datasets: [
                { label: 'Grammar', data: [75, 78, 80, 85], borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension:0.4 },
                { label: 'Vocabulary', data: [85, 82, 88, 80], borderColor: '#e91e63', backgroundColor: '#e91e63', tension:0.4 },
                { label: 'Reading', data: [60, 65, 72, 75], borderColor: '#10b981', backgroundColor: '#10b981', tension:0.4 }
            ]
        },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'top'}}}
    });

    const ctxRadar = document.getElementById('gvrRadarChart').getContext('2d');
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['문맥 어휘', '순서 배열', '문장 구조 분석', '주제 파악', '수일치'],
            datasets: [{
                label: '우리 반 평균 성취율',
                data: [65, 59, 80, 81, 56],
                backgroundColor: 'rgba(59,130,246,0.2)',
                borderColor: '#3b82f6',
                pointBackgroundColor: '#3b82f6'
            }]
        },
        options: { responsive:true, maintainAspectRatio:false, scales: { r: { min:0, max:100 } } }
    });
</script>
</body></html>
"@

[System.IO.File]::WriteAllText("admin_gvr_analytics.html", $content_gvr, $UTF8)

$input_sidebar = getSidebar 'input'
$content_input = @"
$GLOBAL_HEAD
$GLOBAL_TOPBAR
<div style="display:flex; width:100%;">
    $input_sidebar
    <div class="main-wrapper">
        <div class="dash-container">
            <h1 style="font-size:24px; font-weight:900; margin:0 0 25px 0;"><i class="fas fa-cloud-upload-alt text-indigo-500"></i> 문항 DB 통합 업로더</h1>
            
            <div style="display:grid; grid-template-columns:1fr 400px; gap:20px;">
                <div class="tw-card">
                    <h3 style="font-size:16px; font-weight:800; margin:0 0 20px 0;">문항 데이터 입력 (HWP/PDF 자동 추출)</h3>
                    <div style="border:2px dashed #cbd5e1; border-radius:12px; padding:40px; text-align:center; background:#f8fafc; margin-bottom:20px; cursor:pointer;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff'" onmouseout="this.style.borderColor='#cbd5e1'; this.style.background='#f8fafc'">
                        <i class="fas fa-file-upload text-blue-500" style="font-size:48px; margin-bottom:15px;"></i>
                        <div style="font-size:16px; font-weight:800; color:#1e293b;">한글(HWP), PDF 파일을 이 곳으로 끌어다 놓으세요</div>
                        <div style="font-size:13px; color:#64748b; margin-top:5px;">AI가 지문, 문항, 보기를 자동으로 분류하여 입력창에 채워줍니다. (텍스트 복붙도 지원)</div>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; gap:15px;">
                        <div><label style="font-weight:700; font-size:13px; color:#475569;">지문 텍스트</label><textarea class="tw-input" style="height:150px; margin-top:8px;">According to the theory of reciprocal altruism...</textarea></div>
                        <div><label style="font-weight:700; font-size:13px; color:#475569;">문항 (질문)</label><input type="text" class="tw-input" style="margin-top:8px;" value="다음 글의 빈칸에 들어갈 말로 가장 적절한 것은?"></div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                            <div><label style="font-weight:700; font-size:13px; color:#475569;">선지 1</label><input type="text" class="tw-input" style="margin-top:8px;"></div>
                            <div><label style="font-weight:700; font-size:13px; color:#475569;">선지 2</label><input type="text" class="tw-input" style="margin-top:8px;"></div>
                        </div>
                    </div>
                </div>

                <div class="tw-card" style="background:#f8fafc;">
                    <h3 style="font-size:16px; font-weight:800; margin:0 0 20px 0;"><i class="fas fa-magic text-pink-500"></i> AI 자동 태깅 시스템</h3>
                    <div style="font-size:13px; line-height:1.6; color:#475569; margin-bottom:20px;">
                        업로드된 지문과 문항을 분석하여 KATCH 데이터베이스 구조에 맞게 카테고리를 자동 분류합니다. (수정 가능)
                    </div>
                    <div style="margin-bottom:15px;">
                        <label style="font-weight:700; font-size:12px; color:#64748b;">주요 스킬 (과목)</label>
                        <select class="tw-select" style="margin-top:5px; background:#eff6ff;"><option>Reading (독해)</option><option>Grammar</option></select>
                    </div>
                    <div style="margin-bottom:15px;">
                        <label style="font-weight:700; font-size:12px; color:#64748b;">세부 유형</label>
                        <select class="tw-select" style="margin-top:5px; background:#eff6ff;"><option>빈칸 추론</option><option>주제 파악</option></select>
                    </div>
                    <div style="margin-bottom:25px;">
                        <label style="font-weight:700; font-size:12px; color:#64748b;">출처 난이도 (Lexile 기반 계산)</label>
                        <select class="tw-select" style="margin-top:5px;"><option>Level 4 (고1 모의고사 수준)</option></select>
                    </div>
                    <button class="tw-btn solid-blue" style="width:100%; font-size:16px; padding:15px;" onclick="alert('문제가 저장되었습니다.')"><i class="fas fa-database"></i> 문제은행 DB에 저장하기 (10 P 획득)</button>
                    <div style="text-align:center; margin-top:15px;"><a href="#" style="font-size:13px; font-weight:700; color:#64748b;">대량 엑셀 업로드로 전환</a></div>
                </div>
            </div>
        </div>
    </div>
</div>
</body></html>
"@

[System.IO.File]::WriteAllText("admin_input.html", $content_input, $UTF8)

$bank_sidebar = getSidebar 'bank'
$content_bank = @"
$GLOBAL_HEAD
$GLOBAL_TOPBAR
<div style="display:flex; width:100%;">
    $bank_sidebar
    <div class="main-wrapper">
        <div class="dash-container">
            <h1 style="font-size:24px; font-weight:900; margin:0 0 25px 0;"><i class="fas fa-layer-group text-indigo-500"></i> 문제은행 출제 및 학습지 생성</h1>
            <div style="display:grid; grid-template-columns:250px 1fr 340px; gap:20px;">
                
                <!-- 필터 사이드바 -->
                <div class="tw-card" style="padding:20px;">
                    <h3 style="font-size:16px; font-weight:800; margin:0 0 15px 0;"><i class="fas fa-filter"></i> 문항 검색 필터</h3>
                    <div style="margin-bottom:15px;"><label style="font-size:12px; font-weight:700; color:#64748b;">과목</label><select class="tw-select mt-1"><option>영어</option></select></div>
                    <div style="margin-bottom:15px;"><label style="font-size:12px; font-weight:700; color:#64748b;">출처</label><select class="tw-select mt-1"><option>2026 수능완성</option><option>자체 교재</option></select></div>
                    <div style="margin-bottom:15px;"><label style="font-size:12px; font-weight:700; color:#64748b;">유형</label><select class="tw-select mt-1"><option>빈칸추론</option><option>어법결정</option></select></div>
                    <button class="tw-btn solid-blue" style="width:100%;"><i class="fas fa-search"></i> 검색</button>
                    
                    <div style="margin-top:20px; padding-top:20px; border-top:1px solid #e2e8f0;">
                       <button class="tw-btn outline" style="width:100%; font-size:13px; color:#475569;"><i class="fas fa-magic"></i> 조건부 자동출제 (AI 추천)</button>
                    </div>
                </div>

                <!-- 문항 리스트 (Draggable 느낌) -->
                <div class="tw-card" style="padding:0; overflow:hidden;">
                    <div style="padding:15px 20px; background:#f8fafc; border-bottom:1px solid #e2e8f0; font-weight:800; display:flex; justify-content:space-between;">검색 결과 (120건) <span style="color:#3b82f6; cursor:pointer;"><i class="fas fa-check-double"></i> 전체 담기</span></div>
                    <div style="padding:20px; display:flex; flex-direction:column; gap:15px; height:calc(100vh - 250px); overflow-y:auto;">
                        <!-- Item -->
                        <div style="border:1px solid #cbd5e1; border-radius:10px; padding:15px; position:relative; cursor:grab;">
                            <div style="position:absolute; top:15px; right:15px;"><button class="tw-btn outline" style="padding:4px 10px; font-size:11px;">+ 담기</button></div>
                            <div style="display:flex; gap:10px; margin-bottom:10px;"><span style="background:#e0e7ff; color:#4f46e5; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:800;">빈칸추론</span><span style="background:#f1f5f9; color:#475569; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:800;">난이도: 상</span><span style="background:#f1f5f9; color:#475569; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:800;">2026 수능완성 p.14</span></div>
                            <div style="font-size:14px; color:#1e293b; line-height:1.5;">According to the theory of reciprocal altruism, memory is required to... (중략)</div>
                        </div>
                        <div style="border:1px solid #cbd5e1; border-radius:10px; padding:15px; position:relative; cursor:grab;">
                            <div style="position:absolute; top:15px; right:15px;"><button class="tw-btn outline" style="padding:4px 10px; font-size:11px;">+ 담기</button></div>
                            <div style="display:flex; gap:10px; margin-bottom:10px;"><span style="background:#e0e7ff; color:#4f46e5; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:800;">순서배열</span><span style="background:#f1f5f9; color:#475569; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:800;">난이도: 중</span></div>
                            <div style="font-size:14px; color:#1e293b; line-height:1.5;">The most important role of the government is to provide...</div>
                        </div>
                    </div>
                </div>

                <!-- 출제 바구니 (Cart) -->
                <div class="tw-card" style="background:#eff6ff; border-color:#bfdbfe; height:fit-content; position:sticky; top:20px;">
                    <h3 style="font-size:16px; font-weight:800; margin:0 0 15px 0;"><i class="fas fa-shopping-basket text-blue-500"></i> 미니테스트 (담은 문항)</h3>
                    <div style="background:white; border-radius:8px; padding:15px; border:1px solid #bfdbfe; margin-bottom:15px;">
                        총 <strong>15문제</strong> (빈칸 10, 서술형 5)<br>
                        <a href="#" style="font-size:12px; color:#3b82f6; font-weight:700;">자세히 보기 / 순서 드래그 편집</a>
                    </div>
                    <label style="font-weight:700; font-size:12px; color:#475569;">출제 타이틀</label>
                    <input type="text" class="tw-input mt-1 mb-4" value="고1 외고반 중간대비 미니모의고사">
                    <label style="font-weight:700; font-size:12px; color:#475569;">배포 유형</label>
                    <select class="tw-select mt-1 mb-4"><option>온라인 CBT (App 전송)</option><option>종이 학습지 (PDF 다운)</option></select>
                    
                    <button class="tw-btn solid-blue" style="width:100%; font-size:15px;" onclick="alert('배포 완료!')"><i class="fas fa-paper-plane"></i> 수강생에게 지금 배포</button>
                    <button class="tw-btn outline" style="width:100%; font-size:15px; margin-top:10px;"><i class="fas fa-file-pdf text-red-500"></i> PDF 및 정답지 인쇄</button>
                </div>
            </div>
        </div>
    </div>
</div>
</body></html>
"@

[System.IO.File]::WriteAllText("problem_bank.html", $content_bank, $UTF8)

# Read community content to embed
$c_org = Get-Content 'teacher_community.html' -Encoding UTF8 -Raw
$idx = $c_org.IndexOf('<div class="c-container">')
$idxEnd = $c_org.IndexOf('</body>')
if ($idx -ge 0 -and $idxEnd -ge 0) {
    $c_content = $c_org.Substring($idx, $idxEnd - $idx)
} else {
    $c_content = "<div>커뮤니티 콘텐츠 인식 오류</div>"
}

$comm_sidebar = getSidebar 'comm'
$content_comm = @"
$GLOBAL_HEAD
<style>
/* community specfic CSS overrides */
.c-container { max-width: 1200px; padding: 0 20px; }
.c-hero { background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 20px; padding: 30px; color: white; position: relative; overflow: hidden; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
.c-hero::after { content: ''; position: absolute; right: -50px; top: -50px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 60%); border-radius: 50%; pointer-events: none; }
.c-hero h1 { font-size: 28px; font-weight: 900; margin: 0 0 10px 0; letter-spacing: -0.5px; }
.c-hero p { font-size: 15px; color: #94a3b8; margin: 0; line-height: 1.5; }
.c-hero-box { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(5px); padding: 15px 20px; border-radius: 12px; display: inline-flex; align-items: center; gap: 15px; margin-top: 25px; }

.c-tabs { display: flex; gap: 10px; margin-bottom: 25px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; }
.c-tab { font-size: 16px; font-weight: 800; color: #64748b; background: transparent; border: none; cursor: pointer; padding: 8px 16px; transition: 0.2s; position: relative; }
.c-tab.active { color: #3b82f6; }
.c-tab.active::after { content: ''; position: absolute; bottom: -17px; left: 0; width: 100%; height: 4px; background: #3b82f6; border-radius: 4px 4px 0 0; }
.c-section { display: none; }
.c-section.active { display: block; }
.m-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.m-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; transition: 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.02); display: flex; flex-direction: column; }
.m-img { height: 140px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 40px; color: #94a3b8; position: relative; }
.m-img.pdf { background: #fee2e2; color: #ef4444; } .m-img.gvr { background: #e0e7ff; color: #4f46e5; } .m-img.vod { background: #dcfce7; color: #16a34a; }
.m-badge { position: absolute; top: 12px; left: 12px; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 8px; background: rgba(255,255,255,0.9); box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
.m-body { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; }
.m-title { font-size: 15px; font-weight: 800; color: #1e293b; margin: 0 0 8px 0; line-height: 1.4; }
.m-author { font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 6px; margin-bottom: 20px; }
.m-author img { width: 24px; height: 24px; border-radius: 50%; background: #cbd5e1; }
.m-footer { margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 15px; }
.m-price { font-size: 16px; font-weight: 900; color: #d97706; display: flex; align-items: center; gap: 6px; }
.btn-buy { background: #f8fafc; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }

.l-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
.l-post { background: white; border-radius: 16px; padding: 25px; border: 1px solid #e2e8f0; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
.l-post-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }
.l-p-user { display: flex; align-items: center; gap: 10px; }
.l-p-avatar { width: 40px; height: 40px; border-radius: 50%; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; }
.l-p-meta h4 { margin: 0 0 3px 0; font-size: 15px; font-weight: 800; color: #1e293b; }
.l-p-meta span { font-size: 12px; color: #94a3b8; }
.l-badge-hot { background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; }
.l-post h3 { font-size: 18px; font-weight: 800; color: #1e293b; margin: 0 0 10px 0; }
.l-post p { font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 20px 0; }
.l-post-actions { display: flex; gap: 15px; border-top: 1px solid #f1f5f9; padding-top: 15px; }
.l-action { font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 6px; }
        
.l-side-box { background: white; border-radius: 16px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
.l-side-title { font-size: 15px; font-weight: 900; color: #1e293b; margin: 0 0 15px 0; display: flex; align-items: center; gap: 8px; }
.l-rank-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
.l-rank-user { font-size: 13px; font-weight: 700; color: #334155; display: flex; align-items: center; gap: 10px; }
.l-rank-num { width: 20px; height: 20px; border-radius: 5px; background: #f1f5f9; color: #64748b; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; }
.l-rank-pts { font-size: 13px; font-weight: 800; color: #e91e63; }
.btn-upload { background: #3b82f6; color: white; border: none; width: 100%; padding: 12px; border-radius: 12px; font-size: 15px; font-weight: 800; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 15px rgba(59,130,246,0.3); }

</style>
$GLOBAL_TOPBAR
<div style="display:flex; width:100%;">
    $comm_sidebar
    <div class="main-wrapper">
        <div class="dash-container">
$c_content
        </div>
    </div>
</div>
<script>
function switchTab(tabId) {
    document.querySelectorAll('.c-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.c-section').forEach(s => s.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}
</script>
</body></html>
"@

[System.IO.File]::WriteAllText("teacher_community.html", $content_comm, $UTF8)

Write-Host "All files built successfully using Powershell!"
