import deepClone from "lodash/cloneDeep";
import sourceMapSupport from "source-map-support";
import * as registerCache from "./cache";
import extend from "lodash/extend";
import * as babel from "babel-core";
import { addHook } from "pirates";
import { util, OptionManager } from "babel-core";
import fs from "fs";
import path from "path";

sourceMapSupport.install({
  handleUncaughtExceptions: false,
  retrieveSourceMap(source) {
    let map = maps && maps[source];
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

registerCache.load();
let cache = registerCache.get();

let transformOpts = {};

let ignore;
let only;

let revert        = null;
let maps          = {};

let cwd = process.cwd();

function getRelativePath(filename) {
  return path.relative(cwd, filename);
}

function mtime(filename) {
  return +fs.statSync(filename).mtime;
}

function compile(code, filename) {
  let result;

  // merge in base options and resolve all the plugins and presets relative to this file
  let opts = new OptionManager().init(extend(deepClone(transformOpts), {
    filename
  }));

  let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;

  let env = process.env.BABEL_ENV || process.env.NODE_ENV;
  if (env) cacheKey += `:${env}`;

  if (cache) {
    let cached = cache[cacheKey];
    if (cached && cached.mtime === mtime(filename)) {
      result = cached;
    }
  }

  if (!result) {
    result = babel.transform(code, extend(opts, {
      // Do not process config files since has already been done with the OptionManager
      // calls above and would introduce duplicates.
      babelrc: false,
      sourceMaps: "both",
      ast:       false
    }));
  }

  if (cache) {
    cache[cacheKey] = result;
    result.mtime = mtime(filename);
  }

  maps[filename] = result.map;

  return result.code;
}

function shouldIgnore(filename) {
  if (!ignore && !only) {
    return getRelativePath(filename).split(path.sep).indexOf("node_modules") >= 0;
  } else {
    return util.shouldIgnore(filename, ignore || [], only);
  }
}

function hookExtensions(exts) {
  if (revert) revert();
  revert = addHook(compile, { exts, matcher: shouldIgnore, ignoreNodeModules: false });
}

hookExtensions(util.canCompile.EXTENSIONS);

export default function (opts?: Object = {}) {
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
