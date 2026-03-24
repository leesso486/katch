import os
import re

lt_path = r'c:\Users\SsoHot\Desktop\수능사이트시안\katch-web\public\level_test.html'
with open(lt_path, 'r', encoding='utf-8') as f:
    lt_html = f.read()

# Make Level Test Bright Premium
lt_style = """
        body { background-color: #f8fafd; font-family: 'Pretendard', sans-serif; color: #111; margin:0; }
        .text-gradient { background: linear-gradient(135deg, #1565C0, #0277BD); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .header-top-bar { background: #f0f2f5; padding: 5px 0; font-size: 12px; color: #666; border-bottom: 1px solid #e0e0e0; }
        .target-switch { display: inline-flex; background: #e0e4e8; border-radius: 20px; overflow: hidden; }
        .target-switch a { padding: 4px 15px; color: #555; text-decoration: none; font-weight: bold; transition: 0.2s; }
        .target-switch a.active { background: #111; color: white; }
        .main-gnb { display: flex; align-items: center; justify-content: space-between; padding: 15px 0; }
        .main-gnb .logo h1 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 28px; color: #111; margin: 0; letter-spacing: -1px; }
        .main-gnb .logo .dot { color: #E91E63; }
        .gnb-links { display: flex; gap: 30px; font-size: 16px; font-weight: 700; }
        .gnb-links a { color: #333; text-decoration: none; transition: 0.2s; }
        .gnb-links a:hover { color: #E91E63; }
        .header-utils { display: flex; gap: 15px; align-items: center; font-size: 20px; color: #333; }

        .lt-hero { padding: 100px 0 140px; background: radial-gradient(circle at top right, #ffffff 0%, #f0f4f8 100%); text-align: center; border-bottom: 1px solid #eee; position:relative; overflow:hidden;}
        .lt-tag { display: inline-flex; background: rgba(233,30,99,0.1); color: #E91E63; padding: 8px 20px; border-radius: 30px; font-size: 13px; font-weight: 800; margin-bottom: 25px; }
        .lt-title { font-size: 52px; font-weight: 900; color: #111; letter-spacing: -1.5px; line-height: 1.25; margin-bottom: 25px; }
        .lt-desc { font-size: 18px; color: #555; line-height: 1.7; margin-bottom: 60px; font-weight:500;}
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width:900px; margin:0 auto; margin-top: 40px; }
        .feat-item { padding: 35px 25px; background: rgba(255,255,255,0.8); border-radius: 20px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 15px 35px rgba(0,0,0,0.04); text-align: left; }
        .feat-title { font-size: 18px; font-weight: 900; color: #111; margin-bottom: 10px; }
        .feat-desc { font-size: 14px; color: #666; line-height: 1.6; }
        
        .prog-section { padding: 80px 0 120px; background: #f8fafd; }
        .sec-header { text-align: center; margin-bottom: 60px; }
        .sec-title { font-size: 38px; font-weight: 900; color: #111; }
        .prog-card { background: white; border-radius: 24px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 20px 50px rgba(0,0,0,0.05); margin-bottom: 40px; padding: 40px; }
        .pc-header { display:flex; justify-content:space-between; border-bottom: 1px solid #f0f0f0; padding-bottom: 25px; }
        .pc-tag { display: inline-flex; background: #e3f2fd; color: #1E88E5; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 800; margin-bottom: 15px; }
        .pc-title { font-size: 28px; font-weight: 900; color: #111; margin: 0; }
        .pc-desc { font-size: 15px; color: #555; line-height: 1.7; margin-top: 15px; max-width: 800px; }
        .pc-body { display: flex; justify-content: space-between; align-items: center; background: #fafafa; padding: 25px 30px; border-radius: 16px; border: 1px solid #eee; margin-top: 30px; }
        .pc-meta { display: flex; gap: 40px; }
        .pcm-label { font-size: 13px; color: #888; font-weight: 800; display:block; margin-bottom:5px; }
        .pcm-val { font-size: 16px; font-weight: 900; color: #111; }
        .pc-action { display: flex; align-items: center; gap: 20px; }
        .pc-price { font-size: 24px; font-weight: 900; color: #E91E63; }
        .btn-apply { background: #111; color: #fff; padding: 16px 36px; border-radius: 12px; font-size: 16px; font-weight: 800; text-decoration: none; border:none; cursor:pointer;}
        .btn-notify-outline { background: white; color: #333; padding: 16px 36px; border-radius: 12px; font-size: 16px; font-weight: 800; border: 1px solid #ddd; cursor:pointer;}
        
        .reg-modal-overlay { display:none; }
"""
lt_html = re.sub(r'<style>.*?</style>', f'<style>\n{lt_style}\n    </style>', lt_html, flags=re.DOTALL)

