const fs = require('fs');
const cheerio = require('cheerio');

// Load HTML files
const myLearnHtml = fs.readFileSync('public/my_learning.html', 'utf8');
const sDashHtml = fs.readFileSync('public/dashboard_online.html', 'utf8');
const tGvrHtml = fs.readFileSync('public/admin_gvr_analytics.html', 'utf8');

// Load Cheerio instances
const $myLearn = cheerio.load(myLearnHtml);
const $sDash = cheerio.load(sDashHtml);
const $tGvr = cheerio.load(tGvrHtml);

// 1. Process Student Dashboard (dashboard_online.html)
// Extract CSS
let sCss = '';
$sDash('style').each((i, el) => {
    let css = $sDash(el).html();
    // Scope body to .bento-student-wrapper
    css = css.replace(/body\s*\{/g, '.bento-student-wrapper {');
    css = css.replace(/body::before\s*\{/g, '.bento-student-wrapper::before {');
    css = css.replace(/background-color:\s*var\(--bg-color\);/g, 'background-color: var(--bg-color); min-height: 800px; border-radius: 12px; margin: -30px; padding: 30px;');
    sCss += css + '\n';
});

// Extract HTML
const sHtmlContent = $sDash('.dashboard-container').parent().html();
const sHtmlWrapper = `<style>${sCss}</style><div class="bento-student-wrapper">${$sDash('.dashboard-container').prop('outerHTML')}</div>`;

// Extract Scripts
let sJs = '';
$sDash('script').not('[src]').each((i, el) => { // ignore external scripts assuming myLearn has them
    sJs += `<script>\n${$sDash(el).html()}\n</script>\n`;
});

// Inject into #panel-dashboard
$myLearn('#panel-dashboard').html(sHtmlWrapper);


// 2. Process Teacher GVR (admin_gvr_analytics.html)
let tCss = '';
$tGvr('style').each((i, el) => {
    let css = $tGvr(el).html();
    css = css.replace(/body\s*\{/g, '.bento-teacher-wrapper {');
    css = css.replace(/body::before\s*\{/g, '.bento-teacher-wrapper::before {');
    css = css.replace(/background-color:\s*var\(--bg-color\);/g, 'background-color: var(--bg-color); min-height: 800px; border-radius: 12px; margin: -30px; padding: 30px;');
    tCss += css + '\n';
});

let tHtmlInner = $tGvr('.dashboard-container').prop('outerHTML');
// Modal is outside dashboard-container in tGvrHtml
const typeModal = $tGvr('#typeDetailModal').prop('outerHTML') || '';

const tHtmlWrapper = `<style>${tCss}</style><div class="bento-teacher-wrapper">${tHtmlInner}\n${typeModal}</div>`;

let tJs = '';
$tGvr('script').not('[src]').each((i, el) => {
    tJs += `<script>\n${$tGvr(el).html()}\n</script>\n`;
});

// Inject into #panel-teacherDash (Wait, my_learning.html uses #panel-teacherDash for GVR analysis maybe, or has #panel-teacherDash, and teacherNav has showPanel('teacherDash', ...))
// Let me double check my_learning.html using cheerio!
if ($myLearn('#panel-teacherDash').length > 0) {
    // We overwrite #panel-teacherDash
    $myLearn('#panel-teacherDash').html(tHtmlWrapper);
} else {
    console.log("Could not find #panel-teacherDash");
}

// Append Scripts to end of body
$myLearn('body').append('\n<!-- INJECTED PREMIUM SCRIPTS -->\n' + sJs + tJs);

// Write output
let outputHTML = $myLearn.html();

// Fix Cheerio sometimes un-escaping special chars incorrectly or removing self-closing tags
fs.writeFileSync('public/my_learning.html', outputHTML);
console.log('Successfully wrote to public/my_learning.html');
