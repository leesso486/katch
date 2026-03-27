import fs from 'fs';

let html = fs.readFileSync('my_learning.html', 'utf8');

let start = html.indexOf('id="panel-studentMgmt"');
if (start !== -1) {
    let end = html.indexOf('</main>', start);
    let slice = html.substring(start, end);
    
    // Replace links in the student management panel
    slice = slice.replace(/href="dashboard_online\.html"/g, 'href="admin_student_detail.html#tab-diag"');
    slice = slice.replace(/href="dashboard\.html"/g, 'href="admin_student_detail.html#tab-diag"');
    slice = slice.replace(/href="level_test\.html"/g, 'href="admin_student_detail.html#tab-level"');
    slice = slice.replace(/href="#" onclick="showPanel\('homework', '숙제 현황', null\); return false;"/g, 'href="admin_student_detail.html#tab-gvr"');
    
    html = html.substring(0, start) + slice + html.substring(end);
    fs.writeFileSync('my_learning.html', html, 'utf8');
    console.log("Updated my_learning.html");

    // Let's also sync fix_student_mgmt.js just in case
    if (fs.existsSync('fix_student_mgmt.js')) {
        let sc = fs.readFileSync('fix_student_mgmt.js', 'utf8');
        sc = sc.replace(/href="dashboard_online\.html"/g, 'href="admin_student_detail.html#tab-diag"');
        sc = sc.replace(/href="dashboard\.html"/g, 'href="admin_student_detail.html#tab-diag"');
        sc = sc.replace(/href="level_test\.html"/g, 'href="admin_student_detail.html#tab-level"');
        sc = sc.replace(/href="#" onclick="showPanel\('homework', '숙제 현황', null\); return false;"/g, 'href="admin_student_detail.html#tab-gvr"');
        fs.writeFileSync('fix_student_mgmt.js', sc, 'utf8');
        console.log("Updated fix_student_mgmt.js");
    }
}

let detail = fs.readFileSync('admin_student_detail.html', 'utf8');
if (!detail.includes('window.location.hash')) {
    const toReplace = `            tabs.forEach(tab => {
                tab.addEventListener('click', () => {`;
                
    const replacement = `            // Handle anchor hash for direct tab linking
            if (window.location.hash) {
                const hash = window.location.hash.substring(1);
                setTimeout(() => {
                    const targetTab = document.querySelector(\`.inner-tab[data-target='\${hash}']\`);
                    if (targetTab) targetTab.click();
                }, 50);
            }

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {`;
                
    if (detail.includes(toReplace)) {
        detail = detail.replace(toReplace, replacement);
        fs.writeFileSync('admin_student_detail.html', detail, 'utf8');
        console.log("Updated admin_student_detail.html");
    } else {
        console.log("admin_student_detail.html JS pattern not found!");
    }
}