body_html = r"""
<!-- 1. Top Header -->
    <div class="header-top-bar">
        <div class="container flex-between align-center">
            <div class="target-switch">
                <a href="dashboard_online.html" class="active">학생·학부모</a>
                <a href="problem_bank.html">가맹 원장·강사</a>
            </div>
            <div>
                <a href="http://pf.kakao.com/_sxlwcG" target="_blank" class="mr-15" style="color:inherit; text-decoration:none;"><i class="fas fa-headset"></i> 고객센터 (카톡상담)</a>
                <a href="signup_select.html" style="color:inherit; text-decoration:none;">로그인 / 회원가입</a>
            </div>
        </div>
    </div>
    <header class="bg-white" style="border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 90;">
        <div class="container main-gnb">
            <div class="logo">
                <a href="index.html" style="text-decoration:none;"><h1>KATCH<span style="color:#E91E63; font-weight:900;">.</span></h1></a>
            </div>
            <nav class="gnb-links">
                <a href="student_diagnostics.html">진단테스트</a>
                <a href="level_test.html">레벨테스트</a>
                <a href="problem_bank.html">문제은행</a>
                <a href="store_vod.html">VOD 인강</a>
                <a href="store_book.html">교재 스토어</a>
                <a href="lounge.html" class="text-orange"><i class="fas fa-crown"></i> VIP 라운지</a>
            </nav>
            <div class="header-utils">
                <a href="my_learning.html" title="MY 학습 진단" style="color:inherit;"><i class="fas fa-chalkboard-teacher"></i></a>
                <a href="#" style="color:inherit;"><i class="fas fa-bars"></i></a>
            </div>
        </div>
    </header>

    <!-- Premium Clean Hero -->
    <div class="lt-hero">
        <div class="container">
            <div class="lt-tag"><i class="fas fa-gem"></i> PLATINUM ADMISSION</div>
            <h1 class="lt-title">최상위 1%를 위한 독보적 관문.<br><span class="text-gradient">KATCH 입학 레벨테스트</span></h1>
            <p class="lt-desc">단순한 레벨 측정이 아닙니다. 대치동 극상위권 데이터를 바탕으로 약점을 정밀하게 해부하고,<br>맞춤 설계합니다.</p>
            <div class="feature-grid">
                <div class="feat-item"><div class="feat-title">초정밀 다차원 진단 시스템</div><div class="feat-desc">대치동 최상위권 DB를 기반으로 취약점을 면밀히 파악.</div></div>
                <div class="feat-item"><div class="feat-title">오차율 0% 수능 커리큘럼</div><div class="feat-desc">1:1 최적화 경로를 완벽히 예측합니다.</div></div>
                <div class="feat-item"><div class="feat-title">1:1 프리미엄 리포트</div><div class="feat-desc">AI 진단 엔진이 결론을 짓습니다.</div></div>
            </div>
        </div>
    </div>

    <!-- Programs Listing -->
    <div class="prog-section">
        <div class="container" style="max-width:1100px; margin:0 auto;">
            <div class="sec-header">
                <h2 class="sec-title">PREMIUM ADMISSION EXAM</h2>
            </div>
            <div class="prog-card">
                <div class="pc-header">
                    <div class="pc-info">
                        <div class="pc-tag"><i class="fas fa-fire"></i> 상시 모집</div>
                        <h3 class="pc-title">KATCH 마스터 클래스 신입생 선발 평가</h3>
                        <p class="pc-desc">강남대치 최상위권의 압도적인 성취를 가능케 한 정규 커리큘럼 선발 고사.</p>
                    </div>
                </div>
                <div class="pc-body">
                    <div class="pc-meta">
                        <div class="pcm-item"><span class="pcm-label">대상</span><span class="pcm-val">예비 고1</span></div>
                        <div class="pcm-item"><span class="pcm-label">비용</span><span class="pcm-val">20,000 원</span></div>
                    </div>
                    <div class="pc-action">
                        <div class="pc-price">20,000 원</div>
                        <button class="btn-apply" onclick="alert('결제 창으로 이동합니다.')">평가 접수 결제 <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
            <div class="prog-card">
                <div class="pc-header">
                    <div class="pc-info">
                        <div class="pc-tag" style="background:#fce4ec; color:#E91E63;">특별 편입</div>
                        <h3 class="pc-title">외고/자사고 최상위 특별 편입반</h3>
                        <p class="pc-desc">극한의 내신 서바이벌에서 위치를 진단합니다.</p>
                    </div>
                </div>
                <div class="pc-body">
                    <div class="pc-meta">
                        <div class="pcm-item"><span class="pcm-label">마감</span><span class="pcm-val">접수 종료</span></div>
                    </div>
                    <div class="pc-action">
                        <button class="btn-notify-outline">알림 신청하기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
"""

