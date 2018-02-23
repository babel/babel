import deepClone from "lodash/cloneDeep";
import sourceMapSupport from "source-map-support";
import * as registerCache from "./cache";
import escapeRegExp from "lodash/escapeRegExp";
import * as babel from "@babel/core";
import { OptionManager, DEFAULT_EXTENSIONS } from "@babel/core";
import { addHook } from "pirates";
import fs from "fs";
import path from "path";

const maps = {};
let transformOpts = {};
let piratesRevert = null;

function installSourceMapSupport() {
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
}

let cache;

function mtime(filename) {
  return +fs.statSync(filename).mtime;
}

function compile(code, filename) {
  // merge in base options and resolve all the plugins and presets relative to this file
  const opts = new OptionManager().init(
    Object.assign(
      { sourceRoot: path.dirname(filename) }, // sourceRoot can be overwritten
      deepClone(transformOpts),
      { filename },
    ),
  );

  // Bail out ASAP if the file has been ignored.
  if (opts === null) return code;

  let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;

  const env = babel.getEnv(false);

  if (env) cacheKey += `:${env}`;

  if (cache) {
    const cached = cache[cacheKey];
    if (cached && cached.mtime === mtime(filename)) {
      return cached.code;
    }
  }

  const result = babel.transform(code, {
    ...opts,
    sourceMaps: opts.sourceMaps === undefined ? "both" : opts.sourceMaps,
    ast: false,
  });

  if (cache) {
    cache[cacheKey] = result;
    result.mtime = mtime(filename);
  }

  if (result.map) {
    if (Object.keys(maps).length === 0) {
      installSourceMapSupport();
    }
    maps[filename] = result.map;
  }

  return result.code;
}

function hookExtensions(exts) {
  if (piratesRevert) piratesRevert();
  piratesRevert = addHook(compile, { exts, ignoreNodeModules: false });
}

export function revert() {
  if (piratesRevert) piratesRevert();
  delete require.cache[require.resolve(__filename)];
}

register({
  extensions: DEFAULT_EXTENSIONS,
});

export default function register(opts?: Object = {}) {
  // Clone to avoid mutating the arguments object with the 'delete's below.
  opts = Object.assign({}, opts);
  if (opts.extensions) hookExtensions(opts.extensions);

  if (opts.cache === false && cache) {
    registerCache.clear();
    cache = null;
  } else if (opts.cache !== false && !cache) {
    registerCache.load();
    cache = registerCache.get();
  }

  delete opts.extensions;
  delete opts.cache;

  transformOpts = Object.assign({}, opts);

  if (transformOpts.ignore === undefined && transformOpts.only === undefined) {
    transformOpts.only = [
      // Only compile things inside the current working directory.
      new RegExp("^" + escapeRegExp(process.cwd()), "i"),
    ];
    transformOpts.ignore = [
      // Ignore any node_modules inside the current working directory.
      new RegExp(
        "^" +
          escapeRegExp(process.cwd()) +
          "(?:" +
          path.sep +
          ".*)?" +
          escapeRegExp(path.sep + "node_modules" + path.sep),
        "i",
      ),
    ];
  }
}
