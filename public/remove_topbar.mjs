import fs from 'fs';
import path from 'path';

const files = [
    'admin_input.html',
    'admin_exam_input.html',
    'admin_report_template.html',
    'admin_student_detail.html',
    'teacher_grading.html',
    'points.html'
];

files.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
        console.log(`Skipping ${file} - not found`);
        return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Removing top bar block: <div class="header-top-bar"> ... </div>
    // Note: since it has nested divs, standard regex might fail. But we know it's followed by <header...
    
    content = content.replace(/<div class="header-top-bar"[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>\s*<\/div>/g, '');
    
    // Actually, simpler way: match from <div class="header-top-bar" to </header>
    content = content.replace(/<!-- Admin Top Bar -->[\s\S]*?<\/header>/g, '');
    content = content.replace(/<!-- 1\. Top Header -->[\s\S]*?<\/header>/g, '');
    content = content.replace(/<div class="header-top-bar"[\s\S]*?<\/header>/g, '');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Removed top bar from ${file}`);
});
