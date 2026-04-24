// @ts-expect-error no types
import cloneDeep from "clone-deep";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";

import Cache from "./cache.ts";
import {
  getEnv,
  loadPartialConfigAsync,
  loadOptionsAsync,
  transformAsync,
  version,
} from "@babel/core";

const cache = new Cache();

const nmRE = escapeRegExp(path.sep + "node_modules" + path.sep);

function escapeRegExp(string: string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

type CacheItem = { value: { code: string; map: any }; mtime: number };

const id = (value: unknown) => value;
async function cacheLookup(opts: unknown, filename: string) {
  if (!cache.enabled) {
    return { cached: null, store: id };
  }

  let cacheKey = `${JSON.stringify(opts)}:${version}`;

  const env = getEnv();
  if (env) cacheKey += `:${env}`;
  cacheKey = crypto.createHash("sha1").update(cacheKey).digest("hex");

  const cached = (await cache.get(cacheKey)) as CacheItem | undefined;
  const fileMtime = +fs.statSync(filename).mtime;

  if (cached?.mtime === fileMtime) {
    return { cached: cached.value, store: id };
  }

  return {
    cached: null,
    async store(value: CacheItem["value"]) {
      await cache.set(cacheKey, {
        value,
        mtime: fileMtime,
      });
      return value;
    },
  };
}

let transformOpts: any;
async function setOptions(opts: any) {
  if (opts.cache === false && cache.enabled) {
    await cache.disable();
  } else if (opts.cache !== false && !cache.enabled) {
    await cache.enable();
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
  const opts = await loadOptionsAsync({
    // sourceRoot can be overwritten
    sourceRoot: path.dirname(filename) + path.sep,
    ...cloneDeep(transformOpts),
    filename,
  });

  if (opts === null) {
    // Bail out if the file has been ignored.
    // This can only happen if the config changes between the isFileIgnored and
    // the loadOptionsAsync call.
    return null;
  }

  const { cached, store } = await cacheLookup(opts, filename);
  if (cached) return cached;

  // @ts-expect-error TODO: transformAsync does not accept the return type of loadOptionsAsync
  const { code, map } = await transformAsync(input, {
    ...opts,
    sourceMaps: opts.sourceMaps === undefined ? "both" : opts.sourceMaps,
    ast: false,
  });

  return await store({ code, map });
}

async function isFileIgnored(filename: string) {
  const opts = await loadPartialConfigAsync({
    ...cloneDeep(transformOpts),
    filename,
    showIgnoredFiles: true,
    // @babel/register does not support ignore/only in config files,
    // so we can skip checking those files
    babelrc: false,
    configFile: false,
    browserslistConfigFile: false,
    plugins: [],
    presets: [],
    targets: { browsers: undefined },
  });

  // Ignored via programmatic API.
  return opts === null;
}

function disableCache() {
  return cache.disable();
}

export { setOptions, transform, disableCache, isFileIgnored };
