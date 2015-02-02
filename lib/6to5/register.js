"use strict";

require("./polyfill");

var sourceMapSupport = require("source-map-support");
var registerCache    = require("./register-cache");
var util             = require("./util");
var to5              = require("./index");
var fs               = require("fs");
var extend           = require("lodash/object/extend");
var each             = require("lodash/collection/each");

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
var exts          = {};
var maps          = {};

var mtime = function (filename) {
  return +fs.statSync(filename).mtime;
};

var compile = function (filename) {
  var result;

  if (cache) {
    var cached = cache[filename];
    if (cached && cached.mtime === mtime(filename)) {
      result = cached;
    }
  }

  if (!result) {
    result = to5.transformFileSync(filename, extend({
      sourceMap: true,
      ast:       false
    }, transformOpts));
  }

  if (cache) {
    result.mtime = mtime(filename);
    cache[filename] = result;
  }

  maps[filename] = result.map;

  return result.code;
};

var shouldIgnore = function (filename) {
  return (ignoreRegex && ignoreRegex.test(filename)) || (onlyRegex && !onlyRegex.test(filename));
};

var istanbulLoader = function (m, filename, old) {
  // we need to monkey patch fs.readFileSync so we can hook into
  // what istanbul gets, it's extremely dirty but it's the only way
  var _readFileSync = fs.readFileSync;

  fs.readFileSync = function () {
    fs.readFileSync = _readFileSync;
    return compile(filename);
  };

  old(m, filename);
};

var normalLoader = function (m, filename) {
  m._compile(compile(filename), filename);
};

var registerExtension = function (ext) {
  var old = require.extensions[ext];

  var loader = normalLoader;
  if (process.env.running_under_istanbul) loader = istanbulLoader; // jshint ignore:line

  require.extensions[ext] = function (m, filename) {
    if (shouldIgnore(filename)) {
      old(m, filename);
    } else {
      loader(m, filename, old);
    }
  };
};

var hookExtensions = function (_exts) {
  each(exts, function (old, ext) {
    require.extensions[ext] = old;
  });

  exts = {};

  each(_exts, function (ext) {
    exts[ext] = require.extensions[ext];
    registerExtension(ext);
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

  extend(transformOpts, opts);
};
