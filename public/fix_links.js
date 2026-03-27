const fs = require('fs');
const path = require('path');

const publicDir = __dirname;
const instructorSidebarHtml = `
<!-- Fixed Admin Sidebar for Instructor Navigation -->
<div class="admin-sidebar" style="width:260px; min-width:260px; background:#0f172a; height:calc(100vh - 60px); position:fixed; left:0; top:60px; border-right:1px solid #1e293b; overflow-y:auto; z-index:100;">
    <div style="padding:25px 20px; background:linear-gradient(135deg, rgba(59,130,246,0.1), rgba(15,23,42,0)); border-bottom:1px solid rgba(255,255,255,0.05);">
        <h2 style="font-size:16px; font-weight:800; color:#fff; margin:0 0 5px 0;">이은혜 강사님</h2>
        <p style="font-size:12px; color:#94a3b8; margin:0;">고등관 전임 / KATCH 관리자</p>
    </div>
    
    <nav class="as-nav" style="padding: 20px 15px;">
        <div class="as-nav-title" style="font-size:11px; font-weight:800; color:#64748b; margin:0 0 10px 10px; letter-spacing:1px;">HOME</div>
        <a href="teacher_dashboard.html" class="as-nav-item" style="display:flex; align-items:center; gap:12px; padding:12px 15px; background:rgba(59,130,246,0.15); color:#fff; border-radius:10px; font-size:14px; font-weight:700; text-decoration:none; margin-bottom:20px; border:1px solid rgba(59,130,246,0.3);"><i class="fas fa-home" style="width:20px; text-align:center;"></i> 대시보드 홈</a>

        <div class="as-nav-title" style="font-size:11px; font-weight:800; color:#64748b; margin:10px 0 10px 10px; letter-spacing:1px;">학습 관리</div>
        <a href="teacher_grading.html" class="as-nav-item" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none; transition:0.2s;"><i class="fas fa-check-double" style="width:20px; text-align:center;"></i> 서술형 채점 / 피드백</a>
        <a href="admin_gvr_analytics.html" class="as-nav-item" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none; transition:0.2s;"><i class="fas fa-chart-line" style="width:20px; text-align:center;"></i> 주간 GVR 분석</a>
        <a href="teacher_dashboard.html" class="as-nav-item" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none; transition:0.2s;"><i class="fas fa-users-cog" style="width:20px; text-align:center;"></i> 수강생 관리 (조회)</a>
        
        <div class="as-nav-title" style="font-size:11px; font-weight:800; color:#64748b; margin:25px 0 10px 10px; letter-spacing:1px;">콘텐츠 관리</div>
        <a href="admin_input.html" class="as-nav-item" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none; transition:0.2s;"><i class="fas fa-cloud-upload-alt" style="width:20px; text-align:center;"></i> 문항 업로드 (DB)</a>
        <a href="problem_bank.html" class="as-nav-item" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none; transition:0.2s;"><i class="fas fa-layer-group" style="width:20px; text-align:center;"></i> 문제은행 / 시험지 생성</a>
        <a href="#" class="as-nav-item" style="display:flex; align-items:center; gap:12px; padding:10px 15px; color:#cbd5e1; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none; transition:0.2s; opacity:0.6;"><i class="fas fa-book" style="width:20px; text-align:center;"></i> 교재 / 출판</a>
        <style>
            .as-nav-item:hover { background:rgba(255,255,255,0.05); color:#fff; }
        </style>
    </nav>
</div>
`;

// 1. Fix teacher_dashboard.html - inject sidebar
let dashPath = path.join(publicDir, 'teacher_dashboard.html');
if(fs.existsSync(dashPath)) {
    let html = fs.readFileSync(dashPath, 'utf8');
    // if not already injected
    if(!html.includes('admin-sidebar')) {
        // wrap dash-container
        html = html.replace(/<div class="dash-container">/, `<div style="display:flex; width:100%;">\n${instructorSidebarHtml}\n<div class="dash-container" style="flex:1; margin-left:260px; padding:30px;">`);
        html = html.replace('</body>', '</div>\n</body>');
        fs.writeFileSync(dashPath, html, 'utf8');
    }
}

// 2. Fix instructor sidebars replacing dashboard.html?view=teacher with teacher_dashboard.html
const adminFiles = ['teacher_grading.html', 'admin_input.html', 'admin_student_detail.html', 'admin_gvr_analytics.html', 'problem_bank.html'];
adminFiles.forEach(f => {
    let fPath = path.join(publicDir, f);
    if(fs.existsSync(fPath)) {
        let content = fs.readFileSync(fPath, 'utf8');
        content = content.replace(/dashboard\.html\?view=teacher/g, 'teacher_dashboard.html');
        fs.writeFileSync(fPath, content, 'utf8');
    }
});

// 3. Fix student pages referring to problem_bank.html instead of bank.html
const studentFiles = ['dashboard.html', 'my_learning.html', 'store_vod.html', 'bank.html', 'level_test.html', 'index.html'];
studentFiles.forEach(f => {
    let fPath = path.join(publicDir, f);
    if(fs.existsSync(fPath)) {
        let content = fs.readFileSync(fPath, 'utf8');
        // Only replace inside <nav> or specific student linking areas
        content = content.replace(/<a href="problem_bank\.html"/g, '<a href="bank.html"');
        fs.writeFileSync(fPath, content, 'utf8');
    }
});

console.log("All Links Fixed Extensively.");
