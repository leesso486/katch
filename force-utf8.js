const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/SsoHot/Desktop/수능사이트시안/댕글';
const destDir = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';

// Remove old index.html just in case to prevent Next.js from serving it
if (fs.existsSync(path.join(destDir, 'index.html'))) {
    fs.unlinkSync(path.join(destDir, 'index.html'));
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const srcPath = path.join(srcDir, file);
  
  // Original files assume UTF-8
  let content = fs.readFileSync(srcPath, 'utf8');
  
  // Safely fix routing 
  content = content.replace(/href="index\.html"/g, 'href="/"');
  content = content.replace(/href='index\.html'/g, "href='/'");
  
  // Rename index.html to home_template.html on the fly
  const destName = file === 'index.html' ? 'home_template.html' : file;
  const destPath = path.join(destDir, destName);
  
  // Hard save with UTF-8
  fs.writeFileSync(destPath, content, 'utf8');
});

console.log('Restoration complete with 100% utf8 preservation.');
