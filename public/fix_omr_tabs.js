const fs = require('fs');
let html = fs.readFileSync('omr.html', 'utf8');

// Fix tabs CSS
html = html.replace(
    '.tabs{background:#fff;border-bottom:2px solid #e0e4e8;display:flex;justify-content:center}\r\n.tt{padding:13px 42px;font-size:15px;font-weight:800;border:none;background:none;color:#aaa;border-bottom:3px solid transparent;cursor:pointer}\r\n.tt.on{color:var(--nv);border-bottom-color:var(--nv);background:#f8f9ff}',
    '.tabs{background:#f0f2f7;padding:15px 0;display:flex;justify-content:center;gap:15px}\n.tt{padding:12px 35px;font-size:15px;font-weight:800;border:1px solid #ddd;border-radius:30px;background:#fff;color:#888;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 5px rgba(0,0,0,0.02)}\n.tt.on{color:#fff;background:var(--nv);border-color:var(--nv);box-shadow:0 6px 15px rgba(26,35,126,0.25)}'
);

// Fallback if \r\n wasn't the issue
html = html.replace(
    '.tabs{background:#fff;border-bottom:2px solid #e0e4e8;display:flex;justify-content:center}\n.tt{padding:13px 42px;font-size:15px;font-weight:800;border:none;background:none;color:#aaa;border-bottom:3px solid transparent;cursor:pointer}\n.tt.on{color:var(--nv);border-bottom-color:var(--nv);background:#f8f9ff}',
    '.tabs{background:#f0f2f7;padding:15px 0;display:flex;justify-content:center;gap:15px}\n.tt{padding:12px 35px;font-size:15px;font-weight:800;border:1px solid #ddd;border-radius:30px;background:#fff;color:#888;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 5px rgba(0,0,0,0.02)}\n.tt.on{color:#fff;background:var(--nv);border-color:var(--nv);box-shadow:0 6px 15px rgba(26,35,126,0.25)}'
);

// Update HTML labels just in case they are hardcoded
html = html.replace('<button class="tt"    id="tab-MT"  onclick="SW(\'MT\')">미니테스트</button>\r\n<button class="tt"    id="tab-SC"  onclick="SW(\'SC\')">SC</button>', '<button class="tt"    id="tab-MT"  onclick="SW(\'MT\')">Mini Test</button>\n<button class="tt"    id="tab-SC"  onclick="SW(\'SC\')">Sentence Completion</button>');
html = html.replace('<button class="tt"    id="tab-MT"  onclick="SW(\'MT\')">미니테스트</button>\n<button class="tt"    id="tab-SC"  onclick="SW(\'SC\')">SC</button>', '<button class="tt"    id="tab-MT"  onclick="SW(\'MT\')">Mini Test</button>\n<button class="tt"    id="tab-SC"  onclick="SW(\'SC\')">Sentence Completion</button>');


fs.writeFileSync('omr.html', html, 'utf8');
console.log('Fixed tabs css');
