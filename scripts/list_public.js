const fs = require('fs');
const path = require('path');

function findFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            findFiles(fullPath);
        } else {
            console.log(fullPath);
        }
    }
}

findFiles(path.join(__dirname, '..', 'Newyorkerherald-Public'));
