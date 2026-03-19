const fs = require('fs');
const glob = require('glob');

const old_footer = "<strong>(주)KNS에듀</strong> | 대표: 신동원 | 사업자등록번호: 123-45-67890 | 대치동 학원가로 123 KNS빌딩";
const new_footer_html = `<strong>주식회사 케이엔에스북스</strong><br>
서울특별시 강남구 역삼로78길 21, 칼텍빌딩 3층(대치동)<br>
대표이사 김치삼 | 사업자번호 777-81-03746 | denglemaster@gmail.com`;

// Fallback to simple directory reading if glob is not installed
const files = fs.readdirSync('./').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    if (content.includes(old_footer)) {
        content = content.replace(old_footer, new_footer_html);
    }
    
    // Update global GNB navigation text
    content = content.replace(/>나의 강의실<\/a>/g, ">MY 학습진단</a>");
    content = content.replace(/> 나의 강의실<\/a>/g, "> MY 학습진단</a>");
    content = content.replace(/>나의 강의실 <\/a>/g, ">MY 학습진단 </a>");
    
    fs.writeFileSync(file, content, 'utf-8');
});

console.log(`Processed ${files.length} files.`);
