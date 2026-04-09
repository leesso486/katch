'use client';
import React, { useState } from 'react';

export default function TeacherInput() {
    const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'done'>('idle');
    const [formData, setFormData] = useState({
        passage: '',
        question: '',
        options: ['', '']
    });

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setUploadState('loading');
        
        // Simulate API call
        setTimeout(() => {
            setFormData({
                passage: 'According to the theory of reciprocal altruism...',
                question: '다음 글의 빈칸에 들어갈 말로 가장 적절한 것은?',
                options: ['선택지 1번 내용', '선택지 2번 내용']
            });
            setUploadState('done');
        }, 1500);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div className="dash-container">
            <h1 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 25px 0' }}><i className="fas fa-cloud-upload-alt text-indigo-500"></i> 문항 DB 통합 업로더</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '20px' }}>
                <div className="tw-card">
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 20px 0' }}>문항 데이터 입력 (HWP/PDF 자동 추출)</h3>
                    
                    <div 
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{ 
                            border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '40px', textAlign: 'center', 
                            background: uploadState === 'loading' ? '#eff6ff' : '#f8fafc', marginBottom: '20px', cursor: 'pointer',
                            borderColor: uploadState === 'loading' ? '#3b82f6' : '#cbd5e1', transition: '0.3s'
                        }}
                    >
                        {uploadState === 'loading' ? (
                            <div>
                                <i className="fas fa-spinner fa-spin text-blue-500" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                                <div style={{ fontSize: '16px', fontWeight: 800, color: '#3b82f6' }}>AI Vision 모델이 문항을 추출하고 있습니다...</div>
                            </div>
                        ) : (
                            <div>
                                <i className="fas fa-file-upload text-blue-500" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                                <div style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>한글(HWP), PDF 파일을 이 곳으로 끌어다 놓으세요</div>
                                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '5px' }}>AI가 지문, 문항, 보기를 자동으로 분류하여 입력창에 채워줍니다. (텍스트 복붙도 지원)</div>
                            </div>
                        )}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label style={{ fontWeight: 700, fontSize: '13px', color: '#475569' }}>지문 텍스트</label>
                            <textarea className="tw-input" style={{ height: '150px', marginTop: '8px' }} value={formData.passage} onChange={e => setFormData({...formData, passage: e.target.value})} placeholder="여기에 지문이 입력됩니다..."></textarea>
                        </div>
                        <div>
                            <label style={{ fontWeight: 700, fontSize: '13px', color: '#475569' }}>문항 (질문)</label>
                            <input type="text" className="tw-input" style={{ marginTop: '8px' }} value={formData.question} onChange={e => setFormData({...formData, question: e.target.value})} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#475569' }}>선지 1</label>
                                <input type="text" className="tw-input" style={{ marginTop: '8px' }} value={formData.options[0]} onChange={e => setFormData({...formData, options: [e.target.value, formData.options[1]]})} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#475569' }}>선지 2</label>
                                <input type="text" className="tw-input" style={{ marginTop: '8px' }} value={formData.options[1]} onChange={e => setFormData({...formData, options: [formData.options[0], e.target.value]})} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tw-card" style={{ background: '#f8fafc' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 20px 0' }}><i className="fas fa-magic text-pink-500"></i> AI 자동 태깅 시스템</h3>
                    <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#475569', marginBottom: '20px' }}>
                        업로드된 지문과 문항을 분석하여 KATCH 데이터베이스 구조에 맞게 카테고리를 자동 분류합니다. (수정 가능)
                    </div>
                    {uploadState === 'done' ? (
                        <>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 700, fontSize: '12px', color: '#3b82f6' }}>주요 스킬 (과목) <i className="fas fa-sparkles"></i></label>
                                <select className="tw-select" style={{ marginTop: '5px', background: '#eff6ff', borderColor: '#bfdbfe' }}><option>Reading (독해)</option><option>Grammar</option></select>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 700, fontSize: '12px', color: '#3b82f6' }}>세부 유형 <i className="fas fa-sparkles"></i></label>
                                <select className="tw-select" style={{ marginTop: '5px', background: '#eff6ff', borderColor: '#bfdbfe' }}><option>빈칸 추론</option><option>주제 파악</option></select>
                            </div>
                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ fontWeight: 700, fontSize: '12px', color: '#3b82f6' }}>출처 난이도 (Lexile 기반 계산) <i className="fas fa-sparkles"></i></label>
                                <select className="tw-select" style={{ marginTop: '5px', background: '#eff6ff', borderColor: '#bfdbfe' }}><option>Level 4 (고1 모의고사 수준)</option></select>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 700, fontSize: '12px', color: '#64748b' }}>주요 스킬 (과목)</label>
                                <select className="tw-select" style={{ marginTop: '5px', background: '#f1f5f9' }} disabled><option>기다리는 중...</option></select>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 700, fontSize: '12px', color: '#64748b' }}>세부 유형</label>
                                <select className="tw-select" style={{ marginTop: '5px', background: '#f1f5f9' }} disabled><option>기다리는 중...</option></select>
                            </div>
                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ fontWeight: 700, fontSize: '12px', color: '#64748b' }}>출처 난이도</label>
                                <select className="tw-select" style={{ marginTop: '5px', background: '#f1f5f9' }} disabled><option>기다리는 중...</option></select>
                            </div>
                        </>
                    )}
                    <button className="tw-btn solid-blue" style={{ width: '100%', fontSize: '16px', padding: '15px' }} onClick={() => alert('문제은행 사전에 성공적으로 업로드되었습니다!')}><i className="fas fa-database"></i> 문제은행 DB에 저장하기 (10 P 획득)</button>
                    <div style={{ textAlign: 'center', marginTop: '15px' }}><a href="#" style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>대량 엑셀 업로드로 전환</a></div>
                </div>
            </div>
        </div>
    );
}
