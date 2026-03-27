import fs from 'fs';

const correctScript = `    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            Chart.register(ChartDataLabels);

            // Handle anchor hash for direct tab linking
            if (window.location.hash) {
                const hash = window.location.hash.substring(1);
                setTimeout(() => {
                    const targetTab = document.querySelector(\`.inner-tab[data-target='\${hash}']\`);
                    if (targetTab) targetTab.click();
                }, 50);
            }

            // Tab Navigation Logic
            const tabs = document.querySelectorAll('.inner-tab');
            const contents = document.querySelectorAll('.tab-content-wrap');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));

                    tab.classList.add('active');
                    const target = document.getElementById(tab.getAttribute('data-target'));
                    if (target) {
                        target.classList.add('active');
                    }
                });
            });

            // 1. Diagnostics Radar Chart
            new Chart(document.getElementById('diagRadarChart').getContext('2d'), {
                type: 'radar',
                data: {
                    labels: ['어휘', '문법', '독해(대의)', '독해(추론)', '독해(논리)', '듣기'],
                    datasets: [{
                        label: '백재형 학생',
                        data: [70, 95, 80, 50, 60, 100],
                        backgroundColor: 'rgba(93, 156, 236, 0.2)',
                        borderColor: '#5D9CEC',
                        pointBackgroundColor: '#5D9CEC',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#5D9CEC'
                    }, {
                        label: '전상 모의 평균',
                        data: [65, 75, 70, 60, 55, 80],
                        backgroundColor: 'rgba(204, 204, 204, 0.2)',
                        borderColor: '#ccc',
                        pointBackgroundColor: '#ccc',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#ccc'
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: { r: { min: 0, max: 100, ticks: { display: false } } },
                    plugins: { datalabels: { display: false } }
                }
            });

            // 2. Level Test Bar Chart
            new Chart(document.getElementById('levelBarChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['어휘', '문법', '독해'],
                    datasets: [{
                        label: '획득 점수',
                        data: [70, 95, 82.5],
                        backgroundColor: ['#4A89DC', '#A0D468', '#37BC9B'],
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { min: 0, max: 100 } }
                }
            });

            // 3. GVR Personal Trend Chart
            new Chart(document.getElementById('gvrPersonalTrendChart').getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['AT1', 'AT2', 'AT3', 'AT4', 'AT5', 'AT6(Current)'],
                    datasets: [{
                        label: 'GR (문법)',
                        data: [85, 80, 90, 88, 92, 95],
                        borderColor: '#A0D468',
                        backgroundColor: 'transparent',
                        tension: 0.3, borderWidth: 3
                    }, {
                        label: 'VO (어휘)',
                        data: [60, 65, 60, 70, 80, 75],
                        borderColor: '#4A89DC',
                        backgroundColor: 'transparent',
                        tension: 0.3, borderWidth: 3
                    }, {
                        label: 'RC (독해)',
                        data: [75, 78, 80, 85, 82, 88],
                        borderColor: '#37BC9B',
                        backgroundColor: 'transparent',
                        tension: 0.3, borderWidth: 3
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { 
                        legend: { position: 'bottom' },
                        datalabels: { display: false } 
                    },
                    scales: { y: { min: 0, max: 100 } }
                }
            });

            // 4. GVR Personal Question View Chart
            // Generate dummy 30 questions for AT6
            const qLabels = [];
            const qData = [];
            const qColors = [];
            for(let i=1; i<=30; i++) {
                qLabels.push('Q' + i);
                // Assign correctness (1 or 0). mostly correct since student has 96 points
                const isCorrect = Math.random() > 0.1 ? 1 : 0; 
                qData.push(isCorrect ? 100 : 20); // visual height
                qColors.push(isCorrect ? '#eef2f6' : '#E91E63'); 
            }

            new Chart(document.getElementById('gvrPersonalErrorChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: qLabels,
                    datasets: [{
                        label: '정오답 여부',
                        data: qData,
                        backgroundColor: qColors,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: { 
                        y: { display:false, min:0, max:100 },
                        x: { grid: { display: false } }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false },
                        datalabels: {
                            color: function(context) { return qData[context.dataIndex] === 100 ? '#888' : '#E91E63'; },
                            anchor: 'end', align: 'top', offset: 2,
                            formatter: function(value, context) {
                                return value === 100 ? 'O' : 'X';
                            },
                            font: { size: 14, weight: '900' }
                        }
                    }
                }
            });
        });
    </script>
</body>
</html>`;

let html = fs.readFileSync('admin_student_detail.html', 'utf8');
let idx = html.indexOf('</main>');
if (idx !== -1) {
    html = html.substring(0, idx + 7) + "\n" + correctScript + "\n";
    fs.writeFileSync('admin_student_detail.html', html, 'utf8');
}
