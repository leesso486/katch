'use client';
import React, { useState } from 'react';

export default function TeacherInput() {
    const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'done'>('idle');
    const [formData, setFormData] = useState({
        passage: '',
        question: '',
        options: ['', ''],
        skill: 'Vocabulary (어휘)',
        type: '문맥 어휘 결정',
        level: 'Level 5 (고2 수준)'
    });

    const simulateUpload = () => {
        setUploadState('loading');
        setTimeout(() => {
            setUploadState('done');
            setFormData({
                passage: "Over the past several decades, there has been an increasing realization that...",
                question: "(A), (B), (C)의 각 네모 안에서 문맥에 맞는 낱말로 가장 적절한 것은?",
                options: ["① (A) decreasing (B) ignored (C) strict", "② (A) increasing (B) valued (C) loose"],
                skill: "Vocabulary (어휘)", type: "문맥 어휘 결정", level: "Level 5 (고2 모의고사 수준)"
            });
        }, 1500);
    };

    return (
        <div className="dash-container">
            <h1 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 25px 0' }}><i className="fas fa-cloud-upload-alt text-indigo-500"></i> 문항 DB 통합 업로더</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '20px' }}>
                <div className="tw-card">
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 20px 0' }}>문항 데이터 입력 (HWP/PDF 자동 추출)</h3>
                    <div 
                        onClick={uploadState === 'idle' ? simulateUpload : undefined}
                        style={{ 
                            border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '40px', textAlign: 'center', 
                            background: uploadState === 'loading' ? '#eff6ff' : '#f8fafc', marginBottom: '20px', cursor: 'pointer' 
                        }}
                    >
                        {uploadState === 'idle' && (
                            <>
                                <i className="fas fa-file-upload text-blue-500" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                                <div style={{ fontSize: '16px', fontWeight: 800 }}>한글(HWP), PDF 파일을 이 곳으로 끌어다 놓으세요</div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>AI가 지문, 문항, 보기를 자동으로 분류하여 입력창에 채워줍니다. (클릭하여 시뮬레이션)</div>
                            </>
                        )}
                        {uploadState === 'loading' && (
                            <>
                                <i className="fas fa-spinner fa-spin text-blue-500" style={{ fontSize: '36px', marginBottom: '15px' }}></i>
                                <div style={{ fontSize: '15px', fontWeight: 800 }}>AI 비전 분석 중... (지문을 분리하고 난이도를 측정합니다)</div>
                            </>
                        )}
                        {uploadState === 'done' && (
                            <>
                                <i className="fas fa-check-circle text-green-500" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                                <div style={{ fontSize: '16px', fontWeight: 800 }}>분석 완료! 문항 데이터와 선지가 자동 매핑되었습니다.</div>
                            </>
                        )}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div><label style={{ fontWeight: 700, fontSize: '13px', color: '#475569' }}>지문 텍스트</label><textarea className="tw-input" style={{ height: '150px' }} value={formData.passage} readOnly></textarea></div>
                        <div><label style={{ fontWeight: 700, fontSize: '13px', color: '#475569' }}>문항 (질문)</label><input type="text" className="tw-input" value={formData.question} readOnly /></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div><label style={{ fontWeight: 700, fontSize: '13px', color: '#475569' }}>선지 1</label><input type="text" className="tw-input" value={formData.options[0]} readOnly /></div>
                            <div><label style={{ fontWeight: 700, fontSize: '13px', color: '#475569' }}>선지 2</label><input type="text" className="tw-input" value={formData.options[1]} readOnly /></div>
                        </div>
                    </div>
                </div>

                <div className="tw-card" style={{ background: '#f8fafc', transition: '0.3s', boxShadow: uploadState === 'done' ? '0 0 0 4px #f43f5e' : '' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 20px 0' }}><i className="fas fa-magic text-pink-500"></i> AI 자동 태깅 시스템</h3>
                    <div style={{ fontSize: '13px', color: '#475569', marginBottom: '20px' }}>
                        업로드된 지문과 문항을 분석하여 KATCH 구조에 맞게 카테고리를 자동 분류합니다.
                    </div>
                    <div style={{ marginBottom: '15px' }}><label style={{ fontWeight: 700, fontSize: '12px' }}>주요 스킬 (과목)</label><select className="tw-select" value={formData.skill} readOnly><option>{formData.skill}</option></select></div>
                    <div style={{ marginBottom: '15px' }}><label style={{ fontWeight: 700, fontSize: '12px' }}>세부 유형</label><select className="tw-select" value={formData.type} readOnly><option>{formData.type}</option></select></div>
                    <div style={{ marginBottom: '25px' }}><label style={{ fontWeight: 700, fontSize: '12px' }}>출처 난이도</label><select className="tw-select" value={formData.level} readOnly><option>{formData.level}</option></select></div>
                    <button className="tw-btn solid-blue" style={{ width: '100%', padding: '15px' }} onClick={() => alert('문제은행 DB에 저장되었습니다.')}><i className="fas fa-database"></i> 문제은행 DB에 저장하기</button>
                </div>
            </div>
        </div>
    );
}
