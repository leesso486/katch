const fs = require('fs');

// Replace term '라이팅 첨삭 과제' -> 'GVR 과제'
function replaceTerm(filename) {
    if (!fs.existsSync(filename)) return;
    let html = fs.readFileSync(filename, 'utf8');
    html = html.replace(/라이팅 첨삭 과제/g, 'GVR 과제');
    fs.writeFileSync(filename, html, 'utf8');
}
replaceTerm('my_learning.html');
replaceTerm('points.html');

// Process CBT Files
function processExam(filename) {
    if (!fs.existsSync(filename)) return;
    let html = fs.readFileSync(filename, 'utf8');
    
    // 1. Update CSS Elements
    html = html.replace('.col-header { height: 40px; background: #f0f2f5; border-bottom: 1px solid #ddd; display: flex; align-items: center; padding: 0 15px; font-size: 13px; font-weight: bold; color: #555; }', 
        '.col-header { height: 46px; background: #1a237e; color: #ffffff; border-bottom: none; display: flex; align-items: center; padding: 0 20px; font-size: 14px; font-weight: 800; letter-spacing: 0.5px; }\n        .col-header i { color: #64b5f6; }');
    
    html = html.replace('.col-mid { flex: 40; display: flex; flex-direction: column; background: #f9fafc; }', 
        '.col-mid { flex: 40; display: flex; flex-direction: column; background: #eaeff5; }');
    
    html = html.replace('.col-right { flex: 15; min-width: 250px; background: #fff; border-left: 1px solid #ddd; display: flex; flex-direction: column; }', 
        '.col-right { flex: 15; min-width: 250px; background: #f4f6f9; border-left: 1px solid #ddd; display: flex; flex-direction: column; }');
    
    html = html.replace('.q-card { background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }', 
        '.q-card { background: white; border: none; border-radius: 12px; padding: 28px; margin-bottom: 24px; box-shadow: 0 6px 16px rgba(0,0,0,0.06); }');
    
    html = html.replace('.omr-dot { width: 100%; aspect-ratio: 1; border-radius: 6px; border: 1px solid #ccc; display: flex; justify-content: center; align-items: center; font-size: 14px; font-weight: 800; cursor: pointer; color: #666; background:#fafafa; transition:0.2s;}', 
        '.omr-dot { width: 100%; aspect-ratio: 1; border-radius: 8px; border: 1px solid #dde1e6; display: flex; justify-content: center; align-items: center; font-size: 14px; font-weight: 800; cursor: pointer; color: #111; background:#ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.02); transition:all 0.2s;}');

    // 2. Add Passage Set 3 
    if (!html.includes('passage-set-3')) {
        let pSetEnd = html.indexOf('<!-- Column 2: Questions -->');
        if (pSetEnd !== -1) {
            let divs = html.substring(0, pSetEnd).lastIndexOf('</div>');
            divs = html.substring(0, divs).lastIndexOf('</div>');
            divs = html.substring(0, divs).lastIndexOf('</div>');

            let pSet3 = `
                <!-- Passage Set 3 -->
                <div class="passage-wrapper" id="passage-set-3" style="display:none;">
                    <div class="multi-tag"><i class="fas fa-link"></i> 다음 글을 읽고 물음에 답하시오. (19~20번)</div>
                    <div class="passage-text">
                        <p>The concept of 'digital minimalism' has gained significant traction in recent years as a response to the overwhelming presence of technology in daily life. Coined by computer scientist Cal Newport, this philosophy advocates for a thoughtful and intentional approach to technology use, where individuals actively curate their digital environments to align with their deepest values.</p>
                        <p>At its core, digital minimalism is not about rejecting technology outright; rather, it's about shifting the balance of power. For decades, the tech industry has designed platforms—social media, news aggregators, and entertainment apps—with the explicit goal of monopolizing human attention. This 'attention economy' relies on variable reward schedules and psychological triggers to create compulsive checking behaviors.</p>
                        <p>The minimalist approach requires a period of 'digital decluttering,' usually lasting thirty days. During this time, practitioners eliminate all non-essential technologies from their lives, allowing them to recalibrate their baseline state of attention.</p>
                    </div>
                </div>
            `;
            html = html.substring(0, divs) + pSet3 + html.substring(divs);
        }
    }

    // 3. Add Question Set 3
    if (!html.includes('id="q-set-3"')) {
        let qFooterIdx = html.indexOf('<!-- Navigation Footer -->');
        if (qFooterIdx !== -1) {
            let qSet3 = `
                <!-- Question Set 3 -->
                <div id="q-set-3" style="display:none;">
                    <!-- Q19 -->
                    <div class="q-card" id="q19">
                        <div class="q-header">
                            <span class="q-type">객관식</span>
                            <span class="q-score">배점 2.5</span>
                        </div>
                        <div class="q-text">
                            <span class="q-num">19.</span> 
                            <span>위 글의 핵심 개념인 'attention economy'가 기반하고 있는 주된 전략은 무엇인가?</span>
                        </div>
                        <div class="m-options">
                            <label class="m-option" onclick="selectOption(19, this)"><input type="radio" name="ans_19" value="1"> <span>① 사용자에게 유용한 정보를 선별 제공하는 알고리즘</span></label>
                            <label class="m-option" onclick="selectOption(19, this)"><input type="radio" name="ans_19" value="2"> <span>② 가변적 보상 전략을 통한 강박적 확인 행동 유발</span></label>
                            <label class="m-option" onclick="selectOption(19, this)"><input type="radio" name="ans_19" value="3"> <span>③ 하드웨어 기기의 성능 향상을 통한 체류 시간 증대</span></label>
                            <label class="m-option" onclick="selectOption(19, this)"><input type="radio" name="ans_19" value="4"> <span>④ 광고 차단 기능을 제한하여 수익을 창출하는 모델</span></label>
                            <label class="m-option" onclick="selectOption(19, this)"><input type="radio" name="ans_19" value="5"> <span>⑤ 사용자의 딥워크(Deep Work)를 보조하는 편의 기능</span></label>
                        </div>
                    </div>
                    
                    <!-- Q20 -->
                    <div class="q-card" id="q20">
                        <div class="q-header">
                            <span class="q-type">객관식</span>
                            <span class="q-score">배점 3.0</span>
                        </div>
                        <div class="q-text">
                            <span class="q-num">20.</span> 
                            <span>디지털 미니멀리즘 실천을 위한 '디지털 디클러터링(digital decluttering)'의 궁극적인 목적은?</span>
                        </div>
                        <div class="m-options">
                            <label class="m-option" onclick="selectOption(20, this)"><input type="radio" name="ans_20" value="1"> <span>① 모든 형태의 스마트 기기 사용을 영구적으로 중단하기 위함</span></label>
                            <label class="m-option" onclick="selectOption(20, this)"><input type="radio" name="ans_20" value="2"> <span>② 기술 산업의 독점적 행태에 반대하는 사회적 저항의 표시</span></label>
                            <label class="m-option" onclick="selectOption(20, this)"><input type="radio" name="ans_20" value="3"> <span>③ 기본적 주의력 상태를 재조정하고 만성적 불안을 해소하기 위함</span></label>
                            <label class="m-option" onclick="selectOption(20, this)"><input type="radio" name="ans_20" value="4"> <span>④ 통신 비용 절감을 통한 개인 재정의 효율화</span></label>
                            <label class="m-option" onclick="selectOption(20, this)"><input type="radio" name="ans_20" value="5"> <span>⑤ 정보 검색 속도를 향상시키기 위한 소프트웨어 최적화</span></label>
                        </div>
                    </div>
                </div>

                `;
            html = html.substring(0, qFooterIdx) + qSet3 + html.substring(qFooterIdx);
        }
    }

    // 4. Update Navigation Footers Safely
    if (!html.includes('nav-set-3')) {
        let start = html.indexOf('<!-- Navigation Footer -->');
        let end = html.indexOf('<!-- Column 3: OMR Grid -->');
        if (start !== -1 && end !== -1) {
            let newNav = `<!-- Navigation Footer -->
                <div class="q-nav-footer" id="nav-set-1">
                    <button class="btn-nav" style="opacity:0.5; cursor:not-allowed; background:#f0f2f5;" disabled><i class="fas fa-arrow-left"></i> 이전 지문 없음</button>
                    <button class="btn-nav" onclick="goToSet(2)" style="background:#fff; border-color:#111; box-shadow:0 2px 5px rgba(0,0,0,0.05); color:#111;">다음 지문 (16~18번) <i class="fas fa-arrow-right"></i></button>
                </div>
                <div class="q-nav-footer" id="nav-set-2" style="display:none;">
                    <button class="btn-nav" onclick="goToSet(1)" style="background:#fff; border-color:#888;"><i class="fas fa-arrow-left"></i> 이전 (14~15번)</button>
                    <button class="btn-nav" onclick="goToSet(3)" style="background:#fff; border-color:#111; box-shadow:0 2px 5px rgba(0,0,0,0.05); color:#111;">다음 지문 (19~20번) <i class="fas fa-arrow-right"></i></button>
                </div>
                <div class="q-nav-footer" id="nav-set-3" style="display:none;">
                    <button class="btn-nav" onclick="goToSet(2)" style="background:#fff; border-color:#888;"><i class="fas fa-arrow-left"></i> 이전 (16~18번)</button>
                    <button class="btn-nav" style="background:#E91E63; color:white; border:none; box-shadow:0 4px 10px rgba(233,30,99,0.3);" onclick="submitExam()">최종 답안 제출 <i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>

        `;
            html = html.substring(0, start) + newNav + html.substring(end);
        }
    }

    // 6. Update jumpToQ logic
    if (html.includes('function jumpToQ(')) {
        html = html.replace('if(qNum >= 14 && qNum <= 15) {', 'if(qNum >= 14 && qNum <= 15) {\n                goToSet(1);\n            } else if(qNum >= 16 && qNum <= 18) {\n                goToSet(2);\n            } else if(qNum >= 19 && qNum <= 20) {\n                goToSet(3);\n            }');
        html = html.replace('                goToSet(1);\n            } else if(qNum >= 16 && qNum <= 18) {\n                goToSet(2);\n            }', '');

        html = html.split(`document.getElementById('passage-set-2').style.display = 'none';`).join(`document.getElementById('passage-set-2').style.display = 'none';\n            document.getElementById('passage-set-3').style.display = 'none';`);
        html = html.split(`document.getElementById('q-set-2').style.display = 'none';`).join(`document.getElementById('q-set-2').style.display = 'none';\n            document.getElementById('q-set-3').style.display = 'none';`);
        html = html.split(`document.getElementById('nav-set-2').style.display = 'none';`).join(`document.getElementById('nav-set-2').style.display = 'none';\n            document.getElementById('nav-set-3').style.display = 'none';`);
    }

    fs.writeFileSync(filename, html, 'utf8');
}

processExam('student_take_test.html');
processExam('level_test_exam.html');
console.log('Successfully updated CBT files with aesthetic fixes and Question Set 3 pagination!');
