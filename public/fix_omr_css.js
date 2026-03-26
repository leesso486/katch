const fs = require('fs');
let html = fs.readFileSync('omr.html', 'utf8');

const missingCSS = `
.hdr{display:flex;align-items:center;gap:10px}
.fc{background:#fff3e0;color:var(--or);border:none;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:5px}
.tmr{background:linear-gradient(135deg,var(--nv),#3949AB);color:#fff;border:none;padding:7px 16px;border-radius:25px;font-weight:900;font-size:15px;font-family:monospace;display:flex;align-items:center;gap:7px}
.tmr.w{background:linear-gradient(135deg,#e53935,#c62828);animation:bl 1s infinite}
@keyframes bl{0%,100%{opacity:1}50%{opacity:.7}}
.bhs{background:var(--nv);color:#fff;border:none;padding:8px 20px;border-radius:20px;font-weight:900;font-size:14px}
.tabs{background:#f0f2f7;padding:15px 0;display:flex;justify-content:center;gap:15px; margin:0;}
.tt{padding:12px 35px;font-size:15px;font-weight:800;border:1px solid #ddd;border-radius:30px;background:#fff;color:#888;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 5px rgba(0,0,0,0.02)}
.tt.on{color:#fff;background:var(--nv);border-color:var(--nv);box-shadow:0 6px 15px rgba(26,35,126,0.25)}
.tbg{display:inline-block;font-size:11px;padding:2px 8px;border-radius:4px;margin-left:7px;font-weight:900}
.tgvr{background:#e3f2fd;color:#0d47a1}.tmt{background:#fce4ec;color:#880e4f}.tsc{background:#e8eaf6;color:#1a237e}
.ib{background:linear-gradient(135deg,#0d1b5e,var(--nv) 60%,#3949AB);color:#fff;padding:16px 24px}
.ii{max-width:1220px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.itl{font-size:19px;font-weight:900;margin-bottom:3px}
`;

html = html.replace('.logo{font-weight:900;font-size:20px;color:var(--nv)}.logo span{color:var(--pk)}', '.logo{font-weight:900;font-size:20px;color:var(--nv)}.logo span{color:var(--pk)}' + missingCSS);

fs.writeFileSync('omr.html', html, 'utf8');
console.log('Restored OMR CSS classes');
