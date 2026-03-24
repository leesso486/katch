const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;
files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let changed = false;

    // Pattern 1: <a href="my_learning.html" class="logo">KATCH<span>.</span></a>
    const p1 = /<a href="[^"]*" class="logo">KATCH/g;
    if (p1.test(content)) {
        content = content.replace(/<a href="[^"]*" class="logo">KATCH/g, '<a href="index.html" class="logo">KATCH');
        changed = true;
    }

    // Pattern 2: <div class="ml-logo"><a href="[^"]*">KATCH<span>.</span></a></div>
    const p2 = /<div class="ml-logo"><a href="[^"]*">KATCH/g;
    if (p2.test(content)) {
        content = content.replace(/<div class="ml-logo"><a href="[^"]*">KATCH/g, '<div class="ml-logo"><a href="index.html">KATCH');
        changed = true;
    }

    // Pattern 3: <a href="[^"]*"><h1>KATCH<span/g;
    const p3 = /<a href="[^"]*"><h1>KATCH<span/g;
    if (p3.test(content) && !content.includes('<a href="index.html"><h1>KATCH<span')) {
        content = content.replace(/<a href="[^"]*"><h1>KATCH<span/g, '<a href="index.html"><h1>KATCH<span');
        changed = true;
    }

    // Also any <a href="..."><h1...>KATCH
    const p4 = /<a href="[^"]*"([^>]*)><h1([^>]*)>KATCH/g;
    if (p4.test(content)) {
        content = content.replace(/<a href="[^"]*"([^>]*)><h1([^>]*)>KATCH/g, '<a href="index.html"$1><h1$2>KATCH');
        changed = true;
    }

    if(changed) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated logo link in ${file}`);
        updated++;
    }
});

console.log(`Total files updated: ${updated}`);
