const fs = require('fs');

function htmlToJsx(filepath, outfile) {
    let html = fs.readFileSync(filepath, 'utf-8');
    let dashMatch = html.match(/<div class="dash-container">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*(\n|<script>|\s*<!--)/);
    if(!dashMatch) {
        // Try another way
        let idx = html.indexOf('<div class="dash-container">');
        let idxEnd = html.indexOf('<script>');
        if(idxEnd === -1) idxEnd = html.length;
        dashMatch = [html.substring(idx, idxEnd)];
    }
    
    let dash = dashMatch[0];
    if(dash.includes('<script>')) {
        dash = dash.substring(0, dash.indexOf('<script>'));
    }

    dash = dash.replace(/class=/g, 'className=');
    dash = dash.replace(/style="(.*?)"/g, (match, p1) => {
        let styles = p1.split(';').filter(s => s.trim() !== '');
        let jsxStyles = {};
        styles.forEach(s => {
            let parts = s.split(':');
            let key = parts.shift();
            let val = parts.join(':');
            if(!key || !val) return;
            key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            jsxStyles[key] = val.trim();
        });
        return 'style={{' + JSON.stringify(jsxStyles).slice(1,-1) + '}}';
    });

    dash = dash.replace(/<input(.*?)>/g, (match, p1) => {
        if(p1.endsWith('/')) return match;
        return `<input${p1} />`;
    });
    dash = dash.replace(/<br>/g, '<br />');
    dash = dash.replace(/<img(.*?)>/g, (match, p1) => {
        if(p1.endsWith('/')) return match;
        return `<img${p1} />`;
    });
    
    dash = dash.replace(/onclick=".*?"/g, ''); // strip onclicks
    dash = dash.replace(/onmouseover=".*?"/g, ''); 
    dash = dash.replace(/onmouseout=".*?"/g, ''); 
    dash = dash.replace(/<!--[\s\S]*?-->/g, ''); // strip html comments

    let tsx = `'use client';
import React, { useState } from 'react';

export default function Page() {
    return (
        <>
            ${dash}
        </>
    );
}
`;
    fs.writeFileSync(outfile, tsx);
    console.log(`Ported ${filepath} to ${outfile}`);
}

htmlToJsx('public/teacher_ui.html', 'src/app/teacher/page.tsx');
htmlToJsx('public/admin_gvr_analytics.html', 'src/app/teacher/analytics/page.tsx');
htmlToJsx('public/admin_input.html', 'src/app/teacher/input/page.tsx');
