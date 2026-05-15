const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // The issue is `${API_BASE}/api/... ' or `${API_BASE}' -> notice the trailing single quote instead of backtick
    // Let's replace `${API_BASE}([^']*)' with `${API_BASE}$1`
    const regex = /`\$\{API_BASE\}([^']*)'/g;
    
    const newContent = content.replace(regex, '`${API_BASE}$1`');
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Fixed trailing quotes in: ${path.relative(srcDir, file)}`);
    }
});
