const fs = require('fs');
const path = require('path');

const srcCss = path.join(__dirname, '..', 'Newyorkerherald-Public', 'css', 'style.css');
const dstCss = path.join(__dirname, '..', 'public', 'css', 'style.css');

if (fs.existsSync(srcCss)) {
    const content = fs.readFileSync(srcCss, 'utf8');
    fs.writeFileSync(dstCss, content, 'utf8');
    console.log(`Copied ${content.length} bytes from ${srcCss} to ${dstCss}`);
} else {
    console.log("Source CSS not found!");
}
