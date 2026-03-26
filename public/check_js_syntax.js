const fs = require('fs');

let html = fs.readFileSync('my_learning.html', 'utf8');

// Extract all contents inside <script> tags to see if they compile in Node!
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let allScripts = '';
while ((match = scriptRegex.exec(html)) !== null) {
    allScripts += match[1] + '\n';
}

// We will test if the code has a syntax error using the built-in syntax checker
try {
    const vm = require('vm');
    // Mock the DOM
    const sandbox = {
        document: {
            getElementById: () => ({ getContext: () => ({}) }),
            addEventListener: () => {},
            querySelectorAll: () => { return { forEach: () => {} } }
        },
        window: {
            dispatchEvent: () => {}
        },
        Chart: {
            register: () => {}
        },
        ChartDataLabels: {},
        setTimeout: setTimeout,
        requestAnimationFrame: () => {}
    };
    
    // Test compile
    const script = new vm.Script(allScripts);
    console.log("Syntax is VALID!");
    
} catch (e) {
    console.error("Syntax Error found:", e.message);
    // Find approximate line
    console.error(e.stack);
}
