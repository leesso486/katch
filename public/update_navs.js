const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';

const gnb_links_replacement = `<nav $1>
                <a href="student_diagnostics.html">진단테스트</a>
                <a href="student_diagnostics.html">레벨테스트</a>
                <a href="problem_bank.html">문제은행</a>
                <a href="store_vod.html">VOD 인강</a>
                <a href="store_vod.html">교재 스토어</a>
                <a href="lounge.html" class="text-orange"><i class="fas fa-crown"></i> VIP 라운지</a>
            </nav>`;

const gnb_ul_replacement = `<nav $1>
                <ul>
                    <li><a href="student_diagnostics.html">진단테스트</a></li>
                    <li><a href="student_diagnostics.html">레벨테스트</a></li>
                    <li><a href="problem_bank.html">문제은행</a></li>
                    <li><a href="store_vod.html">VOD 인강</a></li>
                    <li><a href="store_vod.html">교재 스토어</a></li>
                    <li><a href="lounge.html" class="text-orange"><i class="fas fa-crown"></i> VIP 라운지</a></li>
                </ul>
            </nav>`;

const quick_menu_replacement = `<div class="quick-grid" style="grid-template-columns: repeat(8, 1fr);">
            <a href="student_diagnostics.html" class="q-item">
                <div class="q-icon"><i class="fas fa-laptop-code"></i></div>
                <div class="q-text">진단테스트</div>
            </a>
            <a href="student_diagnostics.html" class="q-item">
                <div class="q-icon" style="background:#e3f2fd; color:#1e88e5;"><i class="fas fa-file-alt"></i></div>
                <div class="q-text">레벨테스트</div>
            </a>
            <a href="problem_bank.html" class="q-item">
                <div class="q-icon" style="background:#fce4ec; color:#e91e63;"><i class="fas fa-fire"></i></div>
                <div class="q-text">문제은행</div>
            </a>
            <a href="store_vod.html" class="q-item">
                <div class="q-icon"><i class="fas fa-video"></i></div>
                <div class="q-text">VOD 인강</div>
            </a>
            <a href="store_vod.html" class="q-item">
                <div class="q-icon" style="background:#f3e5f5; color:#8e24aa;"><i class="fas fa-book"></i></div>
                <div class="q-text">교재 스토어</div>
            </a>
            <a href="lounge.html" class="q-item">
                <div class="q-icon" style="background:#fff3e0; color:#f57c00;"><i class="fas fa-comments"></i></div>
                <div class="q-text">입시 컨설팅</div>
            </a>
            <a href="lounge.html" class="q-item">
                <div class="q-icon" style="background:#fff8e1; color:#ffb300;"><i class="fas fa-crown"></i></div>
                <div class="q-text">VIP 라운지</div>
            </a>
            <a href="#" class="q-item">
                <div class="q-icon" style="background:#e8f5e9; color:#4caf50;"><i class="fas fa-handshake"></i></div>
                <div class="q-text">가맹·B2B문의</div>
            </a>
        </div>`;

const excludeFiles = [
    'exam.html', 'omr.html', 'student_take_test.html',
    'teacher_grading.html', 'my_learning.html'
];

fs.readdir(directory, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (file.endsWith('.html') && !excludeFiles.includes(file)) {
            const filepath = path.join(directory, file);
            let content = fs.readFileSync(filepath, 'utf8');
            let newContent = content;

            // Replace gnb-links
            newContent = newContent.replace(/<nav\s+(class="gnb-links"[^>]*)>[\s\S]*?<\/nav>/g, gnb_links_replacement);
            
            // Replace gnb hide-mobile ul
            newContent = newContent.replace(/<nav\s+(class="gnb\s+hide-mobile"[^>]*)>\s*<ul>[\s\S]*?<\/ul>\s*<\/nav>/g, gnb_ul_replacement);

            // Replace quick menu
            newContent = newContent.replace(/<div\s+class="quick-grid"[^>]*>[\s\S]*?<\/div>\s*<\/div>/g, quick_menu_replacement + '\n    </div>');

            if (content !== newContent) {
                fs.writeFileSync(filepath, newContent, 'utf8');
                console.log('Updated ' + file);
            }
        }
    });
});
