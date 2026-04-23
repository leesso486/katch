import React from 'react';
import Link from 'next/link';
import './teacher_globals.css';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="teacher-root">
            {/* Topbar */}
            <div className="ml-topbar">
                <div className="ml-topbar-left">
                    <div className="ml-logo"><Link href="/">KATCH<span>.</span></Link></div>
                    <div className="ml-page-title">강사 워크스페이스</div>
                </div>
                <div className="ml-topbar-right">
                    <div className="role-toggle">
                        <Link href="/my_learning">
                            <button className="role-btn"><i className="fas fa-user-graduate"></i> 학생</button>
                        </Link>
                        <button className="role-btn active"><i className="fas fa-chalkboard-teacher"></i> 강사/관리자</button>
                    </div>
                    <a href="#" className="user-pts"><i className="fas fa-bell"></i> 알림 3</a>
                    <div className="user-info">
                        <div className="user-avatar">이</div>
                        <span style={{ fontSize: '14px', fontWeight: 600 }}>이은혜 강사</span>
                    </div>
                </div>
            </div>

            <div className="teacher-content-wrapper">
                {/* Sidebar */}
                <div className="admin-sidebar">
                    <div style={{ padding: '25px 20px', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(15,23,42,0))', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: '0 0 5px 0' }}>이은혜 강사님</h2>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>고등관 전임 / KATCH 관리자</p>
                    </div>
                    
                    <nav className="as-nav" style={{ padding: '20px 15px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', margin: '0 0 10px 10px', letterSpacing: '1px' }}>HOME</div>
                        <Link href="/teacher" className="as-nav-item active" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', color: '#cbd5e1', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', marginBottom: '20px' }}>
                            <i className="fas fa-home" style={{ width: '20px', textAlign: 'center' }}></i> 대시보드 홈
                        </Link>

                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', margin: '10px 0 10px 10px', letterSpacing: '1px' }}>학습 관리</div>
                        <Link href="/teacher/grading" className="as-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 15px', color: '#cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '5px' }}>
                            <i className="fas fa-check-double" style={{ width: '20px', textAlign: 'center' }}></i> 서술형 채점 / 피드백
                        </Link>
                        <Link href="/teacher/analytics" className="as-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 15px', color: '#cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '5px' }}>
                            <i className="fas fa-chart-line" style={{ width: '20px', textAlign: 'center' }}></i> 주간 GVR 분석
                        </Link>
                        <Link href="/teacher" className="as-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 15px', color: '#cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '5px' }}>
                            <i className="fas fa-users-cog" style={{ width: '20px', textAlign: 'center' }}></i> 수강생 관리(조회)
                        </Link>
                        
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', margin: '25px 0 10px 10px', letterSpacing: '1px' }}>콘텐츠 관리</div>
                        <Link href="/teacher/input" className="as-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 15px', color: '#cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '5px' }}>
                            <i className="fas fa-cloud-upload-alt" style={{ width: '20px', textAlign: 'center' }}></i> 문항 업로드 (DB)
                        </Link>
                        <Link href="/teacher/bank" className="as-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 15px', color: '#cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '5px' }}>
                            <i className="fas fa-layer-group" style={{ width: '20px', textAlign: 'center' }}></i> 문제은행 출제
                        </Link>
                        
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', margin: '25px 0 10px 10px', letterSpacing: '1px' }}>커뮤니티</div>
                        <Link href="/teacher" className="as-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 15px', color: '#cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                            <i className="fas fa-store" style={{ width: '20px', textAlign: 'center' }}></i> 지식 마켓 & 라운지
                        </Link>
                    </nav>
                </div>

                <div className="main-wrapper">
                    {children}
                </div>
            </div>
        </div>
    );
}
