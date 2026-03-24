import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';
const diagPath = path.join(PUBLIC_DIR, 'student_diagnostics.html');

if (fs.existsSync(diagPath)) {
    let ht = fs.readFileSync(diagPath, 'utf8');

    // ============================================
    // 1. Add "현재 가동 중인 진단 시스템" title
    // ============================================
    // The previous HTML has `<h2 class="section-title">현재 가동 중인 진단 시스템</h2>` already inside `<div class="container" style="padding-bottom:100px;">`
    // Let's ensure it exists and has the correct glowing styling.
    const titleCss = `
        .section-title.glowing {
            font-size: 38px; font-weight: 900; color: #fff; text-align: center; margin-bottom: 50px;
            text-shadow: 0 0 20px rgba(255,255,255,0.4); letter-spacing: -1px;
        }
    `;
    if (ht.indexOf('</style>') !== -1 && !ht.includes('.section-title.glowing')) {
        ht = ht.replace('</style>', titleCss + '\n</style>');
    }
    
    // Replace the plain title with glowing title if it exists
    ht = ht.replace('<h2 class="section-title">현재 가동 중인 진단 시스템</h2>', '<h2 class="section-title glowing">현재 가동 중인 진단 시스템</h2>');

    // ============================================
    // 2. Remove "Upcoming Updates" and simple Footer
    // ============================================
    const removeStart = ht.indexOf('<!-- Upcoming Updates Section -->');
    let removeEnd = ht.indexOf('</body>');
    
    if (removeStart !== -1 && removeEnd !== -1) {
        
        const majesticTrophyCss = `
            /* ===== MAJESTIC TROPHY SECTION ===== */
            .trophy-sec {
                position: relative; background: radial-gradient(circle at top, #3a0ca3 0%, #150030 60%, #010815 100%);
                padding: 120px 0 100px 0; overflow: hidden; border-top: 1px solid rgba(138,43,226,0.2);
            }
            .trophy-sec::before {
                content: ''; position: absolute; top:0; left:0; right:0; bottom:0;
                background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" opacity="0.05"><path d="M20,10 Q50,90 80,10 Z" fill="%23fff"/></svg>') no-repeat center top;
                background-size: 600px;
                opacity: 0.2; pointer-events: none;
                filter: drop-shadow(0 0 50px #b5179e) blur(10px);
            }
            .trophy-sec::after {
                content: ''; position: absolute; left:-20%; top:20%; width: 400px; height: 400px;
                background: radial-gradient(circle, rgba(247,37,133,0.15) 0%, transparent 70%); border-radius:50%; filter:blur(50px);
            }
            
            .ts-header { text-align: center; position: relative; z-index: 10; margin-bottom: 80px; }
            .ts-top-tag { color: #4cc9f0; font-size: 18px; font-weight: 800; letter-spacing: 1px; margin-bottom: 10px; text-shadow: 0 0 10px rgba(76,201,240,0.5); }
            .ts-main-title { font-size: 85px; font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 25px; letter-spacing:-3px; text-shadow: 0 15px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.3); }
            .ts-sub-title { font-size: 24px; color: #e0b1cb; font-weight: 700; margin-bottom: 10px; }
            .ts-desc { font-size: 32px; font-weight: 900; color: #fff; }
            
            /* Stats Row with Laurel Wreaths */
            .stats-row { display: flex; justify-content: center; gap: 40px; position: relative; z-index: 10; margin-bottom: 100px; flex-wrap:wrap;}
            .stat-box { text-align: center; width: 220px; position:relative; }
            
            /* Add SVG Laurel Wreaths via Background */
            .laurel-bg {
                position:absolute; top:-30px; left:50%; transform:translateX(-50%); width: 220px; height: 180px;
                background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M100,180 C40,180 10,120 10,70 C10,30 30,10 50,10 C70,10 80,40 100,70 C120,40 130,10 150,10 C170,10 190,30 190,70 C190,120 160,180 100,180 Z" fill="none" stroke="url(%23grad)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%238c52ff"/><stop offset="100%" stop-color="%234facfe"/></linearGradient></defs><path d="M100,180 C40,180 10,120 10,70 C10,30 30,10 50,10 C70,10 80,40 100,70" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="8" opacity="0.2"/><path d="M100,180 C160,180 190,120 190,70 C190,30 170,10 150,10 C130,10 120,40 100,70" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="8" opacity="0.2"/></svg>') no-repeat center center;
                background-size: contain; opacity:0.8; z-index:-1;
            }
            .stat-box:hover .laurel-bg { filter: brightness(1.5) drop-shadow(0 0 10px #8c52ff); transition: 0.3s; }
            
            .stat-label { font-size: 15px; color: #ccc; font-weight: 700; margin-bottom: 5px; margin-top:30px;}
            .stat-val { font-size: 42px; font-weight: 900; color: #fff; margin-bottom: 5px; text-shadow: 0 0 15px rgba(255,255,255,0.4); }
            .stat-unit { font-size: 24px; color: #b5179e; }
            .stat-sub { font-size: 11px; color: #888; }
            
            /* Review Cards */
            .review-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; position:relative; z-index:10; padding:0 20px;}
            .r-card {
                background: rgba(30,10,60,0.5); backdrop-filter: blur(20px); border-radius: 20px; padding: 35px 25px;
                border: 1px solid rgba(138,43,226,0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.5); border-top: 1px solid rgba(138,43,226,0.6);
                transition: 0.4s; display:flex; flex-direction:column; justify-content:space-between;
            }
            .r-card:hover { transform: translateY(-10px); background: rgba(50,15,90,0.6); border-color: rgba(247,37,133,0.6); box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(247,37,133,0.2); }
            
            .rc-badge { display:inline-block; background:rgba(76,201,240,0.2); color:#4cc9f0; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:800; margin-bottom:15px; border:1px solid rgba(76,201,240,0.4); align-self:flex-start; }
            .rc-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 15px; line-height:1.4; }
            .rc-desc { font-size: 13px; color: #bbb; line-height: 1.7; margin-bottom: 25px; }
            .rc-author { font-size: 13px; color: #888; text-align:right; font-weight:700;}
            
            /* Dark Footer */
            .dark-footer { background: #010409; padding: 60px 0; border-top: 1px solid rgba(255,255,255,0.05); color: #666; font-size: 13px; }
            .dark-footer .df-top { display:flex; justify-content:space-between; margin-bottom:30px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:30px;}
            .df-links a { color: #888; text-decoration:none; margin-right: 20px; font-weight:700; }
            .df-links a:hover { color: #fff; }
        `;
        
        // Inject styles
        if (ht.indexOf('</style>') !== -1 && !ht.includes('.trophy-sec')) {
            ht = ht.replace('</style>', majesticTrophyCss + '\n</style>');
        }

        const majesticHtml = `
    <!-- Majestic Trophy & Success Statistics Section -->
    <div class="trophy-sec">
        <div class="container">
            <div class="ts-header">
                <div class="ts-top-tag">특목·자사고 합격을 완성하는 확실한 선택</div>
                <div class="ts-main-title">KATCH 클래스</div>
                <div class="ts-sub-title">1st Tier 대치동 극상위권이 증명하는 데이터</div>
                <div class="ts-desc">눈으로 직접 확인하는 선배들의 성공 비결</div>
            </div>
            
            <div class="stats-row">
                <div class="stat-box">
                    <div class="laurel-bg"></div>
                    <div class="stat-label">누적 진단 데이터</div>
                    <div class="stat-val">120,500<span class="stat-unit">개</span></div>
                    <div class="stat-sub">2026년 3월 기준 KATCH 누적 응시</div>
                </div>
                <div class="stat-box">
                    <div class="laurel-bg"></div>
                    <div class="stat-label">취약점 예측 정확도</div>
                    <div class="stat-val">98.7<span class="stat-unit">%</span></div>
                    <div class="stat-sub">지필고사 및 실제 시험 점수 연동 기준</div>
                </div>
                <div class="stat-box">
                    <div class="laurel-bg"></div>
                    <div class="stat-label">학부모 컨설팅 만족도</div>
                    <div class="stat-val">4.94<span class="stat-unit">점</span></div>
                    <div class="stat-sub">KATCH 클래스 정규반 대상 설문 (5.0 만점)</div>
                </div>
                <div class="stat-box">
                    <div class="laurel-bg"></div>
                    <div class="stat-label">특목·자사고 합격률</div>
                    <div class="stat-val">10명 중 8<span class="stat-unit">명</span></div>
                    <div class="stat-sub">2025년 특목고 지망 수강생 환산 기준</div>
                </div>
            </div>
            
            <div class="review-grid">
                <div class="r-card">
                    <div>
                        <span class="rc-badge">대원외고 합격</span>
                        <div class="rc-title">완벽한 오답 분석으로<br>합격을 완성했습니다!</div>
                        <div class="rc-desc">막연하게 불안했던 영어 과목이었지만, KATCH 진단테스트의 소름 돋는 약점 분석 덕분에 어느 파트를 채워야 할 지 방향이 명확해졌습니다. 단순 성적을 넘어 사고력을 잡아준 1:1 컨설팅이 신의 한 수 였습니다.</div>
                    </div>
                    <div class="rc-author">김*현 학습생</div>
                </div>
                <div class="r-card">
                    <div>
                        <span class="rc-badge" style="background:rgba(247,37,133,0.2); color:#f72585; border-color:rgba(247,37,133,0.4);">하나고 합격</span>
                        <div class="rc-title">진단 결과의 정확도가<br>학습 효율을 바꿨습니다.</div>
                        <div class="rc-desc">기존 모의고사에서는 알 수 없었던 문제 풀이 습관의 맹점을 찾아내 줬습니다. 내가 왜 이 매력적인 오답을 골랐는지 AI가 패턴을 분석해주니 실수가 절반으로 줄었습니다.</div>
                    </div>
                    <div class="rc-author">이*진 학습생</div>
                </div>
                <div class="r-card">
                    <div>
                        <span class="rc-badge" style="background:rgba(140,82,255,0.2); color:#d8b4fe; border-color:rgba(140,82,255,0.4);">외대부고 합격</span>
                        <div class="rc-title">1st Tier 대치동 자료의<br>힘을 직접 경험했어요.</div>
                        <div class="rc-desc">지방에 살고 있어 대치동 학원가 정보가 절대적으로 부족했는데, KATCH 프리미엄 VOD와 기출 변형 킬러 타겟팅 문제들이 완벽한 내신 대비를 가능하게 해줬습니다.</div>
                    </div>
                    <div class="rc-author">박*우 학습생</div>
                </div>
                <div class="r-card">
                    <div>
                        <span class="rc-badge" style="background:rgba(255,152,0,0.2); color:#ffb74d; border-color:rgba(255,152,0,0.4);">현역 의대 진학</span>
                        <div class="rc-title">이게 진짜 실전입니다.<br>수능까지 흔들림 없이.</div>
                        <div class="rc-desc">수능 1등급을 가르는 멘탈 관리는 내 정확한 위치를 직시하는 것에서 시작합니다. KATCH GVR 시스템과 진단 시스템으로 수시/정시 밸런스를 끝까지 포기하지 않고 잡고 갈 수 있었습니다.</div>
                    </div>
                    <div class="rc-author">최*혁 학습생</div>
                </div>
            </div>
            
        </div>
    </div>

    <!-- Dark Futuristic Footer -->
    <footer class="dark-footer">
        <div class="container">
            <div class="df-top">
                <div class="df-logo" style="font-family:'Montserrat', sans-serif; font-size:24px; font-weight:900; color:#fff;">
                    KATCH<span style="color:#E91E63;">.</span>
                </div>
                <div class="df-links">
                    <a href="#">이용약관</a>
                    <a href="#">개인정보처리방침</a>
                    <a href="#">고객센터</a>
                    <a href="#">KNS 프리미엄 가맹안내</a>
                </div>
            </div>
            <div style="line-height:1.7;">
                <strong>주식회사 케이엔에스북스</strong> | 대표이사 김치삼 | 사업자번호 777-81-03746<br>
                서울특별시 강남구 역삼로78길 21, 칼텍빌딩 3층(대치동) | 고객센터 : 1588-0000 | e-mail: denglemaster@gmail.com<br><br>
                © 2026 KATCH Edu. All rights reserved.
            </div>
        </div>
    </footer>
    </body>
    `;
        
        // Slice out the ugly "upcoming sec" and "white footer"
        ht = ht.substring(0, removeStart) + majesticHtml + '\n</html>';
        
        fs.writeFileSync(diagPath, ht, 'utf8');
        console.log("Replaced bottom content with massive GLOWING Success Trophy section.");
    } else {
        console.log("Indices not found. Check HTML.");
    }
}
