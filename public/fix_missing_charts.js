const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

// The correct JS for BOTH student and teacher summary charts.
// gvrChart1 / tGvrChart1: HORIZONTAL bar chart (indexAxis: 'y')
// gvrChart2 / tGvrChart2: LINE chart
// gvrChart3 / tGvrChart3: RADAR chart
// gvrChart4 / tGvrChart4: VERTICAL bar chart (no indexAxis)
const correctChartsJS = `
            // ================= 4 Summary Charts (Student) =================
            const ctx1 = document.getElementById('gvrChart1');
            if(ctx1) { new Chart(ctx1, { type:'bar', data: { labels: ['Q1','Q2','Q3','Q4','Q5'], datasets:[{label:'학급 오답률', data:[32,60,45,40,75], backgroundColor:'#E91E63', borderRadius:4}] }, options:{ indexAxis:'y', responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{min:0,max:100}} } }); }
            
            const ctx2 = document.getElementById('gvrChart2');
            if(ctx2) { new Chart(ctx2, { type:'line', data: { labels: ['3/2','3/9','3/16','3/23','3/30'], datasets:[{label:'나의 점수', data:[65,70,62,75,80], borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.1)', fill:true, tension:0.3, pointRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{min:0,max:100}} } }); }
            
            const ctx3 = document.getElementById('gvrChart3');
            if(ctx3) { new Chart(ctx3, { type:'bar', data: { labels: ['독해력','어휘','문법'], datasets:[{label:'전체 평균', data:[75,80,65], backgroundColor:'#4A89DC', borderRadius:4},{label:'나의 평균', data:[68,75,72], backgroundColor:'#F6BB42', borderRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, scales:{y:{min:0,max:100}} } }); }

            const ctx4 = document.getElementById('gvrChart4');
            if(ctx4) { new Chart(ctx4, { type:'bar', data: { labels: ['추론','독해력','문법','논리'], datasets:[{label:'전체', data:[40,35,15,30], backgroundColor:'#4A89DC', borderRadius:4}, {label:'나의', data:[40,35,15,45], backgroundColor:'#F6BB42', borderRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, scales:{y:{min:0,max:100}} } }); }

            // ================= Teacher GVR Charts =================
            const tCtx1 = document.getElementById('tGvrChart1');
            if(tCtx1) { new Chart(tCtx1, { type:'bar', data: { labels: ['Q1','Q2','Q3','Q4','Q5'], datasets:[{label:'학급 오답률', data:[32,60,45,40,75], backgroundColor:'#E91E63', borderRadius:4}] }, options:{ indexAxis:'y', responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{min:0,max:100}} } }); }
            
            const tCtx2 = document.getElementById('tGvrChart2');
            if(tCtx2) { new Chart(tCtx2, { type:'line', data: { labels: ['3/2','3/9','3/16','3/23','3/30'], datasets:[{label:'학급 평균 성적', data:[75,78,76,82,85], borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.1)', fill:true, tension:0.3, pointRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{min:0,max:100}} } }); }
            
            const tCtx3 = document.getElementById('tGvrChart3');
            if(tCtx3) { new Chart(tCtx3, { type:'bar', data: { labels: ['독해력','어휘','문법'], datasets:[{label:'전체 평균', data:[75,80,65], backgroundColor:'#4A89DC', borderRadius:4},{label:'학급 평균', data:[82,85,78], backgroundColor:'#8CC152', borderRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, scales:{y:{min:0,max:100}} } }); }

            const tCtx4 = document.getElementById('tGvrChart4');
            if(tCtx4) { new Chart(tCtx4, { type:'bar', data: { labels: ['추론','독해력','문법','논리'], datasets:[{label:'전체', data:[40,35,15,30], backgroundColor:'#4A89DC', borderRadius:4}, {label:'학급', data:[35,30,12,25], backgroundColor:'#8CC152', borderRadius:4}] }, options:{ responsive:true, maintainAspectRatio:false, scales:{y:{min:0,max:100}} } }); }
`;

// First, cleanly remove the OLD Teacher GVR Charts block to prevent duplication
html = html.replace(/\/\/ ================= Teacher GVR Charts =================[\s\S]*?(?=\}\);?\s*<\/script>\s*<\/body>)/, '');

// Now append the correct combined JS block right before the closing of the script block
html = html.replace(/(\}\);?\s*<\/script>\s*<\/body>)/, correctChartsJS + '\n    $1');

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Fixed missing summary charts and axis orientations.');
