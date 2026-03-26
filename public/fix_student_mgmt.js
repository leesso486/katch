const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

const targetStart = '<div class="content-panel" id="panel-studentMgmt">';
const targetIdxStart = html.indexOf(targetStart);

if (targetIdxStart !== -1) {
    const endMgmtPanel = html.indexOf('</main>', targetIdxStart);
    
    if (endMgmtPanel !== -1) {
        let newContent = `
            <div class="content-panel" id="panel-studentMgmt">
                <div class="simple-panel" style="padding: 30px;">
                    <h3 style="font-size: 22px; font-weight: 800; color: #111; margin-bottom: 25px;"><i class="fas fa-users-cog text-blue"></i> 학생 관리 (Class & Student Management)</h3>
                    
                    <!-- 1. Class Selection -->
                    <div style="background: #f8f9fa; border: 1px solid #e0e4e8; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                        <label style="font-size: 14px; font-weight: 700; color: #333; margin-bottom: 10px; display: block;"><i class="fas fa-chalkboard"></i> 담당 반 선택</label>
                        <select id="classSelect" style="width: 100%; padding: 12px 15px; border-radius: 8px; border: 1px solid #ccc; font-size: 15px; font-weight: 600; background: #fff; cursor: pointer;" onchange="updateStudentList()">
                            <option value="classA">중2 외고/전사고 최상위반 (총 8명)</option>
                            <option value="classB">고1 정규 내신 특강반 (총 6명)</option>
                            <option value="classC">고3 수능 실전 모의고사반 (총 4명)</option>
                        </select>
                    </div>

                    <!-- 2. Student Selection / Details -->
                    <div id="studentContainer">
                        <label style="font-size: 14px; font-weight: 700; color: #333; margin-bottom: 15px; display: block;"><i class="fas fa-user-graduate"></i> 해당 반 소속 학생 (클릭하여 상세 정보 조회)</label>
                        
                        <div style="display: flex; flex-direction: column; gap: 15px;" id="studentListA">
                            <!-- Student 1 -->
                            <details style="background: #fff; border: 1px solid #e0e4e8; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                                <summary style="padding: 18px 20px; font-size: 16px; font-weight: 800; color: #1a237e; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #fdfdfd;">
                                    <div><img src="https://i.pravatar.cc/150?img=11" style="width:28px; height:28px; border-radius:50%; vertical-align:middle; margin-right:10px;"> 백재형 학생</div>
                                    <span style="font-size:12px; font-weight:600; color:#888; background:#eee; padding:4px 10px; border-radius:20px;">상세 보기 ▾</span>
                                </summary>
                                <div style="padding: 20px; border-top: 1px solid #f0f0f0; background: #fafafa; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                    <a href="dashboard_online.html" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#42a5f5'; this.style.boxShadow='0 2px 8px rgba(33,150,243,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#42a5f5; font-size:20px; margin-bottom:10px;"><i class="fas fa-laptop-code"></i></div>
                                        <div style="font-weight:800; font-size:14px;">진단테스트 내역</div><div style="font-size:12px; color:#777; margin-top:5px;">입학 및 온라인 진단 결과 조회</div>
                                    </a>
                                    <a href="level_test.html" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#ab47bc'; this.style.boxShadow='0 2px 8px rgba(171,71,188,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#ab47bc; font-size:20px; margin-bottom:10px;"><i class="fas fa-layer-group"></i></div>
                                        <div style="font-weight:800; font-size:14px;">레벨테스트 내역</div><div style="font-size:12px; color:#777; margin-top:5px;">원내 정기 레벨테스트 진행/결과</div>
                                    </a>
                                    <a href="#" onclick="showPanel('homework', '숙제 현황', null); return false;" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#ff9800'; this.style.boxShadow='0 2px 8px rgba(255,152,0,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#ff9800; font-size:20px; margin-bottom:10px;"><i class="fas fa-tasks"></i></div>
                                        <div style="font-weight:800; font-size:14px;">GVR 과제 진행률</div><div style="font-size:12px; color:#777; margin-top:5px;">주차별 과제 수행도 및 정오표</div>
                                    </a>
                                    <a href="report_premium.html" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#e91e63'; this.style.boxShadow='0 2px 8px rgba(233,30,99,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#e91e63; font-size:20px; margin-bottom:10px;"><i class="fas fa-file-invoice"></i></div>
                                        <div style="font-weight:800; font-size:14px;">개인 성적표 열람</div><div style="font-size:12px; color:#777; margin-top:5px;">종합 평가 및 누적 리포트 분석</div>
                                    </a>
                                </div>
                            </details>

                            <!-- Student 2 -->
                            <details style="background: #fff; border: 1px solid #e0e4e8; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                                <summary style="padding: 18px 20px; font-size: 16px; font-weight: 800; color: #1a237e; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #fdfdfd;">
                                    <div><img src="https://i.pravatar.cc/150?img=5" style="width:28px; height:28px; border-radius:50%; vertical-align:middle; margin-right:10px;"> 이은혜 학생</div>
                                    <span style="font-size:12px; font-weight:600; color:#888; background:#eee; padding:4px 10px; border-radius:20px;">상세 보기 ▾</span>
                                </summary>
                                <div style="padding: 20px; border-top: 1px solid #f0f0f0; background: #fafafa; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                    <a href="dashboard_online.html" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#42a5f5'; this.style.boxShadow='0 2px 8px rgba(33,150,243,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#42a5f5; font-size:20px; margin-bottom:10px;"><i class="fas fa-laptop-code"></i></div>
                                        <div style="font-weight:800; font-size:14px;">진단테스트 내역</div><div style="font-size:12px; color:#777; margin-top:5px;">입학 및 온라인 진단 결과 조회</div>
                                    </a>
                                    <a href="level_test.html" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#ab47bc'; this.style.boxShadow='0 2px 8px rgba(171,71,188,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#ab47bc; font-size:20px; margin-bottom:10px;"><i class="fas fa-layer-group"></i></div>
                                        <div style="font-weight:800; font-size:14px;">레벨테스트 내역</div><div style="font-size:12px; color:#777; margin-top:5px;">원내 정기 레벨테스트 진행/결과</div>
                                    </a>
                                    <a href="#" onclick="showPanel('homework', '숙제 현황', null); return false;" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#ff9800'; this.style.boxShadow='0 2px 8px rgba(255,152,0,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#ff9800; font-size:20px; margin-bottom:10px;"><i class="fas fa-tasks"></i></div>
                                        <div style="font-weight:800; font-size:14px;">GVR 과제 진행률</div><div style="font-size:12px; color:#777; margin-top:5px;">주차별 과제 수행도 및 정오표</div>
                                    </a>
                                    <a href="report_premium.html" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#e91e63'; this.style.boxShadow='0 2px 8px rgba(233,30,99,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#e91e63; font-size:20px; margin-bottom:10px;"><i class="fas fa-file-invoice"></i></div>
                                        <div style="font-weight:800; font-size:14px;">개인 성적표 열람</div><div style="font-size:12px; color:#777; margin-top:5px;">종합 평가 및 누적 리포트 분석</div>
                                    </a>
                                </div>
                            </details>
                            
                            <!-- Student 3 -->
                            <details style="background: #fff; border: 1px solid #e0e4e8; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                                <summary style="padding: 18px 20px; font-size: 16px; font-weight: 800; color: #1a237e; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #fdfdfd;">
                                    <div><img src="https://i.pravatar.cc/150?img=12" style="width:28px; height:28px; border-radius:50%; vertical-align:middle; margin-right:10px;"> 박진규 학생</div>
                                    <span style="font-size:12px; font-weight:600; color:#888; background:#eee; padding:4px 10px; border-radius:20px;">상세 보기 ▾</span>
                                </summary>
                                <div style="padding: 20px; border-top: 1px solid #f0f0f0; background: #fafafa; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                    <a href="dashboard_online.html" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#42a5f5'; this.style.boxShadow='0 2px 8px rgba(33,150,243,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#42a5f5; font-size:20px; margin-bottom:10px;"><i class="fas fa-laptop-code"></i></div>
                                        <div style="font-weight:800; font-size:14px;">진단테스트 내역</div><div style="font-size:12px; color:#777; margin-top:5px;">입학 및 온라인 진단 결과 조회</div>
                                    </a>
                                    <a href="level_test.html" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#ab47bc'; this.style.boxShadow='0 2px 8px rgba(171,71,188,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#ab47bc; font-size:20px; margin-bottom:10px;"><i class="fas fa-layer-group"></i></div>
                                        <div style="font-weight:800; font-size:14px;">레벨테스트 내역</div><div style="font-size:12px; color:#777; margin-top:5px;">원내 정기 레벨테스트 진행/결과</div>
                                    </a>
                                    <a href="#" onclick="showPanel('homework', '숙제 현황', null); return false;" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#ff9800'; this.style.boxShadow='0 2px 8px rgba(255,152,0,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#ff9800; font-size:20px; margin-bottom:10px;"><i class="fas fa-tasks"></i></div>
                                        <div style="font-weight:800; font-size:14px;">GVR 과제 진행률</div><div style="font-size:12px; color:#777; margin-top:5px;">주차별 과제 수행도 및 정오표</div>
                                    </a>
                                    <a href="report_premium.html" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-decoration:none; color:#333; transition:0.2s;" onmouseover="this.style.borderColor='#e91e63'; this.style.boxShadow='0 2px 8px rgba(233,30,99,0.1)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
                                        <div style="color:#e91e63; font-size:20px; margin-bottom:10px;"><i class="fas fa-file-invoice"></i></div>
                                        <div style="font-weight:800; font-size:14px;">개인 성적표 열람</div><div style="font-size:12px; color:#777; margin-top:5px;">종합 평가 및 누적 리포트 분석</div>
                                    </a>
                                </div>
                            </details>
                            
                            <!-- Notice for other items... -->
                            <div style="text-align:center; padding: 10px; color:#888; font-size:13px; font-weight:bold;">...외 5명의 학생 정보 로드됨</div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
`;
        let newFinalHtml = html.substring(0, targetIdxStart) + newContent + html.substring(endMgmtPanel + 7);
        fs.writeFileSync('my_learning.html', newFinalHtml, 'utf8');
        console.log("Successfully replaced panel-studentMgmt");
    } else {
        console.log("Could not find end of panel-studentMgmt");
    }
} else {
    console.log("Could not find panel-studentMgmt start element");
}
