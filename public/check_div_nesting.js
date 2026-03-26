const fs = require('fs');

let html = fs.readFileSync('my_learning.html', 'utf8');

let divOpen = 0;
let divClosed = 0;
let homeworkStart = -1;

const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('id="panel-homework"')) {
        homeworkStart = i;
        divOpen = 0;
        divClosed = 0;
    }
    
    if (homeworkStart !== -1) {
        let openMatches = lines[i].match(/<div/g);
        let closedMatches = lines[i].match(/<\/div>/g);
        
        if (openMatches) divOpen += openMatches.length;
        if (closedMatches) divClosed += closedMatches.length;
        
        if (divOpen > 0 && divOpen === divClosed) {
            console.log("panel-homework properly closed at line " + i);
            break;
        }
    }
}

// Check where panel-diag is
let diagLine = lines.findIndex(l => l.includes('id="panel-diag"'));
console.log("panel-diag is at line " + diagLine);
