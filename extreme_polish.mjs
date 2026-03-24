import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';

// ===============================================
// 1. Level Test: Ticket-style Application Card
// ===============================================
const levelTestPath = path.join(PUBLIC_DIR, 'level_test.html');
if (fs.existsSync(levelTestPath)) {
    let ht = fs.readFileSync(levelTestPath, 'utf8');

    const ticketCss = `
        .prog-card {
            display: flex; flex-direction: row; background: #fff;
            border-radius: 20px; overflow: hidden; margin-bottom: 30px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.05); border: 1px solid rgba(212,175,55,0.2);
            position: relative; transition: 0.4s;
        }
        .prog-card:hover { transform: translateY(-5px); box-shadow: 0 25px 50px rgba(212,175,55,0.15); border-color: rgba(212,175,55,0.4); }
        .pc-info-side { flex: 2; padding: 45px 50px; background: #fff; position: relative; }
        .pc-info-side::after { content: ''; position: absolute; right: 0; top: 10%; bottom: 10%; width: 1px; border-right: 2px dashed rgba(212,175,55,0.3); }
        .pc-ticket-side { flex: 1; min-width: 320px; background: linear-gradient(135deg, #faf8f5, #fff); padding: 45px 40px; display: flex; flex-direction: column; justify-content: center; background-image: radial-gradient(circle at top right, rgba(212,175,55,0.05), transparent); }
        .pc-tag { display: inline-block; background: #111; color: #d4af37; padding: 6px 16px; border-radius: 30px; font-size: 13px; font-weight: 800; margin-bottom: 15px; letter-spacing: 1px; }
        .pc-title { font-size: 28px; font-weight: 900; color: #111; margin-bottom: 15px; letter-spacing: -1px; }
        .pc-desc { font-size: 15px; color: #666; line-height: 1.7; font-weight: 500; }
        .ticket-row { display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .ticket-label { font-size: 13px; color: #888; font-weight: 700; text-transform: uppercase; }
        .ticket-val { font-size: 15px; color: #111; font-weight: 900; text-align: right; }
        .ticket-price { font-size: 24px; color: #d4af37; font-weight: 900; text-align: center; margin: 20px 0; }
        .btn-apply-ticket { display: block; width: 100%; padding: 18px; text-align: center; border-radius: 12px; background: linear-gradient(135deg, #111, #333); color: #fff; font-size: 16px; font-weight: 900; text-decoration: none; border: none; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .btn-apply-ticket:hover { background: linear-gradient(135deg, #d4af37, #f1c40f); color: #111; box-shadow: 0 15px 35px rgba(212,175,55,0.4); transform: translateY(-3px); }
        @media (max-width: 900px) { .prog-card { flex-direction: column; } .pc-info-side::after { display: none; } .pc-info-side { padding: 30px; } .pc-ticket-side { border-top: 2px dashed rgba(212,175,55,0.3); padding: 30px; } }
    `;
    
    if (ht.indexOf('</style>') !== -1) { ht = ht.replace('</style>', ticketCss + '\n</style>'); }

    const newCard1 = `
    <!-- Card 1 (Ticket Style) -->
    <div class="prog-card">
        <div class="pc-info-side">
            <span class="pc-tag"><i class="fas fa-gem"></i> 상시 모집</span>
            <h3 class="pc-title">최상위권 마스터 클래스 선발고사</h3>
            <p class="pc-desc">대치동 최상위권의 압도적인 성취를 가능케 한 바로 그 문항 배열. KATCH 정규 커리큘럼의 정수를 소화할 수 있는 잠재력과 극도의 심화 사고력을 입체적으로 평가합니다. 합격 시 V.I.P 클래스 우선 배정의 혜택이 주어집니다.</p>
        </div>
        <div class="pc-ticket-side">
            <div class="ticket-row"><span class="ticket-label">대상</span><span class="ticket-val">예비 고1 / 중등 최상위 1%</span></div>
            <div class="ticket-row"><span class="ticket-label">응시 방식</span><span class="ticket-val">온라인 CBT (120분)</span></div>
            <div class="ticket-row"><span class="ticket-label">일정</span><span class="ticket-val">수 / 토 / 일 (선택)</span></div>
            <div class="ticket-price">20,000 P</div>
            <a href="#" class="btn-apply-ticket" onclick="openRegModal('최상위권 마스터 클래스 선발고사 평가'); return false;">평가 접수 및 결제 <i class="fas fa-arrow-right"></i></a>
        </div>
    </div>
    `;
    ht = ht.replace(/<!-- Card 1 -->\s*<div class="prog-card">.*?<\/div>\s*<\/div>\s*<div class="sec-header"/s, newCard1 + '\n<div class="sec-header"');

    const newCard2 = `
    <!-- Card 2 (Ticket Style) -->
    <div class="prog-card" style="margin-bottom:0;">
        <div class="pc-info-side">
            <span class="pc-tag" style="background:rgba(212,175,55,0.1); color:#d4af37; border: 1px solid #d4af37;"><i class="fas fa-clock"></i> 5월 말 VIP 우선 모집</span>
            <h3 class="pc-title">여름방학 수능 마스터리 중등부 우선 선발</h3>
            <p class="pc-desc">수능 최상위 도약을 위한 가장 압도적인 8주. 짧은 기간 내에 상위 1%로의 물리적 도약을 이뤄낼 최적의 수재들만을 한정 선발하는 인텐시브 코스입니다.</p>
        </div>
        <div class="pc-ticket-side">
            <div class="ticket-row"><span class="ticket-label">선발 대상</span><span class="ticket-val">중등 상위 5% 이내 한정</span></div>
            <div class="ticket-row"><span class="ticket-label">진행 시기</span><span class="ticket-val">2026 썸머 브레이크 (7~8월)</span></div>
            <button class="btn-apply-ticket" style="background:#fff; color:#111; border: 1px solid #111; margin-top:20px;" onclick="setNotify(1)"><i class="far fa-bell"></i> V.I.P 오픈 알림 받기</button>
        </div>
    </div>
    `;
    ht = ht.replace(/<!-- Card 2 -->\s*<div class="prog-card"[^>]*>.*?<\/div>\s*<\/div>\s*<\/div>/s, newCard2 + '\n</div>\n</div>');

    fs.writeFileSync(levelTestPath, ht, 'utf8');
}


