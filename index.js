var path = require("path");
var lib  = path.join(__dirname, "lib");

var before = Object.keys(require.cache);

var babel = require("./lib/babel/api/node.js");
module.exports = babel;

var after = Object.keys(require.cache);

var internalFiles = after.filter(function (filename) {
  // we had this file before
  if (before.indexOf(filename) >= 0) {
    return false;
  }

  // internal file
  if (filename.indexOf(lib) >= 0) {
    return true;
  }
});

internalFiles.forEach(function (filename) {
  // required by the node API method polyfill
  if (filename.indexOf("polyfill") >= 0) return;

  var cache = require.cache[filename];
  cache.exports = {
    "": "Don't hotlink internal Babel files."
  };
});
