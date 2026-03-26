const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

// A very simple DOM scanner
let depth = 0;
let dashboardDepth = -1;
let diagDepth = -1;

const tokens = html.match(/<\/?div[^>]*>/g);
if (tokens) {
    for (let t of tokens) {
        if (t.includes('<div') && !t.startsWith('</')) {
            depth++;
            if (t.includes('id="panel-dashboard"')) dashboardDepth = depth;
            if (t.includes('id="panel-diag"')) {
                diagDepth = depth;
                console.log(`Found panel-diag at depth ${diagDepth}, dashboard start depth was ${dashboardDepth}, current depth is ${depth}`);
                break; // Stop after finding panel-diag
            }
        } else if (t.startsWith('</div')) {
            depth--;
        }
    }
}
