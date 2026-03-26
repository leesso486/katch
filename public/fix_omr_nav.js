const fs = require('fs');
let html = fs.readFileSync('omr.html', 'utf8');

// 1. Fix Tab Labels
html = html.replace('<button class="tt on" id="tab-GVR" onclick="SW(\'GVR\')">GVR 과제</button>', '<button class="tt on" id="tab-GVR" onclick="SW(\'GVR\')">GVR</button>');
html = html.replace('<button class="tt"    id="tab-SC"  onclick="SW(\'SC\')">Sentence Completion</button>', '<button class="tt"    id="tab-SC"  onclick="SW(\'SC\')">SC</button>');

// 2. Add Scroll to .mmap
html = html.replace('.mmap{display:grid;grid-template-columns:repeat(6,1fr);gap:4px}', '.mmap{display:grid;grid-template-columns:repeat(6,1fr);gap:4px; max-height:calc(100vh - 420px); overflow-y:auto; padding-right:4px}\n.mmap::-webkit-scrollbar{width:4px}\n.mmap::-webkit-scrollbar-thumb{background:#ccc;border-radius:4px}');

fs.writeFileSync('omr.html', html, 'utf8');
console.log('Fixed OMR navigator and tabs');
