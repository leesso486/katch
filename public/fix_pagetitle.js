const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

// The crash happens here:
// document.getElementById('page-title').textContent = title;

html = html.replace(/document\.getElementById\('page-title'\)\.textContent = title;/g, 
"var pt = document.getElementById('page-title');\n            if(pt) pt.textContent = title;");

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Fixed page-title bug in showPanel');
