require("./polyfill");

var maps = {};
var node = require("./node");
var old  = require.extensions[".js"];

// TODO: source maps - Error.prepareStackTrace override

require.extensions[".js"] =
require.extensions[".es6"] = function (m, filename) {
  if (filename.indexOf("node_modules") >= 0) {
    return old.apply(this, arguments);
  }

  var result = node.transformFileSync(filename, {
    sourceMapObject: true
  });

  //maps[filename] = result.map;

  m._compile(result.code, filename);
};
