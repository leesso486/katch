'use client';
import React, { useState } from 'react';

export default function TeacherDashboard() {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isTwinModalOpen, setIsTwinModalOpen] = useState(false);
    const [kakaoSent, setKakaoSent] = useState(false);

    // Mock Students Data
    const students = [
        { name: '최유나', status: 'danger', score: 65, trend: '80,75,60,65', missing: 3 },
        { name: '김민지', status: 'danger', score: 55, trend: '70,60,50,55', missing: 2 },
        { name: '박민준', status: 'warning', score: 78, trend: '70,75,80,78', missing: 1 },
        { name: '이서아', status: 'stable', score: 95, trend: '90,92,94,95', missing: 0 },
        { name: '정우진', status: 'stable', score: 88, trend: '85,88,86,88', missing: 0 },
    ];

    const handleSelectStudent = (stu: any) => {
        setSelectedStudent(stu);
    };

    return (
        <div className="dash-container">
            {/* ACTION-ORIENTED: RED FLAG WIDGETS */}
            <div className="red-flag-container">
                <div className="red-flag-card">
                    <div className="red-flag-header">과제 일주일 연속 3회 미제출 (경고) <i className="fas fa-exclamation-triangle"></i></div>
                    <div className="red-flag-value">2명 <span style={{fontSize:'12px', color:'#ef4444', fontWeight:600}}>+1명 (위험)</span></div>
                    <button className="tw-btn outline" style={{fontSize:'12px', padding:'6px', color:'#be123c', borderColor:'#fda4af'}}>상담/알림톡 일괄 발송</button>
                </div>
                <div className="red-flag-card" style={{background:'#fffbeb', borderColor:'#fcd34d', borderLeftColor:'#f59e0b'}}>
                    <div className="red-flag-header" style={{color:'#b45309'}}>연속 성적 하락 (주의 요망) <i className="fas fa-chart-line"></i></div>
                    <div className="red-flag-value" style={{color:'#92400e'}}>4명 <span style={{fontSize:'12px', color:'#d97706', fontWeight:600}}>-2명 (개선)</span></div>
                    <button className="tw-btn outline" style={{fontSize:'12px', padding:'6px', color:'#b45309', borderColor:'#fcd34d'}}>상담 스케줄 잡기</button>
                </div>
                <div className="tw-card" style={{flex: 1, padding:'15px', marginBottom:0, background:'#eff6ff', borderColor:'#bfdbfe'}}>
                    <div style={{fontSize:'13px', fontWeight:800, color:'#1d4ed8', marginBottom:'10px'}}>오늘의 강의 할 일</div>
                    <div style={{fontSize:'14px', fontWeight:700, color:'#1e293b'}}><i className="fas fa-check-circle text-blue-500"></i> 서술형 주관식 채점 (12명)</div>
                </div>
            </div>

            <div className="tw-layout">
                {/* 1. 클래스/수강생 목록 (좌측 패널) */}
                <div className="tw-card h-100" style={{ marginBottom: 0 }}>
                    <div className="tw-card-title"><i className="fas fa-users text-blue-500"></i> 수강생 통합 관제</div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <select className="tw-select" style={{ flex: 1, padding: '8px 12px' }}>
                            <option>중2외고전사고반-C</option><option>고1 심화반</option>
                        </select>
                        <button className="tw-btn-icon"><i className="fas fa-sort-amount-down"></i></button>
                    </div>
                    {students.map((stu, i) => (
                        <div key={i} className={`stu-list-item ${selectedStudent?.name === stu.name ? 'active' : ''}`} onClick={() => handleSelectStudent(stu)}>
                            <div>
                                <div className="stu-name">
                                    {stu.status === 'danger' && <i className="fas fa-exclamation-circle text-pink-500"></i>}
                                    {stu.name}
                                </div>
                                <div className="stu-meta">미제출 {stu.missing}건 • 종합 {stu.score}점</div>
                            </div>
                            <i className="fas fa-chevron-right text-slate-300"></i>
                        </div>
                    ))}
                </div>

                {/* 2. 주간 과제(GVR) 상세 테이블 (중앙 패널) */}
                <div className="tw-card h-100" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div className="tw-card-title" style={{ margin: 0 }}><i className="fas fa-tasks text-green-500"></i> GVR 서술형/오답 데이터</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="tw-btn outline" style={{ padding: '6px 12px', fontSize: '12px' }}><i className="fas fa-download text-green-600"></i> 엑셀 출력</button>
                        </div>
                    </div>
                    
                    <div className="table-container" style={{ flexGrow: 1 }}>
                        <table className="rt-table" style={{ minWidth: '100%' }}>
                            <thead>
                                <tr>
                                    <th>주차/회차</th><th>상태</th><th>주관식 채점</th><th>객관식 오답률</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>1주차 (어법)</strong></td>
                                    <td><span className="status-badge status-danger">위험</span></td>
                                    <td style={{ color: '#ef4444', fontWeight: 800 }}>채점대기 (10문항)</td>
                                    <td>65%</td>
                                </tr>
                                <tr>
                                    <td><strong>2주차 (독해)</strong></td>
                                    <td><span className="status-badge status-warning">주의</span></td>
                                    <td style={{ color: '#10b981', fontWeight: 800 }}>완료</td>
                                    <td>40%</td>
                                </tr>
                                <tr>
                                    <td><strong>3주차 (어휘)</strong></td>
                                    <td><span className="status-badge status-stable">우수</span></td>
                                    <td style={{ color: '#10b981', fontWeight: 800 }}>완료</td>
                                    <td>15%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. AI 상담 어시스턴트 & 1:1 CRM (우측 패널) */}
                <div className="tw-card h-100" style={{ marginBottom: 0, padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{selectedStudent ? selectedStudent.name : '홍길동'} 학생 밀착 CRM</span>
                        </div>
                        <div style={{ marginTop: '10px', display: 'flex', gap: '6px' }}>
                            <span className="tag-badge weak"><i className="fas fa-search"></i> 동의어 취약</span>
                            <span className="tag-badge weak"><i className="fas fa-book-dead"></i> 과제 제출 불량</span>
                        </div>
                    </div>

                    <div style={{ padding: '20px', flexGrow: 1, overflowY: 'auto' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b', marginBottom: '10px' }}>
                            <i className="fas fa-magic text-indigo-500"></i> AI 상담 코멘트 초안 제안기
                        </h3>
                        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '15px', marginBottom: '25px' }}>
                            <textarea className="tw-textarea" style={{ marginBottom: '10px' }} defaultValue="[KATCH AI 코멘트 초안] 어머님! 이번 주 학생의 성취도를 보면 독해(RC) 파트는 훌륭하지만, 어법에서 빈틈이 있습니다. 맞춤형 쌍둥이 클리닉을 배정했습니다."></textarea>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="tw-btn solid-blue" style={{ flex: 1, fontSize: '13px' }} onClick={() => setIsTwinModalOpen(true)}>
                                    저장 및 카톡(알림) 연동
                                </button>
                            </div>
                        </div>

                        <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b', marginBottom: '10px' }}>
                            <i className="fas fa-file-pdf text-red-500"></i> 원클릭 학생 리포트 생성
                        </h3>
                        <button className="tw-btn outline" style={{ width: '100%', justifyContent: 'space-between', padding: '15px' }} onClick={() => alert('PDF 다운로드 완료')}>
                            <span style={{ fontWeight: 800 }}>이번 주 1P 쌍둥이 과제(PDF)</span>
                            <i className="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* VOD / CRM Modal */}
            {isTwinModalOpen && (
                <div className="modal-overlay active">
                    <div className="modal-content" style={{ maxWidth: '500px', textAlign: 'center' }}>
                        <button className="modal-close" onClick={() => setIsTwinModalOpen(false)}><i className="fas fa-times"></i></button>
                        {!kakaoSent ? (
                            <>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '20px' }}>상담 기록 및 처방 배포</h2>
                                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
                                    오답 데이터를 기반으로 추출된 맞춤형 VOD 강의와 쌍둥이 10제가 앱으로 즉시 전송되며, 코멘트 내용이 학부모님께 카카오톡으로 발송됩니다.
                                </p>
                                <button className="tw-btn solid-pink" style={{ width: '100%', padding: '15px' }} onClick={() => setTimeout(() => setKakaoSent(true), 500)}>
                                    처방 및 알림톡 발송 승인
                                </button>
                            </>
                        ) : (
                            <div style={{ padding: '30px 0' }}>
                                <i className="fas fa-check-circle text-green-500" style={{ fontSize: '60px', marginBottom: '20px' }}></i>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#10b981', marginBottom: '10px' }}>발송 완료</h2>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
