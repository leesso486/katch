import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = 'c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public';

// ----- LOUNGE.HTML -----
const loungePath = path.join(PUBLIC_DIR, 'lounge.html');
let loungeHtml = fs.readFileSync(loungePath, 'utf8');

const newLoungeCss = `        body { background-color: #f7f9fc; font-family: 'Pretendard', sans-serif; color: #333; }
        
        /* PB Lounge Bright Luxury styles */
        .pb-hero { 
            background: linear-gradient(135deg, #fdfbfb 0%, #f3ebf5 100%); 
            color: #111; padding: 120px 0 100px; position:relative; overflow:hidden; 
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .pb-hero::before { 
            content:''; position:absolute; top:-50%; left:-20%; width:800px; height:800px; 
            background:radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%); 
            border-radius:50%; filter:blur(40px); animation: drift 15s infinite alternate ease-in-out;
        }
        .pb-hero::after { 
            content:''; position:absolute; bottom:-30%; right:-10%; width:600px; height:600px; 
            background:radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%); 
            border-radius:50%; filter:blur(50px); animation: drift2 12s infinite alternate ease-in-out;
        }
        @keyframes drift { 0%{transform:translate(0,0)} 100%{transform:translate(50px,50px)} }
        @keyframes drift2 { 0%{transform:translate(0,0)} 100%{transform:translate(-50px,-30px)} }
        
        .pb-hero-inner { position:relative; z-index:2; text-align:center; }
        .pb-tag { display:inline-block; padding:8px 20px; background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.3); color:#B8860B; border-radius:30px; font-size:12px; font-weight:900; letter-spacing:2px; margin-bottom:25px; backdrop-filter:blur(10px); }
        .pb-title { font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; margin-bottom: 25px; color: #111; letter-spacing: 1px; line-height:1.2; text-shadow:0 4px 10px rgba(0,0,0,0.02);}
        .pb-title span { color: #D4AF37; font-style: italic; }
        .pb-desc { font-size: 18px; color: #555; font-weight: 400; line-height: 1.7; }
        
        .lounge-wrapper { display: flex; gap: 40px; }
        .pb-sidebar { width: 340px; flex-shrink: 0; }
        .pb-main { flex: 1; min-width: 0; }
        
        /* Membership Card: White/Gold Luxury Look */
        .member-card { 
            background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%); 
            border-radius: 24px; padding: 40px 35px; color: #111; position: relative; overflow: hidden; 
            box-shadow: 0 20px 50px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.8); 
            transform: translateY(-50px); margin-bottom: -20px; border: 1px solid rgba(0,0,0,0.05); 
            transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .member-card:hover { transform: translateY(-60px) scale(1.02); box-shadow: 0 40px 80px rgba(0,0,0,0.1); border-color: rgba(212,175,55,0.3); }
        .member-card::before { content: ''; position: absolute; top:0; left:-100%; width:50%; height:100%; background:linear-gradient(90deg, transparent, rgba(212,175,55,0.05), transparent); transform:skewX(-25deg); animation: shine 6s infinite; }
        @keyframes shine { 0% { left: -100% } 20% { left: 200% } 100% { left: 200% } }
        .member-card::after { content: 'VIP'; position:absolute; bottom:10px; right:15px; font-size:80px; font-weight:900; color:rgba(212,175,55,0.05); font-family:'Playfair Display',serif; pointer-events:none; line-height:1; }
        
        .mc-tier { font-size: 11px; text-transform: uppercase; letter-spacing: 4px; color: #B8860B; font-weight: 700; margin-bottom: 15px; }
        .mc-name { font-size: 28px; font-weight: 400; margin-bottom: 30px; letter-spacing: 1px; color:#111; }
        .mc-name strong { font-weight: 900; font-family:'Pretendard'; }
        .mc-points { font-size: 42px; font-weight: 900; color: #111; margin-bottom: 5px; font-family: 'Playfair Display', serif; }
        .mc-points span { font-size: 16px; font-weight: 400; color: #D4AF37; font-family:'Pretendard'; }
        
        .mc-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 25px; margin-top: 30px; font-size: 13px; color:#666; }
        .btn-charge { background: #fff; color: #B8860B; border: 1px solid #B8860B; padding: 10px 24px; border-radius: 30px; font-weight: 700; cursor: pointer; transition: 0.3s; font-size:13px; box-shadow: 0 4px 10px rgba(212,175,55,0.1); }
        .btn-charge:hover { background: #B8860B; color: #fff; box-shadow: 0 8px 20px rgba(212,175,55,0.3); }

        /* Navigation Menu */
        .pb-nav { background: #fff; border-radius: 20px; padding: 25px 0; margin-bottom: 30px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
        .pb-nav-title { font-size: 10px; color: #888; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; padding: 0 30px 12px; margin-top: 20px; }
        .pb-nav-title:first-child { margin-top: 0; }
        .pb-nav ul { list-style: none; padding: 0 15px; margin: 0; }
        .pb-nav li { margin-bottom: 4px; }
        .pb-nav li a { display: flex; align-items: center; gap: 15px; padding: 14px 20px; color: #555; text-decoration: none; font-weight: 600; font-size: 14px; transition: 0.3s; border-radius: 12px; }
        .pb-nav li a:hover { background: #fdfbfb; color: #111; transform: translateX(5px); }
        .pb-nav li.active a { color: #fff; background: #B8860B; font-weight: 800; transform: translateX(5px); box-shadow:0 5px 15px rgba(212,175,55,0.3); }
        .pb-nav li i { width: 24px; text-align: center; color: #999; font-size:16px; transition:0.3s; }
        .pb-nav li.active i { color: #fff; }
        .pb-nav li a:hover i { color: #B8860B; }

        /* Magazine Layout */
        .mag-section { margin-bottom: 60px; background: transparent; padding: 0; }
        .mag-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 35px; border-bottom:1px solid rgba(0,0,0,0.05); padding-bottom:20px;}
        .mag-title { font-size: 26px; font-weight: 800; color: #111; margin: 0; display:flex; align-items:center; gap:12px; letter-spacing:-0.5px;}
        .mag-subtitle { display: block; font-size: 13px; color: #888; font-weight: 500; margin-top:0; letter-spacing:0; border-left:1px solid #ddd; padding-left:12px;}
        
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }

        .mag-card { background: #fff; border-radius: 20px; overflow: hidden; transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); border: 1px solid rgba(0,0,0,0.05); display:flex; flex-direction:column; position:relative; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
        .mag-card:hover { transform: translateY(-10px); border-color: rgba(212,175,55,0.3); box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
        .mc-img { height: 240px; background: #f0f4f8; position: relative; display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .mc-img img { width: 100%; height: 100%; object-fit: cover; transition:0.8s ease; opacity:0.9; }
        .mag-card:hover .mc-img img { transform:scale(1.05); opacity:1; }
        .mc-img.video-thumb::before { content: ''; position: absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.5), transparent); z-index:1; }
        .mc-img.video-thumb::after { content: '\f144'; font-family: 'Font Awesome 5 Free'; font-weight: 900; position: absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:50px; color:rgba(255,255,255,0.9); transition:0.4s; z-index:2;}
        .mag-card:hover .mc-img.video-thumb::after { color:#D4AF37; transform:translate(-50%, -50%) scale(1.1); text-shadow:0 0 20px rgba(0,0,0,0.3); }
        
        .mc-badge { position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.9); color: #555; padding: 6px 14px; border-radius: 30px; font-size: 10px; font-weight: 800; letter-spacing:1px; z-index:3; backdrop-filter:blur(5px); border:1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .mc-badge.gold { background: rgba(212,175,55,0.1); color: #B8860B; border-color:rgba(212,175,55,0.3); }
        
        .mc-body { padding: 35px 30px; flex:1; display:flex; flex-direction:column; justify-content:space-between; background:#fff; position:relative; z-index:2; }
        .mc-body h4 { font-size: 20px; font-weight: 900; line-height: 1.5; margin-bottom: 12px; color:#111; letter-spacing:-0.5px; transition:0.3s; }
        .mag-card:hover .mc-body h4 { color:#B8860B; }
        .mc-body p { font-size: 14px; color: #666; line-height: 1.7; display:-webkit-box; -webkit-line-clamp:2; line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .mc-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 20px; font-size: 12px; color: #888; font-weight: 700; letter-spacing:1px; text-transform:uppercase; }
        .mc-price { color: #B8860B; font-weight: 900; font-size: 15px; display:flex; align-items:center; gap:5px; letter-spacing:0; }

        /* Daechi Life List */
        .dl-list { list-style: none; padding: 0; margin: 0; background: #fff; border-radius: 20px; border: 1px solid rgba(0,0,0,0.05); overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
        .dl-item { display: flex; padding: 35px; border-bottom: 1px solid rgba(0,0,0,0.03); gap: 35px; align-items: center; transition:0.4s; cursor:pointer; position:relative;}
        .dl-item:hover { background:rgba(0,0,0,0.01); padding-left:45px; }
        .dl-item:last-child { border-bottom: none; }
        .dl-thumb { width: 160px; height: 160px; border-radius: 16px; background: #f0f4f8; flex-shrink: 0; display:flex; align-items:center; justify-content:center; color:#ccc; font-size:40px; overflow:hidden; }
        .dl-thumb img { width:100%; height:100%; object-fit:cover; transition:0.8s; opacity:0.9; }
        .dl-item:hover .dl-thumb img { transform:scale(1.1); opacity:1; }
        .dl-content { flex: 1; }
        .dl-content h4 { font-size: 22px; font-weight: 900; margin-bottom: 15px; color:#111; letter-spacing:-0.5px; transition:0.3s;}
        .dl-item:hover .dl-content h4 { color:#B8860B; }
        .dl-content p { font-size: 15px; color: #666; margin-bottom: 20px; line-height:1.7; }
        .dl-meta span { display: inline-block; background: #f9f9f9; border:1px solid rgba(0,0,0,0.05); padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight:800; color: #888; margin-right: 8px; letter-spacing:1px;}

        /* Point Banner */
        .point-banner { background: #fff; border-radius: 24px; padding: 40px 50px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; border:1px solid rgba(212,175,55,0.2); position:relative; overflow:hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.05); }
        .point-banner::before { content:''; position:absolute; right:-50px; top:-50px; width:300px; height:300px; background:radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%); }
        .point-banner h3 { font-size: 24px; color: #B8860B; margin-bottom: 12px; font-weight:900; position:relative; z-index:2; letter-spacing:-0.5px;}
        .point-banner p { font-size: 15px; color: #555; position:relative; z-index:2; line-height:1.6;}
        .point-banner strong { color:#111; font-weight:900; }
        .btn-write { background: #B8860B; color: #fff; border: none; padding: 18px 40px; border-radius: 40px; font-weight: 800; text-decoration: none; transition:0.3s; position:relative; z-index:2; font-size:14px; letter-spacing:1px; box-shadow: 0 10px 20px rgba(212,175,55,0.3); }
        .btn-write:hover { transform:translateY(-5px); box-shadow: 0 15px 30px rgba(212,175,55,0.4); }

        /* Lounge Tab Updates */
        .lounge-tabs-wrapper { display:flex; gap:10px; margin-bottom:40px; overflow-x:auto; padding-bottom:10px; border-bottom:1px solid rgba(0,0,0,0.05); }
        .lounge-tab { padding:12px 24px; background:#fff; border:1px solid rgba(0,0,0,0.1); color:#666; font-weight:700; font-size:14px; cursor:pointer; white-space:nowrap; border-radius:30px; transition:0.3s; letter-spacing:1px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .lounge-tab:hover { background:#fdfbfb; color:#111; border-color: rgba(212,175,55,0.3); }
        .lounge-tab.active { background:#B8860B; color:#fff; font-weight:800; border-color:#B8860B; box-shadow: 0 5px 15px rgba(212,175,55,0.3); }`;

