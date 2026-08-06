const fs = require('fs');
const path = require('path');

function searchDir(dir, pattern) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'vendor') continue;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            searchDir(fullPath, pattern);
        } else if (file.endsWith('.php') || file.endsWith('.html') || file.endsWith('.json') || file.endsWith('.css') || file.endsWith('.blade.php')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                if (content.toLowerCase().includes(pattern.toLowerCase())) {
                    console.log(`FOUND in: ${fullPath}`);
                }
            } catch (e) {}
        }
    }
}

console.log("Searching for 'Digital Newspaper'...");
searchDir(path.join(__dirname, '..', 'Newyorkerherald-Private'), 'Digital Newspaper');
searchDir(path.join(__dirname, '..', 'Newyorkerherald-Public'), 'Digital Newspaper');

console.log("Searching for 'Fashion Exhibitions'...");
searchDir(path.join(__dirname, '..', 'Newyorkerherald-Private'), 'Fashion Exhibitions');
searchDir(path.join(__dirname, '..', 'Newyorkerherald-Public'), 'Fashion Exhibitions');

console.log("Searching for 'Top Stories'...");
searchDir(path.join(__dirname, '..', 'Newyorkerherald-Private'), 'Top Stories');
searchDir(path.join(__dirname, '..', 'Newyorkerherald-Public'), 'Top Stories');
