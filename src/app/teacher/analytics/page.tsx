'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TeacherAnalytics() {
    const trendChartRef = useRef<HTMLCanvasElement>(null);
    const radarChartRef = useRef<HTMLCanvasElement>(null);
    const chartInstances = useRef<{ [key: string]: Chart | null }>({});

    useEffect(() => {
        if (trendChartRef.current && !chartInstances.current['trend']) {
            const ctxTrend = trendChartRef.current.getContext('2d');
            if (ctxTrend) {
                chartInstances.current['trend'] = new Chart(ctxTrend, {
                    type: 'line',
                    data: {
                        labels: ['1주차', '2주차', '3주차', '4주차'],
                        datasets: [
                            { label: 'Grammar', data: [75, 78, 80, 85], borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension:0.4 },
                            { label: 'Vocabulary', data: [85, 82, 88, 80], borderColor: '#e91e63', backgroundColor: '#e91e63', tension:0.4 },
                            { label: 'Reading', data: [60, 65, 72, 75], borderColor: '#10b981', backgroundColor: '#10b981', tension:0.4 }
                        ]
                    },
                    options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'top'}}}
                });
            }
        }

        if (radarChartRef.current && !chartInstances.current['radar']) {
            const ctxRadar = radarChartRef.current.getContext('2d');
            if (ctxRadar) {
                chartInstances.current['radar'] = new Chart(ctxRadar, {
                    type: 'radar',
                    data: {
                        labels: ['문맥 어휘', '순서 배열', '문장 구조 분석', '주제 파악', '수일치'],
                        datasets: [{
                            label: '우리 반 평균 성취율',
                            data: [65, 59, 80, 81, 56],
                            backgroundColor: 'rgba(59,130,246,0.2)',
                            borderColor: '#3b82f6',
                            pointBackgroundColor: '#3b82f6'
                        }]
                    },
                    options: { responsive:true, maintainAspectRatio:false, scales: { r: { min:0, max:100 } } }
                });
            }
        }

        return () => {
            if(chartInstances.current['trend']) { chartInstances.current['trend'].destroy(); chartInstances.current['trend'] = null; }
            if(chartInstances.current['radar']) { chartInstances.current['radar'].destroy(); chartInstances.current['radar'] = null; }
        };
    }, []);

    return (
        <div className="dash-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 900, margin: 0 }}><i className="fas fa-chart-line text-indigo-500"></i> 주간 GVR 학습 분석 (Custom Analytics)</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <select className="tw-select" style={{ width: 'auto' }}><option>1분기 4주차 종합 데이터</option></select>
                    <button className="tw-btn outline"><i className="fas fa-download"></i> 학부모 리포트 일괄 생성</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="tw-card">
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 20px 0' }}>전체 클래스 영역별 성취도 (GVR)</h3>
                    <div style={{ height: '300px' }}><canvas ref={trendChartRef}></canvas></div>
                </div>
                <div className="tw-card">
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 20px 0' }}>클래스 평균 레이더 차트</h3>
                    <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}><canvas ref={radarChartRef}></canvas></div>
                </div>
            </div>

            <div className="tw-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>이번 주 최다 취약 유형 (Top 5) <span style={{ fontSize: '12px', fontWeight: 600, color: '#ef4444', background: '#fef2f2', padding: '4px 8px', borderRadius: '8px', marginLeft: '10px' }}>자동 생성된 쌍둥이 클리닉 권장</span></h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#ef4444', marginBottom: '5px' }}>68%</div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>추론 (빈칸)</div><div style={{ fontSize: '11px', color: '#64748b', marginTop: '5px' }}>오답률 1위</div>
                        <button className="tw-btn solid-pink" style={{ marginTop: '15px', width: '100%', fontSize: '11px', padding: '6px' }}>클리닉 배포</button>
                    </div>
                    {[
                        { rate: '62%', title: '서술형 배열', rank: '2위', color: '#f97316' },
                        { rate: '55%', title: '시제/수일치', rank: '3위', color: '#f59e0b' },
                        { rate: '48%', title: '어휘 (동의어)', rank: '4위', color: '#64748b' },
                        { rate: '42%', title: '문장 삽입', rank: '5위', color: '#64748b' }
                    ].map((item, idx) => (
                        <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '24px', fontWeight: 900, color: item.color, marginBottom: '5px' }}>{item.rate}</div>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>{item.title}</div><div style={{ fontSize: '11px', color: '#64748b', marginTop: '5px' }}>오답률 {item.rank}</div>
                            <button className="tw-btn outline" style={{ marginTop: '15px', width: '100%', fontSize: '11px', padding: '6px' }}>유사문제 보기</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
