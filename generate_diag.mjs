import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';
const diagPath = path.join(PUBLIC_DIR, 'student_diagnostics.html');

const newHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KATCH - 진단테스트 허브</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="sub.css">
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { 
            background-color: #030008; 
            font-family: 'Pretendard', sans-serif; 
            color: #fff;
            overflow-x: hidden;
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(114, 21, 235, 0.15), transparent 50%),
                radial-gradient(circle at 85% 30%, rgba(0, 212, 255, 0.15), transparent 50%);
        }

        /* ===== UNIFIED HEADER (Dark Links for White Header) ===== */
        .header-top-bar { background:#f0f2f5; padding:5px 0; font-size:12px; color:#666; border-bottom:1px solid #e0e0e0; }
        .target-switch { display:inline-flex; background:#e0e4e8; border-radius:30px; overflow:hidden; padding:4px; }
        .target-switch a.active { padding:6px 18px; border-radius:20px; color:white; background:#111; text-decoration:none; font-weight:800; font-size:13px; box-shadow:0 4px 10px rgba(0,0,0,0.1); }
        .target-switch a { padding:6px 18px; border-radius:20px; color:#555; background:transparent; text-decoration:none; font-weight:800; font-size:13px; }
        
        .main-gnb { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; }
        .logo a { text-decoration:none; }
        .logo h1 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 26px; color: #111; margin: 0; letter-spacing: -1px; }
        .gnb-links { display: flex; gap: 35px; font-size: 16px; font-weight: 800; align-items:center; }
        .gnb-links auto a { color: #333; text-decoration: none; transition: 0.2s; }
        .gnb-links a:hover { color: #E91E63; }
        .header-utils { display: flex; gap: 20px; align-items: center; font-size: 22px; color: #333; }

        /* ===== DEEP SPACE AURORA HERO ===== */
        .aurora-hero {
            position: relative;
            padding: 140px 0 160px;
            text-align: center;
            overflow: hidden;
            border-bottom: 1px solid rgba(138,43,226,0.3);
            background: #030008;
        }
        
        /* Dynamic Aurora Glows */
        .aurora-bg {
            position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
            background: 
                radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.2), transparent 40%),
                radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.15), transparent 40%),
                radial-gradient(circle at 70% 30%, rgba(255, 0, 128, 0.15), transparent 40%);
            animation: auroraSpin 25s infinite linear;
            pointer-events: none;
            z-index: 0;
            filter: blur(40px);
        }
        @keyframes auroraSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* Floating Stars */
        .stars {
            position: absolute; top:0; left:0; right:0; bottom:0;
            background-image: 
                radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
                radial-gradient(2px 2px at 90px 40px, rgba(255,255,255,0.6), rgba(0,0,0,0));
            background-size: 100px 100px;
            animation: starsMove 40s linear infinite;
            opacity: 0.5;
            z-index: 0;
        }
        @keyframes starsMove { from { background-position: 0 0; } to { background-position: -500px 500px; } }

        .hero-inner { position: relative; z-index: 2; }
        .ah-tag {
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba(138,43,226,0.15); border: 1px solid rgba(168,85,247,0.5);
            color: #d8b4fe; padding: 10px 28px; border-radius: 30px;
            font-size: 14px; font-weight: 800; margin-bottom: 25px; letter-spacing: 3px;
            box-shadow: 0 0 25px rgba(138,43,226,0.4); backdrop-filter: blur(10px);
            text-transform: uppercase;
        }
        .ah-title {
            font-size: 64px; font-weight: 900; letter-spacing: -2px; line-height: 1.15; margin-bottom: 25px;
            text-shadow: 0 10px 40px rgba(0,0,0,0.8);
        }
        .ah-title span { 
            background: linear-gradient(to right, #00f2fe, #4facfe, #8c52ff, #ff0844);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            text-shadow: 0 0 40px rgba(140, 82, 255, 0.4);
        }
        .ah-sub { 
            font-size: 22px; font-weight: 300; color: rgba(255,255,255,0.85); line-height: 1.7; margin-bottom: 60px;
            text-shadow: 0 4px 15px rgba(0,0,0,0.9);
        }
        
        .ah-stats {
            display: inline-flex; gap: 40px; background: rgba(15,8,30,0.6); padding: 35px 60px;
            border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(30px);
            box-shadow: 0 25px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(138,43,226,0.2);
            position: relative; overflow:hidden;
        }
        .ah-stats::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background: linear-gradient(90deg, transparent, #8c52ff, #00d4ff, transparent); }
        .ahs-item { text-align: center; }
        .ahs-val { font-size: 44px; font-weight: 900; color: #fff; margin-bottom: 5px; font-family: 'Montserrat', sans-serif; text-shadow: 0 0 20px rgba(255,255,255,0.5); }
        .ahs-val .unit { font-size: 24px; color: #a855f7; display:inline-block; margin-left:4px; }
        .ahs-label { font-size: 15px; color: #a5f3fc; font-weight: 700; letter-spacing: 1px; }

        /* ===== PROGRESS STEPS ===== */
        .step-container { margin-top: -60px; position:relative; z-index:10; margin-bottom: 80px; }
        .proc-bar {
            background: rgba(8,5,20,0.8); border: 1px solid rgba(140, 82, 255, 0.3); padding: 40px 60px;
            border-radius: 24px; display: flex; justify-content: space-between; align-items:center;
            backdrop-filter: blur(20px); box-shadow: 0 30px 80px rgba(0,0,0,0.8);
        }
        .proc-step { display:flex; flex-direction:column; align-items:center; gap:15px; position:relative; }
        .proc-icon {
            width: 70px; height: 70px; border-radius: 50%;
            background: rgba(255,255,255,0.05); color: #666; font-size: 28px;
            display: flex; justify-content:center; align-items:center;
            border: 2px solid rgba(255,255,255,0.1); transition: 0.4s;
        }
        .proc-step.done .proc-icon { background: rgba(140, 82, 255, 0.1); color: #d8b4fe; border-color: rgba(140, 82, 255, 0.5); }
        .proc-step.active .proc-icon { background: linear-gradient(135deg, #8c52ff, #00d4ff); color: #fff; border:none; box-shadow: 0 0 30px rgba(140, 82, 255, 0.6); transform: scale(1.15); }
        .proc-title { font-size: 16px; font-weight: 900; color: #fff; text-transform: uppercase; margin-bottom: 4px; }
        .proc-desc { font-size: 14px; color: #aaa; }
        .proc-step.active .proc-title { color: #00d4ff; text-shadow: 0 0 10px rgba(0,212,255,0.5); }
        .proc-step.active .proc-desc { color: #d8b4fe; }
        .proc-arrow { color: rgba(255,255,255,0.15); font-size: 24px; }

        /* ===== DIAGNOSTIC EXAM CARDS ===== */
        .section-title { font-size: 36px; font-weight: 900; color: #fff; margin-bottom: 40px; text-align: center; letter-spacing: -1px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 80px; }

        .dx-card {
            background: rgba(15,8,30,0.6); border-radius: 24px; padding: 40px 30px;
            border: 1px solid rgba(255,255,255,0.1); transition: 0.4s; position:relative; overflow:hidden;
            display:flex; flex-direction:column; backdrop-filter: blur(15px);
        }
        .dx-card::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background: transparent; transition:0.4s; }
        
        /* Variants */
        .dx-card.dx-open { border-color: rgba(140, 82, 255, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 0 30px rgba(140, 82, 255, 0.1); }
        .dx-card.dx-open::before { background: linear-gradient(90deg, #8c52ff, #d8b4fe); box-shadow: 0 0 20px #8c52ff; }
        .dx-card.dx-open:hover { transform: translateY(-10px); box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(140, 82, 255, 0.2); border-color: #8c52ff; }
        
        .dx-card.dx-avail { border-color: rgba(0, 212, 255, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 0 30px rgba(0, 212, 255, 0.1); }
        .dx-card.dx-avail::before { background: linear-gradient(90deg, #00d4ff, #a5f3fc); box-shadow: 0 0 20px #00d4ff; }
        .dx-card.dx-avail:hover { transform: translateY(-10px); box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(0, 212, 255, 0.2); border-color: #00d4ff; }
        
        .dx-card.dx-closed { opacity: 0.6; filter: grayscale(0.5); }

        .dx-icon {
            width: 80px; height: 80px; border-radius: 20px; background: rgba(0,0,0,0.5);
            display:flex; align-items:center; justify-content:center; font-size: 36px;
            margin: 0 auto 25px; border: 1px solid rgba(255,255,255,0.1);
        }
        .dx-open .dx-icon { color: #d8b4fe; border-color: rgba(140, 82, 255, 0.5); box-shadow: 0 0 25px rgba(140,82,255,0.3); }
        .dx-avail .dx-icon { color: #a5f3fc; border-color: rgba(0, 212, 255, 0.5); box-shadow: 0 0 25px rgba(0,212,255,0.3); }
        .dx-closed .dx-icon { color: #888; }

        .dx-title { font-size: 26px; font-weight: 900; color: #fff; text-align:center; margin-bottom: 15px; letter-spacing:-0.5px; }
        .dx-desc { font-size: 15px; color: #ccc; text-align:center; margin-bottom: 30px; line-height: 1.6; height: 72px; }

        .dx-meta {
            background: rgba(0,0,0,0.4); border-radius: 16px; padding: 25px; margin-bottom: 30px; flex:1;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .dxm-row { display:flex; justify-content:space-between; margin-bottom: 16px; font-size: 14px; }
        .dxm-row:last-child { margin-bottom:0; }
        .dxm-label { color: #a5f3fc; font-weight: 700; display:flex; align-items:center; gap:8px; }
        .dx-open .dxm-label { color: #d8b4fe; }
        .dxm-val { color: #fff; font-weight: 800; text-align:right; }

        .btn-dx {
            display:block; width:100%; padding: 20px; text-align:center; border-radius: 16px;
            font-size: 17px; font-weight: 900; text-decoration: none; transition: 0.4s;
        }
        .dx-open .btn-dx { background: linear-gradient(135deg, #8c52ff, #4facfe); color: #fff; box-shadow: 0 10px 30px rgba(140,82,255,0.4); border:none; }
        .dx-open .btn-dx:hover { background: linear-gradient(135deg, #9b66ff, #62b6fe); box-shadow: 0 15px 40px rgba(140,82,255,0.6); transform:scale(1.03); }
        
        .dx-avail .btn-dx { background: rgba(0,212,255,0.1); color: #00d4ff; border: 1px solid rgba(0,212,255,0.4); }
        .dx-avail .btn-dx:hover { background: rgba(0,212,255,0.2); box-shadow: 0 0 20px rgba(0,212,255,0.3); transform:scale(1.03); }
        
        .dx-closed .btn-dx { background: rgba(255,255,255,0.05); color: #888; border: 1px solid rgba(255,255,255,0.1); cursor:not-allowed; }

        /* ===== UPCOMING LIST ===== */
        .upcoming-sec { background: rgba(10,5,20,0.8); padding: 80px 0; border-top: 1px solid rgba(255,255,255,0.05); }
        .uc-list { display: flex; flex-direction: column; gap: 20px; }
        .uc-item {
            background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.0));
            border: 1px solid rgba(255,255,255,0.08); padding: 30px 40px; border-radius: 20px;
            display: flex; align-items: flex-start; gap: 30px; transition: 0.3s;
        }
        .uc-item:hover { background: rgba(255,255,255,0.06); border-color: rgba(0,212,255,0.3); box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform:translateX(10px); }
        .uc-badge {
            flex-shrink: 0; padding: 6px 16px; border-radius: 30px; font-size: 13px; font-weight: 800; text-transform:uppercase; letter-spacing:1px;
        }
        .uc-badge.blue { background: rgba(0,212,255,0.1); color: #00d4ff; border: 1px solid rgba(0,212,255,0.3); }
        .uc-badge.pink { background: rgba(255,0,128,0.1); color: #ff0844; border: 1px solid rgba(255,0,128,0.3); }
        .uc-content flex: 1;
        .uc-title { font-size: 22px; font-weight: 900; color: #fff; margin-bottom: 10px; }
        .uc-desc { font-size: 15px; color: #aaa; line-height: 1.6; margin-bottom: 15px; }
        .uc-date { font-size: 14px; color: #888; font-weight: 700; display:flex; align-items:center; gap:8px;}
        .uc-date i { color: #a5f3fc; }
        .uc-action { flex-shrink: 0; align-self: center; }
        .uc-btn { background: transparent; color: #d8b4fe; border: 1px solid #d8b4fe; padding: 12px 24px; border-radius: 12px; font-weight: 800; cursor: pointer; transition:0.3s;}
        .uc-btn:hover { background: rgba(140,82,255,0.2); box-shadow: 0 0 15px rgba(140,82,255,0.3); }
    </style>
</head>
<body>
    <!-- Top Header -->
    <div class="header-top-bar">
        <div class="container" style="display:flex; justify-content:space-between; align-items:center;">
            <div class="target-switch">
                <a href="dashboard_online.html" class="active">학생·학부모</a>
                <a href="dashboard_gvr.html">가맹 원장·강사</a>
            </div>
            <div style="display:flex; gap:20px; align-items:center;">
                <a href="admin_input.html" style="color:#d32f2f; font-weight:800; text-decoration:none; font-size:13px;"><i class="fas fa-cog"></i> 문제입력기/관리자</a>
                <a href="http://pf.kakao.com/_sxlwcG" target="_blank" style="color:inherit; text-decoration:none;"><i class="fas fa-headset"></i> 고객센터 (카톡상담)</a>
                <a href="signup_select.html" style="color:inherit; text-decoration:none;">로그인 / 회원가입</a>
            </div>
        </div>
    </div>
    
    <!-- Main Header -->
    <header style="background:white; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 900;">
        <div class="container main-gnb">
            <div class="logo">
                <a href="index.html"><h1>KATCH<span style="color:#E91E63;">.</span></h1></a>
            </div>
            <nav class="gnb-links">
                <a href="student_diagnostics.html" style="color:#333;">진단테스트</a>
                <a href="level_test.html" style="color:#333;">레벨테스트</a>
                <a href="problem_bank.html" style="color:#333;">문제은행</a>
                <a href="store_vod.html" style="color:#333;">VOD 인강</a>
                <a href="store_book.html" style="color:#333;">교재 스토어</a>
                <a href="lounge.html" style="color:#f57c00;"><i class="fas fa-crown"></i> VIP 라운지</a>
            </nav>
            <div class="header-utils">
                <a href="my_learning.html" title="MY 학습 진단" style="color:#333;"><i class="fas fa-chalkboard-teacher"></i></a>
                <a href="#" style="color:#333;"><i class="fas fa-bars"></i></a>
            </div>
        </div>
    </header>

    <!-- Deep Space Aurora Hero -->
    <div class="aurora-hero">
        <div class="aurora-bg"></div>
        <div class="stars"></div>
        <div class="container hero-inner">
            <div class="ah-tag"><i class="fas fa-satellite-dish"></i> Deep Diagnostic Core</div>
            <h1 class="ah-title">KATCH <span>진단테스트</span></h1>
            <p class="ah-sub">대치동 극상위권의 방대한 데이터베이스를 딥러닝으로 분석.<br>오차 없는 정밀 타겟팅으로 최단기 성적 도약의 해답을 제시합니다.</p>
            
            <div class="ah-stats">
                <div class="ahs-item">
                    <div class="ahs-val">102K<span class="unit">+</span></div>
                    <div class="ahs-label">누적 분석 데이터베이스</div>
                </div>
                <div class="ahs-item">
                    <div class="ahs-val">98.4<span class="unit">%</span></div>
                    <div class="ahs-label">취약점 예측 정확도</div>
                </div>
                <div class="ahs-item">
                    <div class="ahs-val">1st<span class="unit">Tier</span></div>
                    <div class="ahs-label">대치 본원 검증 문항</div>
                </div>
            </div>
        </div>
    </div>

    <div class="container step-container">
        <div class="proc-bar">
            <div class="proc-step done">
                <div class="proc-icon"><i class="fas fa-user-astronaut"></i></div>
                <div class="proc-title">STEP 1. 등록</div>
                <div class="proc-desc">학생 정보 연동</div>
            </div>
            <div class="proc-arrow"><i class="fas fa-angle-right"></i></div>
            <div class="proc-step active">
                <div class="proc-icon"><i class="fas fa-bullseye"></i></div>
                <div class="proc-title">STEP 2. 진단 선택</div>
                <div class="proc-desc">목적별 타겟 테스트</div>
            </div>
            <div class="proc-arrow"><i class="fas fa-angle-right"></i></div>
            <div class="proc-step">
                <div class="proc-icon"><i class="fas fa-laptop-code"></i></div>
                <div class="proc-title">STEP 3. 분석 응시</div>
                <div class="proc-desc">CBT 온라인 평가</div>
            </div>
            <div class="proc-arrow"><i class="fas fa-angle-right"></i></div>
            <div class="proc-step">
                <div class="proc-icon"><i class="fas fa-chart-network"></i></div>
                <div class="proc-title">STEP 4. AI 리포트</div>
                <div class="proc-desc">초정밀 약점 해부</div>
            </div>
        </div>
    </div>

    <!-- Exam Grid -->
    <div class="container" style="padding-bottom:100px;">
        <h2 class="section-title">현재 가동 중인 진단 시스템</h2>
        <div class="grid-3">
            
            <!-- Exam 1 (Open) -->
            <div class="dx-card dx-open">
                <div style="position:absolute; top:20px; right:20px; background:rgba(140,82,255,0.2); color:#d8b4fe; border:1px solid rgba(140,82,255,0.4); padding:6px 16px; border-radius:20px; font-size:13px; font-weight:800; box-shadow: 0 0 15px rgba(140,82,255,0.2);">
                    <i class="fas fa-bolt"></i> 접수 진행 중
                </div>
                <div class="dx-icon"><i class="fas fa-school"></i></div>
                <h3 class="dx-title">예비고1 특목고 배치고사</h3>
                <p class="dx-desc">특목/자사고 합격은 고난도 영어가 결정합니다.<br>대치동 빅데이터로 지원 학교와의 내신 적응력을<br>가장 날카롭게 진단합니다.</p>
                <div class="dx-meta">
                    <div class="dxm-row">
                        <span class="dxm-label"><i class="fas fa-crosshairs"></i> 핵심 목표</span>
                        <span class="dxm-val">특목고 최종 적합도 진단</span>
                    </div>
                    <div class="dxm-row">
                        <span class="dxm-label"><i class="fas fa-layer-group"></i> 문항 구성</span>
                        <span class="dxm-val">공통 + 학교별 킬러 문항</span>
                    </div>
                    <div class="dxm-row">
                        <span class="dxm-label"><i class="fas fa-stopwatch"></i> 소요 시간</span>
                        <span class="dxm-val">80분 (CBT 환경)</span>
                    </div>
                </div>
                <a href="#" class="btn-dx" onclick="alert('신청 모달 팝업 오픈'); return false;">지금 응시 신청하기</a>
            </div>

            <!-- Exam 2 (Available) -->
            <div class="dx-card dx-avail">
                <div style="position:absolute; top:20px; right:20px; background:rgba(0,212,255,0.2); color:#00d4ff; border:1px solid rgba(0,212,255,0.4); padding:6px 16px; border-radius:20px; font-size:13px; font-weight:800; box-shadow: 0 0 15px rgba(0,212,255,0.2);">
                    <i class="fas fa-unlock"></i> 상시 응시 개방
                </div>
                <div class="dx-icon"><i class="fas fa-fire-alt"></i></div>
                <h3 class="dx-title">예비중3 Real 특목 모의고사</h3>
                <p class="dx-desc">학교별 킬러 문형을 100% 반영한 실전 특목 입시 방향성 제시. 실제 합격 가능성을 가장 정확하게 타진해 보세요.</p>
                <div class="dx-meta">
                    <div class="dxm-row">
                        <span class="dxm-label"><i class="fas fa-crosshairs"></i> 핵심 목표</span>
                        <span class="dxm-val">실전 모의 및 사고력 측정</span>
                    </div>
                    <div class="dxm-row">
                        <span class="dxm-label"><i class="fas fa-layer-group"></i> 문항 구성</span>
                        <span class="dxm-val">대원/하나고 기출 34문항</span>
                    </div>
                    <div class="dxm-row" style="color:#00d4ff; gap:8px;">
                        <span class="dxm-label" style="color:#00d4ff;"><i class="fas fa-coins"></i> 보상</span>
                        <span class="dxm-val">+50 포인트 지급</span>
                    </div>
                </div>
                <a href="#" class="btn-dx">바로 응시창으로 이동</a>
            </div>

            <!-- Exam 3 (Closed) -->
            <div class="dx-card dx-closed">
                <div style="position:absolute; top:20px; right:20px; background:rgba(255,255,255,0.1); color:#aaa; border:1px solid rgba(255,255,255,0.2); padding:6px 16px; border-radius:20px; font-size:13px; font-weight:800;">
                    <i class="fas fa-lock"></i> 기간 종료
                </div>
                <div class="dx-icon"><i class="fas fa-graduation-cap"></i></div>
                <h3 class="dx-title">예비중1 Hello 내신 시험</h3>
                <p class="dx-desc">강남권 23개교 기출데이터를 분석. 첫 내신 지필고사의 완벽한 시뮬레이션으로 서술형 감점을 원천 차단합니다.</p>
                <div class="dx-meta">
                    <div class="dxm-row">
                        <span class="dxm-label"><i class="fas fa-crosshairs"></i> 핵심 목표</span>
                        <span class="dxm-val">중등 첫 내신 취약점 방어</span>
                    </div>
                    <div class="dxm-row">
                        <span class="dxm-label"><i class="fas fa-layer-group"></i> 문항 구성</span>
                        <span class="dxm-val">강남권 변형 총 50문항</span>
                    </div>
                    <div class="dxm-row">
                        <span class="dxm-label"><i class="fas fa-calendar-times"></i> 완료</span>
                        <span class="dxm-val">접수 및 응시 마감</span>
                    </div>
                </div>
                <a href="#" class="btn-dx">마감된 시험입니다</a>
            </div>

        </div>
    </div>

    <!-- Upcoming Updates Section -->
    <div class="upcoming-sec">
        <div class="container">
            <h2 class="section-title" style="margin-bottom:50px;">업데이트 예정 시스템</h2>
            
            <div class="uc-list">
                <div class="uc-item">
                    <div class="uc-badge blue">26년 5월 가동 예정</div>
                    <div class="uc-content" style="flex:1;">
                        <h3 class="uc-title">중2 수준별 수능형 멀티플 모의고사</h3>
                        <p class="uc-desc">중학교 2학년, 본격적인 입시 레이스를 위해 수능형 문항에 대한 노출과 객관적인 자신의 위치를 입체적으로 파악하는 실전 테스트 모듈이 탑재됩니다.</p>
                        <div class="uc-date"><i class="fas fa-clock"></i> 시스템 구축 진행율 85% 완료</div>
                    </div>
                    <div class="uc-action">
                        <button class="uc-btn"><i class="fas fa-bell"></i> 사전 알림 예약</button>
                    </div>
                </div>

                <div class="uc-item">
                    <div class="uc-badge pink">26년 8월 대규모 업데이트</div>
                    <div class="uc-content" style="flex:1;">
                        <h3 class="uc-title">다차원 문해력 정밀 측정 엔진 "Insight Core"</h3>
                        <p class="uc-desc">KATCH 데이터 랩이 개발 중인 새로운 형태의 진단 평가. 단순한 독해를 넘어서 텍스트 논리 구조의 추론력을 소수점 단위로 평가하는 혁신적 시스템입니다.</p>
                        <div class="uc-date"><i class="fas fa-cogs"></i> AI 엔진 파인튜닝 단계</div>
                    </div>
                    <div class="uc-action">
                        <button class="uc-btn"><i class="fas fa-bell"></i> 사전 알림 예약</button>
                    </div>
                </div>
            </div>
            
            <div style="text-align:center; color:#666; font-size:14px; margin-top:40px;">
                * 예약 시 시스템 마일스톤 달성에 따라 카카오톡으로 진행 상황을 안내해 드립니다.
            </div>
        </div>
    </div>

    <footer style="background:#fff; padding:50px 0; border-top:1px solid #eaeaea; color:#666;">
        <div class="container text-center" style="font-size:14px;">
            <strong>주식회사 케이엔에스북스</strong> | 대표이사 김치삼 | 사업자번호 777-81-03746<br>
            서울특별시 강남구 역삼로78길 21, 칼텍빌딩 3층(대치동) | e-mail: denglemaster@gmail.com<br><br>
            © 2026 KATCH. All rights reserved.
        </div>
    </footer>

</body>
</html>`;

fs.writeFileSync(diagPath, newHTML, 'utf8');
console.log('Successfully recreated student_diagnostics.html with the stunning Deep Space Aurora UI.');
