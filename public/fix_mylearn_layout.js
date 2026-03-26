const fs = require('fs');

let html = fs.readFileSync('my_learning.html', 'utf8');

// 1. Remove the two extra </div>s around line 508, 509
let lines = html.split('\n');

// Find where panel-diag starts to know exactly the rogue tags before it
let diagIndex = lines.findIndex(l => l.includes('id="panel-diag"'));
// Look upwards from panel-diag to find the </div></div> sequence
let removedCount = 0;
for(let i = diagIndex - 1; i >= diagIndex - 6; i--) {
    if(lines[i].trim() === '</div>') {
        lines[i] = ''; // remove
        removedCount++;
        if(removedCount === 2) break; // only remove exactly 2
    }
}

// 2. Remove all occurrences of </main> and the layout </div>
for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('</main>')) {
        lines[i] = lines[i].replace(/<\/main>/g, '');
    }
    // Remove the layout div closing right near the </main>
    if (lines[i].includes('</div>') && i > 690 && i < 700) {
        // Let's just remove all </div>s around line 697 that don't belong (we can just manually drop the </div> that followed </main>)
        if (lines[i].trim() === '</div>' && lines[i-1] && lines[i-1].trim() === '') {
            lines[i] = '';
        }
    }
}
// Actually, it's safer to just forcefully remove exactly one </main> and one </div> close to it.
// Then we append </main></div> right before the final <script> tag.

html = lines.join('\n');
// Ensure no </main> exists anymore
html = html.replace(/<\/main>\s*<\/div>/, ''); 
html = html.replace(/<\/main>\s*/, ''); 

// 3. Re-insert </main></div> right before <script>
html = html.replace(/(\s*)(<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/chartjs-plugin-datalabels@2\.0\.0"><\/script>)/, '$1$2'); // skip head
// Find the final script block
html = html.replace(/(\n\s*<script>\s*\/\/ New Feature: Student List Toggle)/, '\n        </main>\n    </div>\n$1');

fs.writeFileSync('my_learning.html', html, 'utf8');
console.log('Fixed my_learning.html layout closures');
