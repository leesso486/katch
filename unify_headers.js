const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const unifiedHeader = `<!-- 1. Top Header -->
    <div class="header-top-bar" style="background:#f0f2f5; padding:5px 0; font-size:12px; color:#666; border-bottom:1px solid #e0e0e0;">
        <div class="container flex-between align-center">
            <div class="target-switch" style="display:inline-flex; background:#e0e4e8; border-radius:30px; overflow:hidden; padding:4px;">
                <a href="dashboard_online.html" style="padding:6px 18px; border-radius:20px; color:white; background:#111; text-decoration:none; font-weight:800; font-size:13px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">학생·학부모</a>
                <a href="dashboard_gvr.html" style="padding:6px 18px; border-radius:20px; color:#555; background:transparent; text-decoration:none; font-weight:800; font-size:13px;">가맹 원장·강사</a>
            </div>
            <div style="display:flex; gap:20px; align-items:center;">
                <a href="admin_input.html" style="color:#d32f2f; font-weight:800; text-decoration:none; font-size:13px;"><i class="fas fa-cog"></i> 문제입력기/관리자</a>
                <a href="http://pf.kakao.com/_sxlwcG" target="_blank" style="color:inherit; text-decoration:none;"><i class="fas fa-headset"></i> 고객센터 (카톡상담)</a>
                <a href="signup_select.html" style="color:inherit; text-decoration:none;">로그인 / 회원가입</a>
            </div>
        </div>
    </div>
    <header style="background:white; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 900;">
        <div class="container main-gnb" style="display: flex; align-items: center; justify-content: space-between; padding: 18px 0;">
            <div class="logo">
                <a href="index.html" style="text-decoration:none;">
                    <h1 style="font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 26px; color: #111; margin: 0; letter-spacing: -1px;">
                        KATCH<span style="color:#E91E63;">.</span>
                    </h1>
                </a>
            </div>
            <nav class="gnb-links" style="display: flex; gap: 35px; font-size: 16px; font-weight: 800; align-items:center;">
                <a href="student_diagnostics.html" style="color: #333; text-decoration: none; transition: 0.2s;">진단테스트</a>
                <a href="level_test.html" style="color: #333; text-decoration: none; transition: 0.2s;">레벨테스트</a>
                <a href="problem_bank.html" style="color: #333; text-decoration: none; transition: 0.2s;">문제은행</a>
                <a href="store_vod.html" style="color: #333; text-decoration: none; transition: 0.2s;">VOD 인강</a>
                <a href="store_book.html" style="color: #333; text-decoration: none; transition: 0.2s;">교재 스토어</a>
                <a href="lounge.html" style="color: #f57c00; text-decoration: none; display:flex; align-items:center; gap:6px;"><i class="fas fa-crown"></i> VIP 라운지</a>
            </nav>
            <div class="header-utils" style="display: flex; gap: 20px; align-items: center; font-size: 22px; color: #333;">
                <a href="my_learning.html" title="MY 학습 진단" style="color:inherit;"><i class="fas fa-chalkboard-teacher"></i></a>
                <a href="#" style="color:inherit;"><i class="fas fa-bars"></i></a>
            </div>
        </div>
    </header>`;

let updatedFiles = 0;
for (const file of files) {
    if (file === 'admin_input.html' || file === 'admin_exam_input.html' || file === 'admin_report_template.html') {
        // admin pages have a side nav, often no top header. Or maybe they do. Let's skip pure admin pages?
        // Let's check if they have a <header> tag or header-top-bar.
    }
    const fullPath = path.join(dir, file);
    let html = fs.readFileSync(fullPath, 'utf8');
    
    // Some files have <!-- 1. Top Header --> then <div class="header-top-bar">...</div> then <header>...</header>
    // Some don't have header-top-bar. We should try to match from either <!-- 1. Top Header -->, <div class="header-top-bar">, or <header>
    // up to </header>.
    
    const regex = /(?:<!--\s*1\.\s*Top Header\s*-->\s*)?(?:<div class="header-top-bar"[\s\S]*?<\/div>\s*)?<header[\s\S]*?<\/header>/ig;
    
    if (regex.test(html)) {
        html = html.replace(regex, unifiedHeader);
        fs.writeFileSync(fullPath, html, 'utf8');
        updatedFiles++;
    }
}
console.log('Successfully updated ' + updatedFiles + ' files.');
