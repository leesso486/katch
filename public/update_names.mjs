import fs from 'fs';
import path from 'path';
import glob from 'glob';

const replacements = {
    "주간 GVR - AT 6회차": "정규 GVR-68",
    "주간 GVR - AT 5회차": "정규 GVR-67",
    "주간 GVR - AT 4회차": "정규 GVR-66",
    "주간 GVR - AT 3회차": "정규 GVR-65",
    "주간 GVR - AT 2회차": "정규 GVR-64",
    "주간 GVR - AT 1회차": "정규 GVR-63",
    "GVR AT 6회차": "GVR-68",
    "GVR AT 5회차": "GVR-67",
    "GVR AT 4회차": "GVR-66",
    "GVR AT 3회차": "GVR-65",
    "GVR AT 2회차": "GVR-64",
    "GVR AT 1회차": "GVR-63",
    "AT 6회차": "GVR-68",
    "AT 5회차": "GVR-67",
    "AT 4회차": "GVR-66",
    "AT 3회차": "GVR-65",
    "AT 2회차": "GVR-64",
    "AT 1회차": "GVR-63",
    "GVR AT6": "GVR-68",
    "GVR AT5": "GVR-67",
    "GVR AT4": "GVR-66",
    "GVR AT3": "GVR-65",
    "GVR AT2": "GVR-64",
    "GVR AT1": "GVR-63",
    "AT6": "GVR-68",
    "AT5": "GVR-67",
    "AT4": "GVR-66",
    "AT3": "GVR-65",
    "AT2": "GVR-64",
    "AT1": "GVR-63",
    "GVR68": "GVR-68"
};

const filePatterns = [
    "c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public/*.html",
];

Object.keys(replacements).forEach(key => {
    // Escape regex characters
    const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    replacements[key] = {
        regex: new RegExp(safeKey, 'g'),
        val: replacements[key]
    };
});

filePatterns.forEach(pattern => {
    glob(pattern, (err, files) => {
        if (err) throw err;
        files.forEach(filepath => {
            try {
                const content = fs.readFileSync(filepath, 'utf8');
                let newContent = content;
                
                for (const key of Object.keys(replacements)) {
                    const item = replacements[key];
                    newContent = newContent.replace(item.regex, item.val);
                }
                
                if (content !== newContent) {
                    fs.writeFileSync(filepath, newContent, 'utf8');
                    console.log(`Updated: ${filepath}`);
                }
            } catch (e) {
                console.error(`Failed to process ${filepath}: ${e}`);
            }
        });
    });
});
