const fs = require('fs');
const path = require('path');

function listFilePaths(dirName, filePaths = []) {
    const entries = fs.readdirSync(dirName);

    entries.forEach((entry) => {
        const fullPath = path.join(dirName, entry);
        const entryStat = fs.statSync(fullPath);

        if (entryStat.isDirectory()) {
            filePaths.concat(listFilePaths(fullPath, filePaths));
        } else {
            filePaths.push(fullPath);
        }
    });

    return filePaths;
}

module.exports = (dirName) => {
    const filePaths = listFilePaths(dirName);

    filePaths.forEach((filePath) => {
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' });

        console.log(content);
    });
};

const f = module.exports('src/test/yaml');

console.log(f);
