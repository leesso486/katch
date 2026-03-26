const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

// The issue: AT line 408, panel-dashboard is prematurely closed!
// 405:                             <div class="exam-score">68<span style="font-size:14px; color:#888;">점</span><a href="report_premium.html">성적표 보기</a></div>
// 406:                         </div>
// 407:                     </div>
// 408:                 </div>
// 409:                 
// 410:                 
// 411: 
// 412:                     
// 413:                     
// 414:                     <!-- 4-Panel Dashboard Section -->

const badStructureRegex = /(<div class="dash-card">\s*<div class="dash-card-title">응시 이력[^<]+<\/a><\/div>[\s\S]*?<div class="exam-item">[\s\S]*?<div class="exam-score">68[^<]+<\/span><a href="report_premium\.html">성적표 보기<\/a><\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*(?=<!-- 4-Panel Dashboard Section -->)/;

html = html.replace(badStructureRegex, '$1\n');

// By removing that </div>, panel-dashboard now wraps the 4-panel dashboard section!
// And the </div> at the end of the restored block (before PANEL: 진단테스트) will correctly close panel-dashboard!

// Now check if there are any other bad closures.
// The restored block ends with:
// 477:                         </div>
// 478:                     </div>
// 479:                 </div>
// 480:             <!-- ============================
// 481:                  PANEL: 진단테스트

const endBlockRegex = /<span style="font-size:13px; font-weight:bold; color:#1a237e;">지난 결과 보기 &rarr;<\/span>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- ============================/g;
// Ensure we don't have multiple </div> if not needed, but here `</div>` (flex item) -> `</div>` (flex container) -> `</div>` (panel-dashboard) is EXACTLY what we want!

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Fixed my_learning.html DOM structure');
