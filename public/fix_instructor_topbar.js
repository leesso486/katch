const fs = require('fs');
const path = require('path');

const targetFiles = [
    'teacher_dashboard.html',
    'teacher_grading.html',
    'admin_input.html',
    'admin_student_detail.html',
    'admin_gvr_analytics.html'
];

const teacherTopbar = `
<style>
/* =================== TOP HEADER (TEACHER) =================== */
.ml-topbar {
    height: 60px; background: #111; color: white;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 20px; position: sticky; top: 0; z-index: 999;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}
.ml-topbar-left { display: flex; align-items: center; gap: 15px; }
.hamburger-btn {
    width: 40px; height: 40px; border: none; background: rgba(255,255,255,0.1);
    border-radius: 8px; color: white; font-size: 18px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: 0.2s;
}
.hamburger-btn:hover { background: rgba(255,255,255,0.2); }
.ml-logo { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 22px; letter-spacing: -1px; }
.ml-logo a { color: white; text-decoration: none; }
.ml-logo span { color: #E91E63; }
.ml-page-title { font-size: 15px; font-weight: 700; opacity: 0.7; border-left: 1px solid rgba(255,255,255,0.2); padding-left: 15px; }
.ml-topbar-right { display: flex; align-items: center; gap: 15px; }
.user-info { display: flex; align-items: center; gap: 10px; font-size: 14px; }
.user-avatar { width: 34px; height: 34px; background: #1976d2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color:white; }
.user-pts { background: rgba(255,193,7,0.15); border: 1px solid rgba(255,193,7,0.3); color: #FFD700; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.2s; text-decoration:none; display:flex; gap:6px; align-items:center; }
.user-pts:hover { background: rgba(255,193,7,0.25); }
.role-toggle { display: flex; background: rgba(255,255,255,0.1); border-radius: 20px; padding: 3px; }
.role-btn { padding: 5px 14px; border-radius: 16px; font-size: 12px; font-weight: 700; cursor: pointer; border: none; background: transparent; color: rgba(255,255,255,0.6); transition: 0.2s; }
.role-btn.active { background: white; color: #111; }
</style>
<div class="ml-topbar">
    <div class="ml-topbar-left">
        <button class="hamburger-btn" onclick="location.href='teacher_dashboard.html'">
            <i class="fas fa-home"></i>
        </button>
        <div class="ml-logo"><a href="index.html">KATCH<span>.</span></a></div>
        <div class="ml-page-title">강사 워크스페이스</div>
    </div>
    <div class="ml-topbar-right">
        <div class="role-toggle">
            <button class="role-btn" onclick="location.href='dashboard.html'"><i class="fas fa-user-graduate"></i> 학생</button>
            <button class="role-btn active"><i class="fas fa-chalkboard-teacher"></i> 강사/관리자</button>
        </div>
        <a href="#" class="user-pts"><i class="fas fa-bell"></i> 알림 3</a>
        <div class="user-info">
            <div class="user-avatar">이</div>
            <span style="font-size:14px; font-weight:600;">이은혜 강사</span>
        </div>
    </div>
</div>
`;

targetFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');
    
    // For teacher_grading, admin_input, admin_student_detail
    // We previously removed ANY top bar, so we need to inject it right after <body>
    if (!html.includes('class="ml-topbar"')) {
        html = html.replace('<body>', '<body>\n' + teacherTopbar);
        if(!html.includes('<body>')){ // maybe <body class="...">
           html = html.replace(/<body[^>]*>/, (match) => match + '\n' + teacherTopbar);
        }
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Fixed:', file);
});

// Update dashboard.html to link to teacher_dashboard.html instead of ?view=teacher
let dashHtml = fs.readFileSync(path.join(__dirname, 'dashboard.html'), 'utf8');
dashHtml = dashHtml.replace(/dashboard\.html\?view=teacher/g, 'teacher_dashboard.html');
fs.writeFileSync(path.join(__dirname, 'dashboard.html'), dashHtml, 'utf8');

// Update my_learning.html to link to teacher_dashboard.html
let mlHtml = fs.readFileSync(path.join(__dirname, 'my_learning.html'), 'utf8');
mlHtml = mlHtml.replace(/dashboard\.html\?view=teacher/g, 'teacher_dashboard.html');
fs.writeFileSync(path.join(__dirname, 'my_learning.html'), mlHtml, 'utf8');

// For teacher_dashboard.html specifically, we must hardcode showing the teacherView and hiding the studentView, and removing the old header.
let tdHtml = fs.readFileSync(path.join(__dirname, 'teacher_dashboard.html'), 'utf8');
// Remove old dashboard headers and toolbars and script logic
tdHtml = tdHtml.replace(/<!-- 1\. Top Header -->[\s\S]*?<!-- Role Toggle Bar -->/g, '');
tdHtml = tdHtml.replace(/<div class="view-toggle-area">[\s\S]*?<\/div>[\s\S]*?(?=<div class="dash-container">)/g, '');
// Force teacherView to show and studentView to hide
tdHtml = tdHtml.replace(/#studentView \{ display: block; \}/g, '#studentView { display: none !important; }');
tdHtml = tdHtml.replace(/#teacherView \{ display: none; \}/g, '#teacherView { display: block !important; }');
// Remove ?view=teacher logic from JS
tdHtml = tdHtml.replace(/if \(urlParams\.get\('view'\) === 'teacher'\) \{[\s\S]*?\} else \{[\s\S]*?\}/, "switchView('teacher');");

fs.writeFileSync(path.join(__dirname, 'teacher_dashboard.html'), tdHtml, 'utf8');
console.log('Refactored teacher_dashboard.html');
