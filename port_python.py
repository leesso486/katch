import re
import json

def style_to_jsx(style_str):
    styles = {}
    for rule in style_str.split(';'):
        if ':' not in rule: continue
        k, v = rule.split(':', 1)
        k = k.strip()
        v = v.strip()
        # kebab to camel notation
        parts = k.split('-')
        k = parts[0] + ''.join(x.capitalize() for x in parts[1:])
        styles[k] = v
    return "{{" + ", ".join(f'"{k}": "{v}"' for k,v in styles.items()) + "}}"

def html_to_jsx(filepath, outpath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find dash-container
    match = re.search(r'<div class="dash-container">.*?(?=<script>|</body)', html, flags=re.DOTALL)
    if not match:
        dash = html
    else:
        dash = match.group(0)

    # replace class with className
    dash = dash.replace('class="', 'className="')

    # replace style
    dash = re.sub(r'style="(.*?)"', lambda m: "style=" + style_to_jsx(m.group(1)), dash)

    # self close tags
    dash = re.sub(r'<input([^>]*?)>', lambda m: f"<input{m.group(1)} />" if not m.group(1).endswith("/") else m.group(0), dash)
    dash = dash.replace('<br>', '<br />')
    dash = re.sub(r'<img([^>]*?)>', lambda m: f"<img{m.group(1)} />" if not m.group(1).endswith("/") else m.group(0), dash)
    
    # remove onclick
    dash = re.sub(r'\s+onclick="[^"]*"', '', dash)
    dash = re.sub(r'\s+onmouseover="[^"]*"', '', dash)
    dash = re.sub(r'\s+onmouseout="[^"]*"', '', dash)

    # Convert JS comments if any html ones
    dash = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', dash, flags=re.DOTALL)

    tsx = f"""'use client';
import React from 'react';

export default function Page() {{
    return (
        <>
            {dash}
        </>
    );
}}
"""
    with open(outpath, 'w', encoding='utf-8') as f:
        f.write(tsx)

html_to_jsx('public/teacher_ui.html', 'src/app/teacher/page.tsx')
html_to_jsx('public/admin_gvr_analytics.html', 'src/app/teacher/analytics/page.tsx')
html_to_jsx('public/admin_input.html', 'src/app/teacher/input/page.tsx')
