const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

const correctGvr1 = `
        // 1. Chart 1: Error Rate by Question (Horizontal Bar)
        const ctxGvr1 = document.getElementById('gvrChart1');
        if(ctxGvr1) {
            new Chart(ctxGvr1, {
                type: 'bar',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
                    datasets: [{
                        label: '전체 문항 오답률 현황',
                        data: [29, 78, 45, 45, 67],
                        backgroundColor: '#4285F4',
                        borderRadius: 4,
                        barPercentage: 0.6
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { 
                        x: { min: 0, max: 100, ticks: { stepSize: 20 } },
                        y: { grid: { display: false } }
                    }
                }
            });
        }
`;

const regexToReplace = /\/\/ 1\. Chart 1: Error Rate by Question \(Horizontal Bar\)[\s\S]*?const ctxGvr1 = document\.getElementById\('gvrChart1'\);\s*if\(ctxGvr1\)\s*\{[\s\S]*?new Chart\(ctxGvr1,\s*\{[\s\S]*?\}\);\s*\}/;

if(html.match(regexToReplace)) {
    html = html.replace(regexToReplace, correctGvr1.trim());
} else {
    // If regex fails (because of the broken state), let's find the broken block manually
    const startIdx = html.indexOf('const ctxGvr1');
    const endIdx = html.indexOf('const ctxGvr2');
    if (startIdx !== -1 && endIdx !== -1) {
        html = html.substring(0, startIdx) + correctGvr1.trim() + '\n\n        // 2. Chart 2: Score Trend' + html.substring(endIdx + 13 + ' Chart 2: Score Trend'.length);
    }
}

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Fixed gvrChart1 block');
