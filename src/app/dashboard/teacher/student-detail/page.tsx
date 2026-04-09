"use client";
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './detail.css';

// Register Plugin
Chart.register(ChartDataLabels);

export default function DetailPage() {
    type TabType = 'diag' | 'level' | 'gvr';
    const [activeTab, setActiveTab] = useState<TabType>('gvr');

    // Chart Refs
    const diagRadarChartRef = useRef<HTMLCanvasElement | null>(null);
    const levelBarChartRef = useRef<HTMLCanvasElement | null>(null);
    const gvrPersonalTrendChartRef = useRef<HTMLCanvasElement | null>(null);
    const gvrPersonalErrorChartRef = useRef<HTMLCanvasElement | null>(null);

    const chartInstances = useRef<{ [key: string]: Chart | null }>({});

    // Read Hash on Mount
    useEffect(() => {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            if(hash === 'tab-diag') setActiveTab('diag');
            if(hash === 'tab-level') setActiveTab('level');
            if(hash === 'tab-gvr') setActiveTab('gvr');
        }
    }, []);

    useEffect(() => {
        // Destroy old charts to prevent duplicate canvases when tab switches
        Object.values(chartInstances.current).forEach(c => c?.destroy());
        chartInstances.current = {};

        if (activeTab === 'diag' && diagRadarChartRef.current) {
            chartInstances.current['diagRadar'] = new Chart(diagRadarChartRef.current.getContext('2d')!, {
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
        }

        if (activeTab === 'level' && levelBarChartRef.current) {
            chartInstances.current['levelBar'] = new Chart(levelBarChartRef.current.getContext('2d')!, {
                type: 'bar',
                data: {
                    labels: ['어휘', '문법', '독해'],
                    datasets: [{
                        label: '획득 점수',
                        data: [70, 95, 82.5],
                        backgroundColor: ['#4A89DC', '#A0D468', '#37BC9B'] as any,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { min: 0, max: 100 } }
                }
            });
        }

        if (activeTab === 'gvr') {
            if (gvrPersonalTrendChartRef.current) {
                chartInstances.current['gvrTrend'] = new Chart(gvrPersonalTrendChartRef.current.getContext('2d')!, {
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
            }

            if (gvrPersonalErrorChartRef.current) {
                const qLabels: string[] = [];
                const qData: number[] = [];
                const qColors: string[] = [];
                for(let i=1; i<=30; i++) {
                    qLabels.push('Q' + i);
                    const isCorrect = Math.random() > 0.1 ? 1 : 0; 
                    qData.push(isCorrect ? 100 : 20);
                    qColors.push(isCorrect ? '#eef2f6' : '#E91E63'); 
                }

                chartInstances.current['gvrError'] = new Chart(gvrPersonalErrorChartRef.current.getContext('2d')!, {
                    type: 'bar',
                    data: {
                        labels: qLabels,
                        datasets: [{
                            label: '정오답 여부',
                            data: qData,
                            backgroundColor: qColors as any,
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
                                formatter: function(value) { return value === 100 ? 'O' : 'X'; },
                                font: { size: 14, weight: '900' } as any
                            }
                        }
                    }
                });
            }
        }

        return () => {
            Object.values(chartInstances.current).forEach(c => c?.destroy());
        };
    }, [activeTab]);

    return (
        <div style={{ backgroundColor: '#f0f2f6', minHeight: '100vh', padding: 0 }}>
            <div className="admin-layout">
                {/*  Sidebar Navigation  */}
                <aside className="admin-sidebar" style={{ background: 'white', borderRight: '1px solid #e8eaf0', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                    <div className="sidebar-user-card" style={{ padding: '20px', background: 'linear-gradient(135deg, #111, #1e2d5a)', color: 'white', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                        <div style={{ content: '""', position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(233,30,99,0.2)', borderRadius: '50%' }}></div>
                        <div className="suc-avatar" style={{ width: '48px', height: '48px', background: '#1976d2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '20px', marginBottom: '10px', border: '2px solid rgba(255,255,255,0.3)' }}>강</div>
                        <div className="suc-name" style={{ fontSize: '16px', fontWeight: 800, marginBottom: '3px' }}>이은혜 강사</div>
                        <div className="suc-role" style={{ fontSize: '12px', opacity: 0.7 }}><i className="fas fa-chalkboard-teacher"></i> KNS 대치본원 · 담당강사</div>
                    </div>

                    <nav className="sidebar-nav" style={{ flex: 1, padding: '10px 0' }}>
                        <div className="nav-section-label" style={{ padding: '15px 20px 5px', fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '1px', textTransform: 'uppercase' }}>강사 관리</div>
                        <a className="nav-item active" href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', cursor: 'pointer', transition: '0.2s', color: '#555', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                            <div className="nav-icon" style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0, background: '#f0f2f5', color: '#666' }}><i className="fas fa-users"></i></div>
                            학생 관리
                            <span className="nav-badge" style={{ marginLeft: 'auto', background: '#E91E63', color: 'white', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>24</span>
                        </a>
                    </nav>
                </aside>

                {/*  Main Content  */}
                <main className="admin-main">
                    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '14px', color: '#555', fontWeight: 'bold' }}>
                        <a href="/dashboard/teacher" style={{ color: '#5D9CEC', textDecoration: 'none' }}><i className="fas fa-arrow-left"></i> 목록으로</a>
                        <span>/</span>
                        <span>학생 종합 분석</span>
                    </div>

                    <div className="student-profile-card">
                        <div className="sp-info">
                            <div className="sp-avatar"><i className="fas fa-user-graduate"></i></div>
                            <div className="sp-details">
                                <h2>백재형 <span className="badge">상위 5%</span></h2>
                                <p>중2외고전사고반-C | 박진규 강사 담당 | 최근 접속: 2시간 전</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn-sm" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'transparent' }}><i className="fas fa-envelope"></i> 쪽지 발송</button>
                            <button className="btn-sm" style={{ background: '#fff', color: 'var(--navy)', borderColor: 'transparent' }}><i className="fas fa-print"></i> 전체 성적표 출력</button>
                        </div>
                    </div>

                    {/*  Inner Tabs  */}
                    <div className="inner-tabs" id="studentTabs">
                        <button className={`inner-tab ${activeTab === 'diag' ? 'active' : ''}`} onClick={() => setActiveTab('diag')}>진단테스트 분석</button>
                        <button className={`inner-tab ${activeTab === 'level' ? 'active' : ''}`} onClick={() => setActiveTab('level')}>레벨테스트 분석</button>
                        <button className={`inner-tab ${activeTab === 'gvr' ? 'active' : ''}`} onClick={() => setActiveTab('gvr')}>Weekly GVR 성취도</button>
                    </div>

                    <div className="tab-content-container">
                        {/*  1. 진단테스트 TAB  */}
                        {activeTab === 'diag' && (
                            <div id="tab-diag" className="tab-content-wrap active">
                                <div className="stat-grid-3">
                                    <div className="stat-card">
                                        <div className="sc-title">최근 진단테스트 점수</div>
                                        <div className="sc-val">88점</div>
                                        <div className="sc-sub"><i className="fas fa-arrow-up"></i> 이전 대비 +5점</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="sc-title">예상 수능 등급 (절대평가)</div>
                                        <div className="sc-val">2등급</div>
                                        <div className="sc-sub"><i className="fas fa-minus"></i> 등급 유지</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="sc-title">취약 유형 (Top 1)</div>
                                        <div className="sc-val">빈칸추론</div>
                                        <div className="sc-sub">정답률 20%</div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="dash-panel">
                                        <div className="panel-title"><i className="fas fa-chart-radar" style={{ color: '#4CAF50' }}></i> 영역별 성취도 분석 (육각형)</div>
                                        <div style={{ height: '250px' }}><canvas ref={diagRadarChartRef}></canvas></div>
                                    </div>
                                    <div className="dash-panel">
                                        <div className="panel-title"><i className="fas fa-clipboard-list" style={{ color: '#2196F3' }}></i> 문항별 상세 분석</div>
                                        <div style={{ height: '250px', overflowY: 'auto', fontSize: '13px' }}>
                                            <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                                                <tbody><tr style={{ background: '#f8f9fa' }}>
                                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>문항</th>
                                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>유형</th>
                                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>정답여부</th>
                                                </tr>
                                                <tr><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1</td><td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>목적추론</td><td style={{ padding: '10px', borderBottom: '1px solid #eee', color: '#4caf50', fontWeight: 'bold' }}>O</td></tr>
                                                <tr style={{ background: '#fff0f2' }}>
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>2</td>
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>주장추론</td>
                                                    <td style={{ padding: '10px', borderBottom: '1px solid #eee', color: '#e91e63', fontWeight: 'bold' }}>X</td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/*  2. 레벨테스트 TAB  */}
                        {activeTab === 'level' && (
                            <div id="tab-level" className="tab-content-wrap active">
                                <div style={{ background: '#fff3e0', border: '1px solid #ffe0b2', padding: '20px', borderRadius: '12px', marginBottom: '20px', fontWeight: 'bold', color: '#e65100' }}>
                                    <i className="fas fa-info-circle"></i> 백재형 학생은 KNS 대치본원 정규 레벨테스트(2026-03-01)를 통해 '중2외고전사고반-C'로 배정되었습니다.
                                </div>
                                <div className="dash-panel">
                                    <div className="panel-title"><i className="fas fa-trophy" style={{ color: '#FFB300' }}></i> 레벨테스트 평가 결과 요약</div>
                                    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                        <div style={{ flex: 1, paddingRight: '30px', borderRight: '1px solid #eee' }}>
                                            <h3 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '10px' }}>82.5<span style={{ fontSize: '18px', color: '#888' }}> / 100</span></h3>
                                            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>그래머(GR) 영역의 기본 점수는 훌륭하나 어휘(VO)에서 공백이 보입니다.</p>
                                        </div>
                                        <div style={{ flex: 1, height: '200px' }}>
                                            <canvas ref={levelBarChartRef}></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/*  3. GVR TAB  */}
                        {activeTab === 'gvr' && (
                            <div id="tab-gvr" className="tab-content-wrap active">
                                <div className="stat-grid-3">
                                    <div className="stat-card">
                                        <div className="sc-title">이번 주 GVR 점수 (AT 6회차)</div>
                                        <div className="sc-val">96점</div>
                                        <div className="sc-sub"><i className="fas fa-arrow-up"></i> 반 평균 81.5점 대비 +14.5</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="sc-title">누적 오답 문항 수</div>
                                        <div className="sc-val">2개</div>
                                        <div className="sc-sub"><i className="fas fa-minus"></i> 안정적인 학습 유지 중</div>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div className="dash-panel">
                                        <div className="panel-title"><i className="fas fa-chart-line" style={{ color: '#5D9CEC' }}></i> 개인 GVR 성적 추이 (영역별)</div>
                                        <div style={{ height: '250px' }}>
                                            <canvas ref={gvrPersonalTrendChartRef}></canvas>
                                        </div>
                                    </div>

                                    <div className="dash-panel">
                                        <div className="panel-title"><i className="fas fa-exclamation-triangle" style={{ color: '#E91E63' }}></i> 취약 유형 분석</div>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
                                            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                                                <span style={{ fontWeight: 'bold', color: '#555' }}>1위. 문법 (관계대명사)</span>
                                                <span style={{ color: '#E91E63', fontWeight: 'bold' }}>오답 3회</span>
                                            </li>
                                            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                                                <span style={{ fontWeight: 'bold', color: '#555' }}>2위. 어휘 (동의어)</span>
                                                <span style={{ color: '#E91E63', fontWeight: 'bold' }}>오답 2회</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="dash-panel">
                                    <div className="panel-title">
                                        <span><i className="fas fa-list" style={{ color: '#4CAF50' }}></i> 최신 GVR 문항별 상세 분석 (학생 개인)</span>
                                        <div>
                                            <select style={{ border: '1px solid #ddd', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', fontFamily: "'Pretendard'" }}>
                                                <option>AT 6회차 (최신)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', overflowX: 'auto' }}>
                                        <div style={{ minWidth: '800px', height: '250px' }}>
                                            <canvas ref={gvrPersonalErrorChartRef}></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
