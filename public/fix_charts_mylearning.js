const fs = require('fs');

let html = fs.readFileSync('my_learning.html', 'utf8');

// The 4 GVR charts run synchronously.
// We must delay their creation or allow them to resize.
// Let's delay ALL Chart initializations inside my_learning.html to only occur when their panel is visible!
// Actually, an easier fix for Chart.js `display:none` bug is to just trigger `window.dispatchEvent(new Event('resize'));` inside `showPanel`!
// If we dispatch a resize event immediately after adding `.active`, Chart.js's internal resize listener will catch it and redraw them perfectly!

html = html.replace(/if \(target\) target\.classList\.add\('active'\);/, 
`if (target) {
                target.classList.add('active');
                // Trigger resize so Chart.js canvases inside newly visible panels redraw correctly!
                setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
            }`);

// Now we need to add `renderErrorChart('ALL');` inside the DOMContentLoaded block for the 100-bar chart.
// Let's insert it right before the closing }); that I added manually.

const initCode = `
            // Initialize the 100-bar chart
            window.currentFilterType = 'ALL';
            if (typeof renderErrorChart === 'function') {
                renderErrorChart('ALL');
            }
`;

html = html.replace(/(\n\s*\}\);\s*<\/script>\s*<\/body>)/, initCode + '$1');

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Fixed charts rendering');
