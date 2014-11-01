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
var blacklist   = [];
var exts        = {};
var maps        = {};
var old         = require.extensions[".js"];

var loader = function (m, filename) {
  if (ignoreRegex && ignoreRegex.test(filename)) {
    return old.apply(this, arguments);
  }

  var result = to5.transformFileSync(filename, {
    sourceMap: true,
    blacklist: blacklist
  });

  maps[filename] = result.map;

  m._compile(result.code, filename);
};

var addToBlacklist = function (array) {
  blacklist = _.union(blacklist, array)
}

var hookExtensions = function (_exts) {
  _.each(exts, function (old, ext) {
    require.extensions[ext] = old;
  });

  exts = {};

  _.each(_exts, function (ext) {
    exts[ext] = require.extensions[ext];
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

  if (opts.blacklist) addToBlacklist(opts.blacklist);
};
