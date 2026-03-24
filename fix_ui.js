const fs = require('fs');
const path = require('path');
const dir = path.join('C:', 'Users', 'SsoHot', 'Desktop', '수능사이트시안', 'katch-web', 'public');

// --- 1. Modify my_learning.html ---
let mlPath = path.join(dir, 'my_learning.html');
if (fs.existsSync(mlPath)) {
    let ml = fs.readFileSync(mlPath, 'utf8');

    // 1-1. Replace Topbar
    const standardHeader = `<div class="header-top-bar">
        <div class="container flex-between align-center">
            <div class="target-switch">
                <a href="dashboard_online.html" class="active">학생·학부모</a>
                <a href="problem_bank.html">가맹 원장·강사</a>
            </div>
            <div>
                <a href="http://pf.kakao.com/_sxlwcG" target="_blank" class="mr-15" style="color:inherit; text-decoration:none;"><i class="fas fa-headset"></i> 고객센터</a>
                <a href="index.html" style="color:inherit; text-decoration:none;">로그아웃</a>
            </div>
        </div>
    </div>
    <header class="bg-white" style="border-bottom: 2px solid #1A237E; position: sticky; top: 0; z-index: 200;">
        <div class="container main-gnb">
            <div class="logo">
                <a href="index.html" style="text-decoration:none;"><h1>KATCH<span style="color:#E91E63; font-weight:900;">.</span></h1></a>
            </div>
            <nav class="gnb-links">
                <a href="student_diagnostics.html">진단테스트</a>
                <a href="level_test.html">레벨테스트</a>
                <a href="problem_bank.html">문제은행</a>
                <a href="store_vod.html">VOD 인강</a>
                <a href="store_book.html">교재 스토어</a>
                <a href="lounge.html" class="text-orange"><i class="fas fa-crown"></i> VIP 라운지</a>
            </nav>
            <div class="header-utils">
                <a href="my_learning.html" title="MY 학습 진단" style="color:var(--navy);"><i class="fas fa-chalkboard-teacher"></i></a>
            </div>
        </div>
    </header>`;
    
    // Replace <div class="ml-topbar">...</div>
    ml = ml.replace(/<div class="ml-topbar">[\s\S]*?<\/div>\s*<\/div>/, standardHeader + '\n');
    ml = ml.replace(/height: calc\(100vh - 60px\);/, 'height: calc(100vh - 115px);'); // Adjust layout height

    // 1-2. Fix distracting colors and add Report Card
    ml = ml.replace(/\.stat-card\.c-[a-z]+\s*\{\s*background:[^}]+}/g, '');
    ml = ml.replace(/\.stat-card\.c-[a-z]+\s*\.stat-icon\s*\{\s*color:[^}]+}/g, '');
    ml = ml.replace(/\.stat-card\.c-[a-z]+\s*\.stat-val\s*\{\s*color:[^}]+}/g, '');
    ml = ml.replace(/\.stat-card\.c-[a-z]+\s*\.stat-label\s*\{\s*color:[^}]+}/g, '');
    
    // Add clean style
    const cleanStyles = `
        .stat-card { background: white; border: 1px solid #e0e4e8; color: #111; }
        .stat-card .stat-icon { background: #f4f6f9; color: #1A237E; }
        .stat-card .stat-label { background: transparent; color: #666; font-weight: 700; padding: 0; }
        .stat-grid { grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 25px; }
    `;
    ml = ml.replace(/\.stat-grid\s*{[^}]+}/, cleanStyles);

    // Replace the 4 cards with 5 clean cards
    const newCards = `
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-clock"></i></div>
                        <div class="stat-val">12.5h</div><div class="stat-label">이번 주 학습 시간</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
                        <div class="stat-val">84점</div><div class="stat-label">최근 모의고사</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                        <div class="stat-val">3/4</div><div class="stat-label">이번 달 과제</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-file-invoice"></i></div>
                        <div class="stat-val" style="color:#E91E63;">2건</div><div class="stat-label">미확인 성적표</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-coins"></i></div>
                        <div class="stat-val">1,850P</div><div class="stat-label">보유 포인트</div>
                    </div>`;
    ml = ml.replace(/<div class="stat-card c-blue">[\s\S]*?<div class="grid-3">/, newCards + '\n                </div>\n                <div class="grid-3">');

    // Remove c-blue class names
    ml = ml.replace(/c-[a-z]+/g, '');

    // 1-3. Add GVR Unified Tab
    const gvrNav = `<a class="nav-item" href="#" onclick="showPanel('gvr', 'GVR (정규과정)', this)">
                    <div class="nav-icon"><i class="fas fa-layer-group"></i></div>
                    GVR (정규과정)
                </a>`;
    ml = ml.replace(/(<div class="nav-section-label">나의 학습<\/div>)/, '$1\n                ' + gvrNav);

    const gvrPanel = `
            <!-- ============================
                 PANEL: GVR 통합 (대시보드/숙제/성적표)
            ============================ -->
            <div class="content-panel" id="panel-gvr">
                <div class="simple-panel">
                    <div style="display:flex; border-bottom:2px solid #e0e4e8; margin-bottom:20px;">
                        <button class="gvr-tab-btn active" onclick="switchGvr('dash')" style="padding:15px 30px; font-size:16px; font-weight:800; border:none; background:transparent; border-bottom:3px solid #1A237E; color:#1A237E; cursor:pointer;">대시보드</button>
                        <button class="gvr-tab-btn" onclick="switchGvr('hw')" style="padding:15px 30px; font-size:16px; font-weight:800; border:none; background:transparent; border-bottom:3px solid transparent; color:#888; cursor:pointer;">숙제현황</button>
                        <button class="gvr-tab-btn" onclick="switchGvr('report')" style="padding:15px 30px; font-size:16px; font-weight:800; border:none; background:transparent; border-bottom:3px solid transparent; color:#888; cursor:pointer;">성적표</button>
                    </div>

                    <div id="gvr-dash-view" style="display:block;">
                        <h4 style="font-size:18px; color:#111; margin-bottom:15px;"><i class="fas fa-chart-line"></i> GVR 영역별 성취도</h4>
                        <div style="height:250px; background:#fafafa; border:1px solid #eee; border-radius:10px; padding:20px; display:flex; justify-content:center; align-items:center; color:#999;">[GVR 차트 영역]</div>
                    </div>

                    <div id="gvr-hw-view" style="display:none;">
                        <h4 style="font-size:18px; color:#111; margin-bottom:15px;"><i class="fas fa-book-open"></i> GVR 숙제 리스트</h4>
                        <div class="hw-item" style="border: 2px solid #E91E63;">
                            <div><div class="hw-title">3월 1주차 정규 GVR 과제</div><div class="hw-deadline"><i class="fas fa-exclamation-triangle"></i> 마감: 2026.03.12 (목)</div></div>
                            <a href="omr.html" style="background:#E91E63; color:white; padding:10px 20px; border-radius:8px; font-weight:800; text-decoration:none;">답안 입력 →</a>
                        </div>
                    </div>

                    <div id="gvr-report-view" style="display:none;">
                        <h4 style="font-size:18px; color:#111; margin-bottom:15px;"><i class="fas fa-file-chart-line"></i> GVR 채점표 모아보기</h4>
                        <div class="hw-item">
                            <div><div class="hw-title">2월 4주차 라이팅 첨삭 과제</div><div class="hw-deadline" style="color:#888;">채점 88점</div></div>
                            <a href="report_gvr.html" style="border:1px solid #111; color:#111; padding:8px 16px; border-radius:6px; font-weight:700; text-decoration:none;">결과 확인</a>
                        </div>
                    </div>
                </div>
            </div>`;
    
    ml = ml.replace(/(<div class="content-panel active" id="panel-dashboard">)/, gvrPanel + '\n            $1');

    const gvrScript = `
        function switchGvr(tab) {
            document.querySelectorAll('.gvr-tab-btn').forEach(btn => {
                btn.style.color = '#888'; btn.style.borderBottomColor = 'transparent'; btn.classList.remove('active');
            });
            event.currentTarget.style.color = '#1A237E'; event.currentTarget.style.borderBottomColor = '#1A237E'; event.currentTarget.classList.add('active');
            
            document.getElementById('gvr-dash-view').style.display = 'none';
            document.getElementById('gvr-hw-view').style.display = 'none';
            document.getElementById('gvr-report-view').style.display = 'none';
            document.getElementById('gvr-' + tab + '-view').style.display = 'block';
        }
    `;
    ml = ml.replace(/<\/script>\s*<\/body>/, gvrScript + '\n    </script>\n</body>');

    fs.writeFileSync(mlPath, ml, 'utf8');
}

