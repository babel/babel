var maps = {};
var old  = require.extensions[".js"];

require.extensions[".js"] = function (m, filename) {
  if (filename.indexOf("node_modules") >= 0) {
    return old.apply(this, arguments);
  }

  var result = exports.transformFileSync(filename, {
    sourceMapObject: true
  });

  maps[flename] = result.map;

  m._compile(result.code, filename);
};
