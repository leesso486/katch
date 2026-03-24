const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\SsoHot\\Desktop\\수능사이트시안\\katch-web\\public';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('href="/"')) {
    content = content.replace(/href="\/"/g, 'href="index.html"');
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
  }
});
console.log(`Updated ${count} files.`);

// Copy image
const srcImage = 'C:\\Users\\SsoHot\\.gemini\\antigravity\\brain\\d89e3d2f-809d-4285-af40-750edc3ff2b4\\mbti_intuitive_native_1774000725621.png';
const destImage = path.join(dir, 'mbti_avatar.png');
fs.copyFileSync(srcImage, destImage);
console.log('Image copied.');
