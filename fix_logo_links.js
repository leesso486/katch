const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\SsoHot\\Desktop\\수능사이트시안\\katch-web\\public';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('href="/"')) {
    content = content.replace(/href="\/"/g, 'href="index.html"');
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log(`Fixed href="/" in ${file}`);
  }
}
console.log(`Updated ${count} files.`);
