import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';

// ==========================================
// 1. Fix Level Test - Remove bulky image & slim the application section
// ==========================================
const levelTestPath = path.join(PUBLIC_DIR, 'level_test.html');
if (fs.existsSync(levelTestPath)) {
    let ht = fs.readFileSync(levelTestPath, 'utf8');

    // Remove the huge background image block and make it minimal
    // Typically the prog-card has an image part <div class="prog-img"> and a text part.
    // Let's replace the whole prog-card CSS and the HTML structure dynamically if possible, 
    // or just nuke the prog-img class.
    
    // Replace the huge image style
    ht = ht.replace(/<div class="prog-img" style="background-image: url\('[^']+'\);">\s*<'?h3'?>.*?(<span[^>]*>.*?<\/span>)?\s*<\/h3>\s*<\/div>/gi, '');
    ht = ht.replace(/<div class="prog-img" style="[^"]*">.*?<\/div>/gis, '');
    
    // Make prog-card minimal in CSS
    const newProgCardCss = `
        .prog-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 10px 30px rgba(0,0,0,0.02); display: flex; flex-direction: column; padding: 30px; margin-bottom: 20px; transition: 0.3s; }
        .prog-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(212,175,55,0.1); border-color: rgba(212,175,55,0.3); }
        .prog-header { font-size: 22px; font-weight: 900; color: #111; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; }
        .prog-badge { background: rgba(212,175,55,0.1); color: #B8860B; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; }
        .prog-desc { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 20px; }
        .prog-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; background: #fdfbfb; padding: 15px; border-radius: 12px; }
        .pi-item { font-size: 13px; color: #555; display: flex; align-items: center; gap: 8px; }
        .pi-item i { color: #B8860B; width: 16px; text-align: center; }
        .btn-prog { background: #111; color: #fff; padding: 14px; text-align: center; border-radius: 8px; font-weight: 800; font-size: 14px; cursor: pointer; border: none; transition: 0.3s; width: 100%; }
        .btn-prog:hover { background: #B8860B; }
    `;

    // Try to replace the old .prog-card CSS (if it matches loosely)
    ht = ht.replace(/\.prog-card \{.*?\}/s, newProgCardCss); // Very basic regex, might not catch all if nested, but we will just append it to style.
    
    // Safest: Append to <style> to override
    if (ht.indexOf('</style>') !== -1) {
        ht = ht.replace('</style>', newProgCardCss + '\n</style>');
    }

    // Change "KATCH ELITE REGULAR" to just "KATCH 정규반 입학 레벨테스트"
    ht = ht.replace(/KATCH ELITE REGULAR/g, 'KATCH 정규반 입학 레벨테스트');
    ht = ht.replace(/KATCH 마스터 클래스 신입생 선발/g, '최상위권 마스터 클래스 선발고사');

    // Fix header text color if it was white on white
    ht = ht.replace(/<nav class="gnb-links"[^>]*>.*?<\/nav>/s, (match) => {
        return match.replace(/color:\s*#(fff|ffffff|FFF)/g, 'color: #333');
    });

    fs.writeFileSync(levelTestPath, ht, 'utf8');
}

// ==========================================
// 2. Fix Student Diagnostics - Dynamic Aurora Space Theme & Header Visibility
// ==========================================
const diagPath = path.join(PUBLIC_DIR, 'student_diagnostics.html');
if (fs.existsSync(diagPath)) {
    let ht = fs.readFileSync(diagPath, 'utf8');

    // The header text is white on white background. Fix to #333
    // Find the inline nav links style and change color to #333
    const headerRegex = /<header style="background:white;[^>]*>.*?<\/header>/s;
    ht = ht.replace(headerRegex, (match) => {
        let fixed = match.replace(/color:\s*#fff;/g, 'color: #333;');
        fixed = fixed.replace(/color:\s*#(ffffff|FFF);/ig, 'color: #333;');
        return fixed;
    });

    // Make the exam cards more visible and aurora-like
    const auroraCss = `
        /* AURORA OVERRIDES */
        .exam-card { background: rgba(15,8,30,0.85); border: 1px solid rgba(138,43,226,0.3); box-shadow: 0 15px 35px rgba(0,0,0,0.6), inset 0 0 20px rgba(138,43,226,0.1); backdrop-filter: blur(15px); }
        .exam-card:hover { border-color: rgba(0,255,255,0.5); box-shadow: 0 20px 50px rgba(0,255,255,0.2), inset 0 0 30px rgba(138,43,226,0.2); }
        .ec-title { color: #fff; text-shadow: 0 2px 10px rgba(255,255,255,0.2); font-size: 26px; }
        .ec-slogan { color: #d8b4fe; font-weight: 700; }
        .ec-info-list .label { color: #a5f3fc; }
        .ec-info-list .val { color: #fff; }
        .btn-exam.primary { background: linear-gradient(135deg, #9333ea, #4f46e5); box-shadow: 0 0 20px rgba(147,51,234,0.4); text-shadow: 0 1px 2px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); }
        .btn-exam.primary:hover { background: linear-gradient(135deg, #a855f7, #6366f1); box-shadow: 0 0 30px rgba(147,51,234,0.6); }
        .btn-exam.secondary { background: rgba(0,255,255,0.15); color: #fff; border: 1px solid rgba(0,255,255,0.4); text-shadow: 0 0 10px rgba(0,255,255,0.5); }
        .btn-exam.secondary:hover { background: rgba(0,255,255,0.3); box-shadow: 0 0 20px rgba(0,255,255,0.3); }
        
        /* Ensure step text is visible */
        .proc-text strong { color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.8); }
        .proc-text span { color: #d8b4fe; font-weight: 600; }
    `;
    
    if (ht.indexOf('</style>') !== -1) {
        ht = ht.replace('</style>', auroraCss + '\n</style>');
    }

    fs.writeFileSync(diagPath, ht, 'utf8');
}

// ==========================================
// 3. Fix Lounge - Text Colors & Cringey Wording
// ==========================================
const loungePath = path.join(PUBLIC_DIR, 'lounge.html');
if (fs.existsSync(loungePath)) {
    let ht = fs.readFileSync(loungePath, 'utf8');

    // Fix header text visibility recursively
    const headerRegex = /<header style="background:white;[^>]*>.*?<\/header>/s;
    ht = ht.replace(headerRegex, (match) => {
        let fixed = match.replace(/color:\s*#fff;/g, 'color: #333;');
        fixed = fixed.replace(/color:\s*#(ffffff|FFF);/ig, 'color: #333;');
        return fixed;
    });

    // Wording fixes
    ht = ht.replace(/The Masterpiece of College Admission/g, 'KATCH 최상위 입시 로드맵');
    ht = ht.replace(/PLATINUM & DIAMOND MEMBERS ONLY/g, '프리미엄 멤버십 전용관');
    ht = ht.replace(/오직 라운지 멤버에게만 허락된 시크릿 특강/g, '최상위권을 위한 대치동 현장 LIVE 및 핵심 VOD');
    
    // Make sure badges in Video cards are distinctly readable
    const loungeBadgeCss = `
        /* Enforce badge visibility */
        .mc-img { position: relative; }
        .mc-badge { position: absolute; z-index: 10; top: 15px; left: 15px; background: #fff !important; color: #111 !important; font-weight: 900 !important; border: none !important; box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important; padding: 6px 14px !important; border-radius: 30px !important; }
        /* Add gradient overlays to video thumbs to ensure any text is readable */
        .mc-img.video-thumb::before { background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 50%, rgba(0,0,0,0.8)) !important; }
    `;
    
    if (ht.indexOf('</style>') !== -1) {
        ht = ht.replace('</style>', loungeBadgeCss + '\n</style>');
    }

    // Force inline badge text if it is completely transparent
    ht = ht.replace(/<div class="mc-img video-thumb"[^>]*>/g, '<div class="mc-img video-thumb" style="background: linear-gradient(135deg, #1A237E, #311B92);">');

    fs.writeFileSync(loungePath, ht, 'utf8');
}

console.log('UI feedback fixes applied to Level Test, Diagnostics, and Lounge!');
