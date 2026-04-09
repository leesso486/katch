const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

function convertHtmlToNextJs(htmlFilePath, outDir, pageName) {
    const htmlObj = fs.readFileSync(htmlFilePath, 'utf8');
    const $ = cheerio.load(htmlObj, { decodeEntities: false });

    // 1. Extract CSS
    let cssContent = '';
    $('style').each((i, el) => {
        cssContent += $(el).html() + '\n';
        $(el).remove();
    });
    fs.writeFileSync(path.join(outDir, `${pageName}.css`), cssContent, 'utf8');

    // 2. Extract Scripts for manual conversion
    let jsContent = '';
    $('script').not('[src]').each((i, el) => {
        jsContent += $(el).html() + '\n';
        $(el).remove();
    });
    fs.writeFileSync(path.join(outDir, `_raw_scripts.js`), jsContent, 'utf8');

    // 3. Extract body content or main container
    let bodyHtml = $('body').html();
    if ($('.dashboard-container').length > 0) {
        bodyHtml = $.html('.dashboard-container');
    } else if ($('.admin-layout').length > 0) {
        bodyHtml = $.html('.admin-layout');
    }
    
    // Convert to JSX
    let jsx = bodyHtml;
    // Replace class => className
    jsx = jsx.replace(/class="/g, 'className="');
    // Replace inline styles logically (Basic inline styles -> object)
    // Note: robust inline style parsing is complex, we just do a simplistic regex for cases
    // style="width: 100%; height: 250px;" -> style={{width: "100%", height: "250px"}}
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styles) => {
        const rules = styles.split(';').filter(r => r.trim() !== '');
        const objStr = rules.map(rule => {
            let [key, val] = rule.split(':');
            if(!val) return '';
            key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            val = val.trim();
            // Handle numeric values
            if (!isNaN(val) && val !== '') {
                return `${key}: ${val}`;
            }
            return `${key}: '${val}'`;
        }).filter(r=>Math.abs(r.length) > 0).join(', ');
        return `style={{ ${objStr} }}`;
    });
    
    // Self-closing tags fixing (br, img, input, hr)
    jsx = jsx.replace(/<(br|hr|img|input)([^>]*?)(?<!\/)>/g, '<$1$2 />');
    
    // Replace for attribute => htmlFor
    jsx = jsx.replace(/for="/g, 'htmlFor="');

    // Convert comments
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

    // Convert string interpolation templates used in pure JS string? (e.g. ${}) 
    // They are safe in JSX if wrapped, but here they are raw html.
    jsx = jsx.replace(/\${([^}]*)}/g, '{\\$$1}');

    const tsxTemplate = `
"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from './${pageName}.css';

// Register Plugin
Chart.register(ChartDataLabels);

export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {
    // Refs for charts
    const chartRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({});

    useEffect(() => {
        // Chart initialization logic here
        // Please look at _raw_scripts.js for reference.
        
        return () => {
            // cleanup charts
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            ${jsx}
        </div>
    );
}
`;

    fs.writeFileSync(path.join(outDir, `page.tsx`), tsxTemplate, 'utf8');
}

convertHtmlToNextJs('public/dashboard_online.html', 'src/app/dashboard/student', 'student');
convertHtmlToNextJs('public/admin_gvr_analytics.html', 'src/app/dashboard/teacher', 'teacher');
convertHtmlToNextJs('public/admin_student_detail.html', 'src/app/dashboard/teacher/student-detail', 'detail');

console.log("TSX Files generated!");
