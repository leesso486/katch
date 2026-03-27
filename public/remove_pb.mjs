import fs from 'fs';
import path from 'path';

const file = 'problem_bank.html';
const fullPath = path.join(process.cwd(), file);
if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/<div class="header-top-bar"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
    content = content.replace(/<header[\s\S]*?<\/header>/, '');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Removed top bar from ${file}`);
}