lt_html = re.sub(r'<!-- 1\. Top Header -->.*<!-- Footer -->', body_html + '\n<!-- Footer -->', lt_html, flags=re.DOTALL)
with open(lt_path, 'w', encoding='utf-8') as f: f.write(lt_html)


# 2. student_diagnostics.html (Make Space Theme)
sd_path = r'c:\Users\SsoHot\Desktop\수능사이트시안\katch-web\public\student_diagnostics.html'
with open(sd_path, 'r', encoding='utf-8') as f:
    sd_html = f.read()

sd_css = r"""
        body { background-color: #030014; font-family: 'Pretendard', sans-serif; color:white; }
        .header-top-bar { background: #0c0023; padding: 5px 0; font-size: 12px; color: #aaa; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .target-switch { display: inline-flex; background: rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; }
        .target-switch a { padding: 4px 15px; color: #ccc; text-decoration: none; font-weight: bold; transition: 0.2s; }
        .target-switch a.active { background: #111; color: white; }
        
        .main-gnb { display: flex; align-items: center; justify-content: space-between; padding: 15px 0; }
        .main-gnb .logo h1 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 28px; color: #fff; margin: 0; }
        .main-gnb .logo .dot { color: #E91E63; }
        .gnb-links { display: flex; gap: 30px; font-size: 16px; font-weight: 700; }
        .gnb-links a { color: #ccc; text-decoration: none; transition: 0.2s; }
        .header-utils { display: flex; gap: 15px; align-items: center; font-size: 20px; color: #ccc; }

        /* Dynamic Space Hero */
        .diag-hero { 
            padding: 180px 0 140px; 
            background-color: #050b14;
            background-image: linear-gradient(to bottom, rgba(3,0,20,0.6), #030014), url('https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
            background-size: cover; background-position: center; border-bottom: 1px solid rgba(138,43,226,0.1); color: white; text-align: center; position: relative; overflow: hidden; 
        }
        .diag-hero::before { content: ''; position: absolute; left: -10%; top: -10%; width: 50vw; height: 50vw; background: radial-gradient(circle, rgba(138,43,226,0.3) 0%, transparent 60%); filter: blur(60px); mix-blend-mode: screen; pointer-events: none; }
        .hero-inner { position: relative; z-index: 2; }
        .hero-tag { display: inline-flex;  background: rgba(138,43,226,0.15); border: 1px solid rgba(138,43,226,0.4); color: #d8b4fe; padding: 8px 24px; border-radius: 30px; font-size: 13px; font-weight: 800; margin-bottom: 30px; letter-spacing: 3px; backdrop-filter: blur(10px); }
        .hero-title { font-size: 60px; font-weight: 900; color: #fff; letter-spacing: -2px; line-height: 1.25; margin-bottom: 30px; text-shadow: 0 10px 40px rgba(0,0,0,0.8); }
        .hero-title em { background: linear-gradient(135deg, #e9d5ff, #c084fc, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 30px rgba(147, 51, 234, 0.4); font-style:normal;}
        .hero-sub { font-size: 20px; color: rgba(255,255,255,0.7); font-weight: 300; line-height: 1.7; margin-bottom: 50px; }
        
        .hero-stats { display: inline-flex; gap: 40px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px 40px; backdrop-filter: blur(10px); }
        .h-stat { text-align: center; }
        .h-stat-val { font-size: 32px; font-weight: 900; color: white; }
        .h-stat-val .accent { color: #a855f7; }

        /* PROCESS FLOW (Dark) */
        .process-bar { background: rgba(10,5,20,0.8); margin-top: -40px; position: relative; z-index: 10; border-radius: 16px; border: 1px solid rgba(147,51,234,0.2); box-shadow: 0 10px 40px rgba(0,0,0,0.8); padding: 25px 40px; display: flex; justify-content: center; align-items: center; gap: 0; backdrop-filter:blur(10px); }
        .proc-step { display: flex; flex-direction: column; align-items: center; gap: 10px; flex: 1; }
        .proc-icon { width: 56px; height: 56px; border-radius: 50%; background: rgba(255,255,255,0.05); color: #888; display: flex; align-items: center; justify-content: center; font-size: 22px; transition: 0.3s; border:1px solid rgba(255,255,255,0.1); }
        .proc-icon.done { background: #111; color: white; border-color:#333; }
        .proc-icon.current { background: #8E2DE2; color: white; box-shadow: 0 0 20px rgba(142,45,226,0.5); transform: scale(1.1); border:none;}
        .proc-text strong { display: block; font-size: 14px; font-weight: 800; color: #fff; text-align: center; }
        .proc-text span { font-size: 12px; color: #aaa; text-align: center; display: block; }
        .proc-arrow { color: #555; }

        /* MAIN EXAM CARDS (Dark Space Theme) */
        .exam-grid-main { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 40px; margin-top:30px;}
        .exam-card { background: rgba(10,5,20,0.6); border-radius: 28px; border: 1px solid rgba(147,51,234,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.5); display: flex; flex-direction: column; position: relative; backdrop-filter:blur(10px); transition: 0.3s; }
        .exam-card:hover { transform: translateY(-8px); border-color:rgba(147,51,234,0.4); box-shadow: 0 30px 60px rgba(147,51,234,0.2); }
        .ec-head { padding: 35px 24px 20px; position: relative; text-align: center; border-bottom:1px dashed rgba(255,255,255,0.1); }
        .ec-status-pill { position: absolute; top: 15px; right: 15px; border-radius: 20px; padding: 5px 14px; font-size: 13px; font-weight: 800; }
        .pill-open { background: rgba(33,150,243,0.1); color: #2196F3; border:1px solid rgba(33,150,243,0.3); }
        .pill-avail { background: rgba(156,39,176,0.1); color: #e1bee7; border:1px solid rgba(156,39,176,0.3); }
        .ec-title { font-size: 22px; font-weight: 900; color: #fff; margin-bottom: 6px; }
        .ec-slogan { font-size: 14px; color: #aaa; margin-bottom: 20px; }
        .ec-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
        .ec-desc { font-size: 14.5px; color: #ccc; line-height: 1.6; margin-bottom: 20px; text-align: center; }
        .ec-features { list-style: none; padding: 0; margin: 0 0 25px; display: flex; flex-direction: column; gap: 10px; flex:1;}
        .ec-features li { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #ddd; background: rgba(255,255,255,0.03); padding: 10px 15px; border-radius: 12px; }
        .ec-features li i { color: #a855f7; }
        
        .ec-cta { display: block; text-align: center; padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 900; text-decoration: none; transition: 0.3s; background: linear-gradient(135deg, #a855f7, #6366f1); color:white; border:none; cursor:pointer;}
        .ec-cta:hover { transform:translateY(-2px); box-shadow:0 10px 20px rgba(168,85,247,0.3); }
"""
sd_html = re.sub(r'<style>.*?</style>', f'<style>\n{sd_css}\n    </style>', sd_html, flags=re.DOTALL)

