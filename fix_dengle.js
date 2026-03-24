const fs = require('fs');
const path = require('path');
const dir = path.join('C:', 'Users', 'SsoHot', 'Desktop', '댕글', 'public');

if (!fs.existsSync(dir)) {
    console.error("Directory not found:", dir);
    process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let updatedLogos = 0;
let updatedNavs = 0;

// 1. Create store_book.html if it doesn't exist by copying store_vod.html
const vodPath = path.join(dir, 'store_vod.html');
const bookPath = path.join(dir, 'store_book.html');
if (fs.existsSync(vodPath) && !fs.existsSync(bookPath)) {
    let vodContent = fs.readFileSync(vodPath, 'utf8');
    // Basic update for the book store title
    vodContent = vodContent.replace(/<title>.*?<\/title>/, '<title>KATCH 교재 스토어</title>');
    fs.writeFileSync(bookPath, vodContent, 'utf8');
    console.log('Created store_book.html');
    files.push('store_book.html'); // add to files list to process
}

// 2. Fix logos and nav links in all files
files.forEach(file => {
    let filePath = path.join(dir, file);
    if(fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        // Fix logic for logos
        const p0 = /href="\/"/g;
        if (p0.test(content) && content.includes('KATCH')) {
           content = content.replace(/href="\/"/g, 'href="index.html"');
           changed = true;
        }

        const p1 = /<a href="[^"]*" class="logo">KATCH/g;
        if (p1.test(content)) {
            content = content.replace(/<a href="[^"]*" class="logo">KATCH/g, '<a href="index.html" class="logo">KATCH');
            changed = true;
        }

        const p2 = /<div class="ml-logo"><a href="[^"]*">KATCH/g;
        if (p2.test(content)) {
            content = content.replace(/<div class="ml-logo"><a href="[^"]*">KATCH/g, '<div class="ml-logo"><a href="index.html">KATCH');
            changed = true;
        }

        const p3 = /<a href="[^"]*"><h1>KATCH<span/g;
        if (p3.test(content) && !content.includes('<a href="index.html"><h1>KATCH<span')) {
            content = content.replace(/<a href="[^"]*"><h1>KATCH<span/g, '<a href="index.html"><h1>KATCH<span');
            changed = true;
        }

        const p4 = /<a href="[^"]*"([^>]*)><h1([^>]*)>KATCH/g;
        if (p4.test(content)) {
            content = content.replace(/<a href="[^"]*"([^>]*)><h1([^>]*)>KATCH/g, '<a href="index.html"$1><h1$2>KATCH');
            changed = true;
        }

        // 3. Fix 교재 스토어 navigation links
        // We know standard headers have: <a href="store_vod.html">교재 스토어</a>
        // Let's replace ONLY the one that says 교재 스토어
        const navRegex = /<a href="store_vod\.html"([^>]*)>교재 스토어<\/a>/g;
        if (navRegex.test(content)) {
            content = content.replace(navRegex, '<a href="store_book.html"$1>교재 스토어</a>');
            changed = true;
        }
        
        // General text replace if they are in same line
        if(content.includes('"store_vod.html">교재 스토어</a>')) {
            content = content.replace(/"store_vod\.html">교재 스토어<\/a>/g, '"store_book.html">교재 스토어</a>');
            changed = true;
        }

        if(changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            updatedLogos++;
        }
    }
});

console.log(`Updated files: ${updatedLogos}`);
