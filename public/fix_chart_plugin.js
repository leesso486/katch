const fs = require('fs');

let html = fs.readFileSync('my_learning.html', 'utf8');

// 1. Remove global ChartDataLabels registration
html = html.replace(/Chart\.register\(ChartDataLabels\);/g, '// Chart.register(ChartDataLabels); removed globally');

// 2. Add plugins: [ChartDataLabels] explicitly to errorRateChart
html = html.replace(/window\.erChartInstance = new Chart\(ctx, {\n(\s+)type: 'bar',/, 
                   `window.erChartInstance = new Chart(ctx, {\n$1type: 'bar',\n$1plugins: [ChartDataLabels],`);

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Fixed ChartDataLabels global bug');
