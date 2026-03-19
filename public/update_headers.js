const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';

const new_header = `    <!-- 1. Top Header -->
    <div class="header-top-bar">
        <div class="container flex-between align-center">
            <div class="target-switch">
                <a href="dashboard_online.html" class="active">학생·학부모</a>
                <a href="problem_bank.html">가맹 원장·강사</a>
            </div>
            <div>
                <a href="http://pf.kakao.com/_sxlwcG" target="_blank" class="mr-15" style="color:inherit; text-decoration:none;"><i class="fas fa-headset"></i> 고객센터 (카톡상담)</a>
                <a href="signup_select.html" style="color:inherit; text-decoration:none;">로그인 / 회원가입</a>
            </div>
        </div>
    </div>
    <header class="bg-white" style="border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 90;">
        <div class="container main-gnb">
            <div class="logo">
                <a href="/" style="text-decoration:none;"><h1>KATCH<span style="color:#E91E63; font-weight:900;">.</span></h1></a>
            </div>
            <nav class="gnb-links">
                <a href="student_diagnostics.html">진단테스트</a>
                <a href="student_diagnostics.html">레벨테스트</a>
                <a href="problem_bank.html">문제은행</a>
                <a href="store_vod.html">VOD 인강</a>
                <a href="store_vod.html">교재 스토어</a>
                <a href="lounge.html" class="text-orange"><i class="fas fa-crown"></i> VIP 라운지</a>
            </nav>
            <div class="header-utils">
                <a href="dashboard_student.html" title="MY 학습 진단" style="color:inherit;"><i class="fas fa-chalkboard-teacher"></i></a>
                <a href="#" style="color:inherit;"><i class="fas fa-bars"></i></a>
            </div>
        </div>
    </header>`;

const excludeFiles = [
    'exam.html', 'omr.html', 'student_take_test.html',
    'teacher_grading.html', 'my_learning.html', 
    'admin_input.html', 'admin_exam_input.html',
    'dashboard_gvr.html', 'report_gvr.html', 'report_premium.html',
    'review_wrong.html'
]; // excluding admin/dashboard/exam specialized pages

fs.readdir(directory, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (file.endsWith('.html') && !excludeFiles.includes(file)) {
            const filepath = path.join(directory, file);
            let content = fs.readFileSync(filepath, 'utf8');
            let newContent = content;

            // Scenario 1: <div class="header-top-bar"> ... </div> <header ...> ... </header>
            newContent = newContent.replace(/<div class="header-top-bar">[\s\S]*?<\/div>\s*<header[\s\S]*?<\/header>/i, new_header);
            
            // Scenario 2: <!-- 1. Top Header --> \n <div class="header-top-bar"> ... </div> <header ...> ... </header>
            // Handled mostly by Scenario 1, but we might have a standalone <header> block.
            
            // Check if it hasn't been replaced yet but contains a <header> right after body.
            if (newContent === content) {
                // Scenario 3: <!-- Header --> \n <header ...> ... </header>
                newContent = newContent.replace(/<!--\s*Header\s*-->\s*<header[\s\S]*?<\/header>/i, new_header);
                
                // Scenario 4: Just <header ...> ... </header> replacing the first occurrence
                if (newContent === content && newContent.match(/<header/i)) {
                    newContent = newContent.replace(/<header[\s\S]*?<\/header>/i, new_header);
                }
            }
            
            // For home_template.html, we also don't want duplicate `<!-- 1. Top Header -->`
            newContent = newContent.replace(/<!-- 1\. Top Header -->\s*<!-- 1\. Top Header -->/g, '<!-- 1. Top Header -->');

            if (content !== newContent) {
                fs.writeFileSync(filepath, newContent, 'utf8');
                console.log('Updated header in ' + file);
            }
        }
    });
});
