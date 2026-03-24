const fs = require('fs');

const vodHtml = fs.readFileSync('public/store_vod.html', 'utf8');
const diagHtml = fs.readFileSync('public/student_diagnostics.html', 'utf8');

const headerRegex = /(?:<!--\s*1\.\s*Top Header\s*-->|<!--\s*Top Header\s*-->)[\s\S]*?<\/header>/i;
const headerMatch = vodHtml.match(headerRegex);

if (headerMatch) {
    const newHeader = headerMatch[0];
    const newDiagHtml = diagHtml.replace(headerRegex, newHeader);
    fs.writeFileSync('public/student_diagnostics.html', newDiagHtml, 'utf8');
    console.log("Updated header successfully!");
} else {
    console.log("Could not find unified header in store_vod.html");
}
