'use client';
import React, { useState } from 'react';

export default function TeacherBank() {
    const [cartCount, setCartCount] = useState(15);
    const [cartItems, setCartItems] = useState([
        { id: 1, type: '빈칸추론', added: false },
        { id: 2, type: '순서배열', added: false }
    ]);

    const handleToggleCart = (id: number) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                if (!item.added) setCartCount(c => c + 1);
                else setCartCount(c => c - 1);
                return { ...item, added: !item.added };
            }
            return item;
        }));

        // Cart animation
        const cartBox = document.getElementById('cartBox');
        if (cartBox) {
            cartBox.style.transform = 'scale(1.05)';
            cartBox.style.borderColor = '#3b82f6';
            setTimeout(() => {
                cartBox.style.transform = 'scale(1)';
                cartBox.style.borderColor = '#bfdbfe';
            }, 200);
        }
    };

    return (
        <div className="dash-container">
            <h1 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 25px 0' }}><i className="fas fa-layer-group text-indigo-500"></i> 문제은행 출제 및 학습지 생성</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 340px', gap: '20px' }}>
                
                {/* 필터 사이드바 */}
                <div className="tw-card" style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 15px 0' }}><i className="fas fa-filter"></i> 문항 검색 필터</h3>
                    <div style={{ marginBottom: '15px' }}><label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>과목</label><select className="tw-select mt-1"><option>영어</option></select></div>
                    <div style={{ marginBottom: '15px' }}><label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>출처</label><select className="tw-select mt-1"><option>2026 수능완성</option><option>자체 교재</option></select></div>
                    <div style={{ marginBottom: '15px' }}><label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>유형</label><select className="tw-select mt-1"><option>빈칸추론</option><option>어법결정</option></select></div>
                    <button className="tw-btn solid-blue" style={{ width: '100%' }}><i className="fas fa-search"></i> 검색</button>
                    
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                       <button className="tw-btn outline" style={{ width: '100%', fontSize: '13px', color: '#475569' }}><i className="fas fa-magic"></i> 조건부 자동출제 (AI 추천)</button>
                    </div>
                </div>

                {/* 문항 리스트 */}
                <div className="tw-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '15px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: 800, display: 'flex', justifyContent: 'space-between' }}>
                        검색 결과 (120건) <span style={{ color: '#3b82f6', cursor: 'pointer' }}><i className="fas fa-check-double"></i> 전체 담기</span>
                    </div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', height: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                        
                        <div style={{ border: cartItems[0].added ? '2px solid #3b82f6' : '1px solid #cbd5e1', borderRadius: '10px', padding: '15px', position: 'relative', cursor: 'grab', background: cartItems[0].added ? '#eff6ff' : 'white' }}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                <button className={`tw-btn ${cartItems[0].added ? 'solid-blue' : 'outline'}`} style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => handleToggleCart(1)}>
                                    {cartItems[0].added ? <><i className="fas fa-check"></i> 담김</> : '+ 담기'}
                                </button>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}><span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>빈칸추론</span><span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>난이도: 상</span><span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>2026 수능완성 p.14</span></div>
                            <div style={{ fontSize: '14px', color: '#1e293b', lineHeight: 1.5 }}>According to the theory of reciprocal altruism, memory is required to... (중략)</div>
                        </div>

                        <div style={{ border: cartItems[1].added ? '2px solid #3b82f6' : '1px solid #cbd5e1', borderRadius: '10px', padding: '15px', position: 'relative', cursor: 'grab', background: cartItems[1].added ? '#eff6ff' : 'white' }}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                <button className={`tw-btn ${cartItems[1].added ? 'solid-blue' : 'outline'}`} style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => handleToggleCart(2)}>
                                    {cartItems[1].added ? <><i className="fas fa-check"></i> 담김</> : '+ 담기'}
                                </button>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}><span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>순서배열</span><span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>난이도: 중</span></div>
                            <div style={{ fontSize: '14px', color: '#1e293b', lineHeight: 1.5 }}>The most important role of the government is to provide...</div>
                        </div>

                    </div>
                </div>

                {/* 출제 바구니 (Cart) */}
                <div className="tw-card" style={{ background: '#eff6ff', borderColor: '#bfdbfe', height: 'fit-content', position: 'sticky', top: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 15px 0' }}><i className="fas fa-shopping-basket text-blue-500"></i> 미니테스트 (담은 문항)</h3>
                    <div id="cartBox" style={{ background: 'white', borderRadius: '8px', padding: '15px', border: '1px solid #bfdbfe', marginBottom: '15px', transition: '0.2s' }}>
                        총 <strong style={{ color: '#3b82f6', fontSize: '18px' }}>{cartCount}문제</strong><br/>
                        <a href="#" style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 700, display: 'inline-block', marginTop: '5px' }}>자세히 보기 / 순서 편집</a>
                    </div>
                    <label style={{ fontWeight: 700, fontSize: '12px', color: '#475569', display: 'block', marginBottom: '5px' }}>출제 타이틀</label>
                    <input type="text" className="tw-input mb-4" defaultValue="고1 외고반 중간대비 미니모의고사" />
                    
                    <label style={{ fontWeight: 700, fontSize: '12px', color: '#475569', display: 'block', marginTop: '10px', marginBottom: '5px' }}>배포 유형</label>
                    <select className="tw-select mb-4"><option>온라인 CBT (App 전송)</option><option>종이 학습지 (PDF 다운)</option></select>
                    
                    <button className="tw-btn solid-blue" style={{ width: '100%', fontSize: '15px', marginTop: '15px' }} onClick={() => alert('배포 완료!')}><i className="fas fa-paper-plane"></i> 수강생에게 지금 배포</button>
                    <button className="tw-btn outline" style={{ width: '100%', fontSize: '15px', marginTop: '10px' }}><i className="fas fa-file-pdf text-red-500"></i> PDF 및 정답지 인쇄</button>
                </div>
            </div>
        </div>
    );
}
