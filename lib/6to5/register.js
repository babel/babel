require("./polyfill");

var sourceMapSupport = require("source-map-support");
var to5              = require("./index");
var _                = require("lodash");

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

//

var ignoreRegex = /node_modules/;
var exts        = [];
var maps        = {};
var old         = require.extensions[".js"];

var loader = function (m, filename) {
  if (ignoreRegex && ignoreRegex.test(filename)) {
    return old.apply(this, arguments);
  }

  var result = to5.transformFileSync(filename, {
    sourceMap: true
  });

  maps[filename] = result.map;

  m._compile(result.code, filename);
};

var hookExtensions = function (_exts) {
  _.each(exts, function (ext) {
    delete require.extensions[ext];
  });

  exts = _exts;

  _.each(exts, function (ext) {
    require.extensions[ext] = loader;
  });
};

hookExtensions([".es6", ".js"]);

module.exports = function (opts) {
  opts = opts || {};
  if (_.isRegExp(opts)) opts = { ignoreRegex: opts };

  if (opts.ignoreRegex != null) {
    ignoreRegex = opts.ignoreRegex;
  }

  if (opts.extensions) hookExtensions(opts.extensions);
};
