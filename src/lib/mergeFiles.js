const fs = require('fs');
// yaml = require('js-yaml');

// // Get document, or throw exception on error
// try {
//     var doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
//     console.log(doc);
// } catch (e) {
//     console.log(e);
// }

const x = fs.readdirSync('./');

console.log(x);
