const fs = require('fs');
let content = fs.readFileSync('dashboard.html', 'utf8');

// 1. Remove display:none from task-section
content = content.replace('<div id="task-section" style="display:none;">', '<div id="task-section" style="margin-top:40px;">');

// 2. Hide display:none from tabs
content = content.replace('<div class="task-tabs" style="display:none;">', '<div class="task-tabs" style="display:flex;">');

// 3. Disable the JS hiding
content = content.replace("document.getElementById('overview-section').style.display = 'none';", "//document.getElementById('overview-section').style.display = 'none';");
content = content.replace("document.getElementById('task-section').style.display = 'none';", "//document.getElementById('task-section').style.display = 'none';");

// 4. Chart 4 horizontal axis
let originalChartProps = `                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { min: 0, max: 60, title: { display: true, text: '오답률 (%)', font: { size: 10 } } },
                        x: { grid: { display: false } }
                    }
                }`;
let newChartProps = `                options: {
                    indexAxis: 'y',
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { min: 0, max: 60, title: { display: true, text: '오답률 (%)', font: { size: 10 } } },
                        y: { grid: { display: false } }
                    }
                }`;
content = content.replace(originalChartProps, newChartProps);

fs.writeFileSync('dashboard.html', content, 'utf8');
console.log('done');
