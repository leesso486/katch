const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);
const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.html'));

const allowedNames = ["백재형", "이은혜", "박진규", "박지은", "이주영", "박하늘", "박상영", "이재은", "Mia", "백신혜", "류이삭", "김기태", "천병주", "김용휘", "김지희", "이유진", "문성용", "김경모"];

function getRandomName() {
    return allowedNames[Math.floor(Math.random() * allowedNames.length)];
}

const nameMap = {
    "송아라": "이은혜",
    "이소영": "박진규",
    "김치삼": "백재형"
};

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace names
    content = content.replace(/송아라/g, nameMap["송아라"]);
    content = content.replace(/이소영/g, nameMap["이소영"]);
    content = content.replace(/김치삼/g, nameMap["김치삼"]);
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Replaced names in ${file}`);
    }
});
console.log("Name replacement complete.");
