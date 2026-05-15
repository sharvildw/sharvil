const fs = require('fs');
const path = require('path');

const tabsDir = path.join(__dirname, 'src', 'pages', 'admin', 'tabs');

const files = fs.readdirSync(tabsDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
    const filePath = path.join(tabsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix console.error(`... ', error) -> console.error('...', error)
    content = content.replace(/console\.error\(`(.*?)', error\);/g, "console.error('$1', error);");
    
    // Fix any other `something' -> 'something' that might have happened on lines like alert
    content = content.replace(/alert\(`(.*?)'\);/g, "alert('$1');");

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed quotes in ${file}`);
});
