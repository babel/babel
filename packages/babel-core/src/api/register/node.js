import sourceMapSupport from "source-map-support";
import * as registerCache from "./cache";
import OptionManager from "../../transformation/file/options/option-manager";
import extend from "lodash/object/extend";
import * as babel from "../node";
import each from "lodash/collection/each";
import * as util from  "../../util";
import fs from "fs";
import path from "path";

/**
 * Install sourcemaps into node.
 */

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

/**
 * Load and setup cache.
 */

registerCache.load();
var cache = registerCache.get();

/**
 * Store options.
 */

var transformOpts = {};

var ignore;
var only;

var oldHandlers   = {};
var maps          = {};

var cwd = process.cwd();

/**
 * Get path from `filename` relative to the current working directory.
 */

var getRelativePath = function (filename){
  return path.relative(cwd, filename);
};

/**
 * Get last modified time for a `filename`.
 */

var mtime = function (filename) {
  return +fs.statSync(filename).mtime;
};

/**
 * Compile a `filename` with optional `opts`.
 */

var compile = function (filename, opts = {}) {
  var result;

  opts.filename = filename;

  var optsManager = new OptionManager;
  optsManager.mergeOptions(transformOpts);
  opts = optsManager.init(opts);

  var cacheKey = `${JSON.stringify(opts)}:${babel.version}`;

  var env = process.env.BABEL_ENV || process.env.NODE_ENV;
  if (env) cacheKey += `:${env}`;

  if (cache) {
    var cached = cache[cacheKey];
    if (cached && cached.mtime === mtime(filename)) {
      result = cached;
    }
  }

  if (!result) {
    result = babel.transformFileSync(filename, extend(opts, {
      sourceMap: "both",
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

/**
 * Test if a `filename` should be ignored by Babel.
 */

var shouldIgnore = function (filename) {
  if (!ignore && !only) {
    return getRelativePath(filename).split(path.sep).indexOf("node_modules") >= 0;
  } else {
    return util.shouldIgnore(filename, ignore || [], only);
  }
};

/**
 * Monkey patch istanbul if it is running so that it works properly.
 */

var istanbulMonkey = {};

if (process.env.running_under_istanbul) {
  // we need to monkey patch fs.readFileSync so we can hook into
  // what istanbul gets, it's extremely dirty but it's the only way
  var _readFileSync = fs.readFileSync;

  fs.readFileSync = function (filename) {
    if (istanbulMonkey[filename]) {
      delete istanbulMonkey[filename];
      var code = compile(filename, {
        auxiliaryCommentBefore: "istanbul ignore next"
      });
      istanbulMonkey[filename] = true;
      return code;
    } else {
      return _readFileSync.apply(this, arguments);
    }
  };
}

/**
 * Replacement for the loader for istanbul.
 */

var istanbulLoader = function (m, filename, old) {
  istanbulMonkey[filename] = true;
  old(m, filename);
};

/**
 * Default loader.
 */

var normalLoader = function (m, filename) {
  m._compile(compile(filename), filename);
};

/**
 * Register a loader for an extension.
 */

var registerExtension = function (ext) {
  var old = oldHandlers[ext] || oldHandlers[".js"] || require.extensions[".js"];

  var loader = normalLoader;
  if (process.env.running_under_istanbul) loader = istanbulLoader;

  require.extensions[ext] = function (m, filename) {
    if (shouldIgnore(filename)) {
      old(m, filename);
    } else {
      loader(m, filename, old);
    }
  };
};

/**
 * Register loader for given extensions.
 */

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

/**
 * Register loader for default extensions.
 */

hookExtensions(util.canCompile.EXTENSIONS);

/**
 * Update options at runtime.
 */

export default function (opts = {}) {
  if (opts.only != null) only = util.arrayify(opts.only, util.regexify);
  if (opts.ignore != null) ignore = util.arrayify(opts.ignore, util.regexify);

  if (opts.extensions) hookExtensions(util.arrayify(opts.extensions));

  if (opts.cache === false) cache = null;

  delete opts.extensions;
  delete opts.ignore;
  delete opts.cache;
  delete opts.only;

  extend(transformOpts, opts);
}
