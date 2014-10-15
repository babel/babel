require("./polyfill");

var sourceMapSupport = require("source-map-support");
var to5              = require("./index");

sourceMapSupport.install({
  retrieveSourceMap: function (source) {
    var map = maps[source];
    if (map) {
      return {
        url: null,
        map: map
      };
    } else {
      return null;
    }
  }
});

var ignoreRegex = /node_modules/;
var maps        = {};
var old         = require.extensions[".js"];
var extensions = [".js", ".es6"]

function loader (m, filename) {
  if (ignoreRegex && ignoreRegex.test(filename)) {
    return old.apply(this, arguments);
  }

  var result = to5.transformFileSync(filename, {
    sourceMap: true
  });

  maps[filename] = result.map;

  m._compile(result.code, filename);
};

module.exports = function (options) {
  if (options.ignoreRegex) {
    ignoreRegex = options.ignoreRegex;
  }

  if(options.extensions) {
    extensions = options.extensions;
  }

  for (var e in extensions) {
    require.extensions[extensions[e]] = loader;
  }
};
