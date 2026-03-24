import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';
const loungePath = path.join(PUBLIC_DIR, 'lounge.html');

if (fs.existsSync(loungePath)) {
    let ht = fs.readFileSync(loungePath, 'utf8');

    // We will meticulously replace the entire `<section class="mag-section">` starting from Secret VOD 
    // down to the end of Top 1% Resource Hub.
    
    // 1. Locate the exact start of the Secret VOD section
    const startStr = '<!-- Secret VOD Section -->';
    // 2. Locate the Daechi Life section to mark the end
    const endStr = '<!-- Daechi Life -->';
    
    const startIndex = ht.indexOf(startStr);
    const endIndex = ht.indexOf(endStr);
    
    if (startIndex !== -1 && endIndex !== -1) {
        
        const restoredHtml = `<!-- Secret VOD Section -->
                <section class="mag-section">
                    <div class="mag-header">
                        <h2 class="mag-title" style="font-family:'Montserrat', sans-serif; font-weight:900; font-size:32px;">Secret Live & VOD <span class="mag-subtitle">최상위권을 위한 대치동 현장 LIVE 및 핵심 VOD</span></h2>
                        <a href="lounge.html" style="color:#d4af37; font-weight:bold; font-size:14px; text-decoration:none;">더보기 <i class="fas fa-angle-right"></i></a>
                    </div>
                    <div class="grid-2">
                        <div class="mag-card">
                            <div class="mc-img video-thumb" style="background: linear-gradient(135deg, #1A237E, #311B92);">
                                <span class="mc-badge" style="background:#fff; color:#111; font-weight:900; padding:6px 14px; border-radius:30px; box-shadow:0 4px 15px rgba(0,0,0,0.3); border:none;">LIVE 다시보기</span>
                            </div>
                            <div class="mc-body">
                                <div>
                                    <h4>[단독 공개] 2026학년도 수능 영어 예측 및 킬러 문항 대비 전략</h4>
                                    <p>신동원 원장님이 직접 밝히는 대치동 극상위권의 비밀. 1등급과 2등급을 가르는 단 2문제의 원리를 파헤칩니다.</p>
                                </div>
                                <div class="mc-meta">
                                    <span><i class="fas fa-user-circle"></i> 신동원 원장</span>
                                    <span class="mc-price"><i class="fas fa-lock text-gray"></i> 라운지 무료</span>
                                </div>
                            </div>
                        </div>
                        <div class="mag-card" style="cursor:pointer;" onclick="openPointModal()">
                            <div class="mc-img video-thumb" style="background: linear-gradient(135deg, #1A237E, #311B92);">
                                <span class="mc-badge gold" style="background:#fff; color:#111; font-weight:900; padding:6px 14px; border-radius:30px; box-shadow:0 4px 15px rgba(0,0,0,0.3); border:none;">Premium VOD</span>
                            </div>
                            <div class="mc-body">
                                <div>
                                    <h4>(구) TEPS 문법은 어떻게 수능 적응력을 높이는가?</h4>
                                    <p>수능에 직결되는 문법 체계 완성. 왜 대치동 최상위권은 고득점을 위해 TEPS를 고집하는지 설명합니다.</p>
                                </div>
                                <div class="mc-meta mt-15">
                                    <span><i class="fas fa-clock"></i> 45분 (맛보기)</span>
                                    <span class="mc-price" style="background:#ffe0b2; padding:4px 10px; border-radius:20px; color:#e65100;"><i class="fas fa-lock text-gray"></i> 1,000 P 소진</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Top 1% Resource Hub -->
                <section class="mag-section">
                    <div class="mag-header">
                        <h2 class="mag-title" style="font-family:'Montserrat', sans-serif; font-weight:900; font-size:32px;">Top 1% Resource Hub <span class="mag-subtitle">대치동 극상위권들이 가장 많이 틀린 빅데이터 오답노트</span></h2>
                        <a href="directory.html" style="color:#d4af37; font-weight:bold; font-size:14px; text-decoration:none;">전체 자료실 <i class="fas fa-angle-right"></i></a>
                    </div>
                    <div class="dl-grid">
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
                    </div>
                </section>

                `;
        
        ht = ht.substring(0, startIndex) + restoredHtml + ht.substring(endIndex);
        
        fs.writeFileSync(loungePath, ht, 'utf8');
        console.log("Successfully restored and upgraded Lounge HTML structure.");
    } else {
        console.log("Could not find the section boundaries.");
    }
}