// ===============================================
// 2. Diagnostics: "Glow 3D Neon Ice Font & Sparkles"
// ===============================================
const diagPath = path.join(PUBLIC_DIR, 'student_diagnostics.html');
if (fs.existsSync(diagPath)) {
    let ht = fs.readFileSync(diagPath, 'utf8');

    const sparklyAuroraCss = `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
        
        body { font-family: 'Pretendard', sans-serif; background: #010815; }
        
        /* User exact reference: Glowing, outlined, icy-blue 3D text */
        .neon-3d-text {
            font-family: 'Pretendard', sans-serif; font-weight: 900;
            background: linear-gradient(180deg, #e0f2fe 0%, #7dd3fc 40%, #0ea5e9 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1.5px rgba(186, 230, 253, 0.9);
            filter: drop-shadow(0px 0px 8px rgba(56, 189, 248, 0.8)) drop-shadow(0px 0px 20px rgba(56, 189, 248, 0.4));
            position: relative; z-index: 2;
        }
        
        .ah-title { font-size: 72px; letter-spacing: -2px; line-height: 1.15; margin-bottom: 25px; display:inline-block; }
        .dx-title { font-size: 28px; line-height: 1.3; margin-bottom: 15px; letter-spacing: -0.5px; position:relative; display:inline-block;}

        /* Apply the exact neon 3D icy text style to the hero title and card titles */
        h1.ah-title, h3.dx-title {
            background: linear-gradient(180deg, #f0f9ff 0%, #bae6fd 45%, #0284c7 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1.5px rgba(224, 242, 254, 0.9);
            filter: drop-shadow(0 0 10px rgba(14, 165, 233, 0.8)) drop-shadow(0 0 25px rgba(14, 165, 233, 0.4));
            position: relative;
        }

        /* 3D Drop shadow stack for that thick geometric feel */
        h1.ah-title::before, h3.dx-title::before {
            content: attr(data-text); position: absolute; left: 0; top: 0; z-index: -1;
            -webkit-text-stroke: 0; -webkit-text-fill-color: rgba(3, 105, 161, 0.8);
            transform: translate(2px, 3px);
            filter: blur(2px);
        }

        /* Sharp vector sparkles */
        .sparkle-icon {
            position: absolute; width: 25px; height: 25px;
            background: radial-gradient(circle, #fff 10%, transparent 60%);
            clip-path: polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%);
            animation: bling 2s infinite alternate; pointer-events:none;
        }
        .s1 { top: -15px; right: -25px; animation-delay: 0s; }
        .s2 { bottom: 10px; left: -25px; transform: scale(0.6); animation-delay: 1s; }
        .s3 { top: 50%; right: 40%; transform: scale(0.4); animation-delay: 0.5s; opacity:0.8;}

        @keyframes bling { 0% { transform: scale(0) rotate(0deg); opacity: 0; } 50% { opacity: 1; } 100% { transform: scale(1) rotate(90deg); opacity: 0; } }

        /* The overall background sparkles */
        .sparkles-bg {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; pointer-events:none;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><circle cx="20" cy="20" r="1.5" fill="%23ffffff" opacity="0.8"/><circle cx="80" cy="150" r="2" fill="%237dd3fc" opacity="0.9"/><circle cx="160" cy="50" r="1" fill="%23e0f2fe" opacity="0.6"/><circle cx="120" cy="110" r="2.5" fill="%23ffffff" opacity="1"/></svg>');
            animation: twinkle 15s linear infinite alternate;
        }
        @keyframes twinkle { 0% { opacity: 0.1; transform: scale(1); } 100% { opacity: 0.8; transform: scale(1.1); } }
    `;

    if (ht.indexOf('</style>') !== -1) {
        ht = ht.replace('</style>', sparklyAuroraCss + '\n</style>');
    }
    
    // Inject data-text attributes to h1 and h3 for the 3D pseudo-element matching
    ht = ht.replace('<h1 class="ah-title">KATCH <span>진단테스트</span></h1>', 
                    '<h1 class="ah-title" data-text="KATCH 진단테스트">KATCH 진단테스트<div class="sparkle-icon s1"></div><div class="sparkle-icon s2"></div></h1>');

    ht = ht.replace('<h3 class="dx-title">예비고1 특목고 배치고사</h3>', 
                    '<h3 class="dx-title" data-text="예비고1 특목고 배치고사">예비고1 특목고 배치고사<div class="sparkle-icon s1"></div></h3>');

    ht = ht.replace('<h3 class="dx-title">예비중3 Real 특목 모의고사</h3>', 
                    '<h3 class="dx-title" data-text="예비중3 Real 특목 모의고사">예비중3 Real 특목 모의고사<div class="sparkle-icon s1"></div></h3>');

    ht = ht.replace('<h3 class="dx-title">예비중1 Hello 내신 시험</h3>', 
                    '<h3 class="dx-title" data-text="예비중1 Hello 내신 시험">예비중1 Hello 내신 시험<div class="sparkle-icon s1"></div></h3>');

    // Add sparkles div to aurora-hero if not already there
    if (!ht.includes('<div class="sparkles-bg"></div>')) {
        ht = ht.replace('<div class="stars"></div>', '<div class="stars"></div>\n<div class="sparkles-bg"></div>');
    }

    fs.writeFileSync(diagPath, ht, 'utf8');
}