// --- 2. Modify store_vod.html ---
let vodPath = path.join(dir, 'store_vod.html');
if (fs.existsSync(vodPath)) {
    let vod = fs.readFileSync(vodPath, 'utf8');
    // Ensure video style thumbnails (16:9)
    vod = vod.replace(/\.thumb-placeholder \{[^}]+\}/, 
        '.thumb-placeholder { height:180px; background:#111; display:flex; justify-content:center; align-items:center; color:white; font-size:40px; }');
    // Change thumb content to play button
    vod = vod.replace(/<div class="thumb-placeholder">사진<\/div>/g, '<div class="thumb-placeholder"><i class="fas fa-play-circle" style="color:#E91E63;"></i></div>');
    fs.writeFileSync(vodPath, vod, 'utf8');
}

// --- 3. Modify store_book.html ---
let bookPath = path.join(dir, 'store_book.html');
if (fs.existsSync(bookPath)) {
    let book = fs.readFileSync(bookPath, 'utf8');
    // Book style thumbnails (3:4 aspect ratio) and gray background
    book = book.replace(/\.thumb-placeholder \{[^}]+\}/, 
        '.thumb-placeholder { height:260px; background:#f4f6f9; border-bottom:1px solid #eee; display:flex; justify-content:center; align-items:center; color:#888; font-size:40px; }');
    // Change thumb to book icon
    book = book.replace(/<div class="thumb-placeholder">.*?<\/div>/g, '<div class="thumb-placeholder"><i class="fas fa-book" style="color:#1A237E;"></i></div>');
    
    // Replace "수강신청" with "장바구니 담기"
    book = book.replace(/>수강신청/g, '><i class="fas fa-shopping-cart"></i> 장바구니');
    // Page Title
    book = book.replace(/<h2>인강 VOD 스토어<\/h2>/, '<h2>교재 스토어</h2>');
    book = book.replace(/<p>KNS 대치본원의 프리미엄 온라인 강의를 수강해보세요\.<\/p>/, '<p>KNS 대치본원 전용 교재 및 모의고사 문제집을 구매하세요.</p>');
    book = book.replace(/<title>.*?<\/title>/, '<title>KATCH - 교재 스토어</title>');
    fs.writeFileSync(bookPath, book, 'utf8');
}

console.log("UI updates applied to my_learning.html, store_vod.html, and store_book.html");
