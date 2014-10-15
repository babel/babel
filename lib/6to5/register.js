require("./polyfill");

var maps = {};
var to5  = require("./index");
var old  = require.extensions[".js"];

// TODO: source maps - Error.prepareStackTrace override

var ignoreRegex = /node_modules/;

require.extensions[".js"] =
require.extensions[".es6"] = function (m, filename) {
  if (ignoreRegex && ignoreRegex.test(filename)) {
    return old.apply(this, arguments);
  }

  var result = to5.transformFileSync(filename, {
    sourceMap: true
  });

  maps[filename] = result.map;

  m._compile(result.code, filename);
};

module.exports = function (_ignoreRegex) {
  ignoreRegex = _ignoreRegex;
};
