var detective = require('../faster.js');
var fs = require('fs');

var src = fs.readFileSync(process.argv[2], 'utf8');
var t0 = Date.now();
var requires = detective(src);
console.log(Date.now() - t0);
