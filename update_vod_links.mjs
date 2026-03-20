import fs from 'fs';
import path from 'path';

const dir = 'public';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;
for (const file of files) {
    const filepath = path.join(dir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    const orig = content;

    // Replace <a href="store_vod.html">VOD 인강</a>
    content = content.replace(/"store_vod\.html"\s*>VOD 인강/g, '"vod_class.html">VOD 인강');
    // Replace <a href="store_vod.html" class="active">VOD 인강</a>
    content = content.replace(/"store_vod\.html"\s+class="active">VOD 인강/g, '"vod_class.html" class="active">VOD 인강');

    if (content !== orig) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Updated link in ${file}`);
        updated++;
    }
}

console.log(`Done. Updated ${updated} files.`);
