import "../../polyfill";
import sourceMapSupport from "source-map-support";
import * as registerCache from "./cache";
import resolveRc from "./resolve-rc";
import extend from "lodash/object/extend";
import * as babel from "../node";
import each from "lodash/collection/each";
import * as util from  "../../util";
import fs from "fs";

sourceMapSupport.install({
  handleUncaughtExceptions: false,
  retrieveSourceMap(source) {
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
var oldHandlers   = {};
var maps          = {};

var mtime = function (filename) {
  return +fs.statSync(filename).mtime;
};

var compile = function (filename) {
  var result;

  var opts = extend({}, transformOpts);
  resolveRc(filename, opts);

  var cacheKey = filename + ":" + JSON.stringify(opts);

  if (cache) {
    var cached = cache[cacheKey];
    if (cached && cached.mtime === mtime(filename)) {
      result = cached;
    }
  }

  if (!result) {
    result = babel.transformFileSync(filename, extend(opts, {
      sourceMap: true,
      ast:       false
    }));
  }

  if (cache) {
    result.mtime = mtime(filename);
    cache[cacheKey] = result;
  }

  maps[filename] = result.map;

  return result.code;
};

var shouldIgnore = function (filename) {
  return (ignoreRegex && ignoreRegex.test(filename)) || (onlyRegex && !onlyRegex.test(filename));
};

var istanbulMonkey = {};

if (process.env.running_under_istanbul) { // jshint ignore:line
  // we need to monkey patch fs.readFileSync so we can hook into
  // what istanbul gets, it's extremely dirty but it's the only way
  var _readFileSync = fs.readFileSync;

  fs.readFileSync = function (filename) {
    if (istanbulMonkey[filename]) {
      delete istanbulMonkey[filename];
      var code = compile(filename);
      istanbulMonkey[filename] = true;
      return code;
    } else {
      return _readFileSync.apply(this, arguments);
    }
  };
}

var istanbulLoader = function (m, filename, old) {
  istanbulMonkey[filename] = true;
  old(m, filename);
};

var normalLoader = function (m, filename) {
  m._compile(compile(filename), filename);
};

var registerExtension = function (ext) {
  var old = oldHandlers[ext] || oldHandlers[".js"];

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
  each(oldHandlers, function (old, ext) {
    if (old === undefined) {
      delete require.extensions[ext];
    } else {
      require.extensions[ext] = old;
    }
  });

  oldHandlers = {};

  each(_exts, function (ext) {
    oldHandlers[ext] = require.extensions[ext];
    registerExtension(ext);
  });
};

hookExtensions(util.canCompile.EXTENSIONS);

export default function (opts) {
  // normalize options
  opts ||= {};

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
