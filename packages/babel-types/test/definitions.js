/*
Pull in test files from ./definitions/.
*/
var fs = require("fs");
var path = require("path");
var dirname = path.join(__dirname, "definitions");

// This is just to load additional test files. Errors within tests will be
// caught and handled by Mocha within those files. Exceptions like missing file,
// syntax error, etc. can originate or bubble up to here and keep going and be
// handled by Mocha.
fs.readdirSync(dirname).forEach(function (filename) {
  if (path.extname(filename) !== ".js") return;
  require(path.join(dirname, filename));
});
