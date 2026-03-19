const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Safe replacement preserving UTF-8
  content = content.replace(/href="index\.html"/g, 'href="/"');
  content = content.replace(/href='index\.html'/g, "href='/'");
  
  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Successfully fixed links without breaking encoding!');
