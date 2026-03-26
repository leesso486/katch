const fs = require('fs');

let html = fs.readFileSync('my_learning.html', 'utf8');

// 1. Clear old Chart rendering script from my_learning.html
let scriptStart = html.indexOf('const ctxGvr1 = document.getElementById(\\\'gvrChart1\\\');');
if (scriptStart !== -1) {
    // Remove exactly instructions for ctxGvr1, 2, 3, 4
    html = html.replace(/const ctxGvr1[\s\S]*?\} \}\);\n        \}\n/g, '');
    html = html.replace(/const ctxGvr2[\s\S]*?\} \}\);\n        \}\n/g, '');
    html = html.replace(/const ctxGvr3[\s\S]*?\} \}\);\n        \}\n/g, '');
    html = html.replace(/const ctxGvr4[\s\S]*?\} \}\);\n        \}\n/g, '');
} else {
	console.log("Could not find ctxGvr1... trying manual split");
    let targetBlock = html.indexOf('// ========= NEW GVR DASHBOARD CHARTS =========');
    if(targetBlock > -1) {
        let scriptEndBlock = html.indexOf('</script>', targetBlock);
        
        // Retain anything after ctxGvr4 if it exists, but in my_learning, ctxGvr4 is the last thing.
        let newScripts = `
// ========= NEW GVR DASHBOARD CHARTS =========
// PIXEL PERFECT MOCK CHARTS (Student)
// Custom plugin to draw top labels
const topLabelsPlugin = {
    id: 'topLabels',
    afterDatasetsDraw(chart) {
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((element, index) => {
                ctx.fillStyle = dataset.type === 'line' ? '#333' : '#555';
                ctx.font = 'bold 10px sans-serif';
                ctx.textAlign = 'center';
                const dataString = dataset.data[index] + (dataset.type === 'line' ? '점' : (dataset.isPercent ? '%' : ''));
                let yPos = dataset.type === 'line' ? element.y - 12 : element.y + 14;
                if(dataset.labelPos === 'top') yPos = element.y - 6;
                if (dataset.customTopLabel) yPos = element.y - 8;

                ctx.fillText(dataString, element.x, yPos);
            });
        });
    }
};

const mockChart2 = document.getElementById('mockChart2');
if (mockChart2) {
    new Chart(mockChart2, {
        type: 'bar',
        data: {
            labels: ['3/2', '3/9', '3/16', '3/23', '3/30'],
            datasets: [
                {
                    type: 'line', data: [68, 72, 65, 78, 82], borderColor: '#ff9800', backgroundColor: '#ff9800', borderWidth: 2, pointBackgroundColor: '#ff9800', pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 5, tension: 0.3
                },
                {
                    type: 'bar', data: [65, 70, 62, 75, 80], backgroundColor: '#42a5f5', borderRadius: {topRight: 4, topLeft: 4}, barPercentage: 0.5
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { delay: (ctx) => ctx.dataIndex * 150 },
            layout: { padding: { top: 20 } },
            plugins: { legend: { display: false }, tooltip: { enabled: true } },
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { stepSize: 20, font:{size:10} }, grid:{color:'#f0f0f0'}, title:{display:true, text:'나의 점수 (0-100)', font:{size:10}} },
                x: { grid: {display:false}, ticks:{font:{size:10}} }
            }
        },
        plugins: [topLabelsPlugin]
    });
}

const mockChart3 = document.getElementById('mockChart3');
if (mockChart3) {
    new Chart(mockChart3, {
        type: 'bar',
        data: {
            labels: ['독해력', '어휘', '문법'],
            datasets: [
                { data: [75, 80, 65], backgroundColor: '#42a5f5', borderRadius: {topRight: 4, topLeft: 4}, isPercent: true, customTopLabel: true },
                { data: [68, 75, 72], backgroundColor: '#ffb74d', borderRadius: {topRight: 4, topLeft: 4}, isPercent: true, customTopLabel: true }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { delay: (ctx) => ctx.dataIndex * 150 },
            layout: { padding: { top: 20 } },
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { stepSize: 20, font:{size:10} }, grid:{color:'#f0f0f0'}, title:{display:true, text:'평균 점수 (%)', font:{size:10}} },
                x: { grid: {display:false}, ticks:{font:{size:10}} }
            }
        },
        plugins: [topLabelsPlugin]
    });
}

const mockChart4a = document.getElementById('mockChart4a');
if (mockChart4a) {
    new Chart(mockChart4a, {
        type: 'bar',
        data: {
            labels: ['추론', '독해력', '문법'],
            datasets: [{ data: [40, 35, 15], backgroundColor: '#42a5f5', borderRadius: {topRight: 4, topLeft: 4}, isPercent: true, customTopLabel: true }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { delay: (ctx) => ctx.dataIndex * 150 },
            layout: { padding: { top: 20 } },
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 60, ticks: { stepSize: 20, font:{size:10} }, grid:{color:'#f0f0f0'}, title:{display:true, text:'오답률 (%)', font:{size:10}} },
                x: { grid: {display:false}, ticks:{font:{size:10}} }
            }
        },
        plugins: [topLabelsPlugin]
    });
}

const mockChart4b = document.getElementById('mockChart4b');
if (mockChart4b) {
    new Chart(mockChart4b, {
        type: 'bar',
        data: {
            labels: ['문법', '독해력', '논리'],
            datasets: [{ data: [30, 45, 25], backgroundColor: '#ffb74d', borderRadius: {topRight: 4, topLeft: 4}, isPercent: true, customTopLabel: true }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { delay: (ctx) => ctx.dataIndex * 150 },
            layout: { padding: { top: 20 } },
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 60, ticks: { stepSize: 20, font:{size:10} }, grid:{color:'#f0f0f0'}, position: 'right' },
                x: { grid: {display:false}, ticks:{font:{size:10}} }
            }
        },
        plugins: [topLabelsPlugin]
    });
}
`;
        html = html.substring(0, targetBlock) + newScripts + '\n    ' + html.substring(scriptEndBlock);
    }
}

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Successfully wrote the pixel perfect JS scripts!');
