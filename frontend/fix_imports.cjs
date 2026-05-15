const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const apiLibPath = path.join(srcDir, 'lib', 'api.ts');

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
    if (content.includes('import API_BASE')) {
        const fileDir = path.dirname(file);
        let relPath = path.relative(fileDir, path.dirname(apiLibPath)).replace(/\\/g, '/');
        if (relPath === '') relPath = '.';
        const newImport = `import API_BASE from '${relPath}/api';`;
        
        // Replace existing API_BASE imports
        const regex = /import API_BASE from '.*';/g;
        const newContent = content.replace(regex, newImport);
        
        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated import in: ${path.relative(srcDir, file)} -> ${newImport}`);
        }
    }
});
