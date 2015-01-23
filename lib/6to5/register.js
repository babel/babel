"use strict";

require("./polyfill");

var sourceMapSupport = require("source-map-support");
var registerCache    = require("./register-cache");
var util             = require("./util");
var to5              = require("./index");
var fs               = require("fs");
var _                = require("lodash");

sourceMapSupport.install({
  retrieveSourceMap: function (source) {
    var map = maps && maps[source];
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

registerCache.load();
var cache = registerCache.get();

//

var transformOpts = {};
var ignoreRegex   = /node_modules/;
var onlyRegex;
var whitelist     = [];
var exts          = {};
var maps          = {};
var old           = require.extensions[".js"];

var mtime = function (filename) {
  return +fs.statSync(filename).mtime;
};

var loader = function (m, filename) {
  if ((ignoreRegex && ignoreRegex.test(filename)) || (onlyRegex && !onlyRegex.test(filename))) {
    return old.apply(this, arguments);
  }

  var result;

  if (cache) {
    var cached = cache[filename];
    if (cached && cached.mtime === mtime(filename)) {
      result = cached;
    }
  }

  result = result || to5.transformFileSync(filename, _.extend({
    whitelist: whitelist,
    sourceMap: true,
    ast:       false
  }, transformOpts));

  if (cache) {
    result.mtime = mtime(filename);
    cache[filename] = result;
  }

  maps[filename] = result.map;

  m._compile(result.code, filename);
};

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

hookExtensions(util.canCompile.EXTENSIONS);

module.exports = function (opts) {
  // normalise options
  opts = opts || {};

  if (opts.only != null) onlyRegex = util.regexify(opts.only);
  if (opts.ignore != null) ignoreRegex = util.regexify(opts.ignore);

  if (opts.extensions) hookExtensions(util.arrayify(opts.extensions));

  if (opts.cache === false) cache = null;

  delete opts.extensions;
  delete opts.ignore;
  delete opts.cache;
  delete opts.only;

  _.extend(transformOpts, opts);
};
