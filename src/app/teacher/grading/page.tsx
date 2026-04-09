'use client';
import React, { useState } from 'react';

export default function TeacherGrading() {
    const [selectedStudent, setSelectedStudent] = useState({
        name: '김민지',
        answer: '상호 이타주의가 유지되려면 자신을 도와준 개체를 기억하고, 은혜를 갚지 않는 얌체족을 구별해내는 능력이 박쥐에게 필요하다.',
        score: 6
    });

    const [isSaved, setIsSaved] = useState(false);

    const handleSelect = (name: string, answer: string, score: number) => {
        setIsSaved(false);
        setSelectedStudent({ name, answer, score });
    };

    return (
        <div className="dash-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 900, margin: 0 }}><i className="fas fa-check-double text-indigo-500"></i> 서술형 채점 및 피드백</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <select className="tw-select" style={{ width: 'auto' }}><option>예비고1 특목고 배치고사 (15번 서술형)</option></select>
                    <button className="tw-btn outline"><i className="fas fa-print"></i> OMR 통합조회</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
                {/* 왼쪽 대기열 */}
                <div className="tw-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)' }}>
                    <div style={{ padding: '20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '14px', fontWeight: 800 }}>서술형 대기열 (총 42명)</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>미채점 <strong style={{ color: '#ef4444' }}>12명</strong> / 완료 30명</div>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                        <div 
                            style={{ padding: '15px', background: selectedStudent.name === '김민지' ? '#eff6ff' : 'transparent', border: selectedStudent.name === '김민지' ? '1px solid #bfdbfe' : '1px solid transparent', borderRadius: '10px', marginBottom: '10px', cursor: 'pointer' }}
                            onClick={() => handleSelect('김민지', '상호 이타주의가 유지되려면 자신을 도와준 개체를 기억하고, 은혜를 갚지 않는 얌체족을 구별해내는 능력이 박쥐에게 필요하다.', 6)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div><div style={{ fontSize: '14px', fontWeight: 800, color: selectedStudent.name === '김민지' ? '#1d4ed8' : '#334155' }}>김민지 학생 <i className="fas fa-exclamation-circle text-red-500"></i></div><div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>제출: 14:32</div></div>
                                <span style={{ fontSize: '10px', fontWeight: 800, background: '#fef2f2', color: '#ef4444', padding: '2px 6px', borderRadius: '4px' }}>채점 대기</span>
                            </div>
                        </div>

                        <div 
                            style={{ padding: '15px', background: selectedStudent.name === '이서준' ? '#eff6ff' : 'transparent', border: selectedStudent.name === '이서준' ? '1px solid #bfdbfe' : '1px solid transparent', borderRadius: '10px', marginBottom: '10px', cursor: 'pointer' }}
                            onClick={() => handleSelect('이서준', '박쥐들은 서로 피를 나누기 위해 과거에 도움 받은 친구만 기억해서 나눠줍니다.', 3)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div><div style={{ fontSize: '14px', fontWeight: 800, color: selectedStudent.name === '이서준' ? '#1d4ed8' : '#334155' }}>이서준 학생</div><div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>제출: 14:45</div></div>
                                <span style={{ fontSize: '10px', fontWeight: 800, background: '#fef2f2', color: '#ef4444', padding: '2px 6px', borderRadius: '4px' }}>채점 대기</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 오른쪽 채점 영역 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="tw-card" style={{ marginBottom: 0 }}>
                        <h3 style={{ fontSize: '18px', margin: '0 0 15px 0', fontWeight: 900 }}>{selectedStudent.name} 학생의 답안 <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>- 문항 15번 (배점 6점)</span></h3>
                        <div style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', padding: '20px', borderRadius: '8px', fontSize: '16px', lineHeight: 1.6, color: '#1e293b' }}>
                            {selectedStudent.answer}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '10px', textAlign: 'right' }}>시스템 1차 판독: <strong style={{ color: selectedStudent.score >= 5 ? '#10b981' : '#f59e0b' }}>유사도 {selectedStudent.score >= 5 ? '85%' : '45%'} ({selectedStudent.score >= 5 ? '합격권' : '주의'})</strong></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
                        <div className="tw-card" style={{ background: '#fffbeb', borderColor: '#fef3c7' }}>
                            <h4 style={{ fontSize: '15px', margin: '0 0 15px 0', color: '#d97706' }}><i className="fas fa-key"></i> 핵심 채점 기준표 (Rubric)</h4>
                            <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#92400e', marginBottom: '15px' }}><strong>모범 답안:</strong> 다른 개체를 개별적으로 인식(구별)하는 능력과 과거의 도움(사건)을 기억하는 능력이 필요하다.</div>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <span style={{ background: 'white', border: '1px solid #fcd34d', color: '#b45309', padding: '4px 10px', fontSize: '12px', fontWeight: 800, borderRadius: '20px' }}>✓ 개체 인식 (3점)</span>
                                <span style={{ background: 'white', border: '1px solid #fcd34d', color: '#b45309', padding: '4px 10px', fontSize: '12px', fontWeight: 800, borderRadius: '20px' }}>✓ 과거 기억 (3점)</span>
                            </div>
                        </div>

                        <div className="tw-card" style={{ background: '#f8fafc' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>최종 점수 확정</span>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                                    <input type="number" 
                                        value={selectedStudent.score} 
                                        onChange={(e) => setSelectedStudent({...selectedStudent, score: Number(e.target.value)})}
                                        style={{ width: '60px', fontSize: '24px', fontWeight: 900, textAlign: 'center', border: '2px solid #cbd5e1', borderRadius: '8px', color: '#1e293b' }} />
                                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#94a3b8' }}>/ 6 점</span>
                                </div>
                            </div>

                            {selectedStudent.score <= 3 && (
                                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#ef4444', marginBottom: '8px' }}><i className="fas fa-magic"></i> AI 추천: 유사 오답 팩 발송</div>
                                    <div style={{ fontSize: '12px', color: '#991b1b', marginBottom: '12px' }}>이 문항의 점수가 3점 이하라면, 어법(구문독해) 보충을 위한 쌍둥이 클리닉 배포를 권장합니다.</div>
                                    <button className="tw-btn solid-pink" style={{ width: '100%', fontSize: '12px', padding: '8px' }} onClick={() => alert('클리닉 전송 완료!')}><i className="fas fa-copy"></i> 쌍둥이 클리닉 전송</button>
                                </div>
                            )}

                            <button className="tw-btn solid-blue" style={{ width: '100%', fontSize: '15px' }} onClick={() => setIsSaved(true)}>
                                {isSaved ? <><i className="fas fa-check"></i> 저장 완료</> : <><i className="fas fa-save"></i> 저장 및 다음 학생 채점</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
