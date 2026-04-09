'use client';
import React, { useState } from 'react';

export default function TeacherDashboard() {
    const [selectedStudent, setSelectedStudent] = useState({
        name: '김민지',
        status: 'danger', // 'danger', 'warning', 'stable'
        phone: '010-8822-1234',
        parentPhone: '010-1234-5678 (어머니)',
        history: '어머니 통화 부재중. 문자 메세지 남김 (내일 재상담 예정)',
        aiText: '최근 2회차 평가 성취도 급락. 숙제 미이행율 60% 상회. 학부모 심층 상담이 매우 시급합니다!',
    });

    const [isTwinModalOpen, setIsTwinModalOpen] = useState(false);
    const [timelines, setTimelines] = useState([
        { time: '어제 14:30 | 통화', content: '학부모 요청사항 접수 - 문법 특강 신청 문의 (안내 완료)' },
        { time: '어제 10:15 | 시스템', content: '[주간 리포트] 정기 발송 완료' }
    ]);

    const handleSelectStudent = (name: string, status: string) => {
        if(status === 'danger') {
            setSelectedStudent({
                name, status,
                phone: '010-8822-1234', parentPhone: '010-1234-5678 (어머니)',
                history: '어머니 통화 부재중. 문자 메세지 남김 (내일 재상담 예정)',
                aiText: '최근 2회차 평가 성취도 급락. 숙제 미이행율 60% 상회. 학부모 심층 상담이 매우 시급합니다!'
            });
        } else if(status === 'warning') {
            setSelectedStudent({
                name, status,
                phone: '010-2345-6789', parentPhone: '010-9876-5432 (아버지)',
                history: '단어 시험 재통과 완료. 학습 의지는 좋으나 어휘 암기법 변경 필요.',
                aiText: '어휘(VO) 파트 점수가 평균 이하로 떨어지고 있습니다. 동의어 특강 미니테스트 처방을 권장합니다.'
            });
        } else {
            setSelectedStudent({
                name, status,
                phone: '010-1111-2222', parentPhone: '010-3333-4444 (어머니)',
                history: '모의고사 1등급 안정권 진입 칭찬 톡 발송. 상위권 교재로 변경 안내 완료.',
                aiText: ''
            });
        }
    };

    const handleSendTwinClinic = () => {
        setTimelines([{ time: '방금 전 | 알림톡', content: '[쌍둥이 클리닉] 오답노트 배포 완료' }, ...timelines]);
        setIsTwinModalOpen(false);
    };

    return (
        <div className="dash-container">
            <div className="tw-layout">
                {/* LEFT PANEL */}
                <div className="tw-left">
                    <div className="tw-card" style={{ padding: '18px' }}>
                        <div style={{ fontWeight: 900, fontSize: '18px' }}>이은혜 강사님 <i className="fas fa-check-circle text-green-500" style={{ fontSize: '14px' }}></i></div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>고등부 전임 | VIP 멤버</div>
                        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                            <div style={{ flex: 1, background: '#fef2f2', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 700 }}>위험 학생</div><div style={{ fontSize: '18px', fontWeight: 900, color: '#b91c1c' }}>1명</div>
                            </div>
                            <div style={{ flex: 1, background: '#eff6ff', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 700 }}>질문 목록</div><div style={{ fontSize: '18px', fontWeight: 900, color: '#1d4ed8' }}>5건</div>
                            </div>
                        </div>
                    </div>

                    <div className="tw-card h-100">
                        <div className="tw-card-title" style={{ marginBottom: '12px' }}><i className="fas fa-users text-indigo-500"></i> 수강생 관리 리스트</div>
                        <select className="tw-select" style={{ marginBottom: '12px' }}>
                            <option>외고 최상위반 (12명)</option>
                            <option>일반고 내신대비반 (10명)</option>
                        </select>
                        <input type="text" placeholder="이름 검색..." className="tw-select" style={{ marginBottom: '15px', padding: '8px 14px' }} />
                        
                        <div style={{ flexGrow: 1, overflowY: 'auto', marginRight: '-5px' }}>
                            <div className={`stu-list-item ${selectedStudent.name === '최유나' ? 'active' : ''}`} onClick={() => handleSelectStudent('최유나', 'danger')}>
                                <div>
                                    <div className="stu-name">최유나 <i className="fas fa-exclamation-triangle text-red-500" style={{ fontSize: '12px' }}></i></div>
                                    <div className="stu-meta">출석: 85% | 과제: 60%</div>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#ef4444', background: '#fef2f2', padding: '2px 6px', borderRadius: '4px' }}>성적하락</span>
                            </div>

                            <div className={`stu-list-item ${selectedStudent.name === '박민준' ? 'active' : ''}`} onClick={() => handleSelectStudent('박민준', 'warning')}>
                                <div>
                                    <div className="stu-name">박민준 <i className="fas fa-exclamation-circle text-orange-500" style={{ fontSize: '12px' }}></i></div>
                                    <div className="stu-meta">출석: 100% | 과제: 90%</div>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#d97706', background: '#fffbeb', padding: '2px 6px', borderRadius: '4px' }}>단어취약</span>
                            </div>

                            <div className={`stu-list-item ${selectedStudent.name === '이서아' ? 'active' : ''}`} onClick={() => handleSelectStudent('이서아', 'stable')}>
                                <div>
                                    <div className="stu-name">이서아 <i className="fas fa-check-circle text-green-500" style={{ fontSize: '12px' }}></i></div>
                                    <div className="stu-meta">출석: 100% | 과제: 100%</div>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>양호</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CENTER PANEL */}
                <div className="tw-center">
                    <div className="tw-card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900 }}>
                                    {selectedStudent.name.charAt(1)}
                                </div>
                                <div>
                                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>
                                        {selectedStudent.name} 
                                        {selectedStudent.status === 'danger' && <span style={{ fontSize: '11px', background: '#fef2f2', color: '#ef4444', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px' }}><i className="fas fa-exclamation-triangle"></i> 위험강조</span>}
                                        {selectedStudent.status === 'warning' && <span style={{ fontSize: '11px', background: '#fffbeb', color: '#d97706', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px' }}><i className="fas fa-exclamation-circle"></i> 관찰요망</span>}
                                        {selectedStudent.status === 'stable' && <span style={{ fontSize: '11px', background: '#ecfdf5', color: '#10b981', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px' }}><i className="fas fa-check-circle"></i> 우수/안정</span>}
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>개인 폰: {selectedStudent.phone} | 학부모: {selectedStudent.parentPhone}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="tw-btn outline"><i className="fas fa-comment-dots"></i> 카톡 전송</button>
                                <button className="tw-btn solid-blue"><i className="fas fa-phone"></i> 학부모 전화</button>
                            </div>
                        </div>

                        {selectedStudent.status !== 'stable' && (
                            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', background: selectedStudent.status === 'danger' ? '#fef2f2' : '#fffbeb', borderLeft: `4px solid ${selectedStudent.status === 'danger' ? '#ef4444' : '#f59e0b'}` }}>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: selectedStudent.status === 'danger' ? '#ef4444' : '#d97706', marginBottom: '8px' }}>
                                    <i className="fas fa-robot"></i> KATCH AI 종합 소견
                                </div>
                                <div style={{ fontSize: '14px', lineHeight: 1.5, color: selectedStudent.status === 'danger' ? '#7f1d1d' : '#92400e', fontWeight: 600 }}>
                                    {selectedStudent.aiText}
                                </div>
                                <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                                    <button className="tw-btn solid-pink" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setIsTwinModalOpen(true)}><i className="fas fa-magic"></i> 맞춤형 보충학습자료(쌍둥이) 즉시 생성</button>
                                </div>
                            </div>
                        )}

                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <span style={{ fontSize: '15px', fontWeight: 900 }}><i className="fas fa-history text-indigo-500"></i> 주요 상담/터치 기록</span>
                                <button style={{ border: 'none', background: 'none', color: '#3b82f6', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>+ 기록 추가</button>
                            </div>
                            <div className="tw-timeline">
                                <div className="tw-tl-item" style={{ marginBottom: '10px' }}>
                                    <div className="tw-tl-dot bg-blue"></div>
                                    <div className="tw-tl-time">최신 (저장됨)</div>
                                    <div className="tw-tl-content" style={{ color: '#3b82f6' }}>{selectedStudent.history}</div>
                                </div>
                                {timelines.map((tl, i) => (
                                    <div className="tw-tl-item" key={i}>
                                        <div className="tw-tl-dot bg-blue"></div>
                                        <div className="tw-tl-time">{tl.time}</div>
                                        <div className="tw-tl-content">{tl.content}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                <textarea className="tw-textarea" placeholder="새로운 상담 또는 피드백 내용을 이곳에 기입하세요..."></textarea>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <button className="tw-btn solid-blue" style={{ padding: '8px 16px', fontSize: '13px' }}>기록 추가</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL - TASKS */}
                <div className="tw-right">
                    <div className="tw-card h-100" style={{ padding: '20px', background: 'linear-gradient(to bottom, #fff, #f8fafc)' }}>
                        <div className="tw-card-title"><i className="fas fa-list-check text-blue-500"></i> 내 할 일 목록</div>
                        <div style={{ border: '1px solid #cbd5e1', borderRadius: '10px', background: 'white', padding: '15px', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '11px', background: '#fef2f2', color: '#ef4444', padding: '3px 8px', borderRadius: '12px', fontWeight: 800 }}>긴급 (1)</span>
                                <span style={{ fontSize: '11px', color: '#64748b' }}>오늘까지</span>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', marginBottom: '5px' }}>서술형 오답 주관식 채점</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>[강의] 수능완성 대비반 - 총 12명 대기중</div>
                            <button className="tw-btn outline" style={{ width: '100%', marginTop: '10px', fontSize: '12px', padding: '6px' }}>채점실로 이동</button>
                        </div>
                        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', background: 'white', padding: '15px', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '12px', fontWeight: 800 }}>일반 (2)</span>
                                <span style={{ fontSize: '11px', color: '#64748b' }}>내일까지</span>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', marginBottom: '5px' }}>이번 주 GVR 리포트 발송 검토</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>[시스템] 자동 생성된 리포트 최종 승인 대기</div>
                            <button className="tw-btn outline" style={{ width: '100%', marginTop: '10px', fontSize: '12px', padding: '6px' }}>리포트실 이동</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Twin Clinic Modal */}
            {isTwinModalOpen && (
                <div className="modal-overlay active">
                    <div className="modal-content" style={{ maxWidth: '600px' }}>
                        <button className="modal-close" onClick={() => setIsTwinModalOpen(false)}><i className="fas fa-times"></i></button>
                        <h2 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '20px' }}><i className="fas fa-magic text-pink-500"></i> 자동 쌍둥이 클리닉 (보충자료) 생성</h2>
                        
                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>대상 학생</span>
                                <span style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>{selectedStudent.name}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>취약 진단 유형</span>
                                <span style={{ fontSize: '14px', fontWeight: 900, color: '#ef4444' }}>서술형 영작 및 배열 (최근 정답률 30% 미만)</span>
                            </div>
                        </div>

                        <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>보충 문항 개수 (AI 시스템 추천)</label>
                        <select className="tw-select" style={{ marginBottom: '20px' }}>
                            <option>5 문항 (가벼운 복습용)</option>
                            <option defaultValue="10">10 문항 (추천)</option>
                            <option>20 문항 (집중 훈련용)</option>
                        </select>

                        <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '25px', background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '15px', borderRadius: '8px' }}>
                            <i className="fas fa-info-circle"></i> 생성 버튼을 누르시면, KATCH DB에 수록된 동일 난이도의 동형 문제들이 자동으로 조합되어 학생의 모바일 App으로 즉시 전송됩니다.
                        </div>

                        <button className="tw-btn solid-blue" style={{ width: '100%', fontSize: '16px', padding: '14px' }} onClick={handleSendTwinClinic}>
                            <i className="fas fa-paper-plane"></i> 학생에게 즉시 발송하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
