import fs from 'fs';
import path from 'path';

const publicDir = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const replacements = [
    // Directors
    { regex: /KATCH 원장의/g, replace: 'KATCH 김치삼 원장의' },
    { regex: /원장님 총평/g, replace: '김치삼 원장님 총평' },
    { regex: /원장의 총평/g, replace: '김치삼 원장님의 총평' },
    { regex: /원장님의/g, replace: '김치삼 원장님의' },
    { regex: /KATCH 원장/g, replace: 'KATCH 김치삼 원장' },
    { regex: /원장님/g, replace: '김치삼 원장님' },
    
    // Replace "김치삼 원장님" if it got doubled:
    { regex: /김치삼 김치삼 원장님/g, replace: '김치삼 원장님' },
    { regex: /김치삼 김치삼 원장의/g, replace: '김치삼 원장의' },
    { regex: /KATCH 김치삼 김치삼 원장/g, replace: 'KATCH 김치삼 원장' },

    // Instructors
    { regex: /김강사 선생님/g, replace: '송아라 강사님' },
    { regex: /김강사 강사/g, replace: '송아라 강사' },
    { regex: /김강사/g, replace: '송아라 강사' },
    
    // Students
    { regex: /이준호/g, replace: '이소영' },
    { regex: /김유진/g, replace: '이재은' },
    { regex: /박지민/g, replace: '백재형' },
    { regex: /김지원/g, replace: '이은혜' },
    { regex: /송민기/g, replace: '박상영' },
    { regex: /최유라/g, replace: '박하늘' },
    { regex: /홍길동/g, replace: '이주영' }, // just in case
    { regex: /김지훈/g, replace: '박진규' }, // from level_test.html placeholder
];

for (const file of files) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const { regex, replace } of replacements) {
        content = content.replace(regex, replace);
    }
    
    // Handle specific string in report_premium.html
    content = content.replace(/KATCH 입시전략연구팀/g, 'KATCH 김치삼 원장');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
console.log('Done.');
