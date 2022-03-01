"use strict";

const cloneDeep = require("clone-deep");
const path = require("path");
const fs = require("fs");

const babel = require("./babel-core");
const registerCache = require("../cache");

const nmRE = escapeRegExp(path.sep + "node_modules" + path.sep);

function escapeRegExp(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

let cache;
let transformOpts;
exports.setOptions = function (opts) {
  if (opts.cache === false && cache) {
    registerCache.clear();
    cache = null;
  } else if (opts.cache !== false && !cache) {
    registerCache.load();
    cache = registerCache.get();
  }

  delete opts.cache;
  delete opts.extensions;

  transformOpts = {
    ...opts,
    caller: {
      name: "@babel/register",
      ...(opts.caller || {}),
    },
  };

  let { cwd = "." } = transformOpts;

  // Ensure that the working directory is resolved up front so that
  // things don't break if it changes later.
  cwd = transformOpts.cwd = path.resolve(cwd);

  if (transformOpts.ignore === undefined && transformOpts.only === undefined) {
    const cwdRE = escapeRegExp(cwd);

    // Only compile things inside the current working directory.
    transformOpts.only = [new RegExp("^" + cwdRE, "i")];
    // Ignore any node_modules inside the current working directory.
    transformOpts.ignore = [
      new RegExp(`^${cwdRE}(?:${path.sep}.*)?${nmRE}`, "i"),
    ];
  }
};

exports.transform = async function (input, filename) {
  const opts = await babel.loadOptionsAsync({
    // sourceRoot can be overwritten
    sourceRoot: path.dirname(filename) + path.sep,
    ...cloneDeep(transformOpts),
    filename,
  });

  // Bail out ASAP if the file has been ignored.
  if (opts === null) return null;

  const { cached, store } = cacheLookup(opts, filename);
  if (cached) return cached;

  const { code, map } = await babel.transformAsync(input, {
    ...opts,
    sourceMaps: opts.sourceMaps === undefined ? "both" : opts.sourceMaps,
    ast: false,
  });

  return store({ code, map });
};

if (!process.env.BABEL_8_BREAKING) {
  exports.transformSync = function (input, filename) {
    const opts = new babel.OptionManager().init({
      // sourceRoot can be overwritten
      sourceRoot: path.dirname(filename) + path.sep,
      ...cloneDeep(transformOpts),
      filename,
    });

    // Bail out ASAP if the file has been ignored.
    if (opts === null) return null;

    const { cached, store } = cacheLookup(opts, filename);
    if (cached) return cached;

    const { code, map } = babel.transformSync(input, {
      ...opts,
      sourceMaps: opts.sourceMaps === undefined ? "both" : opts.sourceMaps,
      ast: false,
    });

    return store({ code, map });
  };
}

const id = value => value;

function cacheLookup(opts, filename) {
  if (!cache) return { cached: null, store: id };

  let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;

  const env = babel.getEnv();
  if (env) cacheKey += `:${env}`;

  const cached = cache[cacheKey];
  const fileMtime = +fs.statSync(filename).mtime;

  if (cached && cached.mtime === fileMtime) {
    return { cached: cached.value, store: id };
  }

  return {
    cached: null,
    store(value) {
      cache[cacheKey] = { value, mtime: fileMtime };
      registerCache.setDirty();
      return value;
    },
  };
}
