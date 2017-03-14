import deepClone from "lodash/cloneDeep";
import sourceMapSupport from "source-map-support";
import * as registerCache from "./cache";
import escapeRegExp from "lodash/escapeRegExp";
import extend from "lodash/extend";
import * as babel from "babel-core";
import { OptionManager } from "babel-core";
import fs from "fs";
import path from "path";

sourceMapSupport.install({
  handleUncaughtExceptions: false,
  environment: "node",
  retrieveSourceMap(source) {
    const map = maps && maps[source];
    if (map) {
      return {
        url: null,
        map: map,
      };
    } else {
      return null;
    }
  },
});

registerCache.load();
let cache = registerCache.get();

const transformOpts = {};

let oldHandlers = {};
const maps = {};

function mtime(filename) {
  return +fs.statSync(filename).mtime;
}

function compile(filename) {
  let result;

  // merge in base options and resolve all the plugins and presets relative to this file
  const opts = new OptionManager().init(extend(
    { sourceRoot: path.dirname(filename) }, // sourceRoot can be overwritten
    deepClone(transformOpts),
    { filename }
  ));

  // Bail out ASAP if the file has been ignored.
  if (opts === null) return null;

  let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;

  const env = babel.getEnv(false);

  if (env) cacheKey += `:${env}`;

  if (cache) {
    const cached = cache[cacheKey];
    if (cached && cached.mtime === mtime(filename)) {
      result = cached;
    }
  }

  if (!result) {
    result = babel.transformFileSync(filename, extend(opts, {
      // Do not process config files since has already been done with the OptionManager
      // calls above and would introduce duplicates.
      babelrc: false,
      sourceMaps: "both",
      ast: false,
    }));
  }

  if (cache) {
    cache[cacheKey] = result;
    result.mtime = mtime(filename);
  }

  maps[filename] = result.map;

  return result.code;
}

function registerExtension(ext) {
  const old = oldHandlers[ext] || oldHandlers[".js"] || require.extensions[".js"];

  require.extensions[ext] = function (m, filename) {
    const result = compile(filename);

    if (result === null) old(m, filename);
    else m._compile(result, filename);
  };
}

function hookExtensions(_exts) {
  Object.keys(oldHandlers).forEach(function (ext) {
    const old = oldHandlers[ext];
    if (old === undefined) {
      delete require.extensions[ext];
    } else {
      require.extensions[ext] = old;
    }
  });

  oldHandlers = {};

  _exts.forEach(function (ext) {
    oldHandlers[ext] = require.extensions[ext];
    registerExtension(ext);
  });
}

hookExtensions([".js", ".jsx", ".es6", ".es"]);

export default function (opts?: Object = {}) {
  if (opts.extensions) hookExtensions(opts.extensions);

  if (opts.cache === false) cache = null;

  delete opts.extensions;
  delete opts.cache;

  extend(transformOpts, opts);

  if (!transformOpts.ignore && !transformOpts.only) {
    // By default, ignore files inside the node_modules relative to the current working directory.
    transformOpts.ignore = [
      new RegExp(
        "^" +
        escapeRegExp(process.cwd() + path.sep) +
        ".*" +
        escapeRegExp(path.sep + "node_modules" + path.sep)
      , "i"),
    ];
  }
}
