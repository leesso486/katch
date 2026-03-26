const fs = require('fs');
let html = fs.readFileSync('my_learning.html', 'utf8');

// The missing </div> for panel-dashboard needs to be precisely placed before PANEL: 숙제 현황
html = html.replace(/(<!-- ============================\s*PANEL: 숙제 현황 \(GVR\/OMR\))/, '</div>\n\n            $1');

// Let's also ensure NO EXTRA </div> are at the end of the file that would try to improperly match this.
// Because the document originally had balanced divs, an unclosed panel-dashboard means an EXTRA </div> exists at the very end of <main>.
// Let's check lines 664-668
// 664:                     </ul>
// 665:                 </div>
// 666:             </div>
// 667: 
// 668:         </main>

// Replace 3 </div> before </main> with just 2 </div>, because we are moving one </div> up.
// Actually, I don't need to replace by line numbers. Just replace "</div>\n        </main>" with "</main>".
// Wait, simple-panel closed, content-panel closed -> 2 divs. 
// If there was an extra, it would look like </div>\n</div>\n        </main>
html = html.replace(/<\/div>\s*<\/main>/, '</main>');

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Fixed missing div for panel-dashboard');