// ===============================================
// 3. Lounge: Massively Prettier Premium UI
// ===============================================
const loungePath = path.join(PUBLIC_DIR, 'lounge.html');
if (fs.existsSync(loungePath)) {
    let ht = fs.readFileSync(loungePath, 'utf8');

    const premiumLoungeCss = `
        body.bg-gray { background-color: #fdfbfb; } 
        
        .mag-card {
            background: #fff; border-radius: 24px; overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.06); border: 1px solid rgba(212,175,55,0.15);
            transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex; flex-direction: column;
        }
        .mag-card:hover { transform: translateY(-12px); box-shadow: 0 30px 60px rgba(212,175,55,0.2); border-color: rgba(212,175,55,0.6); }
        .mc-img { border-radius: 24px 24px 0 0; }
        .mc-body { padding: 35px 30px; }
        .mc-title { font-size: 22px; font-weight: 900; line-height: 1.4; color: #111; margin-bottom: 15px; }
        .mc-desc { font-size: 15px; color: #666; line-height: 1.7; }
        
        .dl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-top: 20px; }
        .dl-item {
            background: linear-gradient(145deg, #ffffff, #faf8f5); border-radius: 20px; padding: 40px 30px; text-align: center;
            box-shadow: 0 15px 35px rgba(0,0,0,0.04); border: 1px solid rgba(212,175,55,0.2); transition: 0.4s; position: relative; overflow: hidden;
        }
        .dl-item::before { content: ''; position: absolute; top:0; left:0; right:0; height:4px; background: linear-gradient(90deg, #d4af37, #f1c40f); transform: scaleX(0); transition: 0.4s; transform-origin: left; }
        .dl-item:hover { transform: translateY(-10px); box-shadow: 0 25px 50px rgba(212,175,55,0.15); }
        .dl-item:hover::before { transform: scaleX(1); }
        .dl-icon-wrapper {
            width: 80px; height: 80px; margin: 0 auto 25px; border-radius: 50%;
            background: linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.2)); display: flex; align-items: center; justify-content: center; font-size: 32px; color: #B8860B;
            box-shadow: 0 10px 25px rgba(212,175,55,0.2);
        }
        .dl-title { font-size: 18px; font-weight: 900; color: #111; margin-bottom: 12px; }
        .dl-point { display: inline-block; background: #111; color: #d4af37; padding: 6px 16px; border-radius: 30px; font-size: 13px; font-weight: 800; font-family: 'Montserrat', sans-serif;}
    `;
    
    if (ht.indexOf('</style>') !== -1) { ht = ht.replace('</style>', premiumLoungeCss + '\n</style>'); }

    const newDlGridContent = `
        <div class="dl-item">
            <div class="dl-icon-wrapper"><i class="fas fa-file-pdf"></i></div>
            <h4 class="dl-title">[3월 학평 대비] 고3 영어 오답률 TOP 10 모음집</h4>
            <div class="dl-point">300 P <span style="color:#aaa; font-weight:400; font-size:11px;">(1.2k 다운)</span></div>
        </div>
        <div class="dl-item">
            <div class="dl-icon-wrapper"><i class="fas fa-file-word"></i></div>
            <h4 class="dl-title">외대부고/대원외고 (예비고) 내신 기출 변형 50제</h4>
            <div class="dl-point">500 P <span style="color:#aaa; font-weight:400; font-size:11px;">(850 다운)</span></div>
        </div>
        <div class="dl-item">
            <div class="dl-icon-wrapper"><i class="fas fa-gift"></i></div>
            <h4 class="dl-title">KNS 구문독해 에센셜 핵심 포인트 요약집</h4>
            <div class="dl-point" style="color:#4CAF50;">무료 지원 <span style="color:#aaa; font-weight:400; font-size:11px;">(3.5k 다운)</span></div>
        </div>
    `;
    
    ht = ht.replace(/<div class="dl-grid">.*?<\/div>\s*<\/section>/s, '<div class="dl-grid">\n' + newDlGridContent + '\n</div>\n</section>');

    // Avoid syntax errors by using double quotes inside the JS string!
    ht = ht.replace(/<h2 class="mag-title">/g, "<h2 class=\"mag-title\" style=\"font-family:'Montserrat', sans-serif; font-weight:900; font-size:32px;\">");

    fs.writeFileSync(loungePath, ht, 'utf8');
}

console.log('Final aesthetic script executed.');