# Header bg-white -> bg-transparent for Space Theme
sd_html = sd_html.replace('class="bg-white"', 'style="background:rgba(10,5,20,0.9); backdrop-filter:blur(10px); border-bottom:1px solid rgba(255,255,255,0.1); position:sticky; top:0; z-index:90;"')

with open(sd_path, 'w', encoding='utf-8') as f: f.write(sd_html)


# 3. lounge.html (Make Bright Premium)
lg_path = r'c:\Users\SsoHot\Desktop\수능사이트시안\katch-web\public\lounge.html'
with open(lg_path, 'r', encoding='utf-8') as f:
    lg_html = f.read()

# Replace dark page wrapper with light
lg_html = re.sub(r'\.page-wrapper\s*\{.*?\}', '.page-wrapper { background: #fdfbfb; font-family: "Pretendard", sans-serif; color: #333; }', lg_html, flags=re.DOTALL)
lg_html = re.sub(r'body\s*\{.*?\}', 'body { background: #fdfbfb; }', lg_html, flags=re.DOTALL)

# Let's write the bright premium styles for lounge
lg_style = r"""
        body { background: #fdfbfb; color:#111; font-family:"Pretendard",sans-serif; }
        .page-wrapper { background: #fdfbfb;}
        /* Hero Bright Premium */
        .lounge-hero { padding: 100px 0; background: linear-gradient(to right, #ffffff, #f0f4f8); border-bottom:1px solid #eee; text-align:center;}
        .lounge-title { font-size: 40px; font-weight: 900; color: #111; margin-bottom: 20px;}
        .lounge-desc { font-size: 16px; color: #666; }
        
        .lounge-tabs-wrapper { background: white; border-bottom: 1px solid #eee; padding: 20px 0; }
        .content-tab { background: #f4f5f7; color: #666; border: none; padding: 12px 25px; border-radius: 30px; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .content-tab.active { background: #111; color: white; box-shadow:0 4px 15px rgba(0,0,0,0.1); }
        
        .mission-panel { background: white; border-radius: 24px; padding: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.05); border:1px solid #eee; margin-top: 40px; }
        .miss-box { background: #fafafa; border: 1px dashed #ccc; padding: 20px; border-radius: 16px; }
        
        .post-card { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border:1px solid #eee; margin-bottom: 20px; }
"""
lg_html = re.sub(r'<style>.*?</style>', f'<style>\n{lg_style}\n    </style>', lg_html, flags=re.DOTALL)

with open(lg_path, 'w', encoding='utf-8') as f: f.write(lg_html)
