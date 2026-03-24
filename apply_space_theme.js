const fs = require('fs');
const path = require('path');
const dir = path.join('C:', 'Users', 'SsoHot', 'Desktop', '수능사이트시안', 'katch-web', 'public');

// 1. Update style.css
let stylePath = path.join(dir, 'style.css');
let styleCss = fs.readFileSync(stylePath, 'utf8');

// Replace :root
const newRoot = `:root {
    /* Space Theme Primary Colors */
    --navy: #0B0D17;
    --navy-light: #15192B;
    --orange: #E91E63;
    --orange-light: #FF2A75;
    --blue: #00E5FF;
    --blue-light: #5CE1E6;
    
    /* Secondary & Accents */
    --indigo: #6018FF;
    --green: #00FF9D;
    --teal: #00E5FF;
    --red: #FF3366;
    --purple: #B200FF;
    --yellow: #FFD700;
    --gold: #FFB300;
    
    /* Neutrals inverted for dark mode */
    --gray-900: #FFFFFF;
    --gray-700: #9CA3AF;
    --gray-400: #6B7280;
    --gray-200: rgba(255, 255, 255, 0.1);
    --gray-100: rgba(255, 255, 255, 0.05);
    --white: rgba(20, 25, 45, 0.7);
    
    /* Typo */
    --font-main: 'Pretendard', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    
    /* Shadow */
    --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.5);
    --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.6);
    --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.8);
    --shadow-glass: 0 8px 32px rgba(0, 229, 255, 0.15);
    --shadow-neon: 0 0 10px rgba(233, 30, 99, 0.5), 0 0 20px rgba(233, 30, 99, 0.3);
}`;
styleCss = styleCss.replace(/:root\s*{[^}]*}/, newRoot);

// Replace body
const newBody = `body {
    font-family: var(--font-main);
    color: var(--gray-900);
    line-height: 1.5;
    background: radial-gradient(ellipse at top right, #1B1135 0%, #0B0D17 50%, #05060A 100%);
    background-attachment: fixed;
    overflow-x: hidden;
}`;
styleCss = styleCss.replace(/body\s*{[^}]*}/, newBody);

// Replace Unified Global Header
const newGlobalHeader = `/* --- Unified Global Header --- */
.header-top-bar { background: rgba(11, 13, 23, 0.6); padding: 5px 0; font-size: 12px; color: #9CA3AF; border-bottom: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(10px); }
.target-switch { display: inline-flex; background: rgba(255,255,255,0.05); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
.target-switch a { padding: 4px 15px; color: #9CA3AF; text-decoration: none; font-weight: bold; transition: 0.2s; }
.target-switch a.active { background: var(--orange); color: white; box-shadow: var(--shadow-neon); }

.main-gnb { display: flex; align-items: center; justify-content: space-between; padding: 15px 0; }
.main-gnb .logo h1 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 28px; color: #FFF; margin: 0; letter-spacing: -1px; text-shadow: 0 0 15px rgba(255,255,255,0.2); }
.main-gnb .logo .dot { color: var(--orange); text-shadow: var(--shadow-neon); }
.gnb-links { display: flex; gap: 30px; font-size: 16px; font-weight: 700; align-items: center; margin: 0; padding: 0; }
.gnb-links a { color: #FFF; text-decoration: none; transition: 0.2s; }
.gnb-links a:hover { color: var(--blue); text-shadow: 0 0 10px rgba(0, 229, 255, 0.6); }
.header-utils { display: flex; gap: 15px; align-items: center; font-size: 20px; color: #FFF; }
.header-utils a:hover { color: var(--blue); text-shadow: 0 0 10px rgba(0, 229, 255, 0.6); }`;

styleCss = styleCss.replace(/\/\* --- Unified Global Header --- \*\/[\s\S]*$/, newGlobalHeader);

// In style.css add backdrop filter to things that use var(--white)
styleCss = styleCss.replace(/background:\s*var\(--white\);/g, 'background: var(--white); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08);');
styleCss = styleCss.replace(/background:\s*#fff;/g, 'background: var(--white); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08);');
styleCss = styleCss.replace(/background:\s*#ffffff;/g, 'background: var(--white); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08);');

fs.writeFileSync(stylePath, styleCss, 'utf8');

// 2. Update sub.css
let subPath = path.join(dir, 'sub.css');
let subCss = fs.readFileSync(subPath, 'utf8');

subCss = subCss.replace(/background:\s*#f4f6f8;/g, 'background: transparent;');
subCss = subCss.replace(/background:\s*#fff;/g, 'background: rgba(20, 25, 45, 0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08);');
subCss = subCss.replace(/color:\s*#333;/g, 'color: #FFFFFF;');
subCss = subCss.replace(/color:\s*#555;/g, 'color: #D1D5DB;');
subCss = subCss.replace(/color:\s*#666;/g, 'color: #9CA3AF;');
subCss = subCss.replace(/border: 1px solid #e0e0e0;/g, 'border: 1px solid rgba(255,255,255,0.1);');
subCss = subCss.replace(/border-bottom: 2px solid #ccc;/g, 'border-bottom: 2px solid rgba(255,255,255,0.1);');
subCss = subCss.replace(/background:\s*#fafafa;/g, 'background: rgba(255,255,255,0.03);');
subCss = subCss.replace(/border: 2px solid #ddd;/g, 'border: 2px solid rgba(255,255,255,0.1);');
subCss = subCss.replace(/background: #f0f4f8;/g, 'background: rgba(255,255,255,0.1);');
subCss = subCss.replace(/background:\s*#f9f9f9;/g, 'background: rgba(255,255,255,0.02);');
subCss = subCss.replace(/background:\s*#eee;/g, 'background: rgba(255,255,255,0.1);');

fs.writeFileSync(subPath, subCss, 'utf8');

// 3. Update update_headers.js
let hdrPath = path.join(dir, 'update_headers.js');
let hdrJs = fs.readFileSync(hdrPath, 'utf8');
hdrJs = hdrJs.replace(/<header class="bg-white" style="border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 90;">/, 
    '<header class="main-header" style="background: rgba(11, 13, 23, 0.6); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.05); position: sticky; top: 0; z-index: 90;">');
fs.writeFileSync(hdrPath, hdrJs, 'utf8');

console.log("Space theme CSS applied to style.css and sub.css");