const startIdxLounge = loungeHtml.indexOf('body { background-color: #030303;');
const endIdxLounge = loungeHtml.indexOf('    </style>', startIdxLounge);
if (startIdxLounge !== -1 && endIdxLounge !== -1) {
    loungeHtml = loungeHtml.substring(0, startIdxLounge) + newLoungeCss + "\n" + loungeHtml.substring(endIdxLounge);
    fs.writeFileSync(loungePath, loungeHtml, 'utf8');
    console.log('Lounge CSS replaced.');
} else {
    console.log('Could not find Lounge CSS boundaries.');
}

// ----- DIAGNOSTICS.HTML -----
const diagPath = path.join(PUBLIC_DIR, 'student_diagnostics.html');
let diagHtml = fs.readFileSync(diagPath, 'utf8');

const newDiagCss = `        body { background: #010103; font-family: 'Pretendard', sans-serif; }

        /* ===== DEEP SPACE HERO ===== */
        .diag-hero {
            position: relative; overflow: hidden;
            background-color: #050b14;
            background-image: 
                linear-gradient(to bottom, rgba(3,0,20,0.7), #010103),
                url('https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
            background-size: cover; background-position: center; background-attachment: fixed;
            color: white; padding: 120px 0 140px;
            border-bottom: 1px solid rgba(138,43,226,0.15);
        }
        .diag-hero::before {
            content: ''; position: absolute; left: -10%; top: -10%; width: 50vw; height: 50vw; 
            background: radial-gradient(circle, rgba(138,43,226,0.3) 0%, transparent 60%); 
            border-radius: 50%; filter: blur(60px); mix-blend-mode: screen;
            animation: floatOrb 15s infinite alternate ease-in-out; pointer-events: none;
        }
        .diag-hero::after {
            content: ''; position: absolute; right: -10%; bottom: -10%; width: 40vw; height: 40vw; 
            background: radial-gradient(circle, rgba(0,255,255,0.2) 0%, transparent 60%); 
            border-radius: 50%; filter: blur(50px); mix-blend-mode: screen;
            animation: floatOrb2 12s infinite alternate ease-in-out; pointer-events: none;
        }
        @keyframes floatOrb { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(100px, 50px) scale(1.2); } }
        @keyframes floatOrb2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-80px, -60px) scale(1.1); } }

        .hero-inner { position: relative; z-index: 2; text-align: center; }
        .hero-tag {
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba(138,43,226,0.15); border: 1px solid rgba(138,43,226,0.4);
            color: #d8b4fe; padding: 8px 24px; border-radius: 30px;
            font-size: 13px; font-weight: 800; margin-bottom: 25px; letter-spacing: 2px;
            box-shadow: 0 0 20px rgba(138,43,226,0.2); backdrop-filter: blur(10px);
        }
        .hero-title { font-size: 56px; font-weight: 900; letter-spacing: -2px; line-height: 1.15; margin-bottom: 20px; text-shadow: 0 10px 40px rgba(0,0,0,0.8); }
        .hero-title em { 
            font-style: normal; 
            background: linear-gradient(135deg, #e9d5ff, #c084fc, #9333ea); 
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
            text-shadow: 0 0 30px rgba(147, 51, 234, 0.4);
        }
        .hero-sub { font-size: 20px; font-weight: 300; color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 50px; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }

        /* Stats row */
        .hero-stats { display: inline-flex; gap: 50px; background: rgba(15,5,30,0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 30px 50px; backdrop-filter: blur(20px); box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(147,51,234,0.1); }
        .h-stat { text-align: center; }
        .h-stat-val { font-size: 36px; font-weight: 900; color: white; margin-bottom: 5px; }
        .h-stat-val .accent { color: #d8b4fe; text-shadow: 0 0 15px rgba(216,180,254,0.5); }
        .h-stat-label { font-size: 14px; color: rgba(255,255,255,0.6); font-weight: 600; }

        /* ===== PROCESS FLOW ===== */
        .process-bar {
            background: rgba(15,5,30,0.8); margin-top: -50px; position: relative; z-index: 10;
            border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.8);
            border: 1px solid rgba(147,51,234,0.2);
            padding: 35px 50px; display: flex; justify-content: center; align-items: center; gap: 0; backdrop-filter: blur(15px);
        }
        .proc-step { display: flex; flex-direction: column; align-items: center; gap: 15px; flex: 1; }
        .proc-icon {
            width: 64px; height: 64px; border-radius: 50%;
            background: rgba(255,255,255,0.05); color: #888; border: 1px solid rgba(255,255,255,0.1);
            display: flex; align-items: center; justify-content: center;
            font-size: 24px; transition: 0.3s; position: relative;
        }
        .proc-icon.done { background: rgba(147,51,234,0.1); color: #d8b4fe; border-color: rgba(147,51,234,0.3); }
        .proc-icon.current { background: linear-gradient(135deg, #a855f7, #7e22ce); color: white; box-shadow: 0 0 20px rgba(147,51,234,0.5); transform: scale(1.15); border: none; }
        .proc-text strong { display: block; font-size: 15px; font-weight: 800; color: #fff; text-align: center; margin-bottom: 5px; }
        .proc-text span { font-size: 13px; color: #aaa; text-align: center; display: block; }
        .proc-arrow { color: rgba(255,255,255,0.1); font-size: 24px; padding: 0 15px; flex-shrink: 0; }

        /* ===== MAIN EXAM CARDS (DARK GLASSMORPHISM) ===== */
        .exam-grid-main { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 60px; }

        .exam-card {
            background: rgba(10,5,20,0.7); border-radius: 30px; overflow: hidden;
            border: 1px solid rgba(147,51,234,0.15); transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 20px 60px rgba(0,0,0,0.5); display: flex; flex-direction: column;
            position: relative; backdrop-filter: blur(10px);
        }
        .exam-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 40px 80px rgba(147,51,234,0.15); border-color: rgba(147,51,234,0.4); }
        .exam-card.open { background: linear-gradient(to bottom, rgba(147,51,234,0.05), rgba(10,5,20,0.9)); }
        .exam-card.available { background: linear-gradient(to bottom, rgba(0,255,255,0.05), rgba(10,5,20,0.9)); border-color: rgba(0,255,255,0.15); }
        .exam-card.closed { opacity: 0.6; filter: grayscale(0.8); border-color: rgba(255,255,255,0.05); }
        .exam-card.closed:hover { transform: none; box-shadow: 0 20px 60px rgba(0,0,0,0.5); border-color: rgba(255,255,255,0.05); }

        .ec-head { padding: 35px 30px 20px; position: relative; text-align: center; }
        .ec-status-pill {
            position: absolute; top: 20px; right: 20px;
            border-radius: 20px; padding: 6px 16px; font-size: 13px; font-weight: 800;
            display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); backdrop-filter: blur(5px);
        }
        .pill-open { background: rgba(147,51,234,0.2); color: #e9d5ff; border: 1px solid rgba(147,51,234,0.3); }
        .pill-avail { background: rgba(0,255,255,0.1); color: #a5f3fc; border: 1px solid rgba(0,255,255,0.3); }
        .pill-closed { background: rgba(255,255,255,0.05); color: #999; border: 1px solid rgba(255,255,255,0.1); }

        .ec-icon { width: 70px; height: 70px; border-radius: 22px; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05); }
        .exam-card.open .ec-icon { color: #d8b4fe; border-color: rgba(147,51,234,0.4); box-shadow: 0 0 20px rgba(147,51,234,0.2); }
        .exam-card.available .ec-icon { color: #67e8f9; border-color: rgba(0,255,255,0.4); box-shadow: 0 0 20px rgba(0,255,255,0.2); }
        .exam-card.closed .ec-icon { color: #666; }

        .ec-title { font-size: 24px; font-weight: 900; color: #fff; line-height: 1.3; margin-bottom: 8px; letter-spacing: -0.5px; }
        .ec-slogan { font-size: 15px; color: #aaa; margin-bottom: 25px; font-weight: 500; }
        .ec-deadline { font-size: 14px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #ccc; padding: 8px 20px; border-radius: 30px; }
        .exam-card.open .ec-deadline { background: rgba(233,30,99,0.1); color: #f472b6; border-color: rgba(233,30,99,0.3); }

        .ec-body { padding: 0 30px 30px; flex: 1; display: flex; flex-direction: column; }
        .ec-info-list { list-style: none; padding: 25px 0; margin: 0 0 30px; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); flex: 1; }
        .ec-info-list li { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 14px; }
        .ec-info-list li:last-child { margin-bottom: 0; }
        .ec-info-list .label { color: #888; font-weight: 700; display:flex; align-items:center; gap:8px; }
        .ec-info-list .val { font-weight: 800; color: #fff; text-align: right; }
        .ec-info-list .val-high { color: #d8b4fe; }

        .btn-exam {
            display: block; width: 100%; text-align: center; padding: 18px; border-radius: 16px;
            font-size: 16px; font-weight: 800; text-decoration: none; transition: 0.3s;
            position: relative; overflow: hidden;
        }
        .btn-exam.primary { background: linear-gradient(135deg, #a855f7, #7e22ce); color: white; box-shadow: 0 10px 25px rgba(147,51,234,0.3); }
        .btn-exam.primary:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(147,51,234,0.5); }
        .btn-exam.secondary { background: rgba(0,255,255,0.1); color: #67e8f9; border: 1px solid rgba(0,255,255,0.3); }
        .btn-exam.secondary:hover { background: rgba(0,255,255,0.2); }
        .btn-exam.disabled { background: rgba(255,255,255,0.05); color: #666; cursor: not-allowed; border: 1px solid rgba(255,255,255,0.1); }
        
        /* Modal for Registration */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; opacity: 0; visibility: hidden; transition: 0.3s; backdrop-filter: blur(15px); }
        .modal-overlay.active { opacity: 1; visibility: visible; }
        .modal-content { background: #0c0c14; width: 500px; border-radius: 24px; overflow: hidden; transform: scale(0.95); transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 40px 80px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(147,51,234,0.2); }
        .modal-overlay.active .modal-content { transform: scale(1); }
        
        .modal-header { background: linear-gradient(135deg, rgba(15,5,30,0.9), #0c0c14); padding: 30px 35px 20px; position: relative; border-bottom: 1px solid rgba(147,51,234,0.15); }
        .modal-header h3 { font-size: 22px; font-weight: 900; margin: 0; color: #fff; display: flex; align-items: center; gap: 10px; }
        .modal-header h3 i { color: #d8b4fe; }
        .btn-close { position: absolute; right: 25px; top: 30px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; width: 32px; height: 32px; border-radius: 50%; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .btn-close:hover { background: rgba(255,255,255,0.1); transform: rotate(90deg); }
        
        .modal-body { padding: 35px; background: #050508; }
        .form-row { margin-bottom: 22px; }
        .form-row label { display: block; font-size: 14px; font-weight: 800; color: #ccc; margin-bottom: 10px; }
        .form-row input, .form-row select { width: 100%; padding: 15px 18px; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; font-family: 'Pretendard', sans-serif; font-size: 15px; outline: none; transition: 0.3s; box-sizing: border-box; background: rgba(255,255,255,0.03); color: #fff; }
        .form-row input:focus, .form-row select:focus { border-color: #a855f7; background: rgba(255,255,255,0.05); box-shadow: 0 0 15px rgba(168,85,247,0.2); }
        .form-row select option { background: #111; color: #fff; }
        
        .modal-info { background: rgba(0,255,255,0.05); border: 1px solid rgba(0,255,255,0.2); border-radius: 12px; padding: 20px; font-size: 13px; color: #a5f3fc; line-height: 1.6; display: flex; gap: 12px; align-items: flex-start; margin-top: 10px; }
        .modal-info i { font-size: 18px; margin-top: 2px; }
        
        .modal-footer { padding: 25px 35px; background: #0c0c14; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: flex-end; gap: 12px; }
        .btn-modal { padding: 16px 30px; border-radius: 12px; font-weight: 800; font-size: 15px; cursor: pointer; transition: 0.3s; border: none; }
        .btn-modal-cancel { background: rgba(255,255,255,0.05); color: #aaa; border: 1px solid rgba(255,255,255,0.1); }
        .btn-modal-cancel:hover { background: rgba(255,255,255,0.1); color: white; }
        .btn-modal-submit { background: linear-gradient(135deg, #a855f7, #7e22ce); color: white; box-shadow: 0 6px 20px rgba(168,85,247,0.3); }
        .btn-modal-submit:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(168,85,247,0.5); }`;

const startIdxDiag = diagHtml.indexOf('body { background: #f0f2f6;');
const endIdxDiag = diagHtml.indexOf('    </style>', startIdxDiag);
if (startIdxDiag !== -1 && endIdxDiag !== -1) {
    diagHtml = diagHtml.substring(0, startIdxDiag) + newDiagCss + "\n" + diagHtml.substring(endIdxDiag);
    
    // Also change some text colors in the body of diagnostics to work with dark theme
    diagHtml = diagHtml.replace(/color: #333;/g, 'color: #fff;');
    diagHtml = diagHtml.replace(/color: #111;/g, 'color: #fff;');
    
    fs.writeFileSync(diagPath, diagHtml, 'utf8');
    console.log('Diagnostics CSS replaced.');
} else {
    console.log('Could not find Diagnostics CSS boundaries.');
}

console.log('Done!');
