"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './student.css'; // Light theme css

Chart.register(ChartDataLabels);

export default function StudentPage() {
    const avgCompareChartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        // Light Theme Chart Defaults
        Chart.defaults.color = '#64748b'; // text-secondary
        Chart.defaults.font.family = "'Pretendard', sans-serif";
        
        if (avgCompareChartRef.current && !chartInstance.current) {
            chartInstance.current = new Chart(avgCompareChartRef.current.getContext('2d')!, {
                type: 'radar',
                data: {
                    labels: ['어휘', '문법', '독해', '듣기', '수학', '논리'], // VO, GR, RC, LC, MT, SC in Kor
                    datasets: [{
                        label: '나의 성취도',
                        data: [82, 85, 68, 90, 75, 80],
                        backgroundColor: 'rgba(37, 99, 235, 0.2)', // primary with opacity
                        borderColor: '#2563eb', // primary
                        pointBackgroundColor: '#2563eb',
                        borderWidth: 2,
                        pointHoverRadius: 6
                    }, {
                        label: '수강반 평균',
                        data: [75, 80, 75, 85, 68, 70],
                        backgroundColor: 'transparent',
                        borderColor: '#94a3b8',
                        pointBackgroundColor: '#94a3b8',
                        borderWidth: 2,
                        borderDash: [5, 5]
                    }]
                },
                options: { 
                    responsive: true, maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false }, // Legend is off as per image, or we could keep it. Image doesn't show legend
                        datalabels: {display:false} 
                    },
                    scales: { 
                        r: { 
                            min: 0, max: 100, 
                            ticks: {display: false},
                            grid: {color: '#e2e8f0'}, // border-color
                            angleLines: {color: '#e2e8f0'},
                            pointLabels: {color: '#1e293b', font: {size: 13, weight: 'bold'} as any}
                        } 
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    return (
        <div className="app-layout">
            
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon"><i className="fas fa-shield-alt"></i></div>
                    <div>
                        <div className="logo-text">Accelerator</div>
                        <div className="logo-sub">STUDENT PORTAL</div>
                    </div>
                </div>
                
                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link active">
                            <i className="fas fa-border-all"></i> Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="fas fa-book-open"></i> My Homework
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="fas fa-file-signature"></i> GVR Test
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="fas fa-store"></i> Points Store
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="fas fa-user"></i> My Info
                        </a>
                    </li>
                </ul>
                
                <div className="sidebar-footer">
                    <div className="help-center">
                        <div className="help-center-title">Help Center</div>
                        <div className="help-center-text">Need assistance with your homework?</div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-wrapper">
                
                {/* Header */}
                <header className="top-header">
                    <div className="breadcrumb">
                        Main &gt; <span className="current">Dashboard</span>
                    </div>
                    <div className="user-status">
                        <div className="status-badge streak">
                            <i className="fas fa-fire"></i> 5일 연속
                        </div>
                        <div className="status-badge points">
                            <i className="fas fa-coins" style={{color:'#f59e0b'}}></i> 12,450 P
                        </div>
                        <img src="https://ui-avatars.com/api/?name=Jihoon&background=eff6ff&color=2563eb" alt="Profile" className="user-avatar" />
                    </div>
                </header>

                {/* Hero Banner */}
                <div className="hero-banner">
                    <div className="hero-text">
                        <h1>반가워요, 지훈님!<br/>오늘도 성장을 시작해볼까요?</h1>
                        <p>현재 5일 연속 학습 중입니다. 2일 더 완료하면 추가 포인트를<br/>받을 수 있어요!</p>
                        <div className="week-days">
                            <div className="day-badge completed">월</div>
                            <div className="day-badge completed">화</div>
                            <div className="day-badge completed">수</div>
                            <div className="day-badge completed">목</div>
                            <div className="day-badge active">금</div>
                            <div className="day-badge">토</div>
                            <div className="day-badge">일</div>
                        </div>
                    </div>
                    <div className="hero-rank">
                        <i className="fas fa-medal"></i>
                        <div className="rank-label">이번 주 랭킹</div>
                        <div className="rank-value">상위 5%</div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    
                    {/* Left Column */}
                    <div className="grid-left">
                        {/* Today's Tasks */}
                        <div className="section-title">
                            <h2>오늘의 과제</h2>
                            <a href="#" className="section-link">전체 보기</a>
                        </div>
                        
                        <div className="task-list" style={{marginBottom: '32px'}}>
                            
                            <div className="task-item priority">
                                <div className="task-icon" style={{backgroundColor: '#eff6ff', color: '#2563eb'}}>
                                    <i className="fas fa-book-reader"></i>
                                </div>
                                <div className="task-content">
                                    <span className="task-badge">READING</span>
                                    <div className="task-title">GVR Chapter 5: 문장 구조의 이해</div>
                                    <div className="task-progress">
                                        <div className="progress-bar-bg">
                                            <div className="progress-bar-fill" style={{width: '60%'}}></div>
                                        </div>
                                        <span className="progress-text">60%</span>
                                    </div>
                                </div>
                                <div className="task-action">
                                    <button className="btn-primary">계속하기</button>
                                </div>
                            </div>
                            
                            <div className="task-item">
                                <div className="task-icon" style={{backgroundColor: '#fef2f2', color: '#ef4444'}}>
                                    <i className="fas fa-play-circle"></i>
                                </div>
                                <div className="task-content">
                                    <span className="task-badge lecture">LECTURE</span>
                                    <div className="task-title">Level 2 심화 영문법 - 관계대명사</div>
                                    <div className="task-desc">강의 시간: 45분</div>
                                </div>
                                <div className="task-action">
                                    <button className="btn-outline">시청하기</button>
                                </div>
                            </div>
                            
                            <div className="task-item">
                                <div className="task-icon" style={{backgroundColor: '#f0fdf4', color: '#16a34a'}}>
                                    <i className="fas fa-sort-alpha-up"></i>
                                </div>
                                <div className="task-content">
                                    <span className="task-badge voca">VOCABULARY</span>
                                    <div className="task-title">수담비 필수 50단어</div>
                                    <div className="task-desc">오늘의 목표: 50개 / 현재 0개</div>
                                </div>
                                <div className="task-action">
                                    <button className="btn-success">학습 시작</button>
                                </div>
                            </div>

                        </div>

                        {/* Recent Test Results */}
                        <div className="section-title">
                            <h2>최근 테스트 결과</h2>
                        </div>
                        
                        <div className="white-card" style={{padding: '0', overflow: 'hidden'}}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>테스트 명</th>
                                        <th>날짜</th>
                                        <th>점수</th>
                                        <th>상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>주간 어휘 평가 - Week 4</td>
                                        <td className="td-date">2023.10.24</td>
                                        <td className="td-score">95/100</td>
                                        <td><span className="status-chip chip-success">합격</span></td>
                                    </tr>
                                    <tr>
                                        <td>GVR 문법 성취도 평가</td>
                                        <td className="td-date">2023.10.22</td>
                                        <td className="td-score">82/100</td>
                                        <td><span className="status-chip chip-success">합격</span></td>
                                    </tr>
                                    <tr>
                                        <td>Mid-Term Mock Test</td>
                                        <td className="td-date">2023.10.15</td>
                                        <td className="td-score" style={{color: '#ef4444'}}>68/100</td>
                                        <td><span className="status-chip chip-danger">재응시 권고</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    
                    {/* Right Column */}
                    <div className="grid-right">
                        
                        {/* Competency Analysis */}
                        <div className="white-card">
                            <h2 style={{fontSize: '18px', fontWeight: '800', margin: '0 0 20px 0'}}>학습 역량 분석</h2>
                            <div className="chart-container">
                                <canvas ref={avgCompareChartRef}></canvas>
                            </div>
                            <div className="chart-analysis">
                                <span>문법</span> 영역이 지난주 대비 <span className="up">12%</span> 상승했습니다! 독해 영역 보충이 필요해 보입니다.
                            </div>
                        </div>

                        {/* Recent Activities & Points */}
                        <div className="white-card">
                            <h2 style={{fontSize: '18px', fontWeight: '800', margin: '0 0 20px 0'}}>최근 활동 & 포인트</h2>
                            
                            <div className="activity-list">
                                <div className="activity-item">
                                    <div className="activity-icon calendar"><i className="fas fa-calendar-check"></i></div>
                                    <div className="activity-details">
                                        <div className="activity-title">일일 출석 체크</div>
                                        <div className="activity-time">오늘 09:12</div>
                                    </div>
                                    <div className="activity-points points-plus">+100 P</div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon check"><i className="fas fa-check-double"></i></div>
                                    <div className="activity-details">
                                        <div className="activity-title">GVR Chapter 4 완료</div>
                                        <div className="activity-time">어제 21:45</div>
                                    </div>
                                    <div className="activity-points points-plus">+500 P</div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon trophy"><i className="fas fa-trophy"></i></div>
                                    <div className="activity-details">
                                        <div className="activity-title">어휘 테스트 만점 보상</div>
                                        <div className="activity-time">2023.10.24</div>
                                    </div>
                                    <div className="activity-points points-plus">+1,000 P</div>
                                </div>
                                <div className="activity-item" style={{borderBottom: 'none'}}>
                                    <div className="activity-icon shop"><i className="fas fa-shopping-bag"></i></div>
                                    <div className="activity-details">
                                        <div className="activity-title">편의점 5천원권 교환</div>
                                        <div className="activity-time">2023.10.20</div>
                                    </div>
                                    <div className="activity-points points-minus">-5,000 P</div>
                                </div>
                            </div>
                            
                            <button className="btn-full">포인트 내역 더보기</button>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}
