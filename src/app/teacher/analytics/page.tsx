'use client';
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function TeacherAnalytics() {
    const trendChartRef = useRef<HTMLCanvasElement>(null);
    const topTypeChartRef = useRef<HTMLCanvasElement>(null);
    const chartInstances = useRef<{ [key: string]: Chart | null }>({});
    const [selectedQuestion, setSelectedQuestion] = useState({ q: 'Q3', type: 'GR', rate: 70 });

    useEffect(() => {
        if (trendChartRef.current && !chartInstances.current['trend']) {
            const ctxTrend = trendChartRef.current.getContext('2d');
            if (ctxTrend) {
                chartInstances.current['trend'] = new Chart(ctxTrend, {
                    type: 'bar',
                    data: {
                        labels: ['LC(듣기)', 'GR(어법)', 'VO(어휘)', 'RC(독해)', 'SC(구문)', 'MT(모의)'],
                        datasets: [
                            { label: 'AT 1', data: [28, 45, 21, 18, 30, 45], backgroundColor: '#93c5fd' },
                            { label: 'AT 2', data: [27, 45, 25, 18, 32, 40], backgroundColor: '#bbf7d0' },
                            { label: 'AT 3', data: [29, 45, 24, 19, 35, 50], backgroundColor: '#7dd3fc' },
                        ]
                    },
                    options: { responsive:true, maintainAspectRatio:false }
                });
            }
        }
        if (topTypeChartRef.current && !chartInstances.current['top']) {
            const ctxTop = topTypeChartRef.current.getContext('2d');
            if (ctxTop) {
                chartInstances.current['top'] = new Chart(ctxTop, {
                    type: 'bar',
                    data: {
                        labels: ['어법(도치)', '어휘(다의어)', '문장삽입', '독해력', '빈칸추론'],
                        datasets: [{ label: '오답률', data: [70, 48, 35, 20, 15], backgroundColor: ['#ef4444', '#f97316', '#3b82f6', '#94a3b8', '#cbd5e1'] }]
                    },
                    options: { responsive:true, maintainAspectRatio:false }
                });
            }
        }

        return () => {
            if(chartInstances.current['trend']) { chartInstances.current['trend'].destroy(); chartInstances.current['trend'] = null; }
            if(chartInstances.current['top']) { chartInstances.current['top'].destroy(); chartInstances.current['top'] = null; }
        };
    }, []);

    return (
        <div className="dash-container">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'25px' }}>
                <div>
                    <h1 style={{fontSize:'24px', fontWeight:900, margin:'0 0 5px 0'}}><i className="fas fa-chart-line text-indigo-500"></i> 중2외고전사고반-C <span style={{color:'#64748b', fontWeight:600}}>| GVR 정밀 진단</span></h1>
                    <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                        <span style={{fontSize:'13px', fontWeight:800, color:'#e11d48'}}><i className="fas fa-fire"></i> 우리 반 취약 TOP3</span>
                        <span className="tag-badge weak">어법-도치</span><span className="tag-badge weak">어휘-다의어</span><span className="tag-badge weak">빈칸추론</span>
                    </div>
                </div>
            </div>

            <div style={{ display:'flex', gap:'20px', marginBottom:'20px', flexWrap:'wrap' }}>
                <div className="tw-card" style={{ flex: '1 1 55%', margin:0, position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', top:0, right:0, background:'#fef2f2', color:'#ef4444', fontSize:'11px', padding:'4px 10px', borderBottomLeftRadius:'8px', fontWeight:800 }}><i className="fas fa-bolt"></i> 채점 즉시 실시간 갱신됨</div>
                    <h3 style={{ fontSize:'17px', fontWeight:900, margin:'0 0 10px 0' }}><i className="fas fa-th text-pink-500"></i> GVR 문항별 오답률 히트맵</h3>
                    <div className="hm-grid">
                        {[
                            {q:1, c:'low'},{q:2, c:'low'},{q:3, c:'high', t:'65%'},{q:4, c:'low'},{q:5, c:'mid', t:'45%'},
                            {q:6, c:'low'},{q:7, c:'crit', t:'85%'},{q:8, c:'low'},{q:9, c:'mid'},{q:10, c:'low'},
                            {q:11, c:'high', t:'66%'},{q:12, c:'crit', t:'90%'},{q:13, c:'low'},{q:14, c:'mid'},{q:15, c:'low'},
                            {q:16, c:'low'},{q:17, c:'low'},{q:18, c:'low'},{q:19, c:'high', t:'60%'},{q:20, c:'low'},
                            {q:21, c:'low'},{q:22, c:'mid', t:'42%'},{q:23, c:'low'},{q:24, c:'crit', t:'88%'},{q:25, c:'low'}
                        ].map((item) => (
                            <div key={item.q} className={`hm-cell hm-${item.c}`} title={item.t ? `오답률: ${item.t}` : ''}>{item.q}</div>
                        ))}
                    </div>
                </div>

                <div className="tw-card" style={{ flex: '1 1 40%', margin:0, background:'#f8fafc' }}>
                    <h3 style={{ fontSize:'16px', fontWeight:900, margin:'0 0 10px 0' }}><i className="fas fa-hand-paper text-yellow-500"></i> 실시간 학생 질문(Q&A) 현황 <span className="status-badge" style={{background:'#3b82f6', color:'white', marginLeft:'5px'}}>LIVE</span></h3>
                    <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                        <button className="tw-btn outline" style={{ justifyContent:'space-between', padding:'12px', background:'white', width:'100%' }}>
                            <div style={{fontWeight:900, color:'#9f1239', fontSize:'15px'}}>12번 문항 (가장 많음!)</div>
                            <div style={{fontSize:'13px', fontWeight:700, color:'#475569'}}><span style={{color:'#e11d48'}}><i className="fas fa-fire"></i> 18명</span> 요청</div>
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'20px', marginBottom:'20px' }}>
                <div className="tw-card" style={{ marginBottom:0 }}>
                    <h3 style={{ fontSize:'16px', fontWeight:800, margin:'0 0 20px 0' }}><i className="fas fa-search text-indigo-500"></i> 6대 영역별 상세 오답률</h3>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'20px', maxHeight:'280px', overflowY:'auto' }}>
                        <div>
                            <div style={{ fontSize:'13px', fontWeight:800, textAlign:'center', paddingBottom:'8px', borderBottom:'2px solid #e2e8f0', marginBottom:'15px' }}>GR (어법)</div>
                            <div className={`prog-row ${selectedQuestion.q === 'Q3' ? 'active-row' : ''}`} onClick={() => setSelectedQuestion({q:'Q3', type:'GR', rate:70})}>
                                <span className="prog-label">Q3</span><div className="prog-bg"><div className="prog-fill" style={{ width:'70%', background:'#4ade80' }}></div></div><span className="prog-val" style={{color:'#ef4444'}}>70%</span>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize:'13px', fontWeight:800, textAlign:'center', paddingBottom:'8px', borderBottom:'2px solid #e2e8f0', marginBottom:'15px' }}>RC (독해)</div>
                            <div className={`prog-row ${selectedQuestion.q === 'Q7' ? 'active-row' : ''}`} onClick={() => setSelectedQuestion({q:'Q7', type:'RC', rate:85})}>
                                <span className="prog-label">Q7</span><div className="prog-bg"><div className="prog-fill" style={{ width:'85%', background:'#5eead4' }}></div></div><span className="prog-val" style={{color:'#ef4444'}}>85%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tw-card" style={{ marginBottom:0, background:'#f8fafc' }}>
                    <h3 style={{ fontSize:'16px', fontWeight:900, margin:'0 0 15px 0' }}>{selectedQuestion.q.replace('Q', '')}번 문항 오답 분석 ({selectedQuestion.type})</h3>
                    <table className="tw-table" style={{ background:'white', borderRadius:'8px', fontSize:'13px', width:'100%', textAlign:'center' }}>
                        <thead><tr style={{ background:'#eff6ff' }}><th>문항정보</th><th>답안 기록</th><th>선택 분포</th></tr></thead>
                        <tbody>
                            <tr style={{ background:'#fef2f2' }}>
                                <td style={{ fontWeight:900 }}>{selectedQuestion.q}</td>
                                <td style={{ color:'#ef4444', fontWeight:900 }}><i className="fas fa-exclamation-circle"></i> ② 번 오답</td>
                                <td style={{ color:'#ef4444', fontWeight:800 }}>{selectedQuestion.rate}%</td>
                            </tr>
                            <tr style={{ background:'#ecfdf5' }}>
                                <td></td>
                                <td style={{ color:'#10b981', fontWeight:900 }}><i className="fas fa-check-circle"></i> ④ 번 (정답)</td>
                                <td style={{ color:'#10b981', fontWeight:800 }}>{100 - selectedQuestion.rate}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ display:'flex', gap:'20px', marginBottom:'20px' }}>
                <div className="tw-card" style={{ flex:'1 1 50%', margin:0 }}><div style={{ height:'250px' }}><canvas ref={trendChartRef}></canvas></div></div>
                <div className="tw-card" style={{ flex:'1 1 50%', margin:0 }}><div style={{ height:'250px' }}><canvas ref={topTypeChartRef}></canvas></div></div>
            </div>

            <div className="tw-card" style={{ background:'linear-gradient(to right, #1e293b, #0f172a)', color:'white', border:'none' }}>
                <h3 style={{ fontSize:'18px', fontWeight:900, margin:'0 0 15px 0' }}><i className="fas fa-magic text-pink-500"></i> AI 약점 클리닉 쌍둥이 과제 배포기</h3>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
                    <div style={{ background:'rgba(255,255,255,0.1)', padding:'20px', borderRadius:'12px' }}>
                        <span style={{ fontSize:'11px', fontWeight:800, background:'#ef4444', color:'white', padding:'3px 8px', borderRadius:'4px' }}>오답 1위</span>
                        <h4 style={{ fontSize:'16px', fontWeight:800, margin:'10px 0' }}>어법-도치 구문 마스터팩</h4>
                        <button className="tw-btn solid-pink" style={{ width:'100%' }} onClick={() => alert('배포 완료!')}>취약 학생 15명에게 PDF 과제 배포</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
