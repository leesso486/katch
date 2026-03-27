import fs from 'fs';
import path from 'path';

const dir = 'c:\\\\Users\\\\SsoHot\\\\Desktop\\\\수능사이트시안\\\\katch-web\\\\public';
const filesToUpdate = [
    'admin_input.html',
    'admin_exam_input.html',
    'admin_report_template.html',
    'admin_student_detail.html'
];

function getSidebarHtml(activeId) {
    return `        <aside class="admin-sidebar" style="background: white; border-right: 1px solid #e8eaf0; display: flex; flex-direction: column; overflow-y: auto;">
            <!-- User Card -->
            <div class="sidebar-user-card" style="padding: 20px; background: linear-gradient(135deg, #111, #1e2d5a); color: white; position: relative; overflow: hidden; flex-shrink: 0;">
                <div style="content: ''; position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(233,30,99,0.2); border-radius: 50%;"></div>
                <div class="suc-avatar" style="width: 48px; height: 48px; background: #1976d2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 20px; margin-bottom: 10px; border: 2px solid rgba(255,255,255,0.3);">강</div>
                <div class="suc-name" style="font-size: 16px; font-weight: 800; margin-bottom: 3px;">이은혜 강사</div>
                <div class="suc-role" style="font-size: 12px; opacity: 0.7;"><i class="fas fa-chalkboard-teacher"></i> KNS 대치본원 · 담당강사</div>
                <div class="suc-pts" style="margin-top: 12px; font-size: 12px; color:#aaf;">관리자 권한 부여됨</div>
            </div>

            <!-- Teacher Nav -->
            <nav class="sidebar-nav" style="flex: 1; padding: 10px 0;">
                <div class="nav-section-label" style="padding: 15px 20px 5px; font-size: 11px; font-weight: 700; color: #aaa; letter-spacing: 1px; text-transform: uppercase;">강사 관리</div>
                <a class="nav-item ${activeId === 'dashboard' ? 'active' : ''}" href="dashboard.html?view=teacher" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; cursor: pointer; transition: 0.2s; color: #555; font-size: 14px; font-weight: 600; text-decoration: none; border-left: 3px solid transparent;">
                    <div class="nav-icon" style="width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; background: #f0f2f5; color: #666;"><i class="fas fa-tachometer-alt"></i></div>
                    강사 대시보드
                </a>
                <a class="nav-item ${activeId === 'student' ? 'active' : ''}" href="my_learning.html?view=teacher" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; cursor: pointer; transition: 0.2s; color: #555; font-size: 14px; font-weight: 600; text-decoration: none; border-left: 3px solid transparent;">
                    <div class="nav-icon" style="width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; background: #f0f2f5; color: #666;"><i class="fas fa-users"></i></div>
                    학생 관리
                    <span class="nav-badge" style="margin-left: auto; background: #E91E63; color: white; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 10px;">24</span>
                </a>
                
                <div class="nav-section-label" style="padding: 15px 20px 5px; font-size: 11px; font-weight: 700; color: #aaa; letter-spacing: 1px; text-transform: uppercase;">콘텐츠 통합관리</div>
                <a class="nav-item ${activeId === 'input' ? 'active' : ''}" href="admin_input.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; cursor: pointer; transition: 0.2s; color: #555; font-size: 14px; font-weight: 600; text-decoration: none; border-left: 3px solid transparent;">
                    <div class="nav-icon" style="width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; background: #f0f2f5; color: #666;"><i class="fas fa-database"></i></div>
                    통합 문제입력기
                </a>
                
                <div class="nav-section-label" style="padding: 15px 20px 5px; font-size: 11px; font-weight: 700; color: #aaa; letter-spacing: 1px; text-transform: uppercase;">성적 관리</div>
                <a class="nav-item ${activeId === 'report' ? 'active' : ''}" href="admin_report_template.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; cursor: pointer; transition: 0.2s; color: #555; font-size: 14px; font-weight: 600; text-decoration: none; border-left: 3px solid transparent;">
                    <div class="nav-icon" style="width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; background: #f0f2f5; color: #666;"><i class="fas fa-file-invoice"></i></div>
                    성적표 관리
                </a>
                <a class="nav-item ${activeId === 'grading' ? 'active' : ''}" href="teacher_grading.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; cursor: pointer; transition: 0.2s; color: #555; font-size: 14px; font-weight: 600; text-decoration: none; border-left: 3px solid transparent;">
                    <div class="nav-icon" style="width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; background: #f0f2f5; color: #666;"><i class="fas fa-pen-nib"></i></div>
                    채점 관리
                </a>
                
                <div class="nav-section-label" style="padding: 15px 20px 5px; font-size: 11px; font-weight: 700; color: #aaa; letter-spacing: 1px; text-transform: uppercase;">운영</div>
                <a class="nav-item ${activeId === 'points' ? 'active' : ''}" href="points.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; cursor: pointer; transition: 0.2s; color: #555; font-size: 14px; font-weight: 600; text-decoration: none; border-left: 3px solid transparent;">
                    <div class="nav-icon" style="width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; background: #f0f2f5; color: #666;"><i class="fas fa-coins"></i></div>
                    포인트/결제 관리
                </a>
            </nav>
            <style>
                aside.admin-sidebar .nav-item:hover { background: #f5f7ff; color: #111 !important; }
                aside.admin-sidebar .nav-item.active { background: #eef2ff !important; color: #111 !important; border-left-color: #111 !important; font-weight: 800 !important; }
                aside.admin-sidebar .nav-item.active .nav-icon { background: #111 !important; color: white !important; }
            </style>
        </aside>`;
}

for (const file of filesToUpdate) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;

    let html = fs.readFileSync(filePath, 'utf8');

    let activeId = '';
    if (file === 'admin_input.html' || file === 'admin_exam_input.html') activeId = 'input';
    else if(file === 'admin_report_template.html') activeId = 'report';
    else if(file === 'admin_student_detail.html') activeId = 'student';

    const newSidebar = getSidebarHtml(activeId);

    const startIndex = html.indexOf('<aside class="admin-sidebar"');
    if (startIndex !== -1) {
        const endIndex = html.indexOf('</aside>', startIndex);
        if (endIndex !== -1) {
            html = html.substring(0, startIndex) + newSidebar + html.substring(endIndex + 8);
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Updated sidebar in ${file}`);
        }
    }
}
