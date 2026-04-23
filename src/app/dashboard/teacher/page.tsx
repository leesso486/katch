"use client";
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './teacher.css';

// Register Plugin
Chart.register(ChartDataLabels);

interface QuestionData {
    at: string;
    qNum: string;
    type: string;
    area: string;
    er: number;
    stCount: number;
    students: string[];
}

export default function TeacherPage() {
    // Refs for charts
    const typeErrorChartRef = useRef<HTMLCanvasElement | null>(null);
    const top5ChartRef = useRef<HTMLCanvasElement | null>(null);
    const subtestTrendChartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstances = useRef<{ [key: string]: Chart | null }>({});

    // States
    const [activeTypeTab, setActiveTypeTab] = useState('ALL');
    const [sortMode, setSortMode] = useState<'num' | 'er'>('num');
    const [modalData, setModalData] = useState<{ isOpen: boolean; typeStr: string; questions: QuestionData[] }>({ isOpen: false, typeStr: '', questions: [] });
    const [expandedStudents, setExpandedStudents] = useState<Record<number, boolean>>({});

    // Shared Data
    const allGvrQuestions = useRef<QuestionData[]>([]);

    useEffect(() => {
     try {
        // Chart defaults
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = "'Pretendard', sans-serif";
        Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.05)';

        // Generating dummy data exactly as the original script
        const subTypes: Record<string, string[]> = {
            'GR': ['기본 형식', '어법 (세부)', '시제/수일치', '관계사/접속사', '문장구조'],
            'VO': ['어휘 (문맥 조추론)', '동의어/반의어', '다의어', '숙어/관용표현'],
            'RC': ['주제/요지 찾기', '문장 삽입', '추론 (빈칸)', '순서 배열', '요약문 완성', '세부사항 파악']
        };
        const areaColors: Record<string, { top: string, bottom: string }> = {
            'GR': { top: '#10b981', bottom: '#059669' },
            'VO': { top: '#6366f1', bottom: '#4338ca' },
            'RC': { top: '#06b6d4', bottom: '#0891b2' }
        };

        const subtypeToArea: Record<string, string> = {};
        for(let key in subTypes) {
            subTypes[key].forEach(st => subtypeToArea[st] = key);
        }

        const allSubTypesKeys = [...subTypes['GR'], ...subTypes['VO'], ...subTypes['RC']];
        const namesPool = ['김지민','박수민','이영희','최동훈','정우성','강동원','조인성','원빈','송혜교','전지현', '유재석', '박명수', '신동엽', '강호동', '이수근', '아이유', '장원영', '카리나', '윈터', '민지'];

        const questions: QuestionData[] = [];
        for(let t=1; t<=4; t++) { 
            for(let i=1; i<=12; i++) {
                let typeStr = allSubTypesKeys[Math.floor(Math.random() * allSubTypesKeys.length)];
                let er = Math.floor(Math.random() * 85) + 5; 
                let count = Math.ceil((er / 100) * 20); 
                let students = [];
                let shuffled = [...namesPool].sort(() => 0.5 - Math.random());
                for(let k=0; k<count; k++) students.push(shuffled[k]);

                questions.push({
                    at: 'AT ' + t,
                    qNum: 'Q' + i,
                    type: typeStr,
                    area: subtypeToArea[typeStr],
                    er: er,
                    stCount: count,
                    students: students
                });
            }
        }
        allGvrQuestions.current = questions;

        const typeAggregates: Record<string, { totalEr: number, count: number, area: string }> = {};
        questions.forEach(q => {
            if(!typeAggregates[q.type]) typeAggregates[q.type] = { totalEr: 0, count: 0, area: q.area };
            typeAggregates[q.type].totalEr += q.er;
            typeAggregates[q.type].count += 1;
        });

        const aggregatedTypes: Array<{ type: string; area: string; avgEr: number; totalQuestions: number }> = [];
        for(let type in typeAggregates) {
            aggregatedTypes.push({
                type: type,
                area: typeAggregates[type].area,
                avgEr: Math.round(typeAggregates[type].totalEr / typeAggregates[type].count),
                totalQuestions: typeAggregates[type].count
            });
        }

        // Render Chart 1
        const renderChart1 = () => {
            if (!typeErrorChartRef.current) return;
            const ctxCanvas = typeErrorChartRef.current;
            const ctx = ctxCanvas.getContext('2d');
            if(!ctx) return;

            let filtered = [...aggregatedTypes];
            if(activeTypeTab !== 'ALL') {
                filtered = filtered.filter(t => t.area === activeTypeTab);
            }

            if(sortMode === 'er') {
                filtered.sort((a,b) => b.avgEr - a.avgEr);
            } else {
                const areaOrder: Record<string, number> = { 'GR':1, 'VO':2, 'RC':3 };
                filtered.sort((a,b) => {
                    if(areaOrder[a.area] !== areaOrder[b.area]) return areaOrder[a.area] - areaOrder[b.area];
                    return b.avgEr - a.avgEr;
                });
            }

            const labels = filtered.map(t => t.type);
            const dataEr = filtered.map(t => t.avgEr);
            const dataCt = filtered.map(t => t.totalQuestions);
            
            const bgColors = filtered.map(t => {
                const grad = ctx.createLinearGradient(0, 0, 0, 400);
                grad.addColorStop(0, areaColors[t.area].top);
                grad.addColorStop(1, areaColors[t.area].bottom);
                return grad;
            });

            if(chartInstances.current['typeError']) {
                chartInstances.current['typeError']?.destroy();
            }

            chartInstances.current['typeError'] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '평균 오답률 (%)',
                        data: dataEr,
                        backgroundColor: bgColors as any,
                        borderRadius: 8,
                        hoverBackgroundColor: '#ec4899',
                        barPercentage: 0.5
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    layout: { padding: { top: 30 } },
                    plugins: { 
                        legend: { display: false },
                        datalabels: {
                            color: '#e2e8f0', anchor: 'end', align: 'top', offset: 4,
                            formatter: function(value, context) { return value + '%\\n(' + dataCt[context.dataIndex] + '문항)'; },
                            font: { size: 12, weight: 'bold' }, textAlign: 'center',
                            textShadowColor: 'rgba(0,0,0,0.8)', textShadowBlur: 4
                        },
                        tooltip: {
                            backgroundColor: 'rgba(15, 23, 42, 0.95)', titleFont: { size: 14, weight: 'bold' } as any, bodyFont: { size: 13 },
                            padding: 12, borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
                            callbacks: {
                                label: function(context) { return `평균 오답률: ${dataEr[context.dataIndex]}% (${dataCt[context.dataIndex]}문항 포함)`; }
                            }
                        }
                    },
                    scales: { 
                        y: { min: 0, max: 100, border: {display: false}, grid: {color: 'rgba(255,255,255,0.05)'} },
                        x: { grid: { display: false }, ticks: { font: {size:12, weight:'bold'} as any, color:'#cbd5e1' } }
                    },
                    onClick: (e, activeEls) => {
                        if (activeEls.length > 0) {
                            const dataIndex = activeEls[0].index;
                            const selectedType = labels[dataIndex];
                            
                            let matchingQs = [...allGvrQuestions.current].filter(q => q.type === selectedType);
                            matchingQs.sort((a,b) => b.er - a.er);
                            
                            setModalData({ isOpen: true, typeStr: selectedType, questions: matchingQs });
                            setExpandedStudents({});
                        }
                    }
                }
            });
        };

        renderChart1();

        // Chart 2: Top 5 Worst Types
        if (top5ChartRef.current && !chartInstances.current['top5']) {
            const ctx2 = top5ChartRef.current.getContext('2d')!;
            const grad2 = ctx2.createLinearGradient(0, 0, 0, 400);
            grad2.addColorStop(0, '#f43f5e'); grad2.addColorStop(1, '#be123c');
            chartInstances.current['top5'] = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: ['추론 (빈칸)', '서술형 배열', '시제/수일치', '어휘 (동의어)', '문장 삽입'],
                    datasets: [{
                        label: '평균 오답률 (%)',
                        data: [68, 62, 55, 48, 42],
                        backgroundColor: grad2 as any,
                        borderRadius: 6,
                        barPercentage: 0.6
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false }, datalabels: {color: '#fff', anchor: 'end', align: 'left', formatter: (v:any)=>v+'%', font:{weight:'bold'}} },
                    scales: { 
                        x: { min: 0, max: 100, grid: {color: 'rgba(255,255,255,0.05)'} },
                        y: { grid: {display:false}, ticks: {color: '#fff', font:{weight:'bold'} as any} }
                    }
                }
            });
        }

        // Chart 3: Area Trends over Sub-tests
        if (subtestTrendChartRef.current && !chartInstances.current['subtestTrend']) {
            const ctx3 = subtestTrendChartRef.current.getContext('2d')!;
            chartInstances.current['subtestTrend'] = new Chart(ctx3, {
                type: 'line',
                data: {
                    labels: ['AT 1', 'AT 2', 'AT 3', 'AT 4'],
                    datasets: [
                        { label: 'GR (문법)', data: [45, 42, 40, 35], borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderWidth: 3, pointBackgroundColor: '#10b981', pointRadius: 5, fill: true, tension: 0.4 },
                        { label: 'VO (어휘)', data: [28, 32, 25, 22], borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderWidth: 3, pointBackgroundColor: '#6366f1', pointRadius: 5, fill: true, tension: 0.4 },
                        { label: 'RC (독해)', data: [55, 52, 58, 48], borderColor: '#06b6d4', backgroundColor: 'rgba(6, 182, 212, 0.1)', borderWidth: 3, pointBackgroundColor: '#06b6d4', pointRadius: 5, fill: true, tension: 0.4 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: { 
                        legend: { position: 'top', labels: { color: '#e2e8f0', usePointStyle: true, padding: 20 } },
                        datalabels: { display: false }
                    },
                    scales: { 
                        y: { min: 0, max: 100, grid: {color: 'rgba(255,255,255,0.05)'}, title: {display: true, text: '영역별 평균 오답률 (%)', color:'#94a3b8'} },
                        x: { grid: { display: false }, ticks: {color: '#fff', font:{weight:'bold', size: 14} as any} }
                    }
                }
            });
        }
     } catch(err: any) {
         alert("CHART ERROR: " + err.message);
     }

     return () => {
         Object.values(chartInstances.current).forEach(c => c?.destroy());
     };
    }, [activeTypeTab, sortMode]);

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '20px' }} className="dark-theme-provider">
            <div className="dashboard-container">
        
                <div className="header-section">
                    <div className="header-title">
                        <h1>GVR Session Analytics</h1>
                        <p>
                            <span><i className="fas fa-archive"></i> BINDER 68</span>
                            주간 GVR - 68회차 (포함된 시험: AT 1, AT 2, AT 3, AT 4)
                        </p>
                    </div>
                    <div>
                        <select className="modern-select">
                            <option>중2외고전사고반-C</option>
                            <option>중3외고전사고반-A</option>
                            <option>고1연고대반-B</option>
                        </select>
                    </div>
                </div>

                <div className="bento-grid">
                    {/*  Chart 1: Main Error Rate by Type  */}
                    <div className="glass-card span-2">
                        <div className="panel-header">
                            <div className="panel-title"><i className="fas fa-chart-bar"></i> 문제 유형별 평균 오답률 분석</div>
                            <div className="gvr-tabs">
                                {['ALL', 'GR', 'VO', 'RC'].map(tab => (
                                    <button key={tab} className={activeTypeTab === tab ? 'active' : ''} onClick={() => setActiveTypeTab(tab)}>{tab === 'ALL' ? '전체' : (tab==='GR' ? '문법' : (tab==='VO' ? '어휘' : '독해'))}</button>
                                ))}
                                <button className="btn-sort" onClick={() => setSortMode(s => s === 'num' ? 'er' : 'num')} style={sortMode === 'er' ? {color:'#fff', background:'rgba(236, 72, 153, 0.2)', borderColor:'rgba(236, 72, 153, 0.4)'} : {}}>
                                    {sortMode === 'num' ? <><i className="fas fa-sort-amount-down"></i> 오답률순 정렬</> : <><i className="fas fa-sort-numeric-down"></i> 정렬 복구</>}
                                </button>
                            </div>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', marginTop: '-10px' }}>
                            <i className="fas fa-info-circle"></i> 차트의 막대를 클릭하시면 해당 그룹 내에 포함된 세부 문항 리스트 및 오답 학생 명단을 확인할 수 있습니다.
                        </div>
                        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '10px' }}>
                            <div style={{ minWidth: '700px', height: '350px' }} id="chart-width-container">
                                <canvas ref={typeErrorChartRef} id="typeErrorChart"></canvas>
                            </div>
                        </div>
                    </div>

                    {/*  Chart 2: Top 5 Worst Types  */}
                    <div className="glass-card card-pink">
                        <div className="panel-header">
                            <div className="panel-title"><i className="fas fa-radiation" style={{ color: 'var(--accent-pink)' }}></i> 반별 취약 유형 TOP 5</div>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', marginTop: '-10px' }}>
                            반 전체 학생이 가장 많이 틀린 집중 오답 유형
                        </div>
                        <div style={{ height: '350px' }}>
                            <canvas ref={top5ChartRef} id="top5Chart"></canvas>
                        </div>
                    </div>

                    {/*  Chart 3: Area Trends over Sub-tests  */}
                    <div className="glass-card card-teal span-3">
                        <div className="panel-header">
                            <div className="panel-title"><i className="fas fa-project-diagram" style={{ color: 'var(--accent-teal)' }}></i> 세션 내 하위 시험별 성적 추이 (AT 1 ~ AT 4)</div>
                        </div>
                        <div style={{ height: '280px', width: '100%' }}>
                            <canvas ref={subtestTrendChartRef} id="subtestTrendChart"></canvas>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal */}
            <div id="typeDetailModal" className={`modal-overlay ${modalData.isOpen ? 'active' : ''}`}>
                <div className="modal-content glass-card">
                    <button className="modal-close" onClick={() => setModalData(m => ({...m, isOpen: false}))}><i className="fas fa-times"></i></button>
                    <div className="modal-title"><i className="fas fa-list-alt text-blue"></i> [<span id="modalTypeSpan">{modalData.typeStr}</span>] 유형 세부 문항 리스트</div>
                    <p style={{marginTop: '5px', marginBottom: '20px', fontSize: '13px', color: 'var(--text-muted)'}}>오답률이 높은 문제부터 정렬되어 표시됩니다.</p>
                    
                    <div style={{maxHeight:'500px', overflowY:'auto', paddingRight:'5px'}}>
                        <table className="analysis-table">
                            <thead>
                                <tr>
                                    <th>출처 시험</th>
                                    <th>문항 번호</th>
                                    <th>오답률</th>
                                    <th>오답 인원</th>
                                    <th>학생 명단</th>
                                </tr>
                            </thead>
                            <tbody id="modalQuestionList">
                                {modalData.questions.map((q, idx) => {
                                    const isHigh = q.er >= 30; 
                                    const badgeClass = isHigh ? 'er-badge er-high' : 'er-badge';
                                    const trClass = isHigh ? 'highlight' : '';
                                    return (
                                        <tr key={idx} className={trClass}>
                                            <td style={{fontWeight:'bold', color:'var(--accent-glow)'}}>{q.at}</td>
                                            <td style={{fontWeight:800, color:'#fff'}}>{q.qNum}</td>
                                            <td><span className={badgeClass}>{q.er}%</span></td>
                                            <td><span style={{color:'#94a3b8', fontWeight:600}}><i className="fas fa-user"></i> {q.stCount}명</span></td>
                                            <td style={{textAlign:'left'}}>
                                                {q.stCount > 0 ? (
                                                    <>
                                                        <button className="btn-student" onClick={() => setExpandedStudents(prev => ({...prev, [idx]: !prev[idx]}))} style={expandedStudents[idx] ? {background: 'rgba(255,255,255,0.15)', color: '#fff'} : {}}>
                                                            {expandedStudents[idx] ? <>닫기 <i className="fas fa-chevron-up"></i></> : <>오답자 보기 <i className="fas fa-chevron-down"></i></>}
                                                        </button>
                                                        {expandedStudents[idx] && <div className="student-list-box">{q.students.join(', ')}</div>}
                                                    </>
                                                ) : <span style={{color:'#64748b', fontSize:'13px'}}>오답자 없음</span>}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
