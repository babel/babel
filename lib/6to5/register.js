require("./polyfill");

var maps = {};
var node = require("./node");
var old  = require.extensions[".js"];

// escodegen lazy requires source-map so we force it to load before we override
// the built-in requires
var escodegen = require("escodegen");
escodegen.generate({ type: "Program", body: [] }, { sourceMap: true });

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
