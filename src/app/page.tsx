import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* 1. Top Header */}
      <div className="header-top-bar">
        <div className="container flex-between align-center">
          <div className="target-switch">
            <Link href="#" className="active">학생·학부모</Link>
            <Link href="#">가맹 원장·강사</Link>
          </div>
          <div>
            <Link href="http://pf.kakao.com/_sxlwcG" target="_blank" className="mr-15"><i className="fas fa-headset"></i> 고객센터 (카톡상담)</Link>
            <Link href="#">로그인 / 회원가입</Link>
          </div>
        </div>
      </div>
      <header className="bg-white" style={{ borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 90 }}>
        <div className="container main-gnb">
          <div className="logo">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: '28px', color: '#111', margin: 0, letterSpacing: '-1px' }}>
                KATCH<span style={{ color: '#E91E63', fontWeight: 900 }}>.</span>
              </h1>
            </Link>
          </div>
          <nav className="gnb-links" style={{ display: 'flex', gap: '30px', fontSize: '16px', fontWeight: 700 }}>
            <Link href="#" style={{ color: '#333', textDecoration: 'none' }}>진단테스트</Link>
            <Link href="#" style={{ color: '#333', textDecoration: 'none' }}>모의고사</Link>
            <Link href="#" style={{ color: '#333', textDecoration: 'none' }}>VOD 특강</Link>
            <Link href="#" style={{ color: '#333', textDecoration: 'none' }}>교재 스토어</Link>
            <Link href="#" className="text-orange" style={{ color: '#f57c00', textDecoration: 'none' }}><i className="fas fa-crown"></i> VIP 라운지</Link>
          </nav>
          <div className="header-utils" style={{ display: 'flex', gap: '15px', alignItems: 'center', fontSize: '20px', color: '#333' }}>
            <Link href="#"><i className="fas fa-chalkboard-teacher"></i></Link>
            <Link href="#"><i className="fas fa-bars"></i></Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Component */}
      <section className="hero-banner" style={{ position: 'relative', width: '100%', height: '450px', background: 'linear-gradient(135deg, #111 0%, #2A2A2A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden' }}>
        <div className="slide slide-bg1 active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span className="hero-badge text-blue" style={{ display: 'inline-block', padding: '5px 15px', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', marginBottom: '15px', color: '#2196F3' }}>수능 예측 솔루션 KATCH 론칭</span>
          <h2 className="hero-title" style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.3, marginBottom: '20px', letterSpacing: '-1px' }}>대치동 최상위권 4,500명의 리얼 데이터!<br/>초중등부터 시작하는 올인원 수능 플랫폼</h2>
          <p className="hero-desc" style={{ fontSize: '18px', opacity: 0.9, marginBottom: '30px' }}>단순 레벨테스트가 아닙니다. 수능 킬러문항 트렌드 분석부터 VOD, 교재까지<br/>상위 1%를 위한 대치동 시스템을 그대로 경험하세요.</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
            <Link href="#" className="hero-btn" style={{ background: '#FFC107', color: '#222', padding: '15px 35px', borderRadius: '30px', fontSize: '18px', fontWeight: 800, textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 15px rgba(255,193,7,0.4)', transition: 'transform 0.2s' }}>
              나의 예상 수능 등급 확인하기 <i className="fas fa-arrow-right"></i>
            </Link>
            <Link href="#" className="hero-btn" style={{ background: 'transparent', color: 'white', border: '2px solid white', padding: '15px 35px', borderRadius: '30px', fontSize: '18px', fontWeight: 800, textDecoration: 'none', display: 'inline-block', transition: 'transform 0.2s' }}>
              프리미엄 VOD 미리보기
            </Link>
          </div>
        </div>
      </section>
      
      {/* Test Neon DB Link */}
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Neon Database Connection Setup</h2>
        <p>The UI has been successfully mounted in Next.js.</p>
        <Link href="/api/db-test" style={{ padding: '10px 20px', background: '#3f51b5', color: 'white', borderRadius: '8px', textDecoration: 'none', marginTop: '20px', display: 'inline-block' }}>
          Test Database Connection
        </Link>
      </div>
    </>
  );
}
