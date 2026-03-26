const fs = require('fs');

function fixFiles() {
    let files = ['my_learning.html', 'dashboard_online.html'];
    
    files.forEach(filename => {
        if (!fs.existsSync(filename)) return;
        let html = fs.readFileSync(filename, 'utf8');

        // 1. Fix Button Alignment
        if (html.includes('justify-content:space-between; align-items:flex-end;')) {
            html = html.replace(/justify-content:space-between; align-items:flex-end;/g, 
                'justify-content:space-between; align-items:center; gap:15px;');
        }
        
        // Add nowrap and flex-shrink to the button itself
        if (html.includes('<a href="gvr_review.html" style="background:#1a237e; color:white; padding:8px 15px;')) {
            html = html.replace(/<a href="gvr_review.html" style="background:#1a237e; color:white; padding:8px 15px; border-radius:6px; font-weight:bold; font-size:13px; text-decoration:none;"/g, 
                '<a href="gvr_review.html" style="background:#1a237e; color:white; padding:8px 15px; border-radius:8px; font-weight:800; font-size:13px; text-decoration:none; white-space:nowrap; flex-shrink:0; box-shadow:0 3px 6px rgba(26,35,126,0.2);"');
        }

        // 2. Add Chart Animations
        // We will inject a delay function into the options object of the charts
        let animationLogic = `
                    animation: {
                        duration: 800,
                        delay: (context) => {
                            let delay = 0;
                            if (context.type === 'data' && context.mode === 'default' && !context.dropped) {
                                delay = context.dataIndex * 150 + context.datasetIndex * 100;
                                context.dropped = true;
                            }
                            return delay;
                        }
                    },`;

        // Chart 1 (Horizontal)
        if (html.includes(`indexAxis: 'y',\n                    responsive: true,`)) {
            html = html.replace(`indexAxis: 'y',\n                    responsive: true,`, 
                `indexAxis: 'y', ${animationLogic}\n                    responsive: true,`);
        } else if (html.includes(`indexAxis: 'y',\r\n                    responsive: true,`)) {
            html = html.replace(`indexAxis: 'y',\r\n                    responsive: true,`, 
                `indexAxis: 'y', ${animationLogic}\n                    responsive: true,`);
        }

        // Chart 2, 3, 4 (Vertical)
        // Find options: { responsive: true,
        // Since it occurs multiple times, we can use a global replace
        html = html.replace(/options: \{\s*responsive: true,/g, `options: { ${animationLogic}\n                    responsive: true,`);

        fs.writeFileSync(filename, html, 'utf8');
        console.log('Fixed ' + filename);
    });
}
fixFiles();
