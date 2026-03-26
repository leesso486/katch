const fs = require('fs');
let html = fs.readFileSync('dashboard.html', 'utf8');

const correctScript = `        document.addEventListener('DOMContentLoaded', () => {
            // Chart 2: 나의 성적 추이 (최근 5회 과제) - Bar + Line combo
            const ctxCombo = document.getElementById('comboChart').getContext('2d');
            new Chart(ctxCombo, {
                type: 'bar',
                data: {
                    labels: ['3/2', '3/9', '3/16', '3/23', '3/30'],
                    datasets: [
                        {
                            type: 'line',
                            label: '전체 평균',
                            data: [68, 72, 65, 78, 82],
                            borderColor: '#FFB74D',
                            backgroundColor: '#FFB74D',
                            borderWidth: 2,
                            pointRadius: 4,
                            fill: false,
                            tension: 0.1
                        },
                        {
                            type: 'bar',
                            label: '나의 점수',
                            data: [65, 70, 62, 75, 80],
                            backgroundColor: '#4A89DC',
                            borderRadius: 2,
                            barPercentage: 0.5
                        }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { min: 0, max: 100, title: { display: true, text: '나의 점수 (0-100)', font: { size: 10 } } },
                        x: { grid: { display: false } }
                    }
                }
            });

            // Chart 3: 영역별 전체 평균 vs 나의 평균 비교
            const ctxAvg = document.getElementById('avgCompareChart').getContext('2d');
            new Chart(ctxAvg, {
                type: 'bar',
                data: {
                    labels: ['독해력', '어휘', '문법'],
                    datasets: [
                        { label: '전체 평균', data: [75, 80, 65], backgroundColor: '#4A89DC', borderRadius: 2 },
                        { label: '나의 평균', data: [68, 74, 72], backgroundColor: '#FFB74D', borderRadius: 2 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { min: 0, max: 100, title: { display: true, text: '평균 점수 (%)', font: { size: 10 } } },
                        x: { grid: { display: false } }
                    }
                }
            });

            // Chart 4: 나의 오답 유형 vs 전체 오답 유형 TOP 3
            const ctxType = document.getElementById('typeCompareChart').getContext('2d');
            new Chart(ctxType, {
                type: 'bar',
                data: {
                    labels: ['추론', '독해력', '문법', '논리'],
                    datasets: [
                        { label: '전체', data: [40, 35, 15, 30], backgroundColor: '#4A89DC', borderRadius: 2 },
                        { label: '나의', data: [40, 35, 15, 45], backgroundColor: '#FFB74D', borderRadius: 2 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { min: 0, max: 60, title: { display: true, text: '오답률 (%)', font: { size: 10 } } },
                        x: { grid: { display: false } }
                    }
                }
            });
        });`;

const scriptRegex = /document\.addEventListener\('DOMContentLoaded', \(\) => \{[\s\S]*?\}\);\s*<\/script>/;
html = html.replace(scriptRegex, correctScript + '\n    </script>');

fs.writeFileSync('dashboard.html', html, 'utf8');
console.log('Fixed dashboard.html charts');
