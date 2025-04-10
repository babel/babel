// @ts-expect-error no types
import cloneDeep = require("clone-deep");
import path = require("node:path");
import fs = require("node:fs");
import crypto = require("node:crypto");

const babel = require("./babel-core.cjs");

const nmRE = escapeRegExp(path.sep + "node_modules" + path.sep);

function escapeRegExp(string: string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

type CacheItem = { value: { code: string; map: any }; mtime: number };
if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var registerCache = require("./cache-babel-7.cjs");
  // eslint-disable-next-line no-var
  var oldCache: Record<string, CacheItem>;
}

const id = (value: unknown) => value;

if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var cacheLookupBabel7 = function (opts: unknown, filename: string) {
    if (!oldCache) {
      return { cached: null, store: id };
    }

    let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;

    const env = babel.getEnv();
    if (env) cacheKey += `:${env}`;

    const cached = oldCache[cacheKey];
    const fileMtime = +fs.statSync(filename).mtime;

    if (cached?.mtime === fileMtime) {
      return { cached: cached.value, store: id };
    }

    return {
      cached: null,
      store(value: CacheItem["value"]) {
        oldCache[cacheKey] = { value, mtime: fileMtime };
        registerCache.setDirty();
        return value;
      },
    };
  };
}

async function cacheLookup(opts: unknown, filename: string) {
  if (!babel.cache.enabled) {
    return { cached: null, store: id };
  }

  let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;

  const env = babel.getEnv();
  if (env) cacheKey += `:${env}`;
  cacheKey = crypto.createHash("sha1").update(cacheKey).digest("hex");

  const cached = await babel.cache.get(cacheKey);
  const fileMtime = +fs.statSync(filename).mtime;

  if (cached?.mtime === fileMtime) {
    return { cached: cached.value, store: id };
  }

  return {
    cached: null,
    async store(value: CacheItem["value"]) {
      await babel.cache.set(cacheKey, {
        value,
        mtime: fileMtime,
      });
      return value;
    },
  };
}

let transformOpts: any;
async function setOptions(opts: any) {
  if (process.env.BABEL_8_BREAKING) {
    const cache = babel.cache;
    if (opts.cache === false && cache.enabled) {
      await cache.disable();
    } else if (opts.cache !== false && !cache.enabled) {
      await cache.enable();
    }
  } else {
    if (opts.cache === false && oldCache) {
      registerCache.clear();
      oldCache = null;
    } else if (opts.cache !== false && !oldCache) {
      registerCache.load();
      oldCache = registerCache.get();
    }
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
}

async function transform(input: string, filename: string) {
  const opts = await babel.loadOptionsAsync({
    // sourceRoot can be overwritten
    sourceRoot: path.dirname(filename) + path.sep,
    ...cloneDeep(transformOpts),
    filename,
  });

  // Bail out ASAP if the file has been ignored.
  if (opts === null) return null;

  const { cached, store } = await cacheLookup(opts, filename);
  if (cached) return cached;

  const { code, map } = await babel.transformAsync(input, {
    ...opts,
    sourceMaps: opts.sourceMaps === undefined ? "both" : opts.sourceMaps,
    ast: false,
  });

  return await store({ code, map });
}

export = { setOptions, transform };

if (!process.env.BABEL_8_BREAKING) {
  module.exports.transformSync = function (input: string, filename: string) {
    const opts = new babel.OptionManager().init({
      // sourceRoot can be overwritten
      sourceRoot: path.dirname(filename) + path.sep,
      ...cloneDeep(transformOpts),
      filename,
    });

    // Bail out ASAP if the file has been ignored.
    if (opts === null) return null;

    const { cached, store } = cacheLookupBabel7(opts, filename);
    if (cached) return cached;

    const { code, map } = babel.transformSync(input, {
      ...opts,
      sourceMaps: opts.sourceMaps === undefined ? "both" : opts.sourceMaps,
      ast: false,
    });

    return store({ code, map });
  };
}
