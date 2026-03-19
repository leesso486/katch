const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';

fs.readdir(directory, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const filepath = path.join(directory, file);
            let content = fs.readFileSync(filepath, 'utf8');
            let newContent = content;

            // 1. Bypass dashboard_student.html
            newContent = newContent.replace(/dashboard_student\.html/g, 'my_learning.html');

            // 2. MT/SC Renaming
            newContent = newContent.replace(/MT\s*모의고사/g, '미니테스트');
            newContent = newContent.replace(/SC\s*모의고사/g, 'Sentence Completion');

            if (content !== newContent) {
                fs.writeFileSync(filepath, newContent, 'utf8');
                console.log('Updated texts in ' + file);
            }
        }
    });
});
