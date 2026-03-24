import fs from 'fs';
import path from 'path';

const publicDir = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') || f.endsWith('.css'));

const newGnbHtml = `<nav class="gnb-links">
                <a href="student_diagnostics.html">진단테스트</a>
                <a href="level_test.html">레벨테스트</a>
                <a href="problem_bank.html">문제은행</a>
                <a href="store_vod.html">VOD 인강</a>
                <a href="store_book.html">교재 스토어</a>
                <a href="lounge.html" class="text-orange" style="display:flex; align-items:center; gap:6px;"><i class="fas fa-crown"></i> VIP 라운지</a>
            </nav>`;

let filesModified = 0;

for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    if (file === 'style.css') {
        const cssRegex = /\.gnb-links\s*\{[^}]*\}\s*\.gnb-links\s*a\s*\{[^}]*\}\s*\.gnb-links\s*a:hover\s*\{[^}]*\}/;
        const newCss = `.gnb-links { display: flex; gap: 35px; align-items: center; margin: 0; padding: 0; }\n` +
                       `.gnb-links a { color: #333; font-size: 16px; font-weight: 800; font-family: 'Pretendard', sans-serif; text-decoration: none; transition: 0.2s; }\n` +
                       `.gnb-links a:hover { color: #E91E63; }`;
        
        if (content.match(cssRegex)) {
            content = content.replace(cssRegex, newCss);
        } else {
            // Append if not found (though grep showed it exists)
            content += '\n' + newCss + '\n';
        }
    } else if (file.endsWith('.html')) {
        // Replace html tags
        content = content.replace(/<nav\s+class="gnb-links"[^>]*>[\s\S]*?<\/nav>/g, newGnbHtml);
        
        // Specifically in student_diagnostics.html & index.html, remove embedded conflicting css
        content = content.replace(/\.gnb-links\s*\{[^}]*\}\s*\.gnb-links\s*a\s*\{[^}]*\}\s*\.gnb-links\s*a:hover\s*\{[^}]*\}/g, "");
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        filesModified++;
        console.log(`Updated ${file}`);
    }
}

console.log(`Done. Modified ${filesModified} files.`);
