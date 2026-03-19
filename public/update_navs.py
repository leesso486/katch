import os
import re

directory = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public'

# The two replacement blocks for the Top Navigation
gnb_links_replacement = r'''<nav \1>
                <a href="student_diagnostics.html">진단테스트</a>
                <a href="student_diagnostics.html">레벨테스트</a>
                <a href="problem_bank.html">문제은행</a>
                <a href="store_vod.html">VOD 인강</a>
                <a href="store_vod.html">교재 스토어</a>
                <a href="lounge.html" class="text-orange"><i class="fas fa-crown"></i> VIP 라운지</a>
            </nav>'''

gnb_ul_replacement = r'''<nav \1>
                <ul>
                    <li><a href="student_diagnostics.html">진단테스트</a></li>
                    <li><a href="student_diagnostics.html">레벨테스트</a></li>
                    <li><a href="problem_bank.html">문제은행</a></li>
                    <li><a href="store_vod.html">VOD 인강</a></li>
                    <li><a href="store_vod.html">교재 스토어</a></li>
                    <li><a href="lounge.html" class="text-orange"><i class="fas fa-crown"></i> VIP 라운지</a></li>
                </ul>
            </nav>'''

# The Quick Menu replacement (only in home_template.html usually, but replacing if found)
quick_menu_replacement = r'''<div class="quick-grid" style="grid-template-columns: repeat(8, 1fr);">
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
        </div>'''

exclude_files = [
    'exam.html', 'omr.html', 'student_take_test.html',
    'teacher_grading.html', 'my_learning.html'
]

for filename in os.listdir(directory):
    if filename.endswith(".html") and filename not in exclude_files:
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content = content
        
        # Replace <nav class="gnb-links"...>...</nav>
        new_content = re.sub(
            r'<nav (class="gnb-links"[^>]*)>.*?</nav>',
            gnb_links_replacement,
            new_content,
            flags=re.DOTALL
        )

        # Replace <nav class="gnb hide-mobile"...><ul>...</ul></nav>
        new_content = re.sub(
            r'<nav (class="gnb[ ]+hide-mobile"[^>]*)>\s*<ul>.*?</ul>\s*</nav>',
            gnb_ul_replacement,
            new_content,
            flags=re.DOTALL
        )
        
        # Replace Quick Menu Grid
        new_content = re.sub(
            r'<div class="quick-grid".*?>.*?</div>\s*</div>',
            quick_menu_replacement + '\n    </div>',
            new_content,
            flags=re.DOTALL
        )

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
